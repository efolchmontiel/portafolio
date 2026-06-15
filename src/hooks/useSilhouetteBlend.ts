"use client";

import { useHorizonStory } from "@/hooks/useHorizonStory";

/** @deprecated Usar useHorizonStory */
export function useSilhouetteBlend() {
  const { contactPhase, ninoOpacity, telescopioOpacity } = useHorizonStory();
  return {
    phase: contactPhase,
    ninoOpacity,
    telescopioOpacity,
    isContact: contactPhase > 0.7,
  };
}
