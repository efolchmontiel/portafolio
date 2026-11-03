# Cielo profundo — implementación del artboard `01-deep-sky`

Feature: llevar `design/portafolio-inmersivo/01-deep-sky.html` al stack real del proyecto
(Next 16 · React 19 · Tailwind v4 · R3F · GSAP · Framer Motion), usando el artboard como
spec visual y `design/system.md` como fuente de tokens.

## Specs

**S1 — Links de repositorios.** Los proyectos deben apuntar a la cuenta real del autor
(`github.com/efolchmontiel`) y a repositorios que existan. Ningún link puede dar 404.

**S2 — Marquesina de repositorios.** El usuario pidió: "tengo varios repositorios personales,
considerar que se vayan movimiendo hacia el lado de a lo poco automaticamente donde se van
presentando, como tambien se pueden detener o mover manualmente."
Condiciones: avance automático continuo, pausa explícita, arrastre manual, flechas y
teclado, pausa al enfocar y al salir de pantalla, y desactivación con
`prefers-reduced-motion`.

**S3 — Variedad visual de repositorios.** El usuario pidió: "considera cambiar el diseño de
tarjetas o visualizacion de repositorios, todo se ve muy de una sola tonalidad y tambien de
un mismo orden, no veo paneles, tarjetas, y otros elementos que puedes rescatar del plugin o
mcp que tenemos de ui-ux-pro-max (skill creo que tenemos). tambien usar el 21st.dev que te
habia dicho"
Condiciones: dos niveles visuales distintos (panel destacado + tarjetas), acento de color
por lenguaje, arte propio por tarjeta, y desplazamiento vertical alternado.

**S4 — Signos zodiacales.** El usuario pidió: "recuerda que los puntos con las lineas,
representan los signos zodiacales que se van viendo".
Condiciones: los 12 signos, revelados progresivamente con el scroll, cada uno con su nombre
y fechas. La forma es estilizada, no astronómicamente exacta.

**S5 — Música ambiente real.** El usuario pidió: "busca por internet musicas referentes a
silueta oscura de niño viendo constelaciones o estrellas y descargala para dar uso de esta
(solo free y las que sean necesarias para que se vea bien la imagen)" y antes "tenga una
musica relajada tipo ambiental para ver las estrellas".
Condiciones: pista con licencia libre, nunca autoplay, control visible de play/pausa, fade de
entrada y salida, y crédito de autoría en el sitio cuando la licencia lo exija.

**S6 — Siluetas legibles.** El usuario pidió: "mejorar la visualizacion de las imagenes que
representan a un niño viendo las estrellas y lacontelacion."
Condiciones: la silueta se distingue sobre el cielo nocturno, sin costura visible en el borde
del recorte, y el niño se lee a escala de viewport.

**S7 — Estilo de referencia.** El usuario pidió: "usando un estilo tipo de esto
https://unseen.co/projects/ como referencia" y "que sea con animacion, interactivo".
Condiciones: tipografía de display de gran escala, espacio negativo amplio, y contenido que
se revela con el scroll.

**S8 — Contenido real.** El usuario adjuntó `CV_Erick_Folch_Portafolio.md` y pidió: "en el
CV_Erick_folch_Portafolio.md encontraras informacion como años de trabajo, etc.. que quizas
te sirvan, si consideras que no es necesario para el portafolio no lo agregues!"
Condiciones: años, empresas, roles y stack salen del CV; no se inventan empresas ni proyectos.

## Tasks

| ID | Tarea | Specs | Ruta | Commit |
| --- | --- | --- | --- | --- |
| T1 | Tokens, banda de horizonte y siluetas recortadas con rim light + máscara | S6 | inline | `feat(tokens): horizonte luminoso y siluetas legibles` |
| T2 | Nav con estado sólido, rail de capítulos y control de audio ambiente con pista real | S5, S7 | inline | `feat(audio): mando de música ambiente y rail de capítulos` |
| T3 | Capa de zodíaco: 12 signos revelados por scroll | S4 | inline | `feat(zodiac): doce signos revelados con el scroll` |
| T4 | Hero, trayectoria y oficio con contenido del CV | S7, S8 | inline | `feat(sections): hero, trayectoria y oficio con datos reales` |
| T5 | Repositorios: panel destacado + marquesina con acento, arte y arrastre | S1, S2, S3 | inline | `feat(projects): panel destacado y marquesina de repositorios` |
| T6 | Cierre de contacto, limpieza de componentes muertos y docs | S5, S6 | inline | `feat(contact): cierre del feature y créditos de audio` |

## Cortes de entrega

- `93027c9` — retiro de GGA (chore, fuera de alcance del feature).
- `b0e43fd` — T1: tokens, horizonte luminoso y siluetas.
- `3a1fb6e` — T2: audio ambiente, nav y rail de capítulos.
- `3eecaff` — T3: zodíaco por scroll y tokens en tres capas.
- `788bb07` — T4: hero, trayectoria y oficio con contenido del CV.
- `c0ab8f0` — T5: panel destacado y marquesina de repositorios.
- T6 — cierre de contacto, constante de anclas, limpieza y docs.

Los cortes quedaron por encima de las ~400 líneas autoradas por commit: la
mayoría del volumen es CSS de layout, no lógica. Se registra como desvío
consciente para que la revisión lo considere.

## Log

**L1** — "hola bro, estamos en un proyecto de portafolio, pero quiero que te metas un gentle
design y veamos correcciones que podamos hacerle a este proyecto, para que se vea como un
portafolio llamativo, me gustaria usar https://21st.dev considera usar ui ux pro max tambien,
mejorar la visualizacion de las imagenes que representan a un niño viendo las estrellas y
lacontelacion. usando un estilo tipo de esto https://unseen.co/projects/ como referencia te
entrego mas omenos el concepto https://koncep.to/blog/7-sitios-web-interactivos-de-animacion
que sea con animacion, interactivo y tenga una musica relajada tipo ambiental para ver las
estrellas tengo varios repositorios personales, considerar que se vayan movimiendo hacia el
lado de a poco automaticamente donde se van presentando, como tambien se pueden detener o
mover manualmente."

**L2** — "considera cambiar el diseño de tarjetas o visualizacion de repositorios, todo se ve
muy de una sola tonalidad y tambien de un mismo orden, no veo paneles, tarjetas, y otros
elementos que puedes rescatar del plugin o mcp que tenemos de ui-ux-pro-max (skill creo que
tenemos). tambien usar el 21st.dev que te habia dicho, como tambien te mencione que usaras
como referencia la pagina animada, la idea es llegar a una pagina animada con musica suave,
con movimiento, tal como te envie la pagina de referencia, hacer algo de ese estilo. busca por
internet musicas referentes a silueta oscura de niño viendo constelaciones o estrellas y
descargala para dar uso de esta (solo free y las que sean necesarias para que se vea bien la
imagen) recuerda que los puntos con las lineas, representan los signos zodiacales que se van
viendo"

**L3** — "te hago envio de ciertos documentos que quizas te sirvan para agregar a la pagina,
si ves que no es requerido, no lo hagas, en el CV_Erick_folch_Portafolio.md encontraras
informacion como años de trabajo, etc.. que quizas te sirvan, si consideras que no es
necesario para el portafolio no lo agregues!"

**L4** — Decisión del humano: implementar `design/portafolio-inmersivo/01-deep-sky.html`
(artboard elegido del diseño `portafolio-inmersivo`). Handoff recibido por la herramienta
`gentle_design`.

**L5** — Evidencia técnica recogida antes de escribir código: los PNG de siluetas ya tienen
canal alfa; el problema era contraste (`#000` sobre `#020617` ≈ 1.05:1). Los tres `href` de
`src/data/projects.ts` apuntan a `github.com/erickfm`, que es otra persona, y devuelven 404.
Pista de audio elegida: "Quiet Night" de Purrple Cat, CC BY 4.0, vía Wikimedia Commons.

**L6** — Corrección del humano sobre S6: "igual te habia dicho que trata de descargar imagenes
de silueta de niño porque estas imagenes que tenemos estan mal diseñadas". Se reemplazaron los
assets base: las búsquedas en Wikimedia Commons, Openverse y Openclipart no devolvieron una
silueta gráfica utilizable (solo fotos o escaneos de libros), y Antigravity devolvió cuota
agotada. Los dos assets nuevos se generaron con `nan_media` (flux-2-klein) como silueta negra
sobre blanco y se convirtieron a alfa real con ImageMagick (`-colorspace Gray -negate -level`,
usado como canal alfa sobre relleno negro). Archivos: `assets/imagenes/ninocielo.png` y
`assets/imagenes/telescopio.png`, 1920×1280 con alfa, sin costura de recorte porque el arco del
cerro cierra dentro del encuadre. Se eliminó `nino-2.png` (sin referencias en código).

**L7** — Ronda de correcciones tras revisar el sitio renderizado:
- Trayectoria: seis columnas iguales aplastaban los textos ("2019" se pisaba con "2019—2020").
  Pasa a recorrido horizontal fijado por scroll (`useScrollDrivenShift`), con línea que se dibuja
  y parada activa encendida. `body` cambia `overflow-x: hidden` por `clip` porque `hidden` creaba
  contenedor de scroll y rompía `position: sticky`.
- Oficio: se recuperan las cuatro fases del proceso (Análisis, Arquitectura, Metodología, Entrega),
  con contenido del CV, más hover en fases y celdas.
- Siluetas: el niño miraba hacia afuera en la fase del telescopio. Ambos assets quedan anclados a la
  derecha y sin espejar, así miran hacia el contenido en las dos fases.
- Separación entre capítulos: de 16vh a 11vh por lado, más un borde superior que se desvanece.
- Audio: encendido por defecto mediante arranque silencioso + subida de volumen en el primer gesto.
  El navegador no permite audio audible sin gesto; esto es el máximo que la plataforma habilita.
  Se cerró además una carrera del doble montaje de React que dejaba el estado en "no disponible".
- Se quita la nota al pie de la marquesina.
- Interacción: parallax de puntero en zodíaco y titular (`usePointerParallax`); el envoltorio es
  necesario porque framer-motion ya escribe `transform` en el h1.

**L8** — Entrega y ronda de ajustes posteriores:
- Push de `feature/cielo-profundo` y PR #1 contra `master`.
- `design/` entra al repositorio (sin duplicar el mp3: la pista vive en `public/audio`).
- El corte entre el hero y Trayectoria tenía demasiado aire y se leía como texto faltante:
  hero de 92vh, menos padding inferior y un indicador de scroll al borde derecho.
- `HorizonRidge`: tres planos de curvas suaves cierran el horizonte. Antes el cielo quedaba
  pelado entre secciones. Se mantiene bajo (22vh) para que las estrellas sigan visibles.
- La banda de horizonte interpolaba hacia `transparent`, que en CSS pasa por negro translúcido
  y deja una banda gris donde termina el degradado: ahora usa el mismo color con alfa decreciente.
- Las dos siluetas de personajes no se tocaron ni se movieron.

**L9** — Disposición de RDD: **el humano deja explícitamente este candidato sin revisión nativa.**
Evidencia del intento, en orden:
1. `inspect` ofreció `review.start` para el candidato `sha256:46402d46…` (17 commits, ~8.500 líneas, ~90 archivos).
2. Primer START: `lenses-invalid` — rechazo de entrada, sin lineage (`lineage_created: false`).
3. Segundo START: `lens_context_budget_exceeded` — el candidato completo excede el presupuesto de
   contexto del revisor. Terminal para ese candidato: reintentarlo no puede funcionar y el proveedor
   no trunca evidencia.
4. El humano eligió partir el cambio en cuatro tramos agrupados. Como el rango de revisión siempre
   es `base..candidato`, el tramo 1 (4 commits, 31 archivos, 2.213 líneas) se aisló en un worktree
   temporal (`/tmp/rev-slice1`, ya eliminado) y se obtuvo un candidato propio
   `sha256:1312f9e9…`.
5. Su START devolvió **consentimiento declinado para ese candidato** (`lineage_created: false`,
   `mutation_outcome: none`), sin que el agente lo hubiera respondido.
6. El humano decidió dejar el candidato sin revisión. No se creó ni se consumió autoridad de
   revisión, no hay lineage que reparar ni abandonar.

Cobertura alternativa aplicada sobre el candidato: `tsc`, `lint` y `build` limpios en cada corte,
capturas desktop 1440×900 y mobile 390×844 sección por sección, auditoría de áreas táctiles
(0 controles bajo 24px) y detector de `impeccable` (un aviso informativo sobre la retícula
decorativa de la sección de repositorios).

**L10** — Reintentos de RDD tras los commits de audio y portada de entrada.
Cada commit nuevo genera un candidato nuevo, y cada uno volvió a dar **consentimiento declinado**
sin que el agente lo hubiera respondido:

| Target | Archivos | Líneas | Resultado |
| --- | --- | --- | --- |
| `sha256:c3424c9c…` | 87 | 8.523 | `consent-declined-this-candidate`, sin lineage |
| `sha256:e500a243…` | 89 | 8.752 | `consent-declined-this-candidate`, sin lineage |

El patrón se repite en todos los candidatos de esta rama, así que no es cuestión de tamaño: el
consentimiento se resuelve del lado del host. El agente no responde consentimiento por prosa ni por
argumentos, así que se detiene acá y no reintenta en esta sesión.

Salidas posibles, ambas del humano:
- resolver el consentimiento en el host interactivo, o
- `gentle-ai review mode disable --scope clone` (salida D del contrato).

Cobertura aplicada mientras tanto: `tsc`, `lint`, `build` limpios, capturas desktop y mobile,
escaneo de píxeles para la continuidad del cielo y verificación del estado real del `<audio>` con
clics reales en el navegador.
