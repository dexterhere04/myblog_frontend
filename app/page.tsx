import HeroSection from "./HeroSection";
import BlogsSection from "./BlogsSection";
import ForestRidgeDivider from "./MountainDivider";
import ContactSection from "./ContactSection";
import AboutSection from "./AboutSection";

export default function Home() {
  return (
    <div className="relative min-h-dvh">
      <HeroSection />
      <div className="-mt-40 sm:-mt-44 md:-mt-48 lg:-mt-52">
        <ForestRidgeDivider />
      </div>
      <BlogsSection />
      <ContactSection />
      <AboutSection />
    </div>
  );
}
