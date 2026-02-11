import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import StarBorder from "./StarBorder";

export default function HeroSection() {
  const t = useTranslations("Hero");

  return (
    <section className="pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left - Content */}
        <div>
          {/* Available badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping-slow absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary" />
            </span>
            <span className="text-primary text-sm font-medium">
              {t("availableBadge")}
            </span>
          </div>

          {/* Main heading */}
          <h1 className="font-heading text-5xl md:text-7xl font-bold text-sage leading-tight mb-6">
            {t("heading1")}
            <br />
            <span className="text-primary">{t("heading2")}</span>
          </h1>

          <p className="text-sage/60 text-lg md:text-xl max-w-2xl leading-relaxed mb-10">
            {t("description")}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-forest font-semibold rounded-xl hover:bg-primary-light transition-colors"
            >
              {t("viewProjects")}
              <span className="material-icons text-lg">arrow_forward</span>
            </Link>
            <StarBorder as="div" color="#84A59D" speed="5s" className="rounded-xl">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 border border-glass-border text-sage rounded-xl hover:border-primary/30 hover:text-primary transition-all glass-card"
              >
                {t("getInTouch")}
                <span className="material-icons text-lg">mail_outline</span>
              </Link>
            </StarBorder>
          </div>
        </div>

        {/* Right - Hero Image */}
        <div className="hidden md:flex items-center justify-center relative">
          <div className="relative w-full max-w-lg" style={{ maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)', WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)' }}>
            <Image
              src="/images/hero-ai.jpg"
              alt={t("heroImageAlt")}
              width={600}
              height={600}
              className="relative w-full h-auto mix-blend-lighten opacity-60 scale-110"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
