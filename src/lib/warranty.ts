import type { Category } from "@/lib/parts";

export interface WarrantyInfo {
  period: string;
  detail: string;
}

// Garantía del ensamblado (PC LAB), independiente de la de cada componente.
export const ASSEMBLY_WARRANTY: WarrantyInfo = {
  period: "1 año",
  detail:
    "Garantía PC LAB en el ensamblado: mano de obra, cableado, test de estabilidad de 24 h y puesta a punto.",
};

// Garantía oficial del fabricante por categoría de componente.
export const CATEGORY_WARRANTY: Record<Category, WarrantyInfo> = {
  cpu: { period: "3 años", detail: "Garantía oficial del fabricante (AMD / Intel)." },
  motherboard: { period: "3 años", detail: "Garantía oficial del fabricante de la placa." },
  gpu: { period: "3 años", detail: "Garantía oficial del fabricante de la gráfica." },
  ram: {
    period: "De por vida",
    detail: "Garantía limitada de por vida del fabricante (Crucial, G.Skill, Kingston…).",
  },
  storage: {
    period: "5 años",
    detail: "Garantía oficial del fabricante, limitada también por TBW escritos.",
  },
  cooling: {
    period: "2 – 6 años",
    detail: "Según fabricante y tipo: aire (hasta 6 años) o líquida (2 – 5 años).",
  },
  psu: {
    period: "5 – 10 años",
    detail: "Según modelo; algunas marcas amplían al registrar el producto.",
  },
  case: { period: "2 años", detail: "Garantía oficial del fabricante." },
  os: { period: "N/A", detail: "Software: soporte de Microsoft, sin garantía de hardware." },
  peripheral: { period: "2 años", detail: "Garantía oficial del fabricante." },
  monitor: {
    period: "3 años",
    detail: "Garantía oficial del fabricante; política de píxeles muertos según marca.",
  },
  extra: { period: "2 años", detail: "Garantía oficial del fabricante." },
};
