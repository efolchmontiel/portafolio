"use client";

import { useEffect, useState } from "react";

/**
 * Devuelve el id de la sección visible en el centro del viewport.
 *
 * Usa una franja central (`-45%` arriba y abajo) para que la sección activa
 * sea la que domina la lectura, no la primera que asoma.
 */
export function useActiveSection(
  ids: readonly string[],
  fallback: string,
): string {
  const [active, setActive] = useState(fallback);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
