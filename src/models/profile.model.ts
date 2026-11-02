export interface ProfileMeta {
  readonly label: string;
  readonly value: string;
}

export interface Profile {
  readonly name: string;
  readonly role: string;
  readonly location: string;
  /** Titular en dos líneas; la segunda se pinta en contorno. */
  readonly headline: readonly [string, string];
  readonly summary: string;
  readonly meta: readonly ProfileMeta[];
  readonly ctaPrimary: string;
  readonly ctaSecondary: string;
}
