"use client";

/**
 * Campo de estrellas de respaldo y continuidad del cielo.
 *
 * Dos capas: `stars-backdrop` bajo la banda de horizonte y `stars-veil` por
 * encima, para que el cielo estrellado no se corte donde empieza el
 * resplandor del horizonte.
 */
export function StarsBackdrop() {
  return (
    <>
      <div
        className="stars-backdrop pointer-events-none fixed inset-0 z-[1] opacity-[0.45]"
        aria-hidden
      />
      <div
        className="stars-backdrop stars-veil pointer-events-none fixed inset-0 opacity-[0.55]"
        aria-hidden
      />
    </>
  );
}
