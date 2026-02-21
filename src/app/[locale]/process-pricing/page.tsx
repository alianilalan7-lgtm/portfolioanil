import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const processSteps = [
  { number: "01", titleKey: "step1Title", descriptionKey: "step1Description" },
  { number: "02", titleKey: "step2Title", descriptionKey: "step2Description" },
  { number: "03", titleKey: "step3Title", descriptionKey: "step3Description" },
  { number: "04", titleKey: "step4Title", descriptionKey: "step4Description" },
  { number: "05", titleKey: "step5Title", descriptionKey: "step5Description" },
] as const;

const pricingCards = [
  {
    titleKey: "price1Title",
    valueKey: "price1Value",
    descriptionKey: "price1Description",
  },
  {
    titleKey: "price2Title",
    valueKey: "price2Value",
    descriptionKey: "price2Description",
  },
  {
    titleKey: "price3Title",
    valueKey: "price3Value",
    descriptionKey: "price3Description",
  },
] as const;

const faqItems = [
  { questionKey: "faq1Q", answerKey: "faq1A" },
  { questionKey: "faq2Q", answerKey: "faq2A" },
  { questionKey: "faq3Q", answerKey: "faq3A" },
  { questionKey: "faq4Q", answerKey: "faq4A" },
] as const;

export default function ProcessPricingPage() {
  const t = useTranslations("ProcessPricingPage");

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
            {t("processTitle")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {processSteps.map((step) => (
              <article key={step.number} className="glass-card p-5">
                <p className="text-primary font-heading text-lg mb-2">{step.number}</p>
                <h3 className="font-heading text-lg font-semibold text-sage mb-2">
                  {t(step.titleKey)}
                </h3>
                <p className="text-sage/50 text-sm leading-relaxed">
                  {t(step.descriptionKey)}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-heading text-2xl font-semibold text-sage mb-6">
            {t("pricingTitle")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingCards.map((card) => (
              <article key={card.titleKey} className="glass-card p-6">
                <h3 className="font-heading text-xl font-semibold text-sage mb-2">
                  {t(card.titleKey)}
                </h3>
                <p className="text-primary text-2xl font-heading font-bold mb-3">
                  {t(card.valueKey)}
                </p>
                <p className="text-sage/50 text-sm leading-relaxed">
                  {t(card.descriptionKey)}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-heading text-2xl font-semibold text-sage mb-6">
            {t("faqTitle")}
          </h2>
          <div className="space-y-4">
            {faqItems.map((faq) => (
              <article key={faq.questionKey} className="glass-card p-6">
                <h3 className="font-heading text-lg font-semibold text-sage mb-2">
                  {t(faq.questionKey)}
                </h3>
                <p className="text-sage/50 text-sm leading-relaxed">{t(faq.answerKey)}</p>
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
