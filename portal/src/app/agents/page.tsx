"use client";
import useSWR from "swr";
import { getJSON, postJSON } from "@/lib/api";
import { Button } from "@/components/Button";
import { Card, CardTitle, CardDescription } from "@/components/Card";
import { Tag } from "@/components/Tag";
import { SkeletonCard } from "@/components/Skeleton";
import { Particles } from "@/components/Particles";
import { useToast } from "@/components/ToastProvider";
import { useState } from "react";
import { Search, Plus, Play, Bot, Wrench, Sparkles, Zap } from "lucide-react";

type Agent = { id: string; name: string; tools: string[] };

export default function AgentsPage() {
  const { data, mutate, isLoading } = useSWR<{ items: Agent[] }>(
    "/v1/agents",
    (path: string) => getJSON<{ items: Agent[] }>(path)
  );
  const [name, setName] = useState("");
  const [tools, setTools] = useState("rpc");
  const [q, setQ] = useState("");
  const [running, setRunning] = useState<string | null>(null);
  const toast = useToast();

  async function createAgent() {
    if (!name) return;
    try {
      const payload = { name, tools: tools.split(",").map((t) => t.trim()).filter(Boolean) };
      await postJSON<Agent>("/v1/agents", payload);
      setName("");
      setTools("rpc");
      mutate();
      toast.push("Agent created successfully");
    } catch (error) {
      toast.push("Failed to create agent");
    }
  }

  async function runAgent(id: string) {
    setRunning(id);
    try {
      await postJSON(`/v1/agents/${encodeURIComponent(id)}/execute`, { input: "Hello" });
      toast.push("Job queued successfully");
    } catch (error) {
      toast.push("Failed to queue job");
    } finally {
      setTimeout(() => setRunning(null), 1000);
    }
  }

  const filteredAgents = (data?.items || []).filter((a) => 
    a.name.toLowerCase().includes(q.toLowerCase()) ||
    a.tools.some((t) => t.toLowerCase().includes(q.toLowerCase()))
  );

  return (
    <div className="flex flex-col gap-10 lg:gap-12 animate-fade-in relative">
      <Particles count={12} />
      
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-6 relative z-10">
        <div className="flex-1 min-w-0">
          <h1 className="text-5xl lg:text-6xl font-extrabold gradient-text mb-4 leading-tight">
            AI Agents
          </h1>
          <p className="text-lg lg:text-xl text-slate-600 dark:text-slate-400 font-medium">
            Create and manage intelligent AI agents with custom tools
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg shadow-purple-500/30 animate-float">
            <Bot className="text-white" size={28} />
          </div>
        </div>
      </div>

      {/* Create Agent Card */}
      <Card className="bg-gradient-to-br from-purple-50/80 via-pink-50/80 to-orange-50/80 dark:from-purple-950/30 dark:via-pink-950/30 dark:to-orange-950/30 border-2 border-purple-200/60 dark:border-purple-800/60 glow relative z-10">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg">
            <Plus className="text-white" size={24} />
          </div>
          <CardTitle className="mb-0">Create New Agent</CardTitle>
        </div>
        <CardDescription className="mb-6">
          Build a new AI agent with custom tools and capabilities
        </CardDescription>
        <div className="flex flex-col lg:flex-row gap-4">
          <input
            className="flex-1 px-5 py-4 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all text-sm font-medium shadow-sm hover:shadow-md"
            placeholder="Agent name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && createAgent()}
          />
          <div className="relative flex-1">
            <Wrench className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
            <input
              className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all text-sm font-medium shadow-sm hover:shadow-md"
              placeholder="Tools (comma-separated)"
              value={tools}
              onChange={(e) => setTools(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && createAgent()}
            />
          </div>
          <Button onClick={createAgent} disabled={!name} variant="gradient" size="lg">
            <Plus size={20} className="mr-2" />
            Create Agent
          </Button>
        </div>
      </Card>

      {/* Agents List */}
      <Card className="relative z-10">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <Zap className="text-purple-600 dark:text-purple-400" size={24} />
            <CardTitle className="mb-0">Registered Agents</CardTitle>
          </div>
          <div className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 border border-purple-200 dark:border-purple-800">
            <div className="text-sm font-bold text-slate-700 dark:text-slate-300">
              {filteredAgents.length} {filteredAgents.length === 1 ? "agent" : "agents"}
            </div>
          </div>
        </div>
        
        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
            <input
              className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all text-sm font-medium shadow-sm hover:shadow-md"
              placeholder="Search agents by name or tools..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
        </div>

        {/* Agents */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
              <div className="text-slate-500 dark:text-slate-400 font-medium">Loading agents...</div>
            </div>
          </div>
        ) : filteredAgents.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center">
              <Sparkles className="text-slate-400" size={40} />
            </div>
            <div className="text-xl font-bold text-slate-400 mb-2">No agents found</div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {q ? "Try adjusting your search" : "Create your first agent to get started"}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredAgents.map((a, idx) => (
              <Card key={a.id} hover glow magnetic ripple className="group relative overflow-hidden" style={{ animationDelay: `${idx * 50}ms` }}>
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-pink-500/0 to-blue-500/0 group-hover:from-purple-500/5 group-hover:via-pink-500/5 group-hover:to-blue-500/5 transition-all duration-500" />
                
                <div className="relative z-10 flex items-center justify-between gap-6">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg">
                        <Bot className="text-white" size={20} />
                      </div>
                      <h3 className="font-bold text-xl lg:text-2xl text-slate-900 dark:text-slate-100">
                        {a.name}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap mb-4">
                      {a.tools.map((tool) => (
                        <Tag key={tool} variant="success">{tool}</Tag>
                      ))}
                    </div>
                    <div className="text-xs font-mono text-slate-400 dark:text-slate-500 break-all p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50">
                      {a.id}
                    </div>
                  </div>
                  <div className="ml-4">
                    <Button
                      variant="gradient"
                      onClick={() => runAgent(a.id)}
                      disabled={running === a.id}
                      size="lg"
                    >
                      {running === a.id ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          Running...
                        </>
                      ) : (
                        <>
                          <Play size={20} className="mr-2" />
                          Run Agent
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
