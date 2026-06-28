import type { Metadata } from "next";
import { useLocale, useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { blogPosts, getLocalizedBlogPost } from "@/data/blogs";
import { Link } from "@/i18n/navigation";
import SectionHeader from "@/components/fx/SectionHeader";
import Reveal from "@/components/fx/Reveal";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Seo" });
  return buildMetadata({
    locale,
    path: "/blog",
    title: t("blogTitle"),
    description: t("blogDescription"),
  });
}

export default function BlogPage() {
  const t = useTranslations("BlogPage");
  const locale = useLocale();
  const publishedPosts = blogPosts
    .filter((post) => post.status === "published")
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
    .map((post) => getLocalizedBlogPost(post, locale));
  const featuredPosts = publishedPosts.filter((post) => post.featured);

  return (
    <div className="pt-28 pb-24 md:pt-32">
      {/* Header */}
      <header className="max-w-7xl mx-auto px-6">
        <p className="eyebrow mb-6">// BLOG</p>
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
          <h1 className="font-display uppercase font-bold text-paper leading-[1.04] tracking-tight text-[2.25rem] sm:text-[3rem] md:text-[3.75rem]">
            {t("title")}
          </h1>
          <span className="font-mono text-xs uppercase tracking-[0.18em] text-faint">
            <span className="text-lime">{String(publishedPosts.length).padStart(2, "0")}</span> // POSTS
          </span>
        </div>
        <p className="text-muted text-base md:text-lg max-w-3xl leading-relaxed mt-6">
          {t("description")}
        </p>
      </header>

      {/* Featured posts — larger cards */}
      {featuredPosts.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 mt-20 md:mt-24">
          <SectionHeader
            index="01"
            label={t("featured").toUpperCase()}
            meta={String(featuredPosts.length).padStart(2, "0")}
          />
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredPosts.map((post, i) => (
              <Reveal key={post.slug} delay={i * 0.08} y={20}>
                <Link
                  href={`/blog/${post.slug}`}
                  aria-label={post.title}
                  className="group term-card flex h-full flex-col p-7 md:p-8"
                >
                  <div className="flex items-center justify-between gap-3 font-mono text-xs">
                    <span className="text-lime">
                      [{String(i + 1).padStart(2, "0")}]
                    </span>
                    <span className="text-faint">
                      {post.publishedAt} · {post.readTime}
                    </span>
                  </div>

                  <span className="tag-term mt-5 self-start">{post.category}</span>

                  <h2 className="mt-5 font-display text-2xl md:text-[1.75rem] font-bold uppercase leading-tight tracking-tight text-paper transition-colors duration-200 group-hover:text-lime">
                    {post.title}
                  </h2>
                  <p className="mt-3 text-sm md:text-base leading-relaxed text-muted line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="mt-auto pt-7">
                    <div className="flex flex-wrap gap-2">
                      {post.tags.slice(0, 4).map((tag) => (
                        <span key={tag} className="tag-term">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="mt-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.08em] text-paper transition-colors duration-200 group-hover:text-lime">
                      <span className="text-lime">&gt;</span> {t("readMore")}
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* All posts grid */}
      <section className="max-w-7xl mx-auto px-6 mt-20 md:mt-24">
        <SectionHeader
          index="02"
          label={t("allPosts").toUpperCase()}
          meta={String(publishedPosts.length).padStart(2, "0")}
        />

        {publishedPosts.length > 0 ? (
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {publishedPosts.map((post, i) => (
              <Reveal key={post.slug} delay={(i % 3) * 0.06} y={20}>
                <Link
                  href={`/blog/${post.slug}`}
                  aria-label={post.title}
                  className="group term-card flex h-full flex-col p-6"
                >
                  <div className="flex items-center justify-between gap-3 font-mono text-xs">
                    <span className="tag-term">{post.category}</span>
                    <span className="text-faint">{post.readTime}</span>
                  </div>

                  <h2 className="mt-4 font-display text-lg font-bold uppercase leading-tight tracking-tight text-paper transition-colors duration-200 group-hover:text-lime">
                    {post.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="mt-auto flex items-center justify-between gap-3 pt-6 font-mono text-xs">
                    <span className="text-faint">{post.publishedAt}</span>
                    <span className="inline-flex items-center gap-1 uppercase tracking-[0.08em] text-paper transition-colors duration-200 group-hover:text-lime">
                      <span className="text-lime">&gt;</span> {t("readMore")}
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="mt-10 border border-line bg-surface px-6 py-16 text-center md:py-20">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-lime mb-5">
              // NO_POSTS
            </p>
            <p className="font-display text-2xl md:text-3xl font-bold uppercase tracking-tight text-paper mb-3">
              {t("emptyTitle")}
            </p>
            <p className="font-mono text-sm text-muted max-w-xl mx-auto leading-relaxed mb-8">
              {t("emptyDescription")}
            </p>
            <Link href="/contact" className="btn-term btn-term--solid">
              &gt; {t("emptyCta")}
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
