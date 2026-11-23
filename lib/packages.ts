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
  duration: number;
  level: string;
  type: string;
  departure: string;
  itinerary: string[];
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
    country: "panama",
    city: "Guna Yala",
    duration: 1,
    level: "Essential",
    type: "Playa",
    departure: "Ciudad de Panamá",
    itinerary: [
      "Salida hacia la costa de Guna Yala.",
      "Recorrido entre islas y tiempo en la playa.",
      "Regreso a Ciudad de Panamá.",
    ],
    includes: [],
    excludes: [],
  },
  {
    id: "guatape-y-piedra-del-penol",
    title: "Guatapé y Piedra del Peñol",
    country: "colombia",
    city: "Guatapé",
    duration: 1,
    level: "Essential",
    type: "Cultura",
    departure: "Medellín",
    itinerary: [
      "Ruta panorámica hacia el oriente antioqueño.",
      "Visita a la zona de la Piedra del Peñol.",
      "Recorrido por las calles y zócalos de Guatapé.",
    ],
    includes: [],
    excludes: [],
  },
  {
    id: "comuna-13",
    title: "Arte urbano en la Comuna 13",
    country: "colombia",
    city: "Medellín",
    duration: 1,
    level: "Essential",
    type: "Cultura",
    departure: "Medellín",
    itinerary: [
      "Encuentro en Medellín.",
      "Caminata editorial entre murales y espacios culturales.",
      "Tiempo para explorar la gastronomía del sector.",
    ],
    includes: [],
    excludes: [],
  },
  {
    id: "riviera-maya",
    title: "Playas y cenotes de Riviera Maya",
    country: "mexico",
    city: "Riviera Maya",
    duration: 4,
    level: "Plus",
    type: "Aventura",
    departure: "Cancún",
    itinerary: [
      "Llegada y tiempo para explorar la costa.",
      "Visita a un cenote con acceso autorizado.",
      "Día de playa y gastronomía local.",
      "Regreso a Cancún.",
    ],
    includes: [],
    excludes: [],
  },
  {
    id: "arenal",
    title: "Bosque y termales en Arenal",
    country: "costa-rica",
    city: "La Fortuna",
    duration: 3,
    level: "Plus",
    type: "Naturaleza",
    departure: "San José",
    itinerary: [
      "Traslado hacia La Fortuna.",
      "Senderos de Arenal y descanso en aguas termales.",
      "Regreso al Valle Central.",
    ],
    includes: [],
    excludes: [],
  },
  {
    id: "punta-cana",
    title: "Escapada al Caribe dominicano",
    country: "republica-dominicana",
    city: "Punta Cana",
    duration: 4,
    level: "Signature",
    type: "Descanso",
    departure: "Punta Cana",
    itinerary: [
      "Llegada a Punta Cana.",
      "Día de playa.",
      "Tiempo libre en la costa.",
      "Regreso.",
    ],
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
export const example = "Itinerario ilustrativo · Registro de interés";

const artwork: Record<string, string[]> = {
  "guna-yala-en-un-dia": ["hero", "panama"],
  "guatape-y-piedra-del-penol": ["guatape", "guatape-street"],
  "comuna-13": ["comuna-13"],
  "riviera-maya": ["mexico", "cancun"],
  arenal: ["costa-rica", "arenal-forest"],
  "punta-cana": ["republica-dominicana"],
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
