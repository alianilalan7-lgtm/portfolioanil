import type { Metadata } from "next";
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
    path: "/process",
    title: t("processTitle"),
    description: t("processDescription"),
  });
}

const steps = [
  {
    icon: "forum",
    tr: {
      title: "Ücretsiz keşif görüşmesi",
      summary:
        "Hedefini, kapsamı ve öncelikli çıktıları netleştiririz. Riskleri ve bağımlılıkları en başta görünür hale getiririz.",
      deliverable: "Kısa proje özeti + net kapsam çerçevesi",
      duration: "30-45 dk",
    },
    en: {
      title: "Free discovery call",
      summary:
        "We define goals, scope, and priorities up front. Risks and dependencies are made explicit before work starts.",
      deliverable: "Short project brief + scope outline",
      duration: "30-45 min",
    },
  },
  {
    icon: "account_tree",
    tr: {
      title: "Proje planlama",
      summary:
        "Teknik yaklaşım, iş akışı ve teslim sırası belirlenir. Böylece hem hız hem kalite aynı çizgide ilerler.",
      deliverable: "Sprint planı + teslim takvimi",
      duration: "1-2 gün",
    },
    en: {
      title: "Project planning",
      summary:
        "We set the technical approach, delivery sequence, and working cadence to balance speed and quality.",
      deliverable: "Sprint plan + delivery timeline",
      duration: "1-2 days",
    },
  },
  {
    icon: "code",
    tr: {
      title: "Geliştirme",
      summary:
        "Kısa iterasyonlarla ilerler, düzenli ara teslimler yaparım. Her aşamada geribildirim döngüsü açık tutulur.",
      deliverable: "Çalışan modüller + düzenli demo",
      duration: "1-6 hafta",
    },
    en: {
      title: "Development",
      summary:
        "Work progresses in short iterations with frequent checkpoints. Feedback is integrated continuously.",
      deliverable: "Working modules + regular demos",
      duration: "1-6 weeks",
    },
  },
  {
    icon: "rocket_launch",
    tr: {
      title: "Yayınlama",
      summary:
        "Yayın öncesi kalite ve performans kontrolleri tamamlanır. Ürün güvenli biçimde production ortama alınır.",
      deliverable: "Canlıya alınmış sürüm + kontrol listesi",
      duration: "1-2 gün",
    },
    en: {
      title: "Launch",
      summary:
        "Final quality and performance checks are completed before release. The product goes live with a controlled rollout.",
      deliverable: "Production release + go-live checklist",
      duration: "1-2 days",
    },
  },
  {
    icon: "support_agent",
    tr: {
      title: "Destek ve iyileştirme",
      summary:
        "Canlı sonrası hatalar, küçük geliştirmeler ve optimizasyonlar planlı şekilde ele alınır.",
      deliverable: "Stabilizasyon + iyileştirme backlog'u",
      duration: "İhtiyaca göre",
    },
    en: {
      title: "Support and iteration",
      summary:
        "Post-launch fixes, improvements, and optimizations are handled in a structured flow.",
      deliverable: "Stabilization + improvement backlog",
      duration: "As needed",
    },
  },
] as const;

export default async function ProcessPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isTr = locale === "tr";

  return (
    <div className="pt-28 pb-24 md:pt-32 md:pb-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Page header */}
        <SectionHeader
          index="01"
          label={isTr ? "Çalışma Modeli" : "Delivery Model"}
          meta="HOW_I_WORK"
        />

        <Reveal as="header" className="mt-10 max-w-3xl">
          <h1 className="font-display text-[2rem] sm:text-[2.75rem] md:text-[3.5rem] font-bold uppercase leading-[1.04] tracking-tight text-paper">
            {isTr ? "Nasıl Çalışırım?" : "How I Work"}
          </h1>
          <p className="mt-6 text-muted text-base md:text-lg leading-relaxed">
            {isTr
              ? "Süreç netliği freelance projelerde en güçlü güven sinyalidir. Bu yapı sayesinde kapsam, zaman ve çıktı beklentisi baştan şeffaf olur."
              : "Process clarity is one of the strongest trust signals in freelance delivery. I follow the same transparent flow in every project."}
          </p>
        </Reveal>

        {/* Steps */}
        <section className="mt-20 md:mt-28">
          <SectionHeader
            index="02"
            label={isTr ? "Adımlar" : "Steps"}
            meta={`0${steps.length} STEPS`}
          />

          <div className="mt-10 border border-line bg-surface divide-y divide-line">
            {steps.map((step, index) => {
              const s = isTr ? step.tr : step.en;
              return (
                <Reveal
                  key={step.en.title}
                  as="div"
                  delay={index * 0.05}
                  className="group grid grid-cols-1 md:grid-cols-[92px_1fr] gap-3 md:gap-8 p-6 md:p-8 transition-colors hover:bg-surface-2"
                >
                  <span className="font-mono text-2xl md:text-3xl leading-none text-lime">
                    [0{index + 1}]
                  </span>

                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="font-display text-lg md:text-xl font-bold uppercase leading-tight tracking-tight text-paper transition-colors group-hover:text-lime">
                        {s.title}
                      </h2>
                      <span className="tag-term">{s.duration}</span>
                    </div>

                    <p className="mt-3 text-sm md:text-[15px] leading-relaxed text-muted max-w-2xl">
                      {s.summary}
                    </p>

                    <p className="mt-4 flex items-start gap-2 font-mono text-sm text-paper">
                      <span className="text-lime" aria-hidden>
                        &gt;
                      </span>
                      <span>
                        <span className="text-faint">
                          {isTr ? "ÇIKTI" : "DELIVERABLE"}:
                        </span>{" "}
                        {s.deliverable}
                      </span>
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <Reveal
          as="section"
          className="mt-20 md:mt-28 border border-line bg-surface-2 p-8 md:p-12"
        >
          <p className="eyebrow mb-5">{isTr ? "// HAZIR_MISIN" : "// READY"}</p>
          <h2 className="font-display text-[1.75rem] sm:text-[2.25rem] md:text-[3rem] font-bold uppercase leading-[1.05] tracking-tight text-paper max-w-3xl">
            {isTr
              ? "Projeni net bir planla başlatalım"
              : "Start your project with a clear plan"}
          </h2>
          <p className="mt-5 text-muted text-base md:text-lg max-w-2xl leading-relaxed">
            {isTr
              ? "Kapsamı birlikte belirleyelim, takvimi netleştirelim ve teslim sürecine hemen başlayalım."
              : "Let us define scope together, lock the timeline, and move into delivery quickly."}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/contact" className="btn-term btn-term--solid">
              &gt; {isTr ? "Ücretsiz Görüşme Planla" : "Book a Free Call"}
            </Link>
            <Link href="/case-studies" className="btn-term">
              &gt; {isTr ? "Vaka Analizlerini İncele" : "View Case Studies"}
            </Link>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
