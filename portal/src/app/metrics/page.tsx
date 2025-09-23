"use client";
import { API_BASE } from "@/lib/api";
import { useEffect, useState } from "react";
import { Card, CardTitle } from "@/components/Card";
import { StatCard } from "@/components/StatCard";
import { BarChart2, Cpu, Bot } from "lucide-react";

type Summary = {
  requests: number;
  modelsCreated: number;
  agentsCreated: number;
  uptimeSec: number;
  memoryRss: number;
  memoryHeapUsed: number;
};

export default function MetricsPage() {
  const [text, setText] = useState<string>("");
  const [summary, setSummary] = useState<Summary | null>(null);
  useEffect(() => {
    const load = async () => {
      try {
        const [m, s] = await Promise.all([
          fetch(`${API_BASE}/v1/metrics`).then((r) => r.text()),
          fetch(`${API_BASE}/v1/metrics-summary`).then((r) => r.json()),
        ]);
        setText(m);
        setSummary(s);
      } catch (e) {}
    };
    load();
    const id = setInterval(load, 5000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-xl font-semibold">Metrics</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Requests" value={summary?.requests ?? "—"} data={[2,3,5,3,6,8,9,8,12]} icon={<BarChart2 size={16} />} />
        <StatCard title="Models" value={summary?.modelsCreated ?? "—"} data={[1,1,2,2,3,4,4,5,6]} icon={<Cpu size={16} />} />
        <StatCard title="Agents" value={summary?.agentsCreated ?? "—"} data={[0,1,1,2,2,3,3,3,4]} icon={<Bot size={16} />} />
      </div>
      <details className="rounded border">
        <summary className="px-4 py-3 cursor-pointer select-none">Prometheus (text)</summary>
        <pre className="p-4 overflow-auto text-xs whitespace-pre-wrap">{text || "Loading…"}</pre>
      </details>
    </div>
  );
}


