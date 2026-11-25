"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  Sparkles,
} from "lucide-react";
import { getPortfolioData } from "@/data/portfolio";
import { useSettings } from "@/context/SettingsContext";

const skillIconMap: Record<string, React.ReactNode> = {
  django: <Terminal className="w-5 h-5 text-[#0C4B33]" />,
  flutter: <Smartphone className="w-5 h-5 text-[#02569B]" />,
  node: <Server className="w-5 h-5 text-[#22C55E]" />,
  figma: <Layers className="w-5 h-5 text-[#F24E1E]" />,
  postgresql: <Database className="w-5 h-5 text-[#336791]" />,
};

const skillSnippetMap: Record<
  string,
  { file: string; lang: string; percentage: number; lines: string[] }
> = {
  django: {
    file: "api/views.py",
    lang: "Python · DRF",
    percentage: 92,
    lines: [
      "class FacturaViewSet(ModelViewSet):",
      "    permission_classes = [IsAuthenticated, RoleGuard]",
      "    queryset = Factura.objects.select_related('cliente')",
    ],
  },
  flutter: {
    file: "lib/screens/home_screen.dart",
    lang: "Dart · Flutter 60fps",
    percentage: 86,
    lines: [
      "Widget build(BuildContext context) {",
      "  return AnimatedContainer(duration: 300.ms,",
      "    child: CustomScrollView(slivers: [AppSliverBar()]));",
    ],
  },
  node: {
    file: "src/server/cron.ts",
    lang: "Node.js · TypeScript",
    percentage: 84,
    lines: [
      "cron.schedule('0 2 * * *', async () => {",
      "  const zip = await createDatabaseBackup();",
      "  await mailer.sendEncryptedDump(zip);",
    ],
  },
  figma: {
    file: "DesignSystem / AppleTokens.fig",
    lang: "UI/UX · AutoLayout",
    percentage: 90,
    lines: [
      "Token: Surface/Glass-Light -> #FFFFFF (85% Blur 24)",
      "Typography: SF-Pro-Display · Tracking -0.035em",
      "Grid: 12 Columns · Responsive Breakpoints Ready",
    ],
  },
  postgresql: {
    file: "migrations/004_indexes.sql",
    lang: "PostgreSQL · ACID",
    percentage: 90,
    lines: [
      "CREATE INDEX CONCURRENTLY idx_stock_critico",
      "ON inventario_producto (stock_actual, activo)",
      "WHERE stock_actual < 5 AND activo = TRUE;",
    ],
  },
};

const softIconList = [
  <Brain key="brain" className="w-4 h-4 text-[#0071e3]" />,
  <MessageSquareCode key="msg" className="w-4 h-4 text-[#34c759]" />,
  <Users key="users" className="w-4 h-4 text-[#ff9500]" />,
  <BookOpen key="book" className="w-4 h-4 text-[#af52de]" />,
];

const appleEase = [0.16, 1, 0.3, 1] as const;

export const SkillsSection: React.FC = () => {
  const { language, t } = useSettings();
  const data = getPortfolioData(language);
  const [selectedSkillId, setSelectedSkillId] = useState<string>("django");
  const activeSnippet = skillSnippetMap[selectedSkillId] || skillSnippetMap.django;
  const activeSkillObj =
    data.coreSkills.find((s) => s.id === selectedSkillId) || data.coreSkills[0];

  return (
    <section id="habilidades" className="py-16 md:py-24 bg-[#fbfbfd]">
      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        {/* Section Header */}
        <div className="mb-12">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-[#86868b] mb-3">
            {t("Capacidades & Habilidades Técnicas", "Core Capabilities & Technical Skills")}
          </p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[-0.035em] text-[#1d1d1f] mb-3">
                {t("Stack Core y Especialización", "Core Stack & Specialization")}
              </h2>
              <p className="text-base text-[#86868b] max-w-2xl leading-relaxed">
                {t(
                  "Toca o pasa el cursor sobre cualquier tecnología para ver un ejemplo real de cómo la implemento en producción.",
                  "Tap or hover over any technology card to inspect a live production snippet of how I use it."
                )}
              </p>
            </div>
            <span className="text-xs font-semibold px-3.5 py-1.5 rounded-full bg-white border border-black/[0.08] text-[#1d1d1f] shadow-2xs self-start md:self-auto">
              {t("5 Tecnologías Principales", "5 Core Technologies")}
            </span>
          </div>
        </div>

        {/* Live Animated Code/Architecture Inspector Banner */}
        <motion.div
          layout
          className="mb-10 rounded-3xl bg-white border border-black/[0.08] p-5 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.04)] grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
        >
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#0071e3] bg-[#0071e3]/10 px-3 py-1 rounded-full mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t("Inspector Interactivo en Vivo", "Live Interactive Inspector")}</span>
            </div>
            <h3 className="text-xl font-bold text-[#1d1d1f] mb-1">
              {activeSkillObj.name}
            </h3>
            <p className="text-xs text-[#86868b] leading-relaxed mb-4">
              {activeSkillObj.description}
            </p>
            {/* Animated Mastery Bar */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1.5">
                <span className="text-[#86868b]">
                  {t("Dominio Práctico", "Practical Proficiency")}
                </span>
                <span className="text-[#0071e3] font-mono">{activeSnippet.percentage}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-[#f5f5f7] overflow-hidden">
                <motion.div
                  key={selectedSkillId}
                  initial={{ width: "0%" }}
                  animate={{ width: `${activeSnippet.percentage}%` }}
                  transition={{ duration: 0.7, ease: appleEase }}
                  className="h-full rounded-full bg-gradient-to-r from-[#0071e3] to-[#34c759]"
                />
              </div>
            </div>
          </div>

          {/* Animated macOS Mini Terminal */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl overflow-hidden bg-[#1e1e1e] border border-black/[0.12] shadow-lg">
              <div className="flex items-center justify-between px-4 py-2.5 bg-[#252526] border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                  <span className="ml-2 text-[11px] font-mono text-white/60">
                    {activeSnippet.file}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#47a3ff]">
                  {activeSnippet.lang}
                </span>
              </div>

              <div className="p-4 sm:p-5 font-mono text-xs leading-[1.9] min-h-[115px] flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedSkillId}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-1"
                  >
                    {activeSnippet.lines.map((line, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1, duration: 0.35 }}
                        className="flex items-center gap-3"
                      >
                        <span className="text-white/25 select-none w-4 text-right">
                          {i + 1}
                        </span>
                        <span className="text-[#d4d4d4] whitespace-pre overflow-x-auto">
                          {line}
                        </span>
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 5 Core Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {data.coreSkills.map((skill, index) => {
            const isSelected = selectedSkillId === skill.id;
            const pct = skillSnippetMap[skill.id]?.percentage || 85;
            return (
              <motion.div
                key={skill.id}
                onMouseEnter={() => setSelectedSkillId(skill.id)}
                onClick={() => setSelectedSkillId(skill.id)}
                initial={{ opacity: 0, y: 20, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: appleEase }}
                whileHover={{ y: -4 }}
                className={`p-7 rounded-3xl bg-white border transition-all duration-300 flex flex-col justify-between group cursor-pointer ${
                  isSelected
                    ? "border-[#0071e3] shadow-[0_20px_50px_rgba(0,113,227,0.1)]"
                    : "border-black/[0.07] shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:border-[#0071e3]/30"
                }`}
              >
                <div>
                  {/* Top Badge & Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-11 h-11 rounded-2xl bg-[#f5f5f7] border border-black/[0.04] flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                      {skillIconMap[skill.id]}
                    </div>
                    <span
                      className={`text-[11px] font-semibold px-3 py-1 rounded-full transition-colors ${
                        isSelected
                          ? "bg-[#0071e3] text-white"
                          : "bg-[#f5f5f7] text-[#86868b]"
                      }`}
                    >
                      {skill.category}
                    </span>
                  </div>

                  {/* Skill Name */}
                  <h3 className="text-xl font-bold tracking-tight text-[#1d1d1f] mb-2 group-hover:text-[#0071e3] transition-colors">
                    {skill.name}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-[#86868b] leading-relaxed mb-5">
                    {skill.description}
                  </p>
                </div>

                <div>
                  {/* Animated Progress Indicator inside each card */}
                  <div className="h-1.5 w-full rounded-full bg-[#f5f5f7] overflow-hidden mb-4">
                    <motion.div
                      initial={{ width: "0%" }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.9, delay: 0.2 + index * 0.1, ease: appleEase }}
                      className="h-full rounded-full bg-[#1d1d1f] group-hover:bg-[#0071e3] transition-colors"
                    />
                  </div>

                  {/* Highlights Chips */}
                  <div className="pt-3 border-t border-black/[0.05] space-y-1.5">
                    {skill.highlights.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 text-xs text-[#1d1d1f] font-medium"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#34c759] shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}

          {/* Practical Engineering Standard Card */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.42, ease: appleEase }}
            whileHover={{ y: -4 }}
            className="p-7 rounded-3xl bg-[#1d1d1f] text-white shadow-[0_20px_50px_rgba(0,0,0,0.12)] flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center">
                  <Cpu className="w-5 h-5 text-[#34c759]" />
                </div>
                <span className="text-[11px] font-semibold text-white/70 px-3 py-1 rounded-full bg-white/10">
                  {t("Desarrollador Junior", "Junior Developer")}
                </span>
              </div>

              <h3 className="text-xl font-bold tracking-tight text-white mb-2">
                {t("Enfoque Práctico", "Hands-On Engineering")}
              </h3>

              <p className="text-sm text-white/70 leading-relaxed mb-6">
                {t(
                  "Más allá de la teoría, aplico buenas prácticas de ingeniería de software en proyectos reales: arquitectura modular, control de versiones riguroso con Git y código limpio orientado a producción.",
                  "Beyond theory, I apply software engineering best practices in real projects: modular architecture, strict Git version control, and production-ready clean code."
                )}
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/60">
              <span>{t("Etapa Práctica Activa", "Active Internship Stage")}</span>
              <span className="text-[#34c759] font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#34c759] animate-pulse" />
                {t("Disponible", "Available")}
              </span>
            </div>
          </motion.div>
        </div>

        {/* Soft Skills Section */}
        <div className="pt-10 border-t border-black/[0.06]">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-[#86868b] mb-6">
            {t("Competencias y Habilidades Personales", "Soft Skills & Personal Competencies")}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {data.softSkills.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.08, duration: 0.45 }}
                whileHover={{ y: -2 }}
                className="p-5 rounded-2xl bg-white border border-black/[0.05] shadow-2xs hover:border-black/[0.15] transition-all"
              >
                <div className="w-8 h-8 rounded-xl bg-[#f5f5f7] flex items-center justify-center mb-3">
                  {softIconList[i % softIconList.length]}
                </div>
                <h4 className="text-sm font-semibold text-[#1d1d1f] mb-1">
                  {item.title}
                </h4>
                <p className="text-xs text-[#86868b] leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
