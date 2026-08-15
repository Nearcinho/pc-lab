import * as React from "react";
import Link from "next/link";
import { ArrowUpRight, Camera, Play, AtSign, MessageCircle, Mail, Phone } from "lucide-react";
import { LinkedInIcon } from "@/components/ui/linkedin-icon";
import { Brand } from "@/components/brand/brand";
import { siteConfig, formatMailHref, formatPhoneHref } from "@/lib/site";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Configurador", href: "/configurador" },
  { label: "PC Gaming", href: "/pcs/gaming" },
  { label: "PC para creadores", href: "/pcs/creadores" },
  { label: "PC de trabajo", href: "/pcs/trabajo" },
  { label: "PC de IA y desarrollo", href: "/pcs/ia" },
  { label: "Calculadora de rendimiento", href: "/calculadora-rendimiento" },
  { label: "Garantía", href: "/garantia" },
  { label: "Servicios", href: "/#servicios" },
  { label: "Quiénes somos", href: "/nosotros" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "Contacto", href: "/contacto" },
];

const legalLinks = [
  { label: "Privacidad", href: "/privacidad" },
  { label: "Términos y condiciones", href: "/terminos" },
];

const socials = [
  { label: "Instagram", href: siteConfig.social.instagram, icon: Camera },
  { label: "YouTube", href: siteConfig.social.youtube, icon: Play },
  { label: "X (Twitter)", href: siteConfig.social.x, icon: AtSign },
  { label: "Discord", href: siteConfig.social.discord, icon: MessageCircle },
  { label: "LinkedIn", href: siteConfig.social.linkedin, icon: LinkedInIcon },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background">
      <div className="container-x py-16">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-sm">
            <Brand />
            <p className="mt-5 text-sm leading-relaxed text-muted-2">
              Un estudio de Madrid que diseña y ensambla PCs a medida. Nada de catálogo: cada equipo se
              piensa para lo que tú vas a hacer con él.
            </p>
            <div className="mt-5 space-y-2 text-sm">
              <a
                href={formatMailHref(siteConfig.email)}
                className="flex items-center gap-2 text-muted-2 transition-colors hover:text-foreground"
              >
                <Mail className="size-4 text-brand" aria-hidden />
                {siteConfig.email}
              </a>
              <a
                href={formatPhoneHref(siteConfig.phone)}
                className="flex items-center gap-2 text-muted-2 transition-colors hover:text-foreground"
              >
                <Phone className="size-4 text-brand" aria-hidden />
                {siteConfig.phone}
              </a>
            </div>
          </div>

          <nav aria-label="Navegación" className="grid grid-cols-2 gap-x-16 gap-y-3 sm:grid-cols-3 lg:grid-cols-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group inline-flex items-center gap-1 text-sm text-muted-2 transition-colors hover:text-foreground"
              >
                <span className="inline-flex items-center gap-1">
                  {link.label}
                  <ArrowUpRight className="size-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden />
                </span>
              </Link>
            ))}
          </nav>

          <div>
            <h3 className="font-mono text-sm font-medium uppercase tracking-[0.18em] text-muted-2">Legal</h3>
            <ul className="mt-4 space-y-2.5">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted transition-colors hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-6 border-t border-border pt-8 sm:flex-row">
          <p className="text-xs text-muted">© {year} {siteConfig.longName}. Todos los derechos reservados.</p>
          <div className="flex gap-2">
            {socials.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="inline-flex size-9 items-center justify-center rounded-full border border-border text-muted transition-all duration-300 hover:border-brand/50 hover:text-brand"
              >
                <Icon className="size-4" aria-hidden />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}