"use client";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import {
  countries,
  countryById,
  destinations,
  interests,
} from "../lib/destinations";
export function DestinationFilters({ scope }: { scope: "panama" | "america" }) {
  const [country, setCountry] = useState("");
  const [interest, setInterest] = useState("");
  const results = destinations.filter(
    (d) =>
      (scope === "panama" ? d.country === "panama" : d.country !== "panama") &&
      (!country || d.country === country) &&
      (!interest || d.types.includes(interest)),
  );
  return (
    <>
      <div className="filter-grid">
        {scope === "america" && (
          <label>
            País
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option value="">Todos</option>
              {countries.slice(1).map((c) => (
                <option value={c.id} key={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </label>
        )}
        <label>
          Tipo de experiencia
          <select
            value={interest}
            onChange={(e) => setInterest(e.target.value)}
          >
            <option value="">Todas</option>
            {interests.map((i) => (
              <option key={i}>{i}</option>
            ))}
          </select>
        </label>
      </div>
      <p role="status">{results.length} destinos</p>
      {results.length ? (
        <div className="three-grid">
          {results.map((d) => (
            <article key={d.id} className="panel">
              <div className="locator">
                {countryById(d.country)?.name} · {d.types.join(" · ")}
              </div>
              <h3>{d.name}</h3>
              <p>{d.description}</p>
              <Link className="text-link" href={"/" + scope + "/" + d.id}>
                Explorar destino <ArrowRight size={15} />
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <p className="notice">No hay destinos que coincidan con tus filtros.</p>
      )}
      {scope === "america" && (
        <p>
          <Link className="text-link" href="/paquetes?alcance=internacional">
            Filtrar itinerarios por duración, presupuesto y categoría{" "}
            <ArrowRight size={16} />
          </Link>
        </p>
      )}
    </>
  );
}
