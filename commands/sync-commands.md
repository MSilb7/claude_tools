---
description: Symlink all skills from claude_tools to ~/.claude/commands/
---

Symlink all `.md` files from the `claude_tools/commands/` directory to `~/.claude/commands/` for global access.

Run this command:

```bash
for file in "/Users/michaelsilberling/Documents Local/GitHub/claude_tools/commands"/*.md; do
  ln -sf "$file" ~/.claude/commands/
done
```

Report which files were linked.
