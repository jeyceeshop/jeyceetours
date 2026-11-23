import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { DestinationFilters } from "./destination-filters";
import { Catalog } from "./catalog";
import { Intro, Label } from "./site";
import { countries, imageFor } from "../lib/destinations";

export function CountryView({
  country,
}: {
  country: (typeof countries)[number];
}) {
  return (
    <>
      <Intro
        label={
          country.id === "panama" ? "Viajes por Panamá" : "Explora América"
        }
        title={country.id === "panama" ? "Explora Panamá" : country.name}
        description={country.description}
        image={
          country.id === "panama"
            ? "/images/hero-guna-yala.webp"
            : imageFor(country.id)
        }
      >
        <div className="row intro-actions">
          <a href="#paquetes-del-pais" className="button primary">
            Ver paquetes <ArrowRight size={16} />
          </a>
          <a href="#guias-del-pais" className="button glass">
            Explorar lugares <ArrowUpRight size={16} />
          </a>
        </div>
      </Intro>
      <section className="wrap editorial-section" id="paquetes-del-pais">
        <div className="section-head editorial-head">
          <div>
            <Label>Paquetes e itinerarios</Label>
            <h2>
              Viajes por <em>{country.name}.</em>
            </h2>
            <p>
              Elige una ruta, compárala y úsala como punto de partida para tu
              viaje.
            </p>
          </div>
          <Link
            href={"/planifica?destino=" + encodeURIComponent(country.name)}
            className="text-link"
          >
            Diseñar mi viaje <ArrowUpRight size={17} />
          </Link>
        </div>
        <Catalog initial={{}} country={country.id} />
      </section>
      <section className="country-guides editorial-section" id="guias-del-pais">
        <div className="wrap">
          <div className="section-head editorial-head">
            <div>
              <Label>Guías de destino</Label>
              <h2>
                Lugares para <em>descubrir.</em>
              </h2>
            </div>
            <Link className="text-link" href="/destinos">
              Explorar otros países <ArrowUpRight size={17} />
            </Link>
          </div>
          <DestinationFilters countryId={country.id} />
        </div>
      </section>
    </>
  );
}
