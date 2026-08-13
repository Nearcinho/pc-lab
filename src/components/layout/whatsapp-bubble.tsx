"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";

const WHATSAPP_URL =
  "https://wa.me/34645443841?text=" +
  encodeURIComponent("Hola PC LAB, quiero información sobre un equipo a medida.");

export function WhatsappBubble() {
  const [open, setOpen] = React.useState(false);
  const reduced = useReducedMotion();

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {open && (
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 8, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.25 }}
          className="glass-strong w-72 overflow-hidden rounded-2xl border border-border shadow-glow-sm"
        >
          <div className="bg-[#075E54] px-4 py-3">
            <p className="font-display text-sm font-semibold text-white">PC LAB · WhatsApp</p>
            <p className="text-[11px] text-emerald-100/80">Normalmente respondemos en minutos</p>
          </div>
          <div className="p-4">
            <p className="rounded-xl rounded-tl-none bg-surface-2/70 px-3 py-2 text-xs leading-relaxed text-foreground">
              ¡Hola! ¿Montamos tu próximo PC? Cuéntanos qué necesitas y te asesoramos sin compromiso.
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-[#051018] transition-colors hover:bg-[#3be077]"
            >
              <MessageCircle className="size-4" aria-hidden /> Iniciar conversación
            </a>
          </div>
        </motion.div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Cerrar chat de WhatsApp" : "Abrir chat de WhatsApp"}
        className={cn(
          "flex size-14 items-center justify-center rounded-full text-white shadow-glow transition-all duration-300 hover:scale-105",
          open ? "bg-surface-2 text-foreground" : "bg-[#25D366]"
        )}
      >
        {open ? <X className="size-6" aria-hidden /> : <MessageCircle className="size-7" aria-hidden />}
      </button>
    </div>
  );
}
