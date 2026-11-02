export interface TimelineStop {
  readonly id: string;
  readonly period: string;
  readonly org: string;
  readonly detail: string;
  /** Marca la etapa vigente: se pinta distinto en el rail. */
  readonly isCurrent?: boolean;
}
