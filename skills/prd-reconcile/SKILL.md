---
name: prd-reconcile
description: Reconcile a living product PRD with confirmed planning decisions, shipped behavior, current priorities, technical design, and repository evidence without silently changing product meaning. Use after product interviews, planning changes, implementation, roadmap movement, or when the PRD may have drifted from reality.
---

# PRD Reconcile

Keep the PRD authoritative for what the product is, who it serves, why it matters, and which outcomes
come next. Keep implementation detail in technical documentation and exact behavior in executable or
generated sources.

## 1. Establish product truth

Read repository instructions and the full PRD. Then inspect the evidence relevant to the request:

- confirmed user decisions from the current planning conversation;
- merged and open work since the PRD's last meaningful update;
- user-visible behavior, tests, release notes, and current-state logs;
- the technical-design index and active decision records;
- open compounding items that affect product intent or roadmap status.

Treat a confirmed planning decision as a documentation event. Update the PRD before implementation
when the decision changes product scope, outcomes, principles, stories, success criteria, or roadmap.

## 2. Classify divergences

Use one primary classification per supported divergence:

- `PRD-STALE` — reality or a confirmed decision changed and the PRD did not;
- `IMPLEMENTATION-DRIFT` — behavior contradicts a still-valid product rule;
- `NEW-UNCAPTURED` — a material capability or outcome lacks a PRD home;
- `ROADMAP-MOVE` — planned work started, finished, changed order, or was retired;
- `PRD-TECH-MISMATCH` — product intent and the technical design do not trace or agree.

Cite evidence. Do not resolve contradictions by assuming the newest artifact is correct.

## 3. Propose before changing meaning

Present a compact divergence table with evidence, classification, proposed edit, and approval level.
Batch factual status repairs and faithful capture of already-confirmed decisions. Ask for explicit
approval before changing the meaning of a principle, user story, target outcome, success criterion,
or product boundary.

Route implementation-side discrepancies through `maintain-technical-design`. Route unresolved work
to the compounding queue with evidence and acceptance criteria.

## 4. Apply and verify

When authorized, update the PRD and its reconciliation marker in the same change. Retire obsolete
stories with date and rationale rather than erasing history. Collapse duplicate vision sources to a
pointer.

Verify story, capability, roadmap, and success-criteria consistency; check links and relevant
repository tests; inspect the diff for technical detail, unsupported conclusions, and unrelated
changes. Report what changed, what remains a decision, and any product/technical mismatch.
