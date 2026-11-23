import { CalendarDays, MapPin, Search, Users, Wallet } from "lucide-react";
import { budgets, countries } from "../lib/destinations";

export function TravelSearch() {
  return (
    <div className="wrap travel-search">
      <form
        action="/paquetes"
        className="search-panel"
        aria-label="Busca tu próxima escapada"
      >
        <label>
          <MapPin />
          <span>
            Destino
            <select name="pais" aria-label="País de destino">
              <option value="">Todos los países</option>
              {countries.map((country) => (
                <option key={country.id} value={country.id}>
                  {country.name}
                </option>
              ))}
            </select>
          </span>
        </label>
        <label>
          <CalendarDays />
          <span>
            Fecha aproximada
            <input aria-label="Fecha aproximada" type="date" name="fecha" />
          </span>
        </label>
        <label>
          <Users />
          <span>
            Viajeros
            <select name="viajeros" aria-label="Viajeros">
              <option value="">¿Cuántos viajan?</option>
              {Array.from({ length: 10 }, (_, index) => (
                <option key={index} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </select>
          </span>
        </label>
        <label>
          <Wallet />
          <span>
            Presupuesto
            <select name="presupuesto" aria-label="Presupuesto total">
              <option value="">Tu rango en USD</option>
              {budgets.map((budget) => (
                <option key={budget}>{budget}</option>
              ))}
            </select>
          </span>
        </label>
        <button className="button dark">
          <Search size={18} /> Buscar rutas
        </button>
      </form>
    </div>
  );
}
