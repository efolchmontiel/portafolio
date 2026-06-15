"use client";

import Image from "next/image";
import { useHorizonStory } from "@/hooks/useHorizonStory";
import ninocieloImg from "../../assets/imagenes/ninocielo.png";
import telescopioImg from "../../assets/imagenes/telescopio.png";

/**
 * Narrativa dual: cada silueta con ancla propia (ninocielo % / telescopio px+%).
 */
export function HorizonStoryLayer() {
  const {
    ninoOpacity,
    telescopioOpacity,
    ninoParallax,
    telescopioParallax,
  } = useHorizonStory();

  return (
    <div className="horizon-story pointer-events-none fixed inset-0 z-[7]" aria-hidden>
      <div
        className="horizon-story__slot horizon-story__nino"
        style={{
          opacity: ninoOpacity,
          transform: ninoParallax,
          transformOrigin: "bottom left",
        }}
      >
        <Image
          src={ninocieloImg}
          alt=""
          width={1024}
          height={1536}
          priority
          className="horizon-story__img"
          sizes="(max-width: 768px) 52vw, 300px"
        />
      </div>
      <div
        className="horizon-story__slot horizon-story__telescopio"
        style={{
          opacity: telescopioOpacity,
          transform: telescopioParallax,
          transformOrigin: "bottom left",
        }}
      >
        <Image
          src={telescopioImg}
          alt=""
          width={1536}
          height={1024}
          className="horizon-story__img"
          sizes="(max-width: 768px) 64vw, 540px"
        />
      </div>
    </div>
  );
}
