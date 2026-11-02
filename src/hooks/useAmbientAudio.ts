"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ambientAudio } from "@/config/audio";
import { getErrorMessage } from "@/lib/errors";
import { clamp } from "@/lib/validation";

type AmbientAudioState = {
  /** Verdadero solo cuando el volumen es audible. */
  readonly isPlaying: boolean;
  /** Verdadero mientras suena en silencio esperando el primer gesto. */
  readonly isPrimed: boolean;
  readonly isAvailable: boolean;
  readonly toggle: () => void;
};

type PendingFrame = { current: number | null };

/** Gestos que el navegador acepta como activación del usuario. */
const ACTIVATION_EVENTS = ["pointerdown", "keydown", "touchstart", "wheel"] as const;

function fadeVolume(
  audio: HTMLAudioElement,
  to: number,
  durationMs: number,
  frame: PendingFrame,
): void {
  if (frame.current !== null) {
    cancelAnimationFrame(frame.current);
    frame.current = null;
  }

  const from = audio.volume;
  const start = performance.now();

  const step = () => {
    const elapsed = performance.now() - start;
    const ratio = durationMs <= 0 ? 1 : clamp(elapsed / durationMs, 0, 1);
    audio.volume = clamp(from + (to - from) * ratio, 0, 1);
    if (ratio < 1) {
      frame.current = requestAnimationFrame(step);
    } else {
      frame.current = null;
    }
  };

  frame.current = requestAnimationFrame(step);
}

/**
 * Música ambiente encendida por defecto.
 *
 * Ningún navegador deja sonar audio con volumen sin un gesto previo, así que
 * el arranque real es: reproducción **en silencio** apenas carga la página y
 * subida de volumen en el primer gesto (scroll, clic o tecla). Si el navegador
 * tampoco permite el arranque silencioso, queda a la espera del botón.
 *
 * Un pausa explícita del usuario gana: después de eso no vuelve sola.
 */
export function useAmbientAudio(): AmbientAudioState {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const userPausedRef = useRef(false);
  const primedRef = useRef(false);
  const playingRef = useRef(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isPrimed, setIsPrimed] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);

  const startAudible = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = false;
    const played = audio.play();
    if (played) {
      played.catch((error: unknown) => {
        setIsAvailable(false);
        setIsPlaying(false);
        console.error(
          getErrorMessage(error, "No se pudo reproducir la música ambiente"),
        );
      });
    }
    fadeVolume(audio, ambientAudio.targetVolume, ambientAudio.fadeInMs, frameRef);
    playingRef.current = true;
    setIsPlaying(true);
    setIsPrimed(false);
  }, []);

  /* Arranque silencioso: permitido sin gesto en todos los navegadores actuales. */
  useEffect(() => {
    /*
      React monta dos veces en desarrollo. Sin esta bandera, el rechazo del
      primer `play()` (interrumpido por el `pause()` del cleanup) llegaba
      después del segundo montaje y dejaba el estado en "no disponible".
    */
    let cancelled = false;

    const audio = new Audio(ambientAudio.src);
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = 0;
    audio.muted = true;
    audioRef.current = audio;

    const played = audio.play();
    if (played) {
      played
        .then(() => {
          if (cancelled || audioRef.current !== audio) return;
          primedRef.current = true;
          setIsPrimed(true);
        })
        .catch(() => {
          if (cancelled || audioRef.current !== audio) return;
          /* Sin autoplay silencioso: queda a la espera del botón. */
          primedRef.current = false;
          setIsPrimed(false);
        });
    }

    return () => {
      cancelled = true;
      audio.pause();
      audioRef.current = null;
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };
  }, []);

  /*
    Primer gesto: se levanta el silencio.
    No depende de que el arranque silencioso haya terminado —el buffer puede
    tardar más que el gesto— porque el gesto por sí solo ya habilita el audio.
  */
  useEffect(() => {
    const onFirstGesture = () => {
      if (userPausedRef.current || playingRef.current) return;
      primedRef.current = false;
      startAudible();
    };

    ACTIVATION_EVENTS.forEach((event) =>
      window.addEventListener(event, onFirstGesture, { once: true, passive: true }),
    );

    return () => {
      ACTIVATION_EVENTS.forEach((event) =>
        window.removeEventListener(event, onFirstGesture),
      );
    };
  }, [startAudible]);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      userPausedRef.current = true;
      fadeVolume(audio, 0, ambientAudio.fadeOutMs, frameRef);
      window.setTimeout(() => audio.pause(), ambientAudio.fadeOutMs);
      playingRef.current = false;
      setIsPlaying(false);
      return;
    }

    userPausedRef.current = false;
    startAudible();
  }, [isPlaying, startAudible]);

  return { isPlaying, isPrimed, isAvailable, toggle };
}
