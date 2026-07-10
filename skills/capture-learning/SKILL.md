---
name: capture-learning
description: Route a non-obvious repository learning, decision, failure mode, repeated procedure, or follow-up into the correct durable source instead of leaving it only in chat or provider memory. Use after discovering an important gotcha, confirming product or architecture direction, solving repeated work, or identifying an actionable gap.
---

# Capture Learning

Make a learning durable once, at the correct altitude. Do not scatter the same fact across every
context surface.

## 1. State the learning and evidence

Write one sentence for the durable claim and identify the repository or runtime evidence supporting
it. Separate confirmed fact from inference and proposed policy. If the learning is uncertain, record
what would verify it instead of upgrading it to a rule.

## 2. Route to one canonical home

- confirmed product outcome, scope, priority, or success definition → living PRD;
- architecture choice and rationale → decision record;
- current component, interface, data, trust, runtime, or testing map → technical design;
- fixable error, silent failure, reconciliation gap, or larger follow-up → compounding queue;
- operational procedure or recovery step → runbook;
- current implementation state or chronology → build log or current-state document;
- stable repository-wide constraint → shared agent instructions;
- provider-only behavior → that provider's adapter;
- repeated repository procedure → repository-local skill;
- repeated cross-repository procedure → canonical AI Tools through `promote-skill`.

Provider memory may point to the durable source, but must not be the only canonical record.

## 3. Apply the smallest durable update

Preserve source ownership. Link related documents instead of copying their content. When a learning
changes both product intent and implementation design, update each at its own altitude and connect
them with stable identifiers.

For a queue item, include evidence, scope, acceptance criteria, readiness, effort, and operator-only
constraints according to the repository SOP. Do not mark ambiguous work ready.

## 4. Verify discoverability

Confirm a future agent can find the learning from shared instructions, the relevant index, or the
selector without relying on this conversation. Run affected documentation or repository checks and
report the canonical location plus any intentionally deferred follow-up.
