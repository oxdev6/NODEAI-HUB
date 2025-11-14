#!/bin/bash

set -e

echo "🐳 Starting NodeAI Agents Hub with Docker Compose..."

# Build and start all services
docker-compose up --build -d

echo ""
echo "✅ NodeAI Agents Hub is running!"
echo ""
echo "🌐 Services:"
echo "   - Control Plane API: http://localhost:3000"
echo "   - Web Portal:        http://localhost:3003"
echo ""
echo "📊 Check status: docker-compose ps"
echo "📝 View logs:    docker-compose logs -f"
echo "🛑 Stop:         docker-compose down"
echo ""

