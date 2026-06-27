import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import SectionHeader from "@/components/fx/SectionHeader";

export default function ContactCTA() {
  const t = useTranslations("ContactCTA");

  return (
    <section className="max-w-7xl mx-auto px-6 py-24 md:py-32">
      <SectionHeader index="08" label="İLETİŞİM" meta="END_OF_FILE" />

      <h2 className="mt-12 font-display uppercase font-bold text-paper leading-[0.98] tracking-tight text-[2.25rem] sm:text-[3.25rem] md:text-[4.5rem] xl:text-[5.5rem]">
        {t("title")}{" "}
        <span className="text-lime">{t("titleHighlight")}.</span>
      </h2>

      <p className="mt-6 text-muted text-base md:text-lg max-w-2xl leading-relaxed">
        {t("description")}
      </p>

      <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
        <Link href="/contact" className="btn-term btn-term--solid">
          &gt; {t("startConversation")}
        </Link>
        <a
          href="mailto:anilalanluvi@gmail.com"
          className="font-mono text-sm md:text-base text-muted border-b border-line pb-1 transition-colors hover:text-lime hover:border-lime"
        >
          anilalanluvi@gmail.com
        </a>
      </div>
    </section>
  );
}
