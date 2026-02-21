export interface CaseStudy {
  slug: string;
  projectSlug: "smart-planning" | "pulse" | "gozcu";
  summaryTr: string;
  summaryEn: string;
  durationTr: string;
  durationEn: string;
  outcomeTr: string;
  outcomeEn: string;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "smart-planning-case-study",
    projectSlug: "smart-planning",
    summaryTr:
      "Perakende ekiplerinde manuel vardiya planlama karmaşasını azaltmak için yapay zeka destekli bir planlama sistemi kuruldu.",
    summaryEn:
      "An AI-driven planning system was built to reduce manual scheduling complexity in retail operations.",
    durationTr: "8 hafta",
    durationEn: "8 weeks",
    outcomeTr:
      "Planlama süreci hızlandı, operasyonel görünürlük arttı ve vardiya hataları belirgin şekilde azaldı.",
    outcomeEn:
      "Planning speed improved, operational visibility increased, and shift-related errors were significantly reduced.",
  },
  {
    slug: "pulse-case-study",
    projectSlug: "pulse",
    summaryTr:
      "Bilgi kirliliğini azaltmak ve haber doğruluğunu artırmak için çok kaynaklı AI haber analiz altyapısı geliştirildi.",
    summaryEn:
      "A multi-source AI news analysis platform was developed to reduce information noise and improve verification quality.",
    durationTr: "10 hafta",
    durationEn: "10 weeks",
    outcomeTr:
      "Doğrulanmış içgörü akışı ile karar alma hızı arttı ve kullanıcılar farklı perspektiflere tek akışta ulaştı.",
    outcomeEn:
      "Decision speed improved with verified insight flow, and users accessed multiple perspectives in a single stream.",
  },
  {
    slug: "gozcu-case-study",
    projectSlug: "gozcu",
    summaryTr:
      "Bakım ve arıza süreçlerini dijitalleştirmek için mini-CMMS yapısıyla envanter, arıza ve planlı bakım tek panelde toplandı.",
    summaryEn:
      "A mini-CMMS architecture consolidated inventory, failure tracking, and maintenance planning into one panel.",
    durationTr: "12 hafta",
    durationEn: "12 weeks",
    outcomeTr:
      "Plansız duruşlar azaldı, bakım takibi düzenli hale geldi ve operasyonel risk görünürlüğü arttı.",
    outcomeEn:
      "Unplanned downtime dropped, maintenance follow-up became structured, and operational risk visibility increased.",
  },
];

