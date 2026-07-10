---
description: >
  Set up, upgrade, or check the compounding self-improvement system in ANY repo — the
  capture → machine-readable queue → Ready-gate → daily-auto-drain loop proven in investment-agent.
  Use when the user says "set up compounding", "improvement backlog", "self-improvement queue",
  "add the compounding system", when bootstrapping a new repo, or when a repo lacks
  docs/compounding/. Modes: setup (default) installs the full tiered system in one PR and guides the
  routine walkthrough; upgrade syncs a repo's installed files to the latest canonical templates;
  status runs the selector.
argument-hint: "[setup|upgrade|status] [repo path — default: current repo]"
---

# /compounding — the centralized, self-updating compounding system

One canonical system (this skill + its template pack) that every repo inherits: sessions **capture**
improvement ideas as structured queue items; a **selector** derives each item's state from git/PR
reality; a **Ready gate** keeps automation off half-scoped ideas; a **daily drain routine** works
one firm item per fire to a PR; **status hygiene** keeps the queue truthful without anyone asking;
the product PRD and technical design stay reconciled with implementation at their distinct altitudes.
Spec: `docs/superpowers/specs/2026-07-03-compounding-skill-design.md` (ai-tools).

Mode = first word of `$ARGUMENTS` (`setup` | `upgrade` | `status`; default `setup` — but if the
target repo already has `docs/compounding/SOP.md`, say so and run `upgrade` instead). Target repo =
second argument or the current repo.

## 0 — Resolve the canonical templates

```bash
SKILL_REAL=$(readlink -f ~/.claude/commands/compounding.md)
TPL=$(dirname "$SKILL_REAL")/compounding-templates
CANON_ROOT=$(cd "$(dirname "$SKILL_REAL")/.." && pwd)   # the ai-tools checkout
TECH_TEMPLATE="$CANON_ROOT/skills/maintain-technical-design/assets/TECHNICAL_DESIGN-template.md"
git -C "$CANON_ROOT" pull --ff-only 2>/dev/null || true  # best-effort freshness
cat "$TPL/VERSION"                                       # must print a number
```

If the symlink doesn't resolve (e.g. cloud session without the ai-tools checkout), fetch each
template raw from `https://raw.githubusercontent.com/MSilb7/ai-tools/main/commands/compounding-templates/<file>`
(files: `VERSION`, `SOP.md`, `compounding-status.mjs`, `compounding-status.test.mjs`,
`auto-merge-journal.yml`, `compounding-drain.md`, `compounding-curate.md`, `claude-md-snippet.md`,
`continuous-improvement-agent-snippet.md`, `PRD-template.md`, `prd-reconcile.md`,
`prd-claude-md-snippet.md`,
`technical-design-agent-snippet.md`). Fetch the technical-design asset separately from
`https://raw.githubusercontent.com/MSilb7/ai-tools/main/skills/maintain-technical-design/assets/TECHNICAL_DESIGN-template.md`
and treat that downloaded path as `$TECH_TEMPLATE`. The portable skill asset is canonical; do not
duplicate it into the legacy template pack.

## 1 — Detect (validate, don't guess — same discipline as /add-weekly-hygiene)

Under the target repo root: `git remote get-url origin` (slug; no remote ⇒ no workflow tier, no
auto-merge — note it), default branch (`git symbolic-ref refs/remotes/origin/HEAD`), stack
(`bun.lockb`/`package.json` ⇒ bun/node; `pyproject.toml`/`requirements.txt` ⇒ python; `Cargo.toml`
⇒ rust; `go.mod` ⇒ go; none ⇒ docs-only repo), AGENTS.md/CLAUDE.md present?, `.github/workflows/` present?,
the repo's green-check commands (only gate on commands that exist), and whether
`docs/compounding/SOP.md` already exists (⇒ `upgrade`). Also inventory existing architecture,
technical, operations, security, data, API, and decision documentation before installing the
technical index; preserve it and link it rather than replacing it.

## 2 — SETUP mode (installs on a branch; ONE PR; never push the default branch)

Branch: `compounding/setup-v$(cat "$TPL/VERSION")`. Install (skip any piece that already exists,
and say so):

1. `docs/compounding/SOP.md` ← `$TPL/SOP.md`
2. `scripts/compounding-status.mjs` ← `$TPL/compounding-status.mjs`
   - package.json stacks: add `"compounding-status": "node scripts/compounding-status.mjs"` to
     `scripts`. Other stacks: the plain `node scripts/compounding-status.mjs` invocation is the
     documented path (node ≥18 required — check `node --version`; absent node = note it and install
     anyway, the drain routine's cloud env has node).
3. `.claude/commands/compounding-drain.md` ← `$TPL/compounding-drain.md`
   - and `.claude/commands/compounding-curate.md` ← `$TPL/compounding-curate.md` (the context-lifecycle
     pass — run by the weekly hygiene routine and on demand; keeps the always-on context from rotting).
4. **Shared agent instructions and continuous improvement:**
   - Make `AGENTS.md` the canonical cross-agent file. Create it with `# AGENTS.md — <repo>` when absent,
     then append the compounding bullet from `$TPL/claude-md-snippet.md` and the clean-closure / skill-promotion
     rules from `$TPL/continuous-improvement-agent-snippet.md` when each exact block is absent. Do not treat the
     shared v6 stamp alone as proof that every standing block is installed.
   - Preserve provider-specific files. If `CLAUDE.md` is absent, create it with `@AGENTS.md`; if it exists and
     does not import the shared file, add that pointer without deleting or rewriting existing Claude guidance.
5. **Product PRD (the second pillar — the living product north star):**
   - `.claude/commands/prd-reconcile.md` ← `$TPL/prd-reconcile.md` (the desired-vs-reality pass).
   - `docs/product/PRD.md` ← `$TPL/PRD-template.md` **ONLY IF ABSENT** — an existing PRD is NEVER overwritten
     (the skeleton is a starting point; the filled-in content is the repo's, not canonical-owned). Say so if you
     skip it. Offer to seed §1 vision from the repo's README/CLAUDE.md so it isn't left empty.
   - AGENTS.md: append the bullet from `$TPL/prd-claude-md-snippet.md` (the "PRD is the north star / reconcile
     confirmed decisions and shipped reality" standing practice).
   - Advise (don't force) wiring the PRD into the repo's own `catch-up`/session-start + end-of-session-review
     skills if they exist: read the PRD first; carry a PRD-drift check at wrap-up.
6. **Technical design (the third pillar — the implementation map):**
   - `docs/technical/TECHNICAL_DESIGN.md` ← `$TECH_TEMPLATE` **ONLY IF ABSENT**. Existing canonical or
     topic technical documentation is NEVER overwritten. For an existing system, seed the index from
     repository evidence and link useful existing documents; for a greenfield repo, leave explicit placeholders.
   - Append the concise pointer from `$TPL/technical-design-agent-snippet.md` to `AGENTS.md`.
     Keep the portable reconciliation workflow in `maintain-technical-design`; do not copy that procedure into
     always-on context or duplicate the pointer across instruction files.
   - Explain the truth hierarchy: PRD owns what/why, technical design owns how, decision records own rationale,
     and executable/generated/live sources own exact details.
7. GitHub repos only: `.github/workflows/auto-merge-journal.yml` ← `$TPL/auto-merge-journal.yml`.
   State the TRUST BOUNDARY in the PR body: *"PRs touching only docs/compounding/** will squash-merge
   without review once this lands; requires Actions read/write workflow permissions."*
8. Smoke: `node scripts/compounding-status.mjs` from the repo root runs clean (`total=0` on a fresh
   queue is correct).
9. Open ONE PR titled `feat: compounding system v<VERSION> — queue + product + technical design`.
   Per the merge-asks standing practice: ask permission to merge; on approval, merge and confirm
   the workflow shows up under Actions.

## 3 — Guided routine walkthrough (after the PR exists)

Present the menu — what each piece does, what it costs, what it needs:

| Routine | What it does | Default |
|---|---|---|
| **Daily compounding-drain** | one `Ready: yes` item per fire → PR; status hygiene every fire | **recommended ON** — cron `0 14 * * *` UTC (stagger vs other repos' drains if the operator runs several) |
| **Weekly hygiene integration** | existing `/add-weekly-hygiene` routine for this repo gets 1 line added to its prompt: "run `/compounding upgrade`; review STALE/NEEDS-REVIEW queue items; reconcile product and technical docs when changed"; no hygiene routine yet → suggest `/add-weekly-hygiene` | ON if a hygiene routine exists |
| **Capture** | passive — the AGENTS.md standing rules make every agent file items | already ON via setup |
| **Domain scanners** | repo-specific opportunity scanners (see investment-agent's news scanner as the pattern) | pointer only — not auto-built |

Interactive → AskUserQuestion for which to enable. Autonomous/directed → daily drain only, note the rest.

For each enabled routine, **probe trigger capability first** (varies by surface; never assume, never
end "blocked" — degrade to a paste-ready apply pack in the PR body + file the creation step):

- **W+ (full-config trigger tool, e.g. RemoteTrigger on a claude.ai-OAuth CLI):** create with the
  **hardened recipe** — one `create` carrying the full `job_config.ccr`:
  `events[0].data.message.content` = `"Invoke the compounding-drain skill
  (.claude/commands/compounding-drain.md) and follow it exactly."` + the drain template text as a
  redundancy mirror (state: repo copy wins on divergence); `session_context.sources =
  [{git_repository: {url: "<repo https url>"}}]` (**this is what repo-binds an agent-created
  trigger**); `session_context.model` per the repo's model policy (executors pin latest Sonnet);
  standard `allowed_tools` (no broker/exchange tools); cron from the menu; push notification on.
  **THEN immediately `get` the trigger and read top-level `mcp_connections`** — creation
  auto-attaches the account's default connectors and API removal is silently ignored (UI-only). Any
  connector attached ⇒ the ONE operator ask is: *"detach <names> from the new routine at claude.ai
  (routine config → connectors)"* — page it, don't bury it. Also confirm `sources` is present in the
  returned config before calling the routine live.
- **Not W+:** write the apply pack (trigger name, cron, model, prompt, sources requirement, the
  connector-check warning) into the PR body and file the creation as the one operator/CLI step.

## 4 — UPGRADE mode

1. Resolve `$TPL` + pull (step 0). Canonical version: `cat "$TPL/VERSION"`.
2. Read the repo's installed stamps: `grep -rn "compounding-system: v" docs/compounding/SOP.md
   scripts/compounding-status.mjs .claude/commands/compounding-drain.md
   .claude/commands/compounding-curate.md .claude/commands/prd-reconcile.md
   .github/workflows/auto-merge-journal.yml CLAUDE.md AGENTS.md 2>/dev/null`.
3. For each installed file whose stamp version < canonical OR whose content differs from the
   template: replace it **wholesale** on branch `compounding/upgrade-v<VERSION>` (stamped files are
   canonical-owned — hand edits to them are lost by design; improvements belong upstream, say so in
   the PR body). Preserve the repo's own queue entries untouched (`docs/compounding/*.md` session
   files are never templates). **NEVER wholesale-replace `docs/product/PRD.md`** — the PRD skeleton is
   install-if-absent only; its filled-in content is the repo's, not canonical-owned. If a repo lacks a PRD
   entirely, offer to install the skeleton (`$TPL/PRD-template.md`); if it lacks `prd-reconcile.md`, install it.
   **NEVER wholesale-replace `docs/technical/TECHNICAL_DESIGN.md`** or existing topic technical docs. If the
   canonical index is absent, inventory existing documentation, then create it from `$TECH_TEMPLATE`, seed it
   from repository evidence, and link what already exists. Install or refresh only the concise agent-config pointer from
   `$TPL/technical-design-agent-snippet.md`.
   Append missing v6 compounding, PRD, technical-design, and continuous-improvement snippets to `AGENTS.md`
   by checking each exact block, not only the shared version stamp, and without replacing repository-owned
   instructions. Ensure `CLAUDE.md` imports `@AGENTS.md`, preserving all provider-specific content; do not
   duplicate the shared workflow prose in both files.
4. Smoke (`node scripts/compounding-status.mjs`), then PR with a per-file `current → new` table.
   Ask permission to merge per the merge-asks practice (a weekly hygiene fire instead leaves the PR
   for review).

## 5 — STATUS mode

Run the repo's selector (`compounding-status` script, or `node scripts/compounding-status.mjs`); if
the repo isn't bootstrapped, run the canonical template directly from the repo root:
`node "$TPL/compounding-status.mjs"`. Report the summary line + the top 3 ELIGIBLE (or the top
BLOCKED reasons when empty) and any STALE/NEEDS-REVIEW that need a human.

## Hard rules (all modes)

- PRs only; never push a repo's default branch; never force-push; never delete branches with
  unmerged work.
- The drain worker gets NO connectors and NO repo credentials; repos with money-moving/state-mutating
  systems keep those out of the worker's reach entirely (the template's DEV-worker limits).
- Product behavior stays in the PRD; implementation design stays in technical documentation; decision
  rationale stays in decision records; exact executable and generated sources remain authoritative.
- Never overwrite a repository's filled-in product or technical documentation during setup or upgrade.
- Degrade gracefully at every tier; end by naming exactly what was installed, what was skipped and
  why, and the (at most one) operator ask.
- Friction found while running THIS skill is itself a queue item — file it in the target repo tagged
  `Upstream: claude_tools` (SOP § Upstreaming). That's how the compounding system compounds.
