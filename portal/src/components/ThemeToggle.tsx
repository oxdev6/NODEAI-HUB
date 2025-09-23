"use client";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add("dark"); else root.classList.remove("dark");
    try { localStorage.setItem("theme", dark ? "dark" : "light"); } catch {}
  }, [dark]);
  useEffect(() => {
    try {
      const saved = localStorage.getItem("theme");
      setDark(saved ? saved === "dark" : window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
    } catch { setDark(false); }
  }, []);
  return (
    <button onClick={() => setDark(!dark)} className="text-sm border px-3 py-1 rounded">
      {dark ? "Light" : "Dark"}
    </button>
  );
}


