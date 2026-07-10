---
name: compounding-curate
description: Keep always-loaded repository guidance concise, current, and non-duplicative while preserving durable product, technical, operational, and historical knowledge in the right homes. Use during weekly hygiene, after agent configuration grows stale, when multiple instruction files repeat the same rules, or when a repository needs context curation without changing product meaning.
---

# Compounding Curate

Reduce context entropy without discarding durable knowledge. Shared agent instructions should route
work; they should not become a second PRD, architecture document, runbook, or build log.

## 1. Inventory context surfaces

Read the canonical shared instruction file, provider adapters, repository-local skills, PRD,
technical-design index, decision records, current-state logs, runbooks, and compounding queue. Note
which files are always loaded and which are retrieved only when relevant.

## 2. Classify each standing instruction

Assign each material block one home:

- stable cross-agent rule → shared agent instructions;
- provider-only discovery, permission, model, connector, or schedule behavior → provider adapter;
- product intent or user-facing outcome → PRD;
- current implementation map → technical design;
- architectural rationale → decision record;
- operational procedure → runbook or repository-local skill;
- repeatable cross-repository procedure → canonical AI Tools skill;
- current state or chronology → build log or current-state document;
- actionable unresolved gap → compounding queue.

Keep one concise pointer from always-loaded context to each deeper source. Do not retain a full copy
beside the source.

## 3. Propose meaningful changes

Separate safe maintenance from meaning changes. Safe work includes duplicate removal, repaired
pointers, stale status cleanup, and moving detailed procedure behind an existing skill. Product,
architecture, security, ownership, or workflow-policy changes require explicit review.

Never delete a rule merely because it is old. Verify whether it is obsolete, superseded, or still
protecting an invariant. Preserve history in the source designed to hold history.

## 4. Apply and verify

When authorized, make the smallest coherent edit. Preserve provider-specific capabilities while
collapsing shared prose to the canonical source. Update affected docs and queue items in the same
change.

Validate instruction imports and skill links, run relevant repository checks, and compare before and
after for lost constraints. Report what moved, what remained always-on, and what still needs a
meaning decision.
