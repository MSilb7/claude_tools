---
description: Save a skill to global ~/.claude/commands for use in all sessions
argument-hint: <skill-name> (REQUIRED - the skill file name without .md extension)
---

Save the specified skill/command to global ~/.claude/commands for access across all projects.

## Requirements

**You MUST have a skill name provided.** If `$ARGUMENTS` is empty, ask the user which skill they want to commit before proceeding.

## Instructions

1. **Validate input**: If no skill name is provided in `$ARGUMENTS`, use AskUserQuestion to ask: "Which skill do you want to save globally? Please provide the skill name (without .md extension)."

2. **Locate the skill**: Find the skill file named `<skill-name>.md` in the current project's `.claude/commands/` directory.

3. **Copy to global ~/.claude/commands/**: Save the skill to `~/.claude/commands/<skill-name>.md` so it's available in all sessions.

4. **Confirm**: Report what was done and where the file was saved.

## Example Usage

```
/commit-skill my-skill
```

This will save `.claude/commands/my-skill.md` to `~/.claude/commands/my-skill.md`.
