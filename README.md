# NotefullBook OS

NotefullBook OS is a **Personal AI Thought Engine** built on the **Forgetting Core Thinking (FCT)** framework.

This repo is a *developer-ready reference implementation* of the core ideas:

- Memory as **reconstruction and relocation**, not archival replay.
- Safety by **architectural forgetting**, not just external policy.
- Learning from **behavioral frequency** (what you return to), not content.
- Cognitive loop: **Lighting → Observation → Forgetting → Simplification → Re‑activation**.

## Structure

- `src/fct/` — FCT core types and reasoning utilities.
- `src/notebookml/` — NotebookML minimal interpreter and runtime hooks.
- `src/engines/`
  - `clb.ts`  — Cognitive Lighting Backend
  - `sinlm.ts` — Schema Intelligence Network Learning Mechanism
  - `cse.ts`  — Cognitive Simplification Engine
  - `afa.ts`  — Active Forgetting Artifact module
- `src/os/`
  - `behaviorLog.ts` — privacy‑centric behavioral logging layer
  - `cognitiveLoop.ts` — closed‑loop orchestration of CLB, SINLM, CSE, AFA
  - `index.ts` — NotefullBookOS façade
- `docs/`
  - `whitepaper.md` — full NotefullBook OS whitepaper text
  - `architecture.md` — high‑level architecture and sequence diagrams (text description)
- `examples/`
  - `demoNotebook.ts` — minimal CLI demo of the cognitive loop

This is **TypeScript‑first**, framework‑agnostic. You can:
- plug it into a Node backend,
- wrap it in a desktop app,
- or bind it to any UI (web / mobile) as the cognitive engine behind a NotefullBook client.

## Quick Start

```bash
npm install
npm run build
node dist/examples/demoNotebook.js
```

This will run a small demo that:

1. Creates a notebook.
2. Logs behavioral events (frequency, return‑rate, drift).
3. Lets the engines compute a *schema survival* view.
4. Applies active forgetting + simplification.
5. Prints out the simplified “surviving schemas”.

The implementation is intentionally simple and transparent — the goal is clarity of **safety + memory logic**, not ML sophistication.
