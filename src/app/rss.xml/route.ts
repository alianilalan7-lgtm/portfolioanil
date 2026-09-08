import { getPublishedBlogPosts, localizeBlogPost } from "@/data/blog-index";
import { SITE_URL, SITE_NAME, localizedUrl, languageCode } from "@/lib/seo";
import { routing } from "@/i18n/routing";

export const dynamic = "force-static";

/** Escape the five XML predefined entities for safe inclusion in feed text. */
function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/** RFC-822 date (e.g. "Sat, 21 Feb 2026 00:00:00 GMT") required by RSS pubDate. */
function rfc822(dateIso: string): string {
  return new Date(dateIso).toUTCString();
}

export function GET() {
  const locale = routing.defaultLocale; // canonical (unprefixed) URLs
  const feedUrl = `${SITE_URL}/rss.xml`;

  const posts = getPublishedBlogPosts()
    .slice()
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));

  const lastBuild = posts[0] ? rfc822(posts[0].publishedAt) : new Date().toUTCString();

  const items = posts
    .map((post) => {
      const localized = localizeBlogPost(post, locale);
      const url = localizedUrl(locale, `/blog/${post.slug}`);
      return [
        "    <item>",
        `      <title>${escapeXml(localized.title)}</title>`,
        `      <link>${url}</link>`,
        `      <guid isPermaLink="true">${url}</guid>`,
        `      <pubDate>${rfc822(post.publishedAt)}</pubDate>`,
        localized.category ? `      <category>${escapeXml(localized.category)}</category>` : "",
        `      <description>${escapeXml(localized.excerpt)}</description>`,
        "    </item>",
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n");

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    "  <channel>",
    `    <title>${escapeXml(SITE_NAME)} — Blog</title>`,
    `    <link>${localizedUrl(locale, "/blog")}</link>`,
    `    <description>${escapeXml(
      "SaaS, MVP, AI otomasyonu ve web uygulaması geliştirme üzerine yazılar.",
    )}</description>`,
    `    <language>${languageCode(locale)}</language>`,
    `    <lastBuildDate>${lastBuild}</lastBuildDate>`,
    `    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />`,
    items,
    "  </channel>",
    "</rss>",
    "",
  ].join("\n");

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
