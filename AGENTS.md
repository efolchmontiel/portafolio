# Portafolio — Reglas de revisión

Proyecto: **Next.js 16** + **React 19** + **TypeScript strict** + **Tailwind v4** + **R3F/GSAP**.

Al revisar un cambio, la primera línea de la respuesta declara el resultado:

```text
STATUS: PASSED
```

o

```text
STATUS: FAILED
```

Si `FAILED`, listar: `archivo:línea - regla - problema`.

---

## Seguridad (bloqueante)

REJECT si:

- Secretos, API keys, tokens o credenciales en código o commits (solo `.env.local`, nunca versionado).
- Variables de entorno sensibles expuestas sin prefijo correcto: en cliente **solo** `NEXT_PUBLIC_*`.
- URLs externas sin validar (`new URL`) antes de usar en `href` o fetch.
- `dangerouslySetInnerHTML` sin sanitización documentada.
- Dependencias con vulnerabilidades críticas conocidas sin justificación.
- Logs que imprimen PII, emails completos o tokens.

PREFER:

- Datos de contacto y enlaces desde `src/config/env.ts` (validado).
- `rel="noopener noreferrer"` en enlaces `target="_blank"`.
- Assets estáticos en `assets/` con symlinks en `public/` cuando aplique.

---

## TypeScript y modelos (obligatorio)

REJECT si:

- Uso de `any`, `unknown` sin narrowing, o `@ts-ignore` / `@ts-expect-error` sin comentario de causa.
- Objetos de dominio sin tipo: todo dato estructurado debe tener **interface** o **type** en `src/models/*.model.ts`.
- Props de componentes sin tipo explícito (usar `type XxxProps = { ... }`).
- Export default de componentes de dominio (preferir named exports en `components/` y `models/`).
- Duplicar tipos entre archivos; centralizar en `src/models/` y reexportar desde `src/models/index.ts`.

PREFER:

- `strict: true` en `tsconfig.json` (no relajar).
- Tipos de solo lectura para datos estáticos: `readonly`, `as const` donde corresponda.
- Genéricos acotados en hooks y utilidades.

Estructura esperada:

```text
src/models/     # interfaces y tipos de dominio
src/data/       # datos estáticos tipados (importan desde models)
src/lib/        # utilidades (errors, env, validación)
src/config/     # configuración validada
src/components/ # UI
src/hooks/      # lógica reutilizable cliente
```

---

## Validaciones

REJECT si:

- Entrada de usuario o variables de entorno usadas sin validar.
- Arrays/objetos asumidos sin comprobar forma (usar type guards o validadores en `src/lib/validation.ts`).
- `progress`, índices o divisiones sin acotar (`Math.min` / `Math.max` o guard clauses).

PREFER:

- Validar `NEXT_PUBLIC_*` en `src/config/env.ts` antes de renderizar enlaces.
- Funciones `assert*` / `parse*` que lancen `AppError` con mensaje claro.

---

## Manejo de errores

REJECT si:

- `catch` vacío o que solo hace `return` sin registrar el error.
- `catch (e)` sin mensaje: debe existir `getErrorMessage(error)` o equivalente con texto descriptivo.
- `console.log` en código de producción (usar solo en desarrollo con guard `process.env.NODE_ENV === 'development'` si es imprescindible).
- Promesas sin `catch` en efectos o handlers async.

PREFER:

```typescript
} catch (error) {
  const message = getErrorMessage(error, "Contexto de la operación");
  console.error(message);
  // recuperación o re-throw según el caso
}
```

Usar `AppError` desde `src/lib/errors.ts` para errores de dominio.

---

## React / Next.js

REJECT si:

- Componente cliente sin `"use client"` cuando usa hooks, estado o browser APIs.
- `import * as React` — usar imports nombrados.
- Lógica pesada de scroll/animación dentro de componentes de presentación sin hook dedicado.
- `useEffect` sin cleanup de listeners/timeouts.
- Ignorar `prefers-reduced-motion` en animaciones GSAP/Framer/Three.

PREFER:

- `dynamic(..., { ssr: false })` para canvas WebGL (`NightScene`).
- Contextos con valor por defecto seguro y hooks que fallen rápido fuera del provider si aplica.
- Imágenes con `next/image` y `sizes` definidos.

---

## Three.js / R3F

REJECT si:

- Post-procesado (`EffectComposer`) sin comprobar contexto WebGL válido (causa crash `getContextAttributes() is null`).
- Múltiples instancias de `three` por imports inconsistentes (usar alias en `next.config.ts`).
- `depthWrite` o capas HTML/3D que generen doble suelo sin documentar.

PREFER:

- Viñeta CSS de respaldo en `.canvas-layer::after`.
- Parallax 2D desacoplado del zoom 3D agresivo.

---

## Estilos y UX

REJECT si:

- Colores hex sueltos en className cuando existe token en `globals.css` (`--night-deep`, `--accent-cyan`, etc.).
- Romper accesibilidad: imágenes decorativas con `alt=""` y `aria-hidden` en contenedores decorativos.
- Menú fijo si el diseño exige scroll con la página (usar `relative` en nav).

PREFER:

- Tailwind v4 + variables CSS del tema.
- Secciones con `id` y `scroll-mt-*` para anclas del `SiteNav`.

---

## Datos del portafolio

- Proyectos: `src/data/projects.ts` → tipo `Project` en `src/models/project.model.ts`.
- Tecnologías: `src/models/technology.model.ts`.
- Empresas: `src/models/company.model.ts` (logos desde `assets/imagenes/`).
- Trayectoria: `src/models/about.model.ts`.

No inventar proyectos ni empresas no definidas en `data/`.

---

## Git y commits

REJECT si:

- Commit con `.env`, `.env.local`, credenciales o binarios pesados innecesarios.
- Mensaje de commit vacío o sin verbo en imperativo (convencional commits preferido).

---

## Comandos del proyecto

```bash
pnpm install   # solo pnpm (preinstall lo exige)
pnpm dev       # next dev --webpack
pnpm build
pnpm lint
```

---

## Checklist antes de aprobar PR

- [ ] Tipos en `src/models/`, sin `any`.
- [ ] Validación de env y URLs.
- [ ] Todo `catch` con mensaje de error.
- [ ] Sin secretos ni logs de depuración.
- [ ] Build y lint sin errores (`pnpm build`, `pnpm lint`).
- [ ] Animaciones respetan `prefers-reduced-motion`.
