"use client";

import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap-register";
import { useScrollProgress } from "@/context/ScrollProgressContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type ScrollAnimationsProps = {
  containerRef: React.RefObject<HTMLElement | null>;
};

export function ScrollAnimations({ containerRef }: ScrollAnimationsProps) {
  const reducedMotion = useReducedMotion();
  const { setProgress } = useScrollProgress();

  useGSAP(
    () => {
      const root = containerRef.current;
      if (!root || reducedMotion) return;

      ScrollTrigger.create({
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => setProgress(self.progress),
      });

      const hero = root.querySelector(".hero-section");
      if (hero) {
        gsap.to(hero, {
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
          opacity: 0.85,
          y: -40,
        });
      }

      const constellation = root.querySelector(".constellation-map");
      const techSection = root.querySelector("#technologies");
      if (constellation && techSection) {
        gsap.from(constellation, {
          scrollTrigger: {
            trigger: techSection,
            start: "top 75%",
            end: "center center",
            scrub: 1,
          },
          y: 40,
          opacity: 0.7,
        });
      }

      const principleCards = root.querySelectorAll("[data-principle-card]");
      const principlesSection = root.querySelector("#principles");
      if (principleCards.length && principlesSection) {
        gsap.from(principleCards, {
          scrollTrigger: {
            trigger: principlesSection,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          y: 32,
          stagger: 0.1,
          duration: 0.7,
          ease: "power2.out",
        });
      }

      const projectCards = root.querySelectorAll("[data-project-card]");
      const projectsSection = root.querySelector("#projects");
      if (projectCards.length && projectsSection) {
        gsap.from(projectCards, {
          scrollTrigger: {
            trigger: projectsSection,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
          scale: 0.94,
          opacity: 0,
          stagger: 0.12,
          duration: 0.8,
          ease: "power3.out",
        });
      }

      const contactGlow = root.querySelector(".contact-glow");
      const contactSection = root.querySelector("#contact");
      if (contactGlow && contactSection) {
        gsap.to(contactGlow, {
          scrollTrigger: {
            trigger: contactSection,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          boxShadow: "0 0 60px rgba(167,139,250,0.35)",
          duration: 1,
        });
      }

      ScrollTrigger.refresh();
    },
    {
      scope: containerRef,
      dependencies: [reducedMotion],
      revertOnUpdate: true,
    },
  );

  return null;
}
