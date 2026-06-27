import { useTranslations } from "next-intl";
import { projects } from "@/data/projects";
import SectionHeader from "@/components/fx/SectionHeader";
import Reveal from "@/components/fx/Reveal";
import Counter from "@/components/fx/Counter";

export default function AboutSection() {
  const t = useTranslations("About");

  return (
    <section id="about" className="max-w-7xl mx-auto px-6 py-24 md:py-32">
      <SectionHeader index="04" label="HAKKIMDA" meta="WHOAMI" />

      <div className="mt-12 grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-16 items-start">
        {/* Left — narrative */}
        <Reveal as="div">
          <p className="eyebrow mb-6">// {t("subtitle")}</p>

          <h2 className="font-display uppercase font-bold text-paper leading-[1.08] tracking-tight text-[1.75rem] sm:text-[2.25rem] md:text-[2.75rem] mb-8">
            {t("title")} <span className="text-lime">{t("titleHighlight")}</span>{" "}
            {t("titleEnd")}
          </h2>

          <div className="space-y-5 max-w-2xl">
            <p className="text-paper text-base md:text-lg leading-relaxed">
              {t("paragraph1")}
            </p>
            <p className="font-mono text-sm md:text-[15px] text-muted leading-relaxed">
              {t("paragraph2")}
            </p>
            <p className="text-muted text-base md:text-lg leading-relaxed">
              {t("paragraph3")}
            </p>
          </div>

          {/* conversion line — brutalist accent */}
          <p className="mt-9 max-w-2xl border-l-2 border-lime pl-5 py-1 font-mono text-sm md:text-base text-paper leading-relaxed">
            <span className="text-lime" aria-hidden>
              &gt;{" "}
            </span>
            {t("conversionLine")}
          </p>
        </Reveal>

        {/* Right — dev counters */}
        <Reveal
          as="div"
          delay={0.1}
          className="border border-line bg-surface-2 divide-y divide-line"
        >
          <div className="p-7 md:p-8">
            <Counter
              value={10}
              suffix="+"
              className="block font-display font-bold leading-none text-lime text-5xl md:text-6xl"
            />
            <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
              {t("statYears")}
            </p>
          </div>

          <div className="p-7 md:p-8">
            <Counter
              value={projects.length}
              suffix="+"
              className="block font-display font-bold leading-none text-lime text-5xl md:text-6xl"
            />
            <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
              {t("statProjects")}
            </p>
          </div>

          <div className="p-7 md:p-8">
            <span className="block font-display font-bold leading-none text-lime text-4xl md:text-5xl tracking-tight">
              AI-FIRST
            </span>
            <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
              // APPROACH
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
