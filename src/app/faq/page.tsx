import type { Metadata } from "next";
import Link from "next/link";
import { faqGroups } from "@/lib/faq";
import { SectionHeading } from "@/components/ui/section-heading";
import { Accordion } from "@/components/ui/accordion";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Preguntas frecuentes",
  description:
    "Resolvemos tus dudas sobre plazos, envíos, garantía, personalización y soporte en PC LAB Custom PC.",
  alternates: { canonical: "/faq" },
};

function slugify(text: string) {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqGroups.flatMap((group) =>
      group.items.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      }))
    ),
  };

  return (
    <div className="pt-32 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container-x max-w-4xl">
        <SectionHeading
          as="h1"
          eyebrow="FAQ"
          title="Preguntas frecuentes"
          description="Todo lo que sueles preguntarnos antes de encargar tu PC. Si queda algo, escríbenos."
        />

        <div className="mt-12 space-y-10">
          {faqGroups.map((group) => (
            <section key={group.category} aria-labelledby={slugify(group.category)}>
              <Reveal>
                <h2 id={slugify(group.category)} className="font-display text-xl font-semibold text-brand-2">
                  {group.category}
                </h2>
              </Reveal>
              <Reveal delay={0.08} className="mt-4">
                <Accordion
                  items={group.items.map((item, idx) => ({
                    value: `${slugify(group.category)}-${idx}`,
                    title: item.question,
                    content: item.answer,
                  }))}
                />
              </Reveal>
            </section>
          ))}
        </div>

        <Reveal className="mt-16 text-center">
          <div className="rounded-3xl border border-border bg-surface/50 p-8">
            <h2 className="font-display text-xl font-bold">¿Sigues con dudas?</h2>
            <p className="mt-2 text-sm text-muted">Nuestro equipo responde en menos de 24 horas laborables.</p>
            <Link href="/contacto" className="mt-5 inline-block">
              <Button>Hablar con PC LAB</Button>
            </Link>
          </div>
        </Reveal>
      </div>
    </div>
  );
}