"use client";
import React from "react";
import { ThemeToggle } from "./ThemeToggle";
import { Home, Cpu, Bot, BarChart3, Search, Sparkles } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Dashboard", icon: Home, gradient: "from-purple-500 to-pink-500" },
  { href: "/models", label: "Models", icon: Cpu, gradient: "from-blue-500 to-cyan-500" },
  { href: "/agents", label: "Agents", icon: Bot, gradient: "from-emerald-500 to-teal-500" },
  { href: "/metrics", label: "Metrics", icon: BarChart3, gradient: "from-orange-500 to-red-500" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-slate-950 dark:via-black dark:to-slate-900">
      {/* Premium Sidebar */}
      <aside className="w-72 glass-strong border-r border-slate-200/60 dark:border-slate-700/60 flex flex-col relative overflow-hidden">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-blue-500/5 dark:from-purple-500/10 dark:via-pink-500/10 dark:to-blue-500/10 pointer-events-none" />
        
        <div className="relative z-10 p-6 border-b border-slate-200/60 dark:border-slate-700/60">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 flex items-center justify-center shadow-lg shadow-purple-500/30 animate-glow">
                <Sparkles className="text-white" size={24} />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white dark:border-slate-900 animate-pulse" />
            </div>
            <div>
              <div className="font-bold text-xl gradient-text">NodeAI Hub</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">AI Agents & Models</div>
            </div>
          </div>
        </div>
        
        <nav className="relative z-10 flex-1 p-4 space-y-2">
          {navItems.map((item, idx) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group relative flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg shadow-${item.gradient.split('-')[1]}-500/30 scale-105`
                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-100/80 dark:hover:bg-slate-800/80 hover:scale-[1.02]"
                }`}
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                {isActive && (
                  <div className="absolute inset-0 bg-white/10 rounded-xl blur-xl" />
                )}
                <div className={`relative z-10 p-1.5 rounded-lg ${
                  isActive ? "bg-white/20" : "bg-slate-100 dark:bg-slate-800 group-hover:bg-slate-200 dark:group-hover:bg-slate-700"
                } transition-colors`}>
                  <Icon size={18} className={isActive ? "text-white" : ""} />
                </div>
                <span className="relative z-10">{item.label}</span>
                {isActive && (
                  <div className="absolute right-2 w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                )}
              </Link>
            );
          })}
        </nav>
        
        <div className="relative z-10 p-4 border-t border-slate-200/60 dark:border-slate-700/60">
          <div className="px-4 py-2 rounded-lg bg-gradient-to-r from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700">
            <div className="text-xs font-semibold text-slate-600 dark:text-slate-400">Version</div>
            <div className="text-sm font-bold gradient-text">v0.1.0</div>
          </div>
        </div>
      </aside>
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Premium Header */}
        <header className="glass-strong border-b border-slate-200/60 dark:border-slate-700/60 px-8 py-5 sticky top-0 z-50 backdrop-blur-2xl">
          <div className="flex items-center justify-between gap-6">
            <div className="relative flex-1 max-w-2xl">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
              <input
                placeholder="Search models, agents, metrics..."
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all text-sm font-medium placeholder:text-slate-400 shadow-sm hover:shadow-md"
              />
            </div>
            <ThemeToggle />
          </div>
        </header>
        
        {/* Content */}
        <main className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto p-8 lg:p-12 animate-fade-in">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
