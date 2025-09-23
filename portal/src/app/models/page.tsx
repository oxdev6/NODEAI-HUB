"use client";
import useSWR from "swr";
import { API_BASE, getJSON, postJSON } from "@/lib/api";
import { Button } from "@/components/Button";
import { Card, CardTitle } from "@/components/Card";
import { Tag } from "@/components/Tag";
import { useToast } from "@/components/ToastProvider";
import { useState } from "react";

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
    await postJSON<Model>("/v1/models", { name });
    setName("");
    mutate();
    toast.push("Model created");
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-xl font-semibold">Models</h1>
      <Card>
        <CardTitle>Create Model</CardTitle>
        <div className="flex gap-2">
          <input className="border px-3 py-2 rounded w-64" placeholder="Model name" value={name} onChange={(e) => setName(e.target.value)} />
          <Button onClick={createModel}>Create</Button>
        </div>
      </Card>
      <Card>
        <CardTitle>Registered Models</CardTitle>
        <div className="mb-3 flex gap-2 items-center">
          <input className="border px-3 py-2 rounded w-64" placeholder="Search" value={q} onChange={(e) => setQ(e.target.value)} />
          <select className="border px-3 py-2 rounded" value={activeTag} onChange={(e) => setActiveTag(e.target.value)}>
            <option value="">All tags</option>
            {Array.from(new Set((data?.items || []).flatMap((m) => m.tags || []))).map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        {isLoading ? (
          <p className="text-sm text-gray-500">Loading…</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {(data?.items || [])
              .filter((m) => m.name.toLowerCase().includes(q.toLowerCase()))
              .filter((m) => (activeTag ? (m.tags || []).includes(activeTag) : true))
              .map((m) => (
                <div key={m.id} className="rounded border p-4 hover:bg-gray-50 dark:hover:bg-zinc-900">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{m.name}</div>
                    <div className="flex gap-1 flex-wrap">
                      {(m.tags || ["LLM"]).slice(0, 3).map((t) => <Tag key={t}>{t}</Tag>)}
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-gray-500 break-all"><code>{m.id}</code></div>
                  {m.description && <div className="mt-2 text-sm line-clamp-2 text-gray-600 dark:text-gray-300">{m.description}</div>}
                  <div className="mt-3 text-xs text-gray-500">★ {m.stars ?? 0} · ⬇︎ {m.downloads ?? 0}</div>
                  <div className="mt-3 text-sm"><a className="underline" href={`/models/${encodeURIComponent(m.id)}`}>Details →</a></div>
                </div>
              ))}
          </div>
        )}
      </Card>
    </div>
  );
}


