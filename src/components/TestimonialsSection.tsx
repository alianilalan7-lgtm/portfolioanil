"use client";

import { useLocale } from "next-intl";

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
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <p className="text-primary text-sm font-medium mb-2">
          {isTr ? "Guven Sinyalleri" : "Trust Signals"}
        </p>
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-sage mb-8">
          {isTr ? "Is birligi geri bildirimleri" : "Collaboration feedback"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item) => (
            <article key={item.name} className="glass-card p-6">
              <p className="text-sage/60 text-sm leading-relaxed mb-4">
                {`“${isTr ? item.quoteTr : item.quoteEn}”`}
              </p>
              <p className="font-heading text-sage font-semibold">{item.name}</p>
              <p className="text-xs text-sage/40 mt-1">
                {isTr ? item.roleTr : item.roleEn}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
