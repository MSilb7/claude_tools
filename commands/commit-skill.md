---
description: Save a skill to global ~/.claude/commands and back up to claude_tools repo
argument-hint: <skill-name> (REQUIRED - the skill file name without .md extension)
---

Take the specified skill/command and save it for global access, then back it up and push.

## Requirements

**You MUST have a skill name provided.** If `$ARGUMENTS` is empty, ask the user which skill they want to commit before proceeding.

## Instructions

1. **Validate input**: If no skill name is provided in `$ARGUMENTS`, use AskUserQuestion to ask: "Which skill do you want to commit? Please provide the skill name (without .md extension)."

2. **Locate the skill**: Find the skill file named `<skill-name>.md` in the current project's `.claude/commands/` directory.

3. **Copy to global ~/.claude/commands/**: Save the skill to `~/.claude/commands/<skill-name>.md` so it's available in all sessions.

4. **Back up to claude_tools repo**: Copy the skill to `~/Documents Local/Github/claude_tools/commands/<skill-name>.md`.

5. **Commit and push**: In the claude_tools repo:
   - Stage the new/updated file
   - Commit with message: "Add/update <skill-name> skill"
   - Push to remote

6. **Confirm**: Report what was done and where the files were saved.

## Example Usage

```
/commit-skill my-skill
```

This will save `.claude/commands/my-skill.md` to both global and backup locations.
