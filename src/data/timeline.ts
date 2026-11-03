import type { TimelineStop } from "@/models/timeline.model";

/** Seis paradas, en orden cronológico. Fuente: CV del autor. */
export const timelineStops: readonly TimelineStop[] = [
  {
    id: "sdmc",
    period: "2018",
    org: "Servicio de Salud Metropolitano Central",
    detail: "Práctica · soporte, correos institucionales y consultas SQL en Data Center.",
  },
  {
    id: "falabella",
    period: "2019",
    org: "Seguros Falabella · A-Team Perú",
    detail: "Práctica profesional · Laravel, mejoras al sistema de seguros con UX y Scrum.",
  },
  {
    id: "octopull",
    period: "2019 — 2020",
    org: "OctoPull",
    detail: "Inventario con menús y permisos por rol para la operación de Cencosud.",
  },
  {
    id: "brecha",
    period: "2020 — 2021",
    org: "Brecha Digital",
    detail: "Reserva de tickets para puntos astronómicos de Chile · perfiles, stock, QR y pistoleo.",
  },
  {
    id: "irad",
    period: "2021 — 2022",
    org: "IRAD Soluciones en la Salud",
    detail: "Tickets y notificaciones por perfil clínico, PDF de exámenes y registros de pacientes.",
  },
  {
    id: "isstec",
    period: "2023 — hoy",
    org: "Isstec",
    detail: "Backends C#/.NET Web API, Angular y PostgreSQL en desarrollo, QA/QA2 y producción.",
    isCurrent: true,
  },
] as const;
