import HeroSection from "@/components/HeroSection";
import TechBar from "@/components/TechBar";
import FeaturedProjects from "@/components/FeaturedProjects";
import AboutSection from "@/components/AboutSection";
import SkillStack from "@/components/SkillStack";
import TestimonialsSection from "@/components/TestimonialsSection";
import LeadMagnetSection from "@/components/LeadMagnetSection";
import ContactCTA from "@/components/ContactCTA";

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
