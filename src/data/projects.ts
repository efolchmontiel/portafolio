import type { Project } from "@/models/project.model";

export const projects: readonly Project[] = [
  {
    id: "cartelera-omdb",
    title: "Cartelera-OMDB",
    description:
      "Cartelera de películas con integración OMDB. Exploración visual de títulos, ratings y detalle cinematográfico.",
    stack: ["Angular", "SCSS", "REST APIs", "TypeScript"],
    gradient: "from-cyan-500/30 via-slate-900/80 to-violet-600/30",
    href: "https://github.com/erickfm/Cartelera-OMDB",
  },
  {
    id: "bot-whatsapp",
    title: "bot-whatsapp",
    description:
      "Chatbot de WhatsApp con flujos conversacionales, persistencia configurable (MySQL/JSON) y panel de envío.",
    stack: ["Node.js", "REST", "MySQL", "WebSockets"],
    gradient: "from-violet-500/30 via-slate-900/80 to-sky-500/30",
    href: "https://github.com/erickfm/bot-whatsapp",
  },
  {
    id: "transfer-service",
    title: "TransferService",
    description:
      "API REST de transferencias bancarias con Express y MongoDB. Persistencia con Mongoose, rutas de banco y CORS para cliente Angular.",
    stack: ["Node.js", "Express", "MongoDB", "REST APIs"],
    gradient: "from-emerald-500/25 via-slate-900/80 to-cyan-600/25",
    href: "https://github.com/efolchmontiel/TransferService",
  },
] as const;
