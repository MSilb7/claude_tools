# ADR 0002: Portable repository lifecycle skills

- **Status:** Accepted
- **Date:** 2026-07-09

## Context

The compounding system evolved first as Claude commands, while mature repositories accumulated
useful local workflows for catch-up, learning capture, PRD reconciliation, and end-of-session review.
That made the best lifecycle behavior dependent on one client or one repository and allowed Claude
and Codex sessions to receive different operating rules.

AI Tools already installs Agent Skills into both clients and treats `AGENTS.md` as the canonical
cross-agent instruction surface. The repository lifecycle should use the same boundary.

## Decision

Maintain the shared lifecycle as canonical portable skills:

- `compounding`
- `compounding-drain`
- `compounding-curate`
- `prd-reconcile`
- `maintain-technical-design`
- `catch-up`
- `capture-learning`
- `end-session-review`

Keep provider command files as thin compatibility wrappers only. Keep scheduling, connector
attachment, permissions, and client-specific UI operations in provider adapters. New repository
setups place shared standing rules in `AGENTS.md`; provider instruction files import or point to it.

The v6 template pack remains temporarily as compatibility infrastructure for repositories that
already installed stamped command copies. New workflow behavior is changed in the portable skills,
not independently in those copies.

## Consequences

- Claude and Codex receive the same lifecycle behavior through one installed skill set.
- Mature repository workflows can be generalized once instead of copied between projects.
- Existing command invocations remain usable during migration.
- Consumer repositories still need selective reconciliation; this decision does not mass-rewrite
  their history or remove provider-specific capabilities.
- A later versioned migration may relocate or retire compatibility assets after installed
  repositories no longer depend on them.
