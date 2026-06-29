import type { MetadataRoute } from "next";
import { getPublishedBlogPosts } from "@/data/blog-index";
import { caseStudies } from "@/data/case-studies";
import { projects } from "@/data/projects";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://alianil.com";

type Entry = MetadataRoute.Sitemap[number];

/**
 * One entry per logical page, with hreflang alternates for the en/tr versions
 * (and x-default → en). This both de-duplicates the old EN+TR double listing
 * and tells Google the two language URLs are alternates, not duplicate content
 * — which is exactly what the indexing report needs.
 */
function entry(
  path: string,
  opts: {
    lastModified?: Date;
    changeFrequency?: Entry["changeFrequency"];
    priority?: number;
  } = {}
): Entry {
  const en = `${siteUrl}${path}`;
  const tr = `${siteUrl}/tr${path}`;
  return {
    url: en,
    lastModified: opts.lastModified ?? new Date(),
    changeFrequency: opts.changeFrequency ?? "weekly",
    priority: opts.priority ?? 0.8,
    alternates: { languages: { en, tr, "x-default": en } },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const publishedPosts = getPublishedBlogPosts();
  const lastBlogDate =
    publishedPosts.length > 0
      ? new Date(
          Math.max(
            ...publishedPosts.map((p) => new Date(p.publishedAt).getTime())
          )
        )
      : now;

  return [
    entry("", { lastModified: now, changeFrequency: "weekly", priority: 1 }),
    entry("/services", { lastModified: now, priority: 0.8 }),
    entry("/process", { lastModified: now, priority: 0.8 }),
    entry("/process-pricing", { lastModified: now, priority: 0.8 }),
    entry("/case-studies", { lastModified: now, priority: 0.8 }),
    entry("/faq", { lastModified: now, priority: 0.8 }),
    entry("/projects", { lastModified: now, priority: 0.8 }),
    entry("/contact", { lastModified: now, priority: 0.8 }),
    entry("/certificates", { lastModified: now, priority: 0.8 }),
    entry("/blog", {
      lastModified: lastBlogDate,
      changeFrequency: "weekly",
      priority: 0.75,
    }),
    ...projects.map((p) =>
      entry(`/projects/${p.slug}`, {
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.7,
      })
    ),
    ...caseStudies.map((s) =>
      entry(`/case-studies/${s.slug}`, {
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.72,
      })
    ),
    ...publishedPosts.map((p) =>
      entry(`/blog/${p.slug}`, {
        lastModified: new Date(p.publishedAt),
        changeFrequency: "monthly",
        priority: 0.7,
      })
    ),
  ];
}
