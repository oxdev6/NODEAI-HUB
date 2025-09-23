"use client";
import useSWR from "swr";
import { getJSON, postJSON } from "@/lib/api";
import { Button } from "@/components/Button";
import { Card, CardTitle } from "@/components/Card";
import { useToast } from "@/components/ToastProvider";
import { useState } from "react";

type Agent = { id: string; name: string; tools: string[] };

export default function AgentsPage() {
  const { data, mutate, isLoading } = useSWR<{ items: Agent[] }>(
    "/v1/agents",
    (path: string) => getJSON<{ items: Agent[] }>(path)
  );
  const [name, setName] = useState("");
  const [tools, setTools] = useState("rpc");
  const [q, setQ] = useState("");
  const toast = useToast();

  async function createAgent() {
    if (!name) return;
    const payload = { name, tools: tools.split(",").map((t) => t.trim()).filter(Boolean) };
    await postJSON<Agent>("/v1/agents", payload);
    setName("");
    mutate();
    toast.push("Agent created");
  }

  async function runAgent(id: string) {
    await postJSON(`/v1/agents/${encodeURIComponent(id)}/execute`, { input: "Hello" });
    toast.push("Job queued");
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-xl font-semibold">Agents</h1>
      <Card>
        <CardTitle>Create Agent</CardTitle>
        <div className="flex gap-2">
          <input className="border px-3 py-2 rounded w-64" placeholder="Agent name" value={name} onChange={(e) => setName(e.target.value)} />
          <input className="border px-3 py-2 rounded w-64" placeholder="Tools (comma)" value={tools} onChange={(e) => setTools(e.target.value)} />
          <Button onClick={createAgent}>Create</Button>
        </div>
      </Card>
      <Card>
        <CardTitle>Registered Agents</CardTitle>
        <div className="mb-3">
          <input className="border px-3 py-2 rounded w-64" placeholder="Search" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        {isLoading ? (
          <p className="text-sm text-gray-500">Loading…</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                <th className="py-2">Name</th>
                <th className="py-2">Tools</th>
                <th className="py-2">ID</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {(data?.items || []).filter((a) => a.name.toLowerCase().includes(q.toLowerCase())).map((a) => (
                <tr key={a.id} className="border-b hover:bg-gray-50 dark:hover:bg-zinc-900">
                  <td className="py-2">{a.name}</td>
                  <td className="py-2">{a.tools.join(", ")}</td>
                  <td className="py-2"><code className="text-xs text-gray-500">{a.id}</code></td>
                  <td className="py-2"><Button variant="secondary" onClick={() => runAgent(a.id)}>Run</Button></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </div>
  );
}


