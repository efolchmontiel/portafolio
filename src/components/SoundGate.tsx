"use client";

import { motion } from "framer-motion";
import { profile } from "@/data/profile";
import { accentStyle } from "@/lib/accents";
import { easeOut } from "@/lib/motion";
import { useAmbientAudioContext } from "@/context/AmbientAudioContext";

/**
 * Portada de entrada.
 *
 * Los navegadores no permiten audio audible sin un gesto previo. En lugar de
 * arrancar en silencio y esperar a que el visitante toque cualquier cosa, la
 * página abre con esta portada: un clic deliberado enciende el sonido, y hay
 * una salida explícita para quien prefiera entrar sin él.
 */
export function SoundGate() {
  const { startAudible, startSilent, closeGate, isGateOpen } =
    useAmbientAudioContext();

  if (!isGateOpen) return null;

  return (
    <motion.div
      className="sound-gate"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="sound-gate-title"
    >
      <div className="sound-gate__glow" aria-hidden />

      <motion.div
        className="sound-gate__inner"
        initial={{ y: 18, filter: "blur(8px)" }}
        animate={{ y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.9, ease: easeOut }}
      >
        <p className="label">{profile.location}</p>

        <h1 id="sound-gate-title" className="display sound-gate__title">
          {profile.headline[0]}
          <br />
          <span className="display-outline">{profile.headline[1]}</span>
        </h1>

        <p className="sound-gate__copy">
          Este portafolio se mira con sonido. Hay una pista ambiente para
          acompañar el cielo.
        </p>

        <div className="sound-gate__actions">
          <button
            type="button"
            className="btn btn--primary"
            style={accentStyle("cyan")}
            onClick={() => {
              startAudible();
              closeGate();
            }}
          >
            <svg width="13" height="13" viewBox="0 0 14 14" fill="currentColor" aria-hidden>
              <path d="M2 1l10 6-10 6z" />
            </svg>
            Entrar con sonido
          </button>

          <button
            type="button"
            className="btn btn--ghost"
            style={accentStyle("violet")}
            onClick={startSilent}
          >
            Entrar en silencio
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
