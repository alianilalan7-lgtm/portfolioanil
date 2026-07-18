import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import type { BlogContentBlock, BlogPost } from "@/data/blogs";
import {
  allBlogPosts,
  findPublishedBlogPost,
  localizeBlogPost,
  blogPostSource,
  blogPostRelatedLinks,
} from "@/data/blog-index";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import Reveal from "@/components/fx/Reveal";
import JsonLd from "@/components/JsonLd";
import {
  buildMetadata,
  blogPostingJsonLd,
  breadcrumbJsonLd,
  localizedUrl,
} from "@/lib/seo";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    allBlogPosts.map((post) => ({ locale, slug: post.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = findPublishedBlogPost(slug);
  if (!post) return {};

  const localizedPost = localizeBlogPost(post, locale);
  return buildMetadata({
    locale,
    path: `/blog/${post.slug}`,
    title: `${localizedPost.title} | Ali Anil Alan`,
    description: localizedPost.excerpt,
    image: localizedUrl(locale, `/blog/${post.slug}/opengraph-image`),
    type: "article",
    publishedTime: post.publishedAt,
    keywords: localizedPost.tags,
  });
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const post = findPublishedBlogPost(slug);
  if (!post) return notFound();

  const localizedPost = localizeBlogPost(post, locale);
  const source = blogPostSource(slug);
  const relatedLinks = blogPostRelatedLinks(slug);
  const isTr = locale === "tr";

  const articleSchema = blogPostingJsonLd({
    locale,
    path: `/blog/${post.slug}`,
    title: localizedPost.title,
    description: localizedPost.excerpt,
    datePublished: post.publishedAt,
    keywords: localizedPost.tags,
  });

  const breadcrumb = breadcrumbJsonLd(locale, [
    { name: isTr ? "Ana Sayfa" : "Home", path: "" },
    { name: "Blog", path: "/blog" },
    { name: localizedPost.title, path: `/blog/${post.slug}` },
  ]);

  return (
    <>
      <JsonLd data={[articleSchema, breadcrumb]} />
      <BlogDetailContent
        locale={locale}
        post={localizedPost}
        source={source}
        relatedLinks={relatedLinks}
      />
    </>
  );
}

function BlogDetailContent({
  locale,
  post,
  source,
  relatedLinks,
}: {
  locale: string;
  post: BlogPost;
  source?: { name: string; url: string };
  relatedLinks?: { label: string; href: string }[];
}) {
  const isTr = locale === "tr";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://alianil.com";
  const localizedPrefix = isTr ? "/tr" : "";
  const shareUrl = `${siteUrl}${localizedPrefix}/blog/${post.slug}`;
  const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    shareUrl
  )}`;

  return (
    <div className="pt-28 pb-24 md:pt-32">
      <article className="max-w-3xl mx-auto px-6">
        {/* Breadcrumb — terminal path */}
        <nav className="mb-10 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs uppercase tracking-[0.12em]">
          <Link
            href="/blog"
            className="text-faint transition-colors duration-200 hover:text-lime"
          >
            &lt; {isTr ? "BLOGA DÖN" : "BACK TO BLOG"}
          </Link>
          <span className="text-line-strong">·</span>
          <span className="text-faint">
            ~/blog/
            <span className="normal-case text-muted">{post.slug}</span>
          </span>
        </nav>

        {/* Header — hero panel (engineering grid + lime eyebrow) */}
        <Reveal
          as="header"
          className="relative mb-14 overflow-hidden border border-line bg-ink"
          y={16}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "linear-gradient(#242424 1px, transparent 1px), linear-gradient(90deg, #242424 1px, transparent 1px)",
              backgroundSize: "56px 56px",
            }}
          />
          <div className="relative p-6 sm:p-8 md:p-10">
            <p className="font-mono text-xs uppercase tracking-[0.2em]">
              <span className="text-lime">// {post.category}</span>{" "}
              <span className="text-faint">
                — {post.publishedAt} — {post.readTime}
              </span>
            </p>

            <h1 className="mt-5 font-display uppercase font-bold text-paper leading-[1.06] tracking-tight text-[1.75rem] sm:text-[2.5rem] md:text-[3rem]">
              {post.title}
            </h1>

            <div className="mt-6 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="tag-term">
                  {tag}
                </span>
              ))}
            </div>

            <p className="mt-6 max-w-2xl text-muted text-lg leading-relaxed">
              {post.excerpt}
            </p>

            <div className="mt-7 border-t border-line pt-6">
              <a
                href={linkedInShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.08em] text-paper transition-colors duration-200 hover:text-lime"
              >
                <span className="text-lime">&gt;</span>
                {isTr ? "LINKEDIN'DE PAYLAŞ" : "SHARE ON LINKEDIN"}
              </a>
            </div>
          </div>
        </Reveal>

        {/* Content */}
        <div className="space-y-6">
          {post.content && post.content.length > 0 ? (
            post.content.map((block, index) => (
              <ContentBlockRenderer key={`${post.slug}-${index}`} block={block} />
            ))
          ) : (
            <p className="text-paper/80 leading-relaxed">{post.excerpt}</p>
          )}
        </div>

        {/* Related internal links (SEO + conversion routing) */}
        {relatedLinks && relatedLinks.length > 0 && (
          <nav className="mt-14 border-t border-line pt-6">
            <p className="eyebrow mb-3">// {isTr ? "İLGİLİ" : "RELATED"}</p>
            <ul className="flex flex-col gap-2">
              {relatedLinks.map((l) => {
                const isExternal = /^https?:\/\//.test(l.href);
                const className =
                  "font-mono text-sm text-muted transition-colors hover:text-lime";
                return (
                  <li key={`${l.href}-${l.label}`}>
                    {isExternal ? (
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={className}
                      >
                        <span className="text-lime">&gt;</span> {l.label} ↗
                      </a>
                    ) : (
                      <Link href={l.href} className={className}>
                        <span className="text-lime">&gt;</span> {l.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
        )}

        {/* Source attribution (auto-generated posts) */}
        {source && (
          <p className="mt-12 border-t border-line pt-6 font-mono text-xs text-faint">
            {isTr ? "Kaynak" : "Source"}:{" "}
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="text-muted underline-offset-2 transition-colors hover:text-lime hover:underline"
            >
              {source.name}
            </a>
          </p>
        )}

        {/* CTA */}
        <Reveal
          as="section"
          className="mt-16 border border-line bg-surface p-7 md:p-9"
          y={16}
        >
          <p className="eyebrow mb-4">
            // {isTr ? "BİRLİKTE ÇALIŞALIM" : "LET'S WORK"}
          </p>
          <h2 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-tight text-paper mb-4">
            {isTr
              ? "Benzer bir SaaS projesi mi planlıyorsun?"
              : "Planning a similar SaaS product?"}
          </h2>
          <p className="text-muted leading-relaxed max-w-2xl mb-7">
            {isTr
              ? "Kapsam, MVP sıralaması ve teslim takvimi için birlikte net bir yol haritası çıkarabiliriz."
              : "We can define scope, MVP milestones, and a realistic delivery timeline together."}
          </p>
          <Link href="/contact" className="btn-term btn-term--solid">
            &gt; {isTr ? "İLETİŞİME GEÇ" : "CONTACT"}
          </Link>
        </Reveal>
      </article>
    </div>
  );
}

function ContentBlockRenderer({ block }: { block: BlogContentBlock }) {
  if (block.type === "heading") {
    return (
      <h2 className="mt-12 flex items-baseline gap-3 font-display text-2xl md:text-[1.75rem] font-bold uppercase tracking-tight text-paper">
        <span className="font-mono text-base text-lime">##</span>
        <span>{block.text}</span>
      </h2>
    );
  }

  if (block.type === "subheading") {
    return (
      <h3 className="mt-8 flex items-baseline gap-2.5 font-display text-xl font-semibold tracking-tight text-paper">
        <span className="font-mono text-sm text-lime">&gt;</span>
        <span>{block.text}</span>
      </h3>
    );
  }

  if (block.type === "paragraph") {
    return (
      <p className="text-paper/80 leading-relaxed md:text-[1.0625rem]">
        {block.text}
      </p>
    );
  }

  if (block.type === "list") {
    return (
      <ul className="space-y-2.5">
        {block.items.map((item) => (
          <li
            key={item}
            className="flex gap-3 text-paper/80 leading-relaxed"
          >
            <span className="select-none font-mono text-lime" aria-hidden>
              ▸
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );
  }

  // stats
  return (
    <div
      className={`grid gap-px border border-line bg-line ${
        block.items.length === 1 ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2"
      }`}
    >
      {block.items.map((item) => (
        <div key={`${item.label}-${item.value}`} className="bg-surface p-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint mb-2">
            {item.label}
          </p>
          <p className="font-display text-xl md:text-2xl font-bold text-lime">
            {item.value}
          </p>
        </div>
      ))}
    </div>
  );
}
