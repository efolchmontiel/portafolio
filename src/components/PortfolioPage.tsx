"use client";

import dynamic from "next/dynamic";
import { ScrollProgressProvider } from "@/context/ScrollProgressContext";
import { ShootingStarProvider } from "@/context/ShootingStarContext";
import { SiteNav } from "@/components/SiteNav";
import { ChapterRail } from "@/components/ChapterRail";
import { HeroSection } from "@/components/sections/HeroSection";
import { TimelineSection } from "@/components/sections/TimelineSection";
import { CraftSection } from "@/components/sections/CraftSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { HorizonBand } from "@/components/HorizonBand";
import { HorizonStoryLayer } from "@/components/HorizonStoryLayer";
import { ZodiacLayer } from "@/components/ZodiacLayer";
import { StarsBackdrop } from "@/components/StarsBackdrop";
import { Meteors } from "@/components/ui/meteors";

const NightScene = dynamic(
  () =>
    import("@/components/scene/NightScene").then((m) => ({
      default: m.NightScene,
    })),
  { ssr: false },
);

/**
 * Composición de capas del sitio.
 *
 * z0 canvas 3D · z1 estrellas de respaldo · z2 meteoros · z3 zodíaco ·
 * z2 banda de horizonte · z7 siluetas · z10 contenido · z55/60 navegación.
 */
export function PortfolioPage() {
  return (
    <ScrollProgressProvider>
      <ShootingStarProvider>
        <NightScene />
        <StarsBackdrop />
        <div
          className="pointer-events-none fixed inset-0 z-[2] overflow-hidden"
          aria-hidden
        >
          <Meteors number={20} />
        </div>
        <HorizonBand />
        <HorizonStoryLayer />
        <ZodiacLayer />

        <main className="content-layer">
          <SiteNav />
          <ChapterRail />
          <HeroSection />
          <TimelineSection />
          <CraftSection />
          <ProjectsSection />
          <ContactSection />
        </main>
      </ShootingStarProvider>
    </ScrollProgressProvider>
  );
}
