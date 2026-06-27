import { useTranslations } from "next-intl";
import { certificates } from "@/data/certificates";
import SectionHeader from "@/components/fx/SectionHeader";
import Reveal from "@/components/fx/Reveal";

export default function CertificatesPage() {
  const t = useTranslations("CertificatesPage");

  return (
    <div className="max-w-7xl mx-auto px-6 pt-28 pb-24 md:pt-32 md:pb-32">
      {/* Header */}
      <header className="mb-12">
        <p className="eyebrow mb-6">// CREDENTIALS</p>
        <h1 className="font-display uppercase font-bold text-paper leading-[1.04] tracking-tight text-[2rem] sm:text-[2.75rem] md:text-[3.5rem] mb-6">
          {t("title")}
        </h1>
        <p className="text-muted text-base md:text-lg max-w-2xl leading-relaxed">
          {t("description")}
        </p>
      </header>

      <SectionHeader
        index="01"
        label="CERTIFICATES"
        meta={`${certificates.length} ${certificates.length === 1 ? "CERT" : "CERTS"}`}
      />

      {/* Grid */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((cert, i) => (
          <Reveal key={cert.id} delay={i * 0.08} y={20} className="h-full">
            <article className="group term-card flex h-full flex-col p-6">
              {/* Issuer header */}
              <div className="mb-5 flex items-center justify-between border-b border-line pb-4">
                <div className="flex items-center gap-3 font-mono">
                  <span aria-hidden className="text-lg leading-none text-lime">
                    ◆
                  </span>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.18em] text-faint">
                      {cert.issuer}
                    </p>
                    <p className="mt-0.5 text-[10px] text-muted">{cert.date}</p>
                  </div>
                </div>
                <span className="font-mono text-[10px] tracking-wider text-faint">
                  [{String(i + 1).padStart(2, "0")}]
                </span>
              </div>

              {/* Title */}
              <h3 className="flex-1 font-display text-lg font-bold uppercase leading-tight tracking-tight text-paper transition-colors duration-200 group-hover:text-lime">
                {cert.title}
              </h3>

              {/* Tags */}
              <div className="mt-4 flex flex-wrap gap-2">
                {cert.tags.map((tag) => (
                  <span key={tag} className="tag-term">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="mt-6 flex flex-wrap gap-3 border-t border-line pt-5">
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-term btn-term--solid"
                >
                  &gt; {t("verify")}
                </a>
                <a
                  href={cert.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-term"
                >
                  &gt; {t("pdf")}
                </a>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
