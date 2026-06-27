import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { blogPosts, BlogContentBlock, getLocalizedBlogPost } from "@/data/blogs";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import Reveal from "@/components/fx/Reveal";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    blogPosts.map((post) => ({ locale, slug: post.slug }))
  );
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const post = blogPosts.find((item) => item.slug === slug && item.status === "published");
  if (!post) return notFound();

  const localizedPost = getLocalizedBlogPost(post, locale);

  return <BlogDetailContent locale={locale} post={localizedPost} />;
}

function BlogDetailContent({
  locale,
  post,
}: {
  locale: string;
  post: (typeof blogPosts)[number];
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

        {/* Header */}
        <Reveal as="header" className="mb-14" y={16}>
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
            <span className="tag-term">{post.category}</span>
            <span className="text-faint">{post.publishedAt}</span>
            <span className="text-line-strong">·</span>
            <span className="text-faint">{post.readTime}</span>
          </div>

          <h1 className="mt-6 font-display uppercase font-bold text-paper leading-[1.06] tracking-tight text-[2rem] sm:text-[2.75rem] md:text-[3.25rem]">
            {post.title}
          </h1>
          <p className="mt-6 text-muted text-lg leading-relaxed">{post.excerpt}</p>

          <div className="mt-7 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="tag-term">
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-8 border-t border-line pt-7">
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
