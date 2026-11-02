"use client";

import { pseudoRandom } from "@/lib/pseudoRandom";

type MeteorProps = {
  /** Posición vertical inicial, en % del alto del contenedor. */
  top: string;
  left: string;
  animationDelay: string;
  animationDuration: string;
};

type MeteorsProps = {
  number?: number;
  className?: string;
};

const MAX_METEORS = 40;

/**
 * Meteoros decorativos.
 *
 * Las posiciones se derivan del índice con `pseudoRandom`: el resultado es el
 * mismo en servidor y cliente, así que no hace falta generarlas en un efecto
 * (eso provocaba un render en cascada y un desajuste de hidratación).
 */
function buildMeteors(count: number): readonly MeteorProps[] {
  const total = Math.max(0, Math.min(count, MAX_METEORS));
  return Array.from({ length: total }, (_, index) => {
    const seed = index + 0.5;
    return {
      top: `${Math.floor(pseudoRandom(seed) * 48)}%`,
      left: `${Math.floor(pseudoRandom(seed * 7.3) * 28) - 18}%`,
      animationDelay: `${(pseudoRandom(seed * 13.7) * 0.6 + 0.2).toFixed(2)}s`,
      animationDuration: `${Math.floor(pseudoRandom(seed * 21.1) * 8) + 2}s`,
    };
  });
}

export function Meteors({ number = 20, className }: MeteorsProps) {
  const meteors = buildMeteors(number);

  return (
    <>
      {meteors.map((meteor, index) => (
        <span
          key={`meteor-${index}`}
          className={[
            "meteor-spark animate-meteor-effect absolute h-0.5 w-0.5 rounded-full bg-slate-500",
            "before:absolute before:top-1/2 before:h-px before:w-[50px] before:-translate-y-1/2 before:bg-gradient-to-r before:from-slate-500 before:to-transparent before:content-['']",
            className,
          ]
            .filter(Boolean)
            .join(" ")}
          style={meteor}
        />
      ))}
    </>
  );
}
