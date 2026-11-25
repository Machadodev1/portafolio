"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { PORTFOLIO_DATA } from "@/data/portfolio";

const Word: React.FC<{
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0.14, 1]);
  const y = useTransform(progress, range, [6, 0]);
  return (
    <motion.span style={{ opacity, y }} className="inline-block mr-[0.22em]">
      {children}
    </motion.span>
  );
};

export const PhilosophyReveal: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "end 0.4"],
  });
  const words = PORTFOLIO_DATA.philosophyWords.split(" ");

  return (
    <section
      id="filosofia"
      ref={ref}
      className="py-28 md:py-40 border-t border-black/[0.06]"
    >
      <div className="max-w-4xl mx-auto px-6 sm:px-10">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-[#86868b] mb-10">
          Filosofía
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[-0.03em] leading-[1.3] text-[#1d1d1f]">
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]}>
                {word}
              </Word>
            );
          })}
        </h2>
      </div>
    </section>
  );
};
