import { Part } from "@/lib/parts";
import { asset } from "@/lib/base";

// Mapea cada pieza del catálogo a su ilustración en /public/parts.
// El catálogo es genérico: la imagen depende de la categoría y de los
// campos de la pieza (plataforma del CPU, formato de la caja, etc.).
export function partImage(part: Part): string {
  return asset(`/parts/${partImageFile(part)}`);
}

function partImageFile(part: Part): string {
  switch (part.category) {
    case "cpu":
      return part.brand === "AMD" ? "cpu-amd.svg" : "cpu-intel.svg";
    case "gpu":
      return "gpu.svg";
    case "motherboard":
      return "motherboard.svg";
    case "ram":
      return "ram.svg";
    case "storage":
      return "ssd.svg";
    case "cooling":
      return part.height ? "cooling-air.svg" : "cooling-aio.svg";
    case "psu":
      return "psu.svg";
    case "case":
      // Los ids del catálogo coinciden con los archivos: case-itx, case-matx…
      return `${part.id}.svg`;
    case "os":
      return "os.svg";
    case "peripheral":
      return part.kind === "monitor" ? "monitor.svg" : "peripheral.svg";
    case "monitor":
      return "monitor.svg";
    case "extra":
    default:
      return "extra.svg";
  }
}
