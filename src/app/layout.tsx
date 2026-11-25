import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Andrés Machado | Tecnólogo en Análisis y Desarrollo de Software",
  description:
    "Portafolio profesional de Andrés Machado (Machadodev1). Ingeniería de software robusta, arquitecturas escalables y experiencias digitales hiper-pulidas.",
  keywords: [
    "Andrés Machado",
    "Machadodev1",
    "Desarrollo de Software",
    "Django",
    "React",
    "PostgreSQL",
    "Flutter",
    "Figma",
    "SIGIF",
    "Frontend Engineer",
    "Fullstack Developer",
  ],
  authors: [{ name: "Andrés Machado", url: "https://github.com/machadodev1" }],
  creator: "Andrés Machado",
  openGraph: {
    type: "website",
    locale: "es_ES",
    title: "Andrés Machado | Ingeniería de Software & Experiencias Digitales",
    description:
      "Ingeniería de software robusta, arquitecturas escalables y experiencias digitales hiper-pulidas.",
    siteName: "Andrés Machado Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Andrés Machado | Software Engineer",
    description: "Ingeniería de software robusta y experiencias digitales de estándar Apple.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} font-sans`}>
      <body className="bg-white text-[#1D1D1F] antialiased selection:bg-[#0071E3]/20 selection:text-black">
        {children}
      </body>
    </html>
  );
}
