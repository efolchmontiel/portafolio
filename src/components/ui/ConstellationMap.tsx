"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import type { TechCategory } from "@/models/technology.model";

type ConstellationMapProps = {
  categories: readonly TechCategory[];
};

const NODE_POSITIONS: Record<string, { x: number; y: number }> = {
  frontend: { x: 18, y: 22 },
  mobile: { x: 42, y: 38 },
  backend: { x: 68, y: 20 },
  database: { x: 82, y: 48 },
  // Ajuste visual: evitar que "Tools" se monte sobre "Frontend" (tarjeta alta)
  tools: { x: 22, y: 78 },
  methodologies: { x: 58, y: 84 },
};

const EDGES: [string, string][] = [
  ["frontend", "backend"],
  ["frontend", "mobile"],
  ["backend", "database"],
  ["tools", "methodologies"],
  ["frontend", "tools"],
  ["backend", "methodologies"],
];

export function ConstellationMap({ categories }: ConstellationMapProps) {
  const lines = useMemo(
    () =>
      EDGES.map(([a, b]) => {
        const p1 = NODE_POSITIONS[a];
        const p2 = NODE_POSITIONS[b];
        if (!p1 || !p2) return null;
        return { a, b, x1: p1.x, y1: p1.y, x2: p2.x, y2: p2.y };
      }).filter(Boolean),
    [],
  );

  return (
    <div className="relative hidden lg:block w-full max-w-5xl mx-auto h-[420px] constellation-map">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden
      >
        {lines.map(
          (line) =>
            line && (
              <line
                key={`${line.a}-${line.b}`}
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
                stroke="url(#lineGrad)"
                strokeWidth="0.15"
                opacity="0.5"
              />
            ),
        )}
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#a78bfa" />
          </linearGradient>
        </defs>
      </svg>

      {categories.map((cat, i) => {
        const pos = NODE_POSITIONS[cat.id] ?? { x: 50, y: 50 };
        return (
          <motion.div
            key={cat.id}
            className="constellation-node absolute glass-panel rounded-xl px-4 py-3 max-w-[220px]"
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              transform: "translate(-50%, -50%)",
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.6 }}
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(56,189,248,0.35)" }}
          >
            <h3 className="text-accent-cyan font-semibold text-sm mb-2 font-[family-name:var(--font-space-grotesk)]">
              {cat.label}
            </h3>
            <ul className="text-xs text-text-light/75 space-y-0.5">
              {cat.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </motion.div>
        );
      })}
    </div>
  );
}
