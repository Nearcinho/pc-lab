"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { Input, Textarea, Label, FieldError } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

const TYPES = [
  { value: "configuracion", label: "Quiero configurar un PC" },
  { value: "asesoria", label: "Necesito asesoramiento" },
  { value: "upgrade", label: "Quiero mejorar mi actual" },
  { value: "empresa", label: "Compra para empresa / estudio" },
  { value: "otro", label: "Otra consulta" },
];

interface FormState {
  name: string;
  email: string;
  phone: string;
  type: string;
  message: string;
  website?: string;
}

type Errors = Partial<Record<keyof FormState, string>>;

export function ContactForm() {
  const [state, setState] = React.useState<FormState>({ name: "", email: "", phone: "", type: "", message: "" });
  const [errors, setErrors] = React.useState<Errors>({});
  const [status, setStatus] = React.useState<"idle" | "loading" | "ok" | "error">("idle");

  const update = (k: keyof FormState, v: string) => {
    setState((p) => ({ ...p, [k]: v }));
    setErrors((p) => ({ ...p, [k]: undefined }));
  };

  const validate = (): boolean => {
    const e: Errors = {};
    if (state.name.trim().length < 2) e.name = "Escribe tu nombre.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email)) e.email = "Introduce un email válido.";
    if (state.phone && !/^[+0-9 ]{6,16}$/.test(state.phone)) e.phone = "Teléfono no válido.";
    if (!state.type) e.type = "Elige un motivo.";
    if (state.message.trim().length < 10) e.message = "Cuéntanos un poco más (mín. 10 caracteres).";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (state.website) return; // honeypot
    if (!validate()) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(state),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("ok");
      setState({ name: "", email: "", phone: "", type: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <div>
      <AnimatePresence mode="wait">
        {status === "ok" ? (
          <motion.div
            key="ok"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex h-full flex-col items-center justify-center gap-4 rounded-3xl border border-emerald-400/30 bg-emerald-400/5 px-8 py-16 text-center"
            role="status"
          >
            <span className="flex size-16 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-700">
              <CheckCircle2 className="size-8" aria-hidden />
            </span>
            <h3 className="font-display text-2xl font-bold">¡Mensaje enviado!</h3>
            <p className="max-w-md text-sm text-muted">
              Gracias por escribirnos. Te responderemos en menos de 24 horas laborables (normalmente mucho antes).
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onSubmit={onSubmit}
            noValidate
            className="space-y-5 rounded-3xl border border-border bg-surface/50 p-6 backdrop-blur sm:p-8"
          >
            {/* honeypot hidden field */}
            <input
              type="text"
              name="website"
              value={state.website}
              onChange={(e) => handleHoneypot(e, update)}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute -left-[9999px] h-0 w-0 opacity-0"
            />

            <div className="grid gap-5 sm:grid-cols-2">
              <fieldset>
                <Label htmlFor="cf-name">Nombre completo</Label>
                <Input id="cf-name" value={state.name} onChange={(e) => update("name", e.target.value)} placeholder="Pablo García" aria-invalid={Boolean(errors.name)} />
                <FieldError>{errors.name}</FieldError>
              </fieldset>
              <fieldset>
                <Label htmlFor="cf-type">¿En qué te ayudamos?</Label>
                <Select
                  id="cf-type"
                  value={state.type}
                  onChange={(v) => update("type", v)}
                  placeholder="Selecciona un motivo"
                  options={TYPES}
                  error={Boolean(errors.type)}
                />
                <FieldError>{errors.type}</FieldError>
              </fieldset>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <fieldset>
                <Label htmlFor="cf-email">Email</Label>
                <Input id="cf-email" type="email" value={state.email} onChange={(e) => update("email", e.target.value)} placeholder="tu@email.com" aria-invalid={Boolean(errors.email)} />
                <FieldError>{errors.email}</FieldError>
              </fieldset>
              <fieldset>
                <Label htmlFor="cf-phone">Teléfono (opcional)</Label>
                <Input id="cf-phone" type="tel" value={state.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+34 600 000 000" aria-invalid={Boolean(errors.phone)} />
                <FieldError>{errors.phone}</FieldError>
              </fieldset>
            </div>

            <fieldset>
              <Label htmlFor="cf-message">Cuéntanos tu proyecto</Label>
              <Textarea
                id="cf-message"
                value={state.message}
                onChange={(e) => update("message", e.target.value)}
                placeholder="Juego principalmente a X, tengo presupuesto de Y, transporte…"
                aria-invalid={Boolean(errors.message)}
              />
              <FieldError>{errors.message}</FieldError>
            </fieldset>

            {status === "error" && (
              <p className="flex items-center gap-2 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-700" role="alert">
                <AlertCircle className="size-4" aria-hidden /> No hemos podido enviar el mensaje. Inténtalo de nuevo o escríbenos a {siteConfig.email}.
              </p>
            )}

            <div className="flex flex-col items-center gap-3 pt-2">
              <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={status === "loading"}>
                {status === "loading" ? <Loader2 className="animate-spin" aria-hidden /> : <Send className="size-4" aria-hidden />}
                {status === "loading" ? "Enviando…" : "Enviar mensaje"}
              </Button>
              <p className="text-xs text-muted">
                Al enviar aceptas nuestra{" "}
                <a href="/privacidad" className="underline decoration-border-strong underline-offset-4 hover:text-foreground">
                  política de privacidad
                </a>
                . No compartimos tus datos.
              </p>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function handleHoneypot(e: React.ChangeEvent<HTMLInputElement>, update: (k: keyof FormState, v: string) => void) {
  update("website", e.target.value);
}