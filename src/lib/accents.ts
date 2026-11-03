import type { CSSProperties } from "react";

/** Familias de acento del sistema; cada una mapea a un token de color. */
export type Accent = "cyan" | "violet" | "teal" | "amber";

export const accentVar: Record<Accent, string> = {
  cyan: "var(--accent-cyan)",
  violet: "var(--accent-violet)",
  teal: "var(--accent-teal)",
  amber: "var(--accent-amber)",
};

type AccentStyle = CSSProperties & { "--accent"?: string };

/** Variables CSS para que una tarjeta herede su acento sin clases dinámicas. */
export function accentStyle(accent: Accent): AccentStyle {
  return { "--accent": accentVar[accent] };
}
