#!/usr/bin/env bash
# Starts backend and frontend in background (Unix/macOS)
# Usage: ./scripts/run-dev.sh
set -e
REPO_ROOT=$(cd "$(dirname "$0")/.." && pwd)

# Start backend
(cd "$REPO_ROOT" && ./gradlew bootRun > "$REPO_ROOT/logs/backend.log" 2>&1 &)
# Start frontend
(cd "$REPO_ROOT/web" && pnpm install && pnpm run dev > "$REPO_ROOT/logs/frontend.log" 2>&1 &)

echo "Backend and frontend started (logs: $REPO_ROOT/logs)"
