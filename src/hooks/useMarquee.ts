"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent, KeyboardEvent } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { clamp } from "@/lib/validation";

/** Velocidad de deriva en píxeles por segundo. */
const SPEED_PX_PER_S = 24;
/** Cuánto salta una flecha: algo menos que el ancho de una tarjeta. */
const NUDGE_PX = 350;
/** Pausa después de soltar el arrastre, para que no retome de golpe. */
const RESUME_DELAY_MS = 1400;

type MarqueeOptions = {
  /** Cantidad de elementos; el track se duplica para el bucle sin corte. */
  itemCount: number;
};

export type MarqueeHandlers = {
  readonly onPointerEnter: () => void;
  readonly onPointerLeave: () => void;
  readonly onPointerDown: (event: ReactPointerEvent<HTMLElement>) => void;
  readonly onPointerMove: (event: ReactPointerEvent<HTMLElement>) => void;
  readonly onPointerUp: () => void;
  readonly onPointerCancel: () => void;
  readonly onFocus: () => void;
  readonly onBlur: () => void;
  readonly onKeyDown: (event: KeyboardEvent<HTMLElement>) => void;
  readonly onClickCapture: (event: { preventDefault: () => void }) => void;
};

/**
 * Marquesina horizontal con avance automático, pausa y arrastre.
 *
 * El desplazamiento vive en una ref: si fuera estado, el bucle de animación
 * re-renderizaría la lista sesenta veces por segundo. Solo `progress` es
 * estado, y se actualiza a ~10 fps porque alimenta una barra de 1 px.
 *
 * Se detiene al salir de pantalla, al enfocar, al arrastrar y con
 * `prefers-reduced-motion`, que es lo que pide cualquier contenido que se
 * mueve solo.
 */
export function useMarquee({ itemCount }: MarqueeOptions) {
  const reducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const offsetRef = useRef(0);
  const halfRef = useRef(0);
  const frameRef = useRef<number | null>(null);
  const lastTickRef = useRef(0);
  const lastProgressRef = useRef(0);
  const dragStartXRef = useRef(0);
  const dragStartOffsetRef = useRef(0);
  const resumeTimerRef = useRef<number | null>(null);

  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hasFocus, setHasFocus] = useState(false);
  const [isInView, setIsInView] = useState(true);
  const dragDistanceRef = useRef(0);
  const [progress, setProgress] = useState(0);

  const shouldRun =
    !isPaused && !isHovered && !hasFocus && !isDragging && isInView && !reducedMotion;

  const render = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    track.style.transform = `translate3d(${offsetRef.current.toFixed(2)}px, 0, 0)`;
  }, []);

  const normalize = useCallback(() => {
    const half = halfRef.current;
    if (half <= 0) return;
    if (offsetRef.current <= -half) offsetRef.current += half;
    if (offsetRef.current > 0) offsetRef.current -= half;
  }, []);

  /* Medición: el track contiene la lista dos veces. */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const measure = () => {
      halfRef.current = track.scrollWidth / 2;
      normalize();
      render();
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    return () => observer.disconnect();
  }, [itemCount, normalize, render]);

  /* Solo se anima mientras la sección está en pantalla. */
  useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry?.isIntersecting ?? true),
      { threshold: 0.05 },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  /* Bucle de deriva. */
  useEffect(() => {
    if (!shouldRun) {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
      return;
    }

    lastTickRef.current = performance.now();

    const step = (now: number) => {
      const delta = Math.min((now - lastTickRef.current) / 1000, 0.05);
      lastTickRef.current = now;

      offsetRef.current -= SPEED_PX_PER_S * delta;
      normalize();
      render();

      const half = halfRef.current;
      if (half > 0 && now - lastProgressRef.current > 100) {
        lastProgressRef.current = now;
        const wrapped = ((-offsetRef.current % half) + half) % half;
        setProgress(clamp(wrapped / half, 0, 1));
      }

      frameRef.current = requestAnimationFrame(step);
    };

    frameRef.current = requestAnimationFrame(step);
    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };
  }, [shouldRun, normalize, render]);

  useEffect(
    () => () => {
      if (resumeTimerRef.current !== null) {
        window.clearTimeout(resumeTimerRef.current);
      }
    },
    [],
  );

  const nudge = useCallback(
    (direction: 1 | -1) => {
      offsetRef.current -= direction * NUDGE_PX;
      normalize();
      render();
    },
    [normalize, render],
  );

  const togglePause = useCallback(() => setIsPaused((value) => !value), []);
  const next = useCallback(() => nudge(1), [nudge]);
  const prev = useCallback(() => nudge(-1), [nudge]);

  const handlers: MarqueeHandlers = {
    onPointerEnter: () => setIsHovered(true),
    onPointerLeave: () => setIsHovered(false),
    onFocus: () => setHasFocus(true),
    onBlur: () => setHasFocus(false),

    onPointerDown: (event) => {
      if (event.pointerType === "mouse" && event.button !== 0) return;
      setIsDragging(true);
      dragDistanceRef.current = 0;
      dragStartXRef.current = event.clientX;
      dragStartOffsetRef.current = offsetRef.current;
      try {
        event.currentTarget.setPointerCapture(event.pointerId);
      } catch (error) {
        /* captura no disponible: el arrastre sigue por los handlers de move */
        console.error(
          error instanceof Error
            ? `No se pudo capturar el puntero: ${error.message}`
            : "No se pudo capturar el puntero",
        );
      }
      if (resumeTimerRef.current !== null) {
        window.clearTimeout(resumeTimerRef.current);
        resumeTimerRef.current = null;
      }
    },

    onPointerMove: (event) => {
      if (!isDragging) return;
      const delta = event.clientX - dragStartXRef.current;
      dragDistanceRef.current = Math.abs(delta);
      offsetRef.current = dragStartOffsetRef.current + delta;
      normalize();
      render();
    },

    onPointerUp: () => {
      if (!isDragging) return;
      setIsDragging(false);
      resumeTimerRef.current = window.setTimeout(() => {
        setIsHovered(false);
        resumeTimerRef.current = null;
      }, RESUME_DELAY_MS);
    },

    onPointerCancel: () => {
      if (!isDragging) return;
      setIsDragging(false);
    },

    onKeyDown: (event) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        nudge(1);
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        nudge(-1);
      }
      if (event.key === " ") {
        event.preventDefault();
        togglePause();
      }
    },

    /* Un arrastre no debe abrir el enlace del repositorio. */
    onClickCapture: (event) => {
      if (dragDistanceRef.current > 8) {
        event.preventDefault();
        dragDistanceRef.current = 0;
      }
    },
  };

  return {
    containerRef,
    trackRef,
    handlers,
    isPaused,
    isDragging,
    isInView,
    progress,
    togglePause,
    next,
    prev,
  };
}
