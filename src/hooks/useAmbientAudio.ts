"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ambientAudio } from "@/config/audio";
import { getErrorMessage } from "@/lib/errors";
import { clamp } from "@/lib/validation";

type AmbientAudioState = {
  /** Verdadero solo cuando suena y se oye: ni pausado, ni silenciado. */
  readonly isPlaying: boolean;
  /** Suena en silencio, esperando el gesto que levanta el mute. */
  readonly isPrimed: boolean;
  readonly isAvailable: boolean;
  readonly toggle: () => void;
  /** Enciende el audio audible; lo usa la portada de entrada. */
  readonly startAudible: () => void;
  /** Baja el volumen y pausa. */
  readonly pause: () => void;
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
 * La regla del navegador: sin un gesto previo no se puede sonar con volumen,
 * pero sí en silencio. Así que arranca muteada y el primer gesto levanta el
 * mute.
 *
 * El estado **se deriva del elemento** (`paused`, `muted`, `volume`) y se
 * sincroniza con sus eventos. Deducirlo por dentro es lo que hacía que la
 * interfaz dijera "Sonando" con el audio en silencio.
 */
export function useAmbientAudio(): AmbientAudioState & {
  readonly audioRef: React.RefObject<HTMLAudioElement | null>;
} {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const userPausedRef = useRef(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isPrimed, setIsPrimed] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);

  /** Lee el elemento y refleja lo que realmente está pasando. */
  const syncState = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const running = !audio.paused;
    const audible = running && !audio.muted && audio.volume > 0.001;
    setIsPlaying(audible);
    setIsPrimed(running && !audible);
  }, []);

  /*
    Arranque silencioso: permitido sin gesto en todos los navegadores actuales.
    Se reintenta porque el primer `play()` puede quedar interrumpido por el
    desmontaje doble de React en desarrollo; un solo intento no alcanza.
  */
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0;
    audio.muted = true;

    const events = ["playing", "pause", "volumechange", "emptied"] as const;
    events.forEach((event) => audio.addEventListener(event, syncState));

    let attempt = 0;
    const timers: number[] = [];

    const prime = () => {
      if (attempt >= 4) return;
      attempt += 1;
      if (userPausedRef.current || !audio.paused) {
        syncState();
        return;
      }
      audio.muted = true;
      const played = audio.play();
      if (played) {
        played.catch(() => {
          timers.push(window.setTimeout(prime, 250 * attempt));
        });
      }
    };

    prime();
    syncState();

    const onVisible = () => {
      if (document.visibilityState === "visible" && audio.paused) prime();
    };
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      document.removeEventListener("visibilitychange", onVisible);
      timers.forEach((timer) => window.clearTimeout(timer));
      events.forEach((event) => audio.removeEventListener(event, syncState));
      audio.pause();
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };
  }, [syncState]);

  /** Deja el audio audible: quita el mute, asegura reproducción y sube volumen. */
  const startAudible = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = false;
    audio.defaultMuted = false;

    const played = audio.play();
    if (played) {
      played.catch((error: unknown) => {
        setIsAvailable(false);
        console.error(
          getErrorMessage(error, "No se pudo reproducir la música ambiente"),
        );
        syncState();
      });
    }

    fadeVolume(audio, ambientAudio.targetVolume, ambientAudio.fadeInMs, frameRef);
    syncState();
  }, [syncState]);

  /*
    Primer gesto: se levanta el silencio. No depende de que el arranque
    silencioso haya terminado —el buffer puede tardar más que el gesto—
    porque el gesto por sí solo ya habilita el audio.
  */
  useEffect(() => {
    const onFirstGesture = () => {
      if (userPausedRef.current) return;
      const audio = audioRef.current;
      if (!audio || !audio.muted) return;
      startAudible();
    };

    ACTIVATION_EVENTS.forEach((event) =>
      window.addEventListener(event, onFirstGesture, { passive: true }),
    );

    return () => {
      ACTIVATION_EVENTS.forEach((event) =>
        window.removeEventListener(event, onFirstGesture),
      );
    };
  }, [startAudible]);

  const pause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    userPausedRef.current = true;
    fadeVolume(audio, 0, ambientAudio.fadeOutMs, frameRef);
    window.setTimeout(() => audio.pause(), ambientAudio.fadeOutMs);
    syncState();
  }, [syncState]);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    /* Se decide por el elemento, no por el estado del render. */
    const isAudible = !audio.paused && !audio.muted && audio.volume > 0.001;

    if (isAudible) {
      pause();
      return;
    }

    userPausedRef.current = false;
    startAudible();
  }, [pause, startAudible]);

  return {
    isPlaying,
    isPrimed,
    isAvailable,
    toggle,
    startAudible,
    pause,
    audioRef,
  };
}
