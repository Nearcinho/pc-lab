"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const reveal = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const } },
};

export function Hero() {
  const reduced = useReducedMotion();

  return (
    <section className="relative flex min-h-svh flex-col justify-center overflow-hidden" aria-label="Presentación">
      <div className="absolute inset-0" aria-hidden>
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/builds/mono.svg"
          className="h-full w-full object-cover"
        >
          <source src="/hero-cinematic.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[radial-gradient(70%_55%_at_50%_0%,rgba(79,209,255,0.09),transparent_70%)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/95 via-[#050505]/60 to-[#050505]/15" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#050505] to-transparent" />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#050505]/80 to-transparent" />
      </div>

      <div className="container-x relative py-36 text-left">
        <motion.h1
          variants={reveal}
          initial={reduced ? false : "hidden"}
          animate="show"
          className="mt-8 max-w-4xl font-display text-5xl font-semibold leading-[1.04] tracking-tight text-balance sm:text-7xl lg:text-[6.25rem]"
        >
          Diseñamos el ordenador perfecto
          <span className="block text-gradient">para ti.</span>
        </motion.h1>

        <motion.p
          variants={reveal}
          initial={reduced ? false : "hidden"}
          animate="show"
          transition={reduced ? undefined : { delay: 0.25 }}
          className="mt-8 max-w-xl text-lg leading-relaxed text-muted-2 sm:text-xl"
        >
          No vendemos torres de catálogo. Escuchamos tu presupuesto, tus juegos, tu trabajo y tu futuro, y diseñamos, ensamblamos y certificamos la máquina exacta que necesitas.
        </motion.p>

        <motion.div
          variants={reveal}
          initial={reduced ? false : "hidden"}
          animate="show"
          transition={reduced ? undefined : { delay: 0.4 }}
          className="mt-12 flex flex-col items-start gap-4 sm:flex-row"
        >
          <Link href="/contacto">
            <Button size="lg" variant="brand">Empezar mi proyecto <ArrowRight className="size-4" aria-hidden /></Button>
          </Link>
          <Link href="/proyectos">
            <Button size="lg" variant="outline">Ver nuestro trabajo</Button>
          </Link>
        </motion.div>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduced ? undefined : { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.55 }}
          className="mt-10"
        >
          <span className="badge-polygon inline-block bg-brand px-5 py-2 font-bebas text-base font-semibold uppercase tracking-[0.22em] text-[#051018]">
            Diseñado para ti · Construido para rendir
          </span>
        </motion.div>

        {reduced && (
          <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-end pr-8">
            <Image
              src="/builds/mono.svg"
              alt="Equipo PC LAB diseñado y ensamblado a medida"
              width={480}
              height={280}
              className="h-auto w-full max-w-md object-contain opacity-40 mix-blend-screen"
            />
          </div>
        )}
      </div>
    </section>
  );
}