import Link from "next/link";
import { Intro } from "../components/site";
export default function NotFound() {
  return (
    <>
      <Intro
        label="Página no encontrada"
        title="Cambiemos de rumbo."
        description="La página que buscas no está disponible."
      />
      <div className="wrap content-section">
        <Link className="button dark" href="/destinos">
          Explorar destinos
        </Link>
      </div>
    </>
  );
}
