"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Terminal,
  Smartphone,
  Server,
  Layers,
  Database,
  CheckCircle2,
  Cpu,
  Brain,
  Users,
  MessageSquareCode,
  BookOpen,
} from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio";

const skillIconMap: Record<string, React.ReactNode> = {
  django: <Terminal className="w-5 h-5 text-[#0C4B33]" />,
  flutter: <Smartphone className="w-5 h-5 text-[#02569B]" />,
  node: <Server className="w-5 h-5 text-[#22C55E]" />,
  figma: <Layers className="w-5 h-5 text-[#F24E1E]" />,
  postgresql: <Database className="w-5 h-5 text-[#336791]" />,
};

const softIcons: Record<string, React.ReactNode> = {
  "Lógica de Programación": <Brain className="w-4 h-4 text-[#0071e3]" />,
  "Comunicación Asertiva": <MessageSquareCode className="w-4 h-4 text-[#34c759]" />,
  "Trabajo en Equipo": <Users className="w-4 h-4 text-[#ff9500]" />,
  "Aprendizaje Autónomo": <BookOpen className="w-4 h-4 text-[#af52de]" />,
};

export const SkillsSection: React.FC = () => {
  return (
    <section id="habilidades" className="py-24 md:py-32 bg-[#fbfbfd] border-t border-black/[0.06]">
      <div className="max-w-6xl mx-auto px-6 sm:px-10">

        {/* Section Header */}
        <div className="mb-16">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-[#86868b] mb-3">
            Capacidades &amp; Habilidades Técnicas
          </p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[-0.035em] text-[#1d1d1f] mb-3">
                Stack Core y Especialización
              </h2>
              <p className="text-base text-[#86868b] max-w-2xl leading-relaxed">
                Herramientas con las que diseño, construyo y despliego productos de software funcionales y escalables en mi etapa práctica.
              </p>
            </div>
            <span className="text-xs font-semibold px-3.5 py-1.5 rounded-full bg-white border border-black/[0.08] text-[#1d1d1f] shadow-sm self-start md:self-auto">
              5 Tecnologías Principales
            </span>
          </div>
        </div>

        {/* 5 Core Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {PORTFOLIO_DATA.coreSkills.map((skill, index) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="p-7 rounded-3xl bg-white border border-black/[0.07] shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_50px_rgba(0,113,227,0.06)] hover:border-[#0071e3]/20 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Top Badge & Icon */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-11 h-11 rounded-2xl bg-[#f5f5f7] border border-black/[0.04] flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                    {skillIconMap[skill.id]}
                  </div>
                  <span className="text-[11px] font-semibold text-[#86868b] px-3 py-1 rounded-full bg-[#f5f5f7]">
                    {skill.category}
                  </span>
                </div>

                {/* Skill Name */}
                <h3 className="text-xl font-bold tracking-tight text-[#1d1d1f] mb-2 group-hover:text-[#0071e3] transition-colors">
                  {skill.name}
                </h3>

                {/* Description */}
                <p className="text-sm text-[#86868b] leading-relaxed mb-6">
                  {skill.description}
                </p>
              </div>

              {/* Highlights Chips */}
              <div className="pt-4 border-t border-black/[0.05] space-y-1.5">
                {skill.highlights.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-[#1d1d1f] font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#34c759] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}

          {/* Practical Engineering Standard Card */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="p-7 rounded-3xl bg-[#1d1d1f] text-white shadow-[0_20px_50px_rgba(0,0,0,0.12)] flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center">
                  <Cpu className="w-5 h-5 text-[#34c759]" />
                </div>
                <span className="text-[11px] font-semibold text-white/60 px-3 py-1 rounded-full bg-white/10">
                  Desarrollador Junior
                </span>
              </div>

              <h3 className="text-xl font-bold tracking-tight text-white mb-2">
                Enfoque Práctico
              </h3>

              <p className="text-sm text-white/70 leading-relaxed mb-6">
                Más allá de la teoría, aplico buenas prácticas de ingeniería de software en proyectos reales: arquitectura modular, control de versiones riguroso con Git y código limpio orientado a producción.
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/60">
              <span>Etapa Práctica Activa</span>
              <span className="text-[#34c759] font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#34c759] animate-pulse" />
                Disponible
              </span>
            </div>
          </motion.div>
        </div>

        {/* Soft Skills Section (From Figma: Lógica, Comunicación, Trabajo en equipo, etc.) */}
        <div className="pt-12 border-t border-black/[0.06]">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-[#86868b] mb-8">
            Competencias y Habilidades Personales
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PORTFOLIO_DATA.softSkills.map((item, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-white border border-black/[0.05] shadow-sm hover:border-black/[0.12] transition-colors"
              >
                <div className="w-8 h-8 rounded-xl bg-[#f5f5f7] flex items-center justify-center mb-3">
                  {softIcons[item.title] || <Brain className="w-4 h-4 text-[#0071e3]" />}
                </div>
                <h4 className="text-sm font-semibold text-[#1d1d1f] mb-1">
                  {item.title}
                </h4>
                <p className="text-xs text-[#86868b] leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
