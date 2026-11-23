"use client";

import { useState } from "react";
import { PackageCard } from "./package-card";
import { Package } from "../lib/packages";

export function PackageShowcase({
  options,
  featured,
}: {
  options: { id: string; label: string; items: Package[] }[];
  featured: Package[];
}) {
  const [country, setCountry] = useState("");
  const display = country
    ? (options.find((option) => option.id === country)?.items ?? [])
    : featured;
  return (
    <>
      <div
        className="filter-chips"
        role="group"
        aria-label="Filtrar destacados por país"
      >
        <button
          type="button"
          aria-pressed={!country}
          onClick={() => setCountry("")}
        >
          Destacados
        </button>
        {options.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            aria-pressed={country === id}
            onClick={() => setCountry(id)}
          >
            {label}
          </button>
        ))}
      </div>
      <span className="sr-only" role="status">
        {display.length} itinerarios
      </span>
      <div className="three-grid" key={country}>
        {display.map((item) => (
          <PackageCard item={item} key={item.id} />
        ))}
      </div>
    </>
  );
}
