"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type SceneInteractionValue = {
  pointerX: number;
  pointerY: number;
};

const SceneInteractionContext = createContext<SceneInteractionValue>({
  pointerX: 0,
  pointerY: 0,
});

export function SceneInteractionProvider({ children }: { children: ReactNode }) {
  const [pointer, setPointer] = useState({ pointerX: 0, pointerY: 0 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setPointer({ pointerX: x, pointerY: y });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <SceneInteractionContext.Provider value={pointer}>
      {children}
    </SceneInteractionContext.Provider>
  );
}

export function useSceneInteraction() {
  return useContext(SceneInteractionContext);
}
