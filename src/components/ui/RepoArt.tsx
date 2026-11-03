import type { RepoArt as RepoArtKind } from "@/models/repo.model";

const WAVE_HEIGHTS = [7, 15, 24, 33, 21, 29, 36, 18, 26, 34, 22, 30, 14, 24, 17, 9];
const BAR_HEIGHTS = [9, 16, 12, 22, 30, 17, 25, 34, 20, 28, 14, 10];
const PIXEL_MAP: readonly (readonly [number, number])[] = [
  [10, 8], [22, 8], [34, 8], [46, 8],
  [10, 16], [22, 16], [34, 16], [46, 16],
  [10, 24], [22, 24], [34, 24], [46, 24],
  [10, 32], [22, 32],
];

/**
 * Ilustración de cada tarjeta.
 *
 * Son SVG dibujados a mano, no emojis ni íconos de librería: cada repositorio
 * tiene un motivo propio y el trazo sale del acento de la tarjeta.
 */
export function RepoArt({ kind }: { kind: RepoArtKind }) {
  if (kind === "waveform") {
    return (
      <svg viewBox="0 0 100 40" fill="none" aria-hidden>
        <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
          {WAVE_HEIGHTS.map((height, index) => (
            <line
              key={index}
              x1={6 + index * 6}
              y1={20 - height / 2}
              x2={6 + index * 6}
              y2={20 + height / 2}
            />
          ))}
        </g>
      </svg>
    );
  }

  if (kind === "pixels") {
    return (
      <svg viewBox="0 0 100 40" fill="none" aria-hidden>
        <g fill="currentColor">
          {PIXEL_MAP.map(([x, y], index) => (
            <rect
              key={index}
              x={x}
              y={y}
              width="8"
              height="5"
              rx="1"
              opacity={0.25 + ((x + y) % 3) * 0.28}
            />
          ))}
          <rect x="66" y="12" width="26" height="2" opacity="0.55" />
          <rect x="66" y="20" width="18" height="2" opacity="0.35" />
          <rect x="66" y="28" width="22" height="2" opacity="0.25" />
        </g>
      </svg>
    );
  }

  if (kind === "terminal") {
    return (
      <svg viewBox="0 0 100 40" fill="none" aria-hidden>
        <g fontFamily="var(--font-mono-stack)" fontSize="7" fill="currentColor">
          <text x="2" y="12">$ wsp-tui --connect</text>
          <text x="2" y="24" opacity="0.55">[ok] session restored</text>
          <text x="2" y="36" opacity="0.35">multi-device · bubbletea</text>
        </g>
        <rect x="86" y="6" width="1.6" height="8" fill="currentColor">
          <animate
            attributeName="opacity"
            values="1;0;1"
            dur="1.1s"
            repeatCount="indefinite"
          />
        </rect>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 100 40" fill="none" aria-hidden>
      <g fill="currentColor">
        {BAR_HEIGHTS.map((height, index) => (
          <rect
            key={index}
            x={2 + index * 8}
            y={36 - height}
            width="5"
            height={height}
            rx="1"
            opacity={0.3 + index * 0.05}
          />
        ))}
      </g>
    </svg>
  );
}
