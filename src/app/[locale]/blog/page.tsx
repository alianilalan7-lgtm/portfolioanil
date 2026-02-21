import { useTranslations } from "next-intl";
import { blogPosts } from "@/data/blogs";
import { Link } from "@/i18n/navigation";

export default function BlogPage() {
  const t = useTranslations("BlogPage");
  const publishedPosts = blogPosts
    .filter((post) => post.status === "published")
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  const featuredPosts = publishedPosts.filter((post) => post.featured);

  return (
    <div className="pt-28 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-sage">
              {t("title")}
            </h1>
            <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
              {publishedPosts.length}
            </span>
          </div>
          <p className="text-sage/50 text-lg max-w-3xl">{t("description")}</p>
        </header>

        {featuredPosts.length > 0 && (
          <section className="mb-12">
            <h2 className="font-heading text-2xl font-semibold text-sage mb-6">
              {t("featured")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredPosts.map((post) => (
                <article key={post.slug} className="glass-card p-6">
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <span className="px-2.5 py-1 rounded-md bg-primary/10 border border-primary/20 text-primary text-xs font-medium">
                      {post.category}
                    </span>
                    <span className="text-sage/40 text-xs">
                      {post.publishedAt} · {post.readTime}
                    </span>
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-sage mb-2">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="hover:text-primary transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-sage/50 text-sm leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs rounded-md bg-forest-lighter text-sage/60 border border-glass-border"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-5 pt-4 border-t border-glass-border/70">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1 text-primary text-sm font-medium hover:gap-2 transition-all"
                    >
                      {t("readMore")}
                      <span className="material-icons text-sm">arrow_forward</span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        <section>
          <h2 className="font-heading text-2xl font-semibold text-sage mb-6">
            {t("allPosts")}
          </h2>

          {publishedPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {publishedPosts.map((post) => (
                <article key={post.slug} className="glass-card glass-card-hover p-6">
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <span className="text-primary text-xs font-medium">{post.category}</span>
                    <span className="text-sage/40 text-xs">{post.readTime}</span>
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-sage mb-2">
                    {post.title}
                  </h3>
                  <p className="text-sage/50 text-sm leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sage/35 text-xs">{post.publishedAt}</span>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1 text-primary text-sm font-medium hover:gap-2 transition-all"
                    >
                      {t("readMore")}
                      <span className="material-icons text-sm">arrow_forward</span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="glass-card p-10 text-center">
              <span className="material-icons text-5xl text-sage/25 mb-4">article</span>
              <p className="text-sage/50 text-lg mb-2">{t("emptyTitle")}</p>
              <p className="text-sage/35 text-sm max-w-xl mx-auto mb-6">
                {t("emptyDescription")}
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-forest font-semibold rounded-xl hover:bg-primary-light transition-colors"
              >
                {t("emptyCta")}
                <span className="material-icons text-sm">arrow_forward</span>
              </Link>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
