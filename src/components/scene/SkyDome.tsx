"use client";

import * as THREE from "three";

/** Gradiente de cielo siempre visible (evita fondo plano negro). */
export function SkyDome() {
  return (
    <mesh scale={[180, 120, 180]} position={[0, 15, -40]}>
      <sphereGeometry args={[1, 48, 32]} />
      <meshBasicMaterial
        color="#0f1a2e"
        side={THREE.BackSide}
        depthWrite={false}
        fog={false}
      />
    </mesh>
  );
}
