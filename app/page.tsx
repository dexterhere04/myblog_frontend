import Image from "next/image";
import HeroSection from "./HeroSection";
import BlogsSection from "./BlogsSection";
import MountainDivider from "./MountainDivider";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
    <HeroSection />
    <div className="-mt-150">
      <MountainDivider />
    </div>
    <BlogsSection />
    </div>
  );
}
