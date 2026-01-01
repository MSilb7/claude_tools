---
description: Format terminal output with consistent colors, prefixes, and transaction hash formatting using @onchain-bots/shared-terminal
allowed-tools: Read, Edit, Write, Glob, Grep
---

# Pretty Print Skill

Use the `@onchain-bots/shared-terminal` package for consistent, readable terminal output across all bots.

## Quick Start

```typescript
import {
  success,
  error,
  warning,
  prefix,
  formatTxHashForStdout,
} from '@onchain-bots/shared-terminal';

// Success/error/warning messages
console.log(success('Transaction confirmed'));   // ✓ Transaction confirmed (green)
console.log(error('Transaction failed'));        // ✗ Transaction failed (red)
console.log(warning('Low balance'));             // ⚠️  Low balance (yellow)

// Status prefixes
console.log(prefix.skip('Already claimed'));     // [SKIP] Already claimed
console.log(prefix.dryRun('Would swap 100'));    // [DRY RUN] Would swap 100
console.log(prefix.ledger('Confirm on device')); // [LEDGER] Confirm on device

// Transaction hashes (shortened for terminal, full for reports)
console.log(formatTxHashForStdout('base', txHash));
```

## Installation

Add to your package.json:
```json
{
  "dependencies": {
    "@onchain-bots/shared-terminal": "workspace:*"
  }
}
```

Then run `pnpm install`.

## API Reference

### Formatters (with icons)

| Function | Output | Use Case |
|----------|--------|----------|
| `success(msg)` | `✓ msg` (green) | Confirmed transactions, completed steps |
| `error(msg)` | `✗ msg` (red) | Failed operations |
| `warning(msg)` | `⚠️ msg` (yellow) | Non-fatal issues |
| `info(msg)` | `ℹ msg` (cyan) | General information |
| `action(msg)` | `msg` (bold blue) | Current action being performed |
| `technical(msg)` | `msg` (dimmed) | Addresses, hashes, technical details |
| `highlight(msg)` | `msg` (bold) | Important values (amounts, etc.) |
| `muted(msg)` | `msg` (gray) | Less important text |

### Prefixes (status tags)

| Prefix | Tag | Use Case |
|--------|-----|----------|
| `prefix.skip(msg)` | `[SKIP]` | Skipped operations (nothing to do) |
| `prefix.dryRun(msg)` | `[DRY RUN]` | Simulated operations |
| `prefix.debug(msg)` | `[DEBUG]` | Debug information |
| `prefix.resume(msg)` | `[RESUME]` | Resumed from database/cache |
| `prefix.delta(msg)` | `[DELTA]` | Balance/amount changes |
| `prefix.receipt(msg)` | `[RECEIPT]` | Transaction receipt info |
| `prefix.ledger(msg)` | `[LEDGER]` | Hardware wallet prompts |
| `prefix.fallback(msg)` | `[FALLBACK]` | Fallback to alternative |
| `prefix.zeroX(msg)` | `[0x]` | 0x Protocol operations |
| `prefix.ignore(msg)` | `[IGNORE]` | Intentionally ignored |
| `prefix.retry(msg)` | `[RETRY]` | Retry attempts |
| `prefix.wait(msg)` | `[WAIT]` | Waiting/pending |
| `prefix.chain(name, msg)` | `[NAME]` | Chain-specific |
| `prefix.step(n, total, msg)` | `[n/total]` | Numbered steps |

### Transaction Hash Utilities

| Function | Description |
|----------|-------------|
| `txUrl(chain, hash)` | Get explorer URL for transaction |
| `addressUrl(chain, addr)` | Get explorer URL for address |
| `shortenHash(hash)` | `0x12345678...fedcba09` |
| `shortenAddress(addr)` | `0x1234...5678` |
| `formatTxHashForStdout(chain, hash)` | Shortened + URL (for terminal) |
| `formatTxHashForReport(chain, hash)` | Full hash + URL (for reports) |

**Supported chains:** `mainnet`, `base`, `optimism`, `arbitrum`, `mode`, `polygon`, `bsc`, `avalanche`, `gnosis`

### Raw Colors

```typescript
import { colors, styles } from '@onchain-bots/shared-terminal';

// Raw ANSI codes
console.log(`${colors.green}text${colors.reset}`);
console.log(`${colors.bold}${colors.blue}text${colors.reset}`);

// Pre-combined styles
console.log(`${styles.success}text${colors.reset}`);  // bold green
console.log(`${styles.error}text${colors.reset}`);    // bold red
```

## Examples

### Claim Rewards Step

```typescript
import { success, prefix, technical, formatTxHashForStdout } from '@onchain-bots/shared-terminal';

// Nothing to claim
console.log(prefix.skip('No rewards to claim'));

// Dry run
console.log(prefix.dryRun(`Would claim ${amount} AERO`));

// Success
console.log(success(`Claimed ${highlight(amount)} AERO`));
console.log(technical(formatTxHashForStdout('base', txHash)));
```

### Swap Step with Fallback

```typescript
import { success, error, prefix, action } from '@onchain-bots/shared-terminal';

console.log(action('Swapping AERO → USDC'));

// Aerodrome failed, trying 0x
console.log(prefix.fallback('Aerodrome route failed, trying 0x'));
console.log(prefix.zeroX(`Quote: ${aeroAmount} AERO → ${usdcAmount} USDC`));

// Success
console.log(success(`Swapped ${aeroAmount} AERO → ${usdcAmount} USDC`));
```

### Ledger Signing

```typescript
import { prefix, colors } from '@onchain-bots/shared-terminal';

console.log(prefix.ledger('Please confirm transaction on device'));
console.log(prefix.retry('Attempt 2/3 - device was locked'));
```

## Migration Guide

Replace old color imports:

```typescript
// Before
import { colors, success, error } from '../utils/colors.js';

// After
import { colors, success, error, prefix } from '@onchain-bots/shared-terminal';
```

Replace manual prefixes:

```typescript
// Before
console.log(`${colors.gray}[SKIP]${colors.reset} ${colors.dim}message${colors.reset}`);

// After
console.log(prefix.skip('message'));
```

Replace tx hash formatting:

```typescript
// Before
import { formatTxHashForStdout } from '../utils/txHash.js';

// After
import { formatTxHashForStdout } from '@onchain-bots/shared-terminal';
// Note: ChainKey type is now ChainId, ensure your chain strings match
```
