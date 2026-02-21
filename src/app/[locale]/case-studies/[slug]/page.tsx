import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { caseStudies } from "@/data/case-studies";
import { projects } from "@/data/projects";
import { routing } from "@/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    caseStudies.map((item) => ({ locale, slug: item.slug }))
  );
}

export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const isTr = locale === "tr";
  const study = caseStudies.find((item) => item.slug === slug);
  if (!study) return notFound();

  const project = projects.find((p) => p.slug === study.projectSlug);
  if (!project) return notFound();

  const tAll = await getTranslations({ locale });

  return (
    <div className="pt-28 pb-20 px-6">
      <article className="max-w-5xl mx-auto">
        <nav className="flex items-center gap-2 text-sm text-sage/40 mb-8">
          <Link href="/case-studies" className="hover:text-primary transition-colors">
            {isTr ? "Case Study'lere Don" : "Back to Case Studies"}
          </Link>
          <span className="material-icons text-xs">chevron_right</span>
          <span className="text-sage/70 truncate">{project.title}</span>
        </nav>

        <header className="mb-10">
          <h1 className="font-heading text-3xl md:text-5xl font-bold text-sage mb-3">
            {project.title}
          </h1>
          <p className="text-sage/55 text-lg leading-relaxed max-w-4xl">
            {isTr ? study.summaryTr : study.summaryEn}
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section className="glass-card p-6 md:p-8">
              <h2 className="font-heading text-2xl font-semibold text-sage mb-3">
                {isTr ? "Problem" : "Problem"}
              </h2>
              <p className="text-sage/60 leading-relaxed">{tAll(project.problemKey)}</p>
            </section>

            <section className="glass-card p-6 md:p-8">
              <h2 className="font-heading text-2xl font-semibold text-sage mb-3">
                {isTr ? "Cozum" : "Solution"}
              </h2>
              <p className="text-sage/60 leading-relaxed">{tAll(project.solutionKey)}</p>
            </section>

            <section className="glass-card p-6 md:p-8">
              <h2 className="font-heading text-2xl font-semibold text-sage mb-3">
                {isTr ? "Sonuc / Etki" : "Outcome / Impact"}
              </h2>
              <p className="text-sage/60 leading-relaxed">{tAll(project.impactKey)}</p>
            </section>
          </div>

          <aside className="space-y-4">
            <section className="glass-card p-5">
              <p className="text-sage/40 text-xs uppercase tracking-wider mb-1">
                {isTr ? "Sure" : "Duration"}
              </p>
              <p className="text-primary font-heading text-xl font-semibold">
                {isTr ? study.durationTr : study.durationEn}
              </p>
            </section>

            <section className="glass-card p-5">
              <p className="text-sage/40 text-xs uppercase tracking-wider mb-2">
                {isTr ? "Teknoloji" : "Technology"}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 text-xs rounded-md bg-forest-lighter text-sage/60 border border-glass-border"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </section>

            <section className="glass-card p-5">
              <p className="text-sage/40 text-xs uppercase tracking-wider mb-2">
                {isTr ? "Canli Sonuc" : "Live Result"}
              </p>
              <p className="text-sage/60 text-sm leading-relaxed">
                {isTr ? study.outcomeTr : study.outcomeEn}
              </p>
            </section>

            <Link
              href="/contact"
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-primary text-forest font-semibold rounded-xl hover:bg-primary-light transition-colors"
            >
              {isTr ? "Benzer Proje Konusalim" : "Discuss a Similar Project"}
              <span className="material-icons text-sm">arrow_forward</span>
            </Link>
          </aside>
        </div>
      </article>
    </div>
  );
}

