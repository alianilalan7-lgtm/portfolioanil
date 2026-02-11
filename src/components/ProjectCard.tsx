import { useTranslations } from "next-intl";
import { Project } from "@/data/projects";
import { Link } from "@/i18n/navigation";

export default function ProjectCard({ project }: { project: Project }) {
  const t = useTranslations("ProjectCard");
  const tProject = useTranslations();
  const initial = project.title.charAt(0).toUpperCase();

  const statusColors: Record<string, string> = {
    live: "bg-green-500/20 text-green-400 border-green-500/30",
    beta: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    mvp: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    "in-progress": "bg-orange-500/20 text-orange-400 border-orange-500/30",
    paused: "bg-gray-500/20 text-gray-400 border-gray-500/30",
    completed: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  };

  const statusLabels: Record<string, string> = {
    live: t("statusLive"),
    beta: t("statusBeta"),
    mvp: t("statusMvp"),
    "in-progress": t("statusInProgress"),
    paused: t("statusPaused"),
    completed: t("statusCompleted"),
  };

  return (
    <Link href={`/projects/${project.slug}`} className="group">
      <div className="glass-card glass-card-hover p-1 h-full flex flex-col">
        {/* Initial letter */}
        <div className="relative h-48 rounded-t-xl overflow-hidden bg-forest-light flex items-center justify-center">
          <span className="font-heading text-8xl font-bold text-primary/20 group-hover:text-primary/35 transition-colors duration-500 select-none">
            {initial}
          </span>
          {/* Status badge */}
          <div className="absolute top-3 left-3 z-10">
            <span
              className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border backdrop-blur-sm ${statusColors[project.status]}`}
            >
              {statusLabels[project.status]}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          <h3 className="font-heading font-semibold text-sage text-lg mb-2 group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <p className="text-sage/50 text-sm leading-relaxed mb-4 flex-1">
            {tProject(project.descriptionKey)}
          </p>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.techStack.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 text-xs rounded-md bg-forest-lighter text-sage/60 border border-glass-border"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 3 && (
              <span className="px-2 py-1 text-xs rounded-md bg-forest-lighter text-sage/40 border border-glass-border">
                +{project.techStack.length - 3}
              </span>
            )}
          </div>

          {/* Link */}
          <div className="flex items-center gap-1 text-primary text-sm font-medium group-hover:gap-2 transition-all">
            {t("exploreCase")}
            <span className="material-icons text-sm">arrow_forward</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
