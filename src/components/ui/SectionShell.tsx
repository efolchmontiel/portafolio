"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type SectionShellProps = {
  id: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  /** full = pantalla completa (hero); compact = secciones de contenido */
  variant?: "full" | "compact";
};

export function SectionShell({
  id,
  title,
  subtitle,
  children,
  className = "",
  variant = "compact",
}: SectionShellProps) {
  const layoutClass =
    variant === "full"
      ? "min-h-screen flex flex-col justify-center px-6 py-24 md:px-16 lg:px-24"
      : "min-h-0 flex flex-col justify-center px-6 py-16 md:py-20 md:px-16 lg:px-24";

  return (
    <section
      id={id}
      className={`scroll-mt-24 ${layoutClass} ${className}`}
    >
      {title || subtitle ? (
        <motion.div
          className="mb-8 md:mb-10"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {subtitle ? (
            <p className="text-accent-cyan text-sm uppercase tracking-[0.3em] mb-3 font-medium">
              {subtitle}
            </p>
          ) : null}
          {title ? (
            <h2 className="section-title text-4xl md:text-5xl lg:text-6xl font-bold text-text-light">
              {title}
            </h2>
          ) : null}
        </motion.div>
      ) : null}
      {children}
    </section>
  );
}
