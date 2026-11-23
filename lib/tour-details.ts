type TourDetails = {
  meeting: string;
  arrival: string;
  stages: { title: string; stops: string[]; description: string }[];
  planned: string[];
  extras: string[];
  bring: string;
};

export const tourDetails: Record<string, TourDetails> = {
  "guna-yala-en-un-dia": {
    meeting:
      "Recogida por coordinar en Ciudad de Panamá. El embarque se haría en un puerto habilitado de la comarca.",
    arrival: "Regreso a Ciudad de Panamá desde el puerto de embarque.",
    stages: [
      {
        title: "De la ciudad al Caribe",
        stops: ["Ciudad de Panamá", "Puerto autorizado de Guna Yala"],
        description:
          "Traslado por tierra hasta el punto de embarque. El operador indicará la hora de recogida y los documentos requeridos por la comarca.",
      },
      {
        title: "Cayos y playas",
        stops: ["Isla Perro Chico", "Cayo alternativo autorizado"],
        description:
          "Navegación entre islas y tiempo para playa. El acceso al área del naufragio, si se propone, depende del mar y de las reglas de la comunidad.",
      },
      {
        title: "Última parada y regreso",
        stops: [
          "Isla asignada para el almuerzo",
          "Puerto de embarque",
          "Ciudad de Panamá",
        ],
        description:
          "Pausa para almorzar en la isla que indique el operador, regreso en lancha al puerto y continuación en vehículo hacia la ciudad.",
      },
    ],
    planned: [
      "Traslado terrestre de ida y vuelta y tramos de lancha entre las paradas del circuito.",
      "Almuerzo sencillo en una isla, con menú y opciones alimentarias por confirmar.",
    ],
    extras: [
      "Tasas de acceso a la comarca o a las islas, según desglose de la cotización.",
      "Equipo de snorkel, bebidas y compras personales.",
    ],
    bring:
      "Documento de identidad, efectivo, agua, protección solar y una bolsa impermeable. Consulta la accesibilidad de los embarques y lleva el equipaje que permita la lancha.",
  },
  "guatape-y-piedra-del-penol": {
    meeting: "Punto de recogida por acordar en Medellín.",
    arrival: "Medellín, en el punto que se acuerde para el regreso.",
    stages: [
      {
        title: "Camino al embalse",
        stops: ["Medellín", "El Peñol"],
        description:
          "Salida hacia el oriente antioqueño con una pausa panorámica en la zona del embalse.",
      },
      {
        title: "La Piedra",
        stops: ["Piedra del Peñol"],
        description:
          "Tiempo para ver el monolito desde la base. Quien quiera subir puede hacerlo por las escaleras si el sitio está abierto y cuenta con entrada.",
      },
      {
        title: "El pueblo de los zócalos",
        stops: [
          "Plazoleta de los Zócalos",
          "Calle del Recuerdo",
          "Parque principal de Guatapé",
        ],
        description:
          "Caminata por el pueblo y tiempo libre para comer antes del regreso.",
      },
    ],
    planned: [
      "Transporte terrestre Medellín–Guatapé–Medellín.",
      "Acompañamiento durante el recorrido por el pueblo.",
    ],
    extras: [
      "Entrada para subir a la Piedra del Peñol.",
      "Almuerzo, paseo en embarcación y gastos personales.",
    ],
    bring:
      "Calzado cómodo, agua y protección para el sol o la lluvia. El ascenso a la Piedra se realiza por escaleras y puede omitirse.",
  },
  "comuna-13": {
    meeting: "Estación San Javier, con punto exacto por coordinar.",
    arrival: "Sector de San Javier, con orientación para continuar en metro.",
    stages: [
      {
        title: "Encuentro en San Javier",
        stops: ["Estación San Javier"],
        description:
          "Introducción al barrio y al contexto de la visita antes de dirigirse al inicio de la caminata.",
      },
      {
        title: "Arte urbano y memoria",
        stops: [
          "Escaleras eléctricas",
          "Corredor de murales de Las Independencias",
        ],
        description:
          "Recorrido a pie por los murales, los tramos de escaleras y los espacios culturales que estén abiertos.",
      },
      {
        title: "Tiempo en el barrio",
        stops: ["Sector de galerías y comercios locales", "San Javier"],
        description:
          "Pausa para visitar comercios y galerías abiertas antes de terminar el recorrido.",
      },
    ],
    planned: [
      "Recorrido a pie con acompañamiento local y contexto sobre los murales.",
      "Orientación sobre los accesos y puntos de encuentro.",
    ],
    extras: [
      "Metro, transporte desde el hotel y consumos en el barrio.",
      "Compras de arte, propinas y actividades de pago.",
    ],
    bring:
      "Calzado con agarre, agua y ropa ligera. La ruta tiene pendientes y escalones.",
  },
  "riviera-maya": {
    meeting: "Punto de encuentro por acordar en Cancún.",
    arrival: "Cancún, en el punto acordado para el regreso.",
    stages: [
      {
        title: "Llegada a la costa",
        stops: ["Cancún", "Playa del Carmen"],
        description:
          "Salida por carretera hacia la zona de alojamiento y paseo por el centro de Playa del Carmen según la hora de llegada.",
      },
      {
        title: "Ruinas frente al Caribe",
        stops: ["Zona Arqueológica de Tulum", "Costa de Tulum"],
        description:
          "Visita al recinto arqueológico con tiempo para el paseo costero. Los accesos y cargos se revisan para la fecha del viaje.",
      },
      {
        title: "Cenote y tarde libre",
        stops: ["Cenote Dos Ojos", "Playa del Carmen"],
        description:
          "Visita propuesta a Dos Ojos con modalidad de acceso por confirmar, seguida de una tarde libre.",
      },
      {
        title: "Regreso",
        stops: ["Playa del Carmen", "Cancún"],
        description:
          "Tiempo libre antes de recorrer de vuelta el tramo hacia Cancún.",
      },
    ],
    planned: [
      "Traslados terrestres de la ruta y tres noches en la zona de Playa del Carmen, con hotel por seleccionar.",
      "Visita a Tulum y a un cenote con accesos habilitados, a confirmar en la propuesta.",
    ],
    extras: [
      "Vuelos, comidas fuera del plan y bebidas.",
      "Entradas, equipo acuático y cargos de conservación, salvo que se detallen en el presupuesto.",
    ],
    bring:
      "Calzado para caminar, traje de baño y toalla. Consulta los requisitos de chaleco y productos permitidos antes de entrar al cenote.",
  },
  arenal: {
    meeting: "Recogida por coordinar en San José.",
    arrival: "San José, en el punto acordado.",
    stages: [
      {
        title: "Del Valle Central a La Fortuna",
        stops: ["San José", "La Fortuna"],
        description:
          "Traslado terrestre y tiempo para recorrer el pueblo o descansar tras la llegada.",
      },
      {
        title: "Senderos y aguas termales",
        stops: [
          "Parque Nacional Volcán Arenal",
          "Complejo termal por seleccionar",
        ],
        description:
          "Caminata por un sendero abierto con vistas según el clima. Por la tarde, descanso en un complejo termal a confirmar.",
      },
      {
        title: "Regreso al Valle Central",
        stops: ["La Fortuna", "San José"],
        description: "Tiempo libre antes del traslado de regreso a San José.",
      },
    ],
    planned: [
      "Transporte terrestre San José–La Fortuna–San José y dos noches de alojamiento por definir.",
      "Traslados para la jornada de senderismo y termales. Los accesos se detallarán en la propuesta.",
    ],
    extras: [
      "Comidas, vuelos y gastos personales.",
      "Entradas al parque y pase termal, salvo que figuren en la cotización.",
    ],
    bring:
      "Calzado cerrado, impermeable ligero y traje de baño. Consulta qué senderos están habilitados y el esfuerzo requerido.",
  },
  "punta-cana": {
    meeting: "Hotel o sector de alojamiento por coordinar en Punta Cana.",
    arrival:
      "Zona hotelera de Punta Cana. El traslado de salida se cotiza según el punto acordado.",
    stages: [
      {
        title: "Llegada a Punta Cana",
        stops: ["Punta Cana", "Zona hotelera de Bávaro"],
        description:
          "Llegada al alojamiento y tiempo libre para conocer el entorno.",
      },
      {
        title: "Día en Bávaro",
        stops: ["Playa Bávaro"],
        description:
          "Tiempo para descansar junto al mar y elegir actividades de playa según las condiciones.",
      },
      {
        title: "Costa de Macao",
        stops: ["Playa Macao"],
        description:
          "Media jornada propuesta para conocer la costa y regresar al alojamiento para la tarde libre.",
      },
      {
        title: "Despedida",
        stops: ["Zona hotelera de Bávaro", "Punta Cana"],
        description:
          "Tiempo libre según el horario de salida y coordinación del traslado de regreso.",
      },
    ],
    planned: [
      "Tres noches en la zona hotelera de Bávaro, con categoría, hotel y régimen por definir.",
      "Traslado local para la visita a Macao.",
    ],
    extras: [
      "Vuelos, traslados de aeropuerto salvo cotización, y actividades acuáticas.",
      "Comidas y bebidas fuera del régimen hotelero acordado.",
    ],
    bring:
      "Protección solar y ropa para playa. Bávaro y Macao ofrecen condiciones distintas; consulta el estado del mar antes de bañarte.",
  },
  "bocas-entre-islas": {
    meeting: "Muelle por confirmar en Bocas Town, Isla Colón.",
    arrival: "Bocas Town, Isla Colón.",
    stages: [
      {
        title: "Pueblo y costa de Isla Colón",
        stops: ["Bocas Town", "Playa Bluff"],
        description:
          "Recorrido por el pueblo y salida hacia Playa Bluff para conocer el litoral. El paseo se adapta a las condiciones locales.",
      },
      {
        title: "Bastimentos",
        stops: ["Muelle de Bocas Town", "Isla Bastimentos", "Playa Red Frog"],
        description:
          "Salida en lancha y paseo en Bastimentos. El tramo final y el acceso a playa se ajustan al estado del mar y del sendero.",
      },
      {
        title: "Última mañana en Isla Colón",
        stops: ["Bocas Town", "Isla Colón"],
        description:
          "Tiempo libre cerca del pueblo antes de terminar en el punto de encuentro acordado.",
      },
    ],
    planned: [
      "Dos noches en Isla Colón, con alojamiento por definir.",
      "Traslado local hacia Bluff y lancha de ida y vuelta a Bastimentos.",
    ],
    extras: [
      "Transporte desde tierra firme hasta Isla Colón, comidas y bebidas.",
      "Tasas de acceso a senderos o playas, equipo y actividades acuáticas adicionales.",
    ],
    bring:
      "Repelente, ropa que seque rápido y bolsa impermeable. Confirma con el operador qué zonas permiten baño.",
  },
  "cafes-y-senderos-de-boquete": {
    meeting: "Punto de recogida por confirmar en David, Chiriquí.",
    arrival: "David, después del tramo Boquete–David.",
    stages: [
      {
        title: "Café de altura",
        stops: ["David", "Bajo Boquete", "Finca cafetalera por seleccionar"],
        description:
          "Salida hacia Boquete. La propuesta contempla conocer el proceso del café, una degustación y tiempo en el centro del pueblo.",
      },
      {
        title: "Bosque nuboso",
        stops: [
          "Sendero Los Quetzales, si está habilitado",
          "Bajo Boquete",
          "David",
        ],
        description:
          "Caminata en un tramo habilitado, o en un sendero alternativo si el clima o el acceso lo requieren. Regreso a David.",
      },
    ],
    planned: [
      "Traslados David–Boquete–David y una noche en la zona de Boquete.",
      "Visita a una finca y degustación. El sendero y cualquier guía de montaña se evalúan según las condiciones.",
    ],
    extras: [
      "Comidas fuera de la degustación y bebidas.",
      "Entradas, equipo especial y servicios adicionales de guía, salvo desglose en la propuesta.",
    ],
    bring:
      "Abrigo ligero, capa para la lluvia y zapatos con agarre. Indica tu experiencia de caminata para ajustar la ruta.",
  },
  "casco-y-canal": {
    meeting: "Plaza de la Independencia o punto acordado en Ciudad de Panamá.",
    arrival: "Ciudad de Panamá, tras la visita a Miraflores.",
    stages: [
      {
        title: "Historia en las plazas",
        stops: [
          "Plaza de la Independencia",
          "Plaza Bolívar",
          "Plaza de Francia",
        ],
        description:
          "Caminata por las plazas y calles del Casco Antiguo, con paradas para apreciar la arquitectura y los miradores.",
      },
      {
        title: "Pausa en el Casco",
        stops: ["Casco Antiguo"],
        description:
          "Tiempo libre para almorzar antes de partir hacia la zona del Canal.",
      },
      {
        title: "El Canal de Panamá",
        stops: ["Centro de Visitantes de Miraflores"],
        description:
          "Visita sujeta al horario del centro. El paso de embarcaciones depende de la operación y del momento de la visita.",
      },
    ],
    planned: [
      "Acompañamiento para el recorrido a pie por el Casco Antiguo.",
      "Traslado terrestre entre el Casco y Miraflores.",
    ],
    extras: [
      "Entrada al Centro de Visitantes, salvo cotización expresa.",
      "Almuerzo, bebidas y recogida en el aeropuerto.",
    ],
    bring:
      "Zapatos cómodos, agua y protección solar. Las calles del Casco tienen tramos empedrados.",
  },
  "cartagena-tras-las-murallas": {
    meeting: "Punto por coordinar cerca de la Torre del Reloj.",
    arrival: "Centro histórico de Cartagena.",
    stages: [
      {
        title: "Dentro de las murallas",
        stops: [
          "Torre del Reloj",
          "Plaza de los Coches",
          "Plaza de Santo Domingo",
        ],
        description:
          "Caminata de llegada por las plazas principales, calles con balcones y espacios públicos del centro histórico.",
      },
      {
        title: "Del castillo a Getsemaní",
        stops: ["Castillo de San Felipe de Barajas", "Plaza de la Trinidad"],
        description:
          "Visita al castillo según horario y entrada. Por la tarde, recorrido por las calles y plazas de Getsemaní.",
      },
      {
        title: "Paseo de despedida",
        stops: ["Murallas de Cartagena", "Baluarte de Santo Domingo"],
        description:
          "Paseo antes del cierre del itinerario y tiempo libre para visitar cafés o tiendas.",
      },
    ],
    planned: [
      "Dos noches en Cartagena, con alojamiento por definir.",
      "Caminata con acompañamiento por el centro y Getsemaní.",
    ],
    extras: [
      "Entrada al Castillo de San Felipe, salvo cotización expresa.",
      "Vuelos, traslados aeroportuarios, comidas y excursiones a islas.",
    ],
    bring:
      "Sombrero, calzado con agarre y agua. Es preferible organizar los paseos temprano o al final de la tarde.",
  },
  "bogota-arte-y-mercados": {
    meeting: "Punto por coordinar en La Candelaria.",
    arrival: "Centro histórico de Bogotá.",
    stages: [
      {
        title: "Museos y calles históricas",
        stops: ["Plaza de Bolívar", "Museo Botero", "La Candelaria"],
        description:
          "Caminata por el centro y visita al Museo Botero si está abierto. La programación se ajusta al día de la semana.",
      },
      {
        title: "Cocina de mercado y patrimonio",
        stops: [
          "Plaza de Mercado La Concordia",
          "Chorro de Quevedo",
          "Museo del Oro",
        ],
        description:
          "Pausa en el mercado para conocer su oferta gastronómica y recorrido final con opción de visitar el Museo del Oro.",
      },
    ],
    planned: [
      "Una noche en Bogotá, con alojamiento por definir.",
      "Recorrido a pie y degustación de mercado por acordar.",
    ],
    extras: [
      "Entradas de pago, comidas adicionales y transporte desde el aeropuerto.",
    ],
    bring:
      "Una capa de abrigo, impermeable ligero y agua. La altitud y las pendientes pueden afectar el ritmo de la caminata.",
  },
  "san-andres-tonos-de-azul": {
    meeting: "Punto por acordar en el sector de Spratt Bight.",
    arrival: "Sector de Spratt Bight, norte de la isla.",
    stages: [
      {
        title: "Paseo frente al mar",
        stops: ["Spratt Bight", "Paseo peatonal"],
        description:
          "Recorre el litoral y reserva tiempo para la playa en una zona de baño habilitada.",
      },
      {
        title: "Vuelta a la isla",
        stops: ["La Loma", "Costa occidental de San Andrés"],
        description:
          "Recorrido terrestre con paradas panorámicas. El acceso a puntos recreativos como La Piscinita depende de horario y condiciones.",
      },
      {
        title: "Mañana libre",
        stops: ["Centro de San Andrés", "Spratt Bight"],
        description:
          "Paseo cerca del alojamiento o mañana de playa antes de terminar.",
      },
    ],
    planned: [
      "Dos noches en la isla, con alojamiento por seleccionar.",
      "Transporte terrestre para la vuelta panorámica.",
    ],
    extras: [
      "Vuelos y tarjeta de turismo u otros cargos de ingreso aplicables.",
      "Accesos a balnearios, snorkel, comidas y bebidas.",
    ],
    bring:
      "Consulta con las autoridades y el operador los documentos y cargos de entrada vigentes. Lleva protección solar y calzado para zonas húmedas.",
  },
  "cdmx-arte-y-sabores": {
    meeting: "Punto por coordinar en el Centro Histórico.",
    arrival: "Centro de Ciudad de México, después del paseo de mercado.",
    stages: [
      {
        title: "Arquitectura del centro",
        stops: ["Zócalo", "Alameda Central", "Palacio de Bellas Artes"],
        description:
          "Recorrido por las plazas y exteriores. La visita interior se ajusta a horarios y entradas.",
      },
      {
        title: "Chapultepec y museos",
        stops: ["Bosque de Chapultepec", "Museo Nacional de Antropología"],
        description:
          "Caminata por el bosque y tiempo para el museo según horario y accesos.",
      },
      {
        title: "Cocinas del mercado",
        stops: ["Mercado de San Juan", "Centro Histórico"],
        description:
          "Paseo gastronómico por el mercado y tiempo libre para almorzar.",
      },
    ],
    planned: [
      "Dos noches de alojamiento en Ciudad de México, con zona y hotel por acordar.",
      "Recorridos a pie y degustación seleccionada en el mercado, con menú por confirmar.",
    ],
    extras: [
      "Vuelos, comidas adicionales y entradas a museos o recintos de pago.",
      "Transporte de aeropuerto y servicios privados fuera del plan.",
    ],
    bring:
      "Calzado cómodo y una chaqueta ligera. Indica alergias y preferencias alimentarias al solicitar la propuesta.",
  },
  "cancun-en-familia": {
    meeting: "Hotel o punto acordado en la Zona Hotelera.",
    arrival: "Zona Hotelera de Cancún.",
    stages: [
      {
        title: "Primera tarde en la costa",
        stops: ["Zona Hotelera de Cancún", "Playa Delfines"],
        description:
          "Llegada y visita panorámica a Playa Delfines. El baño se decide según las indicaciones en la playa.",
      },
      {
        title: "Mar y laguna",
        stops: ["Playa Langosta", "Laguna Nichupté"],
        description:
          "Tiempo de playa y paseo por la laguna como opción según el clima, el operador y la edad de los viajeros.",
      },
      {
        title: "Mañana tranquila",
        stops: ["Zona Hotelera"],
        description: "Tiempo libre cerca del alojamiento antes de la salida.",
      },
    ],
    planned: [
      "Dos noches de alojamiento familiar, con ocupación y habitación por definir.",
      "Traslados locales para las visitas de playa previstas.",
    ],
    extras: [
      "Paseo en la laguna y actividades náuticas, salvo cotización.",
      "Vuelos, traslado aeroportuario y comidas fuera del plan acordado.",
    ],
    bring:
      "Protección solar y ropa de baño. Indica las edades de los menores y consulta la política de chalecos y límites de edad para el paseo.",
  },
  "guanacaste-entre-bosque-y-mar": {
    meeting: "Recogida por coordinar en Liberia.",
    arrival: "Liberia tras el tramo de regreso desde la costa.",
    stages: [
      {
        title: "Rumbo al Pacífico",
        stops: ["Liberia", "Playas del Coco"],
        description:
          "Traslado hacia la costa y paseo en el entorno del alojamiento.",
      },
      {
        title: "Playa y costa",
        stops: ["Playa Hermosa", "Golfo de Papagayo"],
        description:
          "Tiempo para recorrer la costa y elegir zonas de baño habilitadas según el estado del mar.",
      },
      {
        title: "Bosque seco y volcán",
        stops: ["Parque Nacional Rincón de la Vieja", "Sector Las Pailas"],
        description:
          "Recorrido por senderos habilitados, sujeto a horarios, cupos y cierres del parque.",
      },
      {
        title: "Regreso a Liberia",
        stops: ["Costa de Guanacaste", "Liberia"],
        description:
          "Mañana libre en la costa y traslado de regreso a Liberia.",
      },
    ],
    planned: [
      "Tres noches en la costa de Guanacaste, con alojamiento por seleccionar.",
      "Traslados terrestres entre Liberia, el alojamiento, la playa y el parque.",
    ],
    extras: [
      "Entrada al parque, comidas y actividades acuáticas.",
      "Vuelos y gastos personales.",
    ],
    bring:
      "Calzado cerrado, repelente y agua para el sendero. Revisa con el operador las condiciones de acceso al parque.",
  },
  "san-jose-cultural": {
    meeting: "Punto por acordar cerca de la Plaza de la Cultura.",
    arrival: "Centro de San José.",
    stages: [
      {
        title: "El centro y sus sabores",
        stops: ["Mercado Central", "Avenida Central", "Plaza de la Cultura"],
        description:
          "Paseo a pie por el centro y tiempo para probar la cocina del mercado.",
      },
      {
        title: "Teatro y museos",
        stops: ["Teatro Nacional", "Museos del Banco Central"],
        description:
          "Visita programable al Teatro Nacional y a los museos subterráneos según horarios y cupos.",
      },
    ],
    planned: [
      "Una noche en San José, con hotel por seleccionar.",
      "Recorrido a pie por el centro y acompañamiento para la zona de museos.",
    ],
    extras: [
      "Entradas a recintos culturales, salvo cotización expresa.",
      "Comidas, bebidas y traslados de aeropuerto.",
    ],
    bring:
      "Calzado cómodo y una capa para la lluvia. Los horarios de funciones y exhibiciones pueden cambiar el orden de la visita.",
  },
  "santo-domingo-colonial": {
    meeting: "Punto por acordar cerca del Parque Colón.",
    arrival: "Ciudad Colonial de Santo Domingo.",
    stages: [
      {
        title: "Calles y plazas coloniales",
        stops: ["Parque Colón", "Calle Las Damas", "Fortaleza Ozama"],
        description:
          "Caminata por el centro histórico con paradas exteriores. La visita interior a la fortaleza depende del horario y la entrada.",
      },
      {
        title: "Plaza España y ribera",
        stops: ["Plaza de España", "Alcázar de Colón", "Río Ozama"],
        description:
          "Paseo por la Plaza de España y el entorno del río. Las visitas interiores se confirman según aperturas.",
      },
    ],
    planned: [
      "Una noche en la zona colonial, con alojamiento por definir.",
      "Recorrido a pie con acompañamiento e introducción histórica.",
    ],
    extras: [
      "Entradas a museos y monumentos, salvo que aparezcan en el presupuesto.",
      "Comidas, traslados de aeropuerto y compras.",
    ],
    bring:
      "Agua y calzado con agarre. Hay calles con adoquines irregulares y tramos con poca sombra.",
  },
  "playas-de-punta-cana": {
    meeting: "Recogida por acordar en Bávaro o Punta Cana.",
    arrival: "Regreso al punto acordado en la zona de Bávaro.",
    stages: [
      {
        title: "Tarde en Bávaro",
        stops: ["Playa Bávaro", "Zona hotelera"],
        description:
          "Paseo por la costa y tiempo libre para descanso. Se elegirá un acceso habilitado según el sector del alojamiento.",
      },
      {
        title: "Costa abierta en Macao",
        stops: ["Playa Macao", "Bávaro"],
        description:
          "Traslado a Macao para caminar junto a la playa y regresar a Bávaro. Cualquier baño o actividad depende del oleaje y las condiciones locales.",
      },
    ],
    planned: [
      "Una noche en Bávaro, con alojamiento y régimen por definir.",
      "Transporte local de ida y vuelta al sector de Macao.",
    ],
    extras: [
      "Clases de surf, alquiler de equipo, comidas y bebidas.",
      "Vuelos, traslados de aeropuerto y otros recorridos.",
    ],
    bring:
      "Protección solar y calzado para playa. Macao tiene oleaje de mar abierto; sigue las indicaciones locales.",
  },
};
