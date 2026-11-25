"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Boxes,
  Percent,
  CheckCircle2,
  Receipt,
} from "lucide-react";

export const InteractiveBillingEngine: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Stage 1: Card scaling into view
  const scale = useTransform(scrollYProgress, [0, 0.25], [0.88, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);

  // Stage 2: Product selection & inventory deduction
  const stage1Opacity = useTransform(scrollYProgress, [0.15, 0.35], [0.2, 1]);
  const stockDeductionY = useTransform(scrollYProgress, [0.2, 0.4], [15, 0]);

  // Stage 3: Realtime Tax & Multi-payment calculation
  const stage2Opacity = useTransform(scrollYProgress, [0.35, 0.6], [0.2, 1]);
  const paymentBadgeScale = useTransform(scrollYProgress, [0.45, 0.65], [0.85, 1]);

  // Stage 4: Financial reconciliation & Ledger seal
  const stage3Opacity = useTransform(scrollYProgress, [0.65, 0.9], [0.2, 1]);
  const sealScale = useTransform(scrollYProgress, [0.75, 0.95], [0, 1]);

  return (
    <div ref={containerRef} className="relative h-[300vh] bg-[#fbfbfd] border-t border-black/[0.06]">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden px-6">
        
        {/* Apple Section Eyebrow */}
        <p className="text-[11px] font-semibold uppercase tracking-widest text-[#86868b] mb-4 select-none">
          Mecanismo Operativo · Facturación en Tiempo Real
        </p>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-[-0.03em] text-[#1d1d1f] text-center mb-8">
          De la orden al balance contable en un solo ciclo atómico.
        </h2>

        {/* Central Keynote-grade Interactive Card */}
        <motion.div
          style={{ scale, opacity }}
          className="relative w-full max-w-4xl rounded-[32px] border border-black/[0.08] bg-white shadow-[0_40px_100px_rgba(0,0,0,0.07)] p-6 sm:p-10 overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            
            {/* Step 1: Stock & Cart Item */}
            <motion.div
              style={{ opacity: stage1Opacity }}
              className="p-5 rounded-2xl bg-[#fafafa] border border-black/[0.05] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-[#86868b] uppercase tracking-wider mb-3">
                  <span>Paso 01</span>
                  <Boxes className="w-4 h-4 text-[#0071e3]" />
                </div>
                <h4 className="text-base font-semibold text-[#1d1d1f] mb-1">
                  Descuento de Stock
                </h4>
                <p className="text-xs text-[#86868b] leading-relaxed mb-4">
                  Validación instantánea contra inventario con bloqueo transaccional.
                </p>

                <div className="p-3 rounded-xl bg-white border border-black/[0.04] space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-[#1d1d1f]">Kit Embrague Ref. 402</span>
                    <span className="font-mono text-[#0071e3]">x2 un</span>
                  </div>
                  <motion.div
                    style={{ y: stockDeductionY }}
                    className="flex justify-between text-[11px] text-[#34c759] font-medium pt-1 border-t border-black/[0.04]"
                  >
                    <span>Stock Restante:</span>
                    <span className="font-mono">18 un (Óptimo)</span>
                  </motion.div>
                </div>
              </div>

              <div className="pt-4 text-[11px] text-[#86868b] flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#34c759]" />
                <span>Control sin stock negativo</span>
              </div>
            </motion.div>

            {/* Step 2: Taxes, Discounts & Payment */}
            <motion.div
              style={{ opacity: stage2Opacity }}
              className="p-5 rounded-2xl bg-[#fafafa] border border-black/[0.05] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-[#86868b] uppercase tracking-wider mb-3">
                  <span>Paso 02</span>
                  <Percent className="w-4 h-4 text-[#ff9500]" />
                </div>
                <h4 className="text-base font-semibold text-[#1d1d1f] mb-1">
                  Cálculo Tributario e IVA
                </h4>
                <p className="text-xs text-[#86868b] leading-relaxed mb-4">
                  Desglose exacto de base gravable, IVA del 19% y descuentos.
                </p>

                <div className="p-3 rounded-xl bg-white border border-black/[0.04] space-y-1.5 font-mono text-xs">
                  <div className="flex justify-between text-[#86868b]">
                    <span>Subtotal:</span>
                    <span>$ 850.000</span>
                  </div>
                  <div className="flex justify-between text-[#86868b]">
                    <span>IVA (19%):</span>
                    <span>$ 161.500</span>
                  </div>
                  <div className="flex justify-between text-[#1d1d1f] font-bold pt-1 border-t border-black/[0.04]">
                    <span>Total Factura:</span>
                    <span className="text-[#0071e3]">$ 1.011.500</span>
                  </div>
                </div>
              </div>

              <motion.div
                style={{ scale: paymentBadgeScale }}
                className="mt-4 flex flex-wrap gap-1.5"
              >
                {["Efectivo", "Transferencia", "Crédito"].map((method) => (
                  <span
                    key={method}
                    className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-white border border-black/[0.06] text-[#1d1d1f]"
                  >
                    {method}
                  </span>
                ))}
              </motion.div>
            </motion.div>

            {/* Step 3: Ledger Reconciliation & Audit */}
            <motion.div
              style={{ opacity: stage3Opacity }}
              className="p-5 rounded-2xl bg-[#fafafa] border border-black/[0.05] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-[#86868b] uppercase tracking-wider mb-3">
                  <span>Paso 03</span>
                  <Receipt className="w-4 h-4 text-[#34c759]" />
                </div>
                <h4 className="text-base font-semibold text-[#1d1d1f] mb-1">
                  Trazabilidad e Impacto
                </h4>
                <p className="text-xs text-[#86868b] leading-relaxed mb-4">
                  Alimentación de finanzas, balance de caja y auditoría inmutable.
                </p>

                <div className="p-3 rounded-xl bg-white border border-black/[0.04] space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#86868b]">Consecutivo:</span>
                    <span className="font-mono font-bold text-[#1d1d1f]">FAC-00892</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-[#86868b]">
                    <span>Auditoría:</span>
                    <span className="text-[#34c759] font-medium">Registrado</span>
                  </div>
                </div>
              </div>

              <motion.div
                style={{ scale: sealScale }}
                className="mt-4 p-2.5 rounded-xl bg-[#34c759]/10 border border-[#34c759]/20 flex items-center justify-center gap-1.5 text-xs font-semibold text-[#248a3d]"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Transacción Certificada</span>
              </motion.div>
            </motion.div>

          </div>
        </motion.div>

      </div>
    </div>
  );
};
