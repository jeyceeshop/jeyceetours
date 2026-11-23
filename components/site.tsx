import Link from "next/link";
import Image from "next/image";
import {
  ArrowDownRight,
  ArrowRight,
  Camera,
  Globe2,
  MapPin,
  MoveUpRight,
} from "lucide-react";
import { MobileNav } from "./mobile-nav";
import { brand, nav } from "../lib/brand";
import { countries, imageFor } from "../lib/destinations";

export function Logo() {
  return (
    <Link href="/" className="logo" aria-label="Jey Cee Tours, inicio">
      <span className="logo-mark">
        <Image src="/images/logo.svg" alt="" width={29} height={32} />
      </span>
      <span>
        <Image
          className="wordmark"
          src="/images/wordmark.svg"
          alt=""
          width={83}
          height={14}
        />
        <small>TOURS · PANAMÁ</small>
      </span>
    </Link>
  );
}
export function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <Logo />
        <nav className="desktop-nav" aria-label="Principal">
          {nav.map(([label, href]) => (
            <Link href={href} key={href}>
              {label}
            </Link>
          ))}
        </nav>
        <Link className="button primary header-cta" href="/planifica">
          Planifica tu viaje <MoveUpRight size={15} />
        </Link>
        <MobileNav />
      </div>
    </header>
  );
}
export function Footer() {
  return (
    <footer>
      <div className="wrap footer-grid">
        <div>
          <Logo />
          <p>{brand.slogan}</p>
          <p>Viajes accesibles. Experiencias extraordinarias.</p>
          <div className="row">
            {brand.instagram && (
              <a href={brand.instagram} aria-label="Instagram">
                <Camera />
              </a>
            )}
            {brand.facebook && (
              <a href={brand.facebook} aria-label="Facebook">
                <Globe2 />
              </a>
            )}
          </div>
        </div>
        <nav aria-label="Enlaces del pie de página">
          {nav.map(([label, href]) => (
            <Link key={href} href={href}>
              {label}
            </Link>
          ))}
        </nav>
        <div>
          <Link href="/privacidad">Privacidad</Link>
          <Link href="/terminos">Términos</Link>
          <Link href="/cookies">Cookies</Link>
          <Link href="/aviso-legal">Aviso legal</Link>
        </div>
      </div>
      <div className="wrap media-note">
        <Link href="/aviso-legal">Imágenes de destinos ilustrativas</Link>
      </div>
      <div className="wrap copyright">
        © {new Date().getFullYear()} Jey Cee Tours{" "}
        <span>Sitio informativo · Panamá</span>
      </div>
    </footer>
  );
}
export function Label({ children }: { children: React.ReactNode }) {
  return (
    <div className="eyebrow">
      <span />
      {children}
    </div>
  );
}
export function CountryCards({
  items = countries,
}: {
  items?: typeof countries;
}) {
  return (
    <div className="country-grid">
      {items.map((country) => (
        <Link
          className="country-card"
          href={country.id === "panama" ? "/panama" : "/america/" + country.id}
          key={country.id}
        >
          <Image
            src={imageFor(country.id)}
            alt=""
            fill
            sizes="(max-width: 620px) 90vw, 32vw"
          />
          <div className="card-overlay" />
          <div className="country-info">
            <div className="locator">
              <MapPin size={13} />
              {country.regions}
            </div>
            <h3>{country.name}</h3>
            <p>{country.description}</p>
            <span className="card-action">
              Explorar destino <ArrowRight size={16} />
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
export function Intro({
  label,
  title,
  description,
  image,
}: {
  label: string;
  title: string;
  description: string;
  image?: string;
}) {
  return (
    <section className={image ? "intro photo-intro" : "intro"}>
      {image && (
        <>
          <Image src={image} alt="" fill priority sizes="100vw" />
          <div className="intro-shade" />
        </>
      )}
      <div className="wrap">
        <Label>{label}</Label>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </section>
  );
}
const tiers = [
  [
    "Essential",
    "Viaja más. Descubre más.",
    "Alojamientos económicos · Itinerarios prácticos · Transporte conveniente",
  ],
  [
    "Plus",
    "Más comodidad para tu aventura.",
    "Hoteles de categoría superior · Actividades seleccionadas · Planificación personalizada",
  ],
  [
    "Signature",
    "Experiencias extraordinarias, diseñadas para ti.",
    "Hoteles de alta gama · Experiencias exclusivas · Traslados privados según disponibilidad",
  ],
];
export function Tiers({ showHeading = true }: { showHeading?: boolean }) {
  return (
    <section className="tier-section">
      <div className="wrap">
        {showHeading && (
          <div className="section-head">
            <div>
              <Label>A tu manera</Label>
              <h2>Tres formas de viajar.</h2>
            </div>
            <Link className="text-link" href="/categorias">
              Explorar categorías <ArrowRight size={16} />
            </Link>
          </div>
        )}
        <div className="tier-grid">
          {tiers.map(([name, title, features]) => (
            <article key={name} className={"tier " + name.toLowerCase()}>
              <p className="overline">JEY CEE</p>
              <h3>{name}</h3>
              <p>
                <strong>{title}</strong>
              </p>
              <p>{features}</p>
              <Link href={"/planifica?categoria=" + name}>
                Elegir {name} <ArrowDownRight size={16} />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
