export type ZodiacConstellation = {
  id: string;
  label: string;
  position: [number, number, number];
  scale: number;
  stars: [number, number, number][];
  edges: [number, number][];
  localStart: number;
  localEnd: number;
};

/** Lado derecho del viewport (x alto), delante de la UI central */
export const ZODIAC_CONSTELLATIONS: ZodiacConstellation[] = [
  {
    id: "leo",
    label: "Leo",
    position: [48, 15, 8],
    scale: 1.35,
    stars: [
      [0, 0, 0],
      [1.2, 0.8, 0],
      [2.4, 0.3, 0],
      [3.2, -0.4, 0],
      [2, -1.2, 0],
      [0.5, -0.8, 0],
    ],
    edges: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 0],
      [1, 4],
    ],
    localStart: 0.02,
    localEnd: 0.38,
  },
  {
    id: "libra",
    label: "Libra",
    position: [54, 11, 10],
    scale: 1.4,
    stars: [
      [-1.5, 0.5, 0],
      [0, 1, 0],
      [1.5, 0.5, 0],
      [0, -1, 0],
      [0, -2.2, 0],
    ],
    edges: [
      [0, 1],
      [1, 2],
      [1, 3],
      [2, 3],
      [3, 4],
    ],
    localStart: 0.34,
    localEnd: 0.68,
  },
  {
    id: "virgo",
    label: "Virgo",
    position: [50, 19, 6],
    scale: 1.45,
    stars: [
      [0, 1.5, 0],
      [-0.8, 0.5, 0],
      [0.8, 0.5, 0],
      [0, 0, 0],
      [0, -1, 0],
      [0, -2.2, 0],
      [-1, -2.8, 0],
      [1, -2.8, 0],
    ],
    edges: [
      [0, 1],
      [0, 2],
      [1, 3],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 6],
      [5, 7],
    ],
    localStart: 0.64,
    localEnd: 0.98,
  },
];
