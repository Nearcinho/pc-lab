import type { Metadata } from "next";
import { LegalPageShell } from "@/components/legal/legal-shell";

export const metadata: Metadata = {
  title: "Garantía",
  description:
    "1 año de garantía en el ensamblado de todos los equipos PC LAB, más la garantía de cada componente que entrega el fabricante.",
  alternates: { canonical: "/garantia" },
};

const sections = [
  {
    id: "cobertura",
    title: "¿Qué cubre la garantía?",
    paragraphs: [
      "Todos los equipos PC LAB incluyen 1 año de garantía en el ensamblado, con cobertura de pieza y mano de obra de nuestro trabajo.",
      "Cada componente (CPU, GPU, placa, memoria, almacenamiento, fuente, ventiladores...) mantiene la garantía oficial que entrega su fabricante. Somos un estudio de computadores de alto rendimiento, no una tienda de componentes, así que la sustitución se tramita a través de la tienda donde adquirimos cada pieza.",
    ],
  },
  {
    id: "como-funciona",
    title: "¿Cómo funciona?",
    list: [
      "Escríbenos a hola@nexapc.com con tu nº de pedido y una descripción del problema.",
      "Diagnosticamos el equipo e identificamos la pieza afectada.",
      "Sustituimos la pieza defectuosa y tramitamos su garantía con la tienda donde se compró el componente. El plazo depende de su proceso; no fijamos un máximo.",
    ],
  },
  {
    id: "exclusiones",
    title: "Qué no cubre",
    list: [
      "Daños físicos: golpes, líquidos, fuego, exceso de polvo extremo o uso indebido.",
      "Alteraciones: overclocking agresivo con voltaje fuera de stock o modding no autorizado.",
      "Desgaste normal de ventiladores o pasta térmica en equipos con más de 1 año.",
      "Pérdida de datos: guarda siempre tus backups.",
    ],
  },
];

export default function GarantiaPage() {
  return (
    <LegalPageShell
      eyebrow="Garantía"
      title="Garantía y confianza PC LAB"
      description="Queremos que tu PC funcione sin sustos. Por eso cada equipo sale probado y con una garantía clara, sin letra pequeña."
      updated="Enero 2026"
      sections={sections}
    />
  );
}