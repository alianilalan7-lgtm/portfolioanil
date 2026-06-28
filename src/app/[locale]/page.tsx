import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import HeroSection from "@/components/HeroSection";
import TechBar from "@/components/TechBar";
import FeaturedProjects from "@/components/FeaturedProjects";
import AboutSection from "@/components/AboutSection";
import SkillStack from "@/components/SkillStack";
import TestimonialsSection from "@/components/TestimonialsSection";
import LeadMagnetSection from "@/components/LeadMagnetSection";
import ContactCTA from "@/components/ContactCTA";
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
    path: "",
    title: t("homeTitle"),
    description: t("homeDescription"),
  });
}

export default function Home() {
  return (
    <>
      <HeroSection />
      <TechBar />
      <FeaturedProjects />
      <AboutSection />
      <SkillStack />
      <TestimonialsSection />
      <LeadMagnetSection />
      <ContactCTA />
    </>
  );
}
