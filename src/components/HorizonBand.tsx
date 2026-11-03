"use client";

/**
 * Banda de horizonte luminosa.
 *
 * Es la pieza que hace legible la silueta: un relleno negro sobre
 * --night-deep da 1.05:1 y desaparece. La banda levanta la luminancia
 * del borde inferior del cielo sin tapar el contenido.
 */
export function HorizonBand() {
  return <div className="horizon-band" aria-hidden />;
}
