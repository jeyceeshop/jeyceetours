import type { Metadata } from "next";
import { Intro } from "../../components/site";
import { ContactForm } from "../../components/contact-form";
import { brand, whatsappLink } from "../../lib/brand";
export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contacta a Jey Cee Tours para orientación sobre destinos y planificación de viajes.",
};
const faq = [
  [
    "¿Puedo reservar desde el sitio?",
    "La plataforma está en fase informativa. Puedes registrar interés y explorar itinerarios ilustrativos.",
  ],
  [
    "¿Los precios son definitivos?",
    "Los ejemplos de presupuesto son orientativos. Una tarifa publicada solo se muestra si existe evidencia de su vigencia.",
  ],
  [
    "¿Cómo comparto mi idea de viaje?",
    "Completa el planificador y comparte el resumen por el canal habilitado en el sitio.",
  ],
  [
    "¿Se pueden adaptar los itinerarios?",
    "Puedes indicar tus fechas, presupuesto, preferencias y el nivel de viaje que te interesa.",
  ],
];
export default function Page() {
  const link = whatsappLink(
    "Hola, me gustaría recibir información de Jey Cee Tours.",
  );
  return (
    <>
      <Intro
        title="Hablemos de tu próximo viaje."
        label="Contacto"
        description="Te orientamos sobre destinos, itinerarios y próximos pasos."
      />
      <section className="wrap content-section detail-grid">
        <ContactForm />
        <div className="stack">
          <div className="panel">
            <h2>Canales de contacto</h2>
            {link ? (
              <p>
                <a
                  className="text-link"
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Abrir WhatsApp
                </a>
              </p>
            ) : (
              <p>WhatsApp pendiente de configuración.</p>
            )}
            {brand.email ? (
              <p>
                <a className="text-link" href={"mailto:" + brand.email}>
                  {brand.email}
                </a>
              </p>
            ) : (
              <p>Correo pendiente de configuración.</p>
            )}
            {brand.instagram && (
              <p>
                <a className="text-link" href={brand.instagram}>
                  Instagram
                </a>
              </p>
            )}
            {brand.facebook && (
              <p>
                <a className="text-link" href={brand.facebook}>
                  Facebook
                </a>
              </p>
            )}
            <p>{brand.hours || "Horario pendiente de configuración."}</p>
          </div>
          <div className="panel faq">
            <h2>Preguntas frecuentes</h2>
            {faq.map(([q, a]) => (
              <details key={q}>
                <summary>{q}</summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
