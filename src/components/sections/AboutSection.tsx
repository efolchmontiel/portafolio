"use client";

import { SectionShell } from "@/components/ui/SectionShell";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { aboutSummary } from "@/data/about";

export function AboutSection() {
  return (
    <SectionShell
      id="about"
      title="Trayectoria"
      subtitle="Desde 2019"
      className="about-section"
    >
      <GlassPanel
        hoverGlow="cyan"
        className="max-w-5xl mx-auto md:p-8 lg:p-10"
      >
        <p className="text-accent-cyan text-sm font-medium mb-4">
          {aboutSummary.headline}
        </p>
        <div className="space-y-4 text-text-light/75 leading-relaxed">
          {aboutSummary.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
        </div>
        <ul className="mt-6 flex flex-wrap gap-2">
          {aboutSummary.highlights.map((item) => (
            <li
              key={item}
              className="text-xs px-3 py-1 rounded-full border border-accent-cyan/25 bg-night-mid/50 text-accent-cyan"
            >
              {item}
            </li>
          ))}
        </ul>
      </GlassPanel>
    </SectionShell>
  );
}
