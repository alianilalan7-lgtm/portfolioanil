import type { MetadataRoute } from "next";
import { getPublishedBlogPosts } from "@/data/blog-index";
import { caseStudies } from "@/data/case-studies";
import { projects } from "@/data/projects";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://alianil.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticEnPaths = [
    "",
    "/services",
    "/process",
    "/process-pricing",
    "/case-studies",
    "/faq",
    "/blog",
    "/projects",
    "/contact",
    "/certificates",
  ];
  const staticTrPaths = [
    "/tr",
    "/tr/services",
    "/tr/process",
    "/tr/process-pricing",
    "/tr/case-studies",
    "/tr/faq",
    "/tr/blog",
    "/tr/projects",
    "/tr/contact",
    "/tr/certificates",
  ];

  const staticEntries = [...staticEnPaths, ...staticTrPaths].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" || path === "/tr" ? 1 : 0.8,
  }));

  const projectEntries = projects.flatMap((project) => [
    {
      url: `${siteUrl}/projects/${project.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${siteUrl}/tr/projects/${project.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
  ]);

  const publishedPosts = getPublishedBlogPosts();
  const lastBlogDate =
    publishedPosts.length > 0
      ? publishedPosts
          .map((post) => new Date(post.publishedAt).getTime())
          .reduce((max, current) => Math.max(max, current), 0)
      : now.getTime();

  const blogEntries = [
    {
      url: `${siteUrl}/blog`,
      lastModified: new Date(lastBlogDate),
      changeFrequency: "weekly" as const,
      priority: 0.75,
    },
    {
      url: `${siteUrl}/tr/blog`,
      lastModified: new Date(lastBlogDate),
      changeFrequency: "weekly" as const,
      priority: 0.75,
    },
  ];

  const blogPostEntries = publishedPosts.flatMap((post) => [
    {
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${siteUrl}/tr/blog/${post.slug}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
  ]);

  const caseStudyEntries = caseStudies.flatMap((study) => [
    {
      url: `${siteUrl}/case-studies/${study.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.72,
    },
    {
      url: `${siteUrl}/tr/case-studies/${study.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.72,
    },
  ]);

  return [
    ...staticEntries,
    ...projectEntries,
    ...blogEntries,
    ...blogPostEntries,
    ...caseStudyEntries,
  ];
}
