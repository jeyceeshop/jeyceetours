export const countries = [
  {
    id: "panama",
    name: "Panamá",
    regions: "Guna Yala · Bocas del Toro · Boquete",
    description:
      "Islas caribeñas, bosque nuboso y una capital entre dos océanos.",
  },
  {
    id: "colombia",
    name: "Colombia",
    regions: "Medellín · Bogotá · Cartagena",
    description:
      "Ciudades creativas, montañas verdes y una costa llena de historia.",
  },
  {
    id: "mexico",
    name: "México",
    regions: "Cancún · Ciudad de México · Riviera Maya",
    description:
      "Playas luminosas, patrimonio ancestral y sabores que cuentan historias.",
  },
  {
    id: "costa-rica",
    name: "Costa Rica",
    regions: "San José · La Fortuna · Guanacaste",
    description: "Volcanes, selva tropical y playas del Pacífico.",
  },
  {
    id: "republica-dominicana",
    name: "República Dominicana",
    regions: "Punta Cana · Santo Domingo",
    description: "Costa caribeña y calles coloniales para explorar a tu ritmo.",
  },
];

export const interests = [
  "Playa",
  "Naturaleza",
  "Aventura",
  "Cultura",
  "Gastronomía",
  "Compras",
  "Descanso",
  "Viajes familiares",
];
export const levels = ["Essential", "Plus", "Signature"];
export const budgets = ["Hasta US$500", "US$500–US$1,000", "Más de US$1,000"];
const places: [string, string, string, string[], string, string][] = [
  [
    "guna-yala",
    "San Blas / Guna Yala",
    "panama",
    ["Playa", "Cultura"],
    "Islas bajas de arena clara y comunidades que conservan la cultura guna.",
    "Consulta las normas de visita y acuerda con anticipación el traslado marítimo.",
  ],
  [
    "bocas-del-toro",
    "Bocas del Toro",
    "panama",
    ["Playa", "Naturaleza"],
    "Un archipiélago de manglares, arrecifes y playas caribeñas.",
    "Los trayectos entre islas suelen hacerse en lancha y dependen del clima.",
  ],
  [
    "boquete",
    "Boquete",
    "panama",
    ["Naturaleza", "Gastronomía"],
    "Cafés de altura y senderos de bosque nuboso al pie del Barú.",
    "Empaca capas y calzado para lluvia.",
  ],
  [
    "chiriqui",
    "Chiriquí",
    "panama",
    ["Naturaleza", "Aventura"],
    "De las tierras altas a los paisajes del golfo de Chiriquí.",
    "Confirma el acceso a senderos y las condiciones marítimas.",
  ],
  [
    "ciudad-de-panama",
    "Ciudad de Panamá",
    "panama",
    ["Cultura", "Compras"],
    "Casco histórico, arquitectura contemporánea y el Canal de Panamá.",
    "Verifica horarios de museos y centros de visitantes.",
  ],
  [
    "medellin",
    "Medellín",
    "colombia",
    ["Cultura", "Gastronomía"],
    "Arte urbano, jardines y miradores en el valle de Aburrá.",
    "Consulta los horarios del metro y elige recorridos guiados para conocer el contexto local.",
  ],
  [
    "bogota",
    "Bogotá",
    "colombia",
    ["Cultura", "Gastronomía"],
    "Museos, mercados y barrios históricos en la meseta andina.",
    "Reserva tiempo para aclimatarte a la altura.",
  ],
  [
    "cartagena",
    "Cartagena",
    "colombia",
    ["Cultura", "Playa"],
    "Murallas, balcones y plazas sombreadas junto al mar Caribe.",
    "Organiza las caminatas temprano para evitar el calor del mediodía.",
  ],
  [
    "san-andres",
    "San Andrés",
    "colombia",
    ["Playa", "Descanso"],
    "Playas someras y aguas con múltiples tonos de azul.",
    "Consulta con las autoridades los requisitos de ingreso a la isla.",
  ],
  [
    "cancun",
    "Cancún",
    "mexico",
    ["Playa", "Viajes familiares"],
    "Playas de arena blanca entre el Caribe y la laguna Nichupté.",
    "Consulta las condiciones de baño y el estado de las playas.",
  ],
  [
    "ciudad-de-mexico",
    "Ciudad de México",
    "mexico",
    ["Cultura", "Gastronomía"],
    "Museos, mercados y parques en una ciudad de barrios muy distintos.",
    "Comprueba los días de cierre y reserva tiempo para desplazamientos.",
  ],
  [
    "riviera-maya",
    "Riviera Maya",
    "mexico",
    ["Playa", "Aventura"],
    "Costa de cenotes, selva y sitios arqueológicos mayas.",
    "Confirma las reglas de acceso y conservación en cenotes y reservas.",
  ],
  [
    "san-jose",
    "San José",
    "costa-rica",
    ["Cultura", "Gastronomía"],
    "Mercados, teatros y museos en el Valle Central.",
    "Revisa horarios y opciones de transporte para tus visitas.",
  ],
  [
    "la-fortuna",
    "La Fortuna",
    "costa-rica",
    ["Naturaleza", "Aventura"],
    "Senderos de bosque, aguas termales y vistas al volcán Arenal.",
    "Elige actividades según las condiciones del sendero y la visibilidad.",
  ],
  [
    "guanacaste",
    "Guanacaste",
    "costa-rica",
    ["Playa", "Naturaleza"],
    "Playas del Pacífico, bosque seco y paisajes volcánicos.",
    "Consulta las corrientes y las normas de las áreas protegidas.",
  ],
  [
    "punta-cana",
    "Punta Cana",
    "republica-dominicana",
    ["Playa", "Descanso"],
    "Costa de palmeras y arena clara en el extremo oriental de la isla.",
    "Verifica los traslados y las condiciones de playa.",
  ],
  [
    "santo-domingo",
    "Santo Domingo",
    "republica-dominicana",
    ["Cultura", "Gastronomía"],
    "Calles de piedra, museos y cafés en la Ciudad Colonial.",
    "Consulta horarios de monumentos antes de organizar el recorrido.",
  ],
];
export const destinations = places.map(
  ([id, name, country, types, description, tip]) => ({
    id,
    name,
    country,
    types,
    description,
    tip,
  }),
);
export const countryById = (id: string) =>
  countries.find((country) => country.id === id);
export const imageFor = (id: string) =>
  "/images/" +
  ([
    "panama",
    "colombia",
    "mexico",
    "costa-rica",
    "republica-dominicana",
  ].includes(id)
    ? id
    : "panama") +
  ".webp";
const guides: Record<string, [string, string, string]> = {
  "guna-yala": [
    "Islas y comunidades guna",
    "Snorkel en áreas permitidas",
    "Recorre una isla y dedica la tarde a la playa.",
  ],
  "bocas-del-toro": [
    "Isla Colón y Bastimentos",
    "Paseo en lancha y observación de fauna",
    "Recorre Isla Colón y planea una visita a Bastimentos.",
  ],
  boquete: [
    "Cafetales y bosque nuboso",
    "Cata de café y caminata guiada",
    "Empieza en una finca de café y dedica la tarde a un sendero.",
  ],
  chiriqui: [
    "Tierras altas y golfo de Chiriquí",
    "Observación de aves y paseos por senderos",
    "Explora las tierras altas y reserva otro día para la costa.",
  ],
  "ciudad-de-panama": [
    "Casco Antiguo y esclusas de Miraflores",
    "Caminata histórica y visita al Canal",
    "Empieza en el Casco y visita el Canal por la tarde.",
  ],
  medellin: [
    "Comuna 13 y Jardín Botánico",
    "Arte urbano y recorridos culinarios",
    "Explora el Jardín Botánico y dedica la tarde a un recorrido cultural.",
  ],
  bogota: [
    "La Candelaria y Museo del Oro",
    "Ruta de museos y mercados",
    "Camina por el centro histórico y visita el Museo del Oro.",
  ],
  cartagena: [
    "Recinto amurallado y Getsemaní",
    "Paseo histórico y cocina caribeña",
    "Explora las plazas temprano y recorre Getsemaní al final de la tarde.",
  ],
  "san-andres": [
    "Spratt Bight y costa occidental",
    "Baño y observación del mar",
    "Pasa la mañana en la costa y recorre la isla al atardecer.",
  ],
  cancun: [
    "Zona Hotelera y laguna Nichupté",
    "Playa y paseo por la laguna",
    "Dedica una mañana a la playa y la tarde a conocer la laguna.",
  ],
  "ciudad-de-mexico": [
    "Centro Histórico y Chapultepec",
    "Museos y gastronomía de mercado",
    "Visita el Centro Histórico y reserva otro día para Chapultepec.",
  ],
  "riviera-maya": [
    "Tulum y cenotes",
    "Recorrido arqueológico y baño en cenote",
    "Visita el sitio de Tulum por la mañana y un cenote autorizado por la tarde.",
  ],
  "san-jose": [
    "Teatro Nacional y Mercado Central",
    "Ruta cultural y cocina local",
    "Combina una visita al teatro con una pausa en el mercado.",
  ],
  "la-fortuna": [
    "Volcán Arenal y aguas termales",
    "Senderismo y descanso termal",
    "Haz una caminata por la mañana y dedica la tarde a las termales.",
  ],
  guanacaste: [
    "Costa del Pacífico y Rincón de la Vieja",
    "Playa y caminatas en bosque seco",
    "Organiza un día de playa y otro para los senderos.",
  ],
  "punta-cana": [
    "Bávaro y Macao",
    "Descanso y recorridos costeros",
    "Combina una mañana en Bávaro con una visita a Macao.",
  ],
  "santo-domingo": [
    "Zona Colonial y plazas históricas",
    "Caminata patrimonial y museos",
    "Recorre la Ciudad Colonial y termina el día en un café local.",
  ],
};
export const guideFor = (id: string) => guides[id];
export const destinationArtwork: Record<string, string> = {
  "guna-yala": "hero-guna-yala",
  "bocas-del-toro": "bocas",
  boquete: "boquete",
  chiriqui: "boquete",
  "ciudad-de-panama": "capital",
  medellin: "comuna-13",
  bogota: "bogota",
  "san-andres": "san-andres",
  cancun: "cancun",
  "ciudad-de-mexico": "ciudad-de-mexico",
  "san-jose": "san-jose",
  guanacaste: "guanacaste",
  "santo-domingo": "santo-domingo",
  cartagena: "colombia",
  "riviera-maya": "mexico",
  "la-fortuna": "costa-rica",
  "punta-cana": "republica-dominicana",
};
