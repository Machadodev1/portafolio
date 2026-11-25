"use client";

import React, { useSyncExternalStore, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Scene3D } from "./Scene3D";

const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export const Hero3DCanvas: React.FC = () => {
  const isClient = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (!isClient) {
    return (
      <div className="relative w-full h-[360px] sm:h-[420px] md:h-[520px] flex items-center justify-center">
        <div className="w-48 h-48 rounded-full bg-gradient-to-tr from-[#0071E3]/15 via-[#86868B]/10 to-transparent blur-3xl animate-pulse" />
      </div>
    );
  }

  return (
    <div className="relative w-full h-[360px] sm:h-[420px] md:h-[520px] select-none">
      {/* Apple Ambient Spotlight & Soft Glare */}
      <div className="absolute inset-0 m-auto w-56 h-56 sm:w-72 sm:h-72 rounded-full bg-gradient-to-tr from-[#0071E3]/20 via-[#47A3FF]/10 to-transparent blur-3xl pointer-events-none" />

      <Canvas
        camera={{ position: [0, 0, 6.2], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 2]}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        <Suspense fallback={null}>
          <Scene3D />
        </Suspense>
      </Canvas>
    </div>
  );
};
