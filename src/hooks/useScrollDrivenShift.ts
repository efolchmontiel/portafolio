"use client";

import { useEffect, useRef, useState } from "react";
import type { RefObject } from "react";
import { clamp } from "@/lib/validation";

type ScrollDrivenShiftOptions = {
  readonly sectionRef: RefObject<HTMLElement | null>;
  readonly trackRef: RefObject<HTMLElement | null>;
  readonly viewportRef: RefObject<HTMLElement | null>;
  readonly itemCount: number;
  /** Falso en mobile o con movimiento reducido: no se fija ni desplaza. */
  readonly enabled: boolean;
};

type ScrollDrivenShift = {
  readonly activeIndex: number;
};

/**
 * Convierte el scroll vertical en desplazamiento horizontal de un track.
 *
 * Escribe el desplazamiento en una variable CSS sobre el propio track en vez
 * de pasarlo por estado: así el recorrido se mueve a 60 fps sin re-renderizar
 * React. El estado solo cambia cuando cambia la parada activa.
 */
export function useScrollDrivenShift({
  sectionRef,
  trackRef,
  viewportRef,
  itemCount,
  enabled,
}: ScrollDrivenShiftOptions): ScrollDrivenShift {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeRef = useRef(0);

  useEffect(() => {
    if (!enabled) {
      /* Sin fijado no hay parada activa que calcular: solo se limpia el track. */
      const track = trackRef.current;
      if (track) {
        track.style.setProperty("--shift", "0px");
        track.style.setProperty("--line-progress", "1");
      }
      return;
    }

    let frame: number | null = null;

    const update = () => {
      frame = null;
      const section = sectionRef.current;
      const track = trackRef.current;
      const viewport = viewportRef.current;
      if (!section || !track || !viewport) return;

      const rect = section.getBoundingClientRect();
      const span = rect.height - window.innerHeight;
      const progress = span > 0 ? clamp(-rect.top / span, 0, 1) : 0;

      const maxShift = Math.max(0, track.scrollWidth - viewport.clientWidth);
      track.style.setProperty("--shift", `${-(progress * maxShift).toFixed(2)}px`);
      track.style.setProperty("--line-progress", progress.toFixed(4));

      const next = clamp(
        Math.round(progress * Math.max(itemCount - 1, 1)),
        0,
        Math.max(itemCount - 1, 0),
      );
      if (next !== activeRef.current) {
        activeRef.current = next;
        setActiveIndex(next);
      }
    };

    const onScroll = () => {
      if (frame !== null) return;
      frame = requestAnimationFrame(update);
    };

    /* Primer cálculo en el siguiente frame: no se toca estado dentro del efecto. */
    frame = requestAnimationFrame(update);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, [enabled, itemCount, sectionRef, trackRef, viewportRef]);

  return { activeIndex };
}
