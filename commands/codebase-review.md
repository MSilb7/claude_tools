---
description: Review the codebase holistically to find missing features, consolidation opportunities, and simplifications
argument-hint: [optional: specific areas or themes to focus on]
---

First, invoke the `superpowers:brainstorming` skill using the Skill tool. Then apply the brainstorming process to the codebase review described below.

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

### 4. Dashboard & Unified Experience
- Does the dashboard effectively tie together all data sources?
- Is navigation and information architecture coherent across features?
- Are there disconnected experiences that should link to each other?

## Focus Areas (if provided)

$ARGUMENTS

## How to Present Findings

Follow the brainstorming process from the skill: present findings in small sections (200-300 words each), checking after each whether it resonates. Lead with your strongest observations. Propose concrete next steps as prioritized tasks, not vague suggestions.

After the review, if the user wants to act on findings, offer to write them up as a plan in `docs/plans/`.
