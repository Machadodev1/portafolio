"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  MapPin,
  CheckCircle2,
  Code2,
  Sparkles,
  Coffee,
  Rocket,
  MessageSquare,
  X,
} from "lucide-react";

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
      href: string;
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
        href: "#habilidades",
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
        href: "#proyecto",
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
        label: "Escribirme al WhatsApp",
        href: "https://wa.me/573126691941",
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
      quickAction: {
        label: "Conocer mi perfil",
        href: "#sobre-mi",
      },
    },
  },
];

export const AppleVectorAvatar: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeAction, setActiveAction] = useState<ActionOption | null>(null);
  const [mood, setMood] = useState<AvatarMood>("idle");
  const [blinking, setBlinking] = useState(false);
  const [waveArm, setWaveArm] = useState(false);

  // Mouse tilt motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring physics for smooth movement
  const springConfig = { damping: 25, stiffness: 180, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // 3D Tilt transforms
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-12, 12]);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [10, -10]);

  // Head and Eye Parallax offsets
  const headX = useTransform(smoothX, [-0.5, 0.5], [-10, 10]);
  const headY = useTransform(smoothY, [-0.5, 0.5], [-8, 8]);
  const pupilX = useTransform(smoothX, [-0.5, 0.5], [-6, 6]);
  const pupilY = useTransform(smoothY, [-0.5, 0.5], [-5, 5]);

  // Specular Glare position
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

  // Periodic Blink Animation
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlinking(true);
      setTimeout(() => setBlinking(false), 160);
    }, 3800);
    return () => clearInterval(blinkInterval);
  }, []);

  const handleAvatarClick = () => {
    setWaveArm(true);
    setTimeout(() => setWaveArm(false), 800);
    setMenuOpen((prev) => !prev);
    if (!menuOpen && !activeAction) {
      setMood("speaking");
    }
  };

  const selectOption = (opt: ActionOption) => {
    setActiveAction(opt);
    setMood(opt.mood);
    setWaveArm(true);
    setTimeout(() => setWaveArm(false), 600);
  };

  const closeDialog = () => {
    setActiveAction(null);
    setMood("idle");
  };

  return (
    <div
      style={{ perspective: 1000 }}
      className="relative w-full max-w-[390px] sm:max-w-[430px] mx-auto select-none"
    >
      {/* Apple Ambient Aura */}
      <div className="absolute inset-0 m-auto w-64 h-64 rounded-full bg-gradient-to-tr from-[#28C76F]/14 via-[#0071E3]/10 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* Main Interactive Card */}
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
        {/* Top Header with Quest Pill / Status */}
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

        {/* Central Character Stage */}
        <div
          onClick={handleAvatarClick}
          className="relative w-full h-[270px] sm:h-[280px] flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-b from-[#fbfbfd] to-[#f5f5f7] border border-black/[0.04] cursor-pointer"
        >
          {/* Subtle Stage Lighting Ring */}
          <div className="absolute w-44 h-44 rounded-full bg-white shadow-inner border border-black/[0.03]" />

          {/* Prompt banner when menu is closed */}
          {!menuOpen && !activeAction && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="absolute top-3 px-3 py-1 rounded-full bg-white/90 border border-black/[0.06] shadow-sm text-[11px] text-[#86868b] flex items-center gap-1.5 z-20 pointer-events-none"
            >
              <MessageSquare className="w-3 h-3 text-[#0071e3]" />
              <span>Haz clic en mí para interactuar</span>
            </motion.div>
          )}

          {/* SVG Character with dynamic facial expressions and arm gestures */}
          <motion.svg
            viewBox="0 0 240 260"
            className="w-56 h-56 relative z-10 drop-shadow-md"
            style={{ x: headX, y: headY }}
          >
            <defs>
              <linearGradient id="skinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#8D5524" />
                <stop offset="100%" stopColor="#703D14" />
              </linearGradient>
              <linearGradient id="skinShadow" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#703D14" />
                <stop offset="100%" stopColor="#5A2E0C" />
              </linearGradient>
              <linearGradient id="hoodieGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#28C76F" />
                <stop offset="100%" stopColor="#1EA75B" />
              </linearGradient>
              <linearGradient id="collarGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#E9D5FF" />
                <stop offset="100%" stopColor="#D8B4FE" />
              </linearGradient>
              <linearGradient id="hairGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#221815" />
                <stop offset="100%" stopColor="#150E0C" />
              </linearGradient>
            </defs>

            {/* Body */}
            <g id="body">
              <path
                d="M40 260 C40 205, 75 190, 120 190 C165 190, 200 205, 200 260 Z"
                fill="url(#hoodieGrad)"
              />
              <path
                d="M55 210 C70 195, 95 192, 120 192 C145 192, 170 195, 185 210"
                fill="none"
                stroke="#1B8E4E"
                strokeWidth="2.5"
                opacity="0.4"
              />
              <ellipse cx="120" cy="192" rx="36" ry="14" fill="url(#collarGrad)" />
              <path d="M108 196 L106 226" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
              <circle cx="106" cy="227" r="2.5" fill="#E5E7EB" />
              <path d="M132 196 L134 226" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
              <circle cx="134" cy="227" r="2.5" fill="#E5E7EB" />
            </g>

            {/* Waving / Interactive Hand */}
            {waveArm && (
              <motion.g
                initial={{ rotate: -20, originX: "180px", originY: "210px" }}
                animate={{ rotate: [0, 25, -10, 20, 0] }}
                transition={{ duration: 0.6 }}
              >
                <path d="M175 210 C190 190, 200 170, 205 155" stroke="url(#hoodieGrad)" strokeWidth="16" strokeLinecap="round" fill="none" />
                <circle cx="206" cy="150" r="11" fill="url(#skinGrad)" />
                <circle cx="212" cy="144" r="3.5" fill="url(#skinGrad)" />
              </motion.g>
            )}

            {/* Neck */}
            <g id="neck">
              <path d="M104 158 L104 192 L136 192 L136 158 Z" fill="url(#skinShadow)" />
            </g>

            {/* Head */}
            <g id="head">
              <circle cx="68" cy="125" r="14" fill="url(#skinShadow)" />
              <circle cx="69" cy="125" r="8" fill="#5A2E0C" opacity="0.4" />
              <circle cx="172" cy="125" r="14" fill="url(#skinShadow)" />
              <circle cx="171" cy="125" r="8" fill="#5A2E0C" opacity="0.4" />

              <path
                d="M74 110 C74 65, 166 65, 166 110 C166 160, 148 175, 120 175 C92 175, 74 160, 74 110 Z"
                fill="url(#skinGrad)"
              />

              <ellipse cx="88" cy="135" rx="9" ry="5" fill="#A84D1E" opacity="0.4" />
              <ellipse cx="152" cy="135" rx="9" ry="5" fill="#A84D1E" opacity="0.4" />

              <path
                d="M117 122 Q120 128 123 122"
                fill="none"
                stroke="#5A2E0C"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              {/* Dynamic Mouth / Smile based on mood */}
              {mood === "celebrating" ? (
                <path d="M104 139 Q120 162 136 139 Z" fill="#FFFFFF" stroke="#422006" strokeWidth="2.5" />
              ) : mood === "coding" ? (
                <path d="M108 143 Q120 148 132 143" fill="none" stroke="#422006" strokeWidth="3" strokeLinecap="round" />
              ) : mood === "thinking" ? (
                <ellipse cx="120" cy="144" rx="5" ry="6" fill="#422006" />
              ) : (
                <path d="M106 142 Q120 156 134 142" fill="none" stroke="#422006" strokeWidth="3" strokeLinecap="round" />
              )}

              {/* Eyes & Eyebrows */}
              <g id="eyes">
                {/* Eyebrows change with mood */}
                {mood === "thinking" ? (
                  <>
                    <path d="M90 94 Q100 89 108 97" fill="none" stroke="#150E0C" strokeWidth="3.5" strokeLinecap="round" />
                    <path d="M132 99 Q140 96 150 95" fill="none" stroke="#150E0C" strokeWidth="3.5" strokeLinecap="round" />
                  </>
                ) : (
                  <>
                    <path d="M90 98 Q100 93 108 97" fill="none" stroke="#150E0C" strokeWidth="3.5" strokeLinecap="round" />
                    <path d="M132 97 Q140 93 150 98" fill="none" stroke="#150E0C" strokeWidth="3.5" strokeLinecap="round" />
                  </>
                )}

                {/* Left Eye */}
                {blinking ? (
                  <path d="M92 114 Q101 117 110 114" stroke="#150E0C" strokeWidth="3" fill="none" strokeLinecap="round" />
                ) : (
                  <g>
                    <ellipse cx="101" cy="114" rx="9" ry="8" fill="#FFFFFF" />
                    <motion.circle cx="101" cy="114" r="5.5" fill="#1D1D1F" style={{ x: pupilX, y: pupilY }} />
                    <motion.circle cx="103" cy="112" r="2" fill="#FFFFFF" style={{ x: pupilX, y: pupilY }} />
                  </g>
                )}

                {/* Right Eye */}
                {blinking ? (
                  <path d="M130 114 Q139 117 148 114" stroke="#150E0C" strokeWidth="3" fill="none" strokeLinecap="round" />
                ) : (
                  <g>
                    <ellipse cx="139" cy="114" rx="9" ry="8" fill="#FFFFFF" />
                    <motion.circle cx="139" cy="114" r="5.5" fill="#1D1D1F" style={{ x: pupilX, y: pupilY }} />
                    <motion.circle cx="141" cy="112" r="2" fill="#FFFFFF" style={{ x: pupilX, y: pupilY }} />
                  </g>
                )}
              </g>

              {/* Hair */}
              <g id="hair">
                <path
                  d="M68 112 C64 68, 88 42, 120 42 C152 42, 176 68, 172 112 C172 112, 166 94, 154 90 C140 85, 134 76, 120 76 C106 76, 100 85, 86 90 C74 94, 68 112, 68 112 Z"
                  fill="url(#hairGrad)"
                />
                <path
                  d="M92 68 C96 46, 124 38, 138 48 C148 56, 142 70, 132 74 C116 78, 102 78, 92 68 Z"
                  fill="#2C1F1B"
                />
                <path d="M102 56 C110 44, 130 44, 136 54" fill="none" stroke="#3D2B26" strokeWidth="2.5" strokeLinecap="round" />
              </g>
            </g>
          </motion.svg>
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
                <a
                  href={activeAction.response.quickAction.href}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#0071e3] hover:underline"
                >
                  <span>{activeAction.response.quickAction.label}</span>
                  <span>&rarr;</span>
                </a>
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
