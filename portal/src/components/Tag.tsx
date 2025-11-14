import React from "react";
import { clsx } from "clsx";

type TagVariant = "default" | "primary" | "success" | "warning" | "danger";

export function Tag({ 
  children, 
  variant = "default",
  className 
}: { 
  children: React.ReactNode;
  variant?: TagVariant;
  className?: string;
}) {
  const variants = {
    default: "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700",
    primary: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800",
    success: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800",
    warning: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800",
    danger: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800",
  };
  
  return (
    <span 
      className={clsx(
        "inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium border transition-colors",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}


