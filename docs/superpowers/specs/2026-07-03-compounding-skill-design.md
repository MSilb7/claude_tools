# Design — `/compounding`: the centralized, self-updating compounding system

**Status:** approved by operator 2026-07-03 (brainstormed in the investment-agent auto-drain thread)
**Goal in one line:** extract the compounding system proven in investment-agent (capture → machine-readable
queue → Ready gate → daily auto-drain → continuous status hygiene) into one canonical claude_tools skill
that any repo gets by default — guided setup, tiered by session capability, self-updating in both
directions.

## 1. Problem

The compounding system (SOP, selector, drain worker, auto-merge workflow, status-currency rules) lives
only in investment-agent. Every other repo starts from zero; improvements made in one repo (e.g. the
2026-07-03 STEP 1.5 status-hygiene addition) reach nothing else. The operator wants: (a) any project —
existing or new — gets the system automatically when compounding first comes up; (b) one canonical copy
that self-propagates as it improves ("compound the compounding skill, everyone gets it").

## 2. Operator decisions (locked)

| Decision | Choice |
|---|---|
| Canonical home | **claude_tools skill** (`commands/compounding.md` + template pack), symlinked via `sync-commands` into `~/.claude/commands` — loads in every session, every repo |
| Selector portability | **Zero-dep portable script** `compounding-status.mjs` (node ≥18 or bun, no packages), copied into each repo with a version stamp; investment-agent keeps its native tested TS module |
| Bootstrap scope | **Full system, tiered by capability** in one PR; degrade gracefully and say what was skipped |
| Upstreaming | **Auto-file `Upstream: claude_tools` items** — repo-level system improvements flow to center via the queue itself |
| Guided routines (added at approval) | Setup ends with a **guided routine walkthrough** — present the routine menu, create what the surface allows, emit paste-ready packs + explicit operator steps for the rest |

## 3. Repo layout (claude_tools)

```
commands/
  compounding.md                    ← the skill; lean (always-loaded rent), modes below
  compounding-templates/
    VERSION                         ← single source: "1" (bump on any template change)
    SOP.md                          ← canonical SOP (generalized from investment-agent SOP v2)
    compounding-status.mjs          ← portable selector (same states/gate/ranking as queue.ts)
    compounding-status.test.mjs     ← node --test fixtures (C1-collision, every derived state, ranking)
    auto-merge-journal.yml          ← path-guarded auto-merge workflow (docs/compounding/** default)
    compounding-drain.md            ← per-repo drain worker skill (incl. STEP 1.5 status hygiene)
    claude-md-snippet.md            ← the CLAUDE.md bullet to insert per repo
```

Template resolution at runtime: the skill resolves its own symlink
(`readlink ~/.claude/commands/compounding.md` → `<claude_tools>/commands/compounding.md`) and reads
siblings from `<claude_tools>/commands/compounding-templates/`. Fallback when the local clone is
missing (e.g. cloud session): fetch raw from `github.com/MSilb7/claude_tools` `main`.

Every installed file carries a stamp comment:
`compounding-system: v<N> — installed from claude_tools; do not hand-edit; run /compounding upgrade`.

## 4. The skill — modes

**`/compounding` (no args) or `setup`** — bootstrap the current repo (skip pieces that already exist):
1. **Detect** (validate, don't guess — same discipline as add-weekly-hygiene): stack
   (bun/node/python/rust/go/none), GitHub remote?, default branch, docs conventions, risk surface.
2. **Install on a branch, open ONE PR** (never straight to main):
   - `docs/compounding/SOP.md` (template, stamped)
   - `scripts/compounding-status.mjs` (+ `"compounding-status"` package script on bun/node stacks;
     other stacks run `node scripts/compounding-status.mjs`)
   - `.claude/commands/compounding-drain.md`
   - CLAUDE.md bullet (create CLAUDE.md if absent; append the snippet if present)
   - `.github/workflows/auto-merge-journal.yml` — only if GitHub repo; warn that it needs
     `contents: write` Actions permission
3. **Guided routine walkthrough** (the operator-approved addition): present the routine menu with
   what each does and what it costs —
   - *daily compounding-drain* (the executor; recommended default),
   - *weekly hygiene* (if the repo has one via add-weekly-hygiene, add "run `/compounding upgrade` +
     review STALE/NEEDS-REVIEW" to its prompt; if not, suggest `/add-weekly-hygiene`),
   - *capture conventions* (passive — the CLAUDE.md bullet does this; no routine needed),
   - optional domain scanners (point at the investment-agent news-scanner pattern; not auto-built).
   Ask which to enable (AskUserQuestion when interactive; default to drain-only when directed to
   proceed autonomously). For each enabled routine: if the session is W+ (probe, don't assume —
   trigger-tool availability varies by surface), create the trigger with the **hardened recipe**:
   full `ccr` body incl. `session_context.sources` (repo-bound at birth) + model, then `get` and
   **check `mcp_connections`** — creation auto-attaches account-default connectors (C-CONN1);
   removal is UI-only, so page the operator detach explicitly. Not W+: emit a paste-ready apply
   pack into the PR and file the creation as the one operator/CLI step.
4. **Report**: what was installed, what was skipped and why, the PR link, and the (at most one)
   operator ask.

**`upgrade`** — self-update a repo: read the repo's installed stamps, diff against
`compounding-templates/VERSION` + file contents, PR only the delta (stamped files are replaced
wholesale — hand edits belong upstream, that's the point). Also `git -C <claude_tools> pull` first so
the canonical copy itself is fresh. Weekly hygiene routines call this, so propagation is scheduled.

**`status`** — run the repo's selector and report (session-start convenience; falls back to the
canonical template script via the resolved path when the repo isn't bootstrapped yet).

**Standing rules the skill carries** (canonical statements live in the SOP template; the skill
enforces): items born `Ready: no`; only `Ready: yes` + pickup∈{active-agent,cleanup-routine} +
effort ≤ ceiling auto-drain; statuses update continuously, never parked for wrap-up; **system-level
improvements file an item tagged `Upstream: claude_tools`** — any session/drain PRs it to
claude_tools, and the next upgrade wave carries it everywhere.

## 5. The portable selector (`compounding-status.mjs`)

Behavior-identical to investment-agent's `queue.ts` (the reference implementation):
- Parses `docs/compounding/*.md` items (tolerant: `### [C1]`, `### C1`, `## C-SIG1 —`, combined
  `Severity / effort`, status prose, `Ready:`).
- Lock key = `<file-datestamp>-<localid>`; claim branch `compounding/<key>`.
- Derived states: DONE / IN-PROGRESS / CLAIMED / NEEDS-REVIEW / STALE / BLOCKED / ELIGIBLE — branch
  existence (`git ls-remote`) is the load-bearing lock; `gh pr list` optional (degraded mode safe).
- Ranking severity desc → effort asc → oldest; `--json` contract identical
  (`{generatedAt, degraded, maxEffort, items, eligible}`); `COMPOUNDING_MAX_EFFORT` env (default low).
- Zero dependencies; runs under `node` (≥18) or `bun`; shells out only to `git`/`gh`.
- Tested by `compounding-status.test.mjs` with `node --test` (fixtures: format variants, C1 collision
  → distinct keys, every derived-state rule, gate truth table, ranking) — run in claude_tools CI-less
  via the hygiene routine or on demand.

## 6. Self-update, both directions

- **Center → repos:** symlink gives every session the latest *skill logic* instantly (after a
  claude_tools pull — `upgrade` pulls first); per-repo *installed files* catch up via `upgrade`,
  scheduled by weekly hygiene.
- **Repos → center:** `Upstream: claude_tools` tagging (above). The drain worker treats an upstream
  item like any other eligible item, except the implementation PR targets claude_tools.
- claude_tools itself keeps a `docs/compounding/` queue (self-hosting: the system manages its own
  backlog) — created by running `/compounding setup` on claude_tools as part of this build's
  validation.

## 7. Integrations & migration

- **add-weekly-hygiene AUDIT mode** gains one coverage check: repo lacking `docs/compounding/SOP.md`
  → propose `/compounding setup` (mirrors its existing missing-routine check).
- **investment-agent** (reference implementation, deliberately minimal): stamp its SOP with the
  system version + a pointer to the canonical skill; add the `Upstream: claude_tools` rule to its
  SOP + CLAUDE.md bullet. It keeps its native TS selector (19 tests > portable script). One small PR.

## 8. Acceptance / validation

1. `node --test` green on the portable selector fixtures.
2. `sync-commands` symlinks the new skill; it resolves its templates through the symlink.
3. **Live validation:** run `/compounding setup` on a real second repo (default: personal-finance,
   operator can redirect) → one PR there containing the full tiered install + routine apply pack.
4. investment-agent migration PR (stamp + upstream rule).
5. All work PR'd and merged (or explicitly awaiting the operator where real approval is needed).

## 9. Risks

| Risk | Mitigation |
|---|---|
| Skill/template drift between repos | Version stamps + `upgrade` mode + weekly hygiene scheduling |
| Portable script diverges from reference TS | Same fixtures both sides; upstream items when either improves |
| Trigger creation birth-drift (C-CONN1) | Hardened recipe baked into the skill's routine step |
| Symlink resolution unavailable (cloud) | GitHub-raw fallback for templates |
| Stale local claude_tools | `upgrade`/`setup` pull first; hygiene keeps it moving |
| Auto-merge workflow on repos with different risk posture | Path-guard default is docs/compounding/** only; setup states the trust boundary in the PR body |
