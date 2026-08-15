import type { Metadata } from "next";
import { LegalPageShell } from "@/components/legal/legal-shell";

export const metadata: Metadata = {
  title: "Términos y condiciones",
  description:
    "Condiciones de compra, envío, devolución y pago de PC LAB Custom PC.",
  alternates: { canonical: "/terminos" },
};

const sections = [
  {
    id: "compra",
    title: "1. Realizar un pedido",
    paragraphs: [
      "Al realizar un pedido aceptas estas condiciones. Los precios se muestran en euros. Tras confirmar el pago, recibirás un email con el resumen y el plazo estimado.",
      "Los equipos se configuran y montan a medida: el plazo estimado aparece en tu confirmación y puede variar ±3 días si hay rotura de stock en algún componente (te avisamos antes).",
    ],
  },
  {
    id: "pago",
    title: "2. Pago",
    list: [
      "Tarjeta y Apple/Google Pay: cobro inmediato.",
      "Transferencia bancaria: el pedido entra en taller al recibir el ingreso.",
      "Financiación (3–12 meses): disponible a partir de 500 €, sujeta a aprobación.",
    ],
  },
  {
    id: "envio",
    title: "3. Envío",
    paragraphs: [
      "Envíamos a toda España peninsular en 24–48 h y a Baleares/Canarias en 2–4 días, siempre con embalaje de espuma a medida y seguro incluido. El transporte es gratuito a partir de 1.000 €.",
      "Los equipos custom se aseguran contra daños durante el transporte; revisa el paquete a la entrega y avísanos en las primeras 48 h si algo no cuadra.",
    ],
  },
  {
    id: "devoluciones",
    title: "4. Devolución y desistimiento",
    paragraphs: [
      "Tienes 14 días naturales para desistir de la compra desde la entrega (Ley General para la Defensa de los Consumidores). El equipo debe volver en su embalaje original y sin montar/desmontar en exceso. La devolución de equipos a medida puede conllevar un cargo del 15% si ya entró en montaje, que te comunicamos por escrito antes.",
    ],
  },
  {
    id: "precios",
    title: "5. Precios e impuestos",
    paragraphs: [
      "Los precios pueden variar por cambios en el mercado de componentes. Si suben más de un 5% entre tu pedido y el montaje, te lo confirmamos antes de proceder.",
    ],
  },
  {
    id: "legal",
    title: "6. Legal",
    paragraphs: [
      "PC LAB Custom PC S.L., CIF B-00000000, Madrid, España. Cualquier litigio se resolverá ante los juzgados de Madrid, y la plataforma de resolución de litigios de la UE está disponible en ec.europa.eu/consumers/odr.",
    ],
  },
];

export default function TerminosPage() {
  return (
    <LegalPageShell
      eyebrow="Legal"
      title="Términos y condiciones"
      description="Las reglas claras de compra de PC LAB: pagos, envíos, devoluciones y plazos."
      updated="Enero 2026"
      sections={sections}
    />
  );
}