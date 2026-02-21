export interface CaseStudy {
  slug: string;
  projectSlug:
    | "smart-planning"
    | "pulse"
    | "gozcu"
    | "academy360"
    | "iro-beautyzone"
    | "tvn-agency";
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
  {
    slug: "academy360-case-study",
    projectSlug: "academy360",
    summaryTr:
      "Futbol akademilerinde dağınık operasyonu tek platformda yönetmek için çok kiracılı, rol tabanlı bir yönetim altyapısı geliştirildi.",
    summaryEn:
      "A multi-tenant, role-based platform was built to centralize fragmented football academy operations.",
    durationTr: "16 hafta",
    durationEn: "16 weeks",
    outcomeTr:
      "Antrenman, gelişim takibi ve yönetim süreçleri tek akışta birleşti; ekiplerin operasyon yükü azaldı.",
    outcomeEn:
      "Training, player progress tracking, and admin workflows were unified, reducing operational overhead for teams.",
  },
  {
    slug: "iro-beautyzone-case-study",
    projectSlug: "iro-beautyzone",
    summaryTr:
      "Stüdyo görünürlüğünü ve randevu dönüşümünü artırmak için mobil öncelikli, rezervasyon odaklı bir web deneyimi tasarlandı.",
    summaryEn:
      "A mobile-first, conversion-focused website was crafted to improve studio visibility and appointment conversion.",
    durationTr: "4 hafta",
    durationEn: "4 weeks",
    outcomeTr:
      "Randevuya dönüşen ziyaretçi oranı yükseldi, iletişim süreci hızlandı ve marka algısı güçlendi.",
    outcomeEn:
      "Visitor-to-booking conversion improved, communication became faster, and brand perception strengthened.",
  },
  {
    slug: "tvn-agency-case-study",
    projectSlug: "tvn-agency",
    summaryTr:
      "Ajansın dijital vitrini için sıfırdan, performans ve iletişim dönüşümü odaklı kurumsal bir web sitesi inşa edildi.",
    summaryEn:
      "A corporate website was built from scratch for the agency with strong focus on performance and contact conversion.",
    durationTr: "5 hafta",
    durationEn: "5 weeks",
    outcomeTr:
      "Marka sunumu netleşti, sayfa performansı iyileşti ve ziyaretçilerin iletişim aksiyonuna geçişi hızlandı.",
    outcomeEn:
      "Brand positioning became clearer, page performance improved, and visitor progression to contact actions accelerated.",
  },
];
