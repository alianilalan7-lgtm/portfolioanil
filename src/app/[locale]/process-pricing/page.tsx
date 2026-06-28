import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import SectionHeader from "@/components/fx/SectionHeader";
import Reveal from "@/components/fx/Reveal";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Seo" });
  return buildMetadata({
    locale,
    path: "/process-pricing",
    title: t("processPricingTitle"),
    description: t("processPricingDescription"),
  });
}

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

const pad = (n: number) => String(n).padStart(2, "0");

export default function ProcessPricingPage() {
  const t = useTranslations("ProcessPricingPage");

  return (
    <div className="pt-28 pb-24 md:pt-32 md:pb-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Page header */}
        <SectionHeader index="01" label={t("title")} meta="PROCESS+PRICING" />

        <Reveal as="header" className="mt-10 max-w-3xl">
          <h1 className="font-display text-[2rem] sm:text-[2.75rem] md:text-[3.5rem] font-bold uppercase leading-[1.04] tracking-tight text-paper">
            {t("title")}
          </h1>
          <p className="mt-6 text-muted text-base md:text-lg leading-relaxed">
            {t("description")}
          </p>
        </Reveal>

        {/* Process */}
        <section className="mt-20 md:mt-28">
          <SectionHeader
            index="02"
            label={t("processTitle")}
            meta={`${pad(processSteps.length)} STEPS`}
          />

          <div className="mt-10 border border-line bg-surface divide-y divide-line">
            {processSteps.map((step, i) => (
              <Reveal
                key={step.number}
                as="div"
                delay={i * 0.05}
                className="group grid grid-cols-1 md:grid-cols-[92px_1fr] gap-3 md:gap-8 p-6 md:p-8 transition-colors hover:bg-surface-2"
              >
                <span className="font-mono text-2xl md:text-3xl leading-none text-lime">
                  [{step.number}]
                </span>
                <div>
                  <h3 className="font-display text-lg md:text-xl font-bold uppercase leading-tight tracking-tight text-paper transition-colors group-hover:text-lime">
                    {t(step.titleKey)}
                  </h3>
                  <p className="mt-2 text-sm md:text-[15px] leading-relaxed text-muted max-w-2xl">
                    {t(step.descriptionKey)}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section className="mt-20 md:mt-28">
          <SectionHeader
            index="03"
            label={t("pricingTitle")}
            meta={`${pad(pricingCards.length)} PLANS`}
          />

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
            {pricingCards.map((card, i) => (
              <Reveal
                key={card.titleKey}
                as="article"
                delay={i * 0.07}
                className="term-card group flex flex-col p-7 md:p-8"
              >
                <div className="flex items-center justify-between">
                  <span className="tag-term">PLAN_{pad(i + 1)}</span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
                    // PRICE
                  </span>
                </div>

                <h3 className="mt-6 font-display text-xl font-bold uppercase leading-tight tracking-tight text-paper transition-colors group-hover:text-lime">
                  {t(card.titleKey)}
                </h3>
                <p className="mt-4 font-display text-2xl md:text-3xl font-bold leading-none tracking-tight text-lime">
                  {t(card.valueKey)}
                </p>
                <p className="mt-5 border-t border-line pt-5 text-sm leading-relaxed text-muted">
                  {t(card.descriptionKey)}
                </p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-20 md:mt-28">
          <SectionHeader
            index="04"
            label={t("faqTitle")}
            meta={`${pad(faqItems.length)} ENTRIES`}
          />

          <div className="mt-10 border border-line bg-surface divide-y divide-line">
            {faqItems.map((faq, i) => (
              <Reveal key={faq.questionKey} as="div" delay={i * 0.05}>
                <details className="group">
                  <summary className="flex cursor-pointer list-none items-start gap-3 p-6 md:p-7 transition-colors hover:bg-surface-2 [&::-webkit-details-marker]:hidden">
                    <span className="mt-0.5 font-mono text-sm text-lime" aria-hidden>
                      &gt;
                    </span>
                    <h3 className="flex-1 font-display text-base md:text-lg font-bold tracking-tight text-paper">
                      {t(faq.questionKey)}
                    </h3>
                    <span
                      className="font-mono text-lg leading-none text-lime transition-transform duration-200 group-open:rotate-45"
                      aria-hidden
                    >
                      +
                    </span>
                  </summary>
                  <p className="px-6 md:px-7 pb-6 md:pb-7 pl-[2.6rem] text-sm md:text-[15px] leading-relaxed text-muted">
                    {t(faq.answerKey)}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>
        </section>

        {/* CTA */}
        <Reveal
          as="section"
          className="mt-20 md:mt-28 border border-line bg-surface-2 p-8 md:p-12"
        >
          <p className="eyebrow mb-5">// READY_TO_SHIP</p>
          <h2 className="font-display text-[1.75rem] sm:text-[2.25rem] md:text-[3rem] font-bold uppercase leading-[1.05] tracking-tight text-paper max-w-3xl">
            {t("ctaTitle")}
          </h2>
          <p className="mt-5 text-muted text-base md:text-lg max-w-2xl leading-relaxed">
            {t("ctaDescription")}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/contact" className="btn-term btn-term--solid">
              &gt; {t("ctaButton")}
            </Link>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
