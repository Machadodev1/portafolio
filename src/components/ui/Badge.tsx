"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "sapphire" | "emerald" | "outline" | "glass";
  size?: "sm" | "md";
  className?: string;
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "default",
  size = "md",
  className,
  dot = false,
}) => {
  const variantStyles = {
    default: "bg-[#F5F5F7] text-[#1D1D1F] border border-black/[0.04]",
    sapphire: "bg-[#0071E3]/10 text-[#0071E3] border border-[#0071E3]/20",
    emerald: "bg-[#34C759]/10 text-[#248A3D] border border-[#34C759]/20",
    outline: "bg-transparent text-[#86868B] border border-black/[0.1]",
    glass: "bg-white/80 backdrop-blur-md text-[#1D1D1F] border border-black/[0.06] shadow-[0_2px_8px_rgba(0,0,0,0.02)]",
  };

  const sizeStyles = {
    sm: "text-[11px] font-medium px-2.5 py-1 tracking-tight",
    md: "text-xs font-medium px-3.5 py-1.5 tracking-tight",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full transition-colors duration-200 select-none",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {dot && (
        <span
          className={cn(
            "w-1.5 h-1.5 rounded-full",
            variant === "emerald"
              ? "bg-[#34C759] animate-pulse"
              : variant === "sapphire"
              ? "bg-[#0071E3]"
              : "bg-[#86868B]"
          )}
        />
      )}
      {children}
    </span>
  );
};
