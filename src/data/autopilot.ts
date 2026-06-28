import type { BlogPost, BlogContentBlock } from "./blogs";
import rawPosts from "./autopilot-posts.json";

// Auto-generated blog posts (the "autopilot" pipeline writes these). Kept in a
// separate JSON file so the generator never has to edit the large blogs.ts.
// The base BlogPost fields are Turkish; `en` holds the English variant.

interface AutopilotLang {
  title: string;
  excerpt: string;
  content: BlogContentBlock[];
}

export interface AutopilotPost {
  slug: string;
  /** ISO date, e.g. "2026-06-30". */
  publishedAt: string;
  readTime: string;
  category: string;
  tags: string[];
  status?: "published" | "draft";
  /** Original source the post commentary is based on (attribution). */
  source?: { name: string; url: string };
  /** Internal links for SEO + conversion routing (paths only, e.g. "/services"). */
  relatedLinks?: { label: string; href: string }[];
  tr: AutopilotLang;
  en: AutopilotLang;
}

const posts = rawPosts as unknown as AutopilotPost[];
const bySlug = new Map(posts.map((p) => [p.slug, p]));

export function isAutopilotSlug(slug: string): boolean {
  return bySlug.has(slug);
}

export function getAutopilotSource(
  slug: string
): { name: string; url: string } | undefined {
  return bySlug.get(slug)?.source;
}

export function getAutopilotRelatedLinks(
  slug: string
): { label: string; href: string }[] {
  return bySlug.get(slug)?.relatedLinks ?? [];
}

function toBasePost(p: AutopilotPost): BlogPost {
  return {
    slug: p.slug,
    title: p.tr.title,
    excerpt: p.tr.excerpt,
    publishedAt: p.publishedAt,
    readTime: p.readTime,
    category: p.category,
    tags: p.tags,
    featured: false,
    status: p.status ?? "published",
    content: p.tr.content,
  };
}

export const autopilotPosts: BlogPost[] = posts.map(toBasePost);

export function localizeAutopilotPost(post: BlogPost, locale: string): BlogPost {
  if (locale !== "en") return post; // base fields are already Turkish
  const p = bySlug.get(post.slug);
  if (!p) return post;
  return {
    ...post,
    title: p.en.title,
    excerpt: p.en.excerpt,
    content: p.en.content,
  };
}
