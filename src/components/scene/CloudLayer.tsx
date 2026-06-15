"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const clouds = [
  { pos: [-25, 8, -35] as [number, number, number], scale: [18, 4, 6] as [number, number, number] },
  { pos: [30, 12, -42] as [number, number, number], scale: [22, 5, 7] as [number, number, number] },
  { pos: [0, 5, -28] as [number, number, number], scale: [14, 3, 5] as [number, number, number] },
];

export function CloudLayer() {
  const group = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.position.x += delta * 0.15;
    if (group.current.position.x > 8) group.current.position.x = -8;
  });

  return (
    <group ref={group}>
      {clouds.map((c, i) => (
        <mesh key={i} position={c.pos} scale={c.scale}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial
            color="#0f172a"
            transparent
            opacity={0.12}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}
