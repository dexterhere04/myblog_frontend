import HeroSection from "./HeroSection";
import BlogsSection from "./BlogsSection";
import ForestRidgeDivider from "./MountainDivider";
import ContactSection from "./ContactSection";
import AboutSection from "./AboutSection";

export default function Home() {
  return (
    <div className="relative min-h-dvh">
      <HeroSection />
      <div className="-mt-8 sm:-mt-10 md:-mt-12 lg:-mt-14">
        <ForestRidgeDivider />
      </div>
      <BlogsSection />
      <ContactSection />
      <AboutSection />
    </div>
  );
}
