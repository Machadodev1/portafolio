"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { GithubIcon, LinkedInIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";
import type { StageChapter } from "@/components/ui/SpatialPortfolioOS";

interface NavbarProps {
  activeChapter?: StageChapter;
  onSelectChapter?: (chapter: StageChapter) => void;
}

const NAV_CHAPTERS: { id: StageChapter; label: string }[] = [
  { id: "perfil", label: "Sobre Mí & Perfil" },
  { id: "habilidades", label: "Habilidades" },
  { id: "sigif", label: "Proyecto SIGIF" },
  { id: "crear", label: "Armar tu Proyecto" },
];

export const Navbar: React.FC<NavbarProps> = ({
  activeChapter = "perfil",
  onSelectChapter,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (chapter: StageChapter) => {
    if (onSelectChapter) {
      onSelectChapter(chapter);
    }
    setMenuOpen(false);
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-white/90 backdrop-blur-xl border-b border-black/[0.06] shadow-[0_2px_15px_rgba(0,0,0,0.02)]"
            : "bg-white/75 backdrop-blur-md border-b border-black/[0.04]"
        )}
      >
        <div className="max-w-6xl mx-auto px-6 sm:px-10 h-14 flex items-center justify-between">
          {/* Wordmark & Junior Badge */}
          <button
            type="button"
            onClick={() => handleNav("perfil")}
            className="flex items-center gap-2 text-sm font-semibold tracking-tight text-[#1d1d1f] hover:text-[#0071e3] transition-colors select-none cursor-pointer"
          >
            <span>Andrés Machado</span>
            <span className="text-[10px] font-semibold text-[#86868b] px-2 py-0.5 rounded-full bg-[#f5f5f7] border border-black/[0.04]">
              Junior
            </span>
          </button>

          {/* Desktop Spatial Nav */}
          <nav className="hidden md:flex items-center gap-1 bg-[#f5f5f7] p-1 rounded-full border border-black/[0.05]">
            {NAV_CHAPTERS.map((item) => {
              const isActive = activeChapter === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNav(item.id)}
                  className={cn(
                    "px-3.5 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer",
                    isActive
                      ? "bg-white text-[#1d1d1f] shadow-2xs"
                      : "text-[#86868b] hover:text-[#1d1d1f]"
                  )}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Direct Social Links & Contact CTA */}
          <div className="flex items-center gap-2.5">
            <a
              href={PORTFOLIO_DATA.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center justify-center w-8 h-8 rounded-full text-[#86868b] hover:text-[#1d1d1f] hover:bg-[#f5f5f7] transition-colors"
              aria-label="GitHub"
            >
              <GithubIcon className="w-4 h-4" />
            </a>

            <a
              href={PORTFOLIO_DATA.personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center justify-center w-8 h-8 rounded-full text-[#86868b] hover:text-[#0071e3] hover:bg-[#f5f5f7] transition-colors"
              aria-label="LinkedIn"
            >
              <LinkedInIcon className="w-4 h-4" />
            </a>

            <button
              type="button"
              onClick={() => handleNav("crear")}
              className="text-[12px] font-semibold px-4 py-1.5 rounded-full bg-[#1d1d1f] text-white hover:bg-black transition-colors cursor-pointer"
            >
              Cotizar / Contactar
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-[#1d1d1f] p-1.5 rounded-lg hover:bg-[#f5f5f7]"
              aria-label="Menú"
            >
              <span className="block w-5 h-px bg-current mb-1" />
              <span className="block w-5 h-px bg-current mb-1" />
              <span className="block w-5 h-px bg-current" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-x-0 top-14 z-40 md:hidden bg-white/95 backdrop-blur-xl border-b border-black/[0.06] px-6 py-4 flex flex-col gap-1 shadow-xl"
          >
            {NAV_CHAPTERS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNav(item.id)}
                className="text-left text-sm font-medium text-[#1d1d1f] py-2.5 border-b border-black/[0.04] last:border-0"
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
