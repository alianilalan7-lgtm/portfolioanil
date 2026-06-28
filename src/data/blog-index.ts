import { blogPosts, getLocalizedBlogPost, type BlogPost } from "./blogs";
import {
  autopilotPosts,
  isAutopilotSlug,
  localizeAutopilotPost,
  getAutopilotSource,
  getAutopilotRelatedLinks,
} from "./autopilot";

// Unified accessor over hand-written (blogs.ts) and auto-generated (autopilot)
// posts. All blog consumers should import from here so autopilot content shows
// up everywhere without touching blogs.ts. Autopilot posts come first; consumers
// that care about order re-sort by publishedAt.
export const allBlogPosts: BlogPost[] = [...autopilotPosts, ...blogPosts];

export function getPublishedBlogPosts(): BlogPost[] {
  return allBlogPosts.filter((post) => post.status === "published");
}

export function findPublishedBlogPost(slug: string): BlogPost | undefined {
  return allBlogPosts.find(
    (post) => post.slug === slug && post.status === "published"
  );
}

export function localizeBlogPost(post: BlogPost, locale: string): BlogPost {
  return isAutopilotSlug(post.slug)
    ? localizeAutopilotPost(post, locale)
    : getLocalizedBlogPost(post, locale);
}

/** Source attribution for an autopilot post, if any (undefined for hand-written posts). */
export function blogPostSource(slug: string) {
  return getAutopilotSource(slug);
}

/** Internal related links for an autopilot post (empty for hand-written posts). */
export function blogPostRelatedLinks(slug: string) {
  return getAutopilotRelatedLinks(slug);
}
