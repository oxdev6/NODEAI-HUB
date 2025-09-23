#!/usr/bin/env node
import { Command } from "commander";
import axios from "axios";

const program = new Command();

program
  .name("nodeai")
  .description("NodeAI CLI")
  .version("0.1.0");

program
  .command("login")
  .description("Authenticate (stub)")
  .action(async () => {
    console.log("Logged in (stub)");
  });

const models = program.command("models").description("Manage models");
models
  .command("deploy <path>")
  .option("--gpu <gpu>", "Number of GPUs", "1")
  .option("--replicas <n>", "Replica count", "1")
  .description("Register a model (control-plane will deploy per project policy)")
  .action(async (path: string, opts: any) => {
    const base = process.env.NODEAI_API || "http://localhost:3000";
    await axios.post(`${base}/v1/models`, { name: path.split("/").pop() || "model" });
    console.log(`Model registered from ${path} (gpu=${opts.gpu}, replicas=${opts.replicas})`);
  });

const agents = program.command("agents").description("Manage agents");
agents
  .command("create <name>")
  .option("--tools <tools>", "Comma-separated tools", "rpc")
  .option("--budget <budget>", "Budget", "50")
  .description("Create an agent with selected tools")
  .action(async (name: string, opts: any) => {
    const base = process.env.NODEAI_API || "http://localhost:3000";
    const tools = String(opts.tools).split(",").map((s: string) => s.trim()).filter(Boolean);
    const resp = await axios.post(`${base}/v1/agents`, { name, tools });
    console.log(resp.data);
  });

agents
  .command("run <id>")
  .option("--input <text>", "Input text", "Hello")
  .description("Run an agent by id")
  .action(async (id: string, opts: any) => {
    const base = process.env.NODEAI_API || "http://localhost:3000";
    const resp = await axios.post(`${base}/v1/agents/${encodeURIComponent(id)}/execute`, { input: opts.input });
    console.log(resp.data);
  });

program
  .command("logs")
  .option("-f, --follow", "Follow logs")
  .option("--component <c>", "Component", "agents")
  .action(async (opts: any) => {
    console.log(`Streaming logs for component=${opts.component} (stub)`);
  });

program.parseAsync(process.argv);


