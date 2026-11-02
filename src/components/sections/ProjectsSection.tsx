"use client";

import { motion } from "framer-motion";
import { SectionShell } from "@/components/ui/SectionShell";
import { projects } from "@/data/projects";

export function ProjectsSection() {
  return (
    <SectionShell
      id="repos"
      title="Proyectos destacados"
      subtitle="Featured"
      className="projects-section"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl">
        {projects.map((project, i) => (
          <motion.article
            key={project.id}
            className="project-card group relative"
            data-project-card
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.7 }}
            whileHover={{ y: -8 }}
          >
            <a
              href={project.href ?? "#"}
              target={project.href ? "_blank" : undefined}
              rel={project.href ? "noopener noreferrer" : undefined}
              className={`block glass-panel rounded-3xl overflow-hidden p-8 min-h-[280px] bg-gradient-to-br ${project.gradient} transition-shadow duration-500 group-hover:glow-violet`}
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="relative z-10">
                <h3 className="section-title text-2xl md:text-3xl font-bold mb-3">
                  {project.title}
                </h3>
                <p className="text-text-light/75 mb-6 leading-relaxed max-w-md">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-3 py-1 rounded-full border border-white/15 bg-night-mid/50 text-accent-cyan"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle at 80% 20%, rgba(56,189,248,0.15), transparent 50%)",
                }}
                aria-hidden
              />
            </a>
          </motion.article>
        ))}
      </div>
    </SectionShell>
  );
}
