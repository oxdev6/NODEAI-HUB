# Publishing Docker Images to GitHub Container Registry

**Date:** October 28, 2025  
**Repository:** https://github.com/oxdev6/NODEAI-HUB

---

## 📦 Images Ready to Publish

All images have been tagged for GitHub Container Registry:

```bash
ghcr.io/oxdev6/nodeai-control-plane:amd64-latest  (147 MB)
ghcr.io/oxdev6/nodeai-agent-runtime:amd64-latest   (169 MB)
ghcr.io/oxdev6/nodeai-portal:amd64-latest         (154 MB)
```

---

## 🚀 How to Publish

### **Step 1: Login to GitHub Container Registry**

```bash
# You can use a Personal Access Token (PAT) with 'write:packages' permission
echo $GITHUB_TOKEN | docker login ghcr.io -u oxdev6 --password-stdin
```

Or use GitHub CLI:

```bash
gh auth login
echo $GH_TOKEN | docker login ghcr.io -u oxdev6 --password-stdin
```

### **Step 2: Push Images**

```bash
# Push Control Plane
docker push ghcr.io/oxdev6/nodeai-control-plane:amd64-latest

# Push Agent Runtime
docker push ghcr.io/oxdev6/nodeai-agent-runtime:amd64-latest

# Push Portal
docker push ghcr.io/oxdev6/nodeai-portal:amd64-latest
```

### **Step 3: Verify**

Visit: https://github.com/oxdev6?tab=packages

---

## 🔑 Alternative: Using Docker Compose

If you prefer, you can also push all at once:

```bash
# Build and push all services
docker-compose push
```

---

## 🌐 Image URLs (After Publishing)

After publishing, your images will be available at:

- **Control Plane:**
  - `ghcr.io/oxdev6/nodeai-control-plane:amd64-latest`
  - `https://github.com/oxdev6/NODEAI-HUB/pkgs/container/nodeai-control-plane`

- **Agent Runtime:**
  - `ghcr.io/oxdev6/nodeai-agent-runtime:amd64-latest`
  - `https://github.com/oxdev6/NODEAI-HUB/pkgs/container/nodeai-agent-runtime`

- **Portal:**
  - `ghcr.io/oxdev6/nodeai-portal:amd64-latest`
  - `https://github.com/oxdev6/NODEAI-HUB/pkgs/container/nodeai-portal`

---

## 📝 Using Published Images

### **Pull Images:**

```bash
docker pull ghcr.io/oxdev6/nodeai-control-plane:amd64-latest
docker pull ghcr.io/oxdev6/nodeai-agent-runtime:amd64-latest
docker pull ghcr.io/oxdev6/nodeai-portal:amd64-latest
```

### **Run with Docker Compose:**

Update `docker-compose.yml` to use published images:

```yaml
services:
  control-plane:
    image: ghcr.io/oxdev6/nodeai-control-plane:amd64-latest
    # ... rest of config
    
  agent-runtime:
    image: ghcr.io/oxdev6/nodeai-agent-runtime:amd64-latest
    # ... rest of config
    
  portal:
    image: ghcr.io/oxdev6/nodeai-portal:amd64-latest
    # ... rest of config
```

---

## ✅ Next Steps

1. **Authenticate** with GitHub Container Registry
2. **Push** the images using the commands above
3. **Update** your deployment configs to use the published images
4. **Deploy** to NodeOps Cloud or your Kubernetes cluster

**Images are ready and waiting to be published!** 🚀

