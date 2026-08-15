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
    title: "¿Cuánta RAM necesitas en 2026? Guía con datos reales",
    excerpt:
      "16, 32 o 64 GB: qué consumen de verdad los juegos actuales, por qué DDR5-6000 CL30 es el punto óptimo en AM5 y qué está pasando con el precio de la memoria.",
    category: "Guías",
    date: "2026-05-18",
    readTime: "9 min",
    author: "Equipo PC LAB",
    cover: asset("/blog/ram.jpg"),
    gradient: "from-brand/25 to-brand-2/25",
    tags: ["RAM", "DDR5", "Guía"],
    content: [
      {
        heading: "Lo que consumen los juegos de verdad (medido)",
        text:
          "Las cifras oficiales quedan cortas: las mediciones reales de memoria comprometida en 2026 (juego + sistema + apps de fondo) muestran que los títulos pesados ya superan los 16 GB. Microsoft Flight Simulator 2024 compromete unos 22 GB, Cities: Skylines 2 con mods casi 20, Star Citizen unos 19, y Cyberpunk 2077 con path tracing roza los 16. A eso súmale Chrome, Discord y el launcher de turno: otros 4-6 GB. Con 16 GB totales, el sistema entra en pagefile en las escenas más cargadas y aparecen los tirones.",
        list: [
          "16 GB: mínimo funcional (ofimática y gaming ligero)",
          "32 GB: el estándar gaming de 2026 — Microsoft ya la marca como la cifra «sin preocupaciones»",
          "64 GB: edición 4K, render, IA local y MSFS 2024 en su recomendación ideal",
        ],
      },
      {
        heading: "La regla del sweet spot: 6000 CL30 en AM5",
        text:
          "En plataformas AM5 hay un punto óptimo técnico y documentado: DDR5-6000. A esa velocidad el controlador de memoria trabaja en modo 1:1 (UCLK = MCLK) con la Infinity Fabric a ~2000 MHz, maximizando ancho de banda sin penalización. Por encima de 6000-6400, el controlador pasa a modo 1:2 y la latencia extra se come la ganancia salvo kits muy afinados. Kingston, Newegg y las guías de montaje de AMD coinciden: 6000 MT/s con CL30 es la compra correcta para cualquier Ryzen 7000/9000.",
      },
      {
        heading: "Latencia real: la tabla que importa",
        text:
          "Los MHz nominales engañan; lo que cuenta es la latencia de primera palabra (CL × 2000 ÷ velocidad). Dos kits con marketing muy distinto pueden rendir igual: 6000 CL30 y 6400 CL32 dan exactamente la misma latencia, 10 ns. Compara antes de pagar de más:",
        list: [
          "5600 CL46 → 16,4 ns (la típica de serie, sin perfil)",
          "6000 CL40 → 13,3 ns",
          "6000 CL36 → 12,0 ns",
          "6000 CL30 → 10,0 ns ← el punto dulce",
          "6400 CL32 → 10,0 ns (misma latencia, modo 1:2 no garantizado)",
        ],
      },
      {
        heading: "¿Cuánto rinde de más una RAM rápida? Menos de lo que crees",
        text:
          "Aquí viene el dato que equilibra todo lo anterior: según las propias mediciones de AMD en más de 30 juegos con un X3D, bajar de DDR5-6000 a DDR5-4800 cuesta menos de un 1% de FPS de media. ¿Por qué? La caché 3D V-Cache de los X3D absorbe la presión sobre la memoria. En CPUs sin ella, el escalado es mayor (tests con Intel muestran +6-11% entre 4800 y 6000 en títulos como Hitman 3 o Cyberpunk). Conclusión práctica: prioriza la capacidad (32 GB) y activa el perfil; no persigas el último MHz.",
      },
      {
        heading: "EXPO o XMP: actívalo o tira el dinero",
        text:
          "Cualquier DDR5 arranca por defecto a la velocidad JEDEC de 4800 MT/s, muy por debajo de lo que pagaste. El perfil se activa en la BIOS: XMP es el estándar de Intel; EXPO es el de AMD para AM5 (las placas AM5 aceptan ambos). Es el ajuste gratuito más rentable de todo el PC: dos clics y tu memoria rinde lo que promete la caja.",
      },
      {
        heading: "El elefante en la habitación: la escasez de 2026",
        text:
          "Si la RAM te parece carísima, no es tu imaginación: la demanda de IA (memoria HBM para aceleradores) desplazó la producción de DRAM de consumo y los precios se han disparado. Los rastreadores de mercado miden multiplicadores de ×3,5 en Europa entre septiembre de 2025 y enero de 2026, y fabricantes como Crucial han salido del segmento de consumo. Nuestro consejo: compra la capacidad que necesitas ahora (no va a bajar a corto plazo), pero sin pasarte de velocidad: como ves arriba, el rendimiento real entre un kit medio y uno tope es mínimo.",
      },
    ],
  },
  {
    slug: "mejor-procesador-2026",
    title: "Los mejores procesadores de 2026, con números encima de la mesa",
    excerpt:
      "Qué CPU comprar para gaming, creación o IA según la jerarquía medida con RTX 5090: quién manda, en qué juegos y cuándo los núcleos importan más que la caché.",
    category: "Comparativas",
    date: "2026-06-02",
    readTime: "10 min",
    author: "PC LAB",
    cover: asset("/blog/cpu.jpg"),
    gradient: "from-violet-500/20 to-cyan-500/20",
    tags: ["CPU", "AMD", "Intel", "Comparativa"],
    content: [
      {
        heading: "La jerarquía real (medida con RTX 5090)",
        text:
          "La referencia más sólida de 2026 es la jerarquía de Tom's Hardware: geomean de 17 juegos a 1080p con una RTX 5090 para que la GPU no sea el cuello de botella. La cima es territorio X3D: el 9850X3D marca el 100%, el 9800X3D se queda en el 97% y el 9950X3D en el 95,7%. El 7800X3D de la generación anterior aguanta en el 85,6%, por encima de cualquier Intel y de los Ryzen 9 sin caché 3D. El mejor Intel en juegos sigue siendo el i9-14900K con un 78,2%, y el Core Ultra 9 285K se queda en el 71,8%.",
      },
      {
        heading: "El secreto del X3D, cuantificado",
        text:
          "¿Cuánto aporta la 3D V-Cache? La review de TechPowerUp del 9800X3D lo mide directamente: un 11% más de media que el 9700X (mismo chip sin la caché extra) y un 13% más que el Core Ultra 9 285K. Y aquí el dato que rompe intuiciones: el 9800X3D, con solo 8 núcleos, rinde en juegos un 25-30% más que el 9950X de 16 núcleos. En gaming, la caché manda sobre los núcleos.",
      },
      {
        heading: "Cuándo los núcleos sí mandan: productividad",
        text:
          "En cargas multi-hilo la foto se invierte por completo. En la suite de productividad de Tom's Hardware (Cinebench, Blender, V-Ray, Handbrake), el 9950X alcanza el 96,8% mientras el 7800X3D se queda en el 44,5%: el Ryzen 9 rinde más del doble. Si tu día a día es render, compilación, VMs o IA local, un 9900X/9950X es la compra; si es jugar y emitir, un X3D de 8 núcleos es insuperable. Y si haces ambas cosas en serio, el 9950X3D (95,7% en juegos y 100% en multi-hilo) es la única CPU que no te hace elegir.",
      },
      {
        heading: "Plataforma: la compra a largo plazo",
        text:
          "AM5 es la única plataforma viva con recorrido: AMD confirmó soporte «2027+» y en 2026 se ha hablado de extensión hasta 2029, así que la placa que compras hoy aceptará futuras CPUs. LGA1700 murió con la 14ª generación, y LGA1851 (Core Ultra 200) termina tras Arrow Lake y su Refresh: Nova Lake ya usa el socket nuevo LGA1954. Comprar hoy un Intel de escritorio es comprar una plataforma sin siguiente paso; comprar AM5 es poder actualizar la CPU dentro de 3 años sin cambiar placa ni RAM.",
      },
      {
        heading: "Consumo y eficiencia: la tabla corta",
        text:
          "Los Ryzen 5/7 9000 (9600X, 9700X) parten de 65 W de TDP con picos de 88 W: se refrigeran con un disipador de aire modesto. Los X3D y Ryzen 9 suben a 120-170 W (162-230 W de pico) y agradecen una líquida de 240 mm o un buen doble torre. Los Intel K son los más exigentes: 125 W de base y hasta 250 W sostenidos en el 285K, algo a presupuestar en fuente y refrigeración desde el principio.",
      },
      {
        heading: "Resumen de compra",
        text: "Si solo vas a quedarte con una idea: en gaming manda la caché 3D, en trabajo mandan los núcleos, y AM5 es la plataforma con futuro. El resto se resume así:",
        list: [
          "Gaming puro: Ryzen 7 9800X3D (o 7800X3D si ajustas gasto)",
          "Gaming + crear contenido: Ryzen 9 9950X3D, sin discusión",
          "Trabajo pesado multi-hilo: Ryzen 9 9950X o 9900X",
          "Equilibrado económico: Ryzen 5 9600X / 7600 (65 W, AM5 con futuro)",
          "Intel solo si ya tienes placa: 14600K/14700K; Core Ultra si priorizas eficiencia",
        ],
      },
    ],
  },
  {
    slug: "pc-streaming-2026",
    title: "Montar un PC para streaming en 2026: la guía técnica",
    excerpt:
      "NVENC, AV1, bitrates reales de Twitch y YouTube, y cuánta CPU y subida necesitas de verdad para emitir a 1080p60 o 1440p sin perder un solo FPS.",
    category: "Gaming",
    date: "2026-03-10",
    readTime: "8 min",
    author: "PC LAB",
    cover: asset("/blog/stream.jpg"),
    gradient: "from-rose-500/20 to-violet-600/20",
    tags: ["Streaming", "Gaming", "NVENC"],
    content: [
      {
        heading: "El encoder dedicado: por qué ya no pierdes FPS",
        text:
          "Emitir con x264 (CPU) le roba fotogramas al juego: tests independientes miden pérdidas medias de hasta el 15-17% de FPS en el preset 'veryfast'. NVENC es un chip dedicado dentro de la GPU: el frame no sale de la tarjeta y el impacto en el juego es prácticamente nulo. Detalle importante: el preset 'Max Quality' de NVENC usa núcleos CUDA y sí compite con el juego — para emitir, 'Quality' con una sola pasada.",
      },
      {
        heading: "NVENC, AMF y QuickSync en 2026",
        text:
          "La jerarquía de calidad medida con VMAF (tests de EposVox publicados por Tom's Hardware) dice que el AV1 por hardware supera a todos los H.264: a 6 Mbps, el AV1 de Intel Arc anota 90 puntos frente a 88 de x264 'veryslow' y 85 del NVENC H.264. El NVENC moderno (Turing en adelante) iguala o supera a x264 'medium' sin tocar la CPU, por eso es el estándar en OBS. AMD mejoró mucho su AMF con RDNA 3 y 4, pero en H.264 sigue un paso por detrás; en AV1 la cosa se iguala. Desde la RTX 40, NVIDIA codifica AV1 por hardware (un 40% más eficiente que H.264 según NVIDIA), y las RTX 50 añaden AV1 UHQ y hasta 3 encoders en la 5090.",
      },
      {
        heading: "Los límites reales de cada plataforma",
        text:
          "Emitir a más bitrate del que acepta la plataforma es tirar ancho de banda: Twitch recomienda 6.000 kbps de vídeo (hasta 8.000 para Partners) a 1080p60, con audio de 160 kbps. YouTube Live acepta mucho más: 12 Mbps recomendados a 1080p60 y entre 35-40 Mbps para 4K60, con keyframe de 2 segundos y CBR en ambas. ¿Y AV1 en Twitch? Existe dentro de Enhanced Broadcasting (multi-encode con HEVC/AV1 en beta para GPUs NVIDIA compatibles), pero el ingest por defecto sigue siendo H.264: en 2026, H.264 a 6-8 Mbps sigue siendo la opción segura en Twitch.",
      },
      {
        heading: "La CPU y la RAM que necesitas (sin mitos)",
        text:
          "Con el encoder viviendo en la GPU, la CPU sostiene todo lo demás: el juego, OBS, las fuentes del navegador, alertas y bots. Para jugar y emitir, 8 núcleos modernos (Ryzen 7 o Core i5/i7 reciente) van sobrados; con 6 se puede, pero los títulos más exigentes lo notan. En RAM, 32 GB es la cifra sensata: el juego pesado de hoy compromete 12-16 GB y OBS con sus fuentes otros varios. No necesitas un segundo PC para emitir a 1080p60: lo necesitas si quieres 1440p+ en Twitch con todo al máximo.",
      },
      {
        heading: "Tu conexión: la regla del 70%",
        text:
          "El bitrate total (vídeo + audio) no debería superar el 70-80% de tu subida real medida, no la contratada. Para Twitch a 1080p60 (6.000 kbps de vídeo + 160 de audio) necesitas unos 7,5-8 Mbps de subida estables; para 1080p30, unos 5,5. Haz un test de velocidad con el PC por cable, nunca por Wi-Fi, y configura el bitrate según lo medido. Y si tu subida es justa, baja la resolución de salida antes que el bitrate: una 900p60 a 6.000 kbps se ve mejor que una 1080p comprimida a 4.500.",
      },
      {
        heading: "Checklist final del streamer",
        text: "Todo lo anterior, destilado en la configuración que montamos nosotros para un equipo de streaming:",
        list: [
          "GPU con NVENC (o AV1 hardware) y preset 'Quality', una pasada",
          "CPU de 8 núcleos si juegas títulos exigentes",
          "32 GB de RAM",
          "Subida medida ≥ 1,3× tu bitrate objetivo, por cable",
          "1080p60 a 6.000 kbps en Twitch; 1440p/4K solo en YouTube",
          "Keyframe 2 s, CBR, y escena de OBS probada antes del primer directo",
        ],
      },
    ],
  },
  {
    slug: "workstation-vs-gaming-pc",
    title: "Workstation vs PC de gaming: cuándo pagar de más tiene sentido (y cuándo no)",
    excerpt:
      "Qué dicen los benchmarks de Puget Systems sobre tarjetas profesionales: dónde pierden frente a una GeForce y los 4 casos concretos donde una workstation es la compra correcta.",
    category: "Guías",
    date: "2026-02-12",
    readTime: "9 min",
    author: "PC LAB",
    cover: asset("/blog/workstation.jpg"),
    gradient: "from-amber-500/20 to-orange-600/20",
    tags: ["Workstation", "Comparativa"],
    content: [
      {
        heading: "El mito, medido: la GeForce gana casi siempre",
        text:
          "Puget Systems, que vende ambas cosas y las benchmarka para vivir, lo dice sin rodeos: para Blender, la GPU más rápida que recomiendan es la GeForce RTX 5090 de consumo, y afirman explícitamente que «no hay necesidad específica de una GPU profesional para Blender». En DaVinci Resolve, la RTX PRO 6000 rinde alrededor de un 20% más que las alternativas de consumo… pero su sobreprecio es mayor que esa mejora: según el propio Puget, «la mayoría de usuarios no encontrará que el salto justifique el coste». En render, edición y desarrollo, el euro rinde más en una GeForce.",
      },
      {
        heading: "Excepción 1: SolidWorks y el CAD certificado",
        text:
          "Aquí la película cambia. En SolidWorks, Puget mide que en modo «shaded with edges» incluso una tarjeta profesional de gama baja supera a la GeForce más rápida, y funciones como RealView y la oclusión ambiental solo tienen soporte oficial con tarjeta certificada. Las certificaciones ISV (Independent Software Vendor) significan que el fabricante del software ha probado oficialmente ese hardware y sus drivers: si tu empresa vive de SolidWorks, Siemens NX o Catia, la tarjeta certificada no es un lujo, es el requisito del departamento de IT.",
      },
      {
        heading: "Excepción 2: IA local con modelos grandes",
        text:
          "La VRAM es el muro de la IA local. Un Llama 3 de 8B cuantizado a INT4 ocupa unos 5-6 GB (cabe en casi todo), pero un 70B a INT4 necesita unos 40-49 GB con su caché de contexto: no cabe ni en la RTX 5090 de 32 GB sin volcar a RAM, lo que hunde el rendimiento. Para esos modelos solo hay dos caminos: varias GPU de consumo, o una profesional con 96 GB como la RTX PRO 6000. Si tu trabajo es IA local con modelos grandes, esa VRAM es la compra; si no, es dinero parado.",
      },
      {
        heading: "VRAM en render: no acelera, pero evita el desastre",
        text:
          "Ojo con pagar por VRAM de más en 3D: si la escena cabe en la memoria de la GPU, más VRAM no acelera nada. El problema es cuando no cabe: el render cae a memoria del sistema (out-of-core) y el rendimiento se desploma. La guía práctica de CG Director: escenas simples caben en 4-6 GB, proyectos complejos con texturas en alta resolución piden 8-16 GB, y los muy grandes apuntan a 24 GB. Compra la VRAM que tu escena necesita más un margen, no toda la que exista.",
      },
      {
        heading: "Excepciones 3 y 4: ECC y el coste del fallo",
        text:
          "La memoria ECC detecta y corrige errores de un bit en tiempo real (cosa de interferencias y rayos cósmicos, literalmente). En finanzas, medicina, ciencia o renders de días, un bit corrupto silencioso puede invalidar semanas de trabajo: ahí la VRAM ECC de las profesionales es un requisito. Y hay un argumento empresarial final: los drivers pro están validados para cargas críticas con soporte del fabricante. Cuando el downtime cuesta miles de euros la hora, se paga por estabilidad, no por FPS.",
      },
      {
        heading: "La regla de decisión",
        text: "Después de todos los benchmarks, la elección se reduce a comprobar si estás dentro de las cuatro excepciones:",
        list: [
          "Diseño, vídeo, 3D, desarrollo, IA con modelos ≤8B: PC de gaming bien configurado (misma potencia, mucho menos coste)",
          "SolidWorks/Siemens/Catia con certificación ISV exigida: tarjeta profesional",
          "IA local con modelos ≥70B: VRAM ≥48 GB (pro o multi-GPU)",
          "Datos que no pueden corromperse (ciencia, finanzas, renders de días): ECC",
          "En duda: gaming — el 90% de los creadores no toca ninguna excepción",
        ],
      },
    ],
  },
];

export function getPost(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}
