/**
 * Pista de ambiente del sitio.
 *
 * Licencia CC BY 4.0: la atribución es obligatoria, por eso el crédito vive
 * acá y lo renderiza `AmbientAudio` junto al control.
 */
export const ambientAudio = {
  src: "/audio/quiet-night.mp3",
  title: "Quiet Night",
  author: "Purrple Cat",
  license: "CC BY 4.0",
  licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
  sourceUrl: "https://commons.wikimedia.org/wiki/File:Purrple_Cat_-_Quiet_Night.ogg",
  /** Volumen objetivo al activar; el artboard usa 0.42. */
  targetVolume: 0.42,
  fadeInMs: 2600,
  fadeOutMs: 700,
} as const;
