import type { Metadata } from "next";
import { Header, Footer } from "../components/site";
import { brand } from "../lib/brand";
import "@fontsource-variable/dm-sans";
import "@fontsource-variable/manrope";
import "@fontsource/instrument-serif/latin-400.css";
import "@fontsource/instrument-serif/latin-400-italic.css";
import "./globals.css";
import "./editorial.css";
import "./header.css";
import "./tours.css";

const description =
  "Descubre destinos de Panamá y América, explora itinerarios y planifica tu próximo viaje con Jey Cee Tours.";
export const metadata: Metadata = {
  metadataBase: brand.site ? new URL(brand.site) : undefined,
  title: {
    default: "Jey Cee Tours | Viajes por Panamá y América",
    template: "%s | Jey Cee Tours",
  },
  description,
  openGraph: {
    title: "Jey Cee Tours",
    description,
    locale: "es_PA",
    type: "website",
    images: brand.site ? ["/images/hero-guna-yala.webp"] : undefined,
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: brand.name,
    slogan: brand.slogan,
    url: brand.site,
  };
  return (
    <html lang="es-PA">
      <body>
        <a href="#contenido" className="skip">
          Saltar al contenido
        </a>
        <Header />
        <main id="contenido">{children}</main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(data).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
