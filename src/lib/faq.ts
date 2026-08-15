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
