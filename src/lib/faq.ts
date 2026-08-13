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
          "Un equipo estándar se ensambla, testea y calibra en 7 a 10 días laborables. Las configuraciones muy especiales pueden tardar hasta 3 semanas. Al hacer el pedido te damos una fecha estimada y te avisamos de cada fase.",
      },
      {
        question: "¿Hacéis envíos a toda España?",
        answer:
          "Sí. Enviamos a toda España y Portugal con seguros incluidos y embalaje antiestático de transporte. Los envíos a Península son gratis en configuraciones superiores a 899€; a Islas aplicamos un suplemento sin sorpresas.",
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
        question: "¿Qué garantía tiene mi PC?",
        answer:
          "1 año de garantía en el ensamblado: si algo falla por el montaje, lo resolvemos sin coste. Los componentes, además, mantienen la garantía oficial de cada fabricante, y nosotros gestionamos el trámite contigo.",
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
          "Soporte técnico gratuito durante el primer año: configuración, optimización y resolución de dudas. Estamos contigo mientras le sacas partido a tu equipo.",
      },
      {
        question: "¿Hacéis asistencia remota?",
        answer:
          "Sí, mediante conexión remota segura podemos conectarnos a tu equipo para configurar la BIOS, ajustar perfiles de ventiladores o resolver incidencias sin que tengas que traernos nada.",
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