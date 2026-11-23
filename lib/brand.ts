export const brand = {
  name: "Jey Cee Tours",
  slogan: "Your Journey, Our Passion.",
  site: process.env.NEXT_PUBLIC_SITE_URL,
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP,
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL,
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM,
  facebook: process.env.NEXT_PUBLIC_FACEBOOK,
  hours: process.env.NEXT_PUBLIC_HOURS,
};

export function whatsappLink(message: string) {
  const number = brand.whatsapp?.replace(/[+\s()-]/g, "");
  return number && /^[1-9]\d{7,14}$/.test(number)
    ? "https://wa.me/" + number + "?text=" + encodeURIComponent(message)
    : null;
}

export const nav = [
  ["Inicio", "/"],
  ["Destinos", "/destinos"],
  ["Explora Panamá", "/panama"],
  ["Explora América", "/america"],
  ["Experiencias", "/experiencias"],
  ["Paquetes", "/paquetes"],
  ["Categorías", "/categorias"],
  ["Nosotros", "/nosotros"],
  ["Contacto", "/contacto"],
];
