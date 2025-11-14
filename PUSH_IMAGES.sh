#!/bin/bash

set -e

echo "🚀 Publishing NodeAI Agents Hub Docker Images to GitHub Container Registry"
echo ""

# Check if authenticated
if ! docker info | grep -q "Username"; then
  echo "❌ Not authenticated to GitHub Container Registry"
  echo ""
  echo "To authenticate, run one of:"
  echo ""
  echo "Option 1: Using GitHub CLI"
  echo "  gh auth login"
  echo "  echo \$GH_TOKEN | docker login ghcr.io -u oxdev6 --password-stdin"
  echo ""
  echo "Option 2: Using Personal Access Token"
  echo "  echo \$GITHUB_TOKEN | docker login ghcr.io -u oxdev6 --password-stdin"
  echo ""
  echo "Option 3: Manual login"
  echo "  docker login ghcr.io"
  echo ""
  exit 1
fi

echo "✅ Authenticated to GitHub Container Registry"
echo ""

# Push Control Plane
echo "📤 Pushing Control Plane..."
docker push ghcr.io/oxdev6/nodeai-control-plane:amd64-latest
echo "✅ Control Plane pushed"
echo ""

# Push Agent Runtime
echo "📤 Pushing Agent Runtime..."
docker push ghcr.io/oxdev6/nodeai-agent-runtime:amd64-latest
echo "✅ Agent Runtime pushed"
echo ""

# Push Portal
echo "📤 Pushing Portal..."
docker push ghcr.io/oxdev6/nodeai-portal:amd64-latest
echo "✅ Portal pushed"
echo ""

echo "🎉 All images published successfully!"
echo ""
echo "🌐 View your packages at:"
echo "   https://github.com/oxdev6?tab=packages"
echo ""

