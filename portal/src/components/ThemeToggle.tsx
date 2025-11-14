"use client";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem("theme");
      const isDark = saved ? saved === "dark" : window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDark(isDark);
    } catch { 
      setDark(false); 
    }
  }, []);
  
  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    try { 
      localStorage.setItem("theme", dark ? "dark" : "light"); 
    } catch {}
  }, [dark, mounted]);
  
  if (!mounted) {
    return (
      <div className="w-12 h-12 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm" />
    );
  }
  
  return (
    <button
      onClick={() => setDark(!dark)}
      className="w-12 h-12 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2 active:scale-95 shadow-sm hover:shadow-md group"
      aria-label="Toggle theme"
    >
      {dark ? (
        <Sun size={20} className="text-slate-700 dark:text-slate-300 group-hover:text-yellow-500 transition-colors" />
      ) : (
        <Moon size={20} className="text-slate-700 dark:text-slate-300 group-hover:text-purple-500 transition-colors" />
      )}
    </button>
  );
}
