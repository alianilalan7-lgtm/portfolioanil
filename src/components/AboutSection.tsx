import { useTranslations } from "next-intl";
import { projects } from "@/data/projects";

export default function AboutSection() {
  const t = useTranslations("About");

  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <p className="text-primary text-sm font-medium mb-2">{t("subtitle")}</p>
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-sage mb-6">
          {t("title")}{" "}
          <span className="text-primary">{t("titleHighlight")}</span>{" "}
          {t("titleEnd")}
        </h2>
        <div className="space-y-4 text-sage/60 text-lg leading-relaxed">
          <p>{t("paragraph1")}</p>
          <p>{t("paragraph2")}</p>
          <p>{t("paragraph3")}</p>
        </div>

        {/* Stats */}
        <div className="flex gap-12 mt-10 pt-8 border-t border-glass-border">
          {[
            { number: "10+", label: t("statYears") },
            { number: `${projects.length}`, label: t("statProjects") },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="font-heading text-3xl font-bold text-primary">
                {stat.number}
              </p>
              <p className="text-sage/40 text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
