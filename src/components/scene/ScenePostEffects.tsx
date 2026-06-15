"use client";

/**
 * Post-procesado WebGL (Bloom/Vignette) desactivado: EffectComposer falla cuando
 * getContextAttributes() es null en algunos drivers/navegadores.
 * Viñeta en .canvas-layer::after (globals.css).
 */
export function ScenePostEffects() {
  return null;
}
