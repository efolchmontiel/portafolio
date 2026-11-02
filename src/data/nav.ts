import type { NavItem } from "@/models/nav.model";

/** Los cinco capítulos del recorrido. El id es el ancla de la sección. */
export const navItems: readonly NavItem[] = [
  { id: "hero", label: "Inicio" },
  { id: "trayectoria", label: "Trayectoria" },
  { id: "oficio", label: "Oficio" },
  { id: "repos", label: "Repos" },
  { id: "contacto", label: "Contacto" },
] as const;
