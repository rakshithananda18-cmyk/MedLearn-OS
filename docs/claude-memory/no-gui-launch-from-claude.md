---
name: no-gui-launch-from-claude
description: "On this Windows machine, never start Docker Desktop (or other long-running desktop apps) directly from Claude's tools — the Claude app's MSIX sandbox virtualizes their AppData and breaks them"
metadata:
  node_type: memory
  type: feedback
  originSessionId: 11ca84d6-430e-4f70-a405-87003df571ac
  modified: 2026-09-25T18:01:40.893Z
---

Processes started from Claude's shell tools inherit the Claude desktop app's MSIX package context. Docker Desktop launched that way wrote its AF_UNIX sockets into `%LOCALAPPDATA%\Packages\Claude_pzs8sxrjxfjjc\LocalCache\...`; those files then could not be renamed or deleted ("The file cannot be accessed by the system"), and every later Docker start crashed (sailor-ingest.sock / docker-secrets-engine engine.sock errors). It cost a Windows restart on 2026-09-25.

**Why:** MSIX file virtualization redirects AppData writes of child processes; Docker's socket handling fails on the redirected files.
**How to apply:** Ask the user to start Docker Desktop from the Start menu, or launch via `explorer.exe "<path>"` so the Windows shell owns the process (scripts/lib/docker.mjs does this). Using the docker/supabase CLIs from Claude is fine (named pipe, project on D:). Stale real sockets can be removed from WSL (`wsl -d Ubuntu-22.04 -e rm -f /mnt/c/...`). Related: [[medlearn-os-project]]
