import type { Repo } from "@/models/repo.model";

const GITHUB = "https://github.com/efolchmontiel";

/**
 * Repositorios públicos reales de la cuenta `efolchmontiel`.
 *
 * Los tres proyectos que declaraba `projects.ts` apuntaban a
 * `github.com/erickfm` —otra persona— y devolvían 404. Este listado se
 * verificó contra la API de GitHub; si cambia el perfil, cambia acá.
 */
export const repos: readonly Repo[] = [
  {
    id: "restube",
    name: "ResTube",
    description:
      "Resumen local de videos de YouTube y archivos de video. Transcripción, resumen y búsqueda corriendo en tu máquina: nada se sube a la nube.",
    language: "TypeScript",
    accent: "cyan",
    art: "waveform",
    pushedAt: "2026-10-30",
    href: `${GITHUB}/ResTube`,
  },
  {
    id: "gentle-voice",
    name: "gentle-voice",
    description:
      "Conversación por voz local para Pi Coding Agent: reconocimiento y síntesis de habla en el laboratorio.",
    language: "TypeScript",
    accent: "cyan",
    art: "waveform",
    pushedAt: "2026-10-29",
    href: `${GITHUB}/gentle-voice`,
  },
  {
    id: "gentle-emote",
    name: "gentle-emote",
    description:
      "Avatar pixel-art junto al prompt de Gentle Shell que reacciona a lo que hace el agente.",
    language: "TypeScript",
    accent: "violet",
    art: "pixels",
    pushedAt: "2026-10-26",
    href: `${GITHUB}/gentle-emote`,
  },
  {
    id: "wsp-tui",
    name: "wsp-tui",
    description:
      "WhatsApp en la terminal: cliente multi-dispositivo escrito en Go con Bubble Tea.",
    language: "Go",
    accent: "teal",
    art: "terminal",
    pushedAt: "2026-09-07",
    href: `${GITHUB}/wsp-tui`,
  },
  {
    id: "powerdesktop",
    name: "powerDesktop",
    description:
      "Utilidades de escritorio en Python para automatizar tareas del día a día.",
    language: "Python",
    accent: "amber",
    art: "meter",
    pushedAt: "2026-09-02",
    href: `${GITHUB}/powerDesktop`,
  },
] as const;

/** El primero va al panel destacado; el resto, a la marquesina. */
export const featuredRepo: Repo = repos[0] as Repo;

export const marqueeRepos: readonly Repo[] = repos.slice(1);
