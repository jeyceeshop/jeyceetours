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
  const href = "/paquetes/" + item.id;
  const estimate = planningBudget[item.id];
  const rate = currentRate(item.verifiedRate);
  return (
    <article className="package-card travel-card">
      <div className="package-picture">
        <Image
          src={packageImages(item)[0] ?? imageFor(item.country)}
          alt=""
          fill
          sizes="(max-width: 640px) 93vw, (max-width: 900px) 45vw, 30vw"
          quality={85}
        />
        <span className={"pill level-" + item.level.toLowerCase()}>
          {item.level}
        </span>
        <span className="picture-duration">
          <Clock size={14} /> {item.duration}{" "}
          {item.duration === 1 ? "día" : "días"}
        </span>
      </div>
      <div className="package-body">
        <div className="locator">
          <MapPin size={14} /> {item.city}, {countryById(item.country)?.name}{" "}
          <span>· {item.type}</span>
        </div>
        <h3>
          <Link href={href}>{item.title}</Link>
        </h3>
        <p>{item.summary}</p>
        <div className="package-pricing">
          <strong>{rateLabel(rate)}</strong>
          <small>
            {!rate && estimate
              ? "Ejemplo: " + usd(estimate) + " por persona"
              : "Precios y servicios en el itinerario"}
          </small>
        </div>
        <div className="package-links">
          <Link className="button dark" href={href}>
            Ver itinerario <ArrowUpRight size={16} />
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
