"use client";

import { useEffect, useState } from "react";
import { getErrorMessage } from "@/lib/errors";
import { clamp } from "@/lib/validation";

/** 0 = antes de proyectos, 1 = al final de contacto */
export function useProjectsContactProgress(): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      try {
        const projects = document.getElementById("projects");
        const contact = document.getElementById("contact");
        if (!projects || !contact) {
          setProgress(0);
          return;
        }

        const vh = window.innerHeight;
        const pr = projects.getBoundingClientRect();
        const cr = contact.getBoundingClientRect();

        if (pr.top > vh * 0.92) {
          setProgress(0);
          return;
        }
        if (cr.bottom < vh * 0.08) {
          setProgress(1);
          return;
        }

        const start = pr.top - vh * 0.35;
        const end = cr.bottom - vh * 0.25;
        const span = Math.max(end - start, 1);
        const current = vh * 0.4 - start;
        setProgress(clamp(current / span, 0, 1));
      } catch (error) {
        console.error(
          getErrorMessage(error, "Error al calcular progreso proyectos/contacto"),
        );
        setProgress(0);
      }
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    const t = window.setTimeout(update, 400);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return progress;
}
