import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Bebas_Neue } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PageTransition } from "@/components/layout/page-transition";
import { ScrollProgress } from "@/components/effects/scroll-progress";
import { siteConfig } from "@/lib/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.domain),
  title: {
    default: "PC LAB·Estudio | PCs a medida en Madrid",
    template: "%s | PC LAB·Estudio",
  },
  description: siteConfig.description,
  keywords: [
    "PC a medida",
    "PC gaming a medida",
    "ordenador a medida",
    "PCs a medida Madrid",
    "PC para streaming",
    "workstation España",
    "PC para IA",
    "PC creación de contenido",
    "custom PC España",
    "ensamblaje de PC personalizado",
    "montaje de PCs gaming",
    "PC builder España",
  ],
  authors: [{ name: siteConfig.longName }],
  creator: siteConfig.longName,
  publisher: siteConfig.longName,
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: siteConfig.domain,
    siteName: siteConfig.longName,
    title: "PC LAB·Estudio | PCs a medida en Madrid",
    description: siteConfig.description,
    images: [
      {
        url: `${siteConfig.domain}/og.png`,
        width: 1200,
        height: 630,
        alt: "PC LAB · Estudio de PC a medida en Madrid",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PC LAB·Estudio | PCs a medida en Madrid",
    description: siteConfig.description,
    images: [`${siteConfig.domain}/og.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-ES" suppressHydrationWarning className={`${inter.variable} ${jetbrainsMono.variable} ${bebasNeue.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <ScrollProgress />
        <Navbar />
        <main id="main" className="flex-1">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
      </body>
    </html>
  );
}