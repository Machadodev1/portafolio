"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, MessageSquare, Terminal, Smartphone, Server, Layers, Database } from "lucide-react";
import { getPortfolioData } from "@/data/portfolio";
import { GithubIcon } from "@/components/ui/Icons";
import { AppleVectorAvatar } from "@/components/ui/AppleVectorAvatar";
import { useSettings } from "@/context/SettingsContext";
import type { StageChapter } from "@/components/ui/SpatialPortfolioOS";

const ease = [0.16, 1, 0.3, 1] as const;

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease, delay },
});

const skillIcons: Record<string, React.ReactNode> = {
  django: <Terminal className="w-3.5 h-3.5 text-[#0C4B33]" />,
  flutter: <Smartphone className="w-3.5 h-3.5 text-[#02569B]" />,
  node: <Server className="w-3.5 h-3.5 text-[#22C55E]" />,
  figma: <Layers className="w-3.5 h-3.5 text-[#F24E1E]" />,
  postgresql: <Database className="w-3.5 h-3.5 text-[#336791]" />,
};

interface HeroSectionProps {
  onNavigate?: (chapter: StageChapter) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  const { language, t } = useSettings();
  const data = getPortfolioData(language);

  return (
    <section id="inicio" className="min-h-[88vh] pt-24 pb-16 flex items-center bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 sm:px-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-center">

          {/* Left Column: Personal Presentation & Capabilities */}
          <div className="lg:col-span-7">
            
            {/* Status Badge */}
            <motion.div {...fade(0)} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f5f5f7] border border-black/[0.06] mb-6">
              <span className="w-2 h-2 rounded-full bg-[#34c759] animate-pulse" />
              <span className="text-xs font-semibold text-[#1d1d1f] tracking-tight">
                {data.personal.title}
              </span>
              <span className="text-[#86868b] text-xs">·</span>
              <span className="text-xs text-[#0071e3] font-medium">
                {data.personal.status}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              {...fade(0.1)}
              className="text-[40px] sm:text-[50px] md:text-[60px] font-semibold tracking-[-0.035em] leading-[1.06] text-[#1d1d1f] mb-6"
            >
              {t("Soy Andrés Machado.", "I'm Andrés Machado.")}{" "}
              <span className="text-[#86868b] block sm:inline font-normal">
                {t("Desarrollador Junior.", "Junior Developer.")}
              </span>
            </motion.h1>

            {/* Subheadline & Bio */}
            <motion.p {...fade(0.2)} className="text-base sm:text-lg text-[#86868b] leading-relaxed mb-8 max-w-xl">
              {data.personal.biography}
            </motion.p>

            {/* Primary Capabilities & Skills Badges */}
            <motion.div {...fade(0.28)} className="mb-10">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-[#86868b] mb-3">
                {t(
                  "Habilidades Principales (Toca para ver en detalle)",
                  "Core Skills (Tap to inspect)"
                )}
              </p>
              <div className="flex flex-wrap gap-2">
                {data.coreSkills.map((skill) => (
                  <button
                    key={skill.id}
                    type="button"
                    onClick={() => onNavigate?.("habilidades")}
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-black/[0.08] bg-[#fbfbfd] hover:bg-white hover:border-[#0071e3]/35 hover:shadow-sm transition-all duration-200 select-none cursor-pointer"
                  >
                    {skillIcons[skill.id]}
                    <span className="text-xs font-semibold text-[#1d1d1f]">
                      {skill.name}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div {...fade(0.35)} className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => onNavigate?.("crear")}
                className="inline-flex items-center gap-2 text-sm font-medium px-6 py-3 rounded-full bg-[#1d1d1f] text-white hover:bg-black transition-colors shadow-sm cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />{" "}
                {t("Armar un Proyecto", "Build a Project")}
              </button>
              <button
                type="button"
                onClick={() => onNavigate?.("habilidades")}
                className="inline-flex items-center gap-1.5 text-sm font-medium px-5 py-3 rounded-full border border-black/[0.12] text-[#1d1d1f] hover:bg-[#f5f5f7] transition-colors cursor-pointer"
              >
                {t("Ver Habilidades", "View Skills")} <ArrowUpRight className="w-4 h-4" />
              </button>
              <a
                href={data.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium px-4 py-3 rounded-full text-[#86868b] hover:text-[#1d1d1f] transition-colors"
              >
                <GithubIcon className="w-4 h-4" /> GitHub
              </a>
            </motion.div>

          </div>

          {/* Right Column: Apple 3D Cutout Avatar */}
          <div className="lg:col-span-5 flex justify-center">
            <AppleVectorAvatar onNavigate={onNavigate} />
          </div>

        </div>
      </div>
    </section>
  );
};
