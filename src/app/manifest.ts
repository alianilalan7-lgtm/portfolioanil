import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Ali Anil Alan — Freelance AI & SaaS Developer",
    short_name: "Ali Anil Alan",
    description:
      "Freelance AI & SaaS developer building MVPs, dashboards, and automation systems with production-ready quality.",
    start_url: "/",
    display: "standalone",
    background_color: "#0A0A0A",
    theme_color: "#0A0A0A",
    categories: ["business", "productivity", "developer"],
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
