"use client";
import { useState } from "react";
import Link from "next/link";
import { brand, whatsappLink } from "../lib/brand";
export function ContactForm() {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const wa = whatsappLink(message);
  return (
    <div className="panel form-shell">
      <h2>Envíanos tu consulta</h2>
      <form
        className="form-grid"
        onSubmit={(e) => {
          e.preventDefault();
          const fields = new FormData(e.currentTarget);
          setMessage(
            "Consulta para Jey Cee Tours\nNombre: " +
              String(fields.get("nombre")).trim() +
              "\nCorreo: " +
              fields.get("email") +
              "\nMensaje: " +
              String(fields.get("mensaje")).trim(),
          );
          setStatus("Consulta preparada. Elige un canal para compartirla.");
        }}
      >
        <label>
          Nombre
          <input
            name="nombre"
            required
            autoComplete="name"
            pattern=".*\S.*"
            maxLength={100}
          />
        </label>
        <label>
          Correo electrónico
          <input
            name="email"
            required
            type="email"
            autoComplete="email"
            maxLength={180}
          />
        </label>
        <label className="full">
          Mensaje
          <textarea name="mensaje" required maxLength={800} />
        </label>
        <label className="check full">
          <input type="checkbox" required />
          <span>
            Autorizo el tratamiento de mis datos para responder esta consulta.{" "}
            <Link href="/privacidad" className="text-link">
              Privacidad
            </Link>
          </span>
        </label>
        <div>
          <button className="button dark">Preparar consulta</button>
        </div>
      </form>
      <p role="status">{status}</p>
      {message && (
        <>
          <pre className="summary">{message}</pre>
          <div className="row">
            {wa && (
              <a
                className="button primary"
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
              >
                Enviar por WhatsApp
              </a>
            )}
            {brand.email && (
              <a
                className="button primary"
                href={
                  "mailto:" +
                  brand.email +
                  "?subject=Consulta&body=" +
                  encodeURIComponent(message)
                }
              >
                Enviar por correo
              </a>
            )}
            {!wa && !brand.email && (
              <span className="notice">
                Canales pendientes de configuración.
              </span>
            )}
            <button
              className="text-link"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(message);
                  setStatus("Consulta copiada.");
                } catch {
                  setStatus("Selecciona y copia el texto manualmente.");
                }
              }}
            >
              Copiar consulta
            </button>
          </div>
        </>
      )}
    </div>
  );
}
