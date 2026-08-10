import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { blogPosts } from "@/lib/blog";
import { pcs } from "@/lib/pcs";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    "", "/equipos", "/configurador", "/calculadora-rendimiento",
    "/nosotros", "/servicios", "/blog", "/faq", "/contacto",
    "/garantia", "/terminos", "/privacidad", "/cookies",
  ].map((p) => ({
    url: `${siteConfig.domain}${p}`,
    lastModified: now,
    changeFrequency: p === "" ? "weekly" : "monthly",
    priority: p === "" ? 1 : 0.7,
  }));

  const equipos: MetadataRoute.Sitemap = ["gaming", "workstation", "streaming"].map((cat) => ({
    url: `${siteConfig.domain}/equipos/${cat}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const posts: MetadataRoute.Sitemap = blogPosts.map((p) => ({
    url: `${siteConfig.domain}/blog/${p.slug}`,
    lastModified: new Date(p.date + "T00:00:00Z"),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  // Individual products on the sitemap via catalog (they are represented in equipos pages)
  const catalogPages: MetadataRoute.Sitemap = pcs.map((p) => ({
    url: `${siteConfig.domain}/equipos/${p.category}#${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticPages, ...equipos, ...posts, ...catalogPages];
}