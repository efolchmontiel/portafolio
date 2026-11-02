/** Punto de una constelación en un plano normalizado 0–100. */
export type StarPoint = readonly [x: number, y: number];

/** Par de índices de `stars` que define una línea. */
export type StarLink = readonly [from: number, to: number];

export interface ZodiacSign {
  readonly id: string;
  readonly name: string;
  /** Rango de fechas, ya formateado para mostrar. */
  readonly dates: string;
  /** Estrellas en coordenadas 0–100. La primera es la principal. */
  readonly stars: readonly StarPoint[];
  readonly lines: readonly StarLink[];
}
