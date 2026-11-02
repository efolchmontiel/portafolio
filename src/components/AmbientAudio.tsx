"use client";

import { useAmbientAudio } from "@/hooks/useAmbientAudio";
import { ambientAudio } from "@/config/audio";

const BAR_COUNT = 4;

/**
 * Control de música ambiente.
 *
 * Muestra el crédito de autoría cuando está sonando: la licencia de la pista
 * (CC BY 4.0) lo exige y es más honesto que esconderlo en un pie.
 */
export function AmbientAudio() {
  const { isPlaying, isPrimed, isAvailable, toggle, audioRef } =
    useAmbientAudio();

  const label = !isAvailable
    ? "Audio no disponible"
    : isPlaying
      ? "Pausar el sonido ambiente"
      : "Activar el sonido ambiente";

  const status = isPlaying ? "Sonando" : "Sonido";

  return (
    <div className="site-audio">
      {/*
        El elemento vive en el DOM: así su estado real (paused, muted, volume)
        es inspeccionable y el hook lo lee en vez de deducirlo.
      */}
      <audio ref={audioRef} src={ambientAudio.src} loop preload="metadata" />
      <button
        type="button"
        onClick={toggle}
        aria-pressed={isPlaying}
        data-primed={isPrimed || undefined}
        aria-label={label}
        className="site-audio__button"
        disabled={!isAvailable}
      >
        <span className="site-audio__bars" aria-hidden>
          {Array.from({ length: BAR_COUNT }, (_, index) => (
            <i
              key={index}
              className="site-audio__bar"
              data-bar={index + 1}
              style={{ animationDelay: `${index * 0.15}s` }}
            />
          ))}
        </span>
        <span className="site-audio__label">{status}</span>
      </button>

    </div>
  );
}
