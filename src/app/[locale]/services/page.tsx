import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const serviceCards = [
  {
    icon: "language",
    titleKey: "service1Title",
    descriptionKey: "service1Description",
    items: ["service1Item1", "service1Item2", "service1Item3"],
  },
  {
    icon: "rocket_launch",
    titleKey: "service2Title",
    descriptionKey: "service2Description",
    items: ["service2Item1", "service2Item2", "service2Item3"],
  },
  {
    icon: "smart_toy",
    titleKey: "service3Title",
    descriptionKey: "service3Description",
    items: ["service3Item1", "service3Item2", "service3Item3"],
  },
  {
    icon: "tune",
    titleKey: "service4Title",
    descriptionKey: "service4Description",
    items: ["service4Item1", "service4Item2", "service4Item3"],
  },
] as const;

const deliveryModels = [
  {
    icon: "inventory_2",
    titleKey: "model1Title",
    descriptionKey: "model1Description",
  },
  {
    icon: "bolt",
    titleKey: "model2Title",
    descriptionKey: "model2Description",
  },
  {
    icon: "autorenew",
    titleKey: "model3Title",
    descriptionKey: "model3Description",
  },
] as const;

export default function ServicesPage() {
  const t = useTranslations("ServicesPage");

  return (
    <div className="pt-28 pb-20 px-6">
      <div className="max-w-6xl mx-auto space-y-12">
        <header>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-sage mb-4">
            {t("title")}
          </h1>
          <p className="text-sage/50 text-lg max-w-3xl">{t("description")}</p>
        </header>

        <section>
          <h2 className="font-heading text-2xl font-semibold text-sage mb-6">
            {t("whatYouGet")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {serviceCards.map((service) => (
              <article key={service.titleKey} className="glass-card p-6 space-y-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <span className="material-icons text-primary">{service.icon}</span>
                </div>
                <h3 className="font-heading text-xl font-semibold text-sage">
                  {t(service.titleKey)}
                </h3>
                <p className="text-sage/50">{t(service.descriptionKey)}</p>
                <ul className="space-y-2">
                  {service.items.map((itemKey) => (
                    <li key={itemKey} className="flex items-start gap-2 text-sage/70 text-sm">
                      <span className="material-icons text-primary text-sm mt-0.5">
                        check_circle
                      </span>
                      <span>{t(itemKey)}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-heading text-2xl font-semibold text-sage mb-6">
            {t("deliveryModels")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {deliveryModels.map((model) => (
              <article key={model.titleKey} className="glass-card p-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                  <span className="material-icons text-primary">{model.icon}</span>
                </div>
                <h3 className="font-heading text-lg font-semibold text-sage mb-2">
                  {t(model.titleKey)}
                </h3>
                <p className="text-sage/50 text-sm leading-relaxed">
                  {t(model.descriptionKey)}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="glass-card p-8 md:p-10 text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-sage mb-3">
            {t("ctaTitle")}
          </h2>
          <p className="text-sage/50 max-w-2xl mx-auto mb-6">{t("ctaDescription")}</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-forest font-semibold rounded-xl hover:bg-primary-light transition-colors"
          >
            {t("ctaButton")}
            <span className="material-icons text-lg">arrow_forward</span>
          </Link>
        </section>
      </div>
    </div>
  );
}
