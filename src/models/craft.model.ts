import type { Accent } from "@/lib/accents";

/** Motivo dibujado que acompaña cada celda del stack. */
export type CraftMotif =
  | "server"
  | "browser"
  | "database"
  | "phone"
  | "shield"
  | "spark";

export interface CraftCell {
  readonly id: string;
  readonly title: string;
  readonly detail: string;
  readonly accent: Accent;
  readonly motif: CraftMotif;
}
