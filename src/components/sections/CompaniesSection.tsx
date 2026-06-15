"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionShell } from "@/components/ui/SectionShell";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { companies } from "@/data/companies";

export function CompaniesSection() {
  return (
    <SectionShell
      id="experience"
      title="Empresas y colaboraciones"
      subtitle="Experiencia"
      className="pb-28"
    >
      <p className="text-text-light/60 text-center max-w-2xl mx-auto mb-10 -mt-2">
        Organizaciones con las que he trabajado o colaborado en proyectos de
        software.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {companies.map((company, i) => (
          <motion.div
            key={company.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
          >
            <GlassPanel
              hoverGlow="violet"
              className="flex flex-col items-center justify-center gap-4 py-8 px-6 h-full min-h-[160px]"
            >
              <div className="relative h-16 w-full max-w-[180px]">
                <Image
                  src={company.logo}
                  alt={company.name}
                  fill
                  className="object-contain object-center"
                  sizes="180px"
                />
              </div>
              <div className="text-center">
                <p className="font-semibold text-text-light">{company.name}</p>
                {company.role ? (
                  <p className="text-xs text-text-light/50 mt-1">{company.role}</p>
                ) : null}
              </div>
            </GlassPanel>
          </motion.div>
        ))}
      </div>
    </SectionShell>
  );
}
