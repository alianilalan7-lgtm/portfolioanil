const technologies = [
  { name: "Next.js", icon: "web" },
  { name: "React", icon: "code" },
  { name: "Supabase", icon: "storage" },
  { name: "OpenAI", icon: "psychology" },
  { name: "Tailwind CSS", icon: "palette" },
  { name: "TypeScript", icon: "terminal" },
  { name: "Node.js", icon: "dns" },
  { name: "Python", icon: "data_object" },
];

export default function TechBar() {
  return (
    <section className="py-12 px-6 border-y border-glass-border bg-forest-light/30">
      <div className="max-w-6xl mx-auto">
        <p className="text-sage/40 text-xs uppercase tracking-widest text-center mb-6">
          Technologies I Work With
        </p>
        <div className="flex flex-wrap justify-center gap-6 md:gap-10">
          {technologies.map((tech) => (
            <div
              key={tech.name}
              className="flex items-center gap-2 text-sage/50 hover:text-primary transition-colors group"
            >
              <span className="material-icons text-lg group-hover:text-primary transition-colors">
                {tech.icon}
              </span>
              <span className="text-sm font-medium">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
