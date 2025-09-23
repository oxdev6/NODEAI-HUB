NodeAI Agents Hub
==================

NodeAI Agents Hub is a NodeOps‑native platform for decentralized AI/ML model hosting and autonomous agent deployment. It enables developers to upload and serve models on NodeOps Cloud, deploy AI agents that call these models, and trigger/settle actions on‑chain via NodeOps RPCs and Validator Services.

Quick links
-----------

- Proposal: see `docs/proposal.md`
- Architecture: see `docs/architecture.md`

Getting started
---------------

This repo will evolve into a mono‑workspace containing:

- Control Plane API (Node/TypeScript)
- Agent Runtime (Python)
- Terraform IaC for NodeOps Cloud
- Kubernetes manifests for model serving and agents
- Solidity contract(s) for usage receipts
- CLI (Node) and SDKs

For the end‑to‑end plan, goals, and timelines, refer to the proposal document in `docs/proposal.md`.

Status
------

- Docs scaffolded. Next steps: add Terraform IaC skeleton, Control Plane API, Agent Runtime, and K8s manifests.


