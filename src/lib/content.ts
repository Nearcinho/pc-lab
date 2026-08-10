import { asset } from "@/lib/base";

export const brands = [
  { name: "NVIDIA", accent: "#76b900", logo: asset("/brands/nvidia.svg") },
  { name: "AMD", accent: "#ed1c24", logo: asset("/brands/amd.svg") },
  { name: "Intel", accent: "#0071c5", logo: asset("/brands/intel.svg") },
  { name: "ASUS", accent: "#33ccff", logo: asset("/brands/asus.svg") },
  { name: "MSI", accent: "#ff0038", logo: asset("/brands/msi.svg") },
  { name: "Corsair", accent: "#ed1c24", logo: asset("/brands/corsair.svg") },
  { name: "GIGABYTE", accent: "#ff6600", logo: asset("/brands/gigabyte.svg") },
  { name: "NZXT", accent: "#7b7b9e", logo: asset("/brands/nzxt.svg") },
  { name: "Lian Li", accent: "#00a0e9", logo: asset("/brands/lianli.svg") },
  { name: "Samsung", accent: "#1428a0", logo: asset("/brands/samsung.svg") },
  { name: "Crucial", accent: "#00a3e0", logo: asset("/brands/crucial.svg") },
  { name: "Seasonic", accent: "#ff8c00", logo: asset("/brands/seasonic.svg") },
  { name: "Elgato", accent: "#ff0000", logo: asset("/brands/elgato.svg") },
  { name: "Western Digital", accent: "#0055a4", logo: asset("/brands/westerndigital.svg") },
];

export const stats = [
  { value: 2500, suffix: "+", label: "PCs ensamblados" },
  { value: 4.9, suffix: "/5", decimals: 1, label: "Nota de satisfacción" },
  { value: 24, suffix: "h", label: "Test de estabilidad" },
  { value: 9, suffix: "años", label: "Garantía extendida" },
];