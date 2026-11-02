import type { Profile } from "@/models/profile.model";

/**
 * Fuente: CV del autor (Ingeniero Civil Informático, UNAB).
 * Si cambia un año o un cargo, cambia acá y en `timeline.ts`.
 */
export const profile: Profile = {
  name: "Erick Folch Montiel",
  role: "Ingeniero Civil Informático · Full Stack",
  location: "Santiago, Chile",
  headline: ["Software que", "mira lejos."],
  summary:
    "Ingeniero Civil Informático y desarrollador Full Stack. Ocho años llevando plataformas web, backends y móviles desde el requerimiento hasta producción: salud, seguros, retail y astronomía.",
  meta: [
    { label: "Desde", value: "2018 en el rubro" },
    { label: "Stack", value: "C# · TypeScript · Go" },
    { label: "Actual", value: "Isstec 2023 — hoy" },
  ],
  ctaPrimary: "Ver repositorios",
  ctaSecondary: "Hablemos",
} as const;
