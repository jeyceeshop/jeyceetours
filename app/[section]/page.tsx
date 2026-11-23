import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { CountryCards, Intro, Tiers } from "../../components/site";
import { CountryView } from "../../components/country-view";
import { Catalog } from "../../components/catalog";
import { DestinationFilters } from "../../components/destination-filters";
import { countries, imageFor } from "../../lib/destinations";

const legal: Record<string, [string, string[]]> = {
  privacidad: [
    "Política de privacidad",
    [
      "El planificador y el formulario elaboran un resumen en tu navegador. La información se comparte con el canal que elijas al abrir WhatsApp o tu cliente de correo.",
      "Utilizamos los datos que decidas enviar para revisar tu solicitud de información y responder. Evita incluir documentos, datos financieros o información sensible.",
      "Usa los canales publicados en Contacto para consultas sobre tus datos. La identidad del responsable, los plazos de conservación y el procedimiento de derechos requieren revisión legal antes de la publicación comercial.",
    ],
  ],
  terminos: [
    "Términos y condiciones",
    [
      "El sitio ofrece información editorial y permite registrar interés en experiencias turísticas.",
      "Los recorridos ilustrativos, tarifas estimadas y preferencias no constituyen disponibilidad ni una oferta de venta. El sitio está en fase de preparación comercial.",
    ],
  ],
  cookies: [
    "Política de cookies",
    [
      "La versión pública carece de cookies de analítica y publicidad. Los servicios externos que abras, como WhatsApp, aplican sus propias políticas.",
      "La política debe actualizarse si se incorporan analítica, preferencias persistentes o integraciones que utilicen cookies.",
    ],
  ],
  "aviso-legal": [
    "Aviso legal",
    [
      "Jey Cee Tours es una iniciativa panameña en preparación comercial. Cualquier actividad de intermediación estará sujeta a las autorizaciones correspondientes.",
      "Las imágenes de destinos de esta versión son ilustraciones generadas. Los itinerarios de ejemplo sirven para explorar ideas y solicitar información.",
    ],
  ],
};
const pages: Record<string, [string, string]> = {
  destinos: [
    "Destinos que inspiran.",
    "Descubre islas, ciudades y paisajes de Panamá y América.",
  ],
  panama: [
    "Explora Panamá",
    "Cinco destinos entre el Caribe, las tierras altas y la ciudad.",
  ],
  america: [
    "Explora América",
    "Destinos para viajar entre ciudades históricas, costas y bosques.",
  ],
  experiencias: [
    "Experiencias para cada viaje",
    "Ideas para elegir cómo quieres descubrir tu próximo destino.",
  ],
  categorias: [
    "Tres formas de viajar.",
    "Elige entre Essential, Plus y Signature según tus preferencias y presupuesto.",
  ],
  nosotros: [
    "Viajar es vivir nuevas historias.",
    "Viajes accesibles. Experiencias extraordinarias.",
  ],
};
const experiences = [
  [
    "Viajes personalizados",
    "Organiza los días según tus intereses y el tiempo que quieres dedicar a cada lugar.",
    "Por ejemplo, un recorrido de mercados y museos en Ciudad de México.",
    "mexico",
    "Cultura",
  ],
  [
    "Vacaciones familiares",
    "Alterna actividades sencillas, pausas y espacios para compartir.",
    "Por ejemplo, unos días de playa y paseos en Cancún.",
    "mexico",
    "Viajes familiares",
  ],
  [
    "Escapadas románticas",
    "Descubre lugares tranquilos para compartir a tu ritmo.",
    "Por ejemplo, una estancia junto al mar en Punta Cana.",
    "republica-dominicana",
    "Descanso",
  ],
  [
    "Viajes grupales",
    "Combina tiempos de encuentro con actividades que permitan explorar por separado.",
    "Por ejemplo, una visita cultural a Cartagena.",
    "colombia",
    "Cultura",
  ],
  [
    "Excursiones nacionales",
    "Descubre rincones de Panamá con recorridos de un día.",
    "Por ejemplo, explorar el Caribe de Guna Yala.",
    "panama",
    "Playa",
  ],
  [
    "Experiencias premium",
    "Diseña un itinerario con más privacidad, comodidad y tiempo para cada experiencia.",
    "Por ejemplo, una escapada de descanso entre el bosque y las termales de Arenal.",
    "costa-rica",
    "Naturaleza",
  ],
];
export const dynamicParams = false;
export function generateStaticParams() {
  return [...Object.keys(pages), ...Object.keys(legal)].map((section) => ({
    section,
  }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ section: string }>;
}): Promise<Metadata> {
  const { section } = await params;
  return {
    title: pages[section]?.[0] || legal[section]?.[0],
    description: pages[section]?.[1] || "Información legal de Jey Cee Tours.",
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  if (legal[section]) {
    const [title, body] = legal[section];
    return (
      <>
        <Intro
          label="Información legal"
          title={title}
          description="Borrador sujeto a revisión legal."
        />
        <article className="wrap content-section form-shell">
          {body.map((text) => (
            <p key={text}>{text}</p>
          ))}
        </article>
      </>
    );
  }
  if (!pages[section]) notFound();
  const [title, description] = pages[section];
  if (section === "panama") return <CountryView country={countries[0]} />;
  return (
    <>
      <Intro
        label={
          section === "nosotros"
            ? "Jey Cee Tours"
            : "Encuentra tu próxima aventura"
        }
        title={title}
        description={description}
        image={section === "america" ? imageFor("colombia") : undefined}
      />
      {section === "categorias" && <Tiers showHeading={false} />}
      {section !== "categorias" && (
        <section className="wrap content-section">
          {section === "destinos" && <CountryCards mosaic />}
          {section === "america" && (
            <>
              <CountryCards items={countries.slice(1)} />
              <div className="comparison">
                <h2>Encuentra tu destino</h2>
                <DestinationFilters />
              </div>
              <div className="comparison">
                <h2>Itinerarios en América</h2>
                <Catalog initial={{}} international />
              </div>
            </>
          )}
          {section === "experiencias" && (
            <div className="three-grid">
              {experiences.map(([name, info, example, country, interest]) => (
                <article key={name} className="package-card">
                  <div className="package-picture">
                    <Image
                      src={imageFor(country)}
                      alt=""
                      fill
                      sizes="(max-width: 590px) 90vw, 32vw"
                    />
                  </div>
                  <div className="package-body">
                    <h3>{name}</h3>
                    <p>{info}</p>
                    <p>{example}</p>
                    <Link
                      className="text-link"
                      href={
                        "/planifica?interes=" + encodeURIComponent(interest)
                      }
                    >
                      Solicitar información <ArrowRight size={15} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
          {section === "nosotros" && (
            <div className="stack">
              <p>
                Jey Cee Tours nace con la visión de acercar nuevas experiencias
                de viaje a más personas. Creemos que cada destino tiene una
                historia por descubrir y que cada viajero merece una experiencia
                adaptada a sus intereses, expectativas y presupuesto.
              </p>
              <p>
                Nuestra propuesta combina atención personalizada, planificación
                cuidadosa y una selección de destinos nacionales e
                internacionales.
              </p>
              <div className="form-grid">
                {[
                  [
                    "Nuestra visión",
                    "Acercar Panamá y América a viajeros con intereses y presupuestos diversos.",
                  ],
                  [
                    "Nuestra misión",
                    "Ayudar a planificar experiencias que se ajusten a la forma de viajar de cada persona.",
                  ],
                  [
                    "Nuestros valores",
                    "Transparencia, atención personalizada y respeto por los destinos que visitamos.",
                  ],
                  [
                    "Nuestra filosofía de servicio",
                    "Escuchamos primero. Después organizamos las opciones para que cada viajero pueda decidir con claridad.",
                  ],
                ].map(([heading, body]) => (
                  <article key={heading} className="panel">
                    <h2>{heading}</h2>
                    <p>{body}</p>
                  </article>
                ))}
              </div>
              <Link className="text-link" href="/contacto">
                Ponte en contacto <ArrowRight size={16} />
              </Link>
            </div>
          )}
        </section>
      )}
    </>
  );
}
