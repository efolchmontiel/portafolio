export interface ProcessPhase {
  readonly id: string;
  /** Número visible de la fase, ya formateado. */
  readonly step: string;
  readonly title: string;
  readonly detail: string;
}
