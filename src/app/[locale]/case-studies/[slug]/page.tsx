import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { caseStudies } from "@/data/case-studies";
import { projects } from "@/data/projects";
import { routing } from "@/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Reveal from "@/components/fx/Reveal";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, creativeWorkJsonLd, breadcrumbJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    caseStudies.map((item) => ({ locale, slug: item.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const isTr = locale === "tr";
  const study = caseStudies.find((item) => item.slug === slug);
  if (!study) return {};
  const project = projects.find((p) => p.slug === study.projectSlug);
  if (!project) return {};

  return buildMetadata({
    locale,
    path: `/case-studies/${study.slug}`,
    title: isTr
      ? `${project.title} Vaka Analizi | Ali Anıl Alan`
      : `${project.title} Case Study | Ali Anil Alan`,
    description: isTr ? study.summaryTr : study.summaryEn,
    type: "article",
    keywords: [...project.techStack, project.category],
  });
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

  const workSchema = creativeWorkJsonLd({
    locale,
    path: `/case-studies/${study.slug}`,
    name: isTr
      ? `${project.title} Vaka Analizi`
      : `${project.title} Case Study`,
    description: isTr ? study.summaryTr : study.summaryEn,
    keywords: [...project.techStack, project.category],
    url: project.liveUrl,
  });

  const breadcrumb = breadcrumbJsonLd(locale, [
    { name: isTr ? "Ana Sayfa" : "Home", path: "" },
    { name: isTr ? "Vaka Analizleri" : "Case Studies", path: "/case-studies" },
    {
      name: isTr ? `${project.title} Vaka Analizi` : `${project.title} Case Study`,
      path: `/case-studies/${study.slug}`,
    },
  ]);

  const sections: { label: string; body: string }[] = [
    { label: isTr ? "PROBLEM" : "PROBLEM", body: tAll(project.problemKey) },
    { label: isTr ? "ÇÖZÜM" : "SOLUTION", body: tAll(project.solutionKey) },
    {
      label: isTr ? "SONUÇ / ETKİ" : "OUTCOME / IMPACT",
      body: tAll(project.impactKey),
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 pt-28 pb-24 md:pt-32 md:pb-32">
      <JsonLd data={[workSchema, breadcrumb]} />
      <article>
        {/* Breadcrumb */}
        <nav className="mb-10 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-faint">
          <Link href="/case-studies" className="transition-colors hover:text-lime">
            {isTr ? "VAKALAR" : "CASES"}
          </Link>
          <span aria-hidden className="text-faint">
            /
          </span>
          <span className="truncate text-muted">{project.title}</span>
        </nav>

        {/* Header */}
        <header className="mb-14">
          <p className="eyebrow mb-6">// {project.category}</p>
          <h1 className="font-display uppercase font-bold text-paper leading-[1.04] tracking-tight text-[2rem] sm:text-[2.75rem] md:text-[3.5rem] mb-6">
            {project.title}
          </h1>
          <p className="text-muted text-base md:text-lg leading-relaxed max-w-3xl">
            {isTr ? study.summaryTr : study.summaryEn}
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10 lg:gap-16 items-start">
          {/* Sections — terminal spine */}
          <div className="space-y-8">
            {sections.map((s, i) => (
              <Reveal
                key={s.label}
                as="section"
                delay={i * 0.08}
                y={20}
                className="border-l border-line pl-6"
              >
                <p className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-lime">
                  // {s.label}
                </p>
                <p className="text-base leading-relaxed text-muted">{s.body}</p>
              </Reveal>
            ))}
          </div>

          {/* Sidebar — system info box */}
          <Reveal
            as="aside"
            y={16}
            className="border border-line bg-surface/60 p-6 space-y-6"
          >
            {/* Meta */}
            <div>
              <p className="mb-3 border-b border-line pb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
                // META
              </p>
              <dl className="flex flex-col gap-3.5 font-mono text-xs">
                <div className="flex items-center justify-between gap-4">
                  <dt className="uppercase tracking-wider text-faint">
                    {isTr ? "SÜRE" : "DURATION"}
                  </dt>
                  <dd className="text-paper">
                    {isTr ? study.durationTr : study.durationEn}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="uppercase tracking-wider text-faint">
                    {isTr ? "KATEGORİ" : "CATEGORY"}
                  </dt>
                  <dd className="text-paper">{project.category}</dd>
                </div>
              </dl>
            </div>

            {/* Stack */}
            <div>
              <p className="mb-3 border-b border-line pb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
                // STACK
              </p>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span key={tech} className="tag-term">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Live result */}
            <div>
              <p className="mb-3 border-b border-line pb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-lime">
                // {isTr ? "CANLI_SONUÇ" : "LIVE_RESULT"}
              </p>
              <p className="text-sm leading-relaxed text-muted">
                {isTr ? study.outcomeTr : study.outcomeEn}
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col items-start gap-3 pt-1">
              <Link href={`/projects/${project.slug}`} className="btn-term">
                &gt; {isTr ? "PROJEYİ_GÖR" : "VIEW_PROJECT"}
              </Link>
              <Link href="/contact" className="btn-term btn-term--solid">
                &gt; {isTr ? "BENZER_PROJE_KONUŞALIM" : "DISCUSS_PROJECT"}
              </Link>
            </div>
          </Reveal>
        </div>
      </article>
    </div>
  );
}
