"use client";

import { motion } from "framer-motion";
import { craftCells } from "@/data/craft";
import { easeOut, revealViewport } from "@/lib/motion";

/**
 * Oficio: seis celdas sobre una retícula de una sola hairline.
 * Reemplaza la lista de categorías y la sección de principios; SOLID y
 * compañía viven en la celda "Criterio" en vez de tener sección propia.
 */
export function CraftSection() {
  return (
    <section id="oficio" className="chapter">
      <div className="wrap">
        <motion.p
          className="label"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={revealViewport}
          transition={{ duration: 0.6, ease: easeOut }}
        >
          02 — Oficio
        </motion.p>

        <motion.h2
          className="display mt-5 text-[clamp(32px,4.4vw,62px)]"
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={revealViewport}
          transition={{ duration: 0.75, ease: easeOut, delay: 0.05 }}
        >
          El stack que uso
          <br />
          para sostener producción.
        </motion.h2>

        <motion.div
          className="craft-grid"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
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
