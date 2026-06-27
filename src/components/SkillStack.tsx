import { useTranslations } from "next-intl";
import SectionHeader from "@/components/fx/SectionHeader";
import Reveal from "@/components/fx/Reveal";

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
    <section id="skills" className="max-w-7xl mx-auto px-6 py-24 md:py-32">
      <SectionHeader index="05" label="YETENEKLER" meta={`${skillGroups.length} STACK`} />

      <Reveal
        as="h2"
        className="mt-12 font-display uppercase font-bold text-paper leading-[1.05] tracking-tight text-[1.75rem] sm:text-[2.25rem] md:text-[3rem]"
      >
        {t("title")}
      </Reveal>

      {/* Terminal table: three stack columns split by hairlines */}
      <Reveal
        as="div"
        delay={0.08}
        className="mt-10 grid grid-cols-1 md:grid-cols-3 border border-line bg-surface divide-y md:divide-y-0 md:divide-x divide-line"
      >
        {skillGroups.map((group) => (
          <div key={group.titleKey} className="p-6 md:p-8">
            {/* column header — mono uppercase lime path */}
            <div className="flex items-baseline justify-between gap-3 pb-4 mb-5 border-b border-line">
              <h3 className="font-mono text-sm uppercase tracking-[0.18em] text-lime">
                // {t(group.titleKey)}
              </h3>
              <span className="font-mono text-[11px] text-faint">
                [{String(group.skills.length).padStart(2, "0")}]
              </span>
            </div>

            {/* skill rows — mono terminal lines */}
            <ul className="flex flex-col gap-3 font-mono text-sm">
              {group.skills.map((skill) => (
                <li
                  key={skill}
                  className="group/row flex items-center gap-2.5 text-muted transition-colors hover:text-paper"
                >
                  <span
                    className="text-lime/60 transition-colors group-hover/row:text-lime"
                    aria-hidden
                  >
                    &gt;
                  </span>
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
