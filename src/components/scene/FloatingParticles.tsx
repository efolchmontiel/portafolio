"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { pseudoRandom } from "@/lib/pseudoRandom";
import { getGlowTexture } from "@/lib/glowTexture";

type FloatingParticlesProps = {
  count?: number;
};

export function FloatingParticles({ count = 120 }: FloatingParticlesProps) {
  const ref = useRef<THREE.Points>(null);
  const texture = useMemo(() => getGlowTexture(), []);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (pseudoRandom(i) - 0.5) * 50;
      pos[i * 3 + 1] = pseudoRandom(i + 100) * 20;
      pos[i * 3 + 2] = -10 - pseudoRandom(i + 200) * 30;
    }
    return pos;
  }, [count]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.elapsedTime * 0.015;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        map={texture}
        size={0.35}
        color="#7dd3fc"
        transparent
        opacity={0.22}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        alphaMap={texture}
      />
    </points>
  );
}
