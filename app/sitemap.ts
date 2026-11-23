import type { MetadataRoute } from "next";
import { brand, nav } from "../lib/brand";
import { countries, destinations } from "../lib/destinations";
import { packages } from "../lib/packages";
export default function sitemap(): MetadataRoute.Sitemap {
  if (!brand.site) return [];
  const paths = [
    ...nav.map(([, path]) => path),
    "/planifica",
    "/privacidad",
    "/terminos",
    "/cookies",
    "/aviso-legal",
    ...countries.slice(1).map((c) => "/america/" + c.id),
    ...destinations.map(
      (d) => "/" + (d.country === "panama" ? "panama" : "america") + "/" + d.id,
    ),
    ...packages.map((p) => "/paquetes/" + p.id),
  ];
  return paths.map((path) => ({ url: new URL(path, brand.site).href }));
}
