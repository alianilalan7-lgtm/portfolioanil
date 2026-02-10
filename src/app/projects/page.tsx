"use client";

import { useState, useMemo } from "react";
import { projects, categories } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("All Works");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchesCategory =
        activeCategory === "All Works" || p.category === activeCategory;
      const matchesSearch =
        search === "" ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase()) ||
        p.techStack.some((t) =>
          t.toLowerCase().includes(search.toLowerCase())
        );
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search]);

  return (
    <div className="pt-28 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-sage">
              Projects
            </h1>
            <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
              {projects.length}
            </span>
          </div>
          <p className="text-sage/50 text-lg max-w-2xl">
            A collection of projects spanning AI, sustainability, and modern web
            development.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          {/* Category filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-primary text-forest"
                    : "bg-forest-light border border-glass-border text-sage/60 hover:border-primary/30 hover:text-sage"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative md:ml-auto">
            <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-sage/30 text-lg">
              search
            </span>
            <input
              type="text"
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-xl bg-forest-light border border-glass-border text-sage placeholder-sage/30 focus:outline-none focus:border-primary/50 text-sm w-full md:w-64"
            />
          </div>
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <span className="material-icons text-5xl text-sage/20 mb-4">
              search_off
            </span>
            <p className="text-sage/40 text-lg">No projects found</p>
            <p className="text-sage/30 text-sm mt-1">
              Try adjusting your filters or search term
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
