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

### `/sync-commands`
Symlink all skills from this repo to `~/.claude/commands/`. Run after adding new skills.

## Installation

First time setup (symlink this skill manually, then use it):

```bash
ln -sf "/Users/michaelsilberling/Documents Local/GitHub/claude_tools/commands/sync-commands.md" ~/.claude/commands/
```

Then run `/sync-commands` to link everything else. Run it again after adding new skills.
