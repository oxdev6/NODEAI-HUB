# NodeOps Marketplace Template Overview

---

## Template Overview (200-500 words)

**NodeAI Agents Hub** is a production-ready, decentralized AI/ML model hosting and autonomous agent deployment platform designed exclusively for NodeOps infrastructure. The platform enables seamless deployment and management of large language models (LLMs) with enterprise-grade capabilities including GPU-accelerated inference, automatic horizontal scaling, and integrated autonomous agent orchestration.

### Purpose

The platform addresses the growing need for accessible, scalable AI infrastructure by providing a complete solution for hosting AI models and deploying autonomous agents in a decentralized environment. Built on NodeOps cloud infrastructure, it combines GPU/CPU inference capabilities with Kubernetes orchestration to deliver high-performance, cost-effective AI model serving at scale.

### Key Features

**Control Plane API** serves as the central nervous system of the platform. Built with Node.js and Express.js, it provides comprehensive REST APIs for model and agent management, real-time health monitoring, and Prometheus metrics integration. The API includes automatic scaling policies, quota management, and billing integration support for on-chain and traditional payments.

**Agent Runtime** enables autonomous agent deployment with LangChain/LlamaIndex compatibility. The Python-based worker pool supports tooling adapters for blockchain RPC calls, IPFS/S3 storage integration, and a flexible policy engine for custom agent behaviors. Agents can interact with smart contracts, fetch data from IPFS, and execute complex autonomous workflows.

**Modern Web Portal** offers an intuitive dashboard built with Next.js and React. The interface features dark/light theme support, searchable model and agent catalogs, real-time metrics visualization, and detailed model pages with usage examples. Inspired by Hugging Face Hub's user experience, the portal provides a professional, accessible interface for developers and researchers.

The platform is fully containerized with Docker Compose for one-command deployment, built for AMD64 architecture, and includes comprehensive observability with Prometheus, Loki, and Tempo for metrics, logs, and traces.

### Benefits

Organizations can deploy production-grade AI infrastructure in minutes without the complexity of managing Kubernetes clusters from scratch. The autoscaling capabilities ensure cost optimization by scaling resources based on demand. Developers benefit from seamless integration with popular AI frameworks (LangChain, LlamaIndex), while researchers can easily share and discover AI models through the built-in marketplace features. The platform's decentralized architecture provides enhanced reliability and eliminates single points of failure typical in centralized AI hosting solutions.

---

## Requirements

### Prerequisites

1. **NodeOps Account** - Active NodeOps Cloud subscription with GPU/CPU compute access
2. **Docker Environment** - Docker Desktop or compatible container runtime
3. **Network Access** - Internet connectivity for pulling container images and dependencies
4. **Compute Resources** (Recommended):
   - Control Plane: 1 CPU core, 2GB RAM minimum
   - Agent Runtime: 1 CPU core, 1GB RAM per agent
   - Portal: 1 CPU core, 2GB RAM minimum
   - For production: GPU nodes recommended for model inference
5. **Disk Space**: 5GB minimum for container images and model storage
6. **Environment Variables**: 
   - `NODEAI_API_URL` (if deploying separately)
   - NodeOps API credentials (for Terraform deployment)

### Optional Dependencies

- **IPFS Node** - For decentralized storage (can be hosted separately)
- **Blockchain RPC Endpoints** - For agent interactions with smart contracts
- **Hugging Face Token** - For private model access
- **AWS/GCS Credentials** - For S3-compatible object storage

### Supported Platforms

- **Architecture**: AMD64 (x86_64)
- **Operating Systems**: Linux, macOS (with Docker), Windows (with WSL2)
- **NodeOps Cloud Regions**: All supported regions

---

## Limitations

### Known Issues and Constraints

1. **Architecture Support**: Currently optimized for AMD64 architecture only. ARM64 support is planned for future releases.

2. **Model Formats**: Models must be compatible with vLLM, TensorRT, or ONNXRuntime frameworks. Custom model architectures may require additional configuration.

3. **Scaling Limits**: Default autoscaling configuration supports up to 10 pods per deployment. Production deployments requiring higher concurrency should adjust HPA parameters manually.

4. **Agent Memory**: Agent runtime has a default memory limit of 1GB per worker. Long-running agents or large prompt processing may require increased resource allocation.

5. **Storage**: In-memory agent state does not persist across container restarts. Production agents requiring persistence should implement external state storage (database or object storage).

6. **Metrics Retention**: Prometheus metrics are retained for 7 days by default. Extended retention requires external Prometheus setup.

7. **Authentication**: Current release uses basic API key authentication. OAuth2 and JWT token-based auth are planned for future releases.

8. **Model Marketplace**: The current model registry is in-memory. Production deployments should migrate to external database (PostgreSQL/MongoDB) for persistence.

9. **Billing Integration**: On-chain billing receipts are supported (ERC-20/721), but Stripe integration requires additional configuration and API keys.

10. **GPU Availability**: GPU-based inference requires NodeOps Cloud GPU nodes. CPU-only inference is available but with reduced performance for large models.

### Development Status

This is a production-ready template with core features implemented. Some advanced features (multi-region deployment, advanced observability dashboards, model versioning) are marked for future enhancement.

### Performance Notes

- Expected latency for model inference: 100-500ms (depends on model size and GPU availability)
- Control Plane API response time: <50ms for most endpoints
- Portal first load: ~1.5 seconds (optimized build)
- Maximum concurrent agent workers: 50 per deployment (configurable)

---

**Template Type**: AI/ML Infrastructure  
**Category**: AI/ML Model Hosting  
**Difficulty**: Intermediate  
**Estimated Setup Time**: 15-30 minutes  
**Maintainer**: oxdev6

