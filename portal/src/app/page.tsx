"use client";
import { Card, CardTitle, CardDescription } from "@/components/Card";
import { StatCard } from "@/components/StatCard";
import { SkeletonCard } from "@/components/Skeleton";
import { Particles } from "@/components/Particles";
import { useEffect, useState } from "react";
import { API_BASE } from "@/lib/api";
import { BarChart2, Cpu, Bot, ArrowRight, Sparkles, Zap, TrendingUp, Rocket } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const [summary, setSummary] = useState<{ requests: number; modelsCreated: number; agentsCreated: number } | null>(null);
  useEffect(() => {
    fetch(`${API_BASE}/v1/metrics-summary`).then(async (r) => setSummary(await r.json())).catch(() => setSummary(null));
  }, []);
  
  const quickActions = [
    {
      title: "Models",
      description: "Register and manage AI models with advanced capabilities",
      href: "/models",
      icon: Cpu,
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20",
    },
    {
      title: "Agents",
      description: "Create and run intelligent agents with custom tools",
      href: "/agents",
      icon: Bot,
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20",
    },
    {
      title: "Metrics",
      description: "Monitor performance and analytics in real-time",
      href: "/metrics",
      icon: BarChart2,
      gradient: "from-emerald-500 to-teal-500",
      bgGradient: "from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20",
    },
  ];
  
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="flex flex-col gap-10 lg:gap-12 animate-fade-in relative">
      <Particles count={15} />
      
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {[1, 2, 3].map((i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : (
        <>
          {/* Hero Section */}
          <div className="flex items-center justify-between flex-wrap gap-6 relative z-10">
        <div className="flex-1 min-w-0">
          <h1 className="text-5xl lg:text-6xl font-extrabold gradient-text mb-4 leading-tight">
            Dashboard
          </h1>
          <p className="text-lg lg:text-xl text-slate-600 dark:text-slate-400 font-medium">
            Welcome to your AI agents and models hub
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg shadow-purple-500/30 animate-float">
            <Rocket className="text-white" size={28} />
          </div>
        </div>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 relative z-10">
        <StatCard 
          title="Total Requests" 
          value={summary?.requests ?? "—"} 
          data={[2,3,5,3,6,8,9,8,12,15,18,20,22,25]} 
          icon={<BarChart2 size={24} />}
          trend="up"
          trendValue="+12%"
          gradient="purple"
        />
        <StatCard 
          title="Models Created" 
          value={summary?.modelsCreated ?? "—"} 
          data={[1,1,2,2,3,4,4,5,6,7,8,9,10,12]} 
          icon={<Cpu size={24} />}
          trend="up"
          trendValue="+8%"
          gradient="blue"
        />
        <StatCard 
          title="Active Agents" 
          value={summary?.agentsCreated ?? "—"} 
          data={[0,1,1,2,2,3,3,3,4,5,6,7,8,9]} 
          icon={<Bot size={24} />}
          trend="up"
          trendValue="+15%"
          gradient="emerald"
        />
      </div>
      
      {/* Quick Actions */}
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="text-purple-600 dark:text-purple-400" size={24} />
          <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-slate-100">Quick Actions</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {quickActions.map((action, idx) => {
            const Icon = action.icon;
            return (
              <Link key={action.href} href={action.href} style={{ animationDelay: `${idx * 100}ms` }}>
                <Card hover glow magnetic ripple className={`h-full group cursor-pointer bg-gradient-to-br ${action.bgGradient} border-2 border-transparent relative z-10`}>
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${action.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-xl group-hover:shadow-2xl`}>
                    <Icon className="text-white" size={28} />
                  </div>
                  <CardTitle className="mb-3">{action.title}</CardTitle>
                  <CardDescription className="mb-6">{action.description}</CardDescription>
                  <div className="flex items-center text-sm font-bold text-slate-700 dark:text-slate-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    Explore <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform duration-300" size={18} />
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
      
      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 relative z-10">
        <Card className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950/30 dark:via-purple-950/30 dark:to-pink-950/30 border-2 border-blue-200/50 dark:border-blue-800/50">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 shadow-lg">
              <Sparkles className="text-white" size={24} />
            </div>
            <CardTitle className="mb-0">Getting Started</CardTitle>
          </div>
          <CardDescription>
            New to NodeAI Hub? Start by creating your first model or agent to begin building intelligent applications with cutting-edge AI capabilities.
          </CardDescription>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-purple-950/30 dark:via-pink-950/30 dark:to-orange-950/30 border-2 border-purple-200/50 dark:border-purple-800/50">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg">
              <Zap className="text-white" size={24} />
            </div>
            <CardTitle className="mb-0">Performance</CardTitle>
          </div>
          <CardDescription>
            Monitor your system performance, view detailed metrics, and optimize your AI workloads in real-time with advanced analytics.
          </CardDescription>
        </Card>
      </div>
        </>
      )}
    </main>
  );
}
