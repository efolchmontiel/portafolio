"use client";

import type { ReactNode } from "react";
import { useProjectsContactProgress } from "@/hooks/useProjectsContactProgress";

const FADE = 0.18;

function smoothOpacity(p: number, start: number, end: number): number {
  if (p < start || p > end) return 0;
  const span = end - start;
  const fade = Math.min(FADE, span * 0.4);
  const local = p - start;
  if (local < fade) return local / fade;
  if (local > span - fade) return (span - local) / fade;
  return 1;
}

type ConstellationSvgProps = {
  opacity: number;
  label: string;
  /** viewBox ajustado al dibujo para que el nombre quede pegado debajo */
  viewBox: string;
  children: ReactNode;
};

function ConstellationSvg({
  opacity,
  label,
  viewBox,
  children,
}: ConstellationSvgProps) {
  if (opacity < 0.03) return null;
  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-700 ease-in-out"
      style={{ opacity }}
      aria-hidden
    >
      <svg
        className="w-full max-w-full shrink-0"
        style={{ maxHeight: "calc(100% - 1.35rem)" }}
        viewBox={viewBox}
        preserveAspectRatio="xMidYMid meet"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {children}
      </svg>
      <span className="mt-1.5 shrink-0 text-center text-[10px] uppercase tracking-[0.22em] text-accent-cyan/75">
        {label}
      </span>
    </div>
  );
}

/** Constelaciones fijas a la derecha — no compiten con la tarjeta de contacto */
export function ConstellationsLayer() {
  const p = useProjectsContactProgress();

  if (p <= 0.01) return null;

  const leo = smoothOpacity(p, 0.05, 0.38);
  const libra = smoothOpacity(p, 0.34, 0.68);
  const virgo = smoothOpacity(p, 0.64, 0.98);

  return (
    <div
      className="constellations-layer pointer-events-none fixed inset-0 z-[4] overflow-hidden"
      aria-hidden
    >
      <div className="absolute top-[14%] bottom-[18%] right-[4%] w-[min(200px,22vw)] max-lg:right-[2%] max-lg:w-[min(160px,28vw)]">
        <ConstellationSvg opacity={leo} label="Leo" viewBox="8 38 64 38">
          <g stroke="#7dd3fc" strokeWidth="0.35" strokeLinecap="round" opacity="0.85">
            <line x1="12" y1="55" x2="28" y2="42" />
            <line x1="28" y1="42" x2="48" y2="48" />
            <line x1="48" y1="48" x2="68" y2="58" />
            <line x1="68" y1="58" x2="52" y2="72" />
            <line x1="52" y1="72" x2="22" y2="68" />
            <line x1="22" y1="68" x2="12" y2="55" />
            <line x1="28" y1="42" x2="52" y2="72" />
          </g>
          <g fill="#c4b5fd">
            <circle cx="12" cy="55" r="1.2" />
            <circle cx="28" cy="42" r="1.4" />
            <circle cx="48" cy="48" r="1.2" />
            <circle cx="68" cy="58" r="1.2" />
            <circle cx="52" cy="72" r="1.2" />
            <circle cx="22" cy="68" r="1" />
          </g>
        </ConstellationSvg>

        <ConstellationSvg opacity={libra} label="Libra" viewBox="20 18 60 64">
          <g stroke="#7dd3fc" strokeWidth="0.35" opacity="0.85">
            <line x1="25" y1="35" x2="50" y2="22" />
            <line x1="50" y1="22" x2="75" y2="35" />
            <line x1="50" y1="22" x2="50" y2="55" />
            <line x1="75" y1="35" x2="50" y2="55" />
            <line x1="25" y1="35" x2="50" y2="55" />
            <line x1="50" y1="55" x2="50" y2="78" />
          </g>
          <g fill="#c4b5fd">
            <circle cx="25" cy="35" r="1.1" />
            <circle cx="50" cy="22" r="1.3" />
            <circle cx="75" cy="35" r="1.1" />
            <circle cx="50" cy="55" r="1.1" />
            <circle cx="50" cy="78" r="1" />
          </g>
        </ConstellationSvg>

        <ConstellationSvg opacity={virgo} label="Virgo" viewBox="28 8 44 86">
          <g stroke="#7dd3fc" strokeWidth="0.35" opacity="0.85">
            <line x1="50" y1="12" x2="38" y2="32" />
            <line x1="50" y1="12" x2="62" y2="32" />
            <line x1="38" y1="32" x2="50" y2="48" />
            <line x1="62" y1="32" x2="50" y2="48" />
            <line x1="50" y1="48" x2="50" y2="62" />
            <line x1="50" y1="62" x2="50" y2="82" />
            <line x1="50" y1="82" x2="32" y2="90" />
            <line x1="50" y1="82" x2="68" y2="90" />
          </g>
          <g fill="#c4b5fd">
            <circle cx="50" cy="12" r="1.3" />
            <circle cx="38" cy="32" r="1" />
            <circle cx="62" cy="32" r="1" />
            <circle cx="50" cy="48" r="1.1" />
            <circle cx="50" cy="62" r="1" />
            <circle cx="50" cy="82" r="1.1" />
          </g>
        </ConstellationSvg>
      </div>
    </div>
  );
}
