"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import * as THREE from "three";

function disableFogOnObject(obj: THREE.Object3D) {
  const mesh = obj as THREE.Mesh;
  if (!mesh.material) return;
  const materials = Array.isArray(mesh.material)
    ? mesh.material
    : [mesh.material];
  materials.forEach((mat) => {
    if ("fog" in mat) mat.fog = false;
  });
}

export function NoFogGroup({ children }: { children: ReactNode }) {
  const ref = useRef<THREE.Group>(null);

  useLayoutEffect(() => {
    const group = ref.current;
    if (!group) return;
    disableFogOnObject(group);
    group.traverse(disableFogOnObject);
  });

  return <group ref={ref}>{children}</group>;
}
