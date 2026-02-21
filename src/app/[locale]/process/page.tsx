import { Link } from "@/i18n/navigation";

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
    <div className="pt-28 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        <header className="mb-10">
          <p className="text-primary text-sm font-medium mb-3">
            {isTr ? "Çalışma Modeli" : "Delivery Model"}
          </p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-sage mb-3">
            {isTr ? "Nasıl Çalışırım?" : "How I Work"}
          </h1>
          <p className="text-sage/55 text-lg max-w-3xl leading-relaxed">
            {isTr
              ? "Süreç netliği freelance projelerde en güçlü güven sinyalidir. Bu yapı sayesinde kapsam, zaman ve çıktı beklentisi baştan şeffaf olur."
              : "Process clarity is one of the strongest trust signals in freelance delivery. I follow the same transparent flow in every project."}
          </p>
        </header>

        <section className="relative mb-12">
          <div className="hidden md:block absolute left-[23px] top-6 bottom-6 w-px bg-gradient-to-b from-primary/60 via-primary/25 to-transparent" />

          <div className="space-y-4">
          {steps.map((step, index) => (
            <article key={step.tr.title} className="glass-card p-5 md:p-6">
              <div className="md:grid md:grid-cols-[96px_1fr] md:gap-6 items-start">
                <div className="flex md:flex-col items-center md:items-start gap-3 md:gap-2 mb-4 md:mb-0">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/25 flex items-center justify-center">
                    <span className="material-icons text-primary">{step.icon}</span>
                  </div>
                  <p className="text-primary/85 font-heading text-xl leading-none">
                    {`0${index + 1}`}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h2 className="font-heading text-xl font-semibold text-sage">
                      {isTr ? step.tr.title : step.en.title}
                    </h2>
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md border border-primary/25 bg-primary/10 text-primary text-xs font-medium">
                      {isTr ? step.tr.duration : step.en.duration}
                    </span>
                  </div>

                  <p className="text-sage/55 leading-relaxed mb-3">
                    {isTr ? step.tr.summary : step.en.summary}
                  </p>

                  <p className="text-sm text-sage/70">
                    <span className="text-sage/45 mr-1">
                      {isTr ? "Çıktı:" : "Deliverable:"}
                    </span>
                    <span className="text-primary/95">
                      {isTr ? step.tr.deliverable : step.en.deliverable}
                    </span>
                  </p>
                </div>
              </div>
            </article>
          ))}
          </div>
        </section>

        <section className="glass-card p-8 md:p-10">
          <div className="text-center md:text-left">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-sage mb-3">
              {isTr ? "Projeni net bir planla başlatalım" : "Start your project with a clear plan"}
            </h2>
            <p className="text-sage/50 max-w-2xl mx-auto md:mx-0 mb-6">
              {isTr
                ? "Kapsamı birlikte belirleyelim, takvimi netleştirelim ve teslim sürecine hemen başlayalım."
                : "Let us define scope together, lock the timeline, and move into delivery quickly."}
            </p>
          </div>

          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-forest font-semibold rounded-xl hover:bg-primary-light transition-colors"
            >
              {isTr ? "Ücretsiz Görüşme Planla" : "Book a Free Call"}
              <span className="material-icons text-lg">arrow_forward</span>
            </Link>

            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 px-6 py-3 border border-glass-border text-sage rounded-xl hover:border-primary/30 hover:text-primary transition-all"
            >
              {isTr ? "Vaka Analizlerini İncele" : "View Case Studies"}
              <span className="material-icons text-lg">north_east</span>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
