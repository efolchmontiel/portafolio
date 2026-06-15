"use client";

import { useEffect, useRef } from "react";
import type { PointLight } from "three";
import { useScrollProgress } from "@/context/ScrollProgressContext";
import { useProjectsContactProgress } from "@/hooks/useProjectsContactProgress";

export function SceneRimLights() {
  const treeLight = useRef<PointLight>(null);
  const boyLight = useRef<PointLight>(null);
  const { progress } = useScrollProgress();
  const contactPhase = useProjectsContactProgress();

  useEffect(() => {
    const t = progress;
    const contactBoost = contactPhase > 0.4 ? 0.35 + contactPhase * 0.4 : 0;
    if (treeLight.current) {
      treeLight.current.intensity = 0.55 + t * 0.75 + contactBoost;
    }
    if (boyLight.current) {
      boyLight.current.intensity = 0.45 + t * 0.55 + contactBoost * 0.85;
    }
  }, [progress, contactPhase]);

  return (
    <>
      <pointLight
        ref={treeLight}
        position={[-7.5, 2.5, 10]}
        color="#38bdf8"
        intensity={0.55}
        distance={28}
      />
      <pointLight
        ref={boyLight}
        position={[-6.5, 1, 9.5]}
        color="#a78bfa"
        intensity={0.45}
        distance={22}
      />
      <pointLight position={[0, 12, -15]} color="#334155" intensity={0.18} distance={80} />
    </>
  );
}
