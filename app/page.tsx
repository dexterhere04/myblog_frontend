import HeroSection from "./HeroSection";
import BlogsSection from "./BlogsSection";
import ForestRidgeDivider from "./MountainDivider";
import FallenLogDivider from "./FallenLogDivider";
import ContactSection from "./ContactSection";
import DeepRootsDivider from "./DeepRootsDivider";
import AboutSection from "./AboutSection";

export default function Home() {
  return (
    <div className="relative z-[1] min-h-dvh">
      <HeroSection />
      <ForestRidgeDivider />
      <BlogsSection />
      <FallenLogDivider />
      <ContactSection />
      <DeepRootsDivider />
      <AboutSection />
    </div>
  );
}
