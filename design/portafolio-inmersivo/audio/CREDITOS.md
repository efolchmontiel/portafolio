# Créditos de audio

## Pista usada

**"Quiet Night" — Purrple Cat**
- Fuente: https://commons.wikimedia.org/wiki/File:Purrple_Cat_-_Quiet_Night.ogg
- Licencia: **CC BY 4.0** (https://creativecommons.org/licenses/by/4.0/)
- Artista: Purrple Cat
- Archivo original: `Purrple_Cat_-_Quiet_Night.ogg` (4:02, 6.2 MB)

### Qué se modificó (obra derivada)

| Archivo | Cambio | Uso |
| --- | --- | --- |
| `quiet-night.mp3` | Recorte de 24 s a 2:54, fade in 2 s y fade out 3 s, MP3 112 kbps | asset del proyecto |
| (embebido en `01-deep-sky.html`) | Recorte de 40 s con fades, MP3 96 kbps | demo audible del artboard |

CC BY permite el recorte y la conversión siempre que se acredite al autor. **La atribución es obligatoria**: el sitio debe mostrar el crédito de forma visible (por ejemplo en el pie, junto al control de sonido).

## Alternativa evaluada (no usada)

**"Zero Point" — Dreamstate Logic** — CC BY 3.0, ambient espacial oscuro.
https://commons.wikimedia.org/wiki/File:Dreamstate_Logic_-_Zero_Point_(space_ambient,_dark_ambient).ogg
Usar si se prefiere un clima más cinematográfico y menos cálido.

## Implementación recomendada

- Archivo en `public/audio/quiet-night.mp3`, `<audio loop preload="none">`.
- `volume` arranca en 0 y sube a ~0.42 en 2,6 s al activar; baja a 0 en 0,7 s al pausar.
- Nunca autoplay: el navegador lo bloquea y molesta al usuario.
- Respetar `prefers-reduced-motion` no aplica al audio, pero el control debe existir y recordar la preferencia.
