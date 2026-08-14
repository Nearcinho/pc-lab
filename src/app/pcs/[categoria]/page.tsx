import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Settings2 } from "lucide-react";
import { getPrebuildCategory, prebuildCategories } from "@/lib/prebuilds";
import { PROFILES, BudgetTier } from "@/lib/profiles";
import { priceBuild, displayPrice, PRICES_UPDATED } from "@/lib/pricing";
import { formatNumber } from "@/lib/utils";
import { partById } from "@/lib/parts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Cta } from "@/components/home/cta";

interface Props {
  params: Promise<{ categoria: string }>;
}

export function generateStaticParams() {
  return prebuildCategories.map((c) => ({ categoria: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categoria } = await params;
  const cat = getPrebuildCategory(categoria);
  if (!cat) return { title: "No encontrado" };
  return {
    title: `${cat.title} a medida | PC LAB`,
    description: cat.description,
    alternates: { canonical: `/pcs/${cat.slug}` },
  };
}

const SPEC_KEYS: { key: "cpu" | "gpu" | "ram" | "storage" | "cooling"; label: string }[] = [
  { key: "cpu", label: "CPU" },
  { key: "gpu", label: "GPU" },
  { key: "ram", label: "RAM" },
  { key: "storage", label: "SSD" },
  { key: "cooling", label: "Refrigeración" },
];

export default async function PrebuildCategoryPage({ params }: Props) {
  const { categoria } = await params;
  const cat = getPrebuildCategory(categoria);
  if (!cat) notFound();

  return (
    <div className="pt-32 pb-20">
      <div className="container-x">
        <nav aria-label="Migajas de pan" className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground">
            <ArrowLeft className="size-4" aria-hidden /> Inicio
          </Link>
        </nav>

        <header className="max-w-3xl border-b border-border pb-10">
          <p className="flex items-center gap-3 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-muted">
            <span className="inline-block h-px w-10 bg-border-strong" aria-hidden />
            {cat.eyebrow}
          </p>
          <h1 className="mt-6 font-display text-4xl font-medium leading-[1.04] tracking-[-0.02em] sm:text-5xl">
            {cat.title}
          </h1>
          <p className="mt-5 text-base leading-relaxed text-muted-2">{cat.description}</p>
          <p className="mt-4 text-xs text-muted">
            Precios orientativos con IVA: componentes a precio de mercado (Amazon/idealo, {PRICES_UPDATED}) más el
            montaje, test de 24 h y configuración incluidos. La cotización final se confirma en la consultoría.
          </p>
        </header>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {cat.builds.map((b) => {
            const tier = Number(b.preset.split("-")[1]) as BudgetTier;
            const profile = PROFILES[cat.use][tier];
            const price = priceBuild(profile, tier);
            const specs = SPEC_KEYS.map(({ key, label }) => ({
              label,
              value: partById(profile[key] ?? "")?.name ?? "—",
            }));
            return (
              <article
                key={b.name}
                className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-surface/50 transition-all duration-300 hover:border-border-strong hover:shadow-glow-sm"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-black">
                  <Image
                    src={b.image}
                    alt={`PC ${cat.title} ${b.name}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-contain"
                  />
                  <Badge variant="brand" className="absolute left-4 top-4 uppercase tracking-wider">
                    {b.tierLabel}
                  </Badge>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h2 className="font-display text-2xl font-semibold tracking-tight">{b.name}</h2>
                  <p className="mt-1 text-sm text-muted">{b.tagline}</p>

                  <div className="mt-4 rounded-2xl border border-brand/25 bg-brand/5 px-4 py-3">
                    <p className="font-display text-2xl font-semibold text-brand">{formatNumber(displayPrice(price.total))} €</p>
                    <p className="mt-0.5 text-[11px] leading-snug text-muted">
                      IVA, montaje, test de 24 h y configuración incluidos
                    </p>
                  </div>

                  <dl className="mt-5 space-y-2 border-t border-border/60 pt-4 text-sm">
                    {specs.map((s) => (
                      <div key={s.label} className="flex items-baseline justify-between gap-3">
                        <dt className="shrink-0 text-xs font-semibold uppercase tracking-wide text-muted">{s.label}</dt>
                        <dd className="text-right font-medium text-foreground/90">{s.value}</dd>
                      </div>
                    ))}
                  </dl>

                  <div className="mt-6 flex flex-col gap-2 border-t border-border/60 pt-5">
                    <Button asChild className="w-full">
                      <Link href={`/configurador?preset=${b.preset}`}>
                        <Settings2 className="size-4" aria-hidden /> Configurar este PC
                      </Link>
                    </Button>
                    <Button asChild variant="secondary" className="w-full">
                      <Link href={`/cotizar?preset=${b.preset}`}>
                        Solicitar cotización <ArrowRight className="size-4" aria-hidden />
                      </Link>
                    </Button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <p className="mt-12 max-w-2xl text-xs leading-relaxed text-muted">
          Precios de mercado a {PRICES_UPDATED}: la RAM y algunas gráficas están en escasez y su precio puede variar
          semanalmente — por eso confirmamos siempre la cotización final contigo antes de montar. El montaje, el test
          de 24 h y la puesta a punto están incluidos en todos los equipos PC LAB.
        </p>
      </div>
      <Cta />
    </div>
  );
}
