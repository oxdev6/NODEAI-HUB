"use client";
import { clsx } from "clsx";
import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

export function Button({ className, variant = "primary", ...props }: ButtonProps) {
  const base = "px-4 py-2 rounded text-sm transition-colors";
  const styles = {
    primary: "bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200",
    secondary: "border hover:bg-gray-50 dark:hover:bg-zinc-900",
    ghost: "hover:bg-gray-50 dark:hover:bg-zinc-900",
  } as const;
  return <button className={clsx(base, styles[variant], className)} {...props} />;
}


