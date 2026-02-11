import { notFound } from "next/navigation";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { projects } from "@/data/projects";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

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

  const statusColors: Record<string, string> = {
    live: "bg-green-500/20 text-green-400 border-green-500/30",
    beta: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    mvp: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    "in-progress": "bg-orange-500/20 text-orange-400 border-orange-500/30",
    paused: "bg-gray-500/20 text-gray-400 border-gray-500/30",
    completed: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  };

  const statusLabels: Record<string, string> = {
    live: tCard("statusLive"),
    beta: tCard("statusBeta"),
    mvp: tCard("statusMvp"),
    "in-progress": tCard("statusInProgress"),
    paused: tCard("statusPaused"),
    completed: tCard("statusCompleted"),
  };

  return (
    <div className="pt-28 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-sage/40 mb-8">
          <Link href="/projects" className="hover:text-primary transition-colors">
            {t("breadcrumbProjects")}
          </Link>
          <span className="material-icons text-xs">chevron_right</span>
          <span className="text-sage/70">{project.title}</span>
        </nav>

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${statusColors[project.status]}`}
            >
              {statusLabels[project.status]}
            </span>
            <span className="text-sage/30 text-sm">{project.category}</span>
          </div>

          <h1 className="font-heading text-4xl md:text-5xl font-bold text-sage mb-4">
            {project.title}
          </h1>
          <p className="text-sage/50 text-lg max-w-3xl">
            {tAll(project.longDescriptionKey)}
          </p>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-2 mt-6">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 text-sm rounded-lg bg-forest-lighter text-sage/60 border border-glass-border"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Progress bar */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sage/40 text-sm">{t("projectProgress")}</span>
              <span className="text-primary text-sm font-medium">{project.progress}%</span>
            </div>
            <div className="h-2 rounded-full bg-forest-lighter overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary to-primary-light transition-all duration-500"
                style={{ width: `${project.progress}%` }}
              />
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-3 mt-8">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-forest font-semibold rounded-xl hover:bg-primary-light transition-colors"
              >
                <span className="material-icons text-lg">open_in_new</span>
                {t("visitLiveDemo")}
              </a>
            )}
            {project.sourceUrl && (
              <a
                href={project.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border border-glass-border text-sage rounded-xl hover:border-primary/30 hover:text-primary transition-all"
              >
                <span className="material-icons text-lg">code</span>
                {t("viewSource")}
              </a>
            )}
          </div>
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left - Main content */}
          <div className="lg:col-span-2 space-y-10">
            {/* Project image */}
            <div className="glass-card p-2">
              <div className={`relative h-64 md:h-80 rounded-xl overflow-hidden ${
                {
                  pulse: "bg-[#0a0a0a]",
                  "smart-planning": "bg-[#eef2f7]",
                  gozcu: "bg-[#f0f4f8]",
                  academy360: "bg-[#2bae7e]",
                  "iro-beautyzone": "bg-[#9a8174]",
                }[project.slug] || "bg-forest-lighter"
              }`}>
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className={`${
                      {
                        pulse: "object-contain p-4",
                        "smart-planning": "object-contain p-3",
                        gozcu: "object-contain p-3",
                        academy360: "object-contain p-8",
                        "iro-beautyzone": "object-contain p-6",
                      }[project.slug] || "object-cover"
                    }`}
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    priority
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-terracotta/10 flex items-center justify-center">
                    <span className="font-heading text-4xl font-bold text-sage/15">
                      {project.title}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Gallery */}
            {project.gallery && project.gallery.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.gallery.map((img, i) => (
                  <div key={i} className="glass-card p-2">
                    <div className="relative h-52 md:h-64 rounded-xl bg-forest-lighter overflow-hidden">
                      <Image
                        src={img}
                        alt={`${project.title} screenshot ${i + 2}`}
                        fill
                        className="object-cover object-top"
                        sizes="(max-width: 1024px) 100vw, 33vw"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Overview */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-sage mb-4">
                {t("projectOverview")}
              </h2>
              <p className="text-sage/60 leading-relaxed">{tAll(project.overviewKey)}</p>
            </div>

            {/* Problem */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-sage mb-4">
                {t("theProblem")}
              </h2>
              <p className="text-sage/60 leading-relaxed">{tAll(project.problemKey)}</p>
            </div>

            {/* Solution */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-sage mb-4">
                {t("theSolution")}
              </h2>
              <p className="text-sage/60 leading-relaxed">{tAll(project.solutionKey)}</p>
            </div>

            {/* Key Features */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-sage mb-6">
                {t("keyFeatures")}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.features.map((feature) => (
                  <div
                    key={feature.titleKey}
                    className="glass-card glass-card-hover p-5"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20 mb-3">
                      <span className="material-icons text-primary text-xl">
                        {feature.icon}
                      </span>
                    </div>
                    <h3 className="font-heading font-semibold text-sage mb-2">
                      {tAll(feature.titleKey)}
                    </h3>
                    <p className="text-sage/50 text-sm leading-relaxed">
                      {tAll(feature.descriptionKey)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Code Snippet */}
            {project.codeSnippet && (
              <div>
                <h2 className="font-heading text-2xl font-bold text-sage mb-4">
                  {t("codeHighlight")}
                </h2>
                <div className="glass-card overflow-hidden">
                  <div className="flex items-center justify-between px-5 py-3 border-b border-glass-border bg-forest-lighter/50">
                    <div className="flex items-center gap-2">
                      <span className="material-icons text-primary text-sm">code</span>
                      <span className="text-sage/70 text-sm font-medium">
                        {project.codeSnippet.title}
                      </span>
                    </div>
                    <span className="text-sage/30 text-xs uppercase tracking-wider">
                      {project.codeSnippet.language}
                    </span>
                  </div>
                  <pre className="p-5 overflow-x-auto text-sm leading-relaxed">
                    <code className="text-sage/70">{project.codeSnippet.code}</code>
                  </pre>
                </div>
              </div>
            )}
          </div>

          {/* Right - Sidebar */}
          <div className="space-y-6">
            {/* Tech Stack */}
            <div className="glass-card p-6">
              <h3 className="font-heading font-semibold text-sage mb-4 flex items-center gap-2">
                <span className="material-icons text-primary text-lg">
                  layers
                </span>
                {t("techStack")}
              </h3>
              <div className="space-y-3">
                {project.techStack.map((tech) => (
                  <div
                    key={tech}
                    className="flex items-center gap-3 py-2 border-b border-glass-border last:border-0"
                  >
                    <span className="material-icons text-sage/30 text-sm">
                      check_circle
                    </span>
                    <span className="text-sage/70 text-sm">{tech}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Team */}
            <div className="glass-card p-6">
              <h3 className="font-heading font-semibold text-sage mb-4 flex items-center gap-2">
                <span className="material-icons text-primary text-lg">
                  group
                </span>
                {t("team")}
              </h3>
              <div className="space-y-3">
                {project.team.map((member) => (
                  <div
                    key={member.name}
                    className="flex items-center gap-3 py-2 border-b border-glass-border last:border-0"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                      <span className="text-primary text-xs font-bold">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div>
                      <p className="text-sage text-sm font-medium">
                        {member.name}
                      </p>
                      <p className="text-sage/40 text-xs">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div className="glass-card p-6">
              <h3 className="font-heading font-semibold text-sage mb-4 flex items-center gap-2">
                <span className="material-icons text-primary text-lg">
                  schedule
                </span>
                {t("statusTimeline")}
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-glass-border">
                  <span className="text-sage/40 text-sm">{t("duration")}</span>
                  <span className="text-sage/70 text-sm">
                    {project.timeline.duration}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-glass-border">
                  <span className="text-sage/40 text-sm">{t("phase")}</span>
                  <span className="text-sage/70 text-sm">
                    {project.timeline.phase}
                  </span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-sage/40 text-sm">{t("role")}</span>
                  <span className="text-sage/70 text-sm">
                    {project.timeline.role}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Next Project */}
        <div className="mt-16 pt-12 border-t border-glass-border">
          <p className="text-sage/40 text-sm mb-4">{t("upNext")}</p>
          <Link
            href={`/projects/${nextProject.slug}`}
            className="group inline-flex items-center gap-4"
          >
            <div>
              <h3 className="font-heading text-2xl font-bold text-sage group-hover:text-primary transition-colors">
                {nextProject.title}
              </h3>
              <p className="text-sage/50 text-sm">{tAll(nextProject.descriptionKey)}</p>
            </div>
            <span className="material-icons text-3xl text-sage/30 group-hover:text-primary group-hover:translate-x-1 transition-all">
              arrow_forward
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
