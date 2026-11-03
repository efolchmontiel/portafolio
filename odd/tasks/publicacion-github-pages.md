# Publicación en GitHub Pages + LinkedIn real

Feature: publicar el portafolio como sitio web en GitHub Pages bajo
`https://efolchmontiel.github.io/portafolio/`, con el botón de LinkedIn ya
existente apuntando a la cuenta real del autor, sin exponer nada sensible.

## Specs

**S1 — LinkedIn real.** El usuario pidió: "necesito que agregues la cuenta de linkedin
aqui te paso el link https://www.linkedin.com/in/erick-folch-649018449/ ya tenemos el boton
falta agregarlo."
Condiciones: el botón de LinkedIn ya existente se renderiza en el sitio publicado y su
`href` es exactamente `https://www.linkedin.com/in/erick-folch-649018449/`.

**S2 — Publicado como página web en GitHub Pages.** El usuario pidió: "necesito que
publiquemos el portafolio en github pero como pagina web, este sera mi portafolio para que
visualicen los demas y sea para presentarme, tambien necestirare el enlace para pegarlo en
el perfil de github."
Condiciones: `https://efolchmontiel.github.io/portafolio/` sirve el portafolio real (no el
README ni una página de plantilla), con estilos, escena 3D, imágenes y audio resolviendo
bajo la subruta `/portafolio`; el enlace se entrega en la respuesta final.
Decisiones del usuario: repo `efolchmontiel/portafolio` pasa a **público**; URL de proyecto
(no se renombra el repo a `efolchmontiel.github.io`); el agente queda **autorizado a mergear
este PR** cuando build y lint estén verdes.

**S3 — Nada sensible publicado.** El usuario pidió: "considera no subir nada que afecte la
seguridad del sitio y mi persona, como .env, appsettings, etc.."
Condiciones: ningún `.env*` local, credencial, token ni configuración privada entra al
repositorio público ni al artefacto publicado; los datos de contacto del sitio salen de
constantes públicas validadas (son URLs y un correo de contacto destinados a ser públicos).

**S4 — La vista publicada es el portafolio actual.** El usuario pidió: "este portafolio es
la vista para mostrar" (y antes: el sitio es el artboard `01-deep-sky` implementado).
Condiciones: lo publicado es el estado de `feature/cielo-profundo` (23 commits por delante
de `master`), no el estado viejo de `master`.

## Tasks

| ID | Tarea | Specs | Ruta | Commit |
|----|-------|-------|------|--------|
| T1 | LinkedIn real + constantes públicas de contacto como respaldo de build | S1, S3 | inline | `93e3665` |
| T2 | Export estático y `basePath` `/portafolio` con rutas de assets correctas | S2, S4 | inline | `cf1108c` |
| T3 | Workflow de GitHub Actions que construye y despliega a Pages | S2 | inline | `cf1108c` |
| T4 | Verificación local del artefacto estático bajo `/portafolio` (visual + red) | S2, S4 | inline | `cf1108c` |
| T5 | Publicar: repo público, push, PR a `master`, merge y Pages habilitado | S2, S3 | inline | `7803bfb` (merge de PR #1) |
| T6 | Verificación en vivo del sitio publicado y entrega del enlace | S2 | inline | — (sin commit) |
| T7 | README: deploy en GitHub Pages y variables públicas | S2, S3 | inline | `cf1108c` |

## Cortes de entrega

- Commit 1 (T1): `feat(contacto): LinkedIn real y respaldo público de contacto`.
- Commit 2 (T2, T3, T7): `feat(deploy): export estático para GitHub Pages`.
- Un solo PR `feature/cielo-profundo` → `master`, mergeado por el agente con la
  autorización del usuario.

**Frontera del slice.** La rama `feature/cielo-profundo` ya traía la feature anterior
(~8,8k líneas en 23 commits, nunca mergeada: tres consentimientos de review declinados).
Esta feature agrega ~40 líneas en 2 commits encima de esa base. El reparto elegido es un
único PR de publicación, porque el usuario autorizó mergear *este* PR y lo que se publica
es el estado de la rama completa (S4); partir la base histórica en PRs encadenados pediría
una segunda autorización de merge que no fue otorgada.

## Cierre

Estado: **publicado y verificado en vivo** → <https://efolchmontiel.github.io/portafolio/>

- PR #1 (`feature/cielo-profundo` → `master`), mergeado como `7803bfb` con autorización
explícita del usuario (L2).
- Run de deploy `41631887170` (workflow `Deploy a GitHub Pages`): build + deploy en verde.
- Verificación en vivo: `/portafolio/`, `audio/quiet-night.mp3`, `favicon.ico` e imágenes de
`_next/static/media` responden 200; consola sin errores (solo el warning de `THREE.Clock`
deprecado y el `ERR_ABORTED` normal del preload de audio).
- Contacto en vivo: GitHub, LinkedIn (`https://www.linkedin.com/in/erick-folch-649018449/`) y
correo visibles, `target="_blank"` + `rel="noopener noreferrer"`, 46 px de alto.
- Repo público y `homepageUrl` del repo apuntando al sitio.
- Advertencia no bloqueante del runner: las actions de Pages siguen en runtime Node 20
(deprecado); el run pasa.

## Log

**L1 — Pedido original del usuario (verbatim):**

> Hola bro, buen dia!
>
> necesito que publiquemos el portafolio en github pero como pagina web, este sera mi portafolio para que visualicen los demas y sea para presentarme, tambien necestirare el enlace para pegarlo en el perfil de github.
> considera no subir nada que afecte la seguridad del sitio y mi persona, como .env, appsettings, etc..
> este portafolio es la vista para mostrar
>
> Pero antes de eso. necesito que agregues la cuenta de linkedin aqui te paso el link https://www.linkedin.com/in/erick-folch-649018449/
> ya tenemos el boton falta agregarlo.

**L2 — Decisiones (respuestas del usuario a las tres preguntas de autorización):**

> 1. El repo `efolchmontiel/portafolio` está **privado** y tu cuenta es plan free: GitHub Pages no publica desde repos privados en ese plan. … ¿Lo hacemos público? — Sí, ponerlo público
> 2. ¿Qué URL querés como link del perfil? — efolchmontiel.github.io/portafolio
> 3. … — Te autorizo a mergear este PR

**L3 — Evidencia de exploración (2026-11-03):**

- `src/components/sections/ContactSection.tsx:51` ya construye el enlace de LinkedIn, pero
  solo si `publicEnv.linkedinUrl` existe.
- `src/config/env.ts` lee `NEXT_PUBLIC_LINKEDIN_URL`; `.env.local` (ignorado por git) tenía
  una URL distinta de la que el usuario pasó, y en CI no existe: el sitio publicado se
  habría quedado sin enlaces de contacto.
- `git status` limpio; `pnpm build` verde (12 s); el árbol ya prerenderiza estático (`○ /`).
- Plan de GitHub: `free`; `GET /repos/efolchmontiel/portafolio/pages` → 404 (Pages apagado).
- Escaneo de todo el historial: sin `.env*`, `appsettings*`, claves, tokens ni
  `PRIVATE KEY` en ningún commit.
- `master` está 0 adelante / 23 atrás respecto de `feature/cielo-profundo`.

**L4 — Cierre (2026-11-03):**

- `pnpm lint` limpio; `pnpm build` verde con `output: "export"`.
- `out/index.html` referencia `/portafolio/_next/...`, `/portafolio/audio/quiet-night.mp3` y
  las dos imágenes de `assets/` con el prefijo correcto (antes el audio quedaba en `/audio/`
  y habría dado 404 en Pages).
- Verificado en navegador (desktop 1280×800 y móvil 390×844): portada de sonido, sección de
  contacto con los tres enlaces, `scrollWidth === innerWidth` (sin overflow horizontal).
- `pnpm dev` sirve en `/portafolio`; `/` da 404, como documenta el README.
- Pendiente conocido: el diff del PR arrastra la feature anterior `cielo-profundo`
  (~8,8k líneas) porque nunca llegó a `master`; esta feature son ~40 líneas.
