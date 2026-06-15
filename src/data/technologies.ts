import type { TechCategory } from "@/models/technology.model";

export const technologyCategories: readonly TechCategory[] = [
  {
    id: "frontend",
    label: "Frontend",
    items: [
      "Angular",
      "HTML",
      "CSS",
      "SCSS",
      "Bootstrap",
      "Tailwind CSS",
      "Angular Material",
      "Redux",
      "TypeScript",
      "JavaScript",
    ],
  },
  {
    id: "mobile",
    label: "Mobile",
    items: ["Ionic", "Xamarin", ".NET MAUI"],
  },
  {
    id: "backend",
    label: "Backend",
    items: [
      "ASP.NET Core",
      "Node.js",
      "Firebase",
      "Cloud Firestore",
      "RESTful APIs",
      "GraphQL",
    ],
  },
  {
    id: "database",
    label: "Database",
    items: ["PostgreSQL", "MySQL", "MongoDB", "SQL"],
  },
  {
    id: "tools",
    label: "Tools",
    items: ["Git", "GitHub", "Bitbucket", "Microsoft Office"],
  },
  {
    id: "methodologies",
    label: "Metodologías",
    items: ["Scrum", "Agile", "Cascada"],
  },
] as const;
