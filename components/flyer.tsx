"use client";
import { useState } from "react";
import { Download } from "lucide-react";
import { example, rateLabel, type Package } from "../lib/packages";
function load(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}
function drawCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  x: number,
  y: number,
  w: number,
  h: number,
) {
  const scale = Math.max(w / img.width, h / img.height);
  const cropW = w / scale,
    cropH = h / scale;
  ctx.drawImage(
    img,
    (img.width - cropW) / 2,
    (img.height - cropH) / 2,
    cropW,
    cropH,
    x,
    y,
    w,
    h,
  );
}
export function Flyer({ item, images }: { item: Package; images: string[] }) {
  const [height, setHeight] = useState(1350);
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  async function exportFlyer() {
    setBusy(true);
    setStatus("Preparando imagen…");
    try {
      const canvas = document.createElement("canvas");
      canvas.width = 1080;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas");
      const pixels = height === 1350 ? 510 : 730;
      const visuals = await Promise.all(images.map(load));
      const mark = await load("/images/logo.svg");
      ctx.fillStyle = "#fafaf7";
      ctx.fillRect(0, 0, 1080, height);
      if (visuals[0]) drawCover(ctx, visuals[0], 0, 0, 1080, pixels);
      const gradient = ctx.createLinearGradient(0, pixels * 0.4, 0, pixels);
      gradient.addColorStop(0, "transparent");
      gradient.addColorStop(1, "#102a43");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 1080, pixels);
      function text(
        value: string,
        y: number,
        size = 34,
        color = "#102a43",
        heading = false,
      ) {
        ctx!.fillStyle = color;
        ctx!.font = (heading ? "bold " : "") + size + "px system-ui";
        let line = "";
        for (const word of value.split(" ")) {
          if (line && ctx!.measureText(line + " " + word).width > 952) {
            ctx!.fillText(line, 64, y);
            y += size * 1.16;
            line = word;
          } else line += (line ? " " : "") + word;
        }
        ctx!.fillText(line, 64, y);
        return y + size * 1.25;
      }
      text(
        item.city.toUpperCase() + " · " + item.level.toUpperCase(),
        pixels - 141,
        27,
        "#c5fff4",
        true,
      );
      text(item.title, pixels - 77, 58, "#ffffff", true);
      let y = pixels + 73;
      y = text(
        rateLabel(item.verifiedRate) +
          " · " +
          item.duration +
          " " +
          (item.duration === 1 ? "día" : "días"),
        y,
        43,
        "#102a43",
        true,
      );
      y = text(example, y + 11, 25, "#08645f");
      y = text(
        "Servicios: " + (item.includes.join(" · ") || "por confirmar"),
        y + 23,
        31,
      );
      y = text("Recorrido", y + 27, 36, "#102a43", true);
      for (const stage of item.itinerary) y = text("• " + stage, y + 11, 29);
      if (visuals[1] && y + 100 < height - 180)
        drawCover(ctx, visuals[1], 64, y, 952, Math.min(280, height - y - 180));
      ctx.fillStyle = "#e0f3ee";
      ctx.fillRect(0, height - 136, 1080, 136);
      ctx.drawImage(mark, 64, height - 111, 52, 63);
      ctx.fillStyle = "#102a43";
      ctx.font = "bold 28px system-ui";
      ctx.fillText("JEY CEE TOURS", 133, height - 72);
      ctx.font = "25px system-ui";
      ctx.fillText("Solicita tu itinerario", 680, height - 72);
      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, "image/png"),
      );
      if (!blob) throw new Error("Imagen");
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = item.id + "-1080x" + height + ".png";
      a.click();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
      setStatus("Flyer descargado.");
    } catch {
      setStatus("No se pudo exportar el flyer. Intenta nuevamente.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="panel">
      <h3>Flyer de viaje</h3>
      <p>Comparte el itinerario ilustrativo como imagen.</p>
      <label>
        Formato
        <select
          value={height}
          onChange={(e) => setHeight(Number(e.target.value))}
        >
          <option value={1350}>1080 × 1350 · Publicación</option>
          <option value={1920}>1080 × 1920 · Historia</option>
        </select>
      </label>
      <p>
        <button className="button dark" onClick={exportFlyer} disabled={busy}>
          <Download size={16} /> Descargar PNG
        </button>
      </p>
      <p role="status">{status}</p>
    </div>
  );
}
