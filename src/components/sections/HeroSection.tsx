"use client";

import { motion } from "framer-motion";
import { SectionShell } from "@/components/ui/SectionShell";

export function HeroSection() {
  return (
    <SectionShell
      id="hero"
      title=""
      variant="full"
      className="hero-section !py-0"
    >
      <div className="flex flex-col items-center justify-center text-center -mt-16">
        <motion.p
          className="text-accent-cyan text-sm uppercase tracking-[0.35em] mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Universo digital
        </motion.p>
        <motion.h1
          className="section-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold max-w-4xl leading-tight text-text-light"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          Construyo experiencias digitales modernas.
        </motion.h1>
        <motion.p
          className="mt-8 max-w-2xl text-lg md:text-xl text-text-light/70 font-light"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          Desarrollador Full Stack especializado en desarrollo frontend, backend
          y móvil.
        </motion.p>

        <motion.div
          className="mt-16 flex flex-col items-center gap-2 text-text-light/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          aria-hidden
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <motion.div
            className="w-px h-12 bg-gradient-to-b from-accent-cyan/80 to-transparent"
            animate={{ scaleY: [1, 0.6, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
        </motion.div>
      </div>
    </SectionShell>
  );
}
