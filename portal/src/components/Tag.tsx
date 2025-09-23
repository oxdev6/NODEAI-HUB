import React from "react";

export function Tag({ children }: { children: React.ReactNode }) {
  return <span className="px-2 py-0.5 rounded text-xs bg-gray-100 dark:bg-zinc-800 border">{children}</span>;
}


