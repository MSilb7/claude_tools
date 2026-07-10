# ADR 0001 — Maintain technical design as a portable third pillar

- **Status:** Accepted
- **Date:** 2026-07-09
- **Decision owners:** AI Tools maintainers

## Context

The compounding system already maintains an improvement queue and a product PRD. Neither is the
right home for component boundaries, data ownership, interfaces, trust boundaries, runtime topology,
operations, or testing strategy. Repeating those details in the PRD would mix product and
implementation altitudes; embedding the workflow only in a Claude command would make the new source
of truth unavailable to other agents.

Technical documentation also has an unusually high staleness risk. Exact schemas, API shapes, and
runtime inventories change frequently and already have authoritative executable, generated, or live
sources. A useful technical document must map those sources without copying them.

## Decision

Create `skills/maintain-technical-design/` as the canonical cross-agent workflow. Its install-if-
absent asset seeds `docs/technical/TECHNICAL_DESIGN.md`, a concise implementation index that links to
the PRD, decision records, topic documentation, and exact sources of truth.

Integrate the asset into the versioned legacy compounding setup and upgrade adapter without copying
the asset into `commands/compounding-templates/`. Setup and upgrade may create the canonical index
only when it is absent and must preserve all filled-in or pre-existing technical documentation. A
short agent-instruction snippet points to the portable skill; it does not duplicate the workflow.

Treat the three living pillars as distinct:

1. `docs/compounding/` owns the improvement queue.
2. `docs/product/PRD.md` owns product intent and behavior.
3. `docs/technical/TECHNICAL_DESIGN.md` owns the maintained implementation map.

Decision records preserve architectural rationale. Code, migrations, schemas, generated
specifications, tests, and runtime inspection remain authoritative for exact details.

## Consequences

- Claude-specific compounding setup remains a compatibility adapter while Claude Code and Codex can
  discover the same portable skill through the shared installer.
- The compounding template version advances to v6 so downstream upgrades receive the new pointer and
  third-pillar setup behavior.
- Existing repositories can adopt the index without losing architecture or decision documentation.
- Reconciliation can flag product/technical, decision/implementation, and documentation/code drift
  explicitly, while meaning-bearing architecture changes still require operator approval.
- The technical index and linked topic documents remain on-demand context. Curation may compress or
  deduplicate them but must not force the full tree into every session.
- New compounding installations use `AGENTS.md` as the shared instruction surface and keep provider files
  as thin adapters. The shared rules make confirmed product decisions durable before implementation, route
  every loose end into durable state, and promote repeated procedures into local or canonical skills.

## Alternatives considered

- **Add another canonical Claude command.** Rejected because workflow logic would remain provider-
  specific and compete with the repository's portable-skill direction.
- **Expand PRD reconciliation to cover architecture.** Rejected because it would collapse product and
  implementation altitudes into one document and one workflow.
- **Copy the technical template into the legacy template pack.** Rejected because two canonical
  assets would drift. The adapter resolves the portable skill asset directly instead.
