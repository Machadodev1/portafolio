"use client";

import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Award, ArrowUpRight, Sparkles } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import type { StageChapter } from "@/components/ui/SpatialPortfolioOS";

interface AboutMeSectionProps {
  onNavigate?: (chapter: StageChapter) => void;
}

const appleEase = [0.16, 1, 0.3, 1] as const;

export const AboutMeSection: React.FC<AboutMeSectionProps> = ({ onNavigate }) => {
  const philosophyWords = PORTFOLIO_DATA.philosophyWords.split(" ");

  return (
    <section id="sobre-mi" className="py-16 md:py-24 bg-white border-t border-black/[0.06]">
      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        {/* Animated Apple Philosophy Banner */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: appleEase }}
          className="mb-16 p-7 sm:p-10 rounded-3xl bg-gradient-to-b from-[#fbfbfd] to-[#f5f5f7] border border-black/[0.06]"
        >
          <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-[#0071e3] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Filosofía de Ingeniería</span>
          </div>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-[-0.03em] leading-[1.28] text-[#1d1d1f]">
            {philosophyWords.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0.15, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: i * 0.035,
                  duration: 0.45,
                  ease: appleEase,
                }}
                className="inline-block mr-[0.24em]"
              >
                {word}
              </motion.span>
            ))}
          </h3>
        </motion.div>

        {/* Section Pill */}
        <p className="text-[11px] font-semibold uppercase tracking-widest text-[#86868b] mb-4">
          Sobre Mí · Perfil Profesional
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: Narrative Bio */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: appleEase }}
            className="lg:col-span-7"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[-0.035em] text-[#1d1d1f] leading-[1.12] mb-6">
              Desarrollador Junior comprometido con crear soluciones simples, eficientes y bien estructuradas.
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-[#86868b] leading-relaxed mb-8">
              <p>
                Actualmente me encuentro en mi <strong>etapa práctica</strong> como Tecnólogo en Análisis y Desarrollo de Software (SENA). Durante este período he fortalecido mi criterio técnico construyendo software real, abordando tanto la lógica de negocio en el backend con <strong>Django y Node.js</strong>, como experiencias visuales intuitivas con <strong>Flutter y Figma</strong>.
              </p>
              <p>
                No me conformo con que el código &quot;simplemente funcione&quot;: me enfoco en entender el porqué de cada decisión arquitectónica, modelar bases de datos seguras con <strong>PostgreSQL</strong> y optimizar la experiencia de usuario bajo los más altos estándares de calidad.
              </p>
              <p className="text-sm font-medium text-[#1d1d1f]">
                &quot;Me gusta aprender constantemente, colaborar de manera proactiva en equipo y resolver desafíos reales con código limpio.&quot;
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => onNavigate?.("crear")}
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-5 py-2.5 rounded-full bg-[#1d1d1f] text-white hover:bg-black transition-colors cursor-pointer"
              >
                Conversar sobre una oportunidad <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate?.("sigif")}
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-5 py-2.5 rounded-full border border-black/[0.1] text-[#1d1d1f] hover:bg-[#f5f5f7] transition-colors cursor-pointer"
              >
                Ver proyecto SIGIF
              </button>
            </div>
          </motion.div>

          {/* Right: Education & Credentials Grid with Staggered Entrance */}
          <div className="lg:col-span-5 space-y-4">
            {/* Card 1: SENA Education */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5, ease: appleEase }}
              whileHover={{ y: -3 }}
              className="p-6 rounded-2xl bg-[#fafafa] border border-black/[0.06] hover:bg-white hover:border-[#0071e3]/25 hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-[#0071e3]/10 flex items-center justify-center text-[#0071e3]">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#1d1d1f]">
                    Tecnólogo en ADSO
                  </h4>
                  <p className="text-[11px] text-[#86868b]">
                    SENA · En Etapa Práctica
                  </p>
                </div>
              </div>
              <p className="text-xs text-[#86868b] leading-relaxed">
                Análisis y Desarrollo de Software: formación integral en diseño de bases de datos, patrones de arquitectura, POO, pruebas unitarias y desarrollo web/móvil.
              </p>
            </motion.div>

            {/* Card 2: Formación Continua */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.22, duration: 0.5, ease: appleEase }}
              whileHover={{ y: -3 }}
              className="p-6 rounded-2xl bg-[#fafafa] border border-black/[0.06] hover:bg-white hover:border-[#0071e3]/25 hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-[#34c759]/10 flex items-center justify-center text-[#248a3d]">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#1d1d1f]">
                    Bachiller Académico &amp; Autodidacta
                  </h4>
                  <p className="text-[11px] text-[#86868b]">
                    En formación técnica continua
                  </p>
                </div>
              </div>
              <p className="text-xs text-[#86868b] leading-relaxed">
                Profundización constante en arquitecturas modernas, TypeScript, seguridad de APIs REST y estándares internacionales de diseño como Apple Human Interface.
              </p>
            </motion.div>

            {/* Card 3: Ubicación y Disponibilidad */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.34, duration: 0.5, ease: appleEase }}
              className="p-5 rounded-2xl bg-[#fafafa] border border-black/[0.06] flex items-center justify-between"
            >
              <div>
                <p className="text-[11px] font-semibold text-[#86868b] uppercase tracking-wider">
                  Ubicación &amp; Modalidad
                </p>
                <p className="text-sm font-bold text-[#1d1d1f]">
                  Medellín, Colombia · Remoto / Híbrido
                </p>
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-[#34c759] animate-pulse" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
