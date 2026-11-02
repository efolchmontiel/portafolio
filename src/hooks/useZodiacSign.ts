"use client";

import { useMemo } from "react";
import { useScrollProgress } from "@/context/ScrollProgressContext";
import { zodiacSigns } from "@/data/zodiac";
import { clamp } from "@/lib/validation";
import type { ZodiacSign } from "@/models/zodiac.model";

/**
 * Traduce el progreso de scroll (0–1) al signo que corresponde.
 *
 * El recorrido se reparte en doce tramos iguales: al terminar el documento se
 * completó la rueda del zodíaco.
 */
export function useZodiacSign(): ZodiacSign {
  const { progress } = useScrollProgress();

  return useMemo(() => {
    const normalized = clamp(progress, 0, 1);
    const index = Math.min(
      zodiacSigns.length - 1,
      Math.floor(normalized * zodiacSigns.length),
    );
    return zodiacSigns[index] ?? zodiacSigns[0];
  }, [progress]);
}
