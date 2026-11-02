"use client";

import type { CSSProperties, PointerEvent as ReactPointerEvent } from "react";
import { motion } from "framer-motion";
import { featuredRepo, marqueeRepos } from "@/data/projects";
import { useMarquee } from "@/hooks/useMarquee";
import { easeOut, revealViewport } from "@/lib/motion";
import { RepoArt } from "@/components/ui/RepoArt";
import type { Repo, RepoAccent } from "@/models/repo.model";

const ACCENT_VAR: Record<RepoAccent, string> = {
  cyan: "var(--accent-cyan)",
  violet: "var(--accent-violet)",
  teal: "var(--accent-teal)",
  amber: "var(--accent-amber)",
};

type AccentStyle = CSSProperties & { "--repo-accent"?: string };

function accentStyle(repo: Repo, shift = 0): AccentStyle {
  return {
    "--repo-accent": ACCENT_VAR[repo.accent],
    ...(shift > 0 ? { marginTop: `${shift}px` } : {}),
  };
}

/** Desplazamientos verticales alternados: rompe la línea de tarjetas iguales. */
const SHIFTS = [0, 20, 6, 28] as const;

function RepoCard({
  repo,
  index,
  decorative,
  shift,
}: {
  repo: Repo;
  index: number;
  decorative: boolean;
  shift: number;
}) {
  return (
    <a
      className="repo-card"
      href={repo.href}
      target="_blank"
      rel="noopener noreferrer"
      style={accentStyle(repo, shift)}
      aria-hidden={decorative || undefined}
      tabIndex={decorative ? -1 : undefined}
    >
      <div className="repo-card__top">
        <span className="repo-card__index">
          {String(index + 1).padStart(2, "0")} /{" "}
          {String(marqueeRepos.length).padStart(2, "0")}
        </span>
        <span className="repo-card__lang">
          <i aria-hidden />
          {repo.language}
        </span>
      </div>

      <h3 className="repo-card__name">{repo.name}</h3>
      <p className="repo-card__description">{repo.description}</p>

      <div className="repo-card__art">
        <RepoArt kind={repo.art} />
      </div>

      <div className="repo-card__foot">
        <span>
          push <b>{repo.pushedAt}</b>
        </span>
        <span>Abrir ↗</span>
      </div>
    </a>
  );
}

/**
 * Repositorios del autor.
 *
 * Dos niveles visuales a propósito: un panel destacado con borde animado y,
 * debajo, una marquesina con acento y arte propios por repositorio. La
 * marquesina avanza sola, se pausa, se arrastra y responde al teclado.
 */
export function ProjectsSection() {
  const marquee = useMarquee({ itemCount: marqueeRepos.length });
  const { containerRef, trackRef, handlers } = marquee;

  /* Un solo listener para las cuatro tarjetas: mueve el spotlight delegando. */
  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    handlers.onPointerMove(event);
    const card = (event.target as HTMLElement).closest<HTMLElement>(".repo-card");
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty(
      "--pointer-x",
      `${(((event.clientX - rect.left) / rect.width) * 100).toFixed(1)}%`,
    );
    card.style.setProperty(
      "--pointer-y",
      `${(((event.clientY - rect.top) / rect.height) * 100).toFixed(1)}%`,
    );
  };

  const pauseLabel = marquee.isPaused
    ? "Reanudar el desplazamiento automático"
    : "Pausar el desplazamiento automático";

  return (
    <section id="repos" className="chapter repos">
      <div className="wrap">
        <div className="repos__head">
          <div>
            <motion.p
              className="label"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={revealViewport}
              transition={{ duration: 0.6, ease: easeOut }}
            >
              03 — Repositorios
            </motion.p>
            <motion.h2
              className="display mt-5 text-[clamp(32px,4.4vw,62px)]"
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={revealViewport}
              transition={{ duration: 0.75, ease: easeOut, delay: 0.05 }}
            >
              Cosas que construí
              <br />
              por gusto.
            </motion.h2>
          </div>

          <motion.p
            className="repos__legend"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={revealViewport}
            transition={{ duration: 0.6, ease: easeOut, delay: 0.1 }}
          >
            <i aria-hidden />5 públicos
            <i aria-hidden />3 lenguajes
            <i aria-hidden />último push 2026
          </motion.p>
        </div>

        <motion.article
          className="feature"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={revealViewport}
          transition={{ duration: 0.8, ease: easeOut }}
        >
          <div className="feature__grid" aria-hidden />
          <div className="feature__glow" aria-hidden />

          <div className="feature__inner">
            <div>
              <div className="feature__tags">
                <span className="feature__tag feature__tag--solid">Destacado</span>
                <span className="feature__tag">{featuredRepo.language}</span>
                <span className="feature__tag feature__tag--violet">
                  Local-first
                </span>
              </div>
              <h3 className="feature__name">{featuredRepo.name}</h3>
              <p className="feature__description">{featuredRepo.description}</p>
              <a
                className="btn btn--primary feature__cta"
                href={featuredRepo.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                Abrir en GitHub
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 14 14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  aria-hidden
                >
                  <path d="M3 11 11 3M5 3h6v6" />
                </svg>
              </a>
            </div>

            <dl className="feature__stats">
              <div>
                <dt>último push</dt>
                <dd>{featuredRepo.pushedAt}</dd>
              </div>
              <div>
                <dt>stack</dt>
                <dd>{featuredRepo.language} · React</dd>
              </div>
              <div>
                <dt>inferencia</dt>
                <dd>Local</dd>
              </div>
            </dl>
          </div>
        </motion.article>

        <div className="marquee__bar">
          <span className="marquee__title">Marquesina · los otros cuatro</span>
          <div className="marquee__controls">
            <button
              type="button"
              className="marquee__control"
              onClick={marquee.togglePause}
              aria-pressed={marquee.isPaused}
              aria-label={pauseLabel}
            >
              {marquee.isPaused ? (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden>
                  <path d="M2 1l9 5-9 5z" />
                </svg>
              ) : (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden>
                  <rect x="1" y="1" width="3.5" height="10" rx="1" />
                  <rect x="7.5" y="1" width="3.5" height="10" rx="1" />
                </svg>
              )}
            </button>
            <button
              type="button"
              className="marquee__control"
              onClick={marquee.prev}
              aria-label="Repositorio anterior"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
                <path d="M9 2 4 7l5 5" />
              </svg>
            </button>
            <button
              type="button"
              className="marquee__control"
              onClick={marquee.next}
              aria-label="Repositorio siguiente"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
                <path d="M5 2l5 5-5 5" />
              </svg>
            </button>
          </div>
        </div>

        <div
          ref={containerRef}
          className={`marquee${marquee.isDragging ? " is-dragging" : ""}`}
          role="group"
          aria-label="Repositorios personales, desplazamiento horizontal"
          tabIndex={0}
          onPointerEnter={handlers.onPointerEnter}
          onPointerLeave={handlers.onPointerLeave}
          onPointerDown={handlers.onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={handlers.onPointerUp}
          onPointerCancel={handlers.onPointerCancel}
          onFocus={handlers.onFocus}
          onBlur={handlers.onBlur}
          onKeyDown={handlers.onKeyDown}
          onClickCapture={handlers.onClickCapture}
        >
          <div ref={trackRef} className="marquee__track">
            {marqueeRepos.map((repo, index) => (
              <RepoCard
                key={repo.id}
                repo={repo}
                index={index}
                decorative={false}
                shift={SHIFTS[index] ?? 0}
              />
            ))}
            {marqueeRepos.map((repo, index) => (
              <RepoCard
                key={`${repo.id}-clone`}
                repo={repo}
                index={index}
                decorative
                shift={SHIFTS[index] ?? 0}
              />
            ))}
          </div>
        </div>

        <div className="marquee__progress" aria-hidden>
          <i style={{ width: `${Math.max(8, marquee.progress * 100)}%` }} />
        </div>

        <p className="marquee__note">
          Arrastrá, usá las flechas o dejalo correr solo · pausa con el botón o
          con la barra espaciadora
        </p>
      </div>
    </section>
  );
}
