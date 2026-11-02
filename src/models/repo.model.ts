/** Familia de color del repositorio; mapea a un token de acento. */
export type RepoAccent = "cyan" | "violet" | "teal" | "amber";

/** Ilustración SVG que acompaña la tarjeta. */
export type RepoArt = "waveform" | "pixels" | "terminal" | "meter";

export interface Repo {
  readonly id: string;
  /** Nombre real del repositorio en GitHub. */
  readonly name: string;
  readonly description: string;
  readonly language: string;
  readonly accent: RepoAccent;
  readonly art: RepoArt;
  /** Fecha de último push, ISO corto (YYYY-MM-DD). */
  readonly pushedAt: string;
  readonly href: string;
}
