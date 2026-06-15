import * as THREE from "three";

const SKY_PALETTE = {
  top: "#1e293b",
  upper: "#0f1a2e",
  mid: "#0f172a",
  lower: "#080f1a",
  horizon: "#020617",
} as const;

let cached: THREE.CanvasTexture | null = null;
const CACHE_KEY = 2;

export function getSkyGradientTexture(): THREE.CanvasTexture {
  if (cached && (cached as THREE.CanvasTexture & { _v?: number })._v === CACHE_KEY) {
    return cached;
  }
  cached = null;

  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    cached = new THREE.CanvasTexture(canvas);
    return cached;
  }

  const g = ctx.createLinearGradient(0, 0, 0, 512);
  g.addColorStop(0, SKY_PALETTE.top);
  g.addColorStop(0.18, SKY_PALETTE.upper);
  g.addColorStop(0.42, SKY_PALETTE.mid);
  g.addColorStop(0.68, SKY_PALETTE.lower);
  g.addColorStop(1, SKY_PALETTE.horizon);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 512, 512);

  cached = new THREE.CanvasTexture(canvas);
  (cached as THREE.CanvasTexture & { _v?: number })._v = CACHE_KEY;
  cached.minFilter = THREE.LinearFilter;
  cached.magFilter = THREE.LinearFilter;
  cached.needsUpdate = true;
  return cached;
}
