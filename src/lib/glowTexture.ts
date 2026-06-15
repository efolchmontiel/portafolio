import * as THREE from "three";

let cached: THREE.CanvasTexture | null = null;

/** Textura circular suave para partículas (evita cuadrados en WebGL). */
export function getGlowTexture(): THREE.CanvasTexture {
  if (cached) return cached;

  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    cached = new THREE.CanvasTexture(canvas);
    return cached;
  }

  const gradient = ctx.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2,
  );
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.2, "rgba(255,255,255,0.65)");
  gradient.addColorStop(0.45, "rgba(255,255,255,0.2)");
  gradient.addColorStop(0.7, "rgba(255,255,255,0.04)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  cached = new THREE.CanvasTexture(canvas);
  cached.minFilter = THREE.LinearFilter;
  cached.magFilter = THREE.LinearFilter;
  cached.needsUpdate = true;
  return cached;
}
