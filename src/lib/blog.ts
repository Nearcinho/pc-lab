import { asset } from "@/lib/base";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  cover: string;
  gradient: string;
  tags: string[];
  content: { heading?: string; text: string; list?: string[] }[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "cuanta-ram-necesitas-2026",
    title: "¿Cuánta RAM necesito en 2026? Guía definitiva",
    excerpt:
      "16, 32 o 64 GB: te explicamos cuánta memoria DDR5 merece la pena para gaming, streaming, video y programación en la nueva generación.",
    category: "Guías",
    date: "2026-05-18",
    readTime: "7 min",
    author: "Equipo PC LAB",
    cover: asset("/blog/ram.svg"),
    gradient: "from-brand/25 to-brand-2/25",
    tags: ["RAM", "DDR5", "Guía"],
    content: [
      {
        heading: "La regla del 1% low que casi nadie mira",
        text:
          "La mayoría compara solo la media de FPS, pero el rendimiento real de un PC se mide en el 1% low: esa caída que notas en los momentos más intensos de la partida. La RAM tiene un papel clave en su estabilidad, sobre todo si el perfil EXPO deja de aplicarse.",
      },
      {
        text: "16 GB siguen siendo el mínimo saludable para jugar en 2026, pero empieza a quedarse corto en los títulos más exigentes y con apps de fondo abiertas. 32 GB es el punto dulce: juega con Discord, navegador y OBS grabando sin pestañear.",
        list: ["16 GB: gaming casual y ofimática", "32 GB: gaming serio, streaming y trabajo", "64 GB: render 4K/8K, IA y multitarea extrema"],
      },
      {
        heading: "Latencia > frecuencia",
        text: "Un kit de 6000 MHz CL30 suele rendir más que uno de 6400 CL36 en AMD. Mira la latencia efectiva (CL÷frecuencia) antes de fijarte solo en los MHz nominales.",
      },
    ],
  },
  {
    slug: "mejor-procesador-2026",
    title: "Los mejores procesadores de 2026 para cada presupuesto",
    excerpt:
      "Del Ryzen 5 al 9800X3D del mercado: comparativa real de CPUs para gaming, esports, render e IA.",
    category: "Comparativas",
    date: "2026-06-02",
    readTime: "9 min",
    author: "PC LAB",
    cover: asset("/blog/cpu.svg"),
    gradient: "from-violet-500/20 to-cyan-500/20",
    tags: ["CPU", "AMD", "Intel", "Comparativa"],
    content: [
      {
        heading: "Gaming puro: los X3D dominan",
        text: "Si solo te importa jugar, la serie de procesadores con caché 3D de AMD sigue siendo la reina. El salto de 1% low frente a opciones sin la caché extra es enorme en títulos como CS 2 o Warzone.",
      },
      {
        heading: "Mixto: esto vale tu dinero",
        text: "Si juegas pero también editas, renderas o compilas, un Ryzen 7 o Intel i7 clásico es el equilibrio perfecto. Los núcleos de rendimiento y eficiencia de Intel se lucen en multitarea; los X3D de AMD son imbatibles en juegos.",
      },
      {
        heading: "¿Cuántos núcleos necesito?",
        text: "6 son el mínimo para juego+stream, 8 el estándar cómodo y 12-16 para trabajar con blender, code o IA local, donde la escalado de rendimiento es lineal.",
      },
    ],
  },
  {
    slug: "que-es-un-custom-loop",
    title: "Custom loop: vale la pena en 2026",
    excerpt:
      "Rendimiento, estética y riesgo: analizamos si la refrigeración líquida a medida merece la pena frente a un AIO de calidad.",
    category: "Guías",
    date: "2026-04-20",
    readTime: "8 min",
    author: "PC LAB",
    cover: asset("/blog/loop.svg"),
    gradient: "from-cyan-500/20 to-blue-600/25",
    tags: ["Custom Loop", "Refrigeración"],
    content: [
      {
        heading: "Temperaturas de otro mundo",
        text: "Un loop a medida puede dejar a tu GPU y CPU hasta 15 grados por debajo de un AIO de gama alta bajo carga sostenida. Es la vía más efectiva para un overclocko agresivo y para silencio absoluto.",
      },
      {
        heading: "¿Y el riesgo?",
        text: "Hoy los componentes son a prueba de fugas si el montaje se hace bien: tubos insertados a fondo, tapones correctos y prueba de fugas con aire. Un profesional reduce ese riesgo a casi cero y te da un mantenimiento sencillo (cambio de refrigerante cada 12-18 meses).",
      },
      {
        text: "En PC LAB montamos loops a medida desde 899 € con test de 24 h y garantía. No es para todos, pero si quieres la máxima expresión de rendimiento y estética, es la única opción.",
      },
    ],
  },
  {
    slug: "pc-streaming-2026",
    title: "¿Necesito un PC especial para hacer streaming?",
    excerpt:
      "Combo de CPU + GPU + NVENC explicado para que emitas a 4K60 sin perder FPS, y qué configuraciones recomendamos.",
    category: "Gaming",
    date: "2026-03-10",
    readTime: "6 min",
    author: "PC LAB",
    cover: asset("/blog/stream.svg"),
    gradient: "from-rose-500/20 to-violet-600/20",
    tags: ["Streaming", "Gaming", "NVENC"],
    content: [
      {
        heading: "La regla de oro del streaming",
        text: "El trabajo que hoy no roba FPS a tu juego: la codificación con el codificador NVENC de NVIDIA dedicado en la GPU. Verás que el impacto en la tasa de fotogramas es mínimo incluso a 4K60.",
      },
      {
        heading: "Combo CPU + GPU + RAM",
        text: "Un streamer de hoy juega y codifica a la vez. Aun con NVENC, es el CPU el que sostiene la escena del juego más exigente, y con 8 núcleos irás sobrado. 32 GB de RAM son el estándar sensato: OBS, el juego y las fuentes se llevan bien con memoria de sobra.",
      },
    ],
  },
  {
    slug: "workstation-vs-gaming-pc",
    title: "Workstation vs gaming: cuál compra de verdad",
    excerpt:
      "¿Te compras una máquina de juego para renderizar? Te contamos las diferencias reales y qué especificaciones mandan en cada escenario.",
    category: "Guías",
    date: "2026-02-12",
    readTime: "9 min",
    author: "PC LAB",
    cover: asset("/blog/workstation.svg"),
    gradient: "from-amber-500/20 to-orange-600/20",
    tags: ["Workstation", "Comparativa"],
    content: [
      {
        heading: "El mito de la tarjeta de trabajo",
        text: "Las RTX de gaming y las llamadas tarjetas pro rinden parecido en la mayoría del software 3D (Blender, C4D, Redshift). Las tarjetas ISV aportan extras de negocio y certificaciones, pero para el 90% de los usuarios la diferencia es mínima. Lo que sí cambia es la VRAM y la estabilidad de los drivers para aplicaciones profesionales.",
      },
      {
        heading: "Lo importante: VRAM y memoria",
        text: "Para render y edición, la VRAM de la GPU es la reina: 16 GB cubren la mayoría de proyectos; 24 GB para escenas épicas. La RAM tampoco se queda atrás: las piezas de juego y las comprobaciones vuelan con 64 GB.",
      },
    ],
  },
  {
    slug: "envio-pc-gaming-espana",
    title: "Cómo se envía un PC sin romperlo",
    excerpt:
      "¿Es seguro enviar un ordenador por transporte? En PC LAB te contamos la caja, los seguros y el embalaje antiestático detrás de cada envío.",
    category: "Servicio",
    date: "2026-02-01",
    readTime: "4 min",
    author: "PC LAB",
    cover: asset("/blog/ship.svg"),
    gradient: "from-emerald-500/20 to-teal-600/20",
    tags: ["Envíos", "Servicio"],
    content: [
      {
        heading: "Embalaje profesional, no pegote",
        text: "El interior se fija con espuma premium dentro de la caja, se insertan protectores para GPU y torres, y la torre viaja en un esqueleto de poliuretano que absorbe golpes. Todo con etiquetado «frágil» y transporte asegurado hasta 5.000 €.",
      },
      {
        heading: "Seguros y seguimiento",
        text: "Ofrecemos seguro de retorno sin complejos. Si el PC llegara dañado (muy raro), recoges, enviamos otro y te regeneran. El packaging es reutilizable y certificado ISTA 3A para transporte.",
      },
    ],
  },
];

export function getPost(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}