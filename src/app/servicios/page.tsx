import type { Metadata } from "next";
import Link from "next/link";
import {
  Check,
  ArrowRight,
  Gamepad2,
  MonitorCog,
  Laptop,
  Server,
  MemoryStick,
  MessagesSquare,
  Wrench,
  Cpu,
  Activity,
  Cable,
  ArrowUpCircle,
  RefreshCcw,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { Cta } from "@/components/home/cta";

export const metadata: Metadata = {
  title: "Servicios | Estudio PC LAB",
  description:
    "Consultoría de hardware, ensamblaje premium, optimización de BIOS, test de estrés, cable management, upgrades y mantenimiento. Todo en un estudio de PC a medida en Madrid.",
  alternates: { canonical: "/servicios" },
};

const serviceIcons = [
  Gamepad2,
  MonitorCog,
  Laptop,
  Server,
  MemoryStick,
  MessagesSquare,
  Wrench,
  Cpu,
  Activity,
  Cable,
  ArrowUpCircle,
  RefreshCcw,
];

const services = [
  {
    title: "PC Gaming a medida",
    description: "Torres diseñadas para tus juegos, tu resolución y tu tasa de refresco. Sin pagar por marketing.",
    features: ["Análisis de tu biblioteca y resolución", "GPU/CPU equilibradas para tu caso", "Perfiles de BIOS exprimidos"],
  },
  {
    title: "PC para creadores",
    description: "Editores, streamers y diseñadores: las máquinas justas para tu pipeline de trabajo real.",
    features: ["VRAM y RAM según tu carga", "NVENC y rendimiento de estudio", "Perfiles de ruido bajo carga"],
  },
  {
    title: "Workstations de desarrollo",
    description: "Compilación, contenedores, bases de datos y entornos donde el tiempo vale oro.",
    features: ["Núcleos y caché equilibrados", "Estabilidad 24/7 certificada", "Almacenamiento NVMe Gen4/5"],
  },
  {
    title: "Workstations de IA",
    description: "Inferencia local, entrenamiento y batching: VRAM abundante y termia bien resuelta.",
    features: ["GPU con VRAM para tu modelo", "RAM y NVMe de alta capacidad", "Refrigeración de larga duración"],
  },
  {
    title: "PC de streaming",
    description: "Emitir y jugar a la vez sin perder un frame, en silencio y con setup listo para OBS.",
    features: ["NVENC para transmisión estable", "Perfil de ventilación silencioso", "Configuración de audio y OBS"],
  },
  {
    title: "Consultoría de hardware",
    description: "Habla con un ingeniero antes de gastar un euro. Sabrás exactamente qué necesitas y qué no.",
    features: ["Análisis honesto peracierto por euro", "Sin sobreventa", "Propuesta documentada"],
  },
  {
    title: "Ensamblaje premium",
    description: "Cable management impecable, soporte a medida y una torre que se ve tan bien como rinde.",
    features: ["Cableado de nivel showroom", "Gestión del aire", "Calidad pieza a pieza"],
  },
  {
    title: "Optimización de BIOS",
    description: "EXPO/XMP, perfiles de ventiladores y undervolt configurados para tu hardware exacto.",
    features: ["Memoria a velocidad oficial", "Perfiles de ventilador a medida", "Consumo y ruido optimizados"],
  },
  {
    title: "Test de estrés (24 h)",
    description: "Carga total de CPU, GPU, RAM y almacenamiento con informe térmico y de estabilidad.",
    features: ["Benchmarks documentados", "Validación de temperaturas", "Informe entregable"],
  },
  {
    title: "Cable management",
    description: "Estética limpia y flujo de aire optimizado. Cada cable tiene su camino y su sitio.",
    features: ["Cableado enrutado", "Amarres y canaletes", "Flujo de aire sin tramos"],
  },
  {
    title: "Upgrades de hardware",
    description: "¿Tu equipo pesa? Ampliamos memoria, almacenamiento, GPU o CPU sin tocar lo que ya funciona.",
    features: ["Compatibilidad verificada", "Actualización sin estrés en tus datos", "Reinstalación limpia"],
  },
  {
    title: "Mantenimiento",
    description: "Limpieza, repaste, actualizaciones y revisión completa para que tu inversión dure.",
    features: ["Limpieza profunda", "Reapca de pasta térmica", "Diagnóstico preventivo"],
  },
];

export default function ServiciosPage() {
  return (
    <>
      <div className="pt-36 pb-16">
        <div className="container-x">
          <SectionHeading
            as="h1"
            eyebrow="Servicios del estudio"
            title="Ingeniería de PC a medida, sin catálogo."
            description="Cada servicio es una fase de un mismo proceso: el del estudio que diseña, construye y cuida tu ordenador como si fuera suyo."
          />

          <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => {
              const Icon = serviceIcons[i] ?? Wrench;
              return (
                <Reveal key={s.title} delay={(i % 3) * 0.06}>
                  <article className="card-hover group flex h-full flex-col rounded-3xl border border-border bg-surface p-7">
                    <span className="flex size-12 items-center justify-center rounded-2xl border border-brand/25 bg-brand/5 text-brand">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <h2 className="mt-5 font-display text-lg font-semibold tracking-tight">{s.title}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-muted-2">{s.description}</p>
                    <ul className="mt-5 flex-1 space-y-2">
                      {s.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm text-muted-2">
                          <Check className="size-4 shrink-0 text-brand" aria-hidden />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6">
                      <Link href="/contacto">
                        <Button variant="outline" size="sm" className="group-hover:border-brand/50 group-hover:text-brand">
                          Solicitar este servicio <ArrowRight className="size-3.5" aria-hidden />
                        </Button>
                      </Link>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
      <Cta />
    </>
  );
}