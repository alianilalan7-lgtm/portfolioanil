import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import { projects } from "@/data/projects";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, breadcrumbJsonLd, localizedUrl } from "@/lib/seo";
import ProjectsClient from "./ProjectsClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Seo" });
  return buildMetadata({
    locale,
    path: "/projects",
    title: t("projectsTitle"),
    description: t("projectsDescription"),
  });
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tSeo = await getTranslations({ locale, namespace: "Seo" });
  const isTr = locale === "tr";

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: tSeo("projectsTitle"),
    description: tSeo("projectsDescription"),
    url: localizedUrl(locale, "/projects"),
    inLanguage: isTr ? "tr-TR" : "en-US",
    hasPart: projects.map((project) => ({
      "@type": "CreativeWork",
      name: project.title,
      url: localizedUrl(locale, `/projects/${project.slug}`),
    })),
  };

  const breadcrumb = breadcrumbJsonLd(locale, [
    { name: isTr ? "Ana Sayfa" : "Home", path: "" },
    { name: isTr ? "Projeler" : "Projects", path: "/projects" },
  ]);

  return (
    <>
      <JsonLd data={[collectionSchema, breadcrumb]} />
      <ProjectsClient />
    </>
  );
}
