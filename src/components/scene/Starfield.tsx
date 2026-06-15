"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { getGlowTexture } from "@/lib/glowTexture";

type StarfieldProps = {
  reducedMotion?: boolean;
  isMobile?: boolean;
};

/** Cielo lejano (hero / scroll arriba) */
function buildSkyStars(count: number): Float32Array {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 110;
    positions[i * 3 + 1] = Math.random() * 30 + 5;
    positions[i * 3 + 2] = -45 - Math.random() * 55;
  }
  return positions;
}

/**
 * Cúpula media — visible cuando la cámara baja (proyectos / contacto).
 * z mezclado negativo y positivo alrededor del recorrido de la cámara.
 */
function buildMidSkyStars(count: number): Float32Array {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 100;
    positions[i * 3 + 1] = Math.random() * 28 + 3;
    positions[i * 3 + 2] = -20 + Math.random() * 38;
  }
  return positions;
}

/** Refuerzo lado derecho (constelaciones SVG) */
function buildRightStars(count: number): Float32Array {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = 8 + Math.random() * 42;
    positions[i * 3 + 1] = Math.random() * 26 + 3;
    positions[i * 3 + 2] = -15 + Math.random() * 32;
  }
  return positions;
}

function StarLayer({
  positions,
  size,
  opacity,
  color,
}: {
  positions: Float32Array;
  size: number;
  opacity: number;
  color: string;
}) {
  const texture = useMemo(() => getGlowTexture(), []);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  return (
    <points geometry={geometry} frustumCulled={false} renderOrder={1}>
      <pointsMaterial
        map={texture}
        size={size}
        sizeAttenuation
        transparent
        opacity={opacity}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        color={color}
        fog={false}
        alphaTest={0.02}
      />
    </points>
  );
}

export function Starfield({ reducedMotion, isMobile }: StarfieldProps) {
  const group = useRef<THREE.Group>(null);

  const skyMain = useMemo(
    () => buildSkyStars(isMobile ? 120 : 280),
    [isMobile],
  );
  const skyBright = useMemo(
    () => buildSkyStars(isMobile ? 18 : 40),
    [isMobile],
  );
  const midMain = useMemo(
    () => buildMidSkyStars(isMobile ? 100 : 220),
    [isMobile],
  );
  const midBright = useMemo(
    () => buildMidSkyStars(isMobile ? 15 : 30),
    [isMobile],
  );
  const rightMain = useMemo(
    () => buildRightStars(isMobile ? 60 : 140),
    [isMobile],
  );
  const rightBright = useMemo(
    () => buildRightStars(isMobile ? 12 : 28),
    [isMobile],
  );

  useFrame(({ clock }) => {
    if (reducedMotion || !group.current) return;
    group.current.rotation.y = Math.sin(clock.elapsedTime * 0.02) * 0.008;
  });

  return (
    <group ref={group}>
      <StarLayer
        positions={skyMain}
        size={isMobile ? 0.22 : 0.3}
        opacity={0.6}
        color="#94a3b8"
      />
      <StarLayer
        positions={skyBright}
        size={isMobile ? 0.38 : 0.5}
        opacity={0.8}
        color="#e2e8f0"
      />
      <StarLayer
        positions={midMain}
        size={isMobile ? 0.2 : 0.28}
        opacity={0.55}
        color="#94a3b8"
      />
      <StarLayer
        positions={midBright}
        size={isMobile ? 0.36 : 0.48}
        opacity={0.75}
        color="#e2e8f0"
      />
      <StarLayer
        positions={rightMain}
        size={isMobile ? 0.22 : 0.3}
        opacity={0.65}
        color="#94a3b8"
      />
      <StarLayer
        positions={rightBright}
        size={isMobile ? 0.4 : 0.5}
        opacity={0.85}
        color="#e2e8f0"
      />
    </group>
  );
}
