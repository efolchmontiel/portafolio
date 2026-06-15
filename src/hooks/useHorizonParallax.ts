"use client";

/** @deprecated Usar useHorizonStory — parallax ahora va por slot */
export function useHorizonParallax() {
  return { transform: "none", transformOrigin: "bottom left" as const };
}
