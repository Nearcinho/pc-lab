import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ChevronLeft, CalendarDays, Clock, Tags } from "lucide-react";
import { blogPosts, getPost } from "@/lib/blog";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/ui/reveal";
import { Cta } from "@/components/home/cta";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "No encontrado" };
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: `${post.title} | PC LAB`,
      description: post.excerpt,
      type: "article",
    },
  };
}

function formatDate(iso: string) {
  return new Date(iso + "T00:00:00Z").toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = blogPosts.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <article className="pt-32 pb-20">
      <div className="container-x max-w-3xl">
        <nav aria-label="Migajas de pan" className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-muted">
            <li>
              <Link href="/" className="transition-colors hover:text-foreground">
                Inicio
              </Link>
            </li>
            <li aria-hidden>
              <ChevronLeft className="size-3 rotate-180" />
            </li>
            <li>
              <Link href="/blog" className="transition-colors hover:text-foreground">
                Blog
              </Link>
            </li>
            <li aria-hidden>
              <ChevronLeft className="size-3 rotate-180" />
            </li>
            <li className="truncate text-foreground">{post.title}</li>
          </ol>
        </nav>

        <Reveal>
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted">
            <Badge variant="brand">{post.category}</Badge>
            <span className="flex items-center gap-1.5">
              <CalendarDays className="size-4" aria-hidden /> {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="size-4" aria-hidden /> {post.readTime}
            </span>
          </div>
          <h1 className="mt-5 font-display text-3xl font-bold leading-tight sm:text-5xl">{post.title}</h1>
          <p className="mt-4 text-lg text-muted">{post.excerpt}</p>
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          <div className="overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-brand/20 to-brand-2/20 p-2">
            <div className="aspect-[2/1] rounded-xl" />
          </div>
        </Reveal>

        <div className="mt-10 space-y-6">
          {post.content.map((block, i) => (
            <div key={i}>
              {block.heading ? (
                <h2 className="mb-3 font-display text-2xl font-bold">{block.heading}</h2>
              ) : null}
              <p className="leading-relaxed text-foreground/85">{block.text}</p>
              {block.list ? (
                <ul className="mt-4 space-y-2">
                  {block.list.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-foreground/85">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                      <span className="-mt-0.5">{item}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}
        </div>

        <div className="mt-10 flex items-center gap-3 border-t border-border pt-6 text-sm text-muted">
          <Tags className="size-4" aria-hidden />
          {post.tags.map((t) => (
            <Badge key={t} variant="outline">
              #{t}
            </Badge>
          ))}
        </div>

        <Link href="/blog" className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-brand transition-colors hover:text-brand-2">
          <ArrowLeft className="size-4" aria-hidden /> Volver al blog
        </Link>

        <div className="mt-16">
          <h2 className="font-display text-xl font-semibold">Sigue leyendo</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {related.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="card-hover rounded-2xl border border-border bg-surface/60 p-5">
                <Badge variant="default">{p.category}</Badge>
                <span className="mt-3 block text-sm font-semibold leading-snug">{p.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Cta />
    </article>
  );
}