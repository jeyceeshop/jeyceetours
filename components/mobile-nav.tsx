"use client";
import Link from "next/link";
import { useRef } from "react";
import { Menu } from "lucide-react";
import { nav } from "../lib/brand";

export function MobileNav() {
  const disclosure = useRef<HTMLDetailsElement>(null);
  const close = () => {
    if (disclosure.current) disclosure.current.open = false;
  };
  return (
    <details
      ref={disclosure}
      className="mobile-nav"
      onKeyDown={(event) => {
        if (event.key === "Escape" && disclosure.current?.open) {
          close();
          disclosure.current.querySelector("summary")?.focus();
        }
      }}
    >
      <summary aria-label="Menú principal">
        <Menu />
      </summary>
      <nav aria-label="Principal móvil">
        {[...nav, ["Planifica tu viaje", "/planifica"]].map(([label, href]) => (
          <Link key={href} href={href} onClick={close}>
            {label}
          </Link>
        ))}
      </nav>
    </details>
  );
}
