import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";

const projectDir = path.dirname(fileURLToPath(import.meta.url));
const threePath = path.join(projectDir, "node_modules/three");
const threeAlias = "./node_modules/three";

const nextConfig: NextConfig = {
  devIndicators: false,
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
