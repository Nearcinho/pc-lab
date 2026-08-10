import type { Metadata } from "next";
import { LegalPageShell } from "@/components/legal/legal-shell";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description:
    "Cómo tratamos tus datos en PC LAB Custom PC: qué recogemos, para qué y cómo protegerlo.",
  alternates: { canonical: "/privacidad" },
};

const sections = [
  {
    id: "responsable",
    title: "1. Responsable del tratamiento",
    paragraphs: [
      "PC LAB Custom PC S.L. (CIF B-00000000), Plaza de la Tecnología 5, 28001 Madrid, hola@nexapc.com. Datos de contacto del delegado: privacidad@nexapc.com.",
    ],
  },
  {
    id: "recogemos",
    title: "2. Qué datos recogemos",
    list: [
      "Identificativos: nombre, email, teléfono y dirección de envío.",
      "Técnicos: si configuras un PC en el configurador, guardamos tu selección durante la sesión para mostrar el resumen.",
      "Analítica anonimizada (si aceptas cookies) para mejorar la web.",
    ],
  },
  {
    id: "finalidad",
    title: "3. Finalidad y base legal",
    list: [
      "Atender tu solicitud y presupuesto (ejecución de contrato precontractual): usamos los datos del formulario de contacto.",
      "Cumplir obligaciones LEGALES (facturación, RGPD).",
      "Tu consentimiento para analítica y para recibir newsletter si te apuntas.",
    ],
  },
  {
    id: "plazo",
    title: "4. Conservación",
    paragraphs: [
      "Guardamos los datos solo el tiempo necesario: contactos 24 meses; facturación el mínimo legal (6 años); analítica 14 meses como máximo.",
    ],
  },
  {
    id: "destinatarios",
    title: "5. Con quién compartimos",
    paragraphs: [
      "No vendemos nada a nadie. Compartimos datos mínimos con: transportistas (envío), proveedores de email para envío de pedidos, y procesadores de pago. Todos con contrato de encargo de tratamiento.",
    ],
  },
  {
    id: "derechos",
    title: "6. Tus derechos",
    list: [
      "Acceso, rectificación, supresión, oposición, portabilidad y limitación del tratamiento.",
      "Escribir a privacidad@nexapc.com y, si no quedas contento, reclamar ante la AEPD (aepd.es).",
    ],
  },
  {
    id: "seguridad",
    title: "7. Seguridad",
    paragraphs: [
      "Usamos cifrado TLS en toda la web, acceso restringido a los datos y backups cifrados. Las contraseñas se almacenan solo con hash de un solo sentido e inaccesibles para nosotros.",
    ],
  },
];

export default function PrivacidadPage() {
  return (
    <LegalPageShell
      eyebrow="Legal"
      title="Política de privacidad"
      description="Lo que recogemos, por qué y cómo lo protegemos. Sin letra pequeña rara."
      updated="Enero 2026"
      sections={sections}
    />
  );
}