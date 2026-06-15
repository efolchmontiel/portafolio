import type { NavItem } from "@/models/nav.model";

export const navItems: readonly NavItem[] = [
  { id: "hero", label: "Inicio" },
  { id: "about", label: "Trayectoria" },
  { id: "technologies", label: "Tech" },
  { id: "principles", label: "Principios" },
  { id: "projects", label: "Proyectos" },
  { id: "contact", label: "Contacto" },
  { id: "experience", label: "Empresas" },
] as const;
