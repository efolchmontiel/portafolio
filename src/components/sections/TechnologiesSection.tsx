"use client";

import { SectionShell } from "@/components/ui/SectionShell";
import { ConstellationMap } from "@/components/ui/ConstellationMap";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { technologyCategories } from "@/data/technologies";

export function TechnologiesSection() {
  return (
    <SectionShell
      id="technologies"
      title="Tecnologías"
      subtitle="Constelación"
      className="technologies-section"
    >
      <ConstellationMap categories={technologyCategories} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:hidden mt-8">
        {technologyCategories.map((cat) => (
          <GlassPanel key={cat.id} hoverGlow="violet">
            <h3 className="text-accent-violet font-semibold mb-2 font-[family-name:var(--font-space-grotesk)]">
              {cat.label}
            </h3>
            <p className="text-sm text-text-light/70">{cat.items.join(" · ")}</p>
          </GlassPanel>
        ))}
      </div>
    </SectionShell>
  );
}
