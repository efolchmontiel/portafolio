"use client";

import { motion } from "framer-motion";
import type { ComponentType } from "react";
import { SectionShell } from "@/components/ui/SectionShell";
import { publicEnv } from "@/config/env";
import type { ContactLink } from "@/models/contact.model";

function GitHubIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 114.126 0 2.063 2.063 0 01-2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

type ContactLinkView = ContactLink & {
  icon: ComponentType;
};

function buildContactLinks(): ContactLinkView[] {
  const links: ContactLinkView[] = [];

  if (publicEnv.githubUrl) {
    links.push({
      id: "github",
      label: "GitHub",
      href: publicEnv.githubUrl,
      icon: GitHubIcon,
    });
  }

  if (publicEnv.linkedinUrl) {
    links.push({
      id: "linkedin",
      label: "LinkedIn",
      href: publicEnv.linkedinUrl,
      icon: LinkedInIcon,
    });
  }

  if (publicEnv.email) {
    links.push({
      id: "email",
      label: "Email",
      href: `mailto:${publicEnv.email}`,
      display: publicEnv.email,
      icon: MailIcon,
    });
  }

  return links;
}

const contactLinks = buildContactLinks();

export function ContactSection() {
  return (
    <SectionShell
      id="contacto"
      title="Contacto"
      subtitle="Conectemos"
      className="pb-24"
    >
      <motion.div
        className="contact-glow glass-panel rounded-3xl p-10 md:p-12 max-w-xl mx-auto text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <p className="text-text-light/70 mb-8">
          ¿Tienes un proyecto en mente? Escríbeme o visita mis perfiles.
        </p>

        {contactLinks.length > 0 ? (
          <div className="flex flex-wrap items-center justify-center gap-4">
            {contactLinks.map(({ id, label, href, icon: Icon, display }) => (
              <a
                key={id}
                href={href}
                target={id === "email" ? undefined : "_blank"}
                rel={id === "email" ? undefined : "noopener noreferrer"}
                aria-label={label}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-accent-cyan/30 bg-night-mid/60 text-text-light hover:glow-cyan hover:border-accent-cyan transition-all duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan"
              >
                <Icon />
                <span className="font-medium text-sm">
                  {display ?? label}
                </span>
              </a>
            ))}
          </div>
        ) : (
          <p className="text-sm text-text-light/50">
            Configura las variables en <code className="text-accent-cyan">.env.local</code>
          </p>
        )}
      </motion.div>
    </SectionShell>
  );
}
