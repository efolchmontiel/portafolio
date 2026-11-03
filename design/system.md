# Sistema de diseño — Portafolio nocturno

Capturado de los sources del proyecto. No contiene valores inventados.

## Fuentes leídas

- `src/app/globals.css` — tokens, `@theme inline`, keyframes, utilidades
- `src/app/layout.tsx` — fuentes y metadata
- `src/components/ui/` — GlassPanel, SectionShell, ConstellationMap, meteors
- `src/components/sections/*.tsx` — escala tipográfica en uso
- `src/app/page.tsx`, `src/components/PortfolioPage.tsx` — composición de capas

## Color

| Token | Valor | Uso observado | Source |
| --- | --- | --- | --- |
| `--night-deep` | `#020617` | fondo del body y del canvas WebGL | `globals.css:4` |
| `--night-mid` | `#0f172a` | fondos de chips y paneles translúcidos | `globals.css:5` |
| `--night-slate` | `#1e293b` | base de `.glass-panel` y superficies | `globals.css:6` |
| `--accent-cyan` | `#38bdf8` | acentos, eyebrows, links, foco, glows | `globals.css:7` |
| `--accent-violet` | `#a78bfa` | acento secundario, estrellas de constelación | `globals.css:8` |
| `--text-light` | `#f8fafc` | texto principal | `globals.css:9` |
| `--background` | `var(--night-deep)` | alias semántico | `globals.css:10` |
| `--foreground` | `var(--text-light)` | alias semántico | `globals.css:11` |

Derivados con `color-mix(...)` en los mismos sources:

- Borde de panel: `white 12%` sobre transparente — `.glass-panel` (`globals.css:100`)
- Blur de panel: `backdrop-filter: blur(20px)` (`globals.css:99`)
- Superficie de panel: `night-slate 45%` (`globals.css:98`)
- Halo de panel: `accent-cyan 8%` (`globals.css:102`)
- Selección de texto: `accent-cyan 35%` (`globals.css:88`)
- Chip: borde `accent-cyan/25`, fondo `night-mid/50`, texto `accent-cyan` (`AboutSection.tsx`, `ProjectsSection.tsx`)

## Tipografía

Fuentes declaradas en `src/app/layout.tsx:5-13`, aplicadas como variables CSS:

| Token | Familia | Source |
| --- | --- | --- |
| `--font-inter` | Inter (`next/font/google`) | `layout.tsx:5` |
| `--font-space-grotesk` | Space Grotesk (`next/font/google`) | `layout.tsx:10` |
| `--font-sans` | `var(--font-inter)` | `globals.css:24` |
| `--font-display` | `var(--font-space-grotesk)` | `globals.css:25` |

`body` cae a `var(--font-inter), system-ui, sans-serif` (`globals.css:69`).
`.section-title` usa `var(--font-space-grotesk)` con `letter-spacing: -0.02em` (`globals.css:117-120`).

Escala en uso (Tailwind, sin tokens intermedios):

| Rol | Clases | Source |
| --- | --- | --- |
| H1 hero | `text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight` | `HeroSection.tsx:25` |
| H2 sección | `text-4xl md:text-5xl lg:text-6xl font-bold` | `SectionShell.tsx:52` |
| H3 tarjeta | `text-2xl md:text-3xl font-bold` | `ProjectsSection.tsx:41` |
| Body grande | `text-lg md:text-xl font-light` | `HeroSection.tsx:35` |
| Body | `text-text-light/75 leading-relaxed` | `ProjectsSection.tsx:44` |
| Eyebrow | `text-sm uppercase tracking-[0.35em]` / `tracking-[0.3em]` | `HeroSection.tsx:18`, `SectionShell.tsx:47` |
| Nav | `text-xs uppercase tracking-widest` | `SiteNav.tsx:43` |
| Chip | `text-xs` | `ProjectsSection.tsx:53` |

## Espaciado

| Rol | Valor | Source |
| --- | --- | --- |
| Padding de sección full | `py-24 px-6 md:px-16 lg:px-24` | `SectionShell.tsx:24` |
| Padding de sección compact | `py-16 md:py-20` | `SectionShell.tsx:25` |
| Separación de header de sección | `mb-8 md:mb-10` | `SectionShell.tsx:38` |
| Grid de proyectos | `gap-8` | `ProjectsSection.tsx:22` |
| Contenedor máximo | `max-w-7xl` (proyectos), `max-w-5xl` (about), `max-w-6xl` (nav) | varias secciones |
| Padding de panel | `p-5`, `md:p-8 lg:p-10` | `GlassPanel.tsx:28`, `AboutSection.tsx:17` |

## Radio

| Valor | Uso | Source |
| --- | --- | --- |
| `rounded-2xl` | GlassPanel | `GlassPanel.tsx:28` |
| `rounded-3xl` | tarjetas de proyecto | `ProjectsSection.tsx:37` |
| `rounded-full` | chips de stack y highlights | `ProjectsSection.tsx:53` |
| `rounded` | botón de nav (foco) | `SiteNav.tsx:45` |

## Sombras y glow

| Utilidad | Valor | Source |
| --- | --- | --- |
| `.glass-panel` | `0 0 40px cyan/8%, inset 0 1px 0 white/8%` | `globals.css:101-103` |
| `.glow-cyan` | `0 0 24px cyan/45%` | `globals.css:105` |
| `.glow-violet` | `0 0 24px violet/45%` | `globals.css:109` |
| texto de nav | `text-shadow: 0 1px 12px rgba(2,6,23,.95)` | `globals.css:82` |
| viñeta de respaldo | `radial-gradient(ellipse 85% 75% at 50% 45%, transparent 38%, rgba(2,6,23,.45))` | `globals.css:131-135` |

## Movimiento

| Nombre | Valor | Source |
| --- | --- | --- |
| `--animate-meteor-effect` | `meteor 5s linear infinite` | `globals.css:26` |
| `@keyframes meteor` | translate 0→80vw, rotate 180→204deg, opacity 0→1→0 | `globals.css:28-56` |
| Curva de entrada usada | `cubic-bezier(0.22, 1, 0.36, 1)` | `HeroSection.tsx:30`, `SectionShell.tsx:42` |
| Duración de reveal | `0.8s` | `SectionShell.tsx:42` |
| Reduced motion | animaciones a `0.01ms`, `iteration-count: 1` | `globals.css:60-73` |

## Capas (z-index) — composición real

| z | Capa | Source |
| --- | --- | --- |
| 0 | `NightScene` (canvas WebGL) | `globals.css:122` |
| 2 | `Meteors` (overlay DOM) | `PortfolioPage.tsx:34` |
| 4 | `ConstellationsLayer` | `ConstellationsLayer.tsx:67` |
| 5 | `HorizonGroundLayer` (cerro negro) | `globals.css:196` |
| 7 | `HorizonStoryLayer` (siluetas) | `HorizonStoryLayer.tsx:23` |
| 10 | `.content-layer` (contenido) | `globals.css:190` |
| 100 | `SiteNav` | `SiteNav.tsx:32` |

## Reglas de componente

- **GlassPanel** — superficie `night-slate/45` + `blur(20px)` + borde `white/12` + halo cyan; hover eleva `-translate-y-1`, borde `cyan/40`, `scale 1.02` con spring `stiffness 300 / damping 22`. (`GlassPanel.tsx:26-32`)
- **SectionShell** — `full` = `min-h-screen` centrado; `compact` = alto de contenido. Reveal `whileInView` con `y: 40 → 0`, `once: true`, margen `-80px`. (`SectionShell.tsx:20-45`)
- **Chip** — `text-xs px-3 py-1 rounded-full border` con acento cyan o violeta.
- **Constelación (UI)** — SVG con `stroke #7dd3fc` a `strokeWidth 0.35` y estrellas `fill #c4b5fd`; fade por scroll con `smoothOpacity`. (`ConstellationsLayer.tsx:22-100`)
- **Nav** — sin fondo ni backdrop (`globals.css:75-79`), botones con text-shadow y foco `ring-accent-cyan/50`. (`globals.css:81-84`, `SiteNav.tsx:45`)

## Siluetas (assets)

`assets/imagenes/ninocielo.png` y `telescopio.png`: 1536×1024, **alfa real** (fondo transparente, RGB negro).

- `ninocielo.png` recortado útil: `640×620+170+120` → niño + árbol.
- `telescopio.png` recortado útil: `700×620+220+170` → niño + telescopio + árbol.
- El suelo/horizonte ocupa todo el ancho en ambos (por eso el alfa no recorta horizontalmente).

Consecuencia de contraste: un relleno `#000` sobre `--night-deep` da ~1.05:1. Las siluetas necesitan una banda de horizonte luminosa detrás y/o rim light, o se pierden.

## Notas de contraste

- `--text-light` (`#f8fafc`) sobre `--night-deep` (`#020617`): 18.1:1 → pasa AA/AAA.
- `--text-light/75` sobre `--night-deep`: ≈ 10:1 → pasa AA.
- `--text-light/40` sobre `--night-deep`: ≈ 3.4:1 → **no pasa AA para texto normal**. Usado en el indicador de scroll del hero (`HeroSection.tsx:41`), que es `aria-hidden` decorativo.
- `--accent-cyan` (`#38bdf8`) sobre `--night-deep`: 9.5:1 → pasa AA.
- `--accent-violet` (`#a78bfa`) sobre `--night-deep`: 6.6:1 → pasa AA.
