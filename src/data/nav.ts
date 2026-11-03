import type { NavItem } from "@/models/nav.model";
import { sectionIds } from "@/data/sections";

/** Los cinco capítulos del recorrido. El id es el ancla de la sección. */
export const navItems: readonly NavItem[] = [
  { id: sectionIds.hero, label: "Inicio" },
  { id: sectionIds.timeline, label: "Trayectoria" },
  { id: sectionIds.craft, label: "Oficio" },
  { id: sectionIds.repos, label: "Repos" },
  { id: sectionIds.contact, label: "Contacto" },
] as const;
