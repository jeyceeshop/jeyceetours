import type { Metadata } from "next";
import { Intro } from "../../components/site";
import { Planner } from "../../components/planner";
export const metadata: Metadata = {
  title: "Planifica tu viaje",
  description:
    "Prepara un itinerario personalizado y registra tu interés en viajar por Panamá y América.",
};
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const raw = await searchParams;
  const data = Object.fromEntries(
    Object.entries(raw).filter(
      (entry): entry is [string, string] => typeof entry[1] === "string",
    ),
  );
  return (
    <>
      <Intro
        label="Planificador de viajes"
        title="Diseña tu próxima aventura."
        description="Cuéntanos cómo te gustaría viajar. Prepararemos un resumen de interés que podrás compartir con Jey Cee Tours."
      />
      <Planner initial={data} />
    </>
  );
}
