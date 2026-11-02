"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ambientAudio } from "@/config/audio";
import { getErrorMessage } from "@/lib/errors";
import { clamp } from "@/lib/validation";

type AmbientAudioState = {
  readonly isPlaying: boolean;
  readonly isAvailable: boolean;
  readonly toggle: () => void;
};

type PendingFrame = { current: number | null };

/**
 * Funde el volumen hasta `to` sin cortar el audio.
 * Usa rAF y cancela cualquier fundido anterior.
 */
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
 * Control de música ambiente.
 *
 * Nunca hace autoplay: el navegador lo bloquea y sería intrusivo. El primer
 * clic es el gesto que habilita la reproducción.
 */
export function useAmbientAudio(): AmbientAudioState {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);

  useEffect(() => {
    const audio = new Audio(ambientAudio.src);
    audio.loop = true;
    audio.preload = "none";
    audio.volume = 0;
    audioRef.current = audio;

    const onEnded = () => setIsPlaying(false);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("ended", onEnded);
      audio.pause();
      audioRef.current = null;
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };
  }, []);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      fadeVolume(
        audio,
        0,
        ambientAudio.fadeOutMs,
        frameRef,
      );
      window.setTimeout(() => audio.pause(), ambientAudio.fadeOutMs);
      setIsPlaying(false);
      return;
    }

    audio.volume = 0;
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
    setIsPlaying(true);
  }, [isPlaying]);

  return { isPlaying, isAvailable, toggle };
}
