"use client";
import React from "react";
import { ThemeToggle } from "./ThemeToggle";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen grid grid-cols-[240px_1fr]">
      <aside className="border-r p-4 space-y-4">
        <div className="font-semibold text-lg">NodeAI Agents Hub</div>
        <nav className="flex flex-col text-sm gap-2">
          <a href="/" className="hover:underline">Dashboard</a>
          <a href="/models" className="hover:underline">Models</a>
          <a href="/agents" className="hover:underline">Agents</a>
          <a href="/metrics" className="hover:underline">Metrics</a>
        </nav>
      </aside>
      <div>
        <header className="border-b p-4 flex items-center justify-between gap-4">
          <input placeholder="Search…" className="border px-3 py-1.5 rounded w-full max-w-md" />
          <ThemeToggle />
        </header>
        <main className="max-w-6xl mx-auto p-6">{children}</main>
      </div>
    </div>
  );
}


