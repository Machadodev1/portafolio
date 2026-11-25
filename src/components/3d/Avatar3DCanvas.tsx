"use client";

import React, { useSyncExternalStore, Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin } from "lucide-react";
import { Avatar3DScene } from "./Avatar3DScene";

const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export const Avatar3DCanvas: React.FC = () => {
  const isClient = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [greeted, setGreeted] = useState(false);

  if (!isClient) {
    return (
      <div className="relative w-full h-[400px] sm:h-[460px] flex items-center justify-center">
        <div className="w-44 h-44 rounded-full bg-[#f5f5f7] animate-pulse border border-black/[0.04]" />
      </div>
    );
  }

  return (
    <div
      className="relative w-full h-[400px] sm:h-[480px] select-none flex flex-col items-center justify-center"
      onMouseEnter={() => setGreeted(true)}
      onClick={() => setGreeted((prev) => !prev)}
    >
      {/* Apple Subtle Diffused Ambient Glow */}
      <div className="absolute inset-0 m-auto w-64 h-64 rounded-full bg-gradient-to-tr from-[#28C76F]/10 via-[#0071E3]/8 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* Interactive Speech Bubble */}
      <AnimatePresence>
        {greeted && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-2 sm:top-4 z-20 px-4 py-2 rounded-2xl bg-white border border-black/[0.08] shadow-[0_8px_30px_rgba(0,0,0,0.06)] text-xs text-[#1d1d1f] flex items-center gap-2 pointer-events-none"
          >
            <span className="text-sm">👋</span>
            <span className="font-medium">
              ¡Hola! Soy <strong className="font-semibold text-[#0071e3]">Andrés</strong>. Desarrollador Junior en prácticas.
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3D WebGL Canvas */}
      <div className="w-full h-full cursor-grab active:cursor-grabbing">
        <Canvas
          camera={{ position: [0, 0, 3.8], fov: 42 }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          dpr={[1, 2]}
          className="w-full h-full"
        >
          <Suspense fallback={null}>
            <Avatar3DScene />
          </Suspense>
        </Canvas>
      </div>

      {/* Bottom Minimal Status Indicator Pill */}
      <div className="absolute bottom-2 sm:bottom-4 flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-white/90 border border-black/[0.06] shadow-sm text-[11px] text-[#86868b] backdrop-blur-md">
        <span className="flex items-center gap-1.5 font-medium text-[#1d1d1f]">
          <span className="w-2 h-2 rounded-full bg-[#34c759] animate-pulse" />
          En etapa práctica
        </span>
        <span className="w-px h-3 bg-black/[0.1]" />
        <span className="flex items-center gap-1 text-[#86868b]">
          <MapPin className="w-3 h-3 text-[#0071e3]" />
          Medellín, Colombia
        </span>
      </div>
    </div>
  );
};
