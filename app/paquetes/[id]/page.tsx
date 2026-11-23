import { tourDetails } from "../../../lib/tour-details";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowDown,
  ArrowRight,
  Backpack,
  Check,
  Clock,
  Flag,
  MapPin,
  Route,
  Wallet,
} from "lucide-react";
import { Intro, Label } from "../../../components/site";
import { countryById } from "../../../lib/destinations";
import {
  currentRate,
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
  return packages.map(({ id }) => ({ id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const item = packages.find((p) => p.id === id);
  return { title: item?.title, description: item?.summary };
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  const p = packages.find((item) => item.id === id);
  if (!p) notFound();

  const tour = tourDetails[id];
  const images = packageImages(p);
  const country = countryById(p.country);
  const countryPath =
    p.country === "panama" ? "/panama" : "/america/" + p.country;
  const contactPath = "/planifica?paquete=" + p.id;
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
        label={p.city + " · " + country?.name}
        title={p.title}
        description={p.summary}
        image={images[0]}
      >
        <div className="row intro-actions">
          <Link className="button primary" href={contactPath}>
            Solicitar mi itinerario <ArrowRight size={16} />
          </Link>
          <a className="button glass" href="#ruta">
            Ver recorrido <ArrowDown size={16} />
          </a>
        </div>
      </Intro>
      <div className="wrap package-facts">
        <div>
          <MapPin size={19} />
          <span>
            <small>Ciudad de salida</small>
            {p.departure}
          </span>
        </div>
        <div>
          <Clock size={19} />
          <span>
            <small>Duración</small>
            {p.duration} {p.duration === 1 ? "día" : "días"}
          </span>
        </div>
        <div>
          <Route size={19} />
          <span>
            <small>Experiencia</small>
            {p.type}
          </span>
        </div>
        <Link className="text-link" href={countryPath + "#paquetes-del-pais"}>
          Más rutas en {country?.name} <ArrowRight size={16} />
        </Link>
      </div>
      <nav className="wrap tour-jumps" aria-label="Secciones del tour">
        <a href="#ruta">Recorrido</a>
        <a href="#incluye">Qué incluye</a>
        <a href="#antes-de-viajar">Antes de viajar</a>
        <a href="#galeria">Galería</a>
      </nav>
      <section
        id="ruta"
        className="wrap content-section detail-grid package-detail"
      >
        <div className="stack">
          <article className="panel route-panel tour-panel">
            <Label>Itinerario propuesto</Label>
            <h2>Tu recorrido</h2>
            <div className="tour-endpoints">
              <div>
                <MapPin size={17} />
                <span>
                  <strong>Punto de encuentro</strong>
                  {tour.meeting}
                </span>
              </div>
              <div>
                <Flag size={17} />
                <span>
                  <strong>Fin del recorrido</strong>
                  {tour.arrival}
                </span>
              </div>
            </div>
            <ol className="timeline">
              {tour.stages.map(({ title, stops, description }, index) => (
                <li key={title}>
                  <div className="route-step">
                    {p.duration === 1 ? "Etapa" : "Día"} {index + 1}
                  </div>
                  <h3>{title}</h3>
                  <ul className="tour-stops" aria-label="Paradas propuestas">
                    {stops.map((stop) => (
                      <li key={stop}>
                        <MapPin size={13} />
                        {stop}
                      </li>
                    ))}
                  </ul>
                  <p>{description}</p>
                </li>
              ))}
            </ol>
          </article>
          <article id="incluye" className="panel tour-panel">
            <Label>Servicios y gastos</Label>
            <h2>Qué incluye</h2>
            <p className="tour-note">
              La lista describe la propuesta para este tour. Las inclusiones,
              horarios y disponibilidad se confirman en la cotización.
            </p>
            <div className="tour-services">
              <div>
                <h3>Incluido en la propuesta</h3>
                <ul>
                  {tour.planned.map((service) => (
                    <li key={service}>
                      <Check size={17} />
                      {service}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3>Se cotiza por separado</h3>
                <ul>
                  {tour.extras.map((service) => (
                    <li key={service}>
                      <Wallet size={17} />
                      {service}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {!!p.includes.length && (
              <div className="tour-verified">
                <h3>Servicios confirmados</h3>
                <ul>
                  {p.includes.map((service) => (
                    <li key={service}>{service}</li>
                  ))}
                </ul>
              </div>
            )}
            {!!p.excludes.length && (
              <div className="tour-verified">
                <h3>Exclusiones confirmadas</h3>
                <ul>
                  {p.excludes.map((service) => (
                    <li key={service}>{service}</li>
                  ))}
                </ul>
              </div>
            )}
          </article>
          <article id="antes-de-viajar" className="panel tour-panel">
            <Label>Prepara tu visita</Label>
            <h2>Antes de viajar</h2>
            <p className="tour-bring">
              <Backpack size={21} />
              {tour.bring}
            </p>
            <details className="tour-terms">
              <summary>Condiciones y requisitos de la cotización</summary>
              <dl>
                {conditions.map(([key, value]) => (
                  <div key={key}>
                    <dt>{key}</dt>
                    <dd>{value || "Por confirmar"}</dd>
                  </div>
                ))}
              </dl>
            </details>
          </article>
          <article id="galeria" className="panel tour-panel">
            <Label>Imágenes del destino</Label>
            <h2>Galería ilustrativa</h2>
            <div
              className={
                "gallery tour-gallery" +
                (images.length === 1 ? " tour-gallery-single" : "")
              }
            >
              {images.map((src) => (
                <figure key={src}>
                  <Image
                    src={src}
                    fill
                    sizes={
                      images.length === 1
                        ? "(max-width: 650px) 90vw, 55vw"
                        : "(max-width: 650px) 45vw, 28vw"
                    }
                    alt=""
                  />
                  <figcaption>Imagen ilustrativa</figcaption>
                </figure>
              ))}
            </div>
          </article>
        </div>
        <aside className="panel itinerary-summary">
          <span className={"pill level-" + p.level.toLowerCase()}>
            {p.level}
          </span>
          <h2>{rateLabel(rate)}</h2>
          {!rate && (
            <p>
              Solicita una propuesta para tus fechas y viajeros.
              {planningBudget[p.id] && (
                <>
                  {" "}
                  Como referencia de planificación: {usd(
                    planningBudget[p.id],
                  )}{" "}
                  por persona.
                </>
              )}
            </p>
          )}
          <dl className="tour-quote">
            <div>
              <dt>Vuelos</dt>
              <dd>
                {p.flights === undefined
                  ? "Por confirmar"
                  : p.flights
                    ? "Incluidos"
                    : "Excluidos"}
              </dd>
            </div>
            <div>
              <dt>Impuestos</dt>
              <dd>
                {rate
                  ? rate.includesTaxes
                    ? "Incluidos"
                    : "Excluidos"
                  : "Por confirmar"}
              </dd>
            </div>
            <div>
              <dt>Cargos obligatorios</dt>
              <dd>{rate?.mandatoryCharges || "Por confirmar"}</dd>
            </div>
            <div>
              <dt>Fechas</dt>
              <dd>{p.dates?.join(", ") || "Por confirmar"}</dd>
            </div>
            <div>
              <dt>Ocupación</dt>
              <dd>{p.occupancy || "Por confirmar"}</dd>
            </div>
          </dl>
          <Link className="button primary" href={contactPath}>
            Solicitar mi itinerario <ArrowRight size={16} />
          </Link>
          <p className="tour-interest">Solicitud de información</p>
        </aside>
      </section>
    </>
  );
}
