"use client";
import { useState } from "react";
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
}: {
  initial: Record<string, string>;
  international?: boolean;
}) {
  const [filters, set] = useState<Record<string, string>>(initial);
  const [picked, pick] = useState<string[]>([]);
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
      packages
        .filter(
          (p) =>
            (!international || p.country !== "panama") &&
            (!filters.pais || p.country === filters.pais),
        )
        .map((p) => [p.city, p.city])
        .filter(
          ([city], index, list) =>
            list.findIndex((entry) => entry[0] === city) === index,
        ),
    ],
    ["tipo", "Experiencia", interests.map((x) => [x, x])],
    [
      "duracion",
      "Duración",
      [
        ["1", "1 día"],
        ["3", "3 días"],
        ["4", "4 días"],
      ],
    ],
    ["nivel", "Categoría", levels.map((x) => [x, x])],
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
  const results = packages.filter((p) => {
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
      (!international || p.country !== "panama") &&
      (!filters.pais || filters.pais === p.country) &&
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
  const selected = packages.filter((p) => picked.includes(p.id));
  return (
    <section
      className={international ? "catalog-embedded" : "wrap content-section"}
      aria-label="Catálogo de itinerarios"
    >
      <div className="filter-grid">
        {fields
          .filter(([key]) => !international || key !== "alcance")
          .map(([key, label, options]) => (
            <label key={key}>
              {label}
              <select
                aria-label={label}
                value={filters[key] ?? ""}
                onChange={(e) =>
                  set({
                    ...filters,
                    [key]: e.target.value,
                    ...(key === "pais" ? { ciudad: "" } : {}),
                  })
                }
              >
                <option value="">Todos</option>
                {options.map(([v, l]) => (
                  <option key={v} value={v}>
                    {l}
                  </option>
                ))}
              </select>
            </label>
          ))}
      </div>
      <div className="section-head results">
        <p role="status">
          {results.length} {results.length === 1 ? "itinerario" : "itinerarios"}
        </p>
        <button className="text-link" onClick={() => set({})}>
          Limpiar filtros
        </button>
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
        <p className="notice">
          No encontramos itinerarios con estos filtros. Prueba con otro destino
          o ajusta los criterios.
        </p>
      )}
      <section className="comparison">
        <h2>Compara y elige tu próxima aventura</h2>
        <p role="status">
          {picked.length} de 3 seleccionados. Selecciona al menos dos
          itinerarios.
        </p>
        {picked.length > 0 && (
          <button className="text-link" onClick={() => pick([])}>
            Quitar selección
          </button>
        )}
        {selected.length >= 2 && (
          <>
            <p className="notice">
              Revisa las diferencias de salida, fechas, duración, ocupación y
              servicios. Los itinerarios pueden representar viajes distintos y
              los elementos pendientes requieren confirmación.
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
          </>
        )}
      </section>
    </section>
  );
}
