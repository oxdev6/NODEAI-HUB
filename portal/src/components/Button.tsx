"use client";
import { clsx } from "clsx";
import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "outline" | "gradient";
  size?: "sm" | "md" | "lg";
};

export function Button({ 
  className, 
  variant = "primary", 
  size = "md",
  disabled,
  children,
  ...props 
}: ButtonProps) {
  const base = "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 shadow-lg hover:shadow-xl";
  
  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };
  
  const styles = {
    primary: "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-purple-500/30 focus:ring-purple-500",
    gradient: "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white hover:shadow-glow-lg shadow-blue-500/30 focus:ring-purple-500 animate-gradient-shift",
    secondary: "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 shadow-sm focus:ring-slate-400",
    outline: "border-2 border-purple-500/50 text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-950/30 focus:ring-purple-400 bg-transparent",
    ghost: "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:ring-slate-400 shadow-none hover:shadow-sm",
  } as const;
  
  return (
    <button 
      className={clsx(base, sizes[size], styles[variant], "ripple magnetic", className)} 
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
