"use client";

import { useActiveSection } from "@/hooks/useActiveSection";
import { navItems } from "@/data/nav";

const sectionIds = navItems.map((item) => item.id);

/**
 * Índice de capítulos fijo a la izquierda.
 *
 * Es un mapa del scroll, no navegación principal: la nav de arriba sigue
 * siendo la que tiene los nombres. Acá solo van números cortos.
 */
export function ChapterRail() {
  const active = useActiveSection(sectionIds, sectionIds[0] ?? "hero");

  return (
    <nav className="chapter-rail" aria-label="Índice de capítulos">
      {navItems.map((item, index) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className={active === item.id ? "is-active" : undefined}
          aria-current={active === item.id ? "true" : undefined}
        >
          <i aria-hidden />
          <span>{String(index).padStart(2, "0")}</span>
          <em>{item.label}</em>
        </a>
      ))}
    </nav>
  );
}
