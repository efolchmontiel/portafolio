"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { SceneInteractionProvider } from "@/context/SceneInteractionContext";
import { NightSkyDome } from "./NightSkyDome";
import { Starfield } from "./Starfield";
import { Meteors } from "./Meteors";
import { AtmosphericFog } from "./AtmosphericFog";
import { CameraRig } from "./CameraRig";
import { SceneRimLights } from "./SceneRimLights";
import { Fireflies } from "./Fireflies";
import { CountrysideSilhouettes } from "./CountrysideSilhouettes";

type SceneContentProps = {
  reducedMotion: boolean;
  isMobile: boolean;
};

function SceneContent({ reducedMotion, isMobile }: SceneContentProps) {
  return (
    <>
      <AtmosphericFog />
      <NightSkyDome />
      <hemisphereLight args={["#1e293b", "#020617", 0.35]} />
      <ambientLight intensity={0.12} color="#0f172a" />
      <SceneRimLights />

      <Suspense fallback={null}>
        <Starfield reducedMotion={reducedMotion} isMobile={isMobile} />
      </Suspense>

      <Suspense fallback={null}>
        <CountrysideSilhouettes />
      </Suspense>

      {!reducedMotion && <Meteors enabled />}
      {!reducedMotion && <Fireflies count={isMobile ? 18 : 28} />}
      <CameraRig reducedMotion={reducedMotion} />
    </>
  );
}

function SceneRoot({ reducedMotion, isMobile }: SceneContentProps) {
  return (
    <SceneInteractionProvider>
      <SceneContent reducedMotion={reducedMotion} isMobile={isMobile} />
    </SceneInteractionProvider>
  );
}

export function NightScene() {
  const reducedMotion = useReducedMotion();
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <div className="canvas-layer" aria-hidden>
      <Canvas
        dpr={isMobile ? [1, 1.25] : [1, 1.5]}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
        }}
        performance={{ min: 0.5 }}
        onCreated={({ gl }) => {
          gl.setClearColor("#020617", 1);
        }}
      >
        <SceneRoot reducedMotion={reducedMotion} isMobile={isMobile} />
      </Canvas>
    </div>
  );
}
