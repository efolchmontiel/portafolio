"use client";

/**
 * Capa ligera de estrellas CSS — respaldo cuando la cámara 3D no encuadra el cielo lejano.
 * Siempre visible, muy sutil; no compite con las constelaciones SVG.
 */
export function StarsBackdrop() {
  return (
    <div
      className="stars-backdrop pointer-events-none fixed inset-0 z-[1] opacity-[0.45]"
      aria-hidden
    />
  );
}
