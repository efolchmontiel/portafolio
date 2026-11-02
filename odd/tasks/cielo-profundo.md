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
