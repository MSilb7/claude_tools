---
description: Format terminal output with consistent colors, prefixes, and structured messaging
allowed-tools: Read, Edit, Write, Glob, Grep
---

# Pretty Print Skill

Guidelines for creating consistent, readable terminal output in CLI applications.

## Core Principles

1. **Use semantic formatting** - Apply colors and prefixes based on meaning, not aesthetics
2. **Be consistent** - Same status types should always look the same
3. **Keep it scannable** - Important information should stand out at a glance

## Recommended Patterns

### Status Messages

Use distinct visual indicators for different message types:

```typescript
// Success - green with checkmark
console.log('\x1b[32m✓\x1b[0m Task completed');

// Error - red with X
console.log('\x1b[31m✗\x1b[0m Operation failed');

// Warning - yellow with warning symbol
console.log('\x1b[33m⚠\x1b[0m Something may be wrong');

// Info - cyan with info symbol
console.log('\x1b[36mℹ\x1b[0m Additional information');
```

### Status Prefixes

Use bracketed prefixes for categorizing output:

```typescript
// Common prefix patterns
console.log('[SKIP] Already processed');
console.log('[DRY RUN] Would execute action');
console.log('[DEBUG] Internal state info');
console.log('[RETRY] Attempt 2/3');
console.log('[WAIT] Pending response...');
```

### Text Styling

```typescript
// Bold for emphasis
console.log('\x1b[1mImportant value\x1b[0m');

// Dim/muted for less important info
console.log('\x1b[2mSecondary details\x1b[0m');

// Colored text
console.log('\x1b[34mBlue text\x1b[0m');    // Blue
console.log('\x1b[32mGreen text\x1b[0m');   // Green
console.log('\x1b[33mYellow text\x1b[0m');  // Yellow
console.log('\x1b[31mRed text\x1b[0m');     // Red
console.log('\x1b[36mCyan text\x1b[0m');    // Cyan
```

## Creating a Formatting Utility

For larger projects, create a simple formatting module:

```typescript
// utils/terminal.ts
export const colors = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  gray: '\x1b[90m',
} as const;

export function success(msg: string): string {
  return `${colors.green}✓${colors.reset} ${msg}`;
}

export function error(msg: string): string {
  return `${colors.red}✗${colors.reset} ${msg}`;
}

export function warning(msg: string): string {
  return `${colors.yellow}⚠${colors.reset} ${msg}`;
}

export function info(msg: string): string {
  return `${colors.cyan}ℹ${colors.reset} ${msg}`;
}

export function highlight(msg: string): string {
  return `${colors.bold}${msg}${colors.reset}`;
}

export function muted(msg: string): string {
  return `${colors.dim}${msg}${colors.reset}`;
}

export const prefix = {
  skip: (msg: string) => `${colors.gray}[SKIP]${colors.reset} ${colors.dim}${msg}${colors.reset}`,
  dryRun: (msg: string) => `${colors.cyan}[DRY RUN]${colors.reset} ${msg}`,
  debug: (msg: string) => `${colors.gray}[DEBUG]${colors.reset} ${msg}`,
  retry: (msg: string) => `${colors.yellow}[RETRY]${colors.reset} ${msg}`,
  wait: (msg: string) => `${colors.blue}[WAIT]${colors.reset} ${msg}`,
  step: (n: number, total: number, msg: string) => `[${n}/${total}] ${msg}`,
};
```

## Usage Example

```typescript
import { success, error, warning, prefix, highlight } from './utils/terminal.js';

// Report progress
console.log(prefix.step(1, 3, 'Starting process'));
console.log(success(`Processed ${highlight('42')} items`));

// Handle conditions
if (alreadyDone) {
  console.log(prefix.skip('Nothing to do'));
  return;
}

// Show errors
if (!valid) {
  console.log(error('Validation failed'));
  console.log(warning('Check your configuration'));
}

// Dry run mode
if (dryRun) {
  console.log(prefix.dryRun('Would perform action'));
} else {
  performAction();
  console.log(success('Action completed'));
}
```

## Best Practices

1. **Reset after styling** - Always end styled text with the reset code
2. **Test in different terminals** - ANSI codes may render differently
3. **Provide plain text fallback** - Consider `NO_COLOR` environment variable
4. **Use sparingly** - Too much color reduces effectiveness
5. **Group related output** - Use prefixes to categorize related messages
