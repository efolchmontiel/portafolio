/** Deterministic 0–1 value from index (safe for render / useMemo). */
export function pseudoRandom(seed: number): number {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}
