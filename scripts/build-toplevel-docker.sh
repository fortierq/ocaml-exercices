#!/bin/bash
# Build OCaml toplevel using Docker
# This avoids needing to install opam/OCaml locally

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
OUTPUT_DIR="$PROJECT_DIR/public/ocaml-toplevel"

echo "🐫 Building OCaml Toplevel using Docker..."

# Check if Docker is available
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Build the Docker image
echo "🔨 Building Docker image (this may take a few minutes on first run)..."
docker build -t ocaml-toplevel-builder -f "$PROJECT_DIR/docker/Dockerfile.toplevel" "$PROJECT_DIR/docker"

# Create output directory
mkdir -p "$OUTPUT_DIR"

# Extract the built files from the container
echo "📦 Extracting built files..."
CONTAINER_ID=$(docker create ocaml-toplevel-builder)
docker cp "$CONTAINER_ID:/home/opam/output/toplevel.js" "$OUTPUT_DIR/"
docker cp "$CONTAINER_ID:/home/opam/output/stdlib" "$OUTPUT_DIR/" 2>/dev/null || true
docker rm "$CONTAINER_ID" > /dev/null

echo ""
echo "✅ Build complete!"
echo "   Output: $OUTPUT_DIR/toplevel.js"
ls -lh "$OUTPUT_DIR/toplevel.js"

echo ""
echo "🚀 The toplevel will be automatically loaded when you run 'npm run dev'"
