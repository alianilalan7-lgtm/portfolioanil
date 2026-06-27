import { useTranslations } from "next-intl";
import Image from "next/image";
import { projects } from "@/data/projects";
import { Link } from "@/i18n/navigation";
import SectionHeader from "@/components/fx/SectionHeader";
import Reveal from "@/components/fx/Reveal";

export default function FeaturedProjects() {
  const t = useTranslations("FeaturedProjects");
  const tRoot = useTranslations();
  const featured = projects.filter((p) => p.featured);

  return (
    <section
      id="featured-projects"
      className="max-w-7xl mx-auto px-6 py-24 md:py-32"
    >
      <SectionHeader
        index="03"
        label="ÖNE ÇIKAN PROJELER"
        meta={`${featured.length} PROJE`}
      />

      {/* Numbered terminal table — each project is a row */}
      <div className="mt-12 border-t border-line">
        {featured.map((project, i) => {
          const num = `[${String(i + 1).padStart(2, "0")}]`;

          return (
            <Reveal key={project.slug} delay={i * 0.08} y={20}>
              <Link
                href={`/projects/${project.slug}`}
                aria-label={project.title}
                className="group relative grid grid-cols-[44px_1fr] grid-rows-[auto_auto_auto] items-stretch overflow-hidden border-b border-line transition-colors duration-200 hover:bg-surface lg:grid-cols-[64px_minmax(200px,260px)_1fr_minmax(180px,240px)] lg:grid-rows-1"
              >
                {/* hover lime sweep */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px origin-left scale-x-0 bg-lime transition-transform duration-500 ease-out group-hover:scale-x-100"
                />

                {/* [01] index */}
                <span className="col-start-1 row-start-1 flex items-start border-r border-line py-6 pl-2 font-mono text-xs tracking-wider text-lime lg:col-start-1 lg:row-start-1 lg:py-7 lg:pl-3">
                  {num}
                </span>

                {/* thumbnail — grayscale → color on hover */}
                <div className="relative col-span-2 col-start-1 row-start-2 min-h-[180px] overflow-hidden border-t border-line bg-black lg:col-span-1 lg:col-start-2 lg:row-start-1 lg:min-h-[150px] lg:border-t-0 lg:border-r">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 260px"
                    className="object-cover brightness-90 grayscale transition-all duration-500 group-hover:scale-105 group-hover:brightness-100 group-hover:grayscale-0"
                  />
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-lime opacity-0 mix-blend-multiply transition-opacity duration-200 group-hover:opacity-25"
                  />
                </div>

                {/* title + one-line description */}
                <div className="col-start-2 row-start-1 flex flex-col justify-center px-5 py-6 lg:col-start-3 lg:row-start-1 lg:border-r lg:border-line lg:px-7 lg:py-8">
                  <h3 className="font-display text-xl font-bold uppercase leading-tight tracking-tight text-paper transition-colors duration-200 group-hover:text-lime md:text-2xl">
                    {project.title}
                  </h3>
                  <p className="mt-2 max-w-[54ch] text-sm leading-relaxed text-muted line-clamp-2">
                    {tRoot(project.descriptionKey)}
                  </p>
                </div>

                {/* stack tags */}
                <div className="col-span-2 col-start-1 row-start-3 flex flex-wrap content-center gap-2 border-t border-line px-5 py-5 lg:col-span-1 lg:col-start-4 lg:row-start-1 lg:border-t-0 lg:px-6 lg:py-7">
                  {project.techStack.slice(0, 3).map((tech) => (
                    <span key={tech} className="tag-term">
                      {tech}
                    </span>
                  ))}
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>

      <div className="mt-12">
        <Link href="/projects" className="btn-term">
          &gt; {t("viewAll")}
        </Link>
      </div>
    </section>
  );
}
