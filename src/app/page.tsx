import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { StoryIntro } from "@/components/home/story-intro";
import { UseCases } from "@/components/home/use-cases";
import { Services } from "@/components/home/services";
import { Craftsmanship } from "@/components/home/craftsmanship";
import { FounderStory } from "@/components/home/founder-story";
import { FinalCta } from "@/components/home/final-cta";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "PCs a medida en Madrid · Gaming, creación e IA",
  description: siteConfig.description,
  alternates: {
    canonical: "/",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteConfig.domain}/#website`,
      url: siteConfig.domain,
      name: siteConfig.longName,
      description: siteConfig.description,
      publisher: { "@id": `${siteConfig.domain}/#organization` },
      inLanguage: "es-ES",
    },
    {
      "@type": "Organization",
      "@id": `${siteConfig.domain}/#organization`,
      name: siteConfig.longName,
      url: siteConfig.domain,
      email: siteConfig.email,
      slogan: siteConfig.tagline,
      sameAs: [
        siteConfig.social.instagram,
        siteConfig.social.youtube,
        siteConfig.social.x,
        siteConfig.social.discord,
        siteConfig.social.linkedin,
      ],
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <StoryIntro />
      <UseCases />
      <Services />
      <Craftsmanship />
      <FounderStory />
      <FinalCta />
    </>
  );
}