"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from "react";
import { getErrorMessage } from "@/lib/errors";
import { clamp } from "@/lib/validation";

type ScrollProgressContextValue = {
  progress: number;
  setProgress: Dispatch<SetStateAction<number>>;
};

const ScrollProgressContext = createContext<ScrollProgressContextValue>({
  progress: 0,
  setProgress: () => {},
});

export function ScrollProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState(0);

  /* Respaldo nativo: la cámara siempre recibe el scroll aunque falle GSAP */
  useEffect(() => {
    const update = () => {
      try {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const raw = max > 0 ? window.scrollY / max : 0;
        setProgress(clamp(raw, 0, 1));
      } catch (error) {
        console.error(
          getErrorMessage(error, "Error al calcular progreso de scroll"),
        );
        setProgress(0);
      }
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <ScrollProgressContext.Provider value={{ progress, setProgress }}>
      {children}
    </ScrollProgressContext.Provider>
  );
}

export function useScrollProgress() {
  return useContext(ScrollProgressContext);
}
