import type { CraftMotif } from "@/models/craft.model";

/**
 * Motivos del stack.
 *
 * SVG dibujados a mano, un trazo por celda, todos con el mismo grosor y
 * remates redondeados. El color sale del acento heredado (`currentColor`).
 */
export function CraftIcon({ motif }: { motif: CraftMotif }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.4,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  } as const;

  if (motif === "server") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden {...common}>
        <rect x="3" y="4" width="18" height="6" rx="2" />
        <rect x="3" y="14" width="18" height="6" rx="2" />
        <path d="M7 7h.01M7 17h.01" />
      </svg>
    );
  }

  if (motif === "browser") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden {...common}>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M3 9h18M7 6.5h.01M10 6.5h.01" />
        <path d="M7 13h6M7 16.5h9" />
      </svg>
    );
  }

  if (motif === "database") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden {...common}>
        <ellipse cx="12" cy="6" rx="8" ry="3" />
        <path d="M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6" />
        <path d="M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" />
      </svg>
    );
  }

  if (motif === "phone") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden {...common}>
        <rect x="7" y="3" width="10" height="18" rx="2.5" />
        <path d="M11 18.5h2" />
      </svg>
    );
  }

  if (motif === "shield") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden {...common}>
        <path d="M12 3l7 3v6c0 4.2-2.9 7.6-7 9-4.1-1.4-7-4.8-7-9V6l7-3z" />
        <path d="M9 12l2.2 2.2L15.5 10" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden {...common}>
      <path d="M12 3l1.8 4.9L19 9.7l-5.2 1.8L12 16.4l-1.8-4.9L5 9.7l5.2-1.8L12 3z" />
      <path d="M18.5 15l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8.8-2.2z" />
    </svg>
  );
}
