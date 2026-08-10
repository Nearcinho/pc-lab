"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { PcBuild } from "@/lib/pcs";
import { Badge } from "@/components/ui/badge";

export function CatalogHero({ title, lede, builds }: { title: string; lede: string; builds: PcBuild[] }) {
  const reduced = useReducedMotion();
  const hero = builds[0];

  return (
    <section className="relative overflow-hidden pt-36 pb-14 sm:pt-44">
      <div className="grid-bg absolute inset-0 opacity-40" aria-hidden />
      <div className="absolute inset-0 bg-[radial-gradient(55%_50%_at_50%_0%,var(--brand-alpha),transparent_70%)] opacity-30" aria-hidden />

      <div className="container-x relative">
        <div className="flex flex-col items-center text-center">
          <Badge variant="premium" dot>{title}</Badge>
          <motion.h1
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 font-display text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl"
          >
            Potencia que se <span className="text-gradient">siente</span>.
          </motion.h1>
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12 }}
            className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-2"
          >
            {lede}
          </motion.p>

          {hero && (
            <motion.div
              initial={reduced ? false : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="mt-12 flex justify-center"
            >
              <div className="relative w-full max-w-md">
                <div className="pointer-events-none absolute -inset-10 rounded-full bg-[radial-gradient(closest-side,var(--brand-alpha),transparent)] opacity-50" aria-hidden />
                <Image
                  src={hero.image}
                  alt={`PC ${hero.name}`}
                  width={640}
                  height={640}
                  priority
                  className="relative z-10 w-full"
                />
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}