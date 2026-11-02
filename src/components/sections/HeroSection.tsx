"use client";

import { motion } from "framer-motion";
import { profile } from "@/data/profile";
import { easeOut } from "@/lib/motion";

/**
 * Hero del artboard: titular de póster con la segunda línea en contorno,
 * metadatos en monoespaciada y dos llamadas a la acción.
 */
export function HeroSection() {
  return (
    <section id="hero" className="chapter hero">
      <div className="wrap hero__copy">
        <motion.p
          className="label"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.7, ease: easeOut }}
        >
          {profile.name} · {profile.location}
        </motion.p>

        <motion.h1
          className="display hero__title"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.9, ease: easeOut }}
        >
          {profile.headline[0]}
          <br />
          <span className="display-outline">{profile.headline[1]}</span>
        </motion.h1>

        <motion.p
          className="lede"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: easeOut }}
        >
          {profile.summary}
        </motion.p>

        <motion.dl
          className="hero__meta"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          {profile.meta.map((item) => (
            <div key={item.label}>
              <b>{item.label}</b> {item.value}
            </div>
          ))}
        </motion.dl>

        <motion.div
          className="hero__cta"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.8, ease: easeOut }}
        >
          <a className="btn btn--primary" href="#repos">
            {profile.ctaPrimary}
          </a>
          <a className="btn btn--ghost" href="#contacto">
            {profile.ctaSecondary}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
