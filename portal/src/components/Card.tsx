import React from "react";
import { clsx } from "clsx";

export function Card({ 
  children, 
  className,
  hover = false,
  gradient = false,
  glow = false,
  shine = false,
  magnetic = false,
  card3d = false,
  ripple = false
}: { 
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  gradient?: boolean;
  glow?: boolean;
  shine?: boolean;
  magnetic?: boolean;
  card3d?: boolean;
  ripple?: boolean;
}) {
  return (
    <div 
      className={clsx(
        "glass-strong rounded-2xl p-6 lg:p-8 shadow-premium transition-all duration-500 relative overflow-hidden",
        hover && "hover-lift cursor-pointer",
        gradient && "bg-gradient-to-br from-white/90 to-slate-50/90 dark:from-slate-900/90 dark:to-slate-950/90",
        glow && "animate-glow",
        shine && "shine",
        magnetic && "magnetic",
        card3d && "card-3d",
        ripple && "ripple",
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardTitle({ 
  children, 
  className 
}: { 
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h3 className={clsx("font-bold text-xl lg:text-2xl mb-4 text-slate-900 dark:text-slate-100", className)}>
      {children}
    </h3>
  );
}

export function CardDescription({ 
  children, 
  className 
}: { 
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={clsx("text-sm lg:text-base text-slate-600 dark:text-slate-400 leading-relaxed", className)}>
      {children}
    </p>
  );
}
