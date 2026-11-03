"use client";

import { ambientAudio } from "@/config/audio";

/**
 * Pie de página.
 *
 * Acá vive el crédito de la música: la licencia CC BY 4.0 obliga a acreditar
 * la autoría, y el lugar correcto es el pie, no el control de sonido.
 */
export function Colophon() {
  return (
    <footer className="colophon">
      <p className="colophon__line">
        {ambientAudio.title} · {ambientAudio.author} ·{" "}
        <a href={ambientAudio.licenseUrl} target="_blank" rel="noopener noreferrer">
          {ambientAudio.license}
        </a>
      </p>
      <p className="colophon__line">
        Erick Christian Folch Montiel · Ingeniero Civil Informático
      </p>
    </footer>
  );
}
