/**
 * Anclas de los capítulos: única fuente de verdad.
 *
 * Los componentes las usan para el `id` del DOM, la nav, el rail y cualquier
 * lógica que dependa de la posición del scroll. Si un id se renombra acá y en
 * un solo lugar más, se rompe silenciosamente: por eso este archivo existe.
 */
export const sectionIds = {
  hero: "hero",
  timeline: "trayectoria",
  craft: "oficio",
  repos: "repos",
  contact: "contacto",
} as const;

export type SectionId = (typeof sectionIds)[keyof typeof sectionIds];
