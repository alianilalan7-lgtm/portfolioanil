import { notFound } from "next/navigation";
import { findPublishedBlogPost, localizeBlogPost } from "@/data/blog-index";
import { ogCard, OG_SIZE } from "@/lib/og-image";

// Per-post OG card: title + category + date + read time, in the site's
// Brutalist Terminal language. LinkedIn/Twitter/WhatsApp link previews pick
// this up automatically for every blog post, in both locales.

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Ali Anıl Alan — Blog";

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = findPublishedBlogPost(slug);
  if (!post) notFound();

  const localizedPost = localizeBlogPost(post, locale);
  return ogCard({
    badge: post.category,
    eyebrow: `BLOG — ${post.publishedAt.replaceAll("-", ".")}`,
    title: localizedPost.title,
    footerPath: "/blog",
    footerRight: post.readTime,
  });
}
