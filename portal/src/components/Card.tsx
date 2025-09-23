import React from "react";

export function Card({ children }: { children: React.ReactNode }) {
  return <div className="rounded border p-6 bg-white/50 dark:bg-black/30 backdrop-blur">{children}</div>;
}

export function CardTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="font-medium mb-2">{children}</h3>;
}


