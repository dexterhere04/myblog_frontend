import dynamic from "next/dynamic"
import HeroSection from "./HeroSection";
import ForestRidgeDivider from "./MountainDivider";
import FallenLogDivider from "./FallenLogDivider";
import DeepRootsDivider from "./DeepRootsDivider";

const BlogsSection = dynamic(() => import("./BlogsSection"))
const ContactSection = dynamic(() => import("./ContactSection"))
const AboutSection = dynamic(() => import("./AboutSection"))

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
