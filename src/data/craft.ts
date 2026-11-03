import type { CraftCell } from "@/models/craft.model";

/**
 * El oficio en seis celdas: qué se usa y para qué.
 * Reemplaza la lista de categorías + la sección de principios: los
 * principios de ingeniería viven en la celda "Criterio".
 */
export const craftCells: readonly CraftCell[] = [
  {
    id: "backend",
    title: "Backend",
    detail:
      "ASP.NET Core · .NET Web API · Node.js. Lógica de negocio, acceso asíncrono y persistencia con EF y ADO.NET.",
    accent: "cyan",
    motif: "server",
  },
  {
    id: "frontend",
    title: "Frontend",
    detail:
      "Angular · React · TypeScript. RxJS, servicios y componentes para flujos de negocio de ERP y punto de venta.",
    accent: "violet",
    motif: "browser",
  },
  {
    id: "datos",
    title: "Datos",
    detail:
      "PostgreSQL · MySQL · MongoDB. Modelado, consultas, índices y optimización validada en QA y producción.",
    accent: "teal",
    motif: "database",
  },
  {
    id: "movil",
    title: "Móvil",
    detail: "Ionic · Xamarin · .NET MAUI.",
    accent: "amber",
    motif: "phone",
  },
  {
    id: "criterio",
    title: "Criterio",
    detail:
      "SOLID, separación de responsabilidades y cambios seguros. Revisión por pull request y Git como fuente de verdad.",
    accent: "violet",
    motif: "shield",
  },
  {
    id: "ia",
    title: "IA aplicada",
    detail:
      "Cursor y agentes de asistencia y revisión bajo supervisión humana. La herramienta acelera; la decisión sigue siendo del ingeniero.",
    accent: "cyan",
    motif: "spark",
  },
] as const;
