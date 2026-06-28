import type { JSX } from "react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import SectionHeader from "@/components/fx/SectionHeader";
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
    path: "/faq",
    title: t("faqTitle"),
    description: t("faqDescription"),
  });
}

type FaqItem = { question: string; answer: string };

function getFaqItems(locale: string): FaqItem[] {
  if (locale === "tr") {
    return [
      {
        question: "Web uygulaması ne kadar sürer?",
        answer:
          "Kapsama göre değişir. Basit bir web uygulaması genelde 4-6 hafta, orta seviye bir ürün 2-4 ay aralığında teslim edilir.",
      },
      {
        question: "Web uygulaması ne kadar tutar?",
        answer:
          "Maliyet; özellik sayısı, entegrasyon ihtiyacı ve teslim modeline göre değişir. MVP odaklı projeler daha düşük bütçe ile başlatılabilir.",
      },
      {
        question: "Freelancer mı ajans mı daha doğru?",
        answer:
          "MVP ve hızlı test aşamasında freelancer model daha esnek ve maliyet etkindir. Çok büyük ekip ihtiyaçlarında ajans modeli avantajlı olabilir.",
      },
      {
        question: "MVP nedir?",
        answer:
          "MVP, ürünün en temel ve çalışır sürümüdür. Amaç fikri hızlı test etmek ve gerçek kullanıcı geri bildirimine göre ürünü geliştirmektir.",
      },
    ];
  }

  return [
    {
      question: "How long does web app development take?",
      answer:
        "It depends on scope. A simple app usually takes around 4-6 weeks, while a mid-level product can take 2-4 months.",
    },
    {
      question: "How much does a web application cost?",
      answer:
        "Cost depends on feature depth, integration needs, and delivery model. MVP-focused builds can be launched with lower initial budgets.",
    },
    {
      question: "Freelancer or agency: which one is better?",
      answer:
        "For MVP and rapid validation, freelance delivery is usually more flexible and cost-efficient. Agencies are better when you need a large team structure.",
    },
    {
      question: "What is an MVP?",
      answer:
        "An MVP is the smallest usable version of a product. The goal is to validate demand quickly and improve based on real user feedback.",
    },
  ];
}

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<JSX.Element> {
  const { locale } = await params;
  const isTr = locale === "tr";
  const faqItems = getFaqItems(locale);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://alianil.com";
  const localizedPath = isTr ? "/tr/faq" : "/faq";

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
    url: `${siteUrl}${localizedPath}`,
    inLanguage: isTr ? "tr-TR" : "en-US",
  };

  return (
    <div className="max-w-7xl mx-auto px-6 pt-28 pb-20 md:pt-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <SectionHeader
        index="10"
        label={isTr ? "SSS" : "FAQ"}
        meta={isTr ? `${faqItems.length} SORU` : `${faqItems.length} ENTRIES`}
      />

      <header className="mt-12 mb-12 max-w-3xl">
        <h1 className="font-display uppercase font-bold text-paper leading-[1.02] tracking-tight text-[2rem] sm:text-[2.75rem] md:text-[3.5rem]">
          {isTr ? "SIK SORULAN SORULAR" : "FREQUENTLY ASKED QUESTIONS"}
        </h1>
        <p className="mt-6 font-mono text-sm text-muted leading-relaxed">
          {isTr
            ? "Freelance ürün geliştirme süreci, süre, bütçe ve MVP konusunda en çok gelen sorular."
            : "Most common questions on timeline, budget, MVP, and freelance product delivery."}
        </p>
      </header>

      <div className="max-w-3xl border-t border-line">
        {faqItems.map((item, i) => (
          <details key={item.question} className="group border-b border-line">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
              <span className="flex items-start gap-3 font-mono text-sm md:text-base text-paper transition-colors group-hover:text-lime group-open:text-lime">
                <span className="text-lime">
                  [{String(i + 1).padStart(2, "0")}]
                </span>
                {item.question}
              </span>
              <span
                aria-hidden="true"
                className="shrink-0 font-mono text-lg leading-none text-lime transition-transform duration-300 group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="border-l border-line pb-6 pl-4 ml-[0.4rem] font-mono text-sm text-muted leading-relaxed md:ml-9">
              <span className="text-faint">&gt; </span>
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </div>
  );
}
