import { Router } from "express";
import { validateBody } from "../middleware/validate.js";
import { z } from "zod";
import client from "prom-client";

const registry = new client.Registry();
client.collectDefaultMetrics({ register: registry });

type Model = {
  id: string;
  name: string;
  description: string;
  tags: string[];
  stars: number;
  downloads: number;
};
type Agent = { id: string; name: string; tools: string[] };
const models: Record<string, Model> = {};
const modelReadmes: Record<string, string> = {};
const agents: Record<string, Agent> = {};

const createModelSchema = z.object({
  name: z.string().min(1),
  description: z.string().default(""),
  tags: z.array(z.string()).default([]),
  readme: z.string().default("")
});
const createAgentSchema = z.object({ name: z.string().min(1), tools: z.array(z.string()).default(["rpc"]) });

// Custom metrics and simple state for summary
const httpRequestsTotal = new client.Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests",
  labelNames: ["route", "method", "status"],
});
const httpRequestDurationSeconds = new client.Histogram({
  name: "http_request_duration_seconds",
  help: "Duration of HTTP requests in seconds",
  labelNames: ["route", "method", "status"],
  buckets: [0.05, 0.1, 0.25, 0.5, 1, 2, 5],
});
const modelsCreatedTotal = new client.Counter({ name: "models_created_total", help: "Models created" });
const agentsCreatedTotal = new client.Counter({ name: "agents_created_total", help: "Agents created" });

registry.registerMetric(httpRequestsTotal);
registry.registerMetric(httpRequestDurationSeconds);
registry.registerMetric(modelsCreatedTotal);
registry.registerMetric(agentsCreatedTotal);

const summaryState = {
  requests: 0,
  modelsCreated: 0,
  agentsCreated: 0,
};

export const router = Router();

// Basic instrumentation for every request handled by this router
router.use((req, res, next) => {
  const start = process.hrtime.bigint();
  res.on("finish", () => {
    const end = process.hrtime.bigint();
    const sec = Number(end - start) / 1e9;
    const labels = { route: req.path, method: req.method, status: String(res.statusCode) } as const;
    const isMetrics = req.path.startsWith("/metrics") || req.path === "/health";
    if (!isMetrics) {
      httpRequestsTotal.inc(labels as any, 1);
      httpRequestDurationSeconds.observe(labels as any, sec);
      summaryState.requests += 1;
    }
  });
  next();
});

router.get("/health", (_req, res) => res.json({ ok: true }));
router.get("/metrics", async (_req, res) => {
  res.set("Content-Type", registry.contentType);
  res.end(await registry.metrics());
});

router.get("/metrics-summary", (_req, res) => {
  const mem = process.memoryUsage();
  res.json({
    requests: summaryState.requests,
    modelsCreated: summaryState.modelsCreated,
    agentsCreated: summaryState.agentsCreated,
    uptimeSec: process.uptime(),
    memoryRss: mem.rss,
    memoryHeapUsed: mem.heapUsed,
  });
});

router.post("/models", validateBody(createModelSchema), (req, res) => {
  const id = `model_${Date.now()}`;
  const item: Model = {
    id,
    name: req.body.name,
    description: req.body.description || "",
    tags: req.body.tags || [],
    stars: 0,
    downloads: 0,
  };
  models[id] = item;
  modelReadmes[id] = req.body.readme || `# ${item.name}\n\nModel created.`;
  modelsCreatedTotal.inc();
  summaryState.modelsCreated += 1;
  res.status(201).json(item);
});

router.get("/models", (_req, res) => res.json({ items: Object.values(models) }));
router.get("/models/:id", (req, res) => {
  const item = models[req.params.id];
  if (!item) return res.status(404).json({ error: "model not found" });
  res.json(item);
});
router.get("/models/:id/readme", (req, res) => {
  const readme = modelReadmes[req.params.id];
  if (readme === undefined) return res.status(404).json({ error: "model not found" });
  res.type("text/markdown").send(readme);
});
router.post("/models/:id/star", (req, res) => {
  const item = models[req.params.id];
  if (!item) return res.status(404).json({ error: "model not found" });
  item.stars += 1;
  res.json({ stars: item.stars });
});
router.get("/agents", (_req, res) => res.json({ items: Object.values(agents) }));

router.post("/inference/:modelId", (req, res) => {
  const { modelId } = req.params;
  const model = models[modelId];
  if (!model) return res.status(404).json({ error: "model not found" });
  model.downloads += 1;
  res.json({ modelId, output: `inference from ${model.name}` });
});

router.post("/agents", validateBody(createAgentSchema), (req, res) => {
  const id = `agent_${Date.now()}`;
  const item: Agent = { id, name: req.body.name, tools: req.body.tools };
  agents[id] = item;
  agentsCreatedTotal.inc();
  summaryState.agentsCreated += 1;
  res.status(201).json(item);
});

router.post("/agents/:id/execute", (req, res) => {
  const { id } = req.params;
  const agent = agents[id];
  if (!agent) return res.status(404).json({ error: "agent not found" });
  res.json({ jobId: `job_${Date.now()}`, agentId: id, status: "queued" });
});


