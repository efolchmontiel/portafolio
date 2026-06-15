import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portafolio | Experiencias digitales cinematográficas",
  description:
    "Desarrollador Full Stack — frontend, backend y móvil. Portafolio interactivo con narrativa visual nocturna.",
  keywords: [
    "Full Stack Developer",
    "React",
    "Angular",
    "Node.js",
    "TypeScript",
    "portafolio",
  ],
  openGraph: {
    title: "Construyo experiencias digitales modernas",
    description:
      "Desarrollador Full Stack especializado en desarrollo frontend, backend y móvil.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${spaceGrotesk.variable} h-full`}>
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
