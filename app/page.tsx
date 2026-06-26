import HeroSection from "./HeroSection";
import BlogsSection from "./BlogsSection";
import MountainDivider from "./MountainDivider";
import ContactSection from "./ContactSection";
import AboutSection from "./AboutSection";

export default function Home() {
  return (
    <div className="relative min-h-dvh">
      <HeroSection />
      <div className="-mt-24 sm:-mt-28 md:-mt-32 lg:-mt-36">
        <MountainDivider />
      </div>
      <BlogsSection />
      <ContactSection />
      <AboutSection />
    </div>
  );
}
