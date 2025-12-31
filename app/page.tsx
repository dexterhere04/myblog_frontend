import Image from "next/image";
import HeroSection from "./HeroSection";
import BlogsSection from "./BlogsSection";
import MountainDivider from "./MountainDivider";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
    <HeroSection />
    <MountainDivider />
    <BlogsSection />
    </div>
  );
}
