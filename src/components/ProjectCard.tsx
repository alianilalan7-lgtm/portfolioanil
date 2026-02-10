import Link from "next/link";
import Image from "next/image";
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

const gradients: Record<string, string> = {
  pulse: "from-emerald-900/40 to-cyan-900/40",
  "smart-planning": "from-violet-900/40 to-indigo-900/40",
  gozcu: "from-amber-900/40 to-orange-900/40",
  academy360: "from-blue-900/40 to-sky-900/40",
  "iro-beautyzone": "from-pink-900/40 to-rose-900/40",
};

export default function ProjectCard({ project }: { project: Project }) {
  const hasImage = project.image && project.image.length > 0;

  return (
    <Link href={`/projects/${project.slug}`} className="group">
      <div className="glass-card glass-card-hover p-1 h-full flex flex-col">
        {/* Image */}
        <div className="relative h-48 rounded-t-xl bg-forest-lighter overflow-hidden">
          {hasImage ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div
              className={`absolute inset-0 bg-gradient-to-br ${gradients[project.slug] || "from-primary/10 to-terracotta/10"} flex items-center justify-center`}
            >
              <span className="font-heading text-2xl font-bold text-sage/20">
                {project.title}
              </span>
            </div>
          )}
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
