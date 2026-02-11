import HeroSection from "@/components/HeroSection";
import TechBar from "@/components/TechBar";
import FeaturedProjects from "@/components/FeaturedProjects";
import AboutSection from "@/components/AboutSection";
import SkillStack from "@/components/SkillStack";
import ContactCTA from "@/components/ContactCTA";

export default function Home() {
  return (
    <>
      <HeroSection />
      <TechBar />
      <FeaturedProjects />
      <AboutSection />
      <SkillStack />
      <ContactCTA />
    </>
  );
}
