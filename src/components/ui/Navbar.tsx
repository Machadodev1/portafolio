"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, Sun, Moon, Globe, Check } from "lucide-react";
import { getPortfolioData } from "@/data/portfolio";
import { GithubIcon, LinkedInIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";
import { useSettings } from "@/context/SettingsContext";
import type { StageChapter } from "@/components/ui/SpatialPortfolioOS";

interface NavbarProps {
  activeChapter?: StageChapter;
  onSelectChapter?: (chapter: StageChapter) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeChapter = "perfil",
  onSelectChapter,
}) => {
  const { theme, setTheme, language, setLanguage, t } = useSettings();
  const data = getPortfolioData(language);

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const settingsRef = useRef<HTMLDivElement>(null);

  const navChapters: { id: StageChapter; label: string }[] = [
    { id: "perfil", label: t("Sobre Mí & Perfil", "About & Profile") },
    { id: "habilidades", label: t("Habilidades", "Skills") },
    { id: "sigif", label: t("Proyecto SIGIF", "SIGIF Project") },
    { id: "crear", label: t("Armar tu Proyecto", "Build a Project") },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close settings popover on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (settingsRef.current && !settingsRef.current.contains(e.target as Node)) {
        setSettingsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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
            {navChapters.map((item) => {
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

          {/* Direct Social Links, Settings Control Center & Contact CTA */}
          <div className="flex items-center gap-2">
            <a
              href={data.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center justify-center w-8 h-8 rounded-full text-[#86868b] hover:text-[#1d1d1f] hover:bg-[#f5f5f7] transition-colors"
              aria-label="GitHub"
            >
              <GithubIcon className="w-4 h-4" />
            </a>

            <a
              href={data.personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center justify-center w-8 h-8 rounded-full text-[#86868b] hover:text-[#0071e3] hover:bg-[#f5f5f7] transition-colors"
              aria-label="LinkedIn"
            >
              <LinkedInIcon className="w-4 h-4" />
            </a>

            {/* ================= APPLE CONTROL CENTER SETTINGS POPOVER ================= */}
            <div ref={settingsRef} className="relative">
              <button
                type="button"
                onClick={() => setSettingsOpen((prev) => !prev)}
                aria-label={t("Configuración", "Settings")}
                className={cn(
                  "inline-flex items-center gap-1.5 h-8 px-3 rounded-full text-xs font-semibold border transition-all cursor-pointer",
                  settingsOpen
                    ? "bg-[#0071e3] text-white border-[#0071e3] shadow-sm"
                    : "bg-[#f5f5f7] text-[#1d1d1f] border-black/[0.06] hover:border-black/[0.15]"
                )}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span className="hidden lg:inline">{t("Ajustes", "Settings")}</span>
                <span className="text-[10px] uppercase font-mono opacity-80">
                  {language.toUpperCase()}
                </span>
              </button>

              <AnimatePresence>
                {settingsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.96 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute right-0 mt-2.5 w-72 rounded-3xl bg-white/95 backdrop-blur-2xl border border-black/[0.08] shadow-[0_25px_60px_rgba(0,0,0,0.16)] p-5 z-50 select-none"
                  >
                    <div className="flex items-center justify-between pb-3 mb-4 border-b border-black/[0.06]">
                      <span className="text-xs font-bold tracking-tight text-[#1d1d1f]">
                        {t("Centro de Configuración", "Control Center")}
                      </span>
                      <span className="text-[10px] font-mono text-[#0071e3] bg-[#0071e3]/10 px-2 py-0.5 rounded-full font-semibold">
                        Apple OS
                      </span>
                    </div>

                    {/* Theme Selector (Light / Dark) */}
                    <div className="mb-4">
                      <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#86868b] mb-2">
                        {t("Apariencia", "Appearance")}
                      </label>
                      <div className="grid grid-cols-2 gap-2 p-1 rounded-2xl bg-[#f5f5f7] border border-black/[0.05]">
                        <button
                          type="button"
                          onClick={() => setTheme("light")}
                          className={cn(
                            "py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer",
                            theme === "light"
                              ? "bg-white text-[#1d1d1f] shadow-xs"
                              : "text-[#86868b] hover:text-[#1d1d1f]"
                          )}
                        >
                          <Sun className="w-3.5 h-3.5 text-[#ff9500]" />
                          <span>{t("Claro", "Light")}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setTheme("dark")}
                          className={cn(
                            "py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer",
                            theme === "dark"
                              ? "bg-white text-[#1d1d1f] shadow-xs"
                              : "text-[#86868b] hover:text-[#1d1d1f]"
                          )}
                        >
                          <Moon className="w-3.5 h-3.5 text-[#0071e3]" />
                          <span>{t("Oscuro", "Dark")}</span>
                        </button>
                      </div>
                    </div>

                    {/* Language Selector (Español / English) */}
                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#86868b] mb-2">
                        {t("Idioma del Portafolio", "Portfolio Language")}
                      </label>
                      <div className="space-y-1.5">
                        {(
                          [
                            { code: "es", name: "Español", region: "CO / LATAM" },
                            { code: "en", name: "English", region: "US / Global" },
                          ] as const
                        ).map((langObj) => {
                          const active = language === langObj.code;
                          return (
                            <button
                              key={langObj.code}
                              type="button"
                              onClick={() => setLanguage(langObj.code)}
                              className={cn(
                                "w-full px-3.5 py-2.5 rounded-xl border text-left text-xs transition-all flex items-center justify-between cursor-pointer",
                                active
                                  ? "bg-[#0071e3]/10 border-[#0071e3]/35 text-[#0071e3] font-bold"
                                  : "bg-[#fafafa] border-black/[0.05] text-[#1d1d1f] hover:bg-white"
                              )}
                            >
                              <div className="flex items-center gap-2">
                                <Globe className="w-3.5 h-3.5" />
                                <span>{langObj.name}</span>
                                <span className="text-[10px] text-[#86868b] font-normal">
                                  ({langObj.region})
                                </span>
                              </div>
                              {active && <Check className="w-3.5 h-3.5 text-[#0071e3]" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              type="button"
              onClick={() => handleNav("crear")}
              className="text-[12px] font-semibold px-4 py-1.5 rounded-full bg-[#1d1d1f] text-white hover:bg-black transition-colors cursor-pointer"
            >
              {t("Cotizar / Contactar", "Start a Project")}
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
            {navChapters.map((item) => (
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
