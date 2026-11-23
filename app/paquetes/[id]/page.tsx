import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Intro } from "../../../components/site";
import { Flyer } from "../../../components/flyer";
import { countryById } from "../../../lib/destinations";
import {
  currentRate,
  example,
  packageImages,
  packages,
  planningBudget,
  rateLabel,
  usd,
} from "../../../lib/packages";
type Props = { params: Promise<{ id: string }> };
export const dynamicParams = false;
export const revalidate = 3600;
export function generateStaticParams() {
  return packages.map((p) => ({ id: p.id }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const item = packages.find((p) => p.id === id);
  return {
    title: item?.title,
    description: item
      ? "Explora este itinerario en " +
        item.city +
        ", consulta sus detalles y registra tu interés."
      : undefined,
  };
}
export default async function Page({ params }: Props) {
  const { id } = await params;
  const p = packages.find((item) => item.id === id);
  if (!p) notFound();
  const images = packageImages(p);
  const rate = currentRate(p.verifiedRate);
  const conditions = [
    ["Operador", p.operator],
    ["Cancelación", p.cancellation],
    ["Requisitos", p.requirements],
    ["Restricciones", p.restrictions],
    ["Condiciones comerciales", p.bookingConditions],
    ["Vigencia", rate?.validThrough],
  ];
  return (
    <>
      <Intro
        label={p.city + " · " + countryById(p.country)?.name}
        title={p.title}
        description={example}
        image={images[0]}
      />
      <section className="wrap content-section detail-grid">
        <div className="stack">
          <article className="panel">
            <h2>Itinerario ilustrativo</h2>
            <ol className="timeline">
              {p.itinerary.map((line, i) => (
                <li key={line}>
                  <strong>
                    {p.duration === 1 ? "Etapa" : "Día"} {i + 1}
                  </strong>
                  <p>{line}</p>
                </li>
              ))}
            </ol>
          </article>
          <article className="panel">
            <h2>Servicios</h2>
            <h3>Qué incluye</h3>
            {p.includes.length ? (
              <ul>
                {p.includes.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            ) : (
              <p>Servicios incluidos pendientes de confirmación.</p>
            )}
            <h3>Qué no incluye</h3>
            {p.excludes.length ? (
              <ul>
                {p.excludes.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            ) : (
              <p>
                Exclusiones y cargos adicionales pendientes de confirmación.
              </p>
            )}
          </article>
          <article className="panel">
            <h2>Galería ilustrativa</h2>
            <div className="gallery">
              {images.map((src, i) => (
                <figure key={src}>
                  <Image
                    src={src}
                    fill
                    sizes="(max-width: 590px) 44vw, 30vw"
                    alt={
                      "Ilustración de " +
                      p.city +
                      (i > 0 ? " y su entorno" : "")
                    }
                  />
                  <figcaption>Imagen ilustrativa</figcaption>
                </figure>
              ))}
            </div>
          </article>
          <article className="panel">
            <h2>Condiciones</h2>
            <dl>
              {conditions.map(([key, value]) => (
                <div key={key}>
                  <dt>
                    <strong>{key}</strong>
                  </dt>
                  <dd>{value || "Por confirmar"}</dd>
                </div>
              ))}
            </dl>
          </article>
        </div>
        <aside className="stack">
          <div className="panel">
            <span className="pill">{p.level}</span>
            <h2>{rateLabel(rate)}</h2>
            {!rate && (
              <p>
                <strong>Precio sujeto a cotización.</strong>{" "}
                {planningBudget[p.id] && (
                  <>
                    Para planificar, este ejemplo contempla{" "}
                    {usd(planningBudget[p.id])} por persona como referencia
                    interna editorial. El importe comercial depende del
                    proveedor.
                  </>
                )}
              </p>
            )}
            <p>
              Vuelos:{" "}
              {p.flights === undefined
                ? "por confirmar"
                : p.flights
                  ? "incluidos"
                  : "excluidos"}
              . Impuestos:{" "}
              {rate
                ? rate.includesTaxes
                  ? "incluidos"
                  : "excluidos"
                : "por confirmar"}
              . Cargos obligatorios: {rate?.mandatoryCharges || "por confirmar"}
              .
            </p>
            <p>
              {p.duration} {p.duration === 1 ? "día" : "días"} · {p.type}
            </p>
            <p>Salida orientativa: {p.departure}</p>
            <p>Fechas: {p.dates?.join(", ") || "por confirmar"}</p>
            <p>Ocupación: {p.occupancy || "por confirmar"}</p>
            <Link
              className="button primary"
              href={"/planifica?paquete=" + p.id}
            >
              Solicitar mi itinerario <ArrowRight size={16} />
            </Link>
          </div>
          <Flyer item={p} images={images} />
        </aside>
      </section>
    </>
  );
}
