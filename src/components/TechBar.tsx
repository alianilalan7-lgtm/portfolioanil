import { useTranslations } from "next-intl";
import Marquee from "@/components/fx/Marquee";

// Preserved tech list (icons kept for parity; rendered as UPPERCASE marquee items).
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
  const t = useTranslations("TechBar");
  const items = technologies.map((tech) => tech.name.toUpperCase());

  return (
    <section aria-label={t("title")} className="border-y border-line bg-surface-2">
      {/* Thin terminal label strip — the marquee itself is the [02]-grade statement. */}
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between gap-4 py-2.5 border-b border-line">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
          <span className="text-lime">[02]</span> // {t("title")}
        </span>
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
          {items.length} STACK
        </span>
      </div>

      {/* Kinetic, full-bleed tech marquee. Marquee paints the `·` separators lime. */}
      <Marquee
        items={items}
        separator="·"
        duration={26}
        className="py-7 font-display font-bold uppercase tracking-tight leading-none text-paper text-4xl sm:text-5xl md:text-6xl select-none"
      />
    </section>
  );
}
