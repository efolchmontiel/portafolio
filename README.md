# Portafolio cinematográfico

Landing interactiva con escena 3D nocturna (React Three Fiber), scroll cinematográfico (GSAP + Lenis) y UI glassmorphism.

## Stack

- Next.js 16 (App Router)
- React, TypeScript, Tailwind CSS v4
- Three.js / React Three Fiber / Drei
- GSAP + ScrollTrigger
- Framer Motion
- Scroll nativo + GSAP ScrollTrigger

## Requisitos

- Node.js 20+
- [pnpm](https://pnpm.io/installation) 9+

## Instalación

```bash
pnpm install
# Edita .env.local con GitHub, LinkedIn y correo (ver comentarios en el archivo)
pnpm dev
```

Abrí [http://localhost:3000](http://localhost:3000).

> **Importante:** este repo usa **pnpm** como gestor de paquetes. No uses `npm install` ni `npm run` aquí.

## Variables de entorno

| Variable | Descripción |
|----------|-------------|
| `NEXT_PUBLIC_GITHUB_URL` | URL de tu perfil o repo en GitHub |
| `NEXT_PUBLIC_LINKEDIN_URL` | URL de tu perfil de LinkedIn |
| `NEXT_PUBLIC_EMAIL` | Correo de contacto (se usa en enlace mailto) |

## Scripts

| Comando | Acción |
|---------|--------|
| `pnpm dev` | Servidor de desarrollo |
| `pnpm build` | Build de producción |
| `pnpm start` | Servir build |
| `pnpm lint` | ESLint |

## Estructura

- `src/models/` — interfaces y tipos de dominio (Project, Company, TechCategory, etc.)
- `src/data/` — contenido estático tipado
- `src/config/` — configuración validada (`env.ts`)
- `src/lib/` — utilidades (`errors.ts`, `validation.ts`)
- `src/components/scene/` — escena 3D (estrellas, meteoros, siluetas, cámara)
- `src/components/sections/` — Hero, About, Technologies, Principles, Projects, Contact, Companies
- `assets/imagenes/` — PNG de siluetas y logos de empresas
- `AGENTS.md` — reglas de revisión GGA (Gentleman Guardian Angel)

## GGA (revisión de código)

Requisito global (una vez):

```bash
gentle-ai install --component gga --agent cursor
```

En este repo:

```bash
# Si `gga` está aliased a git en tu shell, usá la ruta completa:
GGA=/home/linuxbrew/.linuxbrew/Cellar/gga/*/bin/gga

$GGA init      # ya ejecutado — crea .gga
$GGA install   # instala pre-commit hook
$GGA review    # revisión manual opcional
```

Reglas del proyecto: [`AGENTS.md`](AGENTS.md).

## Accesibilidad

Con `prefers-reduced-motion: reduce` se desactivan meteoros y animaciones de cámara extendidas.

## Desarrollo

El script `pnpm dev` usa Webpack (no Turbopack) para evitar indicadores extra del modo desarrollo de Next.js.

## Deploy

Compatible con [Vercel](https://vercel.com). En el panel del proyecto, configurá el install command como `pnpm install` y `NEXT_PUBLIC_GITHUB_URL` en variables de entorno.
