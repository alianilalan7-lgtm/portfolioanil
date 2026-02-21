import { Link } from "@/i18n/navigation";
import { caseStudies } from "@/data/case-studies";
import { projects } from "@/data/projects";

export default async function CaseStudiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isTr = locale === "tr";

  return (
    <div className="pt-28 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-sage mb-4">
            {isTr ? "Case Study'ler" : "Case Studies"}
          </h1>
          <p className="text-sage/50 text-lg max-w-3xl">
            {isTr
              ? "Gerçek problemler, uygulanan çözüm yaklaşımı ve ölçülebilir etki odaklı proje incelemeleri."
              : "Project breakdowns focused on real problems, solution approach, and measurable outcomes."}
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {caseStudies.map((item) => {
            const project = projects.find((p) => p.slug === item.projectSlug);
            if (!project) return null;

            return (
              <article key={item.slug} className="glass-card glass-card-hover p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-1 rounded-md bg-primary/10 border border-primary/20 text-primary text-xs font-medium">
                    {project.category}
                  </span>
                  <span className="text-sage/35 text-xs">
                    {isTr ? item.durationTr : item.durationEn}
                  </span>
                </div>

                <h2 className="font-heading text-xl font-semibold text-sage mb-2">
                  {project.title}
                </h2>
                <p className="text-sage/55 text-sm leading-relaxed mb-4">
                  {isTr ? item.summaryTr : item.summaryEn}
                </p>

                <div className="text-xs text-sage/50 mb-5">
                  <span className="text-primary/90 font-medium">
                    {isTr ? "Sonuç:" : "Outcome:"}
                  </span>{" "}
                  {isTr ? item.outcomeTr : item.outcomeEn}
                </div>

                <Link
                  href={`/case-studies/${item.slug}`}
                  className="inline-flex items-center gap-1 text-primary text-sm font-medium hover:gap-2 transition-all"
                >
                  {isTr ? "Detayi Gor" : "View Case Study"}
                  <span className="material-icons text-sm">arrow_forward</span>
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}

