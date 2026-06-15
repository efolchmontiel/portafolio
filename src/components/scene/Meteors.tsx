"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useShootingStar } from "@/context/ShootingStarContext";

const POOL_SIZE = 8;
const SPEED = 28;

type Meteor = {
  active: boolean;
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  life: number;
  scale: number;
};

function createPool(): Meteor[] {
  return Array.from({ length: POOL_SIZE }, () => ({
    active: false,
    x: 0,
    y: 0,
    z: 0,
    vx: 0,
    vy: 0,
    life: 0,
    scale: 1,
  }));
}

type MeteorsProps = {
  enabled?: boolean;
};

export function Meteors({ enabled = true }: MeteorsProps) {
  const pool = useRef<Meteor[]>(createPool());
  const meshRefs = useRef<(THREE.Mesh | null)[]>([]);
  const { burstId } = useShootingStar();
  const ambientCooldown = useRef(0);

  const geometry = useMemo(() => {
    const cone = new THREE.ConeGeometry(0.025, 1.4, 8, 1, true);
    cone.rotateZ(-Math.PI / 2);
    return cone;
  }, []);
  const indices = useMemo(() => Array.from({ length: POOL_SIZE }, (_, i) => i), []);

  const spawn = (opts?: {
    x?: number;
    y?: number;
    z?: number;
    vx?: number;
    vy?: number;
    life?: number;
    scale?: number;
  }) => {
    const slot = pool.current.find((m) => !m.active);
    if (!slot) return;
    slot.active = true;
    slot.x = opts?.x ?? (Math.random() - 0.5) * 50;
    slot.y = opts?.y ?? 18 + Math.random() * 15;
    slot.z = opts?.z ?? -35 - Math.random() * 25;
    slot.vx = opts?.vx ?? 0.12 + Math.random() * 0.1;
    slot.vy = opts?.vy ?? -0.2 - Math.random() * 0.12;
    slot.life = opts?.life ?? 1;
    slot.scale = opts?.scale ?? 1;
  };

  /** Origen aleatorio arriba (izq/centro/der) → cae en diagonal */
  const spawnMenuMeteor = () => {
    const lane = Math.random();
    const startX = lane < 0.33 ? -34 + Math.random() * 8 : lane < 0.66 ? -18 + Math.random() * 12 : -4 + Math.random() * 10;
    const startY = 21 + Math.random() * 7;
    const startZ = -14 - Math.random() * 10;

    const vx = 0.14 + Math.random() * 0.1;
    const vy = -(0.12 + Math.random() * 0.08);

    spawn({
      x: startX,
      y: startY,
      z: startZ,
      vx,
      vy,
      life: 1.3 + Math.random() * 0.15,
      scale: 1.05 + Math.random() * 0.15,
    });
    ambientCooldown.current = 1.8;
  };

  useEffect(() => {
    if (burstId > 0) spawnMenuMeteor();
  }, [burstId]);

  useFrame((_, delta) => {
    if (!enabled) return;

    if (ambientCooldown.current > 0) {
      ambientCooldown.current -= delta;
    } else if (Math.random() < 0.004) {
      spawn();
    }

    pool.current.forEach((m, i) => {
      const mesh = meshRefs.current[i];
      if (!mesh) return;
      if (!m.active) {
        mesh.visible = false;
        return;
      }
      mesh.visible = true;
      m.x += m.vx * delta * SPEED;
      m.y += m.vy * delta * SPEED;
      m.life -= delta * 0.28;
      mesh.position.set(m.x, m.y, m.z);
      mesh.scale.setScalar(m.scale);
      /* +PI: la punta (cabeza) va adelante; la base ancha queda atrás (cola) */
      mesh.rotation.z = Math.atan2(m.vy, m.vx) + Math.PI;
      const mat = mesh.material as THREE.MeshBasicMaterial;
      mat.opacity = Math.max(0, Math.min(1, m.life * 0.9));
      if (m.life <= 0) m.active = false;
    });
  });

  return (
    <group>
      {indices.map((i) => (
        <mesh
          key={i}
          ref={(el) => {
            meshRefs.current[i] = el;
          }}
          geometry={geometry}
          visible={false}
        >
          <meshBasicMaterial
            color="#e0f2fe"
            transparent
            opacity={0}
            toneMapped={false}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
}
