"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { getSkyGradientTexture } from "@/lib/skyGradientTexture";

/** Cúpula celestial completa — azul arriba, negro en el horizonte */
export function NightSkyDome() {
  const texture = useMemo(() => getSkyGradientTexture(), []);

  return (
    <mesh scale={[-120, 120, 120]} renderOrder={-10}>
      <sphereGeometry args={[1, 64, 48]} />
      <meshBasicMaterial
        map={texture}
        side={THREE.BackSide}
        depthWrite={false}
        fog={false}
      />
    </mesh>
  );
}
