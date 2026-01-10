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

## Installation

Copy any `.md` file from `commands/` to:
- **Project-local**: `.claude/commands/` in your repo
- **Global**: `~/.claude/commands/` for all projects
