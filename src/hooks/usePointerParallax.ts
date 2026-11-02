"use client";

import { useEffect, useRef } from "react";
import type { RefObject } from "react";
import { clamp } from "@/lib/validation";

type PointerParallaxOptions = {
  /** Recorrido máximo en píxeles hacia cada lado. */
  readonly strength?: number;
  /** Suavizado: más bajo, más lento. */
  readonly easing?: number;
};

/**
 * Desplaza un elemento en función del puntero, sin re-renderizar React.
 *
 * Escribe `transform` directo sobre el nodo: el movimiento tiene que ser
 * continuo, y pasarlo por estado obligaría a React a re-renderizar en cada
 * movimiento del mouse.
 */
export function usePointerParallax<T extends HTMLElement>({
  strength = 12,
  easing = 0.06,
}: PointerParallaxOptions = {}): RefObject<T | null> {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let frame: number | null = null;

    const onMove = (event: PointerEvent) => {
      targetX = clamp((event.clientX / window.innerWidth) * 2 - 1, -1, 1);
      targetY = clamp((event.clientY / window.innerHeight) * 2 - 1, -1, 1);
      if (frame === null) frame = requestAnimationFrame(tick);
    };

    const tick = () => {
      currentX += (targetX - currentX) * easing;
      currentY += (targetY - currentY) * easing;
      element.style.transform = `translate3d(${(currentX * strength).toFixed(2)}px, ${(
        currentY * strength
      ).toFixed(2)}px, 0)`;

      const settled =
        Math.abs(targetX - currentX) < 0.001 &&
        Math.abs(targetY - currentY) < 0.001;

      frame = settled ? null : requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, [strength, easing]);

  return ref;
}
