export type Rate = {
  amount: number;
  unit: "persona" | "pareja" | "grupo" | "habitación" | "paquete";
  validThrough: string;
  source: string;
  includesTaxes: boolean;
  mandatoryCharges: string;
};
export type Package = {
  id: string;
  title: string;
  country: string;
  city: string;
  places: string[];
  summary: string;
  duration: number;
  level: string;
  type: string;
  departure: string;
  includes: string[];
  excludes: string[];
  verifiedRate?: Rate;
  totalRate?: Rate;
  lodging?: boolean;
  flights?: boolean;
  hotel?: string;
  transfers?: boolean;
  meals?: boolean;
  excursions?: boolean;
  tickets?: boolean;
  guide?: boolean;
  assistance?: boolean;
  cancellation?: string;
  operator?: string;
  dates?: string[];
  occupancy?: string;
  requirements?: string;
  restrictions?: string;
  bookingConditions?: string;
};
export const packages: Package[] = [
  {
    id: "guna-yala-en-un-dia",
    title: "Islas de Guna Yala",
    places: ["guna-yala"],
    summary: "Un día entre cayos, arena blanca y el mar de Guna Yala.",
    country: "panama",
    city: "Guna Yala",
    duration: 1,
    level: "Essential",
    type: "Playa",
    departure: "Ciudad de Panamá",
    includes: [],
    excludes: [],
  },
  {
    id: "guatape-y-piedra-del-penol",
    title: "Guatapé y Piedra del Peñol",
    places: ["medellin"],
    summary:
      "Vistas al embalse y una caminata por las calles de zócalos pintados.",
    country: "colombia",
    city: "Guatapé",
    duration: 1,
    level: "Essential",
    type: "Cultura",
    departure: "Medellín",
    includes: [],
    excludes: [],
  },
  {
    id: "comuna-13",
    title: "Arte urbano en la Comuna 13",
    places: ["medellin"],
    summary: "Murales, escaleras y cultura local en las laderas de Medellín.",
    country: "colombia",
    city: "Medellín",
    duration: 1,
    level: "Essential",
    type: "Cultura",
    departure: "Medellín",
    includes: [],
    excludes: [],
  },
  {
    id: "riviera-maya",
    title: "Playas y cenotes de Riviera Maya",
    places: ["riviera-maya", "cancun"],
    summary: "Combina la costa del Caribe con un cenote y una visita a Tulum.",
    country: "mexico",
    city: "Riviera Maya",
    duration: 4,
    level: "Plus",
    type: "Aventura",
    departure: "Cancún",
    includes: [],
    excludes: [],
  },
  {
    id: "arenal",
    title: "Bosque y termales en Arenal",
    places: ["la-fortuna"],
    summary:
      "Senderos con vistas al volcán y una tarde de descanso entre aguas termales.",
    country: "costa-rica",
    city: "La Fortuna",
    duration: 3,
    level: "Plus",
    type: "Naturaleza",
    departure: "San José",
    includes: [],
    excludes: [],
  },
  {
    id: "punta-cana",
    title: "Escapada al Caribe dominicano",
    places: ["punta-cana"],
    summary: "Cuatro días para descubrir la costa de Punta Cana a tu ritmo.",
    country: "republica-dominicana",
    city: "Punta Cana",
    duration: 4,
    level: "Signature",
    type: "Descanso",
    departure: "Punta Cana",
    includes: [],
    excludes: [],
  },
  {
    id: "bocas-entre-islas",
    title: "Bocas entre islas",
    country: "panama",
    city: "Bocas del Toro",
    places: ["bocas-del-toro"],
    summary:
      "Tres días entre la vida caribeña de Isla Colón y los paisajes de Bastimentos.",
    duration: 3,
    level: "Plus",
    type: "Playa",
    departure: "Isla Colón",
    includes: [],
    excludes: [],
  },
  {
    id: "cafes-y-senderos-de-boquete",
    title: "Cafés y senderos de Boquete",
    country: "panama",
    city: "Boquete",
    places: ["boquete", "chiriqui"],
    summary:
      "Fincas de café y senderos de montaña en las tierras altas de Chiriquí.",
    duration: 2,
    level: "Essential",
    type: "Naturaleza",
    departure: "David",
    includes: [],
    excludes: [],
  },
  {
    id: "casco-y-canal",
    title: "Casco Antiguo y Canal",
    country: "panama",
    city: "Ciudad de Panamá",
    places: ["ciudad-de-panama"],
    summary:
      "Plazas históricas, arquitectura del Casco y una visita a Miraflores.",
    duration: 1,
    level: "Essential",
    type: "Cultura",
    departure: "Ciudad de Panamá",
    includes: [],
    excludes: [],
  },
  {
    id: "cartagena-tras-las-murallas",
    title: "Cartagena tras las murallas",
    country: "colombia",
    city: "Cartagena",
    places: ["cartagena"],
    summary: "Plazas coloniales, cocina caribeña y caminatas al atardecer.",
    duration: 3,
    level: "Plus",
    type: "Cultura",
    departure: "Cartagena",
    includes: [],
    excludes: [],
  },
  {
    id: "bogota-arte-y-mercados",
    title: "Bogotá entre arte y mercados",
    country: "colombia",
    city: "Bogotá",
    places: ["bogota"],
    summary:
      "El centro histórico, museos y mercados para conocer la capital andina.",
    duration: 2,
    level: "Essential",
    type: "Gastronomía",
    departure: "Bogotá",
    includes: [],
    excludes: [],
  },
  {
    id: "san-andres-tonos-de-azul",
    title: "San Andrés en tonos de azul",
    country: "colombia",
    city: "San Andrés",
    places: ["san-andres"],
    summary: "Un fin de semana entre playas tranquilas y miradores al Caribe.",
    duration: 3,
    level: "Plus",
    type: "Playa",
    departure: "San Andrés",
    includes: [],
    excludes: [],
  },
  {
    id: "cdmx-arte-y-sabores",
    title: "Ciudad de México: arte y sabores",
    country: "mexico",
    city: "Ciudad de México",
    places: ["ciudad-de-mexico"],
    summary: "Una escapada urbana entre mercados, museos y calles históricas.",
    duration: 3,
    level: "Essential",
    type: "Gastronomía",
    departure: "Ciudad de México",
    includes: [],
    excludes: [],
  },
  {
    id: "cancun-en-familia",
    title: "Cancún en familia",
    country: "mexico",
    city: "Cancún",
    places: ["cancun"],
    summary: "Una escapada con tiempo para la playa y un paseo por la laguna.",
    duration: 3,
    level: "Plus",
    type: "Viajes familiares",
    departure: "Cancún",
    includes: [],
    excludes: [],
  },
  {
    id: "guanacaste-entre-bosque-y-mar",
    title: "Guanacaste entre bosque y mar",
    country: "costa-rica",
    city: "Guanacaste",
    places: ["guanacaste"],
    summary: "Caminatas en el bosque seco y tardes junto al Pacífico.",
    duration: 4,
    level: "Plus",
    type: "Naturaleza",
    departure: "Liberia",
    includes: [],
    excludes: [],
  },
  {
    id: "san-jose-cultural",
    title: "San José cultural",
    country: "costa-rica",
    city: "San José",
    places: ["san-jose"],
    summary: "El Teatro Nacional, el Mercado Central y una tarde de museos.",
    duration: 2,
    level: "Essential",
    type: "Cultura",
    departure: "San José",
    includes: [],
    excludes: [],
  },
  {
    id: "santo-domingo-colonial",
    title: "Santo Domingo colonial",
    country: "republica-dominicana",
    city: "Santo Domingo",
    places: ["santo-domingo"],
    summary:
      "Un fin de semana a pie por plazas, cafés y calles de la Ciudad Colonial.",
    duration: 2,
    level: "Essential",
    type: "Cultura",
    departure: "Santo Domingo",
    includes: [],
    excludes: [],
  },
  {
    id: "playas-de-punta-cana",
    title: "Bávaro y Macao",
    country: "republica-dominicana",
    city: "Punta Cana",
    places: ["punta-cana"],
    summary:
      "Dos días para descubrir ambientes distintos de la costa oriental.",
    duration: 2,
    level: "Plus",
    type: "Playa",
    departure: "Punta Cana",
    includes: [],
    excludes: [],
  },
];
export function currentRate(rate?: Rate) {
  return rate &&
    rate.amount > 0 &&
    /^https:\/\//.test(rate.source) &&
    rate.validThrough >= new Date().toISOString().slice(0, 10)
    ? rate
    : undefined;
}
export const usd = (amount: number) =>
  "US$" +
  new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(amount);
export function rateLabel(rate?: Rate) {
  const active = currentRate(rate);
  return active
    ? usd(active.amount) + " por " + active.unit
    : "Consultar precio";
}

const artwork: Record<string, string[]> = {
  "guna-yala-en-un-dia": ["hero-guna-yala", "panama"],
  "guatape-y-piedra-del-penol": ["guatape", "guatape-street"],
  "comuna-13": ["comuna-13"],
  "riviera-maya": ["mexico", "cancun"],
  arenal: ["costa-rica", "arenal-forest"],
  "punta-cana": ["republica-dominicana", "republica-dominicana-vista"],
  "bocas-entre-islas": ["bocas"],
  "cafes-y-senderos-de-boquete": ["boquete"],
  "casco-y-canal": ["capital"],
  "cartagena-tras-las-murallas": ["colombia", "colombia-vista"],
  "bogota-arte-y-mercados": ["bogota"],
  "san-andres-tonos-de-azul": ["san-andres"],
  "cdmx-arte-y-sabores": ["ciudad-de-mexico"],
  "cancun-en-familia": ["cancun"],
  "guanacaste-entre-bosque-y-mar": ["guanacaste"],
  "san-jose-cultural": ["san-jose"],
  "santo-domingo-colonial": ["santo-domingo"],
  "playas-de-punta-cana": [
    "republica-dominicana-vista",
    "republica-dominicana",
  ],
};
export const packageImages = (p: Package) =>
  (artwork[p.id] ?? []).map((id) => "/images/" + id + ".webp");

// Editorial planning amounts in USD. They do not come from operator quotes.
export const planningBudget: Record<string, number> = {
  "guna-yala-en-un-dia": 120,
  "guatape-y-piedra-del-penol": 65,
  "comuna-13": 40,
  "riviera-maya": 650,
  arenal: 450,
  "punta-cana": 720,
};
