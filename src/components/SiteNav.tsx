"use client";

import { useEffect, useState } from "react";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useShootingStar } from "@/context/ShootingStarContext";
import { navItems } from "@/data/nav";
import { AmbientAudio } from "@/components/AmbientAudio";

const sectionIds = navItems.map((item) => item.id);

/**
 * Barra superior del sitio.
 *
 * Transparente sobre el cielo del hero y sólida al scrollear: sin ese cambio
 * el contenido se lee a través de la barra y se ensucia.
 */
export function SiteNav() {
  const { triggerShootingStar } = useShootingStar();
  const active = useActiveSection(sectionIds, sectionIds[0] ?? "hero");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    triggerShootingStar();
    const target = document.getElementById(id);
    if (!target) {
      console.error(`Sección no encontrada al navegar: #${id}`);
      return;
    }
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className={`site-nav${isScrolled ? " is-scrolled" : ""}`}>
      <div className="site-nav__inner">
        <button
          type="button"
          className="site-nav__brand"
          onClick={() => scrollTo(sectionIds[0] ?? "hero")}
        >
          <span className="site-nav__dot" aria-hidden />
          Erick Folch
        </button>

        <nav aria-label="Navegación principal">
          <ul className="site-nav__links">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => scrollTo(item.id)}
                  aria-current={active === item.id ? "true" : undefined}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <AmbientAudio />
      </div>
    </header>
  );
}
