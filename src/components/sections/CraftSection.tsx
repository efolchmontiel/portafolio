"use client";

import { motion } from "framer-motion";
import { craftCells } from "@/data/craft";
import { processPhases } from "@/data/process";
import { sectionIds } from "@/data/sections";
import { easeOut, revealViewport } from "@/lib/motion";

/**
 * Oficio: cómo trabajo y con qué.
 *
 * Primero las cuatro fases del proceso (análisis, arquitectura, metodología y
 * entrega) y después el stack en seis celdas. Cada fase y cada celda responden
 * al puntero: sin eso la sección se lee como una tabla muerta.
 */
export function CraftSection() {
  return (
    <section id={sectionIds.craft} className="chapter">
      <div className="wrap">
        <motion.p
          className="label"
          initial={{ y: 16, filter: "blur(6px)" }}
          whileInView={{ filter: "blur(0px)" }}
          viewport={revealViewport}
          transition={{ duration: 0.6, ease: easeOut }}
        >
          02 — Oficio
        </motion.p>

        <motion.h2
          className="display mt-5 text-[clamp(32px,4.4vw,62px)]"
          initial={{ y: 26, filter: "blur(6px)" }}
          whileInView={{ filter: "blur(0px)" }}
          viewport={revealViewport}
          transition={{ duration: 0.75, ease: easeOut, delay: 0.05 }}
        >
          Cuatro fases,
          <br />
          un mismo criterio.
        </motion.h2>

        <ol className="phases">
          {processPhases.map((phase, index) => (
            <motion.li
              key={phase.id}
              className="phase"
              initial={{ y: 22, filter: "blur(6px)" }}
              whileInView={{ filter: "blur(0px)" }}
              viewport={revealViewport}
              transition={{
                duration: 0.6,
                ease: easeOut,
                delay: 0.07 * index,
              }}
            >
              <span className="phase__step" aria-hidden>
                {phase.step}
              </span>
              <h3 className="phase__title">{phase.title}</h3>
              <p className="phase__detail">{phase.detail}</p>
            </motion.li>
          ))}
        </ol>

        <motion.h2
          className="display mt-16 text-[clamp(32px,4.4vw,62px)]"
          initial={{ y: 26, filter: "blur(6px)" }}
          whileInView={{ filter: "blur(0px)" }}
          viewport={revealViewport}
          transition={{ duration: 0.75, ease: easeOut }}
        >
          El stack que uso
          <br />
          para sostener producción.
        </motion.h2>

        <motion.div
          className="craft-grid"
          initial={{ y: 24, filter: "blur(6px)" }}
          whileInView={{ filter: "blur(0px)" }}
          viewport={revealViewport}
          transition={{ duration: 0.75, ease: easeOut, delay: 0.1 }}
        >
          {craftCells.map((cell) => (
            <article key={cell.id} className="craft-cell">
              <h3 className="craft-cell__title">{cell.title}</h3>
              <p className="craft-cell__detail">{cell.detail}</p>
            </article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
