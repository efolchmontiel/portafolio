"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { useAmbientAudio } from "@/hooks/useAmbientAudio";
import { ambientAudio } from "@/config/audio";

type AmbientAudioContextValue = {
  readonly isPlaying: boolean;
  readonly isPrimed: boolean;
  readonly isAvailable: boolean;
  readonly toggle: () => void;
  /** Enciende el audio audible; lo usa la portada de entrada. */
  readonly startAudible: () => void;
  /** Entra sin sonido y no vuelve a arrancar solo. */
  readonly startSilent: () => void;
  readonly audioRef: React.RefObject<HTMLAudioElement | null>;
  readonly isGateOpen: boolean;
  readonly closeGate: () => void;
};

const AmbientAudioContext = createContext<AmbientAudioContextValue | null>(null);

/**
 * Comparte el estado del audio entre la barra superior y la portada de
 * entrada: el elemento es uno solo y los dos controles mandan sobre él.
 */
export function AmbientAudioProvider({ children }: { children: ReactNode }) {
  const audio = useAmbientAudio();
  const { audioRef } = audio;
  const [isGateOpen, setIsGateOpen] = useState(true);

  const value = useMemo<AmbientAudioContextValue>(
    () => ({
      ...audio,
      isGateOpen,
      closeGate: () => setIsGateOpen(false),
      startSilent: () => {
        audio.pause();
        setIsGateOpen(false);
      },
    }),
    [audio, isGateOpen],
  );

  return (
    <AmbientAudioContext.Provider value={value}>
      {children}
      <audio ref={audioRef} src={ambientAudio.src} loop preload="metadata" />
    </AmbientAudioContext.Provider>
  );
}

export function useAmbientAudioContext(): AmbientAudioContextValue {
  const value = useContext(AmbientAudioContext);
  if (!value) {
    throw new Error("useAmbientAudioContext debe usarse dentro de AmbientAudioProvider");
  }
  return value;
}
