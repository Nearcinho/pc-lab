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
    title: "¿Cuánta RAM necesitas en 2026? Guía definitiva",
    excerpt:
      "16, 32 o 64 GB: cuánta memoria DDR5 merece la pena para gaming, streaming, edición y programación, y por qué la latencia importa tanto como los MHz.",
    category: "Guías",
    date: "2026-05-18",
    readTime: "7 min",
    author: "Equipo PC LAB",
    cover: asset("/blog/ram.svg"),
    gradient: "from-brand/25 to-brand-2/25",
    tags: ["RAM", "DDR5", "Guía"],
    content: [
      {
        heading: "La capacidad: el punto dulce ha subido",
        text:
          "Durante años 16 GB fueron la recomendación estándar para jugar. En 2026 siguen siendo el mínimo razonable, pero los títulos más exigentes, combinados con Discord, navegador y apps en segundo plano, ya los ponen contra las cuerdas. Los 32 GB se han convertido en el punto dulce: margen de sobra para jugar, emitir y trabajar sin pensar en qué tienes abierto.",
        list: [
          "16 GB: gaming casual y ofimática",
          "32 GB: gaming exigente, streaming y trabajo diario",
          "64 GB o más: render, edición 4K/8K, IA local y virtualización",
        ],
      },
      {
        heading: "El 1% low: el dato que casi nadie mira",
        text:
          "La media de FPS solo cuenta la mitad de la historia. La fluidez real se mide en el 1% low: esos tirones puntuales en los momentos más cargados de la partida. La RAM influye directamente en su estabilidad, y por eso conviene activar siempre el perfil EXPO (AMD) o XMP (Intel) en la BIOS: sin él, el kit funciona a velocidades de fábrica muy por debajo de lo que pagaste.",
      },
      {
        heading: "Latencia frente a frecuencia",
        text:
          "Un kit de 6000 MT/s CL30 suele rendir igual o mejor que uno de 6400 MT/s CL36, porque lo que manda es la latencia real en nanosegundos: se calcula dividiendo el CL entre la velocidad y multiplicando por 2000. Así, 6000 CL30 equivale a 10 ns. En plataformas AM5, además, los 6000 MT/s son el punto óptimo reconocido por los análisis técnicos: más velocidad obliga a desincronizar el controlador de memoria y puede restar rendimiento.",
      },
    ],
  },
  {
    slug: "mejor-procesador-2026",
    title: "Los mejores procesadores de 2026 para cada tipo de usuario",
    excerpt:
      "Del Ryzen 5 al 9800X3D: qué CPU elegir para gaming, esports, render o IA, según cómo uses el equipo de verdad.",
    category: "Comparativas",
    date: "2026-06-02",
    readTime: "9 min",
    author: "PC LAB",
    cover: asset("/blog/cpu.svg"),
    gradient: "from-violet-500/20 to-cyan-500/20",
    tags: ["CPU", "AMD", "Intel", "Comparativa"],
    content: [
      {
        heading: "Gaming puro: los X3D marcan la diferencia",
        text:
          "Los procesadores AMD con caché 3D V-Cache dominan los rankings independientes de rendimiento en juegos, como la jerarquía de CPUs de Tom's Hardware medida con una RTX 5090. La ventaja no está solo en la media de FPS, sino en la estabilidad: el 1% low mejora de forma notable en títulos sensibles a la CPU como Counter-Strike 2 o los mundos abiertos cargados de física.",
      },
      {
        heading: "Uso mixto: el equilibrio manda",
        text:
          "Si juegas pero también editas vídeo, renderizas o compilas, un Ryzen 7 o un Core i7/Ultra 7 es el punto de equilibrio: muchos núcleos para trabajar y rendimiento sobrado en juegos. En multitarea pesada brillan los recuentos altos de núcleos; en juegos puros, la caché 3D de AMD. Saber qué harás el 80 % del tiempo es la pregunta que decide la compra.",
      },
      {
        heading: "¿Cuántos núcleos necesitas?",
        text:
          "Para jugar y emitir a la vez, 6-8 núcleos modernos van sobrados. Para render, código o IA local, el rendimiento escala casi de forma lineal con los núcleos: ahí los 12-16 núcleos de un Ryzen 9 o un Core i9/Ultra 9 se justifican solos. Más núcleos de los que tu software usa no aportan nada; menos, se notan cada día.",
      },
    ],
  },
  {
    slug: "pc-streaming-2026",
    title: "¿Necesitas un PC especial para hacer streaming?",
    excerpt:
      "Cómo emitir a 1080p60 o 4K60 sin apenas perder FPS: el papel real de NVENC, la CPU y la RAM en un equipo para crear contenido.",
    category: "Gaming",
    date: "2026-03-10",
    readTime: "6 min",
    author: "PC LAB",
    cover: asset("/blog/stream.svg"),
    gradient: "from-rose-500/20 to-violet-600/20",
    tags: ["Streaming", "Gaming", "NVENC"],
    content: [
      {
        heading: "La regla de oro: el encoder dedicado",
        text:
          "Emitir ya no cuesta FPS como antes. Las GPU NVIDIA actuales (RTX 40 y 50) integran NVENC, un chip dedicado a codificar vídeo que trabaja al margen del juego: el impacto en la tasa de fotogramas es mínimo incluso emitiendo a 4K60. Desde la generación RTX 40, además, NVENC soporta AV1, que da más calidad con menos bitrate en plataformas compatibles. AMD e Intel tienen alternativas equivalentes (AMF y Quick Sync), aunque NVENC sigue siendo la referencia en OBS.",
      },
      {
        heading: "La CPU sigue mandando",
        text:
          "Aunque el encoder viva en la GPU, es la CPU la que sostiene la escena: el juego, OBS, las fuentes del navegador y las alertas. Para jugar y emitir a la vez, 8 núcleos modernos son el estándar cómodo; con 6 se puede, pero irás más justo en los títulos más exigentes.",
      },
      {
        heading: "RAM y pequeños detalles",
        text:
          "32 GB de RAM son el estándar sensato para crear contenido: juego, OBS y fuentes abiertas conviven sin despeinarse. Y no descuides lo aburrido: una buena conexión por cable y una escena de OBS bien configurada mejoran tu directo más que cualquier componente extra.",
      },
    ],
  },
  {
    slug: "workstation-vs-gaming-pc",
    title: "Workstation vs PC de gaming: qué comprar de verdad",
    excerpt:
      "¿Sirve un PC de gaming para renderizar? Diferencias reales entre tarjetas de consumo y profesionales, y qué specs mandan en cada caso.",
    category: "Guías",
    date: "2026-02-12",
    readTime: "9 min",
    author: "PC LAB",
    cover: asset("/blog/workstation.svg"),
    gradient: "from-amber-500/20 to-orange-600/20",
    tags: ["Workstation", "Comparativa"],
    content: [
      {
        heading: "El mito de la tarjeta «profesional»",
        text:
          "En la mayoría del software 3D y de edición (Blender, DaVinci Resolve, motores de render por GPU), una GeForce RTX de consumo rinde a la par que una tarjeta profesional de precio muy superior. Las gamas profesionales aportan certificaciones ISV, drivers validados para software crítico y opciones con más VRAM o ECC: tienen sentido en entornos empresariales, pero para la mayoría de creadores la diferencia práctica es mínima.",
      },
      {
        heading: "Lo que sí manda: VRAM y RAM",
        text:
          "En render y edición, la VRAM es la primera frontera: si la escena no cabe en la memoria de la GPU, el rendimiento se desploma. 16 GB cubren la mayoría de proyectos; las escenas muy pesadas y la IA local agradecen 24 GB. En RAM, 64 GB son el punto cómodo para proyectos serios de vídeo, 3D o datos.",
      },
      {
        heading: "Entonces, ¿qué compro?",
        text:
          "Si tu trabajo es diseño, vídeo, 3D o desarrollo, un buen PC de gaming bien configurado es casi siempre la respuesta correcta: misma potencia, mejor relación prestaciones/inversión. Solo cuando tu empresa exige certificación oficial del software o memoria ECC tiene sentido dar el salto a una workstation certificada.",
      },
    ],
  },
  {
    slug: "envio-pc-gaming-espana",
    title: "Cómo enviamos un PC para que llegue perfecto",
    excerpt:
      "Espuma interior, protección de la GPU, doble caja y seguro: así preparamos cada equipo antes de ponerlo en la carretera.",
    category: "Servicio",
    date: "2026-02-01",
    readTime: "4 min",
    author: "PC LAB",
    cover: asset("/blog/ship.svg"),
    gradient: "from-emerald-500/20 to-teal-600/20",
    tags: ["Envíos", "Servicio"],
    content: [
      {
        heading: "Embalaje profesional, nada de «pegotes»",
        text:
          "Un PC montado es un objeto delicado: la gráfica y el disipador pesan y van sujetos a la placa solo por sus anclajes. Por eso rellenamos el interior con espuma de expansión que inmoviliza cada componente, protegemos la GPU y la refrigeración, y la torre viaja en doble caja con material absorbente de impactos, etiquetada como frágil.",
      },
      {
        heading: "Seguro y seguimiento",
        text:
          "Cada envío va asegurado por el valor completo del equipo y con seguimiento en tiempo real. Si algo llegara dañado —es muy raro—, lo recogemos, lo reparamos o reponemos, y tú no pones un euro ni un gesto de más. El embalaje, además, es reutilizable: guárdalo por si algún día tienes que mover el equipo.",
      },
      {
        heading: "Al recibirlo",
        text:
          "Retira la espuma interior antes de encenderlo (te lo recordamos con una guía en la caja), conecta el monitor a la tarjeta gráfica —no a la placa base— y listo: el equipo llega probado tras un test de estrés completo en nuestro laboratorio.",
      },
    ],
  },
];

export function getPost(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}
