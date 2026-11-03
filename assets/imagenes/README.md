# Imágenes del portafolio

## Siluetas (narrativa de scroll)

| Archivo | Uso |
| --- | --- |
| `ninocielo.png` | Fase 1: el niño mira el cielo bajo el árbol. Del hero hasta repositorios. |
| `telescopio.png` | Fase 2: el niño en el telescopio. Aparece al entrar en `#repos` y se queda hasta el cierre. |

Ambas son 1920×1280 con **canal alfa real** (RGB negro, fondo transparente).
El arco del cerro cierra dentro del encuadre, así que no hace falta recortar.

Generadas como silueta negra sobre blanco y convertidas a alfa con ImageMagick
(`-colorspace Gray -negate -level` como canal alfa). Se descartó el asset
anterior porque su recorte dejaba una costura vertical visible en el horizonte.

Implementación: [`HorizonStoryLayer.tsx`](../../src/components/HorizonStoryLayer.tsx)
+ [`useHorizonStory.ts`](../../src/hooks/useHorizonStory.ts). Posición, tamaño,
rim light y máscara viven en `globals.css` (`.horizon-story__*`).

**Ojo con el contraste:** un relleno `#000` sobre `--night-deep` da 1.05:1. La
silueta solo se lee gracias a la banda de horizonte luminosa
([`HorizonBand.tsx`](../../src/components/HorizonBand.tsx)) y al `drop-shadow`
de 1 px. Si se cambia el fondo del horizonte, hay que revisar la silueta.

## Logos de empresas

`irad.png`, `isstec.png`, `logo-brecha.png`, `octopull.jpg` — material histórico.
Hoy no los usa ningún componente: la trayectoria se cuenta con la línea de tiempo
en `src/data/timeline.ts`. Quedan por si se quiere volver a un carrusel de logos.

## Public

Symlinks en `public/imagenes/` hacia estos archivos. `next/image` los optimiza en
tiempo de request; el PNG fuente no se sirve tal cual.
