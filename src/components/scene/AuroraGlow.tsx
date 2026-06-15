"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useScrollProgress } from "@/context/ScrollProgressContext";

export function AuroraGlow() {
  const group = useRef<THREE.Group>(null);
  const { progress } = useScrollProgress();

  useFrame(({ clock }) => {
    if (!group.current) return;
    group.current.position.x = Math.sin(clock.elapsedTime * 0.15) * 2;
    const scrollBoost = 0.04 + progress * 0.06;
    group.current.children.forEach((child, i) => {
      const mesh = child as THREE.Mesh;
      const mat = mesh.material as THREE.MeshBasicMaterial;
      mat.opacity =
        scrollBoost + Math.sin(clock.elapsedTime * 0.4 + i * 1.2) * 0.04;
    });
  });

  return (
    <group ref={group} position={[0, 22, -60]}>
      <mesh rotation={[-0.2, 0, 0.1]} scale={[90, 18, 1]}>
        <planeGeometry />
        <meshBasicMaterial
          color="#38bdf8"
          transparent
          opacity={0.1}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      <mesh rotation={[-0.18, 0, -0.05]} position={[8, -2, 2]} scale={[70, 14, 1]}>
        <planeGeometry />
        <meshBasicMaterial
          color="#a78bfa"
          transparent
          opacity={0.09}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      <mesh rotation={[-0.22, 0, 0.08]} position={[-10, 1, 1]} scale={[60, 12, 1]}>
        <planeGeometry />
        <meshBasicMaterial
          color="#67e8f9"
          transparent
          opacity={0.07}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}
