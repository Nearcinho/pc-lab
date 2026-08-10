export interface ShowcaseProject {
  slug: string;
  code: string;
  name: string;
  category: string;
  tagline: string;
  story: string;
  image: string;
  budget: string;
  focus: { label: string; value: string }[];
  specs: { label: string; value: string }[];
  featured?: boolean;
}

export const showcaseProjects: ShowcaseProject[] = [
  {
    slug: "project-atlas",
    code: "P-01",
    name: "ATLAS",
    category: "Gaming · 1440p",
    tagline: "Potencia equilibrada sin exceso de presupuesto.",
    story:
      "Un PC de compra lista para jugar en 1440p con todo en épico. El equilibrio perfecto entre CPU y GPU para años de juego fluido sin tocar el techo de gasto.",
    image: "/builds/apex.svg",
    budget: "≈ 1.650 €",
    focus: [
      { label: "Objetivo", value: "1440p épico · 240 Hz" },
      { label: "Disciplina", value: "Juego diario" },
    ],
    specs: [
      { label: "CPU", value: "Ryzen 7 7800X3D" },
      { label: "GPU", value: "RTX 4070 Super 12 GB" },
      { label: "RAM", value: "32 GB DDR5 6000" },
      { label: "Refrigeración", value: "AIO 240 mm" },
    ],
    featured: true,
  },
  {
    slug: "project-nova",
    code: "P-02",
    name: "NOVA",
    category: "Creador · Video",
    tagline: "Edición 4K y render sin tiempo muerto.",
    story:
      "Pensado para quien vive del timeline: render, edición 4K multicámara e IA aplicada a vídeo con headroom para crecer. Cada núcleo trabaja.",
    image: "/builds/forge.svg",
    budget: "≈ 2.199 €",
    focus: [
      { label: "Objetivo", value: "Render y edición 4K" },
      { label: "Disciplina", value: "Creación diaria" },
    ],
    specs: [
      { label: "CPU", value: "Ryzen 9 7950X (16 núcleos)" },
      { label: "GPU", value: "RTX 4080 Super 16 GB" },
      { label: "RAM", value: "64 GB DDR5 6000" },
      { label: "Refrigeración", value: "AIO 360 mm" },
    ],
  },
  {
    slug: "project-vector",
    code: "P-03",
    name: "VECTOR",
    category: "Else · Desarrollo",
    tagline: "Compila, entrénalo local y no te barra compilar.",
    story:
      "Para desarrollo e IA: compilación rápida, VRAM abundante para modelos locales y silencio durante horas de entrenamiento.",
    image: "/builds/cascade.svg",
    budget: "≈ 2.499 €",
    focus: [
      { label: "Objetivo", value: "Código y IA local" },
      { label: "Disciplina", value: "Desarrollo continuo" },
    ],
    specs: [
      { label: "CPU", value: "Ryzen 9 9950X" },
      { label: "GPU", value: "RTX 4080 Super 16 GB" },
      { label: "RAM", value: "64 GB DDR5 6400" },
      { label: "Refrigeración", value: "AIO 360 mm" },
    ],
  },
  {
    slug: "project-apex",
    code: "P-04",
    name: "APEX",
    category: "Jugador absoluto · 4K",
    tagline: "El techo de rendimiento, sin conmersiones.",
    story:
      "4K ultra con ray tracing, frecuencias de referencia y una torre que respira: el proyecto donde cada componente está en su punto máximo.",
    image: "/builds/titan.svg",
    budget: "≈ 2.749 €",
    focus: [
      { label: "Objetivo", value: "4K ultra + RT" },
      { label: "Disciplina", value: "Competencia y 4K" },
    ],
    specs: [
      { label: "CPU", value: "Ryzen 7 9800X3D" },
      { label: "GPU", value: "RTX 4090 24 GB" },
      { label: "RAM", value: "32 GB DDR5 6000" },
      { label: "Refrigeración", value: "AIO 360 mm" },
    ],
  },
];