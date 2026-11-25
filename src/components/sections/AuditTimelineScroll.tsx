"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { FileCheck, HardDriveDownload, Clock } from "lucide-react";

interface AuditEvent {
  time: string;
  module: string;
  user: string;
  action: string;
  status: string;
  color: string;
}

const AUDIT_EVENTS: AuditEvent[] = [
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

const AuditTimelineItem: React.FC<{
  item: AuditEvent;
  index: number;
  scrollYProgress: MotionValue<number>;
}> = ({ item, index, scrollYProgress }) => {
  const startRange = 0.15 + index * 0.18;
  const endRange = startRange + 0.16;

  const opacity = useTransform(scrollYProgress, [startRange, endRange], [0.15, 1]);
  const scale = useTransform(scrollYProgress, [startRange, endRange], [0.96, 1]);
  const x = useTransform(scrollYProgress, [startRange, endRange], [-15, 0]);

  return (
    <motion.div
      style={{ opacity, scale, x }}
      className="p-4 sm:p-5 rounded-2xl border border-black/[0.06] bg-[#fafafa] hover:bg-white transition-all shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
    >
      <div className="flex items-start sm:items-center gap-3.5">
        <div
          className="w-2.5 h-2.5 rounded-full shrink-0 mt-1.5 sm:mt-0"
          style={{ backgroundColor: item.color }}
        />
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-semibold text-[#1d1d1f]">
              {item.module}
            </span>
            <span className="text-[11px] text-[#86868b]">· {item.user}</span>
          </div>
          <p className="text-sm text-[#1d1d1f] font-normal">{item.action}</p>
        </div>
      </div>

      <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-0 border-black/[0.04]">
        <span className="text-[11px] font-mono text-[#86868b] flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {item.time}
        </span>
        <span
          className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full"
          style={{
            color: item.color,
            backgroundColor: `${item.color}15`,
          }}
        >
          {item.status}
        </span>
      </div>
    </motion.div>
  );
};

export const AuditTimelineScroll: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const titleOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);
  const titleY = useTransform(scrollYProgress, [0, 0.15], [20, 0]);

  return (
    <div ref={containerRef} className="relative h-[260vh] bg-white border-t border-black/[0.06]">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden px-6">
        <motion.div
          style={{ opacity: titleOpacity, y: titleY }}
          className="text-center max-w-2xl mb-12 select-none"
        >
          <p className="text-[11px] font-semibold uppercase tracking-widest text-[#86868b] mb-3">
            Módulo de Auditoría &amp; Respaldo Inmutable
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-[-0.035em] text-[#1d1d1f] leading-tight">
            Cada cambio, usuario y transacción registrado con exactitud forense.
          </h2>
        </motion.div>

        <div className="w-full max-w-3xl space-y-3">
          {AUDIT_EVENTS.map((item, index) => (
            <AuditTimelineItem
              key={index}
              item={item}
              index={index}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>

        <div className="mt-10 flex items-center gap-6 text-xs text-[#86868b]">
          <span className="flex items-center gap-1.5">
            <FileCheck className="w-4 h-4 text-[#34c759]" />
            Test Suite Automatizado pytest (100% Cobertura)
          </span>
          <span className="hidden sm:inline">·</span>
          <span className="flex items-center gap-1.5">
            <HardDriveDownload className="w-4 h-4 text-[#0071e3]" />
            Respaldos Automáticos Diarios/Semanales
          </span>
        </div>
      </div>
    </div>
  );
};
