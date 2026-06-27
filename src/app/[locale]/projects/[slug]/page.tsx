import { notFound } from "next/navigation";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { projects } from "@/data/projects";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import Reveal from "@/components/fx/Reveal";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    projects.map((p) => ({ locale, slug: p.slug }))
  );
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const project = projects.find((p) => p.slug === slug);
  if (!project) return notFound();

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return <ProjectDetailContent project={project} nextProject={nextProject} />;
}

// Active states get the lime accent; everything else stays muted.
const LIME_STATUSES = ["live", "beta", "mvp", "in-progress"];

// Per-slug brand backdrops + object-fit for the showcase frame (logos vs. shots).
const MEDIA_BG: Record<string, string> = {
  pulse: "bg-[#0a0a0a]",
  "smart-planning": "bg-[#eef2f7]",
  gozcu: "bg-[#f0f4f8]",
  academy360: "bg-[#2bae7e]",
  "iro-beautyzone": "bg-[#9a8174]",
  "tvn-agency": "bg-black",
};

const MEDIA_FIT: Record<string, string> = {
  pulse: "object-contain p-4",
  "smart-planning": "object-contain p-3",
  gozcu: "object-contain p-3",
  academy360: "object-contain p-8",
  "iro-beautyzone": "object-contain p-6",
  "tvn-agency": "object-contain p-6",
};

function ProjectDetailContent({
  project,
  nextProject,
}: {
  project: (typeof projects)[number];
  nextProject: (typeof projects)[number];
}) {
  const t = useTranslations("ProjectDetail");
  const tCard = useTranslations("ProjectCard");
  const tAll = useTranslations();

  const statusLabels: Record<string, string> = {
    live: tCard("statusLive"),
    beta: tCard("statusBeta"),
    mvp: tCard("statusMvp"),
    "in-progress": tCard("statusInProgress"),
    paused: tCard("statusPaused"),
    completed: tCard("statusCompleted"),
  };

  const isActiveStatus = LIME_STATUSES.includes(project.status);

  const timelineRows: [string, string][] = [
    [t("duration"), project.timeline.duration],
    [t("phase"), project.timeline.phase],
    [t("role"), project.timeline.role],
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 pt-28 pb-24 md:pt-32">
      {/* Breadcrumb */}
      <nav className="mb-10 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-faint">
        <Link href="/projects" className="transition-colors hover:text-lime">
          {t("breadcrumbProjects")}
        </Link>
        <span aria-hidden className="text-line-strong">
          /
        </span>
        <span className="text-muted">{project.title}</span>
      </nav>

      {/* Header */}
      <header className="mb-14">
        <div className="mb-5 flex flex-wrap items-center gap-3">
          <span className="tag-term">
            <span
              className={`mr-1.5 ${isActiveStatus ? "text-lime" : "text-faint"}`}
            >
              ●
            </span>
            {statusLabels[project.status]}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
            // {project.category}
          </span>
        </div>

        <h1 className="font-display text-4xl font-bold uppercase leading-[1.04] tracking-tight text-paper md:text-5xl xl:text-6xl">
          {project.title}
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted md:text-lg">
          {tAll(project.longDescriptionKey)}
        </p>

        {/* Tech tags */}
        <div className="mt-7 flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span key={tech} className="tag-term">
              {tech}
            </span>
          ))}
        </div>

        {/* Progress */}
        <div className="mt-8 max-w-md border border-line bg-surface p-5">
          <div className="mb-3 flex items-center justify-between font-mono text-xs uppercase tracking-[0.14em]">
            <span className="text-faint">// {t("projectProgress")}</span>
            <span className="text-lime">{project.progress}%</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden bg-surface-2">
            <div
              className="h-full origin-left bg-lime"
              style={{ transform: `scaleX(${project.progress / 100})` }}
            />
          </div>
        </div>

        {/* Action buttons */}
        {(project.liveUrl || project.sourceUrl) && (
          <div className="mt-8 flex flex-wrap gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-term btn-term--solid"
              >
                &gt; {t("visitLiveDemo")}
                <span aria-hidden>↗</span>
              </a>
            )}
            {project.sourceUrl && (
              <a
                href={project.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-term"
              >
                &gt; {t("viewSource")}
                <span aria-hidden>{"</>"}</span>
              </a>
            )}
          </div>
        )}
      </header>

      {/* Main content grid */}
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
        {/* Left — main content */}
        <div className="space-y-12 lg:col-span-2">
          {/* Project image */}
          <Reveal className="group relative overflow-hidden border border-line" y={20}>
            <div
              className={`relative h-64 md:h-80 ${
                MEDIA_BG[project.slug] || "bg-surface-2"
              }`}
            >
              {project.image ? (
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className={MEDIA_FIT[project.slug] || "object-cover"}
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  priority
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-display text-4xl font-bold uppercase text-line-strong">
                    {project.title}
                  </span>
                </div>
              )}
            </div>
          </Reveal>

          {/* Gallery — grayscale → color on hover */}
          {project.gallery && project.gallery.length > 0 && (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {project.gallery.map((img, i) => (
                <div
                  key={img}
                  className="group relative h-52 overflow-hidden border border-line bg-surface-2 md:h-64"
                >
                  <Image
                    src={img}
                    alt={`${project.title} — ${i + 2}`}
                    fill
                    className="object-cover object-top grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Overview */}
          <section>
            <h2 className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-lime">
              // {t("projectOverview")}
            </h2>
            <p className="leading-relaxed text-muted">
              {tAll(project.overviewKey)}
            </p>
          </section>

          {/* Problem */}
          <section>
            <h2 className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-lime">
              // {t("theProblem")}
            </h2>
            <p className="leading-relaxed text-muted">
              {tAll(project.problemKey)}
            </p>
          </section>

          {/* Solution */}
          <section>
            <h2 className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-lime">
              // {t("theSolution")}
            </h2>
            <p className="leading-relaxed text-muted">
              {tAll(project.solutionKey)}
            </p>
          </section>

          {/* Key Features */}
          <section>
            <h2 className="mb-6 font-mono text-xs uppercase tracking-[0.18em] text-lime">
              // {t("keyFeatures")}
            </h2>
            <div className="grid grid-cols-1 gap-px border border-line bg-line md:grid-cols-2">
              {project.features.map((feature, i) => (
                <div key={feature.titleKey} className="bg-surface p-6">
                  <span className="font-mono text-xs tracking-wider text-lime">
                    [{String(i + 1).padStart(2, "0")}]
                  </span>
                  <h3 className="mt-3 font-display text-base font-bold uppercase tracking-tight text-paper">
                    {tAll(feature.titleKey)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {tAll(feature.descriptionKey)}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Code Snippet */}
          {project.codeSnippet && (
            <section>
              <h2 className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-lime">
                // {t("codeHighlight")}
              </h2>
              <div className="border border-line bg-surface">
                <div className="flex items-center justify-between border-b border-line px-4 py-2.5 font-mono text-xs">
                  <span className="text-muted">
                    <span className="text-lime">&gt;</span>{" "}
                    {project.codeSnippet.title}
                  </span>
                  <span className="uppercase tracking-[0.14em] text-faint">
                    {project.codeSnippet.language}
                  </span>
                </div>
                <pre className="overflow-x-auto p-5 text-sm leading-relaxed">
                  <code className="font-mono text-muted">
                    {project.codeSnippet.code}
                  </code>
                </pre>
              </div>
            </section>
          )}
        </div>

        {/* Right — sidebar */}
        <aside className="space-y-6">
          {/* Tech Stack */}
          <div className="border border-line bg-surface p-6">
            <p className="mb-4 border-b border-line pb-3 font-mono text-xs uppercase tracking-[0.18em] text-faint">
              // {t("techStack")}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span key={tech} className="tag-term">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Team */}
          <div className="border border-line bg-surface p-6">
            <p className="mb-4 border-b border-line pb-3 font-mono text-xs uppercase tracking-[0.18em] text-faint">
              // {t("team")}
            </p>
            <div className="space-y-3">
              {project.team.map((member) => (
                <div key={member.name} className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-line font-mono text-xs text-lime">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                  <div>
                    <p className="text-sm text-paper">{member.name}</p>
                    <p className="font-mono text-xs text-faint">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="border border-line bg-surface p-6">
            <p className="mb-4 border-b border-line pb-3 font-mono text-xs uppercase tracking-[0.18em] text-faint">
              // {t("statusTimeline")}
            </p>
            <dl className="divide-y divide-line">
              {timelineRows.map(([label, value]) => (
                <div
                  key={label}
                  className="flex items-center justify-between gap-4 py-2.5 font-mono text-xs"
                >
                  <dt className="uppercase tracking-wider text-faint">
                    {label}
                  </dt>
                  <dd className="text-paper">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </aside>
      </div>

      {/* Next Project */}
      <div className="mt-16 border-t border-line pt-10">
        <p className="eyebrow mb-4">// {t("upNext")}</p>
        <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-paper md:text-3xl">
          {nextProject.title}
        </h3>
        <p className="mb-6 mt-2 max-w-2xl text-sm leading-relaxed text-muted">
          {tAll(nextProject.descriptionKey)}
        </p>
        <Link href={`/projects/${nextProject.slug}`} className="btn-term">
          &gt; {tCard("exploreCase")}
          <span aria-hidden>→</span>
        </Link>
      </div>
    </div>
  );
}
