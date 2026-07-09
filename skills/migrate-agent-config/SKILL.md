---
name: migrate-agent-config
description: Audit and generalize a repository's AI-agent configuration while preserving provider-specific capabilities. Use when migrating from one coding agent to multiple agents, introducing AGENTS.md, converting commands into portable skills, repairing shared-skill symlinks, or removing unnecessary Claude-, Codex-, Cursor-, or local-model coupling.
---

# Migrate Agent Configuration

Preserve working behavior while establishing one portable source for shared instructions and skills.
Treat provider-specific integrations as explicit adapters, not accidental global assumptions.

## 1. Inventory before editing

Inspect the repository and relevant user-level links for:

- `AGENTS.md`, `AGENTS.override.md`, `CLAUDE.md`, and other agent instruction files.
- Project skills, commands, rules, hooks, agents, MCP configuration, and automation manifests.
- Symlinks and their resolved targets, especially links outside the repository.
- Hard-coded repository names, absolute paths, model names, and provider tool names.
- Operational docs that scheduled or headless agents still follow.

Use fast repository search and filesystem link inspection. Exclude dependencies, generated output,
caches, worktrees, and secrets. Do not mutate sibling repositories during the inventory.

## 2. Classify every relevant artifact

Assign each artifact to exactly one primary category:

1. **Shared instructions** — durable repository conventions that every agent should read.
2. **Portable skill** — a reusable workflow expressible as a standard `SKILL.md` package.
3. **Provider adapter** — discovery paths, permissions, invocation syntax, or tool mappings for one client.
4. **Runtime automation** — scheduled jobs, cloud triggers, credentials, or external execution policy.
5. **Repository-local workflow** — domain behavior that belongs with this repository, not in global tools.
6. **Historical record** — plans and logs that should remain truthful to their original context.
7. **Stale configuration** — unused or broken material safe to retire after verification.

Do not classify a file as portable merely by replacing provider names. Separate the invariant workflow
from the runtime capability it depends on.

## 3. Propose the smallest migration

Prefer this target pattern when it fits the repository:

- Make `AGENTS.md` the canonical shared instruction file.
- Let provider instruction files import or point to the shared file, then add only provider-specific guidance.
- Keep shared skills in one canonical skill directory and symlink supported discovery directories to it.
- Keep repository-specific skills in the repository.
- Put scheduling, permissions, connectors, and model selection in provider-specific configuration.
- Preserve compatibility paths until both the old and new entry points have been tested.

List changes in dependency order and identify anything that must migrate atomically, such as a
versioned template pack plus its installed copies or a scheduled job plus its referenced skill path.

## 4. Implement only the authorized scope

When the user asks only for an audit, stop after the evidence-backed proposal. When the user asks for
the migration, implement reversible repository-local changes, preserve unrelated work, and avoid
changing live automations or sibling repositories without explicit authorization.

Never overwrite a real file with a symlink. Treat broken and absolute symlinks as migration risks;
repair them through a stable anchor or documented installer.

## 5. Verify from each supported surface

- Validate every migrated skill's metadata and bundled references.
- Confirm symlink targets resolve after installation and after a simulated checkout relocation.
- Confirm each agent discovers the expected shared instructions and skills.
- Run repository tests relevant to changed automation or scripts.
- Search again for old live paths and distinguish remaining historical references from missed runtime references.

Report what is portable, what remains provider-specific, which external setups still need reorientation,
and the exact next prompt or command for each setup.
