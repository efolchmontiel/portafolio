"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { pseudoRandom } from "@/lib/pseudoRandom";
import { getGlowTexture } from "@/lib/glowTexture";
import { useScrollProgress } from "@/context/ScrollProgressContext";

type FirefliesProps = {
  count?: number;
};

export function Fireflies({ count = 28 }: FirefliesProps) {
  const ref = useRef<THREE.Points>(null);
  const { progress } = useScrollProgress();
  const texture = useMemo(() => getGlowTexture(), []);

  const { positions, phases } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const ph = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = -10 + pseudoRandom(i) * 16;
      pos[i * 3 + 1] = -3 + pseudoRandom(i + 50) * 6;
      pos[i * 3 + 2] = 5 + pseudoRandom(i + 100) * 7;
      ph[i] = pseudoRandom(i + 200) * Math.PI * 2;
    }
    return { positions: pos, phases: ph };
  }, [count]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const mat = ref.current.material as THREE.PointsMaterial;
    mat.opacity = 0.12 + progress * 0.2;
    const pos = ref.current.geometry.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < count; i++) {
      const t = clock.elapsedTime * 0.4 + phases[i];
      pos.array[i * 3 + 1] += Math.sin(t) * 0.001;
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        map={texture}
        size={0.5}
        color="#fef3c7"
        transparent
        opacity={0.18}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        alphaMap={texture}
      />
    </points>
  );
}
