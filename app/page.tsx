import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  MapPin,
  Search,
  Users,
  Wallet,
  Compass,
} from "lucide-react";
import { CountryCards, Label, Tiers } from "../components/site";
import { PackageCard } from "../components/package-card";
import { budgets, countries } from "../lib/destinations";
import { packages } from "../lib/packages";
export default function Home() {
  return (
    <>
      <section className="hero">
        <Image
          src="/images/hero.webp"
          alt="Ilustración de un cayo tropical entre aguas turquesa"
          fill
          priority
          sizes="100vw"
          className="hero-image"
        />
        <div className="hero-shade" />
        <div className="wrap hero-content">
          <div className="hero-kicker">
            <Compass size={15} /> VIAJES POR PANAMÁ Y AMÉRICA
          </div>
          <h1>
            El mundo
            <br />
            te espera<span>.</span>
          </h1>
          <p className="hero-lede">Nosotros te ayudamos a descubrirlo.</p>
          <p className="hero-description">
            Explora Panamá y América con experiencias diseñadas para tu
            presupuesto. De escapadas accesibles a viajes de lujo.
          </p>
          <div className="row">
            <Link href="/destinos" className="button primary">
              Explorar destinos <ArrowUpRight size={18} />
            </Link>
            <Link href="/planifica" className="button glass">
              Planificar mi viaje <ArrowRight size={17} />
            </Link>
          </div>
        </div>
        <div className="hero-caption">
          <MapPin size={14} /> Inspirado en Guna Yala, Panamá
        </div>
        <div className="wrap hero-search">
          <form action="/paquetes" className="search-panel">
            <label>
              <MapPin />
              <span>
                Destino
                <select name="pais">
                  <option value="">¿A dónde vamos?</option>
                  {countries.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </span>
            </label>
            <label>
              <CalendarDays />
              <span>
                Fecha aproximada
                <input aria-label="Fecha aproximada" type="date" name="fecha" />
              </span>
            </label>
            <label>
              <Users />
              <span>
                Viajeros
                <select name="viajeros" defaultValue="">
                  <option value="">¿Cuántos viajan?</option>
                  {Array.from({ length: 10 }, (_, i) => (
                    <option key={i} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </span>
            </label>
            <label>
              <Wallet />
              <span>
                Presupuesto
                <select name="presupuesto">
                  <option value="">Tu rango en USD</option>
                  {budgets.map((b) => (
                    <option key={b}>{b}</option>
                  ))}
                </select>
              </span>
            </label>
            <button className="button dark">
              <Search size={18} /> Buscar experiencias
            </button>
          </form>
        </div>
      </section>
      <section className="wrap featured" id="destinos">
        <div className="section-head">
          <div>
            <Label>Encuentra tu próximo destino</Label>
            <h2>
              Destinos que inspiran<span>.</span>
            </h2>
            <p>Tu próxima historia comienza en algún lugar extraordinario.</p>
          </div>
          <Link className="text-link" href="/destinos">
            Ver todos los destinos <ArrowRight size={18} />
          </Link>
        </div>
        <CountryCards />
      </section>
      <section className="package-section">
        <div className="wrap">
          <div className="section-head">
            <div>
              <Label>Ideas para tu próxima aventura</Label>
              <h2>
                Explora nuestros paquetes<span>.</span>
              </h2>
              <p>Encuentra itinerarios ilustrativos en Panamá y América.</p>
            </div>
            <Link className="text-link" href="/paquetes">
              Ver todos los paquetes <ArrowRight size={18} />
            </Link>
          </div>
          <div className="three-grid">
            {packages.slice(0, 3).map((item) => (
              <PackageCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>
      <Tiers />
      <section className="wrap last-cta">
        <div>
          <Label>Tu viaje, tus preferencias</Label>
          <h2>Diseña tu próxima aventura.</h2>
        </div>
        <Link className="button primary" href="/planifica">
          Planifica tu viaje <ArrowUpRight size={18} />
        </Link>
      </section>
    </>
  );
}
