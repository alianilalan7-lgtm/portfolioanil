"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { projects, categories } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";
import SectionHeader from "@/components/fx/SectionHeader";
import Reveal from "@/components/fx/Reveal";

export default function ProjectsClient() {
  const t = useTranslations("ProjectsPage");
  const [activeCategory, setActiveCategory] = useState("All Works");
  const [search, setSearch] = useState("");

  const categoryLabels: Record<string, string> = {
    "All Works": t("allWorks"),
    "AI Labs": "AI Labs",
    SaaS: "SaaS",
    Mobile: "Mobile",
    "Web App": "Web App",
  };

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchesCategory =
        activeCategory === "All Works" || p.category === activeCategory;
      const matchesSearch =
        search === "" ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.techStack.some((tech) =>
          tech.toLowerCase().includes(search.toLowerCase())
        );
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search]);

  return (
    <div className="max-w-7xl mx-auto px-6 pt-28 pb-24 md:pt-32">
      {/* Header */}
      <SectionHeader
        index="02"
        label={t("title").toUpperCase()}
        meta={`${projects.length} PROJE`}
      />

      <Reveal className="mt-10 max-w-3xl" y={20}>
        <h1 className="font-display text-4xl font-bold uppercase leading-[1.04] tracking-tight text-paper md:text-5xl xl:text-6xl">
          {t("title")}
        </h1>
        <p className="mt-5 text-base leading-relaxed text-muted md:text-lg">
          {t("description")}
        </p>
      </Reveal>

      {/* Filters */}
      <div className="mt-12 flex flex-col gap-4 border-y border-line py-5 md:flex-row md:items-center">
        {/* Category filters */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                aria-pressed={isActive}
                className={`border px-4 py-2 font-mono text-xs uppercase tracking-[0.08em] transition-colors duration-200 ${
                  isActive
                    ? "border-lime bg-lime text-ink"
                    : "border-line bg-surface text-muted hover:border-line-strong hover:text-paper"
                }`}
              >
                {isActive && <span className="mr-1">&gt;</span>}
                {categoryLabels[cat] || cat}
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative md:ml-auto md:w-72">
          <span
            aria-hidden
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 font-mono text-sm text-lime"
          >
            /
          </span>
          <input
            type="text"
            placeholder={t("searchPlaceholder")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-line bg-surface py-2.5 pl-9 pr-4 font-mono text-sm text-paper transition-colors duration-200 placeholder:font-mono placeholder:text-faint focus:border-lime focus:outline-none"
          />
        </div>
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project, i) => (
            <Reveal
              key={project.slug}
              className="h-full"
              y={20}
              delay={Math.min(i, 5) * 0.06}
            >
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      ) : (
        <Reveal className="mt-10 border border-line bg-surface px-6 py-20 text-center">
          <p className="font-display text-5xl text-line-strong" aria-hidden>
            &empty;
          </p>
          <p className="mt-6 font-mono text-sm uppercase tracking-[0.14em] text-muted">
            // {t("noResults")}
          </p>
          <p className="mt-2 font-mono text-xs text-faint">{t("noResultsHint")}</p>
        </Reveal>
      )}

      {/* Archival Works */}
      <div className="mt-16 border-t border-line pt-10">
        <button type="button" className="btn-term">
          &gt; {t("archivalWorks")}
          <span aria-hidden className="text-lime">
            →
          </span>
        </button>
      </div>
    </div>
  );
}
