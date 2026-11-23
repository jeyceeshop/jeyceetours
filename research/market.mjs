import { readFile } from "node:fs/promises";

const [operation, ...args] = process.argv.slice(2);
const usd = (amount) =>
  "US$" +
  new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(amount);
if (operation === "calc") {
  const [supplier, transport, direct, taxes, percent] = args
    .slice(0, 5)
    .map(Number);
  const mode = args[5];
  if (
    args.length !== 6 ||
    ![supplier, transport, direct, taxes, percent].every(
      (n) => Number.isFinite(n) && n >= 0,
    ) ||
    !["margin", "markup"].includes(mode) ||
    (mode === "margin" && percent >= 100)
  ) {
    throw new Error(
      "Uso: calc costoProveedor transporte costosDirectos impuestos porcentaje margin|markup",
    );
  }
  const cost = supplier + transport + direct + taxes;
  if (cost <= 0) throw new Error("El costo total debe ser mayor que cero.");
  const suggested =
    mode === "margin" ? cost / (1 - percent / 100) : cost * (1 + percent / 100);
  const sale = Math.round(suggested * 100) / 100;
  if (!Number.isFinite(sale) || sale <= 0)
    throw new Error("Precio fuera de rango.");
  console.table({
    costo: usd(cost),
    precioPropuesto: usd(sale),
    ganancia: usd(sale - cost),
    margenSobreVenta: (((sale - cost) / sale) * 100).toFixed(2) + "%",
    recargoSobreCosto: (((sale - cost) / cost) * 100).toFixed(2) + "%",
  });
} else if (operation === "compare" && args[0]) {
  const market = JSON.parse(await readFile(args[0], "utf8"));
  console.table(
    market.offers.map((o) => ({
      proveedor: o.provider,
      paquete: o.package,
      referencia: o.usdPrice == null ? "Por verificar" : usd(o.usdPrice),
      estado:
        o.status === "current" &&
        o.validThrough < new Date().toISOString().slice(0, 10)
          ? "expired"
          : o.status,
      salida: o.departure,
      dias: o.durationDays,
      ocupacion: o.occupancy,
      fecha: o.travelDate,
    })),
  );
  console.log(
    "Verifica diferencias de servicios, fechas, salida, ocupación y duración.",
  );
} else {
  console.error(
    "Usos: node research/market.mjs compare archivo-privado.json | calc costoProveedor transporte costosDirectos impuestos porcentaje margin|markup",
  );
  process.exitCode = 1;
}
