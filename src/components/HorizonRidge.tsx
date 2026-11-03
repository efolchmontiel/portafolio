"use client";

/**
 * Cordillera de fondo.
 *
 * Cierra el horizonte con una silueta negra en tres planos suaves para que el
 * cielo no quede vacío entre secciones. Va por debajo de las siluetas de los
 * personajes (z-7) y del contenido (z-10), y se mantiene baja para que las
 * estrellas sigan visibles.
 */
export function HorizonRidge() {
  return (
    <div className="ridge" aria-hidden>
      <svg
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Plano lejano: curvas amplias y apenas insinuadas */}
        <path
          className="ridge__far"
          d="M0 168 C 90 150, 150 158, 225 148 C 300 138, 360 156, 450 150 C 540 144, 600 128, 690 140 C 780 152, 840 164, 930 152 C 1020 140, 1080 126, 1170 140 C 1260 154, 1340 162, 1440 150 L1440 200 L0 200 Z"
        />
        {/* Plano medio */}
        <path
          className="ridge__mid"
          d="M0 186 C 80 176, 140 180, 215 172 C 290 164, 350 178, 440 174 C 530 170, 590 156, 680 166 C 770 176, 830 186, 920 176 C 1010 166, 1070 154, 1160 164 C 1250 174, 1330 182, 1440 172 L1440 200 L0 200 Z"
        />
        {/* Plano cercano: bosque, el único a plena opacidad */}
        <path
          className="ridge__near"
          d="M0 196 C 70 190, 130 192, 200 188 C 270 184, 330 192, 410 190 C 490 188, 550 180, 630 186 C 710 192, 770 196, 850 192 C 930 188, 990 182, 1070 188 C 1150 194, 1230 196, 1310 192 C 1370 189, 1410 190, 1440 188 L1440 200 L0 200 Z"
        />
      </svg>
    </div>
  );
}
