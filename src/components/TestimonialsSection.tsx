"use client";

import { useLocale } from "next-intl";
import SectionHeader from "@/components/fx/SectionHeader";
import Reveal from "@/components/fx/Reveal";

type Testimonial = {
  quoteTr: string;
  quoteEn: string;
  name: string;
  roleTr: string;
  roleEn: string;
};

const testimonials: Testimonial[] = [
  {
    quoteTr:
      "Süreci çok net yönetti, teslimler düzenli geldi ve ürün kararları teknik olarak çok sağlıklıydı.",
    quoteEn:
      "The process was managed clearly, deliveries were consistent, and product decisions were technically solid.",
    name: "Agency Partner",
    roleTr: "Ajans Is Birligi",
    roleEn: "Agency Collaboration",
  },
  {
    quoteTr:
      "MVP kapsamını sadeleştirip hızlıca canlıya aldık. Gereksiz işleri değil, kritik değeri önceledi.",
    quoteEn:
      "We simplified MVP scope and launched quickly. He prioritized critical value over unnecessary tasks.",
    name: "Startup Founder",
    roleTr: "MVP Proje Referansi",
    roleEn: "MVP Project Reference",
  },
  {
    quoteTr:
      "Operasyon tarafını anlaması fark yarattı. Teknik çözüm doğrudan sahadaki probleme oturdu.",
    quoteEn:
      "His operations background made a real difference. The technical solution matched the real-world problem directly.",
    name: "Product Team",
    roleTr: "Urun Ekibi Is Birligi",
    roleEn: "Product Team Collaboration",
  },
];

export default function TestimonialsSection() {
  const locale = useLocale();
  const isTr = locale === "tr";

  return (
    <section className="max-w-7xl mx-auto px-6 py-24 md:py-32">
      <SectionHeader
        index="06"
        label={isTr ? "REFERANSLAR" : "TESTIMONIALS"}
        meta={`${testimonials.length} ${isTr ? "GERİ BİLDİRİM" : "FEEDBACK"}`}
      />

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((item, i) => (
          <Reveal
            key={item.name}
            as="article"
            delay={i * 0.08}
            y={20}
            className="group flex flex-col bg-surface border border-line p-7 transition-colors duration-200 hover:border-line-strong"
          >
            <span
              aria-hidden
              className="font-display text-5xl leading-none text-lime/70 mb-3 select-none"
            >
              &quot;
            </span>
            <p className="flex-1 font-mono text-sm text-paper/90 leading-relaxed">
              {isTr ? item.quoteTr : item.quoteEn}
            </p>
            <footer className="mt-6 pt-4 border-t border-line">
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-paper">
                <span className="text-lime">&gt;</span> {item.name}
              </p>
              <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
                {isTr ? item.roleTr : item.roleEn}
              </p>
            </footer>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
