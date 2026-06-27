import { Link } from "@/i18n/navigation";
import { caseStudies } from "@/data/case-studies";
import { projects } from "@/data/projects";
import SectionHeader from "@/components/fx/SectionHeader";
import Reveal from "@/components/fx/Reveal";

export default async function CaseStudiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isTr = locale === "tr";

  return (
    <div className="max-w-7xl mx-auto px-6 pt-28 pb-24 md:pt-32 md:pb-32">
      {/* Header */}
      <header className="mb-12">
        <p className="eyebrow mb-6">// {isTr ? "VAKA_ANALİZLERİ" : "CASE_STUDIES"}</p>
        <h1 className="font-display uppercase font-bold text-paper leading-[1.04] tracking-tight text-[2rem] sm:text-[2.75rem] md:text-[3.5rem] mb-6">
          {isTr ? "Vaka Analizleri" : "Case Studies"}
        </h1>
        <p className="text-muted text-base md:text-lg max-w-3xl leading-relaxed">
          {isTr
            ? "Gerçek problemler, uygulanan çözüm yaklaşımı ve ölçülebilir etki odaklı proje incelemeleri."
            : "Project breakdowns focused on real problems, solution approach, and measurable outcomes."}
        </p>
      </header>

      <SectionHeader
        index="01"
        label={isTr ? "İNCELEMELER" : "BREAKDOWNS"}
        meta={`${caseStudies.length} ${isTr ? "VAKA" : "CASES"}`}
      />

      {/* Grid */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {caseStudies.map((item, i) => {
          const project = projects.find((p) => p.slug === item.projectSlug);
          if (!project) return null;

          return (
            <Reveal key={item.slug} delay={i * 0.08} y={20} className="h-full">
              <Link
                href={`/case-studies/${item.slug}`}
                aria-label={project.title}
                className="group term-card flex h-full flex-col p-6"
              >
                {/* Meta — category + duration */}
                <div className="mb-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em]">
                  <span className="text-faint">// {project.category}</span>
                  <span className="text-muted">
                    {isTr ? item.durationTr : item.durationEn}
                  </span>
                </div>

                {/* Title */}
                <h2 className="font-display text-xl font-bold uppercase leading-tight tracking-tight text-paper transition-colors duration-200 group-hover:text-lime">
                  {project.title}
                </h2>

                {/* Summary */}
                <p className="mt-3 text-sm leading-relaxed text-muted line-clamp-3">
                  {isTr ? item.summaryTr : item.summaryEn}
                </p>

                {/* Outcome — terminal log block */}
                <div className="mt-4 border border-line px-3 py-2.5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
                    <span className="text-lime">&gt;</span>{" "}
                    {isTr ? "SONUÇ" : "OUTCOME"}
                  </p>
                  <p className="mt-1 text-[11px] leading-relaxed text-muted line-clamp-2">
                    {isTr ? item.outcomeTr : item.outcomeEn}
                  </p>
                </div>

                {/* Footer link */}
                <div className="mt-auto flex items-center gap-1.5 border-t border-line pt-4 font-mono text-xs uppercase tracking-[0.14em] text-lime transition-all duration-200 group-hover:gap-3">
                  <span>&gt; {isTr ? "VAKAYI_İNCELE" : "VIEW_CASE"}</span>
                  <span
                    aria-hidden
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
