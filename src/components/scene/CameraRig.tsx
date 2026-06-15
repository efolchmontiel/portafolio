"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import { useScrollProgress } from "@/context/ScrollProgressContext";
import { useSceneInteraction } from "@/context/SceneInteractionContext";
import { SCENE_FOCUS, SCENE_SKY_LOOK } from "@/lib/sceneFocus";

type CameraRigProps = {
  reducedMotion?: boolean;
};

const lookAtTarget = new THREE.Vector3();
const INTRO_DURATION = 9;

export function CameraRig({ reducedMotion }: CameraRigProps) {
  const camRef = useRef<THREE.PerspectiveCamera>(null);
  const { progress } = useScrollProgress();
  const { pointerX, pointerY } = useSceneInteraction();
  const smoothProgress = useRef(0);
  const introElapsed = useRef(0);
  const introComplete = useRef(false);

  useFrame((_, delta) => {
    const camera = camRef.current;
    if (!camera) return;

    if (!reducedMotion && !introComplete.current) {
      introElapsed.current += delta;
      const introT = Math.min(introElapsed.current / INTRO_DURATION, 1);
      const introEase = introT * introT * (3 - 2 * introT);
      camera.position.set(
        pointerX * 0.15,
        THREE.MathUtils.lerp(4.5, 3.6, introEase),
        THREE.MathUtils.lerp(22, 15, introEase),
      );
      camera.fov = THREE.MathUtils.lerp(52, 48, introEase);
      camera.updateProjectionMatrix();
      camera.lookAt(SCENE_SKY_LOOK);
      if (introT >= 1) introComplete.current = true;
      return;
    }

    const targetP = reducedMotion ? 0 : progress;
    smoothProgress.current = THREE.MathUtils.lerp(
      smoothProgress.current,
      targetP,
      0.08,
    );
    const t = smoothProgress.current;
    const ease = t * t * (3 - 2 * t);
    const focusBlend = ease * 0.88;

    lookAtTarget.lerpVectors(SCENE_SKY_LOOK, SCENE_FOCUS, focusBlend);
    lookAtTarget.x += pointerX * 0.4;
    lookAtTarget.y += pointerY * 0.25 + Math.max(1.8, 2.5 - ease * 1.2);

    const camX = THREE.MathUtils.lerp(0, -5, ease) + pointerX * 0.35;
    const camY = THREE.MathUtils.lerp(3.6, 1.1, ease) + pointerY * 0.18;
    const camZ = THREE.MathUtils.lerp(15, 5.8, ease);

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, camX, 0.07);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, camY, 0.07);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, camZ, 0.07);
    camera.fov = THREE.MathUtils.lerp(48, 36, ease);
    camera.updateProjectionMatrix();
    camera.lookAt(lookAtTarget);
  });

  return (
    <PerspectiveCamera
      ref={camRef}
      makeDefault
      position={[0, 4.5, 22]}
      fov={52}
      near={0.1}
      far={200}
    />
  );
}
