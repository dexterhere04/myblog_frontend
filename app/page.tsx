import Image from "next/image";
import HeroSection from "./HeroSection";
import BlogsSection from "./BlogsSection";
import MountainDivider from "./MountainDivider";
import ContactSection from "./ContactSection";
import AboutSection from "./AboutSection";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
    <HeroSection />
    <div className="-mt-36 md:-mt-38 lg:-mt-30">

      <MountainDivider />
    </div>
    <BlogsSection />
    <ContactSection />
    <AboutSection />
    </div>
  );
}
