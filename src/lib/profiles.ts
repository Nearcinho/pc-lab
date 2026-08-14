import type { BuildSelection } from "@/lib/build-engine";

export type UseCase = "gaming" | "streaming" | "render" | "ia" | "productividad";
export type BudgetTier = 1 | 2 | 3 | 4 | 5;

export const USE_CASES: { key: UseCase; label: string; desc: string }[] = [
  { key: "gaming", label: "Gaming", desc: "Jugar a 1440p o 4K con FPS altos y estabilidad." },
  { key: "streaming", label: "Streaming y gameplays", desc: "Jugar y emitir a la vez sin perder rendimiento." },
  { key: "render", label: "Render y creación", desc: "3D, edición de vídeo y diseño exigente." },
  { key: "ia", label: "IA y desarrollo", desc: "Modelos locales, programación y compilación pesada." },
  { key: "productividad", label: "Productividad", desc: "Multitarea, oficina y trabajo diario sin cuellos de botella." },
];

export const BUDGET_TIERS: { key: BudgetTier; label: string }[] = [
  { key: 1, label: "Hasta 1.200 €" },
  { key: 2, label: "1.200 – 1.800 €" },
  { key: 3, label: "1.800 – 2.500 €" },
  { key: 4, label: "2.500 – 3.500 €" },
  { key: 5, label: "Más de 3.500 €" },
];

// Perfil recomendado por (uso × presupuesto). El presupuesto es orientativo:
// el precio final se cierra en la consultoría.
// RAM/SSD/refrigeración/caja usan los IDs genéricos (sin marca) de parts.ts.
export const PROFILES: Record<UseCase, Record<BudgetTier, BuildSelection>> = {
  gaming: {
    1: { cpu: "cpu-r5-7600", motherboard: "mb-b650m", gpu: "gpu-rtx5060", ram: "ram-16-5600", storage: "ssd-1tb-g4", cooling: "cool-air-single", psu: "psu-gold-550", case: "case-atx", os: "os-win-home" },
    2: { cpu: "cpu-r5-9600x", motherboard: "mb-b650e", gpu: "gpu-rx9070", ram: "ram-32-6000", storage: "ssd-2tb-g4", cooling: "cool-aio-240", psu: "psu-gold-750", case: "case-atx", os: "os-win-home" },
    3: { cpu: "cpu-r7-7800x3d", motherboard: "mb-x670e", gpu: "gpu-rx9070xt", ram: "ram-32-6000", storage: "ssd-2tb-g4", cooling: "cool-aio-360", psu: "psu-gold-1000", case: "case-atx", os: "os-win-home" },
    4: { cpu: "cpu-r7-9800x3d", motherboard: "mb-x670e", gpu: "gpu-rtx5080", ram: "ram-32-6000", storage: "ssd-2tb-g5", cooling: "cool-aio-360", psu: "psu-gold-1000", case: "case-atx-tg", os: "os-win-home" },
    5: { cpu: "cpu-r7-9800x3d", motherboard: "mb-x870e", gpu: "gpu-rtx5080", ram: "ram-64-6000", storage: "ssd-4tb-g4", cooling: "cool-aio-360", psu: "psu-gold-1000", case: "case-eatx", os: "os-win-home" },
  },
  streaming: {
    1: { cpu: "cpu-r5-7600", motherboard: "mb-b650m", gpu: "gpu-rtx5060", ram: "ram-32-5600", storage: "ssd-1tb-g4", cooling: "cool-air-single", psu: "psu-gold-550", case: "case-atx", os: "os-win-home" },
    2: { cpu: "cpu-r7-7700x", motherboard: "mb-b650e", gpu: "gpu-rtx5070", ram: "ram-32-6000", storage: "ssd-2tb-g4", cooling: "cool-aio-240", psu: "psu-gold-750", case: "case-atx", os: "os-win-home" },
    3: { cpu: "cpu-r7-7800x3d", motherboard: "mb-x670e", gpu: "gpu-rtx5070ti", ram: "ram-32-6000", storage: "ssd-2tb-g4", cooling: "cool-aio-360", psu: "psu-gold-850", case: "case-atx", os: "os-win-home" },
    4: { cpu: "cpu-r7-9800x3d", motherboard: "mb-x670e", gpu: "gpu-rtx5070ti", ram: "ram-32-6000", storage: "ssd-2tb-g4", cooling: "cool-aio-360", psu: "psu-gold-850", case: "case-atx-tg", os: "os-win-home" },
    5: { cpu: "cpu-r7-9800x3d", motherboard: "mb-x870e", gpu: "gpu-rtx5080", ram: "ram-32-6000", storage: "ssd-4tb-g4", cooling: "cool-aio-360", psu: "psu-gold-1000", case: "case-atx-tg", os: "os-win-home" },
  },
  render: {
    1: { cpu: "cpu-r5-7600", motherboard: "mb-b650m", gpu: "gpu-rtx5060", ram: "ram-32-5600", storage: "ssd-1tb-g4", cooling: "cool-air-single", psu: "psu-gold-550", case: "case-atx", os: "os-win-home" },
    2: { cpu: "cpu-r7-7700x", motherboard: "mb-b650e", gpu: "gpu-rtx5070", ram: "ram-32-6000", storage: "ssd-2tb-g4", cooling: "cool-aio-240", psu: "psu-gold-650", case: "case-atx", os: "os-win-home" },
    3: { cpu: "cpu-r7-9700x", motherboard: "mb-x670e", gpu: "gpu-rtx5070ti", ram: "ram-64-6000", storage: "ssd-2tb-g5", cooling: "cool-aio-360", psu: "psu-gold-850", case: "case-atx", os: "os-win-home" },
    4: { cpu: "cpu-r9-9950x", motherboard: "mb-x870e", gpu: "gpu-rtx5080", ram: "ram-64-6000", storage: "ssd-2tb-g5", cooling: "cool-aio-360", psu: "psu-gold-1000", case: "case-atx-tg", os: "os-win-home" },
    5: { cpu: "cpu-r9-9950x", motherboard: "mb-x870e", gpu: "gpu-rtx5080", ram: "ram-128-5600", storage: "ssd-4tb-g4", cooling: "cool-aio-360", psu: "psu-gold-1000", case: "case-eatx", os: "os-win-home" },
  },
  ia: {
    1: { cpu: "cpu-r5-7600", motherboard: "mb-b650m", gpu: "gpu-rtx5060", ram: "ram-32-5600", storage: "ssd-1tb-g4", cooling: "cool-air-single", psu: "psu-gold-550", case: "case-atx", os: "os-win-home" },
    2: { cpu: "cpu-r7-7700x", motherboard: "mb-b650e", gpu: "gpu-rtx5060", ram: "ram-64-5600", storage: "ssd-2tb-g4", cooling: "cool-aio-240", psu: "psu-gold-650", case: "case-atx", os: "os-win-home" },
    3: { cpu: "cpu-r7-9700x", motherboard: "mb-x670e", gpu: "gpu-rtx5070ti", ram: "ram-64-6000", storage: "ssd-2tb-g4", cooling: "cool-aio-360", psu: "psu-gold-850", case: "case-atx", os: "os-win-home" },
    4: { cpu: "cpu-r9-9950x", motherboard: "mb-x670e", gpu: "gpu-rtx5080", ram: "ram-64-6000", storage: "ssd-4tb-g4", cooling: "cool-aio-360", psu: "psu-gold-1000", case: "case-atx-tg", os: "os-win-home" },
    5: { cpu: "cpu-r9-9950x", motherboard: "mb-x870e", gpu: "gpu-rtx5080", ram: "ram-128-5600", storage: "ssd-4tb-g4", cooling: "cool-aio-360", psu: "psu-gold-1000", case: "case-eatx", os: "os-win-home" },
  },
  productividad: {
    1: { cpu: "cpu-r5-7600", motherboard: "mb-b650m", gpu: "gpu-rtx5060", ram: "ram-16-5600", storage: "ssd-1tb-g4", cooling: "cool-air-single", psu: "psu-gold-550", case: "case-atx", os: "os-win-home" },
    2: { cpu: "cpu-r7-7700x", motherboard: "mb-b650m", gpu: "gpu-rtx5060", ram: "ram-32-6000", storage: "ssd-2tb-g4", cooling: "cool-aio-240", psu: "psu-gold-650", case: "case-atx", os: "os-win-home" },
    3: { cpu: "cpu-r7-9700x", motherboard: "mb-x670e", gpu: "gpu-rtx5070", ram: "ram-32-6000", storage: "ssd-2tb-g4", cooling: "cool-aio-240", psu: "psu-gold-750", case: "case-atx", os: "os-win-home" },
    4: { cpu: "cpu-r7-9700x", motherboard: "mb-x670e", gpu: "gpu-rtx5070ti", ram: "ram-64-6000", storage: "ssd-2tb-g4", cooling: "cool-aio-360", psu: "psu-gold-850", case: "case-atx", os: "os-win-home" },
    5: { cpu: "cpu-r9-9950x", motherboard: "mb-x870e", gpu: "gpu-rtx5070ti", ram: "ram-128-5600", storage: "ssd-4tb-g4", cooling: "cool-aio-360", psu: "psu-gold-1000", case: "case-eatx", os: "os-win-home" },
  },
};