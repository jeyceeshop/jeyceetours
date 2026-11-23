"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ArrowUpRight, ChevronDown } from "lucide-react";

export function DestinationsMenu({
  destinations,
}: {
  destinations: { label: string; href: string; count: number }[];
}) {
  const menu = useRef<HTMLDetailsElement>(null);

  function close() {
    if (menu.current) menu.current.open = false;
  }

  return (
    <details
      ref={menu}
      className="nav-destinations"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) close();
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape" && menu.current?.open) {
          close();
          menu.current.querySelector("summary")?.focus();
        }
      }}
    >
      <summary>
        Destinos <ChevronDown size={15} />
      </summary>
      <div className="nav-disclosure">
        <Link className="nav-feature" onClick={close} href="/panama/guna-yala">
          <Image
            src="/images/guna-yala-menu.webp"
            alt=""
            fill
            sizes="190px"
            loading="eager"
          />
          <span>
            <small>Panamá</small>Guna Yala <ArrowUpRight size={17} />
          </span>
        </Link>
        <div className="nav-country-list">
          {destinations.map(({ label, href, count }) => (
            <Link href={href} onClick={close} key={href}>
              <span>
                {label}
                <small>{count} itinerarios</small>
              </span>
              <ArrowUpRight size={14} />
            </Link>
          ))}
          <Link href="/destinos" onClick={close}>
            Todos los destinos <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </details>
  );
}
