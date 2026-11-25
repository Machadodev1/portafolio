"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Cpu,
  Rocket,
  Sparkles,
  ArrowRight,
  Layers,
} from "lucide-react";
import { Navbar } from "@/components/ui/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { AboutMeSection } from "@/components/sections/AboutMeSection";
import { ProjectShowcase } from "@/components/sections/ProjectShowcase";
import { SigifInteractiveDeck } from "@/components/sections/SigifInteractiveDeck";
import { ContactFooter } from "@/components/sections/ContactFooter";

export type StageChapter = "perfil" | "habilidades" | "sigif" | "crear";

interface ChapterItem {
  id: StageChapter;
  label: string;
  shortLabel: string;
  subtitle: string;
  icon: React.ReactNode;
}

const CHAPTERS: ChapterItem[] = [
  {
    id: "perfil",
    label: "1. Andrés & Perfil",
    shortLabel: "Perfil",
    subtitle: "Quién soy, avatar 3D y formación",
    icon: <User className="w-4 h-4" />,
  },
  {
    id: "habilidades",
    label: "2. Habilidades & Stack",
    shortLabel: "Stack",
    subtitle: "Django, Flutter, Node, Figma y PostgreSQL",
    icon: <Cpu className="w-4 h-4" />,
  },
  {
    id: "sigif",
    label: "3. Caso Real: SIGIF",
    shortLabel: "SIGIF",
    subtitle: "Arquitectura empresarial y laboratorio",
    icon: <Rocket className="w-4 h-4" />,
  },
  {
    id: "crear",
    label: "4. Armar tu Proyecto",
    shortLabel: "Armar Idea",
    subtitle: "Configurador 3D para clientes",
    icon: <Sparkles className="w-4 h-4" />,
  },
];

export const SpatialPortfolioOS: React.FC = () => {
  const [activeChapter, setActiveChapter] = useState<StageChapter>("perfil");

  const switchChapter = (chapter: StageChapter) => {
    setActiveChapter(chapter);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const currentIdx = CHAPTERS.findIndex((c) => c.id === activeChapter);
  const nextChapter = CHAPTERS[(currentIdx + 1) % CHAPTERS.length];

  return (
    <div className="min-h-screen bg-white text-[#1d1d1f] pb-28 relative">
      {/* Top Navbar with Spatial Chapter trigger */}
      <Navbar activeChapter={activeChapter} onSelectChapter={switchChapter} />

      {/* Spatial 3D Stage Container (No endless scroll!) */}
      <main className="relative overflow-hidden">
        <AnimatePresence mode="wait">
          {activeChapter === "perfil" && (
            <motion.div
              key="stage-perfil"
              initial={{ opacity: 0, y: 18, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -14, scale: 0.985 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <HeroSection onNavigate={switchChapter} />
              <AboutMeSection onNavigate={switchChapter} />
            </motion.div>
          )}

          {activeChapter === "habilidades" && (
            <motion.div
              key="stage-habilidades"
              initial={{ opacity: 0, y: 18, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -14, scale: 0.985 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="pt-14"
            >
              <SkillsSection />
            </motion.div>
          )}

          {activeChapter === "sigif" && (
            <motion.div
              key="stage-sigif"
              initial={{ opacity: 0, y: 18, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -14, scale: 0.985 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="pt-14"
            >
              <ProjectShowcase />
              <SigifInteractiveDeck />
            </motion.div>
          )}

          {activeChapter === "crear" && (
            <motion.div
              key="stage-crear"
              initial={{ opacity: 0, y: 18, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -14, scale: 0.985 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="pt-14"
            >
              <ContactFooter />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Next Dimension Quick Portal Card at bottom of active stage */}
        <div className="max-w-6xl mx-auto px-6 sm:px-10 pt-4 pb-10">
          <div className="p-6 rounded-3xl bg-[#fafafa] border border-black/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-white border border-black/[0.06] flex items-center justify-center text-[#0071e3] shadow-2xs">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-[#86868b]">
                  Navegación por Capas · Cero Scroll Infinito
                </div>
                <div className="text-sm font-bold text-[#1d1d1f]">
                  Siguiente espacio: {nextChapter.label} —{" "}
                  <span className="font-normal text-[#86868b]">{nextChapter.subtitle}</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => switchChapter(nextChapter.id)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1d1d1f] text-white text-xs font-semibold hover:bg-black transition-all shrink-0 cursor-pointer"
            >
              <span>Ir a {nextChapter.shortLabel}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </main>

      {/* ================= APPLE macOS / visionOS FLOATING SPATIAL DOCK ================= */}
      <div className="fixed bottom-5 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
        <div className="pointer-events-auto p-1.5 rounded-full bg-white/85 backdrop-blur-2xl border border-black/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.12)] flex items-center gap-1">
          {CHAPTERS.map((chap) => {
            const active = activeChapter === chap.id;
            return (
              <button
                key={chap.id}
                type="button"
                onClick={() => switchChapter(chap.id)}
                className={`relative px-4 py-2.5 rounded-full text-xs font-semibold transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                  active
                    ? "text-white"
                    : "text-[#86868b] hover:text-[#1d1d1f] hover:bg-black/[0.04]"
                }`}
              >
                {active && (
                  <motion.div
                    layoutId="spatial-dock-pill"
                    className="absolute inset-0 rounded-full bg-[#1d1d1f] shadow-sm -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className={active ? "text-[#0071e3]" : "text-current"}>
                  {chap.icon}
                </span>
                <span className="hidden sm:inline">{chap.label}</span>
                <span className="sm:hidden">{chap.shortLabel}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
