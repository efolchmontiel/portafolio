"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { timelineStops } from "@/data/timeline";
import { sectionIds } from "@/data/sections";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useScrollDrivenShift } from "@/hooks/useScrollDrivenShift";
import { easeOut, revealViewport } from "@/lib/motion";

/**
 * Trayectoria como recorrido horizontal.
 *
 * La sección es más alta que el viewport y su contenido queda fijo: el scroll
 * vertical empuja la línea de tiempo hacia la izquierda, la línea se dibuja
 * sola y cada parada se enciende al llegar al centro. En mobile o con
 * movimiento reducido se apila en vertical y no se fija.
 */
export function TimelineSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLOListElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  const isNarrow = useMediaQuery("(max-width: 1024px)");
  const reducedMotion = useReducedMotion();
  const isPinned = !isNarrow && !reducedMotion;

  const { activeIndex } = useScrollDrivenShift({
    sectionRef,
    trackRef,
    viewportRef,
    itemCount: timelineStops.length,
    enabled: isPinned,
  });

  return (
    <section
      ref={sectionRef}
      id={sectionIds.timeline}
      className="timeline-section"
      data-pinned={isPinned ? "true" : undefined}
    >
      <div className="timeline-stage">
        <div className="wrap timeline-head">
          <motion.p
            className="label"
            initial={{ y: 16, filter: "blur(6px)" }}
            whileInView={{ filter: "blur(0px)" }}
            viewport={revealViewport}
            transition={{ duration: 0.6, ease: easeOut }}
          >
            01 — Trayectoria
          </motion.p>

          <motion.h2
            className="display timeline-head__title"
            initial={{ y: 26, filter: "blur(6px)" }}
            whileInView={{ filter: "blur(0px)" }}
            viewport={revealViewport}
            transition={{ duration: 0.75, ease: easeOut, delay: 0.05 }}
          >
            Ocho años,
            <br />
            seis constelaciones.
          </motion.h2>

          <p className="timeline-head__hint" aria-hidden>
            <i />
            {isPinned ? "Seguí bajando: el recorrido avanza" : "Desliza el recorrido"}
          </p>
        </div>

        <div className="timeline-viewport" ref={viewportRef}>
          <ol className="timeline-track" ref={trackRef}>
            <li className="timeline-rail" aria-hidden>
              <i className="timeline-rail__fill" />
            </li>

            {timelineStops.map((stop, index) => (
              <li
                key={stop.id}
                className={[
                  "timeline-stop",
                  index === activeIndex ? "is-active" : "",
                  stop.isCurrent ? "timeline-stop--current" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                aria-current={index === activeIndex ? "step" : undefined}
              >
                <span className="timeline-stop__dot" aria-hidden />
                <span className="timeline-stop__period">{stop.period}</span>
                <span className="timeline-stop__org">{stop.org}</span>
                <span className="timeline-stop__detail">{stop.detail}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
