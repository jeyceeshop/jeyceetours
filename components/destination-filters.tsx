"use client";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { countries, destinations, interests } from "../lib/destinations";
import { PlaceCard } from "./place-card";
export function DestinationFilters({ countryId }: { countryId?: string }) {
  const [country, setCountry] = useState("");
  const [interest, setInterest] = useState("");
  const places = destinations.filter((place) =>
    countryId
      ? place.country === countryId
      : place.country !== "panama" && (!country || place.country === country),
  );
  const availableInterests = interests.filter((type) =>
    places.some((place) => place.types.includes(type)),
  );
  const results = places.filter(
    (place) => !interest || place.types.includes(interest),
  );
  return (
    <>
      <div className="filter-grid">
        {!countryId && (
          <label>
            País
            <select
              aria-label="País de la guía"
              value={country}
              onChange={(e) => {
                setCountry(e.target.value);
                setInterest("");
              }}
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
            aria-label="Tipo de experiencia en las guías"
            value={interest}
            onChange={(e) => setInterest(e.target.value)}
          >
            <option value="">Todas</option>
            {availableInterests.map((i) => (
              <option key={i}>{i}</option>
            ))}
          </select>
        </label>
      </div>
      <p role="status">
        {results.length} {results.length === 1 ? "destino" : "destinos"}
      </p>
      {results.length ? (
        <div className="three-grid">
          {results.map((d) => (
            <PlaceCard key={d.id} place={d} />
          ))}
        </div>
      ) : (
        <p className="notice">No hay destinos que coincidan con tus filtros.</p>
      )}
      {!countryId && (
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
