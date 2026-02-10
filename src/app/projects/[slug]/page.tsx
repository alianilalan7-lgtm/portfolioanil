import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { projects } from "@/data/projects";

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

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) return notFound();

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <div className="pt-28 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-sage/40 mb-8">
          <Link href="/projects" className="hover:text-primary transition-colors">
            Projects
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
            {project.longDescription}
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
              <span className="text-sage/40 text-sm">Project Progress</span>
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
                Visit Live Demo
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
                View Source
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
                Project Overview
              </h2>
              <p className="text-sage/60 leading-relaxed">{project.overview}</p>
            </div>

            {/* Problem */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-sage mb-4">
                The Problem
              </h2>
              <p className="text-sage/60 leading-relaxed">{project.problem}</p>
            </div>

            {/* Solution */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-sage mb-4">
                The Solution
              </h2>
              <p className="text-sage/60 leading-relaxed">{project.solution}</p>
            </div>

            {/* Key Features */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-sage mb-6">
                Key Features
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.features.map((feature) => (
                  <div
                    key={feature.title}
                    className="glass-card glass-card-hover p-5"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20 mb-3">
                      <span className="material-icons text-primary text-xl">
                        {feature.icon}
                      </span>
                    </div>
                    <h3 className="font-heading font-semibold text-sage mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sage/50 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Code Snippet */}
            {project.codeSnippet && (
              <div>
                <h2 className="font-heading text-2xl font-bold text-sage mb-4">
                  Code Highlight
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
                Tech Stack
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
                Team
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
                Status & Timeline
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-glass-border">
                  <span className="text-sage/40 text-sm">Duration</span>
                  <span className="text-sage/70 text-sm">
                    {project.timeline.duration}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-glass-border">
                  <span className="text-sage/40 text-sm">Phase</span>
                  <span className="text-sage/70 text-sm">
                    {project.timeline.phase}
                  </span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-sage/40 text-sm">Role</span>
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
          <p className="text-sage/40 text-sm mb-4">Up Next</p>
          <Link
            href={`/projects/${nextProject.slug}`}
            className="group inline-flex items-center gap-4"
          >
            <div>
              <h3 className="font-heading text-2xl font-bold text-sage group-hover:text-primary transition-colors">
                {nextProject.title}
              </h3>
              <p className="text-sage/50 text-sm">{nextProject.description}</p>
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
