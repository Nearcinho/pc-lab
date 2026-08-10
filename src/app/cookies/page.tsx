import type { Metadata } from "next";
import { LegalPageShell } from "@/components/legal/legal-shell";

export const metadata: Metadata = {
  title: "Política de cookies",
  description:
    "Qué cookies usa PC LAB, para qué y cómo ajustar tu consentimiento en cualquier momento.",
  alternates: { canonical: "/cookies" },
};

const sections = [
  {
    id: "que-son",
    title: "1. Qué son las cookies",
    paragraphs: [
      "Las cookies son pequeños archivos que el navegador guarda para recordar información entre visitas. Las usamos para que la web funcione y, si tú lo autorizas, para mejorar tu experiencia.",
    ],
  },
  {
    id: "que-usamos",
    title: "2. Cookies que usamos",
    list: [
      "Necesarias (siempre activas): sesión, carrito/configurador local y ajustes técnicos. No requieren consentimiento.",
      "Analítica (opcional): conteo anónimo de visitas (los datos se agregan sin identificar).",
      "Preferencias (opcional): recordar tus selecciones y, si la activas, la newsletter.",
    ],
  },
  {
    id: "gestion",
    title: "3. Cómo gestionarlas",
    paragraphs: [
      "Puedes cambiar tu elección en el banner de cookies que aparece y desde el ajuste de preferencias en el pie de página. También puedes limpiar cookies desde tu navegador (Chrome, Firefox, Safari, Edge) en cualquier momento.",
    ],
  },
  {
    id: "terceros",
    title: "4. Cookies de terceros",
    paragraphs: [
      "Usamos únicamente analítica propia o de terceros anonimizada; no usamos publicidad comportamental con tus datos. No vendemos perfiles ni datos a nadie.",
    ],
  },
  {
    id: "contacto",
    title: "5. Contacto",
    paragraphs: [
      "Para cualquier consulta sobre cookies: hola@nexapc.com o a través del formulario de contacto.",
    ],
  },
];

export default function CookiesPage() {
  return (
    <LegalPageShell
      eyebrow="Legal"
      title="Política de cookies"
      description="Qué información de tu navegador usamos y cómo la puedes controlar tú."
      updated="Enero 2026"
      sections={sections}
    />
  );
}