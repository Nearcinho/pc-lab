import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { blogPosts } from "@/lib/blog";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    "", "/configurador", "/calculadora-rendimiento",
    "/nosotros", "/servicios", "/blog", "/faq", "/contacto",
    "/garantia", "/terminos", "/privacidad",
  ].map((p) => ({
    url: `${siteConfig.domain}${p}`,
    lastModified: now,
    changeFrequency: p === "" ? "weekly" : "monthly",
    priority: p === "" ? 1 : 0.7,
  }));

  const posts: MetadataRoute.Sitemap = blogPosts.map((p) => ({
    url: `${siteConfig.domain}/blog/${p.slug}`,
    lastModified: new Date(p.date + "T00:00:00Z"),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...staticPages, ...posts];
}