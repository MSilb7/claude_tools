---
description: Install shared AI Tools skills for Claude Code and Codex and refresh legacy Claude command links
---

Install every portable skill for Claude Code and Codex. Also refresh the legacy Claude command links
that remain during the migration.

Run:

```bash
~/.ai-tools/scripts/install-skills --target all
```

If the stable `~/.ai-tools` anchor has not been created yet, locate the checkout containing this
command and run its `scripts/install-skills --target all` instead.

Report the created, refreshed, unchanged, and conflicting links. Never replace a real file or
directory with a symlink.
