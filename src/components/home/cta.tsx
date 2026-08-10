"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

export function Cta() {
  return (
    <section className="py-24 sm:py-36" aria-label="Contacto">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-border bg-surface px-6 py-20 text-center sm:px-12 sm:py-28">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_70%_at_50%_120%,rgba(79,209,255,0.12),transparent_70%)]" aria-hidden />
          <div className="pointer-events-none absolute inset-0 grid-bg opacity-20" aria-hidden />

          <Reveal className="relative">
            <p className="text-[11px] uppercase tracking-[0.3em] text-brand">Tu máquina empieza con una conversación</p>
            <h2 className="mx-auto mt-6 max-w-3xl font-display text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl lg:leading-[1.05]">
              Cuéntanos tu proyecto y te diseñamos el ordenador perfecto.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-2">
              Sin compromiso. Te responderemos en menos de 24 horas con una propuesta a medida, justificada pieza a pieza.
            </p>

            <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/contacto"
                className="group inline-flex items-center gap-2 rounded-full bg-brand px-9 py-4 text-sm font-semibold text-[#051018] transition-all duration-300 hover:bg-[#8ae1ff]"
              >
                Empezar mi proyecto <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
              </Link>
              <Link
                href="/configurador"
                className="inline-flex items-center gap-2 rounded-full border border-border-strong px-9 py-4 text-sm font-semibold text-foreground transition-all duration-300 hover:border-brand/60 hover:text-brand"
              >
                Explorar el simulador
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}