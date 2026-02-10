import Link from "next/link";
import { Project } from "@/data/projects";

const statusColors: Record<string, string> = {
  live: "bg-green-500/20 text-green-400 border-green-500/30",
  beta: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  mvp: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  "in-progress": "bg-orange-500/20 text-orange-400 border-orange-500/30",
};

const statusLabels: Record<string, string> = {
  live: "Live",
  beta: "Beta",
  mvp: "MVP",
  "in-progress": "In Progress",
};

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/projects/${project.slug}`} className="group">
      <div className="glass-card glass-card-hover p-1 h-full flex flex-col">
        {/* Image placeholder */}
        <div className="relative h-48 rounded-t-xl bg-forest-lighter overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-terracotta/10 flex items-center justify-center">
            <span className="material-icons text-5xl text-sage/20">
              image
            </span>
          </div>
          {/* Status badge */}
          <div className="absolute top-3 left-3">
            <span
              className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${statusColors[project.status]}`}
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
            {project.description}
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
            Explore Case
            <span className="material-icons text-sm">arrow_forward</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
