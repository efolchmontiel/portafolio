"use client";

/** Refuerzo 3D del horizonte (complementa HorizonGroundLayer CSS) */
export function CountrysideSilhouettes() {
  return (
    <mesh
      position={[0, -4.1, 9.5]}
      rotation={[-Math.PI / 2, 0, 0]}
      renderOrder={0}
    >
      <circleGeometry args={[64, 56]} />
      <meshBasicMaterial color="#000000" depthWrite={false} />
    </mesh>
  );
}
