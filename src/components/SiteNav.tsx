"use client";

import { useShootingStar } from "@/context/ShootingStarContext";
import { navItems } from "@/data/nav";

export function SiteNav() {
  const { triggerShootingStar } = useShootingStar();

  const scrollToSection = (id: string) => {
    try {
      triggerShootingStar();
      const el = document.getElementById(id);
      if (!el) {
        console.error(`Sección no encontrada al navegar: #${id}`);
        return;
      }
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Error desconocido al desplazarse a la sección";
      console.error(`Navegación fallida hacia #${id}: ${message}`);
    }
  };

  return (
    <nav
      className="site-nav relative z-[100] w-full pointer-events-auto"
      aria-label="Navegación principal"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-center gap-4 px-4 py-4 md:gap-8 md:px-8">
        <ul className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
          {navItems.map(({ id, label }) => (
            <li key={id}>
              <button
                type="button"
                onClick={() => scrollToSection(id)}
                className="text-xs uppercase tracking-widest text-text-light/60 transition-colors hover:text-accent-cyan focus:outline-none focus-visible:text-accent-cyan focus-visible:ring-2 focus-visible:ring-accent-cyan/50 rounded px-1"
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
