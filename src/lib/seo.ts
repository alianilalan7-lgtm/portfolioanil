import type { Metadata } from "next";
import { routing } from "@/i18n/routing";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://alianil.com";

export const SITE_NAME = "Ali Anil Alan";
export const PERSON_ID = `${SITE_URL}#person`;

/** Locale -> OpenGraph locale tag. */
function ogLocale(locale: string): string {
  return locale === "tr" ? "tr_TR" : "en_US";
}

/** Locale -> BCP-47 language tag. */
export function languageCode(locale: string): string {
  return locale === "tr" ? "tr-TR" : "en-US";
}

/**
 * Absolute URL for a path in a given locale.
 * `path` must start with "/" or be "" for the home page (no trailing slash).
 * The default locale ("en") has no prefix; "tr" is prefixed with "/tr".
 */
export function localizedUrl(locale: string, path: string): string {
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  return `${SITE_URL}${prefix}${path}`;
}

interface BuildMetadataInput {
  locale: string;
  /** Path without locale prefix, e.g. "/services" or "" for home. */
  path: string;
  title: string;
  description: string;
  /** Absolute or root-relative OG image. Defaults to the site OG image. */
  image?: string;
  type?: "website" | "article" | "profile";
  /** Publication date (ISO) for article-type pages. */
  publishedTime?: string;
  /** Override keywords for the page. */
  keywords?: string[];
}

/**
 * Builds per-page metadata with a correct self-referencing canonical and
 * en/tr/x-default hreflang alternates. Every page must call this so it does
 * not inherit the layout's canonical (which would point everything at home).
 */
export function buildMetadata({
  locale,
  path,
  title,
  description,
  image = "/opengraph-image",
  type = "website",
  publishedTime,
  keywords,
}: BuildMetadataInput): Metadata {
  const canonical = localizedUrl(locale, path);
  const enUrl = localizedUrl("en", path);
  const trUrl = localizedUrl("tr", path);
  const absoluteImage = image.startsWith("http") ? image : `${SITE_URL}${image}`;

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    keywords,
    alternates: {
      canonical,
      languages: {
        en: enUrl,
        tr: trUrl,
        "x-default": enUrl,
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      type,
      locale: ogLocale(locale),
      ...(publishedTime ? { publishedTime } : {}),
      images: [
        {
          url: absoluteImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteImage],
    },
  };
}

type JsonLdObject = Record<string, unknown>;

/** BreadcrumbList structured data for a chain of {name, path} crumbs. */
export function breadcrumbJsonLd(
  locale: string,
  crumbs: { name: string; path: string }[]
): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: localizedUrl(locale, crumb.path),
    })),
  };
}

interface BlogPostingInput {
  locale: string;
  path: string;
  title: string;
  description: string;
  datePublished: string;
  image?: string;
  keywords?: string[];
}

/** BlogPosting structured data authored by the site owner. */
export function blogPostingJsonLd({
  locale,
  path,
  title,
  description,
  datePublished,
  image = "/opengraph-image",
  keywords,
}: BlogPostingInput): JsonLdObject {
  const url = localizedUrl(locale, path);
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: title,
    description,
    datePublished,
    dateModified: datePublished,
    inLanguage: languageCode(locale),
    image: image.startsWith("http") ? image : `${SITE_URL}${image}`,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    author: { "@type": "Person", "@id": PERSON_ID, name: SITE_NAME },
    publisher: { "@type": "Person", "@id": PERSON_ID, name: SITE_NAME },
    ...(keywords && keywords.length ? { keywords: keywords.join(", ") } : {}),
  };
}

interface CreativeWorkInput {
  locale: string;
  path: string;
  name: string;
  description: string;
  applicationCategory?: string;
  keywords?: string[];
  url?: string;
}

/** CreativeWork / SoftwareApplication structured data for a project. */
export function creativeWorkJsonLd({
  locale,
  path,
  name,
  description,
  keywords,
  url,
}: CreativeWorkInput): JsonLdObject {
  const pageUrl = localizedUrl(locale, path);
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${pageUrl}#work`,
    name,
    description,
    inLanguage: languageCode(locale),
    url: pageUrl,
    ...(url ? { sameAs: url } : {}),
    creator: { "@type": "Person", "@id": PERSON_ID, name: SITE_NAME },
    ...(keywords && keywords.length ? { keywords: keywords.join(", ") } : {}),
  };
}
