import type { Metadata } from "next";
import { Clock, Mail, Phone, MessageCircle } from "lucide-react";
import { ContactForm } from "@/components/contact/contact-form";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Habla con el equipo PC LAB: personalización de PC, presupuestos, envíos y soporte. Respondemos en menos de 24 h laborables.",
  alternates: { canonical: "/contacto" },
};

const channels = [
  { icon: Mail, label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
  { icon: Phone, label: "Teléfono", value: siteConfig.phone, href: `tel:${siteConfig.phone.replace(/\s/g, "")}` },
  { icon: MessageCircle, label: "Discord", value: "nexa.pc", href: siteConfig.social.discord },
  { icon: Clock, label: "Horario", value: "Lun–Vie · 10:00–19:00" },
];

export default function ContactoPage() {
  return (
    <div className="pt-32 pb-20">
      <div className="container-x max-w-6xl">
        <SectionHeading
          as="h1"
          eyebrow="Contacto"
          title="Hablemos de tu próximo PC"
          description="Configuración, asesoría, upgrades o empresa: respondemos rápido y con criterio."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-4">
            {channels.map((c, i) => {
              const content = (
                <div className="card-hover flex items-center gap-4 rounded-2xl border border-border bg-surface/60 p-5">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-brand/25 bg-brand/5 text-brand">
                    <c.icon className="size-5" aria-hidden />
                  </span>
                  <div>
                    <p className="text-sm text-muted">{c.label}</p>
                    <p className="font-medium">{c.value}</p>
                  </div>
                </div>
              );
              return (
                <Reveal key={c.label} delay={i * 0.05}>
                  {c.href ? (
                    <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined} className="block">
                      {content}
                    </a>
                  ) : (
                    content
                  )}
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </div>
  );
}
