"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import { getPortfolioData } from "@/data/portfolio";
import { useSettings } from "@/context/SettingsContext";

const ease = [0.16, 1, 0.3, 1] as const;

export const ProjectShowcase: React.FC = () => {
  const { language, t } = useSettings();
  const p = getPortfolioData(language).featuredProject;

  return (
    <section id="proyecto" className="py-16 md:py-24 border-t border-black/[0.06] bg-[#fafafa]">
      <div className="max-w-6xl mx-auto px-6 sm:px-10">

        {/* Header */}
        <div className="mb-14">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-[#86868b] mb-4">
            {t("Proyecto destacado", "Featured Project")}
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h2 className="text-5xl sm:text-6xl font-semibold tracking-[-0.04em] text-[#1d1d1f] mb-2">
                {p.title}
              </h2>
              <p className="text-sm text-[#86868b] font-medium max-w-xl">
                {p.fullName}
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <a
                href={p.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium px-5 py-2.5 rounded-full bg-[#1d1d1f] text-white hover:bg-black transition-colors"
              >
                Live Demo <ArrowUpRight className="w-4 h-4" />
              </a>
              <a
                href={p.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium px-5 py-2.5 rounded-full border border-black/[0.12] text-[#1d1d1f] hover:bg-white transition-colors"
              >
                <GithubIcon className="w-4 h-4" /> {t("Código", "Source Code")}
              </a>
            </div>
          </div>
        </div>

        {/* Description + Highlights */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 mb-16">
          <div className="lg:col-span-2">
            <p className="text-lg text-[#1d1d1f] leading-relaxed mb-6">
              {p.tagline}
            </p>
            <p className="text-base text-[#86868b] leading-relaxed">
              {p.description}
            </p>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-[#86868b] mb-4">
              Stack
            </p>
            <ul className="space-y-2">
              {p.stack.map((s) => (
                <li key={s} className="text-sm font-medium text-[#1d1d1f] flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-[#0071e3] shrink-0" />
                  {s}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-[#86868b] mb-4">
                {t("Funcionalidades clave", "Key Capabilities")}
              </p>
              <div className="flex flex-wrap gap-2">
                {p.highlights.map((h) => (
                  <span
                    key={h}
                    className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-[#eef4ff] text-[#0071e3] border border-[#0071e3]/20"
                  >
                    {h}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Modules Grid */}
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-[#86868b] mb-8">
            {t("Módulos del sistema", "System Modules")}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-black/[0.06]">
            {p.modules.map((mod, i) => (
              <motion.div
                key={mod.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.07, ease }}
                className="bg-[#fafafa] p-8 hover:bg-white transition-colors duration-300"
              >
                <p className="text-xs font-mono text-[#86868b] mb-3">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="text-base font-semibold text-[#1d1d1f] mb-3">
                  {mod.title}
                </h3>
                <p className="text-sm text-[#86868b] leading-relaxed">
                  {mod.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
