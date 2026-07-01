import { ogCard, OG_SIZE } from "@/lib/og-image";

// Site-wide OG card (Brutalist Terminal). Blog posts get their own per-post
// card from src/app/[locale]/blog/[slug]/opengraph-image.tsx.

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Ali Anıl Alan — Freelance AI & SaaS Developer";

export default function OpenGraphImage() {
  return ogCard({
    badge: "Portfolio",
    eyebrow: "ALIANIL.COM",
    title: "AI-Powered SaaS, Dashboards and Automation Systems",
    subtitle:
      "MVP delivery for startups and businesses with production-ready quality.",
    footerRight: "Next.js • SaaS • AI",
  });
}
