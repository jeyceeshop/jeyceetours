import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Compass,
  Mountain,
  Palmtree,
  Utensils,
} from "lucide-react";
import { CountryCards, Label } from "../components/site";
import { TravelHero } from "../components/travel-hero";
import { TravelSearch } from "../components/travel-search";
import { PackageShowcase } from "../components/package-showcase";
import { countries, imageFor } from "../lib/destinations";
import { packages } from "../lib/packages";

const interests = [
  { label: "Playa", icon: Palmtree },
  { label: "Naturaleza", icon: Mountain },
  { label: "Cultura", icon: Compass },
  { label: "Gastronomía", icon: Utensils },
];
const featuredIds = [
  "guna-yala-en-un-dia",
  "cartagena-tras-las-murallas",
  "arenal",
];

export default function Home() {
  return (
    <>
      <TravelHero />
      <TravelSearch />
      <section
        className="wrap editorial-section home-destinations"
        id="destinos"
      >
        <div className="section-head editorial-head">
          <div>
            <Label>Elige tu destino</Label>
            <h2>
              Destinos que <em>inspiran.</em>
            </h2>
          </div>
          <Link className="text-link" href="/destinos">
            Ver todos los destinos <ArrowUpRight size={18} />
          </Link>
        </div>
        <CountryCards mosaic />
      </section>
      <section className="showcase editorial-section">
        <div className="wrap">
          <div className="section-head editorial-head">
            <div>
              <Label>Encuentra tu próxima ruta</Label>
              <h2>
                Viajes para <em>recordar.</em>
              </h2>
              <p>
                Explora ideas de itinerario, desde una excursión hasta varios
                días de aventura.
              </p>
            </div>
            <Link className="text-link" href="/paquetes">
              Ver todos los paquetes <ArrowUpRight size={18} />
            </Link>
          </div>
          <PackageShowcase
            featured={featuredIds.flatMap((id) =>
              packages.filter((item) => item.id === id),
            )}
            options={countries.map(({ id, name }) => ({
              id,
              label: name,
              items: packages.filter((item) => item.country === id).slice(0, 3),
            }))}
          />
        </div>
      </section>
      <section className="wrap editorial-section">
        <div className="editorial-head">
          <Label>Experiencias</Label>
          <h2>
            ¿Qué te gustaría <em>hacer?</em>
          </h2>
        </div>
        <div className="interest-grid">
          {interests.map(({ label, icon: Icon }) => (
            <Link
              href={"/paquetes?tipo=" + encodeURIComponent(label)}
              key={label}
            >
              <Icon size={25} strokeWidth={1.5} />
              <span>{label}</span>
              <ArrowUpRight size={17} />
            </Link>
          ))}
        </div>
        <div className="planning-feature">
          <div className="planning-photo">
            <Image
              src={imageFor("mexico")}
              alt=""
              fill
              sizes="(max-width: 650px) 95vw, 49vw"
            />
          </div>
          <div className="planning-copy editorial-head">
            <Label>Viaja a tu manera</Label>
            <h2>
              Un viaje <em>hecho para ti.</em>
            </h2>
            <p>
              Cuéntanos qué lugar tienes en mente, con quién viajas y cuánto
              quieres gastar.
            </p>
            <Link className="button primary" href="/planifica">
              Diseñar mi viaje <ArrowRight size={17} />
            </Link>
            <Link className="text-link" href="/categorias">
              Conoce Essential, Plus y Signature <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
