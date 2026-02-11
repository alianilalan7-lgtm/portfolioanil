import { useTranslations } from "next-intl";
import { projects } from "@/data/projects";
import ProjectCard from "./ProjectCard";
import { Link } from "@/i18n/navigation";

export default function FeaturedProjects() {
  const t = useTranslations("FeaturedProjects");
  const featured = projects.filter((p) => p.featured);

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-primary text-sm font-medium mb-2">
              {t("subtitle")}
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-sage">
              {t("title")}
            </h2>
          </div>
          <Link
            href="/projects"
            className="hidden md:inline-flex items-center gap-1 text-sage/50 text-sm hover:text-primary transition-colors"
          >
            {t("viewAll")}
            <span className="material-icons text-sm">arrow_forward</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>

        <Link
          href="/projects"
          className="md:hidden inline-flex items-center gap-1 text-sage/50 text-sm hover:text-primary transition-colors mt-8"
        >
          {t("viewAll")}
          <span className="material-icons text-sm">arrow_forward</span>
        </Link>
      </div>
    </section>
  );
}
