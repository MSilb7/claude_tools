---
name: promote-skill
description: Promote a useful project-local skill or command into the canonical AI Tools repository, generalize it for multiple agents, validate it, and install it through shared symlinks. Use when the user asks to save, commit, centralize, share, or make a locally developed AI workflow globally available.
---

# Promote a Skill

Move one proven workflow into the canonical AI Tools repository without losing project-specific
behavior or introducing provider coupling.

## 1. Identify the source and destination

Require a specific source skill or command. Locate its complete package, including referenced scripts,
assets, templates, and documentation. Resolve the AI Tools checkout through `~/.ai-tools` when
available; otherwise ask for or discover the checkout path.

Use a lowercase hyphenated destination name under `skills/<name>/`. If that skill already exists,
treat the work as an update and preserve unrelated resources.

## 2. Decide what belongs globally

Separate the source into:

- Reusable workflow instructions suitable for the portable `SKILL.md` core.
- Reusable scripts, references, and assets that should travel with the skill.
- Provider-specific invocation, tools, permissions, models, or scheduling details that need an adapter.
- Repository-specific domain rules that should remain in the source repository.

Do not copy secrets, local absolute paths, generated output, caches, build logs, or unrelated examples.
Do not make a workflow appear portable by merely renaming provider concepts.

## 3. Build or update the canonical package

For a new skill, initialize the standard skill directory with the available skill-creation tooling.
Write `SKILL.md` with only `name` and `description` in portable frontmatter. Make the description
state what the skill does and when it should trigger. Keep the body imperative and tool-neutral.

Move detailed material into one-level-deep `references/`, repeated deterministic work into `scripts/`,
and copyable resources into `assets/`. Add product metadata only outside the portable workflow body.

When promoting a legacy single-file command, preserve its invocation behavior with a thin compatibility
wrapper that points to the canonical skill. Do not leave two independently maintained workflow bodies.

## 4. Validate behavior

- Run the Agent Skills validator on the canonical package.
- Run any bundled scripts and relevant tests.
- Search the portable core for provider-only tools, argument placeholders, models, and discovery paths.
- Run the AI Tools installer in dry-run mode and confirm the intended targets.
- Review the diff for accidental project-specific content.

## 5. Install and report

Run the shared installer only when the user has authorized changes to their user-level skill directories.
Do not overwrite a real file or directory with a symlink. Confirm the installed links resolve to the
canonical package.

Report the canonical skill path, resources included, provider-specific material left behind, validation
performed, and any source-repository cleanup that still needs approval. Do not delete the original
project-local workflow until its replacement is verified and the user approves removal.
