/**
 * Curva de entrada compartida por las secciones.
 *
 * Es la misma del sistema (`cubic-bezier(.22, 1, .36, 1)`): arranca rápido y
 * frena largo, así el contenido ya es visible mientras termina de asentarse.
 */
export const easeOut = [0.22, 1, 0.36, 1] as const;

/** Desplazamiento de entrada por defecto. */
export const revealOffset = 34;

/** Ventana de disparo: un poco antes de que el bloque toque el borde. */
export const revealViewport = { once: true, margin: "-12% 0px -8% 0px" } as const;
