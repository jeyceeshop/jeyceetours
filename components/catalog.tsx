"use client";
import { useId, useState } from "react";
import { ArrowDown, SlidersHorizontal } from "lucide-react";
import { PackageCard } from "./package-card";
import { countries, interests, levels, budgets } from "../lib/destinations";
import {
  packages,
  rateLabel,
  currentRate,
  planningBudget,
  usd,
  type Package,
} from "../lib/packages";
const format = (value?: boolean) =>
  value === undefined ? "Por confirmar" : value ? "Incluido" : "Excluido";
const compare: [string, (p: Package) => string][] = [
  ["Precio total", (p) => rateLabel(p.totalRate)],
  [
    "Precio por persona",
    (p) =>
      rateLabel(
        p.verifiedRate?.unit === "persona" ? p.verifiedRate : undefined,
      ),
  ],
  [
    "Presupuesto tentativo por persona",
    (p) =>
      planningBudget[p.id]
        ? usd(planningBudget[p.id]) + " · Ejemplo"
        : "Sin ejemplo",
  ],
  ["Salida", (p) => p.departure],
  ["Duración", (p) => p.duration + " día(s)"],
  ["Ocupación", (p) => p.occupancy ?? "Por confirmar"],
  ["Fechas", (p) => p.dates?.join(", ") || "Por confirmar"],
  ["Hotel", (p) => p.hotel ?? format(p.lodging)],
  ["Vuelos", (p) => format(p.flights)],
  ["Traslados", (p) => format(p.transfers)],
  ["Alimentación", (p) => format(p.meals)],
  ["Excursiones", (p) => format(p.excursions)],
  ["Entradas", (p) => format(p.tickets)],
  ["Guía", (p) => format(p.guide)],
  ["Asistencia al viajero", (p) => format(p.assistance)],
  ["Cancelación", (p) => p.cancellation ?? "Por confirmar"],
];
export function Catalog({
  initial,
  international = false,
  country,
}: {
  initial: Record<string, string>;
  international?: boolean;
  country?: string;
}) {
  const [filters, set] = useState<Record<string, string>>(initial);
  const [picked, pick] = useState<string[]>([]);
  const tableId = useId();
  const embedded = country !== undefined || international;
  const available = packages.filter(
    (item) =>
      (!country || item.country === country) &&
      (!international || item.country !== "panama"),
  );
  const matchingCountry = available.filter(
    (item) => !filters.pais || item.country === filters.pais,
  );
  const durations = [
    ...new Set(matchingCountry.map(({ duration }) => duration)),
  ].sort((a, b) => a - b);
  const reset = () => set({});
  const fields: [string, string, string[][]][] = [
    [
      "pais",
      "País",
      countries
        .filter((x) => !international || x.id !== "panama")
        .map((x) => [x.id, x.name]),
    ],
    [
      "ciudad",
      "Ciudad",
      matchingCountry
        .map((p) => [p.city, p.city])
        .filter(
          ([city], index, list) =>
            list.findIndex((entry) => entry[0] === city) === index,
        ),
    ],
    [
      "tipo",
      "Experiencia",
      interests
        .filter((interest) =>
          matchingCountry.some(({ type }) => type === interest),
        )
        .map((x) => [x, x]),
    ],
    [
      "duracion",
      "Duración",
      durations.map((days) => [
        String(days),
        days === 1 ? "1 día" : days + " días",
      ]),
    ],
    [
      "nivel",
      "Categoría",
      levels
        .filter((level) => matchingCountry.some((item) => item.level === level))
        .map((x) => [x, x]),
    ],
    [
      "alcance",
      "Tipo de viaje",
      [
        ["nacional", "Nacional"],
        ["internacional", "Internacional"],
      ],
    ],
    [
      "servicio",
      "Servicios",
      [
        ["hotel", "Con alojamiento confirmado"],
        ["vuelos", "Con vuelos confirmados"],
      ],
    ],
    ["presupuesto", "Presupuesto total de ejemplo", budgets.map((b) => [b, b])],
    [
      "precio",
      "Tarifa publicada",
      [
        ["500", "Hasta US$500"],
        ["1000", "Hasta US$1,000"],
        ["pending", "Consultar precio"],
      ],
    ],
  ];
  const results = matchingCountry.filter((p) => {
    const amount = currentRate(p.verifiedRate)?.amount;
    const index = budgets.indexOf(filters.presupuesto);
    const count = /^(?:[1-9]|10)$/.test(initial.viajeros ?? "")
      ? Number(initial.viajeros)
      : 1;
    const estimate = planningBudget[p.id]
      ? planningBudget[p.id] * count
      : undefined;
    const matchesBudget =
      index < 0 ||
      (estimate !== undefined &&
        (index === 0
          ? estimate <= 500
          : index === 1
            ? estimate > 500 && estimate <= 1000
            : estimate > 1000));
    return (
      matchesBudget &&
      (!filters.ciudad || filters.ciudad === p.city) &&
      (!filters.tipo || filters.tipo === p.type) &&
      (!filters.duracion || Number(filters.duracion) === p.duration) &&
      (!filters.nivel || filters.nivel === p.level) &&
      (!filters.alcance ||
        (filters.alcance === "nacional") === (p.country === "panama")) &&
      (!filters.servicio ||
        (filters.servicio === "hotel" ? p.lodging : p.flights) === true) &&
      (!filters.precio ||
        (filters.precio === "pending"
          ? amount === undefined
          : amount !== undefined && amount <= Number(filters.precio)))
    );
  });
  const query = new URLSearchParams(
    Object.entries({ ...initial, presupuesto: filters.presupuesto }).filter(
      ([k, v]) => ["fecha", "viajeros", "presupuesto"].includes(k) && v,
    ),
  ).toString();
  const selected = picked.flatMap((id) =>
    available.filter((item) => item.id === id),
  );
  const active = Object.keys(filters).some(
    (key) => fields.some(([field]) => field === key) && filters[key],
  );
  const primaryKeys = country
    ? ["ciudad", "tipo", "duracion"]
    : ["pais", "tipo", "duracion"];
  const renderFilter = ([key, label, options]: [
    string,
    string,
    string[][],
  ]) => (
    <label key={key}>
      {label}
      <select
        aria-label={label}
        value={filters[key] ?? ""}
        onChange={(event) => {
          const value = event.target.value;
          set((previous) => ({
            ...previous,
            [key]: value,
            ...(key === "pais"
              ? { ciudad: "", tipo: "", duracion: "", nivel: "" }
              : {}),
          }));
        }}
      >
        <option value="">Todos</option>
        {options.map(([value, text]) => (
          <option key={value} value={value}>
            {text}
          </option>
        ))}
      </select>
    </label>
  );
  return (
    <section
      className={embedded ? "catalog-embedded" : "wrap content-section"}
      aria-label="Catálogo de itinerarios"
    >
      <div className="catalog-filters">
        <div className="filter-grid">
          {primaryKeys
            .map((key) => fields.find(([field]) => field === key)!)
            .map(renderFilter)}
        </div>
        <details
          className="advanced-filters"
          open={
            fields.some(
              ([key]) => !primaryKeys.includes(key) && initial[key],
            ) || undefined
          }
        >
          <summary>
            <SlidersHorizontal size={17} /> Más filtros
          </summary>
          <div className="filter-grid">
            {fields
              .filter(
                ([key]) =>
                  !primaryKeys.includes(key) &&
                  !(embedded && key === "alcance") &&
                  !(country && key === "pais"),
              )
              .map(renderFilter)}
          </div>
        </details>
      </div>
      <div className="section-head results">
        <p role="status">
          {results.length} {results.length === 1 ? "itinerario" : "itinerarios"}{" "}
          <span>· Selecciona hasta 3 para comparar</span>
        </p>
        {active && (
          <button type="button" className="text-link" onClick={reset}>
            Limpiar filtros
          </button>
        )}
      </div>
      {query && (
        <p className="notice">
          Tus preferencias pasarán al planificador. El filtro de presupuesto
          multiplica el ejemplo por persona por el número de viajeros indicado.
          Las fechas y tarifas requieren confirmación.
        </p>
      )}
      {results.length ? (
        <div className="three-grid">
          {results.map((item) => (
            <PackageCard
              key={item.id}
              item={item}
              query={query ? "&" + query : ""}
              selection={
                <label className="check compare-check">
                  <input
                    type="checkbox"
                    checked={picked.includes(item.id)}
                    disabled={picked.length >= 3 && !picked.includes(item.id)}
                    onChange={(e) =>
                      pick(
                        e.target.checked
                          ? [...picked, item.id]
                          : picked.filter((id) => id !== item.id),
                      )
                    }
                  />{" "}
                  Comparar
                </label>
              }
            />
          ))}
        </div>
      ) : (
        <div className="catalog-empty">
          <h3>No hay itinerarios con esos filtros.</h3>
          <p>Prueba con otra experiencia o duración.</p>
          <button type="button" className="button dark" onClick={reset}>
            Ver todos los itinerarios
          </button>
        </div>
      )}
      {picked.length > 0 && (
        <div className="compare-dock">
          <div className="compare-dock-copy" role="status">
            <strong>{picked.length} de 3 seleccionados</strong>
            <small>
              {picked.length === 1
                ? "Añade otro itinerario para comparar"
                : "Comparación disponible"}
            </small>
          </div>
          <button type="button" className="text-link" onClick={() => pick([])}>
            Quitar selección
          </button>
          {picked.length >= 2 && (
            <a className="button primary" href={"#" + tableId}>
              Ver comparación <ArrowDown size={16} />
            </a>
          )}
        </div>
      )}
      {selected.length >= 2 && (
        <section className="comparison" id={tableId} tabIndex={-1}>
          <h2>Compara tus itinerarios</h2>
          <p className="notice">
            Revisa las diferencias de salida, fechas, duración, ocupación y
            servicios. Los itinerarios pueden representar viajes distintos y los
            elementos pendientes requieren confirmación.
          </p>
          <div
            className="table-scroll"
            tabIndex={0}
            role="region"
            aria-label="Comparación de itinerarios"
          >
            <table>
              <thead>
                <tr>
                  <th scope="col">Detalle</th>
                  {selected.map((p) => (
                    <th scope="col" key={p.id}>
                      {p.title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {compare.map(([key, value]) => (
                  <tr key={key}>
                    <th scope="row">{key}</th>
                    {selected.map((p) => (
                      <td key={p.id}>{value(p)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </section>
  );
}
