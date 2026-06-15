"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type GlassPanelProps = {
  children: ReactNode;
  className?: string;
  hoverGlow?: "cyan" | "violet" | "none";
};

export function GlassPanel({
  children,
  className = "",
  hoverGlow = "cyan",
}: GlassPanelProps) {
  const glowClass =
    hoverGlow === "cyan"
      ? "hover:glow-cyan"
      : hoverGlow === "violet"
        ? "hover:glow-violet"
        : "";

  return (
    <motion.div
      className={`glass-panel rounded-2xl p-5 transition-all duration-500 hover:-translate-y-1 hover:border-accent-cyan/40 ${glowClass} ${className}`}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
    >
      {children}
    </motion.div>
  );
}
