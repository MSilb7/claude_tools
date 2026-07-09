# AI Tools

A canonical home for reusable AI-agent skills, scripts, references, and compatibility adapters.
Claude Code and Codex are first-class targets; other clients can consume the same Agent Skills
packages when they support `SKILL.md` or expose a compatible discovery directory.

The canonical GitHub repository is `MSilb7/ai-tools`. The stable `~/.ai-tools` anchor decouples
agent discovery from the checkout's local folder name.

## Portable skills

- `interview` — clarify requirements, constraints, priorities, and success criteria before acting.
- `pretty-print` — design consistent, readable terminal and CLI output.
- `codebase-review` — audit a repository for gaps, duplication, simplification, and product issues.
- `data-science` — plan, execute, validate, and communicate rigorous reproducible analysis.
- `migrate-agent-config` — audit and generalize an existing repository's AI-agent setup.
- `promote-skill` — move a proven project-local workflow into the canonical skill repository.

Each canonical skill lives at `skills/<name>/SKILL.md`. Provider-specific behavior belongs in a
reference or adapter, not in a duplicate copy of the workflow.

## Install

Preview every link without changing the machine:

```bash
scripts/install-skills --dry-run
```

Install for both Claude Code and Codex:

```bash
scripts/install-skills
```

Or install one target:

```bash
scripts/install-skills --target claude
scripts/install-skills --target codex
```

The installer creates a stable `~/.ai-tools` link to this checkout, then links skill directories
into `~/.claude/skills/` and `~/.agents/skills/`. During migration it also refreshes the existing
`~/.claude/commands/` links. It updates symlinks but never overwrites real files or directories.

After moving or renaming the checkout, rerun the installer from its new location. The platform links
continue to point through `~/.ai-tools`, so only the stable anchor needs to change.

## Legacy Claude workflows

The `commands/` directory remains active for workflows that have not completed the portable
migration:

- `add-weekly-hygiene`
- `compounding`
- `sync-commands`

Legacy command forms of migrated skills also remain temporarily. Claude Code prefers the modern
skill when a skill and command share the same name.

## Reorient an existing repository

Do not mass-rewrite an existing repository's agent configuration. Start with a read-only audit of
its instruction files, project skills, symlinks, scheduled workflows, and hard-coded repository
references. A useful first prompt is:

```text
Audit this repository's AI-agent setup for the AI Tools migration. Inspect AGENTS.md, CLAUDE.md,
.claude/, .agents/, symlinks, scheduled workflows, and references to claude_tools (the former
repository name). Classify each
item as portable workflow, Claude-specific integration, Codex-specific integration, historical
documentation, or stale configuration. Propose the smallest behavior-preserving migration; do not
change files until the plan is reviewed.
```

Repository-specific workflows should stay local. Shared workflows should point to the canonical
skill packages. Historical build logs should remain historical unless they are still operational
documentation.

## Authoring rules

- Put new shared workflows in `skills/<name>/SKILL.md` using lowercase hyphenated names.
- Use only `name` and `description` in portable frontmatter.
- Keep tool names and model names out of the portable core.
- Put detailed reference material in `references/`, deterministic helpers in `scripts/`, and
  copyable templates in `assets/`.
- Run the skill validator, `scripts/install-skills --dry-run`, and relevant tests before committing.

## Compounding system

The existing compounding queue and template pack remain under `commands/compounding-templates/`
until they migrate as one versioned unit with consuming repositories. Do not rename its
legacy `Upstream: claude_tools` marker piecemeal.
