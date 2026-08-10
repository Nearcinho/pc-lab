export const siteConfig = {
  name: "PC LAB",
  longName: "PC LAB · Estudio de PC a medida",
  domain: "https://nexa-gaming.es",
  tagline: "Diseñado para ti. Construido para rendir.",
  description:
    "PC LAB es el estudio de consultoría que diseña, construye y certifica ordenadores a medida en España. Asesoría experta, ensamblaje artesanal y test de 24 h en cada equipo.",
  email: "info@nexa-gaming.es",
  phone: "+34 910 123 456",
  whatsapp: "+34 600 123 456",
  hours: "Lun – Vie · 10:00 – 19:00",
  social: {
    instagram: "https://instagram.com/nexa.pc",
    youtube: "https://youtube.com/@nexapc",
    x: "https://x.com/nexa_pc",
    discord: "https://discord.gg/nexapc",
    twitch: "https://twitch.tv/nexapc",
    linkedin: "https://www.linkedin.com/in/nicolas-ignacio-sanchez-negrete/",
  },
} as const;

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string; description: string }[];
};

export const mainNav: NavItem[] = [
  {
    label: "Proyectos",
    href: "/proyectos",
    children: [
      { label: "Builds recientes", href: "/proyectos", description: "Casos reales con objetivo y resultados" },
      { label: "Gaming", href: "/equipos/gaming", description: "Máximo rendimiento para tus juegos" },
      { label: "Workstations", href: "/equipos/workstation", description: "Creación, render e IA profesional" },
      { label: "Streaming", href: "/equipos/streaming", description: "Emite y graba sin esfuerzo" },
    ],
  },
  { label: "Configurador", href: "/configurador" },
  { label: "Servicios", href: "/servicios" },
  { label: "Quiénes somos", href: "/nosotros" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
];

export function formatPhoneHref(phone: string) {
  return `tel:${phone.replace(/\s/g, "")}`;
}

export function formatMailHref(email: string) {
  return `mailto:${email}`;
}