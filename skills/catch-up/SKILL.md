---
name: catch-up
description: Reorient to a repository from its maintained product, technical, operational, git, review, and compounding sources without changing state. Use at the start of a session, after returning to a project, when inheriting work from another agent, or when asked what is built, in flight, next, or blocked.
---

# Catch Up

Build a concise, evidence-backed current-state briefing. This workflow is read-only.

## 1. Read governing context

Start with shared repository instructions and any relevant provider adapter. Read the living PRD,
technical-design index, current-state or build log, and active roadmap when they exist. Follow links
only as needed to answer the current question.

## 2. Inspect present work

Check repository status, current branch, recent meaningful commits, open reviews, and compounding
status. Identify uncommitted changes without assuming ownership. Note stale or conflicting claims
between documentation and git evidence.

When the repository exposes a safe read-only source of authoritative runtime state and the current
question depends on it, inspect that source using the repository's documented command. Never infer
live state from prose when a maintained source is available.

## 3. Summarize at decision altitude

Report:

- **Built** — durable capabilities verified in the default branch or authoritative runtime;
- **In flight** — active branches, reviews, migrations, or operator actions;
- **Next** — the highest-priority product or compounding work supported by maintained sources;
- **Watch-outs** — drift, data gaps, validation failures, stale claims, and missing decisions.

Distinguish fact, inference, and unresolved question. Cite local paths, review identifiers, commands,
or commits where useful. Do not edit files, update status, pull branches, or start implementation
unless the user separately asks.
