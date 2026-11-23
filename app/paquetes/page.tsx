import type { Metadata } from "next";
import { Intro } from "../../components/site";
import { Catalog } from "../../components/catalog";
export const metadata: Metadata = {
  title: "Paquetes turísticos",
  description:
    "Explora y compara itinerarios turísticos ilustrativos por Panamá y América.",
};
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const input = await searchParams;
  const fields = Object.fromEntries(
    Object.entries(input).filter(
      (entry): entry is [string, string] => typeof entry[1] === "string",
    ),
  );
  return (
    <>
      <Intro
        label="Catálogo de viajes"
        title="Explora nuestros paquetes"
        description="Recorre ideas de viaje por Panamá y América. Los itinerarios de esta etapa son ilustrativos y las tarifas están sujetas a cotización."
      />
      <Catalog initial={fields} />
    </>
  );
}
