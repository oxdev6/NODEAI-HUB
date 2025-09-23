"use client";
import React, { createContext, useContext, useState } from "react";

type Toast = { id: number; message: string };
const ToastCtx = createContext<{ push: (m: string) => void } | null>(null);

export function useToast() {
  const ctx = useContext(ToastCtx);
  if (!ctx) throw new Error("ToastProvider missing");
  return ctx;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  function push(message: string) {
    const id = Date.now();
    setToasts((t) => [...t, { id, message }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2500);
  }
  return (
    <ToastCtx.Provider value={{ push }}>
      {children}
      <div className="fixed bottom-4 right-4 space-y-2">
        {toasts.map((t) => (
          <div key={t.id} className="px-3 py-2 rounded bg-black text-white text-sm dark:bg-white dark:text-black shadow">
            {t.message}
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}


