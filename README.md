# Jey Cee Tours

Sitio informativo de viajes por Panamá y América. Incluye guías, catálogo de itinerarios ilustrativos, comparador, planificador con registro de interés y exportaciones PNG.

## Desarrollo y despliegue

Requiere Node.js 22 o superior y npm.

```sh
npm ci
cp .env.example .env.local
npm run dev
```

Abre `http://localhost:3000`. Configura `NEXT_PUBLIC_WHATSAPP` con el número internacional de la agencia, `NEXT_PUBLIC_CONTACT_EMAIL`, los enlaces sociales, el horario y `NEXT_PUBLIC_SITE_URL` con la URL absoluta final. Los valores `NEXT_PUBLIC_` se incorporan al compilar y son públicos por diseño.

```sh
npm run lint
npm run typecheck
npm run build
npm start
```

Para desplegar, importa el repositorio como proyecto Next.js en un proveedor compatible o ejecuta la compilación y `npm start` en un servidor Node.js. Configura las variables antes de compilar. La URL pública habilita el sitemap y la imagen de Open Graph. Valida los canales y revisa los textos legales antes de publicar.

## Catálogo y medios

Los archivos `lib/destinations.ts` y `lib/packages.ts` contienen las guías y los itinerarios. Los presupuestos tentativos son ejemplos editoriales por persona sin inclusiones confirmadas. Para mostrar una tarifa comercial se requiere una fuente, importe, unidad, alcance de impuestos y cargos, y vigencia. Los formularios preparan un mensaje en el navegador y el visitante decide si lo comparte por WhatsApp o correo.

Los WebP de `public/images` son ilustraciones generadas de aspecto fotográfico. Sustituir por fotografías verificadas con licencia comercial documentada antes de usarlas como material documental. El símbolo SVG es un trazado del logo entregado por la marca.

## Investigación interna local

`research/sources.json` registra las fuentes suministradas. El 23 de noviembre de 2026, el proxy bloqueó el acceso a esas páginas y a los portales de turismo de Panamá, Colombia, México, Costa Rica y República Dominicana. No se verificaron precios, disponibilidad o condiciones. No se importan estas referencias desde el sitio.

La plantilla `research/example.json` es una demostración sin datos reales. Guarda proveedores, referencias y tarifas negociadas en una copia **fuera del repositorio**, con permisos de acceso privados, y edítala localmente. La herramienta de comparación y la calculadora se ejecutan desde la terminal. Este flujo carece de autenticación y gestión multiusuario, así que no constituye un panel de producción. El sitio no publica rutas de administración.

```sh
node research/market.mjs compare research/example.json
node research/market.mjs calc 150 25 15 10 20 margin
node research/market.mjs calc 150 25 15 10 20 markup
```

Los importes de la calculadora se expresan en USD. `margin` calcula el margen como proporción del precio de venta y `markup` calcula el recargo como proporción del costo. Los resultados son estimaciones de trabajo. Las tarifas negociadas y las comisiones deben permanecer en el archivo privado.
