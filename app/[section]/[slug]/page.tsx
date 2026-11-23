import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Intro } from "../../../components/site";
import {
  countries,
  countryById,
  destinations,
  imageFor,
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
  if (country)
    return (
      <>
        <Intro
          label="Explora América"
          title={country.name}
          description={country.description}
          image={imageFor(country.id)}
        />
        <section className="wrap content-section">
          <h2>Destinos en {country.name}</h2>
          <div className="three-grid">
            {destinations
              .filter((d) => d.country === country.id)
              .map((d) => (
                <article key={d.id} className="panel">
                  <h3>{d.name}</h3>
                  <p>{d.description}</p>
                  <Link className="text-link" href={"/america/" + d.id}>
                    Explorar destino <ArrowRight size={16} />
                  </Link>
                </article>
              ))}
          </div>
          <p>
            <Link className="text-link" href={"/paquetes?pais=" + country.id}>
              Ver itinerarios relacionados <ArrowRight size={16} />
            </Link>
          </p>
        </section>
      </>
    );
  if (!place) notFound();
  const [attractions, activities, route] = guideFor(place.id);
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
      />
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
    </>
  );
}
