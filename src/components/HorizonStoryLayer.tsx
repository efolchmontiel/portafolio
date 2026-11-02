"use client";

import Image from "next/image";
import { useHorizonStory } from "@/hooks/useHorizonStory";
import ninocieloImg from "../../assets/imagenes/ninocielo.png";
import mascotasImg from "../../assets/imagenes/nino-mascotas.png";

/**
 * Narrativa dual: el niño mira las estrellas y, al llegar a proyectos,
 * aparece el niño con su perro y sus gatos. Posición, tamaño, rim light y máscara viven en
 * `globals.css` (`.horizon-story__*`); acá solo van opacidad y parallax.
 */
export function HorizonStoryLayer() {
  const {
    ninoOpacity,
    telescopioOpacity,
    ninoParallax,
    telescopioParallax,
  } = useHorizonStory();

  return (
    <div
      className="horizon-story pointer-events-none fixed inset-0 z-[7]"
      aria-hidden
    >
      <div
        className="horizon-story__slot horizon-story__nino"
        style={{ opacity: ninoOpacity, transform: ninoParallax }}
      >
        <Image
          src={ninocieloImg}
          alt=""
          width={1920}
          height={1280}
          priority
          className="horizon-story__img"
          sizes="(max-width: 768px) 62vw, 560px"
        />
      </div>
      <div
        className="horizon-story__slot horizon-story__pets"
        style={{ opacity: telescopioOpacity, transform: telescopioParallax }}
      >
        <Image
          src={mascotasImg}
          alt=""
          width={1920}
          height={1280}
          className="horizon-story__img"
          sizes="(max-width: 768px) 76vw, 600px"
        />
      </div>
    </div>
  );
}
