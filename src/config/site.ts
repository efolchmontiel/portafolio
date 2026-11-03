/**
 * Constantes públicas del sitio.
 *
 * El build de GitHub Pages no tiene acceso a `.env.local` (ignorado por git a
 * propósito), así que los datos de contacto públicos viven acá: son URLs y un
 * correo destino, exactamente lo mismo que ya viaja al bundle del navegador.
 * Las variables `NEXT_PUBLIC_*` siguen teniendo prioridad para desarrollo local.
 */

/** Subruta del sitio publicado: `https://efolchmontiel.github.io/portafolio/`. */
export const SITE_BASE_PATH = "/portafolio";

export const PUBLIC_CONTACT = {
  githubUrl: "https://github.com/efolchmontiel",
  linkedinUrl: "https://www.linkedin.com/in/erick-folch-649018449/",
  email: "e.folchmontiel@gmail.com",
} as const;
