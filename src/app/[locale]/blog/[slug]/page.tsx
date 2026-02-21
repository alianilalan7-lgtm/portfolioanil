import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { blogPosts, BlogContentBlock } from "@/data/blogs";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

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

  return <BlogDetailContent locale={locale} post={post} />;
}

function BlogDetailContent({
  locale,
  post,
}: {
  locale: string;
  post: (typeof blogPosts)[number];
}) {
  const isTr = locale === "tr";

  return (
    <div className="pt-28 pb-20 px-6">
      <article className="max-w-4xl mx-auto">
        <nav className="flex items-center gap-2 text-sm text-sage/40 mb-8">
          <Link href="/blog" className="hover:text-primary transition-colors">
            {isTr ? "Bloga Don" : "Back to Blog"}
          </Link>
          <span className="material-icons text-xs">chevron_right</span>
          <span className="text-sage/70 truncate">{post.title}</span>
        </nav>

        <header className="mb-10">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="px-2.5 py-1 rounded-md bg-primary/10 border border-primary/20 text-primary text-xs font-medium">
              {post.category}
            </span>
            <span className="text-sage/35 text-xs">{post.publishedAt}</span>
            <span className="text-sage/30 text-xs">•</span>
            <span className="text-sage/35 text-xs">{post.readTime}</span>
          </div>

          <h1 className="font-heading text-3xl md:text-5xl font-bold text-sage mb-4">
            {post.title}
          </h1>
          <p className="text-sage/55 text-lg leading-relaxed">{post.excerpt}</p>

          <div className="flex flex-wrap gap-2 mt-6">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 text-xs rounded-md bg-forest-lighter text-sage/55 border border-glass-border"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        <div className="glass-card p-6 md:p-8 space-y-5">
          {post.content && post.content.length > 0 ? (
            post.content.map((block, index) => (
              <ContentBlockRenderer key={`${post.slug}-${index}`} block={block} />
            ))
          ) : (
            <p className="text-sage/60 leading-relaxed">{post.excerpt}</p>
          )}
        </div>

        <section className="glass-card mt-8 p-6 md:p-8">
          <h2 className="font-heading text-2xl font-semibold text-sage mb-3">
            {isTr ? "Benzer bir SaaS projesi mi planliyorsun?" : "Planning a similar SaaS product?"}
          </h2>
          <p className="text-sage/55 leading-relaxed mb-5">
            {isTr
              ? "Kapsam, MVP siralamasi ve teslim takvimi icin birlikte net bir yol haritasi cikarabiliriz."
              : "We can define scope, MVP milestones, and a realistic delivery timeline together."}
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-forest font-semibold rounded-xl hover:bg-primary-light transition-colors"
          >
            {isTr ? "Iletisime Gec" : "Contact"}
            <span className="material-icons text-sm">arrow_forward</span>
          </Link>
        </section>
      </article>
    </div>
  );
}

function ContentBlockRenderer({ block }: { block: BlogContentBlock }) {
  if (block.type === "heading") {
    return <h2 className="font-heading text-2xl md:text-3xl font-bold text-sage mt-2">{block.text}</h2>;
  }

  if (block.type === "subheading") {
    return <h3 className="font-heading text-xl md:text-2xl font-semibold text-sage/90 mt-1">{block.text}</h3>;
  }

  if (block.type === "paragraph") {
    return <p className="text-sage/60 leading-relaxed">{block.text}</p>;
  }

  if (block.type === "list") {
    return (
      <ul className="space-y-2 pl-5 list-disc marker:text-primary text-sage/60">
        {block.items.map((item) => (
          <li key={item} className="leading-relaxed">
            {item}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {block.items.map((item) => (
        <div key={`${item.label}-${item.value}`} className="rounded-xl bg-forest-lighter border border-glass-border p-4">
          <p className="text-sage/40 text-xs uppercase tracking-wider mb-1">{item.label}</p>
          <p className="text-primary font-heading text-lg font-semibold">{item.value}</p>
        </div>
      ))}
    </div>
  );
}
