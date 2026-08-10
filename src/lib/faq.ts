export interface FaqEntry {
  category: string;
  items: { question: string; answer: string }[];
}

export const faqGroups: FaqEntry[] = [
  {
    category: "Pedidos y envíos",
    items: [
      {
        question: "¿Cuánto tarda el montaje de mi PC?",
        answer:
          "Un equipo estándar se ensambla, testea y calibra en 7 a 10 días laborables. Los builds con configuraciones muy especiales (loops personalizados, mods) pueden tardar hasta 3 semanas. Al hacer el pedido te damos una fecha estimada y te avisamos de cada fase.",
      },
      {
        question: "¿Hacéis envíos a toda España?",
        answer:
          "Sí. Enviamos a toda España y Portugal con seguros incluidos y embalaje antiestático certificado. Los envíos a Península son gratis en configuraciones superiores a 899€; a Islas aplicamos un suplemento sin sorpresas.",
      },
      {
        question: "¿Puedo fraccionar el pago?",
        answer:
          "Por supuesto. Ofrecemos pago fraccionado sin intereses a 3, 6 y 12 meses a través de financiación verificada, además de pago con tarjeta, transferencia y Bizum.",
      },
    ],
  },
  {
    category: "Montaje y garantía",
    items: [
      {
        question: "¿Qué incluye el test de estabilidad?",
        answer:
          "Cada equipo pasa un test de estrés de 24 horas (CPU + GPU + RAM + SSD) registrando temperaturas, estabilidad de potencias y ruido. Te entregamos el informe completo con los resultados para que veas exactamente cómo se comporta tu máquina.",
      },
      {
        question: "¿Qué garantía ofrezco?",
        answer:
          "2 años de garantía en toda la configuración, ampliable a 5 años. La cobertura incluye los componentes y la mano de obra, con recogida gratuita en domicilio si algo falla en el primer año.",
      },
      {
        question: "¿Podéis mejorar mi PC actual?",
        answer:
          "Sí, ofrecemos actualizaciones de componentes sobre tu torre actual: análisis previo del sistema, compatibilidad y presupuesto antes de tocar nada. Lo dejo todo limpio y con el firmware actualizado.",
      },
    ],
  },
  {
    category: "Personalización",
    items: [
      {
        question: "¿Podéis hacer un custom loop?",
        answer:
          "Es una de nuestras especialidades: loops a medida con bloques para CPU y GPU, tanques, tubos rígidos o flexibles y refrigerante estético. Diseñamos el recorrido, montamos y dejamos el circuito purgado y sin burbujas.",
      },
      {
        question: "¿Ofrecéis modding estético?",
        answer:
          "Sí. Pintura personalizada, grabados láser, IPS screens internas, iluminación RGB síncrona y distribución de cableado a medida. Cuéntanos tu idea y la hacemos real.",
      },
      {
        question: "¿Podéis preinstalar juegos y software?",
        answer:
          "Instalamos el sistema operativo, drivers, BIOS actualizada y el software que necesites (OBS, DaVinci, juegos, etc.). Solo tienes que decírnoslo al configurar.",
      },
    ],
  },
  {
    category: "Soporte",
    items: [
      {
        question: "¿Qué soporte hay después de la compra?",
        answer:
          "Soporte técnico ilimitado y gratuito de por vida en configuración, optimización y resolución de dudas. Además incluimos 90 días de soporte prioritario para primeras puestas en marcha.",
      },
      {
        question: "¿Hacéis asistencia remota?",
        answer:
          "Sí, mediante película segura podemos conectarnos a tu equipo para configurar BIOS, ajustar perfiles de ventiladores o resolver incidencias sin que tengas que movernos nada.",
      },
      {
        question: "¿Ofrecéis seguros contra sustos?",
        answer:
          "Todos los equipos salen con protección de voltaje incorporada (AVR) y test de picos. Además puedes contratar nuestro seguro anti-fenómenos para sobretensiones durante los primeros 24 meses.",
      },
    ],
  },
];

export const processSteps = [
  {
    step: "01",
    title: "Cuéntanos tu misión",
    description:
      "Juegos, streaming, render o IA: definimos juntos tus necesidades reales y el presupuesto ideal, sin humo.",
  },
  {
    step: "02",
    title: "Configura o déjanos decidir",
    description:
      "Usa nuestro configurador inteligente o deja que nuestro equipo pangamente el equilibrio perfecto componentes.",
  },
  {
    step: "03",
    title: "Montaje premium",
    description:
      "Ensamblamos a mano cada equipo con gestión de cableado impecable, BIOS configurado y perfiles de rendimiento.",
  },
  {
    step: "04",
    title: "Test y garantía",
    description:
      "24h de test de estabilidad, rendimiento validado y entrega con informe completo envío asegurado.",
  },
];

export const guarantees = [
  {
    title: "Garantía 2 años",
    description: "Cobertura total de componentes y mano de obra, con recogida en domicilio el primer año.",
  },
  {
    title: "Test de 24 horas",
    description: "Cada equipo pasa por pruebas de estabilidad, temperaturas y ruido antes de salir del taller.",
  },
  {
    title: "Precio transparente",
    description: "Presupuesto cerrado sin cargos sorpresa. Lo que ves en el configurador es lo que pagas.",
  },
  {
    title: "Soporte de por vida",
    description: "Asesoría y resolución de dudas para siempre, aunque tu configuración evolucione.",
  },
];

export interface Service {
  slug: string;
  title: string;
  short: string;
  description: string;
  icon: string;
  features: string[];
}

export const services: Service[] = [
  {
    slug: "configurador",
    title: "Configurador personalizado",
    short: "Construye tu PC pieza a pieza con compatibilidad garantizada.",
    description:
      "Elige cada componente con total libertad. Nuestro sistema valida sockets, potencias, refrigeración y espacio para que no devuelvas nada.",
    icon: "sliders-horizontal",
    features: ["Compatibilidad automática", "Precio en tiempo real", "Cálculo de FPS estimados", "Ahorro recomendado"],
  },
  {
    slug: "asesoria",
    title: "Asesoría personalizada",
    short: "Te ayudamos a elegir sin venderte de más.",
    description:
      "Nuestro equipo analiza tu uso real y tu presupuesto. Te recomendamos exactamente la configuración que necesitas, ni más ni menos.",
    icon: "messages-square",
    features: ["Análisis de necesidades", "Presupuestos honestos", "Comparativas reales", "Seguimiento cercano"],
  },
  {
    slug: "montaje",
    title: "Montaje premium",
    short: "Ensamblado a mano con acabados de sello de calidad.",
    description:
      "Cerebro, cableado, gestión térmica y BIOS optimizada. Cada equipo se monta individualmente y se somete a control de calidad exhaustivo.",
    icon: "wrench",
    features: ["Gestión de cableado impecable", "BIOS y perfiles optimizados", "Test de estabilidad 24h", "Imágenes de rendimiento"],
  },
  {
    slug: "custom-loop",
    title: "Custom loop",
    short: "Liquid cooling a medida para GPU y CPU.",
    description:
      "Diseñamos el circuito, montamos bloques, capacitores y refrigerantes y dejamos el loop sin burbujas y con niveles óptimos.",
    icon: "waves",
    features: ["Diseño del recorrido", "Bloques de GPU y CPU", "Pruebas de fugas", "Temperaturas tope gama"],
  },
  {
    slug: "modding",
    title: "Modding estético",
    short: "Personalizamos el aspecto de tu sistema.",
    description:
      "Pinto, inspectores, iluminación y cableado a medida. Tu PC, con tu sello único desde la primera vista.",
    icon: "sparkles",
    features: ["Pintura personalizada", "Cableado artesanal", "Iluminación síncrona", "IPS screens"],
  },
  {
    slug: "upgrade",
    title: "Actualización de equipos",
    short: "Renovamos el rendimiento de tu PC actual.",
    description:
      "Analizamos tu equipo actual, detectamos cuellos de botella y montamos las piezas que dan el salto real de rendimiento.",
    icon: "rocket",
    features: ["Análisis previo gratuito", "Compatibility check", "Montaje y limpieza", "BIOS actualizada"],
  },
];