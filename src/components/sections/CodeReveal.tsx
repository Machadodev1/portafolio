"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

interface CodeToken {
  text: string;
  color: string;
}

interface CodeLineData {
  tokens: CodeToken[];
}

const CODE_LINES: CodeLineData[] = [
  {
    tokens: [{ text: "# SIGIF · login_view — Protección multicapa", color: "#6a9955" }],
  },
  { tokens: [] },
  {
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
  },
  {
    tokens: [
      { text: "def", color: "#569cd6" },
      { text: " login_view", color: "#dcdcaa" },
      { text: "(request):", color: "#d4d4d4" },
    ],
  },
  {
    tokens: [
      { text: "    user ", color: "#d4d4d4" },
      { text: "=", color: "#569cd6" },
      { text: " authenticate", color: "#dcdcaa" },
      { text: "(email, password)", color: "#d4d4d4" },
    ],
  },
  {
    tokens: [
      { text: "    if", color: "#569cd6" },
      { text: " user ", color: "#d4d4d4" },
      { text: "and", color: "#569cd6" },
      { text: " user.is_active:", color: "#d4d4d4" },
    ],
  },
  {
    tokens: [
      { text: "        ", color: "#d4d4d4" },
      { text: "# Rol verificado → acceso concedido", color: "#6a9955" },
    ],
  },
  {
    tokens: [
      { text: "        return", color: "#569cd6" },
      { text: " redirect_by_role", color: "#dcdcaa" },
      { text: "(user)", color: "#d4d4d4" },
    ],
  },
  { tokens: [] },
  {
    tokens: [
      { text: "    ", color: "#d4d4d4" },
      { text: "raise", color: "#569cd6" },
      { text: " PermissionDenied", color: "#4ec9b0" },
      { text: "(", color: "#d4d4d4" },
      { text: "'Acceso bloqueado'", color: "#ce9178" },
      { text: ")", color: "#d4d4d4" },
    ],
  },
];

const ANNOTATIONS = [
  { lineIndex: 2, label: "Rate limit: 5 intentos / 5 min" },
  { lineIndex: 5, label: "RBAC: 3 niveles de rol" },
  { lineIndex: 9, label: "Acceso bloqueado si inactivo" },
];

const LINE_START = 0.2;
const LINE_END = 0.72;
const LINE_STEP = (LINE_END - LINE_START) / CODE_LINES.length;

const CodeLine: React.FC<{
  line: CodeLineData;
  index: number;
  scrollYProgress: MotionValue<number>;
}> = ({ line, index, scrollYProgress }) => {
  const s = LINE_START + index * LINE_STEP;
  const opacity = useTransform(scrollYProgress, [s, s + LINE_STEP * 0.8], [0, 1]);

  const matchingAnnotation = ANNOTATIONS.find((a) => a.lineIndex === index);
  const annOpacity = useTransform(
    scrollYProgress,
    [s + LINE_STEP * 0.4, s + LINE_STEP * 0.95],
    [0, 1]
  );

  return (
    <motion.div style={{ opacity }} className="flex items-baseline gap-5">
      <span className="text-white/20 text-[11px] w-5 text-right shrink-0 select-none">
        {line.tokens.length > 0 ? index + 1 : ""}
      </span>

      <span>
        {line.tokens.map((tok, j) => (
          <span key={j} style={{ color: tok.color }}>
            {tok.text}
          </span>
        ))}
        {line.tokens.length === 0 && <span>&nbsp;</span>}
      </span>

      {matchingAnnotation && (
        <motion.span
          style={{ opacity: annOpacity }}
          className="ml-auto shrink-0 text-[10px] font-semibold tracking-wide text-[#0071e3] bg-[#0071e3]/10 border border-[#0071e3]/25 px-2 py-0.5 rounded-full whitespace-nowrap"
        >
          {matchingAnnotation.label}
        </motion.span>
      )}
    </motion.div>
  );
};

export const CodeReveal: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const windowScale = useTransform(scrollYProgress, [0, 0.22], [1.28, 1]);
  const windowOpacity = useTransform(scrollYProgress, [0, 0.12], [0, 1]);
  const windowY = useTransform(scrollYProgress, [0, 0.22], [48, 0]);

  const eyebrowOpacity = useTransform(scrollYProgress, [0.04, 0.16], [0, 1]);
  const eyebrowY = useTransform(scrollYProgress, [0.04, 0.16], [12, 0]);

  const captionOpacity = useTransform(scrollYProgress, [0.74, 0.9], [0, 1]);
  const captionY = useTransform(scrollYProgress, [0.74, 0.9], [20, 0]);

  return (
    <div ref={containerRef} className="relative h-[320vh]">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden px-6">
        <motion.p
          style={{ opacity: eyebrowOpacity, y: eyebrowY }}
          className="text-[11px] font-semibold uppercase tracking-widest text-[#86868b] mb-8 select-none"
        >
          Arquitectura · SIGIF
        </motion.p>

        <motion.div
          style={{ scale: windowScale, opacity: windowOpacity, y: windowY }}
          className="relative w-full max-w-[640px]"
        >
          <div className="rounded-2xl overflow-hidden border border-white/[0.06] shadow-[0_40px_100px_rgba(0,0,0,0.22)]">
            <div className="flex items-center gap-2 px-5 py-3.5 bg-[#1e1e1e] border-b border-white/[0.05]">
              <span className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e]" />
              <span className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]" />
              <span className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29]" />
              <span className="ml-3 text-[12px] font-medium text-white/35 font-mono tracking-tight">
                sigif / views.py
              </span>
              <span className="ml-auto text-[11px] text-white/20 font-mono">
                Python · Django
              </span>
            </div>

            <div className="bg-[#1e1e1e] px-6 py-5 font-mono text-[13px] leading-[1.9] select-none overflow-hidden">
              {CODE_LINES.map((line, i) => (
                <CodeLine
                  key={i}
                  line={line}
                  index={i}
                  scrollYProgress={scrollYProgress}
                />
              ))}
            </div>
          </div>

          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-[#0071e3]/10 blur-3xl rounded-full pointer-events-none" />
        </motion.div>

        <motion.div
          style={{ opacity: captionOpacity, y: captionY }}
          className="mt-14 text-center max-w-xl"
        >
          <p className="text-[28px] sm:text-[34px] font-semibold tracking-[-0.03em] text-[#1d1d1f] leading-tight">
            Backend seguro desde el primer commit.
          </p>
          <p className="text-sm text-[#86868b] mt-3">
            Rate limiting · PBKDF2 · Control de roles · Auditoría automática
          </p>
        </motion.div>
      </div>
    </div>
  );
};
