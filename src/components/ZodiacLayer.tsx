"use client";

import { usePointerParallax } from "@/hooks/usePointerParallax";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useZodiacSign } from "@/hooks/useZodiacSign";

const VIEW_BOX = "-6 -6 112 112";
const LINE_DELAY_MS = 90;
const STAR_DELAY_MS = 70;
const STAR_BASE_DELAY_MS = 500;

/**
 * Constelación del zodíaco en el cielo.
 *
 * Los puntos y líneas **son** los signos: cada tramo del scroll revela uno, y
 * las líneas se dibujan con `stroke-dashoffset` al entrar. La `key` remonta el
 * SVG para que la animación vuelva a correr en cada cambio de signo.
 */
export function ZodiacLayer() {
  const sign = useZodiacSign();
  const reducedMotion = useReducedMotion();
  /* El cielo acompaña al puntero: es la interacción más barata del sitio. */
  const parallaxRef = usePointerParallax<HTMLDivElement>({ strength: 14 });

  return (
    <div className="zodiac" aria-hidden ref={parallaxRef}>
      <p className="zodiac__label">
        <b>{sign.name}</b>
        <span>{sign.dates}</span>
      </p>

      <svg
        key={sign.id}
        className="zodiac__svg"
        viewBox={VIEW_BOX}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {sign.lines.map(([from, to], index) => {
          const start = sign.stars[from];
          const end = sign.stars[to];
          if (!start || !end) return null;
          return (
            <line
              key={`line-${index}`}
              className="zodiac__line"
              x1={start[0]}
              y1={start[1]}
              x2={end[0]}
              y2={end[1]}
              style={
                reducedMotion
                  ? undefined
                  : { animationDelay: `${(index * LINE_DELAY_MS) / 1000}s` }
              }
            />
          );
        })}

        {sign.stars.map(([x, y], index) => (
          <circle
            key={`star-${index}`}
            className={
              index === 0 ? "zodiac__star zodiac__star--bright" : "zodiac__star"
            }
            cx={x}
            cy={y}
            r={index === 0 ? 2.6 : 1.7}
            style={
              reducedMotion
                ? undefined
                : {
                    animationDelay: `${
                      (STAR_BASE_DELAY_MS + index * STAR_DELAY_MS) / 1000
                    }s`,
                  }
            }
          />
        ))}
      </svg>
    </div>
  );
}
