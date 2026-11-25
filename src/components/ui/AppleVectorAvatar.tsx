"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  MapPin,
  CheckCircle2,
  Code2,
  Sparkles,
  Coffee,
  Rocket,
  X,
  UserCheck,
} from "lucide-react";

import type { StageChapter } from "@/components/ui/SpatialPortfolioOS";

type AvatarMood = "idle" | "coding" | "thinking" | "celebrating" | "speaking";

interface ActionOption {
  id: string;
  icon: React.ReactNode;
  label: string;
  badge?: string;
  mood: AvatarMood;
  response: {
    title: string;
    description: string;
    subtext?: string;
    quickAction?: {
      label: string;
      href?: string;
      chapter?: StageChapter;
    };
  };
}

const ACTION_OPTIONS: ActionOption[] = [
  {
    id: "capabilities",
    icon: <Code2 className="w-3.5 h-3.5 text-[#0071e3]" />,
    label: "¿Qué puedo hacer?",
    badge: "Stack",
    mood: "coding",
    response: {
      title: "Backend & Mobile Fullstack",
      description:
        "Desarrollo backends seguros en Django & Node.js, apps móviles fluidas en Flutter y modelos relacionales en PostgreSQL con diseño en Figma.",
      subtext: "Especializado en arquitecturas limpias y APIs de alto rendimiento.",
      quickAction: {
        label: "Explorar Habilidades",
        chapter: "habilidades",
      },
    },
  },
  {
    id: "sigif",
    icon: <Rocket className="w-3.5 h-3.5 text-[#ff9500]" />,
    label: "¿Cuál es mi mayor proyecto?",
    badge: "Keynote",
    mood: "celebrating",
    response: {
      title: "SIGIF: Sistema Financiero & Stock",
      description:
        "Plataforma empresarial completa con protección contra fuerza bruta, facturación con IVA del 19%, inventario automático y auditoría forense.",
      subtext: "100% operativo en producción con Django y PostgreSQL.",
      quickAction: {
        label: "Ver Demo de SIGIF",
        chapter: "sigif",
      },
    },
  },
  {
    id: "availability",
    icon: <Coffee className="w-3.5 h-3.5 text-[#34c759]" />,
    label: "¿Estoy disponible para trabajar?",
    badge: "Junior",
    mood: "speaking",
    response: {
      title: "¡Sí, en etapa práctica activa!",
      description:
        "Estoy radicado en Medellín, Colombia y disponible para vinculación inmediata en modalidad remota o híbrida como Desarrollador Junior.",
      subtext: "Abierto a retos de alto aprendizaje y proyectos ambiciosos.",
      quickAction: {
        label: "Armar un proyecto conmigo",
        chapter: "crear",
      },
    },
  },
  {
    id: "fun_fact",
    icon: <Sparkles className="w-3.5 h-3.5 text-[#af52de]" />,
    label: "Mi filosofía de código",
    badge: "Apple Standard",
    mood: "thinking",
    response: {
      title: "Simplicidad y Precisión",
      description:
        "No tolero el código desordenado ni las interfaces lentas. Prefiero soluciones elegantes y comprobadas con tests que resuelvan problemas reales.",
      subtext: "Cuidando cada micro-detalle del diseño y del backend.",
    },
  },
];

interface AppleVectorAvatarProps {
  onNavigate?: (chapter: StageChapter) => void;
}

export const AppleVectorAvatar: React.FC<AppleVectorAvatarProps> = ({ onNavigate }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeAction, setActiveAction] = useState<ActionOption | null>(null);
  const [activeMood, setActiveMood] = useState<AvatarMood>("idle");
  const [isWaving, setIsWaving] = useState(false);

  // Mouse tilt motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Physics spring for silky smooth Apple tilt
  const springConfig = { damping: 22, stiffness: 180, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // 3D Tilt transforms
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-14, 14]);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [12, -12]);

  // Multilayer Parallax Offsets
  const portraitX = useTransform(smoothX, [-0.5, 0.5], [-14, 14]);
  const portraitY = useTransform(smoothY, [-0.5, 0.5], [-10, 10]);
  const haloX = useTransform(smoothX, [-0.5, 0.5], [18, -18]);
  const haloY = useTransform(smoothY, [-0.5, 0.5], [16, -16]);

  // Dynamic Specular Glare following cursor
  const glareX = useTransform(smoothX, [-0.5, 0.5], ["10%", "90%"]);
  const glareY = useTransform(smoothY, [-0.5, 0.5], ["10%", "90%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleAvatarClick = () => {
    setIsWaving(true);
    setTimeout(() => setIsWaving(false), 800);
    setMenuOpen((prev) => !prev);
    if (!menuOpen && !activeAction) {
      setActiveMood("speaking");
    }
  };

  const selectOption = (opt: ActionOption) => {
    setActiveAction(opt);
    setActiveMood(opt.mood);
    setIsWaving(true);
    setTimeout(() => setIsWaving(false), 600);
  };

  const closeDialog = () => {
    setActiveAction(null);
    setActiveMood("idle");
  };

  return (
    <div
      style={{ perspective: 1200 }}
      className="relative w-full max-w-[390px] sm:max-w-[430px] mx-auto select-none"
    >
      {/* Apple Ambient Aura behind card */}
      <div className="absolute inset-0 m-auto w-64 h-64 rounded-full bg-gradient-to-tr from-[#0071E3]/15 via-[#28C76F]/10 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* Main Apple 3D Interactive Card */}
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative rounded-[36px] bg-white border border-black/[0.08] p-6 sm:p-7 shadow-[0_25px_60px_rgba(0,0,0,0.06)] hover:shadow-[0_35px_80px_rgba(0,113,227,0.12)] transition-shadow duration-500 overflow-hidden group"
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between pb-3.5 border-b border-black/[0.05] mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#34c759] animate-pulse" />
            <span className="text-xs font-semibold tracking-tight text-[#1d1d1f]">
              Andrés Machado
            </span>
          </div>

          <button
            onClick={handleAvatarClick}
            className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#0071e3] hover:text-[#005bb5] px-2.5 py-1 rounded-full bg-[#0071e3]/10 hover:bg-[#0071e3]/15 transition-all cursor-pointer"
          >
            <Sparkles className="w-3 h-3" />
            <span>{menuOpen ? "Cerrar menú" : "Tócame · Opciones"}</span>
          </button>
        </div>

        {/* Central Character Stage: Cutout 3D Avatar + Parallax Depth Layers */}
        <div
          onClick={handleAvatarClick}
          className="relative w-full h-[300px] sm:h-[320px] flex items-end justify-center overflow-hidden rounded-2xl bg-gradient-to-b from-[#fbfbfd] via-[#f7f8fa] to-[#eff1f5] border border-black/[0.04] cursor-pointer"
        >
          {/* Background Ambient Depth Ring (Parallaxes opposite to cursor) */}
          <motion.div
            style={{ x: haloX, y: haloY }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 rounded-full bg-gradient-to-tr from-[#0071E3]/8 via-white to-[#28C76F]/8 border border-black/[0.04] shadow-[0_8px_32px_rgba(0,113,227,0.05)]"
          />

          {/* Interactive Click Invitation Banner */}
          {!menuOpen && !activeAction && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="absolute top-3 px-3 py-1 rounded-full bg-white/90 border border-black/[0.06] shadow-sm text-[11px] text-[#86868b] flex items-center gap-1.5 z-20 pointer-events-none backdrop-blur-md"
            >
              <UserCheck className="w-3 h-3 text-[#0071e3]" />
              <span>Haz clic en mí para interactuar</span>
            </motion.div>
          )}

          {/* 3D Cutout Avatar of Andrés (Transparent Background) */}
          <motion.div
            style={{
              x: portraitX,
              y: portraitY,
              transformStyle: "preserve-3d",
            }}
            animate={
              isWaving
                ? {
                    scale: [1, 1.05, 0.98, 1.03, 1],
                    rotate: [0, 2.5, -2.5, 1.5, 0],
                  }
                : {
                    scale: 1,
                    rotate: 0,
                  }
            }
            transition={{ duration: 0.6 }}
            className="relative z-10 w-[260px] h-[275px] sm:w-[285px] sm:h-[300px] drop-shadow-[0_18px_28px_rgba(0,0,0,0.12)]"
          >
            <Image
              src="/avatar_3d_nobg.png"
              alt="Andrés Machado · Avatar 3D"
              fill
              priority
              className="object-contain object-bottom transition-transform duration-500 group-hover:scale-[1.03]"
              sizes="(max-width: 640px) 260px, 300px"
            />
          </motion.div>

          {/* Dynamic Floating Badge Based on Mood */}
          <AnimatePresence>
            {activeMood !== "idle" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 10 }}
                className="absolute bottom-3.5 z-20 px-3 py-1 rounded-full bg-white/95 border border-black/[0.08] shadow-md text-[11px] font-semibold text-[#1d1d1f] flex items-center gap-1.5 pointer-events-none backdrop-blur-md"
              >
                {activeMood === "coding" && <span className="text-[#0071e3]">💻 Modo Desarrollo Activo</span>}
                {activeMood === "celebrating" && <span className="text-[#ff9500]">🚀 SIGIF en Producción</span>}
                {activeMood === "speaking" && <span className="text-[#34c759]">☕ Disponible para proyectos</span>}
                {activeMood === "thinking" && <span className="text-[#af52de]">✨ Código limpio y probado</span>}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ================= RPG / GAME DIALOG RESPONSE BOX ================= */}
        <AnimatePresence mode="wait">
          {activeAction && (
            <motion.div
              key={activeAction.id}
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.98 }}
              className="mt-4 p-4 rounded-2xl bg-[#fbfbfd] border border-black/[0.07] relative"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#1d1d1f]">
                  <span className="p-1 rounded-md bg-white border border-black/[0.06]">
                    {activeAction.icon}
                  </span>
                  <span>{activeAction.response.title}</span>
                </div>
                <button
                  onClick={closeDialog}
                  className="p-1 rounded-full text-[#86868b] hover:text-[#1d1d1f] hover:bg-black/[0.05] transition-colors"
                  aria-label="Cerrar diálogo"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <p className="text-xs text-[#86868b] leading-relaxed mb-2.5">
                {activeAction.response.description}
              </p>

              {activeAction.response.subtext && (
                <p className="text-[11px] font-medium text-[#1d1d1f] mb-3">
                  ✦ {activeAction.response.subtext}
                </p>
              )}

              {activeAction.response.quickAction && (
                <button
                  type="button"
                  onClick={() => {
                    if (activeAction.response.quickAction?.chapter && onNavigate) {
                      onNavigate(activeAction.response.quickAction.chapter);
                    }
                  }}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#0071e3] hover:underline cursor-pointer"
                >
                  <span>{activeAction.response.quickAction.label}</span>
                  <span>&rarr;</span>
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ================= GAME ACTION MENU (ESTILO DIÁLOGO RPG) ================= */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="mt-4 space-y-1.5 overflow-hidden"
            >
              <p className="text-[10px] font-mono uppercase tracking-wider text-[#86868b] px-1 mb-1">
                SELECCIONA UNA PREGUNTA / ACCIÓN
              </p>
              {ACTION_OPTIONS.map((opt) => {
                const isSelected = activeAction?.id === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => selectOption(opt)}
                    className={`w-full p-2.5 rounded-xl border text-left transition-all flex items-center justify-between text-xs cursor-pointer ${
                      isSelected
                        ? "bg-[#0071e3]/10 border-[#0071e3]/30 text-[#0071e3] font-semibold"
                        : "bg-[#fafafa] border-black/[0.05] text-[#1d1d1f] hover:bg-white hover:border-[#0071e3]/20"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="p-1 rounded-lg bg-white border border-black/[0.04] shadow-2xs">
                        {opt.icon}
                      </span>
                      <span>{opt.label}</span>
                    </div>
                    {opt.badge && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-white border border-black/[0.05] text-[#86868b]">
                        {opt.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Card Footer: Metadata and Status */}
        <div className="mt-4 pt-3.5 border-t border-black/[0.05] flex items-center justify-between text-xs text-[#86868b]">
          <div className="flex items-center gap-1.5 text-[#1d1d1f] font-medium text-[11px]">
            <MapPin className="w-3.5 h-3.5 text-[#0071e3]" />
            <span>Medellín, Colombia</span>
          </div>

          <div className="flex items-center gap-1 text-[11px] text-[#34c759] font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>En Etapa Práctica</span>
          </div>
        </div>

        {/* Specular Glare Effect on Hover */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-[36px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 280px at ${glareX.get()} ${glareY.get()}, rgba(0, 113, 227, 0.05), transparent 70%)`,
          }}
        />
      </motion.div>
    </div>
  );
};
