"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  MapPin,
} from "lucide-react";

const scenes = [
  {
    place: "Guna Yala, Panamá",
    image: "/images/hero-guna-yala.webp",
    position: "center 50%",
    href: "/panama/guna-yala",
  },
  {
    place: "Cartagena, Colombia",
    image: "/images/colombia.webp",
    position: "center 42%",
    href: "/america/cartagena",
  },
  {
    place: "Arenal, Costa Rica",
    image: "/images/costa-rica.webp",
    position: "center 46%",
    href: "/america/la-fortuna",
  },
];

export function TravelHero() {
  const [current, setCurrent] = useState(0);
  const scene = scenes[current];
  const move = (direction: number) =>
    setCurrent((index) => (index + direction + scenes.length) % scenes.length);

  return (
    <section className="travel-hero" aria-label="Viajes por Panamá y América">
      <Image
        key={scene.image}
        src={scene.image}
        alt=""
        fill
        sizes="100vw"
        preload={current === 0}
        className="travel-hero-image"
        style={{ objectPosition: scene.position }}
      />
      <div className="travel-hero-shade" />
      <div className="wrap travel-hero-inner">
        <div className="travel-hero-copy">
          <div className="eyebrow travel-eyebrow">
            <span /> Viajes por Panamá y América
          </div>
          <h1>
            El mundo <em>te espera.</em>
          </h1>
          <p>
            Islas, ciudades y naturaleza. Descubre rutas por Panamá y América y
            encuentra la que va contigo.
          </p>
          <div className="row">
            <a className="button primary" href="#destinos">
              Explorar destinos <ArrowDown size={16} />
            </a>
            <Link className="button glass" href="/planifica">
              Planifica tu viaje <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
        <div className="scene">
          <Link href={scene.href} className="scene-location" aria-live="polite">
            <MapPin size={17} aria-hidden="true" />
            <span>
              {scene.place}
              <small>Vista ilustrativa</small>
            </span>
          </Link>
          <div className="scene-controls">
            <button
              type="button"
              onClick={() => move(-1)}
              aria-label="Paisaje anterior"
            >
              <ArrowLeft size={17} />
            </button>
            <button
              type="button"
              onClick={() => move(1)}
              aria-label="Paisaje siguiente"
            >
              <ArrowRight size={17} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
