import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import SectionHeader from "@/components/fx/SectionHeader";
import Reveal from "@/components/fx/Reveal";

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

const pad = (n: number) => String(n).padStart(2, "0");

export default function ServicesPage() {
  const t = useTranslations("ServicesPage");

  return (
    <div className="pt-28 pb-24 md:pt-32 md:pb-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Page header */}
        <SectionHeader index="01" label={t("title")} meta="WHAT_I_BUILD" />

        <Reveal as="header" className="mt-10 max-w-3xl">
          <h1 className="font-display uppercase font-bold text-paper leading-[1.04] tracking-tight text-[2rem] sm:text-[2.75rem] md:text-[3.5rem]">
            {t("title")}
          </h1>
          <p className="mt-6 text-muted text-base md:text-lg leading-relaxed">
            {t("description")}
          </p>
        </Reveal>

        {/* What you get */}
        <section className="mt-20 md:mt-28">
          <SectionHeader
            index="02"
            label={t("whatYouGet")}
            meta={`${pad(serviceCards.length)} SERVICES`}
          />

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
            {serviceCards.map((service, i) => (
              <Reveal
                key={service.titleKey}
                as="article"
                delay={i * 0.06}
                className="term-card group flex flex-col p-7 md:p-8"
              >
                <div className="mb-6 flex items-center justify-between">
                  <span className="font-mono text-sm tracking-[0.18em] text-lime">
                    [{pad(i + 1)}]
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
                    // SERVICE
                  </span>
                </div>

                <h3 className="font-display text-xl md:text-2xl font-bold uppercase leading-tight tracking-tight text-paper transition-colors group-hover:text-lime">
                  {t(service.titleKey)}
                </h3>
                <p className="mt-3 text-sm md:text-[15px] leading-relaxed text-muted">
                  {t(service.descriptionKey)}
                </p>

                <ul className="mt-6 flex flex-col gap-2.5 border-t border-line pt-6">
                  {service.items.map((itemKey) => (
                    <li
                      key={itemKey}
                      className="flex items-start gap-2.5 font-mono text-sm text-paper"
                    >
                      <span className="text-lime" aria-hidden>
                        &gt;
                      </span>
                      <span>{t(itemKey)}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Delivery models */}
        <section className="mt-20 md:mt-28">
          <SectionHeader
            index="03"
            label={t("deliveryModels")}
            meta={`${pad(deliveryModels.length)} MODELS`}
          />

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
            {deliveryModels.map((model, i) => (
              <Reveal
                key={model.titleKey}
                as="article"
                delay={i * 0.08}
                className="term-card group p-7 md:p-8"
              >
                <span className="font-mono text-sm tracking-[0.18em] text-lime">
                  [{pad(i + 1)}]
                </span>
                <h3 className="mt-5 font-display text-lg md:text-xl font-bold uppercase leading-tight tracking-tight text-paper transition-colors group-hover:text-lime">
                  {t(model.titleKey)}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {t(model.descriptionKey)}
                </p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* CTA */}
        <Reveal
          as="section"
          className="mt-20 md:mt-28 border border-line bg-surface-2 p-8 md:p-12"
        >
          <p className="eyebrow mb-5">// LET&apos;S_BUILD</p>
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
