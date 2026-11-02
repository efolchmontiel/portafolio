import type { ProcessPhase } from "@/models/process.model";

/**
 * Las cuatro fases del trabajo, en orden.
 *
 * Salen del CV: conceptualización del problema y evaluación de necesidades,
 * modelado de sistemas, ciclos de desarrollo con revisión, y validación en
 * desarrollo, QA/QA2 y producción.
 */
export const processPhases: readonly ProcessPhase[] = [
  {
    id: "analisis",
    step: "01",
    title: "Análisis",
    detail:
      "Entender el problema antes de escribir código: quién lo usa, qué necesita y qué restricción tiene el negocio.",
    accent: "cyan",
  },
  {
    id: "arquitectura",
    step: "02",
    title: "Arquitectura",
    detail:
      "Modelar el sistema con fronteras explícitas entre UI, dominio y datos. Contratos de API estables y decisiones reversibles.",
    accent: "teal",
  },
  {
    id: "metodologia",
    step: "03",
    title: "Metodología",
    detail:
      "Scrum y trabajo por iteraciones: issue, rama, pull request y revisión. Cambios chicos y revisables antes de tocar producción.",
    accent: "violet",
  },
  {
    id: "entrega",
    step: "04",
    title: "Entrega",
    detail:
      "Validación en desarrollo, QA/QA2 y producción. Si algo falla, se corrige con evidencia y se deja el registro en el repositorio.",
    accent: "amber",
  },
] as const;
