"use client";

import { useMemo } from "react";
import type { HorizonStoryState } from "@/models/horizon.model";
import { useScrollProgress } from "@/context/ScrollProgressContext";
import { useSceneInteraction } from "@/context/SceneInteractionContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useProjectsContactProgress } from "@/hooks/useProjectsContactProgress";

const FADE_IN = 0.12;
const FADE_OUT = 0.35;

function smoothstep(t: number) {
  return t * t * (3 - 2 * t);
}

function blendOpacity(p: number, fadeIn: number, fadeOut: number, phase: "in" | "out") {
  if (phase === "in") {
    if (p <= fadeIn) return 0;
    if (p >= fadeOut) return 1;
    const t = (p - fadeIn) / (fadeOut - fadeIn);
    return smoothstep(t);
  }
  if (p <= fadeIn) return 1;
  if (p >= fadeOut) return 0;
  const t = (p - fadeIn) / (fadeOut - fadeIn);
  return 1 - smoothstep(t);
}

/** Parallax suave — calibrado cerca de translate(7.7px) scale(1.019) al final del scroll */
export function useHorizonStory() {
  const { progress } = useScrollProgress();
  const { pointerX, pointerY } = useSceneInteraction();
  const contactPhase = useProjectsContactProgress();
  const reducedMotion = useReducedMotion();

  return useMemo((): HorizonStoryState => {
    const ninoOpacity = blendOpacity(contactPhase, FADE_IN, FADE_OUT, "out");
    const telescopioOpacity = blendOpacity(contactPhase, FADE_IN, FADE_OUT, "in");
    const isTelescopio = contactPhase >= FADE_OUT;

    let ninoParallax = "none";
    let telescopioParallax = "none";

    if (!reducedMotion) {
      const t = smoothstep(progress);
      const ninoTx = t * 4 + pointerX * 3;
      ninoParallax = `translate3d(${ninoTx}px, ${pointerY * 2}px, 0)`;

      const telTx = t * 7.69 + pointerX * 6;
      const telScale = 1 + t * 0.01922;
      telescopioParallax = `translate3d(${telTx}px, ${pointerY * 4}px, 0) scale(${telScale})`;
    }

    return {
      contactPhase,
      ninoOpacity,
      telescopioOpacity,
      isTelescopio,
      ninoParallax,
      telescopioParallax,
    };
  }, [progress, pointerX, pointerY, contactPhase, reducedMotion]);
}
