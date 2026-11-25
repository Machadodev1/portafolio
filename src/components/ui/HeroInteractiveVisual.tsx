"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Zap,
  Lock,
  Database,
  Activity,
} from "lucide-react";

export const HeroInteractiveVisual: React.FC = () => {

  return (
    <div className="relative w-full max-w-[500px] mx-auto select-none">
      {/* Apple Subtle Glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#0071E3]/10 via-[#F5F5F7]/40 to-transparent blur-3xl rounded-full pointer-events-none -z-10" />

      {/* Main Glass/Titanium Architectural HUD */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-[28px] border border-black/[0.08] bg-white/90 backdrop-blur-2xl shadow-[0_30px_70px_rgba(0,0,0,0.06)] overflow-hidden p-6"
      >
        {/* Top Minimal Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-black/[0.05] mb-5">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
            <span className="ml-2 text-[11px] font-mono text-[#86868b] tracking-wider uppercase">
              SIGIF · Kernel Runtime
            </span>
          </div>
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#0071e3] bg-[#0071e3]/10 px-2.5 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0071e3] animate-ping" />
            99.9% Uptime
          </span>
        </div>

        {/* Live Architectural Nodes Grid */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          {/* Node 1: Auth & Security */}
          <div className="p-3.5 rounded-2xl bg-[#fafafa] border border-black/[0.04] transition-all hover:bg-white hover:border-[#0071e3]/30 hover:shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono uppercase text-[#86868b]">Capa 01</span>
              <Lock className="w-3.5 h-3.5 text-[#0071e3]" />
            </div>
            <div className="text-sm font-semibold text-[#1d1d1f]">PBKDF2 Hash</div>
            <div className="text-[11px] text-[#86868b] mt-0.5">SHA-256 + 600k rounds</div>
          </div>

          {/* Node 2: Database Layer */}
          <div className="p-3.5 rounded-2xl bg-[#fafafa] border border-black/[0.04] transition-all hover:bg-white hover:border-[#0071e3]/30 hover:shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono uppercase text-[#86868b]">Capa 02</span>
              <Database className="w-3.5 h-3.5 text-[#34c759]" />
            </div>
            <div className="text-sm font-semibold text-[#1d1d1f]">PostgreSQL ACID</div>
            <div className="text-[11px] text-[#86868b] mt-0.5">Índices B-Tree &lt;42ms</div>
          </div>

          {/* Node 3: Rate Limiting & Firewall */}
          <div className="p-3.5 rounded-2xl bg-[#fafafa] border border-black/[0.04] transition-all hover:bg-white hover:border-[#0071e3]/30 hover:shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono uppercase text-[#86868b]">Capa 03</span>
              <ShieldCheck className="w-3.5 h-3.5 text-[#0071e3]" />
            </div>
            <div className="text-sm font-semibold text-[#1d1d1f]">Brute-Force Guard</div>
            <div className="text-[11px] text-[#86868b] mt-0.5">5 intentos / IP ban 5m</div>
          </div>

          {/* Node 4: API REST */}
          <div className="p-3.5 rounded-2xl bg-[#fafafa] border border-black/[0.04] transition-all hover:bg-white hover:border-[#0071e3]/30 hover:shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono uppercase text-[#86868b]">Capa 04</span>
              <Zap className="w-3.5 h-3.5 text-[#ff9500]" />
            </div>
            <div className="text-sm font-semibold text-[#1d1d1f]">DRF + OpenAPI</div>
            <div className="text-[11px] text-[#86868b] mt-0.5">Expiring Token Auth</div>
          </div>
        </div>

        {/* Live Stream Terminal Output (Micro-Interactions) */}
        <div className="rounded-xl bg-[#1d1d1f] p-4 text-white font-mono text-[11px] space-y-1.5 shadow-inner">
          <div className="flex items-center justify-between text-white/40 pb-1.5 border-b border-white/10 text-[10px]">
            <span>ACTIVIDAD TRANSACCIONAL</span>
            <span className="flex items-center gap-1 text-[#34c759]">
              <Activity className="w-3 h-3 animate-pulse" /> STREAMING
            </span>
          </div>

          <div className="flex items-center justify-between text-white/80 pt-1">
            <span className="text-[#34c759]">$ sigif.audit.log()</span>
            <span className="text-white/40 text-[10px]">ENT-00042</span>
          </div>

          <p className="text-white/60 text-[10px] leading-relaxed">
            [+] Ingreso Stock: +120 Pastillas Freno Cerámicas &rarr; Stock Óptimo
          </p>

          <div className="flex items-center justify-between pt-1 border-t border-white/5 text-[10px] text-white/40">
            <span>Operador: Admin #04</span>
            <span className="text-[#0071e3] font-semibold">Trazabilidad 100%</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
