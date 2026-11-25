"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  variant?: "primary" | "secondary" | "glass" | "ghost" | "apple-dark";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  href?: string;
  target?: string;
  rel?: string;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  children,
  icon,
  iconPosition = "right",
  href,
  target,
  rel,
  className,
  ...props
}) => {
  const baseStyles =
    "relative inline-flex items-center justify-center font-medium transition-all duration-300 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0071E3] focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none select-none cursor-pointer";

  const sizeStyles = {
    sm: "text-xs px-4 py-2 gap-1.5",
    md: "text-sm px-5 py-2.5 gap-2",
    lg: "text-base px-7 py-3.5 gap-2.5",
  };

  const variantStyles = {
    primary:
      "bg-[#0071E3] text-white hover:bg-[#0077ED] shadow-[0_4px_14px_rgba(0,113,227,0.3)] hover:shadow-[0_6px_20px_rgba(0,113,227,0.4)] active:scale-[0.98]",
    secondary:
      "bg-[#F5F5F7] text-[#1D1D1F] hover:bg-[#E8E8ED] border border-black/[0.04] active:scale-[0.98]",
    "apple-dark":
      "bg-[#1D1D1F] text-white hover:bg-[#000000] shadow-[0_4px_16px_rgba(0,0,0,0.15)] active:scale-[0.98]",
    glass:
      "bg-white/70 backdrop-blur-md text-[#1D1D1F] border border-black/[0.08] hover:bg-white/95 hover:border-black/[0.14] shadow-[0_2px_8px_rgba(0,0,0,0.04)] active:scale-[0.98]",
    ghost:
      "bg-transparent text-[#1D1D1F] hover:bg-black/[0.04] active:scale-[0.98]",
  };

  const content = (
    <>
      {icon && iconPosition === "left" && (
        <span className="inline-flex shrink-0 transition-transform duration-300 group-hover:-translate-x-0.5">
          {icon}
        </span>
      )}
      <span>{children}</span>
      {icon && iconPosition === "right" && (
        <span className="inline-flex shrink-0 transition-transform duration-300 group-hover:translate-x-0.5">
          {icon}
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        target={target}
        rel={rel}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn("group", baseStyles, sizeStyles[size], variantStyles[variant], className)}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn("group", baseStyles, sizeStyles[size], variantStyles[variant], className)}
      {...props}
    >
      {content}
    </motion.button>
  );
};
