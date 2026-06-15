"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import { ScrollProgressProvider } from "@/context/ScrollProgressContext";
import { ShootingStarProvider } from "@/context/ShootingStarContext";
import { ScrollAnimations } from "@/components/ScrollAnimations";
import { SiteNav } from "@/components/SiteNav";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { TechnologiesSection } from "@/components/sections/TechnologiesSection";
import { PrinciplesSection } from "@/components/sections/PrinciplesSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { CompaniesSection } from "@/components/sections/CompaniesSection";
import { HorizonGroundLayer } from "@/components/HorizonGroundLayer";
import { HorizonStoryLayer } from "@/components/HorizonStoryLayer";
import { ConstellationsLayer } from "@/components/ConstellationsLayer";
import { StarsBackdrop } from "@/components/StarsBackdrop";

const NightScene = dynamic(
  () =>
    import("@/components/scene/NightScene").then((m) => ({
      default: m.NightScene,
    })),
  { ssr: false },
);

export function PortfolioPage() {
  const mainRef = useRef<HTMLElement>(null);

  return (
    <ScrollProgressProvider>
      <ShootingStarProvider>
        <NightScene />
        <StarsBackdrop />
        <HorizonGroundLayer />
        <HorizonStoryLayer />
        <ConstellationsLayer />
        <main ref={mainRef} className="content-layer">
          <SiteNav />
          <ScrollAnimations containerRef={mainRef} />
          <HeroSection />
          <AboutSection />
          <TechnologiesSection />
          <PrinciplesSection />
          <ProjectsSection />
          <ContactSection />
          <CompaniesSection />
        </main>
      </ShootingStarProvider>
    </ScrollProgressProvider>
  );
}
