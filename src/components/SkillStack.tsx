import { useTranslations } from "next-intl";

const skillGroups = [
  {
    titleKey: "frontend",
    icon: "web",
    skills: [
      "React / Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Three.js / WebGL",
      "Framer Motion",
      "Responsive Design",
    ],
  },
  {
    titleKey: "backend",
    icon: "dns",
    skills: [
      "Node.js",
      "Python / FastAPI",
      "PostgreSQL",
      "Supabase",
      "REST / GraphQL",
      "Redis / Caching",
    ],
  },
  {
    titleKey: "toolsAi",
    icon: "build",
    skills: [
      "OpenAI / LangChain",
      "Git / GitHub",
      "Docker",
      "Vercel / AWS",
      "Figma",
      "CI/CD Pipelines",
    ],
  },
];

export default function SkillStack() {
  const t = useTranslations("SkillStack");

  return (
    <section className="py-20 px-6 bg-forest-light/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-primary text-sm font-medium mb-2">{t("subtitle")}</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-sage">
            {t("title")}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {skillGroups.map((group) => (
            <div key={group.titleKey} className="glass-card glass-card-hover p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
                  <span className="material-icons text-primary text-xl">
                    {group.icon}
                  </span>
                </div>
                <h3 className="font-heading font-semibold text-sage">
                  {t(group.titleKey)}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 text-sm rounded-lg bg-forest-lighter text-sage/70 border border-glass-border hover:border-primary/30 hover:text-primary transition-all cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
