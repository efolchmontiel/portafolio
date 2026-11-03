# Portafolio cinematográfico

Landing interactiva con escena 3D nocturna (React Three Fiber), cielo con
signos zodiacales que se revelan con el scroll, música ambiente opcional y una
marquesina de repositorios que avanza sola, se pausa y se arrastra.

El diseño sale del artboard `design/portafolio-inmersivo/01-deep-sky.html`; los
tokens están documentados en `design/system.md`.

## Stack

- Next.js 16 (App Router)
- React, TypeScript, Tailwind CSS v4
- Three.js / React Three Fiber / Drei
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

Abrí [http://localhost:3000/portafolio](http://localhost:3000/portafolio).

> **Importante:** este repo usa **pnpm** como gestor de paquetes. No uses `npm install` ni `npm run` aquí.

## Variables de entorno

Los datos de contacto públicos (GitHub, LinkedIn y correo) viven en
`src/config/site.ts`, porque son datos que de todos modos viajan al bundle del
navegador y el build de GitHub Pages no tiene acceso a `.env.local`.

`.env.local` es **opcional** y sirve para sobreescribirlos en desarrollo; no se
commitea.

| Variable | Descripción |
|----------|-------------|
| `NEXT_PUBLIC_GITHUB_URL` | URL del perfil o repo de GitHub |
| `NEXT_PUBLIC_LINKEDIN_URL` | URL del perfil de LinkedIn |
| `NEXT_PUBLIC_EMAIL` | Correo de contacto (enlace mailto) |

Ningún secreto va en variables `NEXT_PUBLIC_*`: quedan escritas en el bundle
que descarga el navegador.

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
- `AGENTS.md` — reglas de revisión y convenciones del proyecto

## Desarrollo

El script `pnpm dev` usa Webpack (no Turbopack) para evitar indicadores extra del modo desarrollo de Next.js.

## Deploy

El sitio se publica en **GitHub Pages**: <https://efolchmontiel.github.io/portafolio/>

- `next.config.ts` usa `output: "export"` y `basePath: "/portafolio"`, así que el
  build queda como archivos estáticos en `out/` y todas las rutas cuelgan de la
  subruta del repositorio. El `basePath` también aplica en `pnpm dev`.
- `.github/workflows/deploy-pages.yml` corre en cada push a `master`: instala con
  pnpm, ejecuta lint y build, y publica `out/` como artefacto de Pages. `out/`
  no se commitea.
- Un archivo servido desde `/public` que no pase por `next/image` necesita el
  `SITE_BASE_PATH` a mano (es el caso de la pista de audio).

Si el repo se renombra o se mueve a una organización, hay que ajustar
`SITE_BASE_PATH` en `src/config/site.ts`.
