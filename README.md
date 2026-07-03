# claude_tools

A collection of reusable skills/commands for Claude Code.

## Skills

### `/interview`
Ask clarifying questions before starting a task. Explores the codebase and uses `AskUserQuestion` to gather requirements, priorities, and constraints.

```
/interview
/interview authentication flow
```

### `/pretty-print`
Guidelines for consistent terminal output formatting. Provides ANSI color codes, status prefixes, and a copy-paste `utils/terminal.ts` module.

### `/commit-skill`
Save a project-local skill to `~/.claude/commands/` for global access.

```
/commit-skill my-skill
```

### `/codebase-review`
Review a codebase holistically (via `superpowers:brainstorming`) to find missing features,
consolidation opportunities, and simplifications.

```
/codebase-review
/codebase-review error handling and logging
```

### `/data-science`
Structured data science workflow — problem understanding → technique selection → execution →
rigorous validation. Use for any analytical or statistical question about data.
(Example output: `ab_test_analysis.ipynb` at the repo root.)

```
/data-science did variant B actually improve conversion?
```

### `/add-weekly-hygiene`
Create a per-repo weekly repo-hygiene cloud routine (claude.ai code trigger) — detects the repo's
stack, picks the right test/typecheck gate, and registers a Sunday routine that opens a hygiene PR
(never merges).

```
/add-weekly-hygiene              # current repo
/add-weekly-hygiene owner/repo
```

### `/compounding`
Set up, upgrade, or check the compounding self-improvement system (capture → queue → Ready gate →
daily auto-drain) in any repo. Canonical templates live in `commands/compounding-templates/`
(VERSION-stamped; system improvements arrive as `Upstream: claude_tools` queue items and fan out to
every repo via `/compounding upgrade`).

```
/compounding                 # setup (default) — full tiered install, one PR, guided routines
/compounding upgrade         # sync a repo's installed files to the latest templates
/compounding status          # run the selector, report the queue
```

### `/sync-commands`
Symlink all skills from this repo to `~/.claude/commands/`. Run after adding new skills.

## Installation

First time setup (symlink this skill manually, then use it):

```bash
ln -sf "/Users/michaelsilberling/Documents Local/GitHub/claude_tools/commands/sync-commands.md" ~/.claude/commands/
```

Then run `/sync-commands` to link everything else. Run it again after adding new skills.
