"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";

type ShootingStarContextValue = {
  burstId: number;
  triggerShootingStar: () => void;
};

const ShootingStarContext = createContext<ShootingStarContextValue>({
  burstId: 0,
  triggerShootingStar: () => {},
});

export function ShootingStarProvider({ children }: { children: ReactNode }) {
  const [burstId, setBurstId] = useState(0);

  const triggerShootingStar = useCallback(() => {
    setBurstId((n) => n + 1);
  }, []);

  return (
    <ShootingStarContext.Provider value={{ burstId, triggerShootingStar }}>
      {children}
    </ShootingStarContext.Provider>
  );
}

export function useShootingStar() {
  return useContext(ShootingStarContext);
}
