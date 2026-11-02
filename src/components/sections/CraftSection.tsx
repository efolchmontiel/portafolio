"use client";

import { motion } from "framer-motion";
import { craftCells } from "@/data/craft";
import { processPhases } from "@/data/process";
import { sectionIds } from "@/data/sections";
import { accentStyle } from "@/lib/accents";
import { easeOut, revealViewport } from "@/lib/motion";
import { CraftIcon } from "@/components/ui/CraftIcon";

/**
 * Oficio: cómo trabajo y con qué.
 *
 * Cada fase y cada celda tiene su propio acento y su propio motivo: la
 * sección dejó de ser una tabla de hairlines iguales. El color avanza con el
 * proceso (cian → turquesa → violeta → ámbar) y el stack repite esa paleta.
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
              style={accentStyle(phase.accent)}
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
              <span className="phase__thread" aria-hidden />
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

        <div className="craft-grid">
          {craftCells.map((cell, index) => (
            <motion.article
              key={cell.id}
              className="craft-cell"
              style={accentStyle(cell.accent)}
              initial={{ y: 20, filter: "blur(6px)" }}
              whileInView={{ filter: "blur(0px)" }}
              viewport={revealViewport}
              transition={{
                duration: 0.55,
                ease: easeOut,
                delay: 0.05 * index,
              }}
            >
              <span className="craft-cell__icon" aria-hidden>
                <CraftIcon motif={cell.motif} />
              </span>
              <h3 className="craft-cell__title">{cell.title}</h3>
              <p className="craft-cell__detail">{cell.detail}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
