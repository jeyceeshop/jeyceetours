import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CountryView } from "../../../components/country-view";
import { PackageCard } from "../../../components/package-card";
import { packages } from "../../../lib/packages";
import { Intro, Label } from "../../../components/site";
import {
  countries,
  countryById,
  destinations,
  guideFor,
  destinationArtwork,
} from "../../../lib/destinations";
type Params = { section: string; slug: string };
const resolve = ({ section, slug }: Params) =>
  section === "panama"
    ? destinations.find((d) => d.country === "panama" && d.id === slug)
    : section === "america"
      ? destinations.find((d) => d.country !== "panama" && d.id === slug)
      : undefined;
export const dynamicParams = false;
export function generateStaticParams() {
  return [
    ...destinations.map((d) => ({
      section: d.country === "panama" ? "panama" : "america",
      slug: d.id,
    })),
    ...countries.slice(1).map((c) => ({ section: "america", slug: c.id })),
  ];
}
export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const p = await params;
  const data =
    resolve(p) || (p.section === "america" ? countryById(p.slug) : undefined);
  return { title: data?.name, description: data?.description };
}
export default async function Page({ params }: { params: Promise<Params> }) {
  const p = await params;
  const place = resolve(p);
  const country =
    p.section === "america" && p.slug !== "panama"
      ? countryById(p.slug)
      : undefined;
  if (!place && !country) notFound();
  if (country) return <CountryView country={country} />;
  if (!place) notFound();
  const [attractions, activities, route] = guideFor(place.id);
  const related = packages.filter((item) => item.places.includes(place.id));
  const countryPath =
    place.country === "panama" ? "/panama" : "/america/" + place.country;
  return (
    <>
      <Intro
        label={countryById(place.country)!.name}
        title={place.name}
        description={place.description}
        image={
          destinationArtwork[place.id]
            ? "/images/" + destinationArtwork[place.id] + ".webp"
            : undefined
        }
      >
        <div className="row intro-actions">
          {related.length > 0 && (
            <a href="#paquetes-relacionados" className="button primary">
              Ver paquetes <ArrowRight size={16} />
            </a>
          )}
          <Link className="button glass" href={countryPath}>
            Volver al país
          </Link>
        </div>
      </Intro>
      <section className="wrap content-section detail-grid">
        <div className="stack">
          <article className="panel">
            <h2>Qué descubrir</h2>
            <p>{attractions}</p>
            <h3>Actividades recomendadas</h3>
            <p>{activities}</p>
          </article>
          <article className="panel">
            <h2>Itinerario de ejemplo</h2>
            <p>{route}</p>
            <p className="notice">
              Recorrido ilustrativo. Confirma accesos y horarios antes de
              viajar.
            </p>
          </article>
        </div>
        <aside className="panel">
          <h2>Información útil</h2>
          <p>{place.tip}</p>
          <Link
            className="button dark"
            href={"/planifica?destino=" + encodeURIComponent(place.name)}
          >
            Solicitar una propuesta <ArrowRight size={16} />
          </Link>
        </aside>
      </section>
      {related.length > 0 && (
        <section
          className="country-guides editorial-section"
          id="paquetes-relacionados"
        >
          <div className="wrap">
            <div className="section-head editorial-head">
              <div>
                <Label>Paquetes e itinerarios</Label>
                <h2>
                  Rutas para <em>tu viaje.</em>
                </h2>
              </div>
              <Link
                href={countryPath + "#paquetes-del-pais"}
                className="text-link"
              >
                Ver rutas del país <ArrowRight size={17} />
              </Link>
            </div>
            <div className="three-grid">
              {related.map((item) => (
                <PackageCard item={item} key={item.id} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
