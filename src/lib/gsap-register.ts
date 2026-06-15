"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export function registerGsapPlugins() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
}

if (typeof window !== "undefined") {
  registerGsapPlugins();
}

export { gsap, ScrollTrigger };
