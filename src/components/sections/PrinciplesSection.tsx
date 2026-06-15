"use client";

import { motion } from "framer-motion";
import { SectionShell } from "@/components/ui/SectionShell";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { principles } from "@/data/principles";

export function PrinciplesSection() {
  return (
    <SectionShell
      id="principles"
      title="Principios de ingeniería"
      subtitle="Estrellas guía"
      className="principles-section"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {principles.map((p, i) => (
          <motion.div
            key={p.id}
            className="principle-card"
            data-principle-card
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: i * 0.08, duration: 0.6 }}
          >
            <GlassPanel hoverGlow="cyan" className="h-full relative overflow-hidden">
              <div
                className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-accent-cyan/10 blur-2xl principle-glow"
                aria-hidden
              />
              <h3 className="section-title text-xl font-bold text-accent-cyan mb-2">
                {p.title}
              </h3>
              <p className="text-sm text-text-light/70 leading-relaxed">
                {p.description}
              </p>
            </GlassPanel>
          </motion.div>
        ))}
      </div>
    </SectionShell>
  );
}
