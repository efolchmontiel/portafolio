import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";
import { SITE_BASE_PATH } from "./src/config/site";

const projectDir = path.dirname(fileURLToPath(import.meta.url));
const threePath = path.join(projectDir, "node_modules/three");
const threeAlias = "./node_modules/three";

const nextConfig: NextConfig = {
  devIndicators: false,
  /**
   * GitHub Pages sirve archivos estáticos bajo la subruta del repositorio
   * (`/portafolio`). El `basePath` aplica igual en `next dev`, así que lo que
   * se ve en local es lo que se publica.
   */
  output: "export",
  basePath: SITE_BASE_PATH,
  images: {
    unoptimized: true,
  },
  transpilePackages: [
    "three",
    "@react-three/fiber",
    "@react-three/drei",
    "@react-three/postprocessing",
  ],
  turbopack: {
    resolveAlias: {
      three: threeAlias,
    },
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      three: threePath,
    };
    return config;
  },
};

export default nextConfig;
