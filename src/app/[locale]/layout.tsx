import type { Metadata } from "next";
import { Inter, Lexend } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://alianil.com";
  const metadataBase = new URL(configuredSiteUrl);
  const localePath = locale === routing.defaultLocale ? "/" : `/${locale}`;

  return {
    metadataBase,
    title: t("title"),
    description: t("description"),
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "32x32" },
        { url: "/icon.svg", type: "image/svg+xml" },
      ],
      apple: "/apple-icon.png",
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      siteName: "Ali Anil Alan",
      url: localePath,
      type: "website",
      locale: locale === "tr" ? "tr_TR" : "en_US",
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: "Ali Anil Alan - Freelance AI & SaaS Developer",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: ["/opengraph-image"],
    },
    alternates: {
      canonical: localePath,
      languages: {
        en: "/",
        tr: "/tr",
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const tMeta = await getTranslations({ locale, namespace: "Metadata" });
  const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://alianil.com";
  const localePrefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  const localizedBaseUrl = `${configuredSiteUrl}${localePrefix}`;
  const languageCode = locale === "tr" ? "tr-TR" : "en-US";

  const schemaItems: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": `${configuredSiteUrl}#person`,
      name: "Ali Anil Alan",
      url: configuredSiteUrl,
      image: `${configuredSiteUrl}/images/profile.png`,
      jobTitle: "Freelance AI & SaaS Developer",
      description: tMeta("description"),
      sameAs: [
        "https://github.com/alianilalan7-lgtm",
        "https://www.linkedin.com/in/ali-an%C4%B1l-alan-a77a7468/",
        "https://x.com/alianilalan",
      ],
      knowsAbout: [
        "SaaS development",
        "MVP development",
        "AI workflow integration",
        "Dashboard development",
        "Automation systems",
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "@id": `${localizedBaseUrl}#service`,
      name: "Ali Anil Alan",
      url: localizedBaseUrl,
      inLanguage: languageCode,
      areaServed: "Worldwide",
      description: tMeta("description"),
      provider: {
        "@id": `${configuredSiteUrl}#person`,
      },
      serviceType: [
        "SaaS MVP Development",
        "AI Automation Development",
        "Dashboard and Admin Panel Development",
        "Web Application Development",
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${localizedBaseUrl}#website`,
      url: localizedBaseUrl,
      name: "Ali Anil Alan",
      inLanguage: languageCode,
      description: tMeta("description"),
      potentialAction: {
        "@type": "SearchAction",
        target: `${localizedBaseUrl}/projects?query={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
  ];

  return (
    <html lang={locale} className="scroll-smooth">
      <head>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
        {schemaItems.map((item, index) => (
          <script
            key={`schema-${index}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
          />
        ))}
      </head>
      <body
        className={`${inter.variable} ${lexend.variable} font-display antialiased bg-forest text-sage`}
      >
        <NextIntlClientProvider>
          {/* Organic glow orbs */}
          <div
            className="orb-sage"
            style={{ top: "-200px", left: "-100px" }}
          />
          <div
            className="orb-sand"
            style={{ top: "400px", right: "-150px" }}
          />
          <div
            className="orb-sage"
            style={{ bottom: "200px", left: "30%" }}
          />

          <Navbar />
          <main className="relative z-10 min-h-screen">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
