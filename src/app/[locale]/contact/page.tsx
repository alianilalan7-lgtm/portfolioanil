import type { Metadata } from "next";
import { useTranslations, useLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import ContactForm from "@/components/ContactForm";
import SectionHeader from "@/components/fx/SectionHeader";
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
    path: "/contact",
    title: t("contactTitle"),
    description: t("contactDescription"),
  });
}

const SOCIALS: { label: string; href: string; handle: string }[] = [
  {
    label: "LINKEDIN",
    href: "https://www.linkedin.com/in/ali-an%C4%B1l-alan-a77a7468/",
    handle: "@alianilalan",
  },
  {
    label: "X",
    href: "https://x.com/alianilalan",
    handle: "@alianilalan",
  },
  {
    label: "GITHUB",
    href: "https://github.com/alianilalan7-lgtm",
    handle: "@alianilalan",
  },
];

export default function ContactPage() {
  const t = useTranslations("ContactPage");
  const locale = useLocale();
  const isTr = locale === "tr";

  return (
    <div className="max-w-7xl mx-auto px-6 pt-28 pb-20 md:pt-32">
      <SectionHeader
        index="09"
        label={isTr ? "İLETİŞİM" : "CONTACT"}
        meta="OPEN_CHANNEL"
      />

      {/* Header */}
      <header className="mt-12 mb-12 max-w-3xl">
        <span className="tag-term mb-7 inline-flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping-slow absolute inline-flex h-full w-full bg-lime opacity-70" />
            <span className="relative inline-flex h-2 w-2 bg-lime" />
          </span>
          {t("availableBadge")}
        </span>

        <h1 className="font-display uppercase font-bold text-paper leading-[1.02] tracking-tight text-[2rem] sm:text-[2.75rem] md:text-[3.5rem]">
          {t("title")}{" "}
          <span className="text-lime">{t("titleHighlight")}.</span>
        </h1>
        <p className="mt-6 text-muted text-base md:text-lg leading-relaxed">
          {t("description")}
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left — quick intro + social links */}
        <aside className="space-y-6">
          {/* Quick intro */}
          <div className="term-card p-6">
            <p className="eyebrow mb-4">
              // {isTr ? "HIZLI TANIŞMA" : "QUICK INTRO"}
            </p>
            <h2 className="font-display uppercase font-bold text-paper tracking-tight text-lg mb-3">
              {t("quickIntroTitle")}
            </h2>
            <p className="font-mono text-sm text-muted leading-relaxed mb-6">
              {t("quickIntroDescription")}
            </p>
            <a
              href="mailto:alianilappstore@gmail.com?subject=Discovery%20Call%20Request"
              className="btn-term w-full justify-center"
            >
              &gt; {t("bookCall")}
            </a>
          </div>

          {/* Social links */}
          <div className="term-card p-6">
            <p className="eyebrow mb-4">// {t("connect")}</p>
            <ul className="flex flex-col">
              {SOCIALS.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-4 border-t border-line py-3 font-mono text-sm transition-colors"
                  >
                    <span className="text-paper transition-colors group-hover:text-lime">
                      {social.label}
                    </span>
                    <span className="text-faint transition-colors group-hover:text-lime">
                      {social.handle} ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Form */}
        <div className="lg:col-span-2">
          <div className="term-card p-6 md:p-8">
            <p className="eyebrow mb-6">
              // {isTr ? "MESAJ_GÖNDER" : "SEND_MESSAGE"}
            </p>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
