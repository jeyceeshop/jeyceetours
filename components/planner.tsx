"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import { ArrowRight, ChevronLeft, MessageCircle } from "lucide-react";
import { brand, whatsappLink } from "../lib/brand";
import { interests, levels, budgets } from "../lib/destinations";
import { packages } from "../lib/packages";

const steps = [
  "Destino",
  "Fechas",
  "Viajeros",
  "Presupuesto",
  "Categoría",
  "Preferencias",
  "Contacto",
];
const fields = [
  [
    ["destino", "Destino", "text"],
    ["salida", "Ciudad de salida", "text"],
    ["alcance", "Tipo de viaje", "select", "Nacional,Internacional"],
  ],
  [
    ["fecha", "Fecha aproximada de salida", "date"],
    ["regreso", "Fecha de regreso", "date"],
    ["flexible", "Fechas flexibles", "check"],
  ],
  [
    ["adultos", "Adultos", "number"],
    ["menores", "Menores", "number"],
  ],
  [
    ["total", "Presupuesto total aproximado", "number"],
    ["moneda", "Moneda", "select", "USD"],
    ["vuelos", "El presupuesto incluye vuelos", "check"],
  ],
  [["categoria", "Categoría", "select", levels.join(",")]],
  [],
  [
    ["nombre", "Nombre", "text"],
    ["correo", "Correo electrónico", "email"],
    ["whatsapp", "WhatsApp (opcional)", "tel"],
    ["comentarios", "Comentarios adicionales", "textarea"],
    [
      "consentimiento",
      "Autorizo el tratamiento de mis datos y recibir respuesta a esta solicitud.",
      "check",
    ],
  ],
];
const yesNo = (value: string) => (value === "Sí" ? "Sí" : "No");
export function Planner({ initial }: { initial: Record<string, string> }) {
  const item = packages.find((p) => p.id === initial.paquete);
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Record<string, string>>({
    destino: item?.city || initial.destino || "",
    salida: item?.departure || "",
    alcance: item
      ? item.country === "panama"
        ? "Nacional"
        : "Internacional"
      : "",
    fecha: /^\d{4}-\d{2}-\d{2}$/.test(initial.fecha ?? "") ? initial.fecha : "",
    adultos: /^(?:[1-9]|10)$/.test(initial.viajeros ?? "")
      ? initial.viajeros
      : "1",
    menores: "0",
    moneda: "USD",
    categoria:
      item?.level ||
      (levels.includes(initial.categoria) ? initial.categoria : ""),
    preferencias: interests.includes(initial.interes) ? initial.interes : "",
  });
  const [copy, setCopy] = useState("");
  const [error, setError] = useState("");
  const titleRef = useRef<HTMLHeadingElement>(null);
  const focus = () => requestAnimationFrame(() => titleRef.current?.focus());
  const update = (key: string, value: string) =>
    setData((previous) => ({ ...previous, [key]: value }));
  const summary = [
    "Registro de interés · Jey Cee Tours",
    item && "Itinerario de interés: " + item.title,
    "Destino: " + data.destino + " · Viaje " + data.alcance?.toLowerCase(),
    "Ciudad de salida: " + data.salida,
    "Fechas: " +
      (data.fecha || "Por definir") +
      " – " +
      (data.regreso || "Por definir") +
      " · Flexibles: " +
      yesNo(data.flexible),
    "Viajeros: " + data.adultos + " adultos, " + data.menores + " menores",
    "Presupuesto: " +
      (data.total
        ? "US$" + data.total
        : budgets.includes(initial.presupuesto)
          ? initial.presupuesto
          : "Por definir") +
      " · Incluye vuelos: " +
      yesNo(data.vuelos),
    "Categoría: " + data.categoria,
    data.preferencias && "Preferencias: " + data.preferencias,
    "Nombre: " + data.nombre,
    "Correo: " + data.correo,
    data.whatsapp && "WhatsApp: " + data.whatsapp,
    data.comentarios && "Comentarios: " + data.comentarios,
    "Consentimiento para responder a esta solicitud: Sí",
  ]
    .filter(Boolean)
    .join("\n");
  const wa = whatsappLink(summary);
  return (
    <section className="wrap content-section form-shell">
      <p className="notice">
        {item ? item.title + " · " : ""}Registro de interés. Las fechas, tarifas
        y servicios están sujetos a confirmación.
      </p>
      <h2 ref={titleRef} tabIndex={-1}>
        {step < 7 ? steps[step] : "Tu solicitud está lista"}
      </h2>
      <progress
        aria-label="Progreso del planificador"
        value={Math.min(step + 1, 7)}
        max={7}
      />
      {step < 7 ? (
        <>
          <p>Paso {step + 1} de 7</p>
          <form
            key={step}
            className="panel"
            onSubmit={(e) => {
              e.preventDefault();
              if (
                step === 1 &&
                data.fecha &&
                data.regreso &&
                data.regreso < data.fecha
              ) {
                setError(
                  "El regreso debe ser el mismo día o después de la salida.",
                );
                return;
              }
              if (step === 6 && !data.nombre?.trim()) {
                setError("Escribe tu nombre.");
                return;
              }
              setError("");
              setStep(step + 1);
              focus();
            }}
          >
            <fieldset className="form-grid">
              <legend>
                {
                  [
                    "¿A dónde quieres viajar?",
                    "¿Cuándo te gustaría viajar?",
                    "¿Quiénes viajan?",
                    "¿Qué presupuesto tienes en mente?",
                    "Elige tu forma de viajar",
                    "¿Qué te gustaría hacer?",
                    "¿Cómo podemos contactarte?",
                  ][step]
                }
              </legend>
              {fields[step].map(([key, label, type, options]) => {
                const value = data[key] ?? "";
                if (type === "check")
                  return (
                    <label className="check full" key={key}>
                      <input
                        type="checkbox"
                        required={key === "consentimiento"}
                        checked={value === "Sí"}
                        onChange={(e) =>
                          update(key, e.target.checked ? "Sí" : "No")
                        }
                      />
                      <span>
                        {label}{" "}
                        {key === "consentimiento" && (
                          <Link
                            className="text-link"
                            href="/privacidad"
                            target="_blank"
                            rel="noopener"
                          >
                            Política de privacidad
                          </Link>
                        )}
                      </span>
                    </label>
                  );
                if (type === "select")
                  return (
                    <label key={key}>
                      {label}
                      <select
                        required
                        value={value}
                        onChange={(e) => update(key, e.target.value)}
                      >
                        <option value="">Selecciona</option>
                        {options.split(",").map((o) => (
                          <option key={o}>{o}</option>
                        ))}
                      </select>
                    </label>
                  );
                if (type === "textarea")
                  return (
                    <label key={key} className="full">
                      {label}
                      <textarea
                        maxLength={500}
                        value={value}
                        onChange={(e) => update(key, e.target.value)}
                      />
                    </label>
                  );
                return (
                  <label key={key}>
                    {label}
                    <input
                      type={type}
                      required={[
                        "destino",
                        "salida",
                        "adultos",
                        "menores",
                        "nombre",
                        "correo",
                      ].includes(key)}
                      min={
                        key === "adultos"
                          ? 1
                          : key === "regreso"
                            ? data.fecha
                            : type === "number"
                              ? 0
                              : undefined
                      }
                      max={
                        ["adultos", "menores"].includes(key) ? 99 : undefined
                      }
                      step={key === "total" ? "0.01" : undefined}
                      maxLength={type === "tel" ? 25 : 100}
                      pattern={
                        type === "text"
                          ? ".*\\S.*"
                          : type === "tel"
                            ? "[+0-9 .()\\-]{7,25}"
                            : undefined
                      }
                      value={value}
                      onChange={(e) => update(key, e.target.value)}
                    />
                  </label>
                );
              })}
              {step === 5 &&
                interests.map((interest) => (
                  <label key={interest} className="check">
                    <input
                      type="checkbox"
                      checked={(data.preferencias || "")
                        .split(", ")
                        .includes(interest)}
                      onChange={(e) => {
                        const selected = (data.preferencias || "")
                          .split(", ")
                          .filter(Boolean);
                        update(
                          "preferencias",
                          (e.target.checked
                            ? [...selected, interest]
                            : selected.filter((i) => i !== interest)
                          ).join(", "),
                        );
                      }}
                    />
                    {interest}
                  </label>
                ))}
            </fieldset>
            {error && (
              <p className="error" role="alert">
                {error}
              </p>
            )}
            <div className="actions">
              {step > 0 ? (
                <button
                  type="button"
                  className="text-link"
                  onClick={() => {
                    setError("");
                    setStep(step - 1);
                    focus();
                  }}
                >
                  <ChevronLeft size={16} /> Atrás
                </button>
              ) : (
                <span />
              )}
              <button className="button dark">
                {step === 6 ? "Ver resumen" : "Continuar"}{" "}
                <ArrowRight size={16} />
              </button>
            </div>
          </form>
        </>
      ) : (
        <div className="panel">
          <p>Revisa el resumen antes de compartirlo.</p>
          <pre className="summary">{summary}</pre>
          <p role="status">{copy}</p>
          <div className="row">
            {wa ? (
              <a
                className="button primary"
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle size={16} /> Enviar por WhatsApp
              </a>
            ) : brand.email ? (
              <a
                className="button primary"
                href={
                  "mailto:" +
                  brand.email +
                  "?subject=Registro%20de%20inter%C3%A9s&body=" +
                  encodeURIComponent(summary)
                }
              >
                Abrir correo
              </a>
            ) : (
              <span className="notice">
                Canales de envío pendientes de configuración.
              </span>
            )}
            <button
              className="button dark"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(summary);
                  setCopy("Resumen copiado.");
                } catch {
                  setCopy("Selecciona el resumen y cópialo manualmente.");
                }
              }}
            >
              Copiar resumen
            </button>
            <button
              className="text-link"
              onClick={() => {
                setStep(6);
                focus();
              }}
            >
              Editar datos
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
