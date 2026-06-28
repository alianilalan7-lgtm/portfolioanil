import { SITE_URL } from "@/lib/seo";
import { projects } from "@/data/projects";
import { caseStudies } from "@/data/case-studies";
import { getPublishedBlogPosts, localizeBlogPost } from "@/data/blog-index";

/**
 * /llms.txt — a clean, link-rich site map for AI answer engines
 * (ChatGPT, Perplexity, Claude, etc.) following the llmstxt.org convention.
 * Generated from live site data so it stays current as content is added.
 */
export const dynamic = "force-static";

export function GET(): Response {
  const lines: string[] = [];

  lines.push("# Ali Anil Alan – Freelance AI & SaaS Developer");
  lines.push("");
  lines.push(
    "> Ali Anil Alan is a Turkey-based freelance developer who builds AI integrations, SaaS MVPs, and full-stack web applications for startups and businesses worldwide."
  );
  lines.push("");
  lines.push(
    "He delivers end-to-end: from architecture to deployment. His background in retail operations means he builds for how a business actually runs, not just how it looks in a demo. Services, projects, case studies, and a bilingual (English/Turkish) blog are published on the site."
  );
  lines.push("");

  lines.push("## Core Pages");
  lines.push(`- [Home](${SITE_URL}): freelance AI & SaaS developer overview.`);
  lines.push(
    `- [Services](${SITE_URL}/services): AI integration, SaaS MVP, and full-stack development offerings.`
  );
  lines.push(
    `- [Process](${SITE_URL}/process): workflow from idea to launch.`
  );
  lines.push(
    `- [Process & Pricing](${SITE_URL}/process-pricing): how projects are scoped, priced, and delivered.`
  );
  lines.push(
    `- [Contact](${SITE_URL}/contact): start a project or book a free discovery call.`
  );
  lines.push(
    `- [FAQ](${SITE_URL}/faq): timeline, cost, MVP scope, freelancer vs agency.`
  );
  lines.push(
    `- [Certificates](${SITE_URL}/certificates): professional certifications and credentials.`
  );
  lines.push("");

  lines.push("## Projects");
  for (const project of projects) {
    lines.push(
      `- [${project.title}](${SITE_URL}/projects/${project.slug}): ${project.category} project.`
    );
  }
  lines.push("");

  lines.push("## Case Studies");
  for (const study of caseStudies) {
    const project = projects.find((p) => p.slug === study.projectSlug);
    const name = project ? project.title : study.slug;
    lines.push(
      `- [${name} case study](${SITE_URL}/case-studies/${study.slug}): ${study.summaryEn}`
    );
  }
  lines.push("");

  lines.push("## Blog");
  lines.push(
    `- [Blog](${SITE_URL}/blog): articles on AI, SaaS, MVP, and freelance development.`
  );
  const publishedPosts = getPublishedBlogPosts().sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
  for (const post of publishedPosts) {
    const en = localizeBlogPost(post, "en");
    lines.push(
      `- [${en.title}](${SITE_URL}/blog/${post.slug}): ${en.excerpt}`
    );
  }
  lines.push("");

  lines.push("## Optional");
  lines.push(`- [Turkish site](${SITE_URL}/tr): Turkish version of the site.`);
  lines.push(`- [Sitemap](${SITE_URL}/sitemap.xml): full XML sitemap.`);
  lines.push("");

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
