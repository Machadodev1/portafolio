"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { GithubIcon, LinkedInIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-white/90 backdrop-blur-xl border-b border-black/[0.06] shadow-[0_2px_15px_rgba(0,0,0,0.02)]"
            : "bg-transparent"
        )}
      >
        <div className="max-w-6xl mx-auto px-6 sm:px-10 h-14 flex items-center justify-between">
          {/* Wordmark & Junior Badge */}
          <a
            href="#inicio"
            className="flex items-center gap-2 text-sm font-semibold tracking-tight text-[#1d1d1f] hover:text-[#0071e3] transition-colors select-none"
          >
            <span>Andrés Machado</span>
            <span className="text-[10px] font-semibold text-[#86868b] px-2 py-0.5 rounded-full bg-[#f5f5f7] border border-black/[0.04]">
              Junior
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-7">
            {PORTFOLIO_DATA.navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-[13px] text-[#86868b] hover:text-[#1d1d1f] transition-colors font-medium"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Direct Social Links & Contact CTA */}
          <div className="flex items-center gap-3">
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

            <a
              href="#contacto"
              className="text-[13px] font-medium px-4 py-1.5 rounded-full bg-[#1d1d1f] text-white hover:bg-black transition-colors"
            >
              Contactar
            </a>

            <button
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
            {PORTFOLIO_DATA.navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm font-medium text-[#1d1d1f] py-2.5 border-b border-black/[0.04] last:border-0"
              >
                {item.label}
              </a>
            ))}
            <div className="flex items-center gap-4 pt-3 mt-1">
              <a
                href={PORTFOLIO_DATA.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-[#86868b] flex items-center gap-1.5"
              >
                <GithubIcon className="w-4 h-4" /> GitHub
              </a>
              <a
                href={PORTFOLIO_DATA.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-[#0071e3] flex items-center gap-1.5"
              >
                <LinkedInIcon className="w-4 h-4" /> LinkedIn
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
