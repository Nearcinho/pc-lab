"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InteractiveColumns } from "@/components/interactive-columns";
import { asset } from "@/lib/base";

const heroItems = [
  {
    kicker: "Diseño a medida",
    title: "Cada PC empieza por ti.",
    text: "No vendemos torres de catálogo. Escuchamos tu presupuesto, tus juegos, tu trabajo y tu futuro, y diseñamos y ensamblamos la máquina exacta que necesitas.",
  },
  {
    kicker: "Ensamblado con criterio",
    title: "Montaje limpio, sin prisas.",
    text: "Cable management ordenado, conexiones verificadas y configuración completa antes de cerrar la torre.",
  },
  {
    kicker: "Probado antes de entregar",
    title: "Tranquilidad asegurada.",
    text: "Test de estabilidad y rendimiento bajo carga real. Tu equipo llega funcionando, no a medias.",
  },
  {
    kicker: "Garantía, por escrito",
    title: "1 año de garantía.",
    text: "En el ensamblado, más la garantía de cada componente que entrega el fabricante. Sin letra pequeña.",
  },
];

const reveal = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const } },
};

export function Hero() {
  const reduced = useReducedMotion();

  return (
    <section className="relative flex min-h-svh flex-col overflow-hidden" aria-label="Presentación">
      <div className="absolute inset-0" aria-hidden>
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={asset("/builds/mono.svg")}
          className="h-full w-full object-cover"
        >
          <source src={asset("/hero-cinematic.mp4")} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[radial-gradient(70%_55%_at_50%_0%,rgba(79,209,255,0.09),transparent_70%)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/95 via-[#050505]/60 to-[#050505]/15" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#050505] to-transparent" />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#050505]/80 to-transparent" />
      </div>

      <div className="container-x relative flex flex-1 flex-col">
        <div className="flex flex-1 flex-col justify-center py-36">
          <motion.h1
            variants={reveal}
            initial={reduced ? false : "hidden"}
            animate="show"
            className="mt-8 max-w-4xl font-display text-5xl font-semibold leading-[1.04] tracking-tight text-balance sm:text-7xl lg:text-[6.25rem]"
          >
            Diseñamos el ordenador perfecto
            <span className="block text-gradient">para ti.</span>
          </motion.h1>

          <motion.div
            variants={reveal}
            initial={reduced ? false : "hidden"}
            animate="show"
            transition={reduced ? undefined : { delay: 0.25 }}
            className="mt-12"
          >
            <Link href="/contacto">
              <Button size="lg" variant="brand">Empezar mi proyecto <ArrowRight className="size-4" aria-hidden /></Button>
            </Link>
          </motion.div>
        </div>

        <div className="pb-10">
          <InteractiveColumns items={heroItems} />
        </div>
      </div>
    </section>
  );
}