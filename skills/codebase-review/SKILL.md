---
name: codebase-review
description: Audit a repository holistically to identify incomplete work, duplication, simplification opportunities, architectural gaps, and product inconsistencies. Use when the user asks for a codebase review, repository audit, technical health assessment, consolidation pass, or prioritized improvement plan.
---

# Codebase Review

Inspect the repository broadly before forming conclusions. Start with divergent exploration across
code, tests, configuration, documentation, and user-facing surfaces, then converge on the findings
with the strongest evidence and highest leverage. Do not modify the repository during a review unless
the user separately asks for implementation.

## What You're Brainstorming

This is a product and engineering audit of the entire codebase. The goal is NOT to build something new — it's to observe what exists, find gaps, and identify opportunities to simplify and unify.

Explore the repository thoroughly — pages, components, adapters, routers, hooks, types, utilities, and configuration. Then evaluate across these dimensions:

### 1. Missing Features & Incomplete Work
- TODO comments, placeholder UI, or half-built features
- Data sources or adapters that exist but aren't surfaced in the UI
- Obvious next steps that were started but not finished

### 2. Consolidation & Shared Patterns
- Components, hooks, or utilities that do similar things separately
- Repeated patterns across features that could share a single abstraction
- Types or interfaces that overlap and could be unified

### 3. Simplifications
- Dead code, unused imports, or stale configuration
- Over-engineered abstractions that could be flattened
- Features that add complexity without proportional value

### 4. Product & Unified Experience (when applicable)
- Do user-facing surfaces connect the available capabilities coherently?
- Is navigation and information architecture consistent across features?
- Are there disconnected experiences, data sources, or workflows that should link to each other?

## How to Present Findings

Lead with the strongest observations. Tie every finding to concrete evidence such as a file, symbol,
test, or observable behavior. Distinguish verified problems from hypotheses, explain impact and likely
effort, and propose prioritized tasks rather than vague suggestions.

End with a short recommended sequence. If the user wants to act on the findings, offer to turn the
selected items into an implementation plan in the repository's established planning location.
