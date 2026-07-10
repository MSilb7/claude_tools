---
name: maintain-technical-design
description: Create or reconcile a repository's maintained technical-design index against product intent, architecture decisions, code, schemas, generated specifications, tests, infrastructure, and runtime evidence. Use when bootstrapping docs/technical/TECHNICAL_DESIGN.md, documenting an existing system, reviewing architecture drift, updating technical documentation after changes to component boundaries, data ownership, interfaces, trust boundaries, runtime topology, operations, or testing strategy, or checking whether technical documentation still matches repository reality.
---

# Maintain Technical Design

Keep one concise implementation map at `docs/technical/TECHNICAL_DESIGN.md`. Let the PRD own what
the product does and why, decision records own historical rationale, and executable or generated
artifacts own exact details. Link those sources; do not copy them into a second encyclopedia.

## 1. Choose the mode

- If the canonical index is absent, create it from
  `assets/TECHNICAL_DESIGN-template.md` after inventorying existing technical documentation.
- If it exists, reconcile it from its last meaningful change by default.
- If the request accompanies a code change, inspect the full change and update affected technical
  sections in the same branch or pull request.

Do not overwrite or discard existing architecture, operations, security, data, or decision
documentation. Make the canonical index point to useful topic documents; consolidate only after
proposing the move.

## 2. Establish the truth hierarchy

Read repository instructions, then inspect only the sources relevant to the request:

1. `docs/product/PRD.md` for product intent, capabilities, stories, principles, and roadmap IDs.
2. `docs/technical/TECHNICAL_DESIGN.md` and linked topic documents for the maintained system map.
3. `docs/decisions/` or equivalent for active architectural decisions and historical rationale.
4. Code, migrations, schemas, generated API specifications, tests, deployment configuration, and
   runtime inspection commands for exact current behavior.
5. Recent merged changes, changelogs, and open compounding items since the document's last change.

Treat executable and generated sources as authoritative for exact fields, endpoints, versions, and
live state. Record stable responsibilities, ownership, boundaries, and flows in the technical index.

## 3. Build the evidence map

Map each material technical area to its owning source and relevant PRD or decision IDs:

- components and responsibilities;
- data ownership, persistence boundaries, and exact-schema pointers;
- internal and external interfaces, with generated-spec pointers;
- important end-to-end and failure flows;
- identity, secrets, permissions, trust boundaries, and threat assumptions;
- build, deployment, runtime topology, observability, recovery, and operator commands;
- test layers, contract checks, migration checks, and known coverage gaps.

Use linked topic documents when a section would otherwise become detailed enough to obscure the
index. Do not load or rewrite every linked document unless evidence shows it is affected.

## 4. Classify divergences

Assign each supported divergence exactly one primary tag:

- `TECH-DOC-STALE` — implementation changed while the technical description or pointer did not.
- `IMPLEMENTATION-DRIFT` — reality contradicts a still-valid technical design.
- `NEW-UNCAPTURED` — a component, interface, data owner, flow, or trust boundary lacks a map entry.
- `DECISION-DRIFT` — active architecture no longer matches its governing decision record.
- `PRD-TECH-MISMATCH` — product intent and the technical design no longer trace or agree.
- `STATUS-MOVE` — a planned element was implemented, replaced, deprecated, or retired.

For each item, cite repository evidence and state which source should change. Do not resolve a
contradiction by silently treating whichever file changed most recently as correct.

## 5. Propose before meaning changes

Present a compact table: area, evidence, classification, proposed change, approval level.

- Batch factual pointer repairs, verified status moves, and descriptions of already-merged reality
  when they do not redefine an architectural promise.
- Require operator approval before changing component boundaries, data ownership, interface
  contracts, security assumptions, architectural principles, or the active meaning of a decision.
- Propose a new decision record when a significant choice lacks durable rationale. Point the
  technical index to the decision; do not duplicate its argument.
- Route unresolved or larger work into the compounding queue with evidence and acceptance criteria.

When the request authorizes implementation and no meaning-bearing decision is open, apply the safe
set. Otherwise stop after the proposal and ask one focused question about the blocking decision.

## 6. Apply and verify

- Preserve filled-in technical documentation during setup and upgrades. Install the asset only when
  the canonical index is absent.
- Keep the index scannable. Prefer stable prose, tables, paths, identifiers, and runnable inspection
  commands over snapshots of volatile values. Treat roughly 100–250 lines as a soft index budget,
  not a quota; split a detailed topic when exceeding it would obscure the system map.
- Add a concise pointer to the repository's shared agent instructions when appropriate; keep the
  reconciliation procedure in this skill instead of in always-loaded context.
- Update the technical index in the same change whenever code alters a documented boundary,
  ownership rule, interface, security assumption, runtime behavior, or operational contract.
- Run relevant documentation links, generated-spec, schema, test, and repository checks.
- Review the final diff for copied executable detail, conflicting sources of truth, stale links,
  unsupported claims, and unrelated changes.
- Land changes through the repository's normal review workflow. Explain classifications, approvals,
  migration behavior, validation, and any remaining gaps.

## Hard rules

- Keep product behavior in the PRD and implementation design in technical documentation.
- Keep exact schemas, APIs, and runtime state in executable, generated, or live sources.
- Keep decision rationale in decision records; never rewrite their history to match current code.
- Never invent architecture from filenames alone. Mark uncertain claims and identify the evidence
  needed to resolve them.
- Never make a large technical-document tree always-on merely because the index links to it.
