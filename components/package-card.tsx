import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock, MapPin } from "lucide-react";
import { countryById, imageFor } from "../lib/destinations";
import {
  type Package,
  rateLabel,
  packageImages,
  planningBudget,
  usd,
  currentRate,
} from "../lib/packages";

export function PackageCard({
  item,
  selection,
  query = "",
}: {
  item: Package;
  selection?: React.ReactNode;
  query?: string;
}) {
  return (
    <article className="package-card">
      <div className="package-picture">
        <Image
          src={packageImages(item)[0] ?? imageFor(item.country)}
          alt=""
          fill
          sizes="(max-width: 620px) 90vw, 32vw"
        />
        <span className="pill">{item.level}</span>
      </div>
      <div className="package-body">
        <div className="locator">
          <MapPin size={14} />
          {item.city}, {countryById(item.country)?.name}
        </div>
        <h3>
          <Link href={"/paquetes/" + item.id}>{item.title}</Link>
        </h3>
        <p className="row">
          <Clock size={16} />
          {item.duration} {item.duration === 1 ? "día" : "días"} <span>·</span>{" "}
          {item.type}
        </p>
        <strong>{rateLabel(item.verifiedRate)}</strong>
        {!currentRate(item.verifiedRate) && planningBudget[item.id] && (
          <p>
            Presupuesto tentativo de ejemplo: {usd(planningBudget[item.id])} por
            persona. Cargos y servicios por confirmar.
          </p>
        )}
        <p>
          {item.includes.length
            ? item.includes.slice(0, 3).join(" · ")
            : "Servicios por confirmar · Itinerario ilustrativo"}
        </p>
        <div className="row package-links">
          <Link className="button dark" href={"/paquetes/" + item.id}>
            Ver itinerario <ArrowUpRight size={15} />
          </Link>
          <Link
            className="text-link"
            href={"/planifica?paquete=" + item.id + query}
          >
            Solicitar cotización
          </Link>
        </div>
        {selection}
      </div>
    </article>
  );
}
