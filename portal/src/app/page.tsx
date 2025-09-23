"use client";
import { Card, CardTitle } from "@/components/Card";
import { StatCard } from "@/components/StatCard";
import { useEffect, useState } from "react";
import { API_BASE } from "@/lib/api";
import { BarChart2, Cpu, Bot } from "lucide-react";

export default function Home() {
  const [summary, setSummary] = useState<{ requests: number; modelsCreated: number; agentsCreated: number } | null>(null);
  useEffect(() => {
    fetch(`${API_BASE}/v1/metrics-summary`).then(async (r) => setSummary(await r.json())).catch(() => setSummary(null));
  }, []);
  return (
    <main className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Requests" value={summary?.requests ?? "—"} data={[2,3,5,3,6,8,9,8,12]} icon={<BarChart2 size={16} />} />
        <StatCard title="Models" value={summary?.modelsCreated ?? "—"} data={[1,1,2,2,3,4,4,5,6]} icon={<Cpu size={16} />} />
        <StatCard title="Agents" value={summary?.agentsCreated ?? "—"} data={[0,1,1,2,2,3,3,3,4]} icon={<Bot size={16} />} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardTitle>Models</CardTitle>
          <p className="text-sm text-gray-500">Register and view models</p>
          <div className="mt-3"><a href="/models" className="text-sm underline">Go to Models →</a></div>
        </Card>
        <Card>
          <CardTitle>Agents</CardTitle>
          <p className="text-sm text-gray-500">Create and run agents</p>
          <div className="mt-3"><a href="/agents" className="text-sm underline">Go to Agents →</a></div>
        </Card>
        <Card>
          <CardTitle>Metrics</CardTitle>
          <p className="text-sm text-gray-500">View service metrics</p>
          <div className="mt-3"><a href="/metrics" className="text-sm underline">Open Metrics →</a></div>
        </Card>
      </div>
    </main>
  );
}


