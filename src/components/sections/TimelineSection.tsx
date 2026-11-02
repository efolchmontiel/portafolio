"use client";

import { sectionIds } from "@/data/sections";
import { motion } from "framer-motion";
import { timelineStops } from "@/data/timeline";
import { easeOut, revealViewport } from "@/lib/motion";

/**
 * Trayectoria como constelación horizontal: seis paradas sobre una línea,
 * la última marcada como etapa vigente.
 */
export function TimelineSection() {
  return (
    <section id={sectionIds.timeline} className="chapter">
      <div className="wrap">
        <motion.p
          className="label"
          initial={{ y: 16, filter: "blur(6px)" }}
          whileInView={{ y: 0, filter: "blur(0px)" }}
          viewport={revealViewport}
          transition={{ duration: 0.6, ease: easeOut }}
        >
          01 — Trayectoria
        </motion.p>

        <motion.h2
          className="display mt-5 text-[clamp(32px,4.4vw,62px)]"
          initial={{ y: 26, filter: "blur(6px)" }}
          whileInView={{ y: 0, filter: "blur(0px)" }}
          viewport={revealViewport}
          transition={{ duration: 0.75, ease: easeOut, delay: 0.05 }}
        >
          Ocho años,
          <br />
          seis constelaciones.
        </motion.h2>

        <motion.p
          className="copy"
          initial={{ y: 20, filter: "blur(6px)" }}
          whileInView={{ y: 0, filter: "blur(0px)" }}
          viewport={revealViewport}
          transition={{ duration: 0.7, ease: easeOut, delay: 0.1 }}
        >
          Cada etapa dejó un sistema en producción y una forma distinta de mirar
          el mismo problema: que el software sostenga la operación real de la
          gente que lo usa.
        </motion.p>

        <ol className="timeline">
          {timelineStops.map((stop, index) => (
            <motion.li
              key={stop.id}
              className={`timeline__stop${
                stop.isCurrent ? " timeline__stop--current" : ""
              }`}
              initial={{ y: 18, filter: "blur(6px)" }}
              whileInView={{ y: 0, filter: "blur(0px)" }}
              viewport={revealViewport}
              transition={{
                duration: 0.55,
                ease: easeOut,
                delay: 0.06 * index,
              }}
            >
              <span className="timeline__period">{stop.period}</span>
              <span className="timeline__org">{stop.org}</span>
              <span className="timeline__detail">{stop.detail}</span>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
