import type { Principle } from "@/models/principle.model";

export const principles: readonly Principle[] = [
  {
    id: "solid",
    title: "SOLID",
    description: "Diseño orientado a responsabilidades claras y extensiones seguras.",
  },
  {
    id: "dry",
    title: "DRY",
    description: "Una sola fuente de verdad para reglas y comportamiento compartido.",
  },
  {
    id: "kiss",
    title: "KISS",
    description: "La solución más simple que resuelve el problema real.",
  },
  {
    id: "composition",
    title: "Composition Over Inheritance",
    description: "Componer capacidades en lugar de jerarquías rígidas.",
  },
  {
    id: "separation",
    title: "Separation of Concerns",
    description: "UI, dominio y datos con fronteras explícitas.",
  },
  {
    id: "stateless",
    title: "Stateless Architecture",
    description: "Estado predecible y servicios escalables horizontalmente.",
  },
] as const;
