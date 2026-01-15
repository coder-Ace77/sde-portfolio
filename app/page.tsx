import { HeroSection } from "@/components/sections/HeroSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { StackSection } from "@/components/sections/StackSection";
import { SummaryAboutSection } from "@/components/sections/SummaryAboutSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <SummaryAboutSection />
      <StackSection />
      <ExperienceSection />
    </>
  );
}
