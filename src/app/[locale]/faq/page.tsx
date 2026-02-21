import type { JSX } from "react";

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
    <div className="pt-28 pb-20 px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-4xl mx-auto">
        <header className="mb-12">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-sage mb-4">
            {isTr ? "Sık Sorulan Sorular" : "Frequently Asked Questions"}
          </h1>
          <p className="text-sage/50 text-lg max-w-3xl">
            {isTr
              ? "Freelance ürün geliştirme süreci, süre, bütçe ve MVP konusunda en çok gelen sorular."
              : "Most common questions on timeline, budget, MVP, and freelance product delivery."}
          </p>
        </header>

        <div className="space-y-4">
          {faqItems.map((item) => (
            <article key={item.question} className="glass-card p-6">
              <h2 className="font-heading text-xl font-semibold text-sage mb-2">
                {item.question}
              </h2>
              <p className="text-sage/55 leading-relaxed">{item.answer}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
