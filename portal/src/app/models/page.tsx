"use client";
import useSWR from "swr";
import { API_BASE, getJSON, postJSON } from "@/lib/api";
import { Button } from "@/components/Button";
import { Card, CardTitle, CardDescription } from "@/components/Card";
import { Tag } from "@/components/Tag";
import { SkeletonCard } from "@/components/Skeleton";
import { Particles } from "@/components/Particles";
import { useToast } from "@/components/ToastProvider";
import { useState } from "react";
import { Search, Filter, Plus, Star, Download, ArrowRight, Sparkles, Cpu, TrendingUp } from "lucide-react";
import Link from "next/link";

type Model = { id: string; name: string; description?: string; tags?: string[]; stars?: number; downloads?: number };

export default function ModelsPage() {
  const { data, mutate, isLoading } = useSWR<{ items: Model[] }>(
    "/v1/models",
    (path: string) => getJSON<{ items: Model[] }>(path)
  );
  const [name, setName] = useState("");
  const [q, setQ] = useState("");
  const [activeTag, setActiveTag] = useState<string>("");
  const toast = useToast();

  async function createModel() {
    if (!name) return;
    try {
      await postJSON<Model>("/v1/models", { name });
      setName("");
      mutate();
      toast.push("Model created successfully");
    } catch (error) {
      toast.push("Failed to create model");
    }
  }

  const allTags = Array.from(new Set((data?.items || []).flatMap((m) => m.tags || [])));
  const filteredModels = (data?.items || [])
    .filter((m) => m.name.toLowerCase().includes(q.toLowerCase()))
    .filter((m) => (activeTag ? (m.tags || []).includes(activeTag) : true));

  return (
    <div className="flex flex-col gap-10 lg:gap-12 animate-fade-in relative">
      <Particles count={12} />
      
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-6 relative z-10">
        <div className="flex-1 min-w-0">
          <h1 className="text-5xl lg:text-6xl font-extrabold gradient-text mb-4 leading-tight">
            AI Models
          </h1>
          <p className="text-lg lg:text-xl text-slate-600 dark:text-slate-400 font-medium">
            Register and manage your AI models with advanced capabilities
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/30 animate-float">
            <Cpu className="text-white" size={28} />
          </div>
        </div>
      </div>

      {/* Create Model Card */}
      <Card className="bg-gradient-to-br from-blue-50/80 via-cyan-50/80 to-purple-50/80 dark:from-blue-950/30 dark:via-cyan-950/30 dark:to-purple-950/30 border-2 border-blue-200/60 dark:border-blue-800/60 glow relative z-10">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg">
            <Plus className="text-white" size={24} />
          </div>
          <CardTitle className="mb-0">Create New Model</CardTitle>
        </div>
        <CardDescription className="mb-6">
          Register a new AI model to your hub and start building intelligent applications
        </CardDescription>
        <div className="flex gap-4 flex-wrap">
          <input
            className="flex-1 min-w-[250px] px-5 py-4 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all text-sm font-medium shadow-sm hover:shadow-md"
            placeholder="Enter model name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && createModel()}
          />
          <Button onClick={createModel} disabled={!name} variant="gradient" size="lg">
            <Plus size={20} className="mr-2" />
            Create Model
          </Button>
        </div>
      </Card>

      {/* Models Grid */}
      <Card className="relative z-10">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <TrendingUp className="text-purple-600 dark:text-purple-400" size={24} />
            <CardTitle className="mb-0">Registered Models</CardTitle>
          </div>
          <div className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 border border-purple-200 dark:border-purple-800">
            <div className="text-sm font-bold text-slate-700 dark:text-slate-300">
              {filteredModels.length} {filteredModels.length === 1 ? "model" : "models"}
            </div>
          </div>
        </div>
        
        {/* Search and Filter */}
        <div className="mb-8 flex gap-4 flex-wrap">
          <div className="relative flex-1 min-w-[280px]">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
            <input
              className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all text-sm font-medium shadow-sm hover:shadow-md"
              placeholder="Search models..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
          {allTags.length > 0 && (
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
              <select
                className="pl-12 pr-8 py-3.5 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all text-sm font-medium shadow-sm hover:shadow-md appearance-none cursor-pointer"
                value={activeTag}
                onChange={(e) => setActiveTag(e.target.value)}
                aria-label="Filter by tag"
                title="Filter by tag"
              >
                <option value="">All tags</option>
                {allTags.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Models Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
              <div className="text-slate-500 dark:text-slate-400 font-medium">Loading models...</div>
            </div>
          </div>
        ) : filteredModels.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center">
              <Sparkles className="text-slate-400" size={40} />
            </div>
            <div className="text-xl font-bold text-slate-400 mb-2">No models found</div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {q || activeTag ? "Try adjusting your filters" : "Create your first model to get started"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredModels.map((m, idx) => (
              <Link
                key={m.id}
                href={`/models/${encodeURIComponent(m.id)}`}
                className="group"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <Card hover glow magnetic card3d ripple className="h-full relative overflow-hidden">
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-pink-500/0 to-blue-500/0 group-hover:from-purple-500/10 group-hover:via-pink-500/10 group-hover:to-blue-500/10 transition-all duration-500" />
                  
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-xl text-slate-900 dark:text-slate-100 mb-2 truncate group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                          {m.name}
                        </h3>
                        <div className="flex gap-2 flex-wrap">
                          {(m.tags || ["LLM"]).slice(0, 3).map((t) => (
                            <Tag key={t} variant="primary">{t}</Tag>
                          ))}
                          {(m.tags || []).length > 3 && (
                            <Tag>+{(m.tags || []).length - 3}</Tag>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {m.description && (
                      <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-6 leading-relaxed">
                        {m.description}
                      </p>
                    )}
                    
                    <div className="flex items-center gap-6 text-xs text-slate-500 dark:text-slate-400 mb-6">
                      <div className="flex items-center gap-2">
                        <Star size={16} className="fill-yellow-400 text-yellow-400" />
                        <span className="font-bold">{m.stars ?? 0}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Download size={16} />
                        <span className="font-bold">{m.downloads ?? 0}</span>
                      </div>
                    </div>
                    
                    <div className="text-xs font-mono text-slate-400 dark:text-slate-500 break-all mb-4 p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50">
                      {m.id}
                    </div>
                    
                    <div className="flex items-center text-sm font-bold text-slate-700 dark:text-slate-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                      View details <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform duration-300" size={18} />
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
