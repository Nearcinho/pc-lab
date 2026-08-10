import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { CalendarDays, Clock } from "lucide-react";
import { blogPosts } from "@/lib/blog";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Blog de PCs gaming y tecnología",
  description:
    "Guías y comparativas del equipo PC LAB: CPUs, GPUs, RAM, refrigeración, streaming y productividad, en español.",
  alternates: { canonical: "/blog" },
};

function formatDate(iso: string) {
  return new Date(iso + "T00:00:00Z").toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" });
}

export default function BlogPage() {
  const [first, ...rest] = blogPosts;

  return (
    <div className="pt-32 pb-20">
      <div className="container-x">
        <SectionHeading
          as="h1"
          eyebrow="Blog"
          title="Guías y análisis de hardware"
          description="Escribimos pensando en decidir mejor: sin humo, datos reales y comparativas que sirven para comprar."
        />

        {/* Featured */}
        <Reveal className="mt-14">
          <Link
            href={`/blog/${first.slug}`}
            className="group grid gap-6 overflow-hidden rounded-3xl border border-border bg-surface/60 transition-colors hover:border-border-strong lg:grid-cols-2"
          >
            <div className="relative h-64 lg:h-auto">
              <Image
                src={first.cover}
                alt={first.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-center p-8">
              <div className="flex flex-wrap items-center gap-3 text-xs text-muted">
                <Badge variant="brand">{first.category}</Badge>
                <span className="flex items-center gap-1.5"><CalendarDays className="size-3.5" aria-hidden /> {formatDate(first.date)}</span>
                <span className="flex items-center gap-1.5"><Clock className="size-3.5" aria-hidden /> {first.readTime}</span>
              </div>
              <h2 className="mt-4 font-display text-2xl font-bold leading-tight sm:text-3xl">{first.title}</h2>
              <p className="mt-3 text-muted">{first.excerpt}</p>
            </div>
          </Link>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((post, i) => (
            <Reveal key={post.slug} delay={(i % 3) * 0.08}>
              <Link
                href={`/blog/${post.slug}`}
                className="card-hover group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-surface/60"
              >
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={post.cover}
                    alt={post.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
                    <Badge variant="default">{post.category}</Badge>
                    <span className="flex items-center gap-1"><Clock className="size-3" aria-hidden /> {post.readTime}</span>
                  </div>
                  <h2 className="mt-3 font-display text-lg font-bold leading-snug">{post.title}</h2>
                  <p className="mt-2 line-clamp-2 flex-1 text-sm text-muted">{post.excerpt}</p>
                  <p className="mt-4 text-xs text-muted">{formatDate(post.date)}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
