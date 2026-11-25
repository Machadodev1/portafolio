"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Terminal,
  Receipt,
  ShieldCheck,
  Clock,
  Boxes,
  Percent,
  CheckCircle2,
  FileCheck,
  HardDriveDownload,
  Sparkles,
  Play,
  RotateCw,
} from "lucide-react";
import { useSettings } from "@/context/SettingsContext";

const CODE_LINES = [
  {
    line: 1,
    tokens: [{ text: "# SIGIF · login_view — Protección multicapa", color: "#6a9955" }],
  },
  {
    line: 2,
    tokens: [
      { text: "@ratelimit", color: "#dcdcaa" },
      { text: "(key=", color: "#d4d4d4" },
      { text: "'ip'", color: "#ce9178" },
      { text: ", rate=", color: "#d4d4d4" },
      { text: "'5/5m'", color: "#ce9178" },
      { text: ", block=", color: "#d4d4d4" },
      { text: "True", color: "#569cd6" },
      { text: ")", color: "#d4d4d4" },
    ],
    badge: "Rate limit: 5 intentos / 5 min",
  },
  {
    line: 3,
    tokens: [
      { text: "def", color: "#569cd6" },
      { text: " login_view", color: "#dcdcaa" },
      { text: "(request):", color: "#d4d4d4" },
    ],
  },
  {
    line: 4,
    tokens: [
      { text: "    user ", color: "#d4d4d4" },
      { text: "=", color: "#569cd6" },
      { text: " authenticate", color: "#dcdcaa" },
      { text: "(email, password)", color: "#d4d4d4" },
    ],
  },
  {
    line: 5,
    tokens: [
      { text: "    if", color: "#569cd6" },
      { text: " user ", color: "#d4d4d4" },
      { text: "and", color: "#569cd6" },
      { text: " user.is_active:", color: "#d4d4d4" },
    ],
    badge: "RBAC: 3 niveles de rol",
  },
  {
    line: 6,
    tokens: [
      { text: "        return", color: "#569cd6" },
      { text: " redirect_by_role", color: "#dcdcaa" },
      { text: "(user)", color: "#d4d4d4" },
    ],
  },
  {
    line: 7,
    tokens: [
      { text: "    raise", color: "#569cd6" },
      { text: " PermissionDenied", color: "#4ec9b0" },
      { text: "(", color: "#d4d4d4" },
      { text: "'Acceso bloqueado'", color: "#ce9178" },
      { text: ")", color: "#d4d4d4" },
    ],
    badge: "Acceso bloqueado si inactivo",
  },
];

const AUDIT_EVENTS = [
  {
    time: "14:32:08",
    module: "Seguridad / Login",
    user: "190.24.120.5",
    action: "Bloqueo por fuerza bruta (5 intentos fallidos)",
    status: "Bloqueado 5m",
    color: "#ff3b30",
  },
  {
    time: "14:35:12",
    module: "Inventario / Entrada",
    user: "daniel.moya@empresa",
    action: "Generación consecutivo ENT-00042 (+85 ítems)",
    status: "Confirmado",
    color: "#34c759",
  },
  {
    time: "14:41:50",
    module: "Facturación / Venta",
    user: "felipe.uribe@empresa",
    action: "Factura FAC-00892 emitida con IVA 19% ($1.011.500)",
    status: "Asentado",
    color: "#0071e3",
  },
  {
    time: "15:00:00",
    module: "Configuración / Backups",
    user: "Cron Daemon (Andrés Machado)",
    action: "Dump PostgreSQL cifrado + envío a almacenamiento seguro",
    status: "Completado",
    color: "#5856d6",
  },
];

const appleEase = [0.16, 1, 0.3, 1] as const;

export const SigifInteractiveDeck: React.FC = () => {
  const { t } = useSettings();
  const [activeLens, setActiveLens] = useState<"security" | "billing" | "audit">("security");
  const [replayKey, setReplayKey] = useState(0);
  const [activeCodeLine, setActiveCodeLine] = useState(0);
  const [billingStage, setBillingStage] = useState(1);

  // Auto-advance code highlight bar like an Apple Keynote live debugger
  useEffect(() => {
    if (activeLens !== "security") return;
    const interval = setInterval(() => {
      setActiveCodeLine((prev) => (prev < CODE_LINES.length - 1 ? prev + 1 : prev));
    }, 550);
    return () => clearInterval(interval);
  }, [activeLens, replayKey]);

  // Auto-advance billing pipeline stages (1 -> 2 -> 3)
  useEffect(() => {
    if (activeLens !== "billing") return;
    const t1 = setTimeout(() => setBillingStage(2), 950);
    const t2 = setTimeout(() => setBillingStage(3), 1900);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [activeLens, replayKey]);

  const selectLens = (lens: "security" | "billing" | "audit") => {
    setActiveLens(lens);
    setActiveCodeLine(0);
    setBillingStage(1);
  };

  const handleReplay = () => {
    setActiveCodeLine(0);
    setBillingStage(1);
    setReplayKey((k) => k + 1);
  };

  return (
    <div className="py-14 border-t border-black/[0.06] bg-white">
      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        {/* Top Interactive Lens Switcher */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-[#0071e3] mb-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>
                {t(
                  "Laboratorio Interactivo · Animación en Vivo",
                  "Interactive Lab · Live Animation"
                )}
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1d1d1f]">
              {t(
                "Explora cómo funciona SIGIF por dentro",
                "Explore how SIGIF works under the hood"
              )}
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Apple Segmented Control with Spring Pill */}
            <div className="inline-flex p-1.5 rounded-2xl bg-[#f5f5f7] border border-black/[0.06]">
              {(
                [
                  {
                    id: "security",
                    label: t("1. Código & Seguridad", "1. Code & Security"),
                    icon: <Terminal className="w-3.5 h-3.5 text-[#0071e3]" />,
                  },
                  {
                    id: "billing",
                    label: t("2. Motor de Facturación", "2. Billing Engine"),
                    icon: <Receipt className="w-3.5 h-3.5 text-[#ff9500]" />,
                  },
                  {
                    id: "audit",
                    label: t("3. Auditoría Forense", "3. Forensic Audit"),
                    icon: <ShieldCheck className="w-3.5 h-3.5 text-[#34c759]" />,
                  },
                ] as const
              ).map((tab) => {
                const isActive = activeLens === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => selectLens(tab.id)}
                    className={`relative px-4 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center gap-2 cursor-pointer z-10 ${
                      isActive ? "text-[#1d1d1f]" : "text-[#86868b] hover:text-[#1d1d1f]"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="sigif-lens-pill"
                        className="absolute inset-0 bg-white rounded-xl shadow-sm border border-black/[0.05] -z-10"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    {tab.icon}
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Replay Animation Trigger */}
            <button
              type="button"
              onClick={handleReplay}
              title={t("Repetir animación", "Replay animation")}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#fafafa] hover:bg-[#f0f0f5] border border-black/[0.06] text-xs font-semibold text-[#1d1d1f] transition-colors cursor-pointer"
            >
              <RotateCw className="w-3.5 h-3.5 text-[#0071e3]" />
              <span className="hidden sm:inline">{t("Repetir efecto", "Replay effect")}</span>
            </button>
          </div>
        </div>

        {/* Dynamic Lens Stage with Apple Keynote Animations */}
        <AnimatePresence mode="wait">
          {activeLens === "security" && (
            <motion.div
              key={`lens-security-${replayKey}`}
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.5, ease: appleEase }}
              className="rounded-3xl bg-[#fafafa] border border-black/[0.08] p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.04)] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              <div className="lg:col-span-5">
                <motion.span
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#0071e3] bg-[#0071e3]/10 px-3 py-1 rounded-full"
                >
                  <Play className="w-3 h-3 fill-current" /> Ejecución en Tiempo Real
                </motion.span>
                <motion.h4
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.18, duration: 0.5 }}
                  className="text-xl sm:text-2xl font-bold text-[#1d1d1f] mt-4 mb-3"
                >
                  Backend seguro desde el primer commit.
                </motion.h4>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.26, duration: 0.5 }}
                  className="text-sm text-[#86868b] leading-relaxed mb-5"
                >
                  Observa cómo cada petición pasa por las capas de defensa: bloqueo de fuerza bruta por IP, hash PBKDF2 y verificación de rol activo.
                </motion.p>
                <div className="space-y-2.5 text-xs font-medium text-[#1d1d1f]">
                  {[
                    { text: "Bloqueo automático de IP tras 5 intentos fallidos", step: 1 },
                    { text: "Jerarquía estricta: SuperAdmin, Admin y Empleado", step: 4 },
                    { text: "Denegación inmediata a cuentas desactivadas", step: 6 },
                  ].map((item, idx) => {
                    const active = activeCodeLine >= item.step;
                    return (
                      <motion.div
                        key={idx}
                        animate={{
                          opacity: active ? 1 : 0.4,
                          x: active ? 4 : 0,
                        }}
                        className="flex items-center gap-2 transition-all"
                      >
                        <CheckCircle2
                          className={`w-4 h-4 transition-colors ${
                            active ? "text-[#34c759]" : "text-[#c0c0c5]"
                          }`}
                        />
                        <span>{item.text}</span>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Animated macOS Window with Progressive Line Reveal */}
              <motion.div
                initial={{ opacity: 0, scale: 1.07, y: 24 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.7, ease: appleEase }}
                className="lg:col-span-7 relative"
              >
                <div className="rounded-2xl overflow-hidden border border-black/[0.12] shadow-[0_30px_70px_rgba(0,0,0,0.18)] bg-[#1e1e1e]">
                  <div className="flex items-center justify-between px-4 py-3 bg-[#252526] border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                      <span className="ml-2 text-[11px] font-mono text-white/60">
                        sigif / views.py
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-[#34c759] flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#34c759] animate-ping" />
                      Línea {activeCodeLine + 1} / {CODE_LINES.length}
                    </span>
                  </div>

                  <div className="p-5 font-mono text-xs leading-[1.95] space-y-1 overflow-x-auto">
                    {CODE_LINES.map((row, idx) => {
                      const isRevealed = idx <= activeCodeLine;
                      const isCurrent = idx === activeCodeLine;
                      return (
                        <motion.div
                          key={row.line}
                          initial={{ opacity: 0, x: -14 }}
                          animate={{
                            opacity: isRevealed ? 1 : 0.18,
                            x: isRevealed ? 0 : -6,
                            backgroundColor: isCurrent
                              ? "rgba(0, 113, 227, 0.16)"
                              : "rgba(0, 0, 0, 0)",
                          }}
                          transition={{ duration: 0.35, ease: appleEase }}
                          className="flex items-center gap-4 px-2.5 py-0.5 rounded-lg"
                        >
                          <span className="text-white/30 w-4 text-right select-none">
                            {row.line}
                          </span>
                          <span className="whitespace-pre">
                            {row.tokens.map((t, j) => (
                              <span key={j} style={{ color: t.color }}>
                                {t.text}
                              </span>
                            ))}
                          </span>
                          {row.badge && (
                            <motion.span
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{
                                opacity: isRevealed ? 1 : 0,
                                scale: isRevealed ? 1 : 0.85,
                              }}
                              transition={{ type: "spring", stiffness: 320, damping: 22 }}
                              className="ml-auto text-[10px] font-sans font-semibold text-[#47a3ff] bg-[#0071e3]/25 border border-[#0071e3]/40 px-2.5 py-0.5 rounded-full whitespace-nowrap"
                            >
                              ✦ {row.badge}
                            </motion.span>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {activeLens === "billing" && (
            <motion.div
              key={`lens-billing-${replayKey}`}
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.5, ease: appleEase }}
              className="rounded-3xl bg-[#fafafa] border border-black/[0.08] p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.04)]"
            >
              {/* Animated Pipeline Progress Bar */}
              <div className="mb-6">
                <div className="flex items-center justify-between text-xs font-semibold text-[#86868b] mb-2">
                  <span>Flujo Transaccional en Tiempo Real</span>
                  <span className="text-[#0071e3] font-mono">
                    Etapa {billingStage} de 3 completada
                  </span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-black/[0.06] overflow-hidden">
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: `${(billingStage / 3) * 100}%` }}
                    transition={{ duration: 0.6, ease: appleEase }}
                    className="h-full rounded-full bg-gradient-to-r from-[#0071e3] via-[#ff9500] to-[#34c759]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Step 1 */}
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{
                    opacity: billingStage >= 1 ? 1 : 0.35,
                    y: 0,
                    scale: billingStage === 1 ? 1.02 : 1,
                  }}
                  transition={{ duration: 0.45, ease: appleEase }}
                  className={`p-5 rounded-2xl bg-white border transition-colors flex flex-col justify-between ${
                    billingStage >= 1
                      ? "border-[#0071e3]/40 shadow-[0_12px_30px_rgba(0,113,227,0.08)]"
                      : "border-black/[0.06]"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between text-xs font-semibold text-[#86868b] uppercase mb-3">
                      <span>Paso 01 · Inventario</span>
                      <Boxes className="w-4 h-4 text-[#0071e3]" />
                    </div>
                    <h4 className="text-base font-bold text-[#1d1d1f] mb-1">
                      Descuento de Stock en Vivo
                    </h4>
                    <p className="text-xs text-[#86868b] mb-4">
                      Validación atómica contra bodega impidiendo ventas con stock negativo.
                    </p>
                    <div className="p-3 rounded-xl bg-[#fafafa] border border-black/[0.05] space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="font-semibold text-[#1d1d1f]">Kit Embrague Ref. 402</span>
                        <span className="font-mono font-bold text-[#0071e3]">-2 un</span>
                      </div>
                      {/* Animated Stock Bar */}
                      <div className="h-1.5 w-full rounded-full bg-black/[0.06] overflow-hidden">
                        <motion.div
                          initial={{ width: "100%" }}
                          animate={{ width: "78%" }}
                          transition={{ duration: 0.9, delay: 0.2 }}
                          className="h-full bg-[#34c759] rounded-full"
                        />
                      </div>
                      <div className="flex justify-between text-[11px] text-[#248a3d] font-semibold pt-1">
                        <span>Stock Restante:</span>
                        <span>18 un (Óptimo)</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Step 2 */}
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{
                    opacity: billingStage >= 2 ? 1 : 0.35,
                    y: 0,
                    scale: billingStage === 2 ? 1.02 : 1,
                  }}
                  transition={{ duration: 0.45, ease: appleEase }}
                  className={`p-5 rounded-2xl bg-white border transition-colors flex flex-col justify-between ${
                    billingStage >= 2
                      ? "border-[#ff9500]/45 shadow-[0_12px_30px_rgba(255,149,0,0.08)]"
                      : "border-black/[0.06]"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between text-xs font-semibold text-[#86868b] uppercase mb-3">
                      <span>Paso 02 · Impuestos</span>
                      <Percent className="w-4 h-4 text-[#ff9500]" />
                    </div>
                    <h4 className="text-base font-bold text-[#1d1d1f] mb-1">
                      Cálculo Tributario e IVA 19%
                    </h4>
                    <p className="text-xs text-[#86868b] mb-4">
                      Desglose automático de base gravable, descuentos y múltiples medios de pago.
                    </p>
                    <div className="p-3 rounded-xl bg-[#fafafa] border border-black/[0.05] space-y-1.5 font-mono text-xs">
                      <div className="flex justify-between text-[#86868b]">
                        <span>Subtotal:</span>
                        <span>$ 850.000</span>
                      </div>
                      <div className="flex justify-between text-[#86868b]">
                        <span>IVA (19%):</span>
                        <span>$ 161.500</span>
                      </div>
                      <motion.div
                        animate={{ scale: billingStage === 2 ? [1, 1.04, 1] : 1 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="flex justify-between text-[#1d1d1f] font-bold pt-1 border-t border-black/[0.05]"
                      >
                        <span>Total Factura:</span>
                        <span className="text-[#0071e3]">$ 1.011.500</span>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>

                {/* Step 3 */}
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{
                    opacity: billingStage >= 3 ? 1 : 0.35,
                    y: 0,
                    scale: billingStage === 3 ? 1.02 : 1,
                  }}
                  transition={{ duration: 0.45, ease: appleEase }}
                  className={`p-5 rounded-2xl bg-white border transition-colors flex flex-col justify-between ${
                    billingStage >= 3
                      ? "border-[#34c759]/50 shadow-[0_12px_30px_rgba(52,199,89,0.1)]"
                      : "border-black/[0.06]"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between text-xs font-semibold text-[#86868b] uppercase mb-3">
                      <span>Paso 03 · Contabilidad</span>
                      <Receipt className="w-4 h-4 text-[#34c759]" />
                    </div>
                    <h4 className="text-base font-bold text-[#1d1d1f] mb-1">
                      Conciliación y Sello Forense
                    </h4>
                    <p className="text-xs text-[#86868b] mb-4">
                      Impacto directo en flujo de caja, rentabilidad y registro en auditoría.
                    </p>
                    <motion.div
                      animate={{
                        scale: billingStage >= 3 ? 1 : 0.9,
                        opacity: billingStage >= 3 ? 1 : 0.5,
                      }}
                      transition={{ type: "spring", stiffness: 360, damping: 15 }}
                      className="p-3.5 rounded-xl bg-[#34c759]/12 border border-[#34c759]/30 flex items-center justify-center gap-2 text-xs font-bold text-[#248a3d]"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>FAC-00892 Certificada</span>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {activeLens === "audit" && (
            <motion.div
              key={`lens-audit-${replayKey}`}
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.5, ease: appleEase }}
              className="rounded-3xl bg-[#fafafa] border border-black/[0.08] p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.04)]"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-5">
                {AUDIT_EVENTS.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -18, scale: 0.96 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{
                      delay: idx * 0.14,
                      duration: 0.5,
                      ease: appleEase,
                    }}
                    whileHover={{ y: -2, scale: 1.01 }}
                    className="p-4 rounded-2xl bg-white border border-black/[0.06] shadow-2xs hover:shadow-md transition-shadow flex items-start justify-between gap-3"
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className="w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 animate-pulse"
                        style={{ backgroundColor: item.color }}
                      />
                      <div>
                        <div className="text-xs font-mono font-bold text-[#1d1d1f]">
                          {item.module}
                        </div>
                        <div className="text-[11px] text-[#86868b] font-mono">
                          {item.user}
                        </div>
                        <div className="text-xs text-[#1d1d1f] mt-1">{item.action}</div>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span
                        className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full block mb-1"
                        style={{
                          color: item.color,
                          backgroundColor: `${item.color}15`,
                        }}
                      >
                        {item.status}
                      </span>
                      <span className="text-[10px] font-mono text-[#86868b] inline-flex items-center gap-1">
                        <Clock className="w-2.5 h-2.5" /> {item.time}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-black/[0.06] text-xs text-[#86868b]"
              >
                <span className="flex items-center gap-1.5 font-medium text-[#1d1d1f]">
                  <FileCheck className="w-4 h-4 text-[#34c759]" />
                  Suite de pruebas automatizadas con pytest (Seguridad, Roles y Flujos)
                </span>
                <span className="flex items-center gap-1.5 font-medium text-[#1d1d1f]">
                  <HardDriveDownload className="w-4 h-4 text-[#0071e3]" />
                  Copias de seguridad automáticas programadas + envío por correo
                </span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
