# NotefullBook OS

A GitHub-ready research repository for:

> **NotefullBook OS: A Technical Whitepaper on a Personal AI Thought Engine Built on the Forgetting Core Thinking (FCT) Framework**

This repo is structured for **practical use**:

- `/docs` – human-readable whitepaper in Markdown, plus architecture notes.
- `/latex` – academic-style LaTeX version (conference/journal-ready header).
- `/figures` – placeholder directory for diagrams and system charts.
- `/.github/workflows` – optional CI to compile the LaTeX paper into PDF.

You can:

- Publish the Markdown version directly on GitHub.
- Use the LaTeX version for conference or journal submission.
- Extend `/docs` with additional modules (safety, economics, OS design, API specs).

---

## Repository Structure

```text
notefullbook-os/
├─ README.md
├─ docs/
│  ├─ whitepaper.md
│  └─ architecture-notes.md
├─ latex/
│  ├─ main.tex
│  └─ sections/
│     ├─ intro.tex
│     ├─ fct.tex
│     ├─ architecture.tex
│     ├─ safety.tex
│     └─ conclusion.tex
├─ figures/
│  ├─ clb-loop.pdf        # Cognitive Lighting Backend loop (placeholder)
│  ├─ fct-stack.pdf       # FCT cognitive stack
│  └─ os-architecture.pdf # High-level OS diagram
└─ .github/
   └─ workflows/
      └─ latex.yml
```

---

## How to use

- Edit `docs/whitepaper.md` as the **source of truth** for the narrative.
- Keep LaTeX sections in sync when you prepare an academic submission.
- Add real diagrams into `figures/` and reference them from LaTeX.

The repo is intentionally minimal, so you can plug it into any wider ecosystem (AIXSELF / NotefullBook / safety research) without refactoring.
