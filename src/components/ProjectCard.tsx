import { useTranslations } from "next-intl";
import Image from "next/image";
import { Project } from "@/data/projects";
import { Link } from "@/i18n/navigation";

// Brutalist status palette: active states get the lime accent, the rest stay muted.
const LIME_STATUSES = new Set<Project["status"]>([
  "live",
  "beta",
  "mvp",
  "in-progress",
]);

export default function ProjectCard({ project }: { project: Project }) {
  const t = useTranslations("ProjectCard");
  const tProject = useTranslations();

  const statusLabels: Record<Project["status"], string> = {
    live: t("statusLive"),
    beta: t("statusBeta"),
    mvp: t("statusMvp"),
    "in-progress": t("statusInProgress"),
    paused: t("statusPaused"),
    completed: t("statusCompleted"),
  };

  const isActive = LIME_STATUSES.has(project.status);

  const caseLines: [string, string][] = [
    [t("problemLabel"), tProject(project.problemKey)],
    [t("solutionLabel"), tProject(project.solutionKey)],
    [t("impactLabel"), tProject(project.impactKey)],
  ];

  return (
    <Link
      href={`/projects/${project.slug}`}
      aria-label={project.title}
      className="group term-card flex h-full flex-col"
    >
      {/* Media — grayscale → color on hover */}
      <div className="relative h-44 overflow-hidden border-b border-line bg-black">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover brightness-90 grayscale transition-all duration-500 group-hover:scale-105 group-hover:brightness-100 group-hover:grayscale-0"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-lime opacity-0 mix-blend-multiply transition-opacity duration-200 group-hover:opacity-20"
        />

        {/* Status badge */}
        <span className="tag-term absolute left-3 top-3 z-10 bg-ink/80 backdrop-blur-sm">
          <span className={`mr-1.5 ${isActive ? "text-lime" : "text-faint"}`}>
            ●
          </span>
          {statusLabels[project.status]}
        </span>

        {/* Category */}
        <span className="absolute right-3 top-3 z-10 font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
          // {project.category}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-bold uppercase leading-tight tracking-tight text-paper transition-colors duration-200 group-hover:text-lime">
          {project.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted line-clamp-2">
          {tProject(project.descriptionKey)}
        </p>

        {/* Problem / Solution / Impact — terminal log style */}
        <dl className="mt-4 divide-y divide-line border border-line">
          {caseLines.map(([label, value]) => (
            <div key={label} className="px-3 py-2">
              <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
                <span className="text-lime">&gt;</span> {label}
              </dt>
              <dd className="mt-0.5 text-[11px] leading-relaxed text-muted line-clamp-2">
                {value}
              </dd>
            </div>
          ))}
        </dl>

        {/* Tech stack */}
        <div className="mt-4 flex flex-wrap gap-2">
          {project.techStack.slice(0, 3).map((tech) => (
            <span key={tech} className="tag-term">
              {tech}
            </span>
          ))}
          {project.techStack.length > 3 && (
            <span className="tag-term text-faint">
              +{project.techStack.length - 3}
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="mt-auto flex items-center gap-1.5 border-t border-line pt-4 font-mono text-xs uppercase tracking-[0.14em] text-lime transition-all duration-200 group-hover:gap-3">
          <span>&gt; {t("exploreCase")}</span>
          <span
            aria-hidden
            className="transition-transform duration-200 group-hover:translate-x-1"
          >
            →
          </span>
        </div>
      </div>
    </Link>
  );
}
