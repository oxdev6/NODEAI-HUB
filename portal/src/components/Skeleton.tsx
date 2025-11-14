import React from "react";
import { clsx } from "clsx";

export function Skeleton({ 
  className,
  variant = "rectangular",
  width,
  height,
  rounded = "md"
}: { 
  className?: string;
  variant?: "rectangular" | "circular" | "text";
  width?: string | number;
  height?: string | number;
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "full";
}) {
  const baseStyles = "skeleton bg-slate-200 dark:bg-slate-800";
  
  const roundedStyles = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    full: "rounded-full",
  };
  
  const variantStyles = {
    rectangular: "",
    circular: "rounded-full",
    text: "rounded",
  };
  
  const style: React.CSSProperties = {};
  if (width) style.width = typeof width === "number" ? `${width}px` : width;
  if (height) style.height = typeof height === "number" ? `${height}px` : height;
  
  if (variant === "circular") {
    style.width = style.width || "40px";
    style.height = style.height || "40px";
  }
  
  if (variant === "text") {
    style.height = style.height || "1em";
    style.width = style.width || "100%";
  }
  
  return (
    <div
      className={clsx(
        baseStyles,
        variant === "circular" ? "rounded-full" : roundedStyles[rounded],
        variantStyles[variant],
        className
      )}
      style={style}
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="glass-strong rounded-2xl p-6 lg:p-8 shadow-premium">
      <div className="flex items-center gap-4 mb-6">
        <Skeleton variant="circular" width={48} height={48} />
        <div className="flex-1">
          <Skeleton variant="text" width="60%" height={24} className="mb-2" />
          <Skeleton variant="text" width="40%" height={16} />
        </div>
      </div>
      <Skeleton variant="rectangular" height={120} rounded="lg" className="mb-4" />
      <div className="space-y-2">
        <Skeleton variant="text" width="100%" />
        <Skeleton variant="text" width="90%" />
        <Skeleton variant="text" width="80%" />
      </div>
    </div>
  );
}

