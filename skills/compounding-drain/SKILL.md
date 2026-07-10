---
name: compounding-drain
description: Safely work one eligible item from a repository's compounding queue through validation and review. Use for a scheduled or on-demand queue drain, to implement the highest-ranked ready improvement, or to reconcile git-verifiable queue status without acting on blocked, operator-only, oversized, or already claimed work.
---

# Compounding Drain

Work at most one eligible queue item per run. Treat the repository selector and the item's accepted
criteria as the contract.

## Safety boundary

This is a development worker. Do not access secrets, move money, mutate production or third-party
state, weaken a validation gate, force-push, delete unmerged work, or push a protected default branch.
If an item requires any of those actions, leave it blocked for the operator.

## 1. Establish fresh state

Read repository instructions and confirm `docs/compounding/` and the selector exist. Refresh remote
metadata when allowed, identify the default branch, and run the selector's structured output from a
fresh base. If the repository or queue is absent, report the setup gap and stop.

On every run, reconcile only git-verifiable status drift:

- mark an open item done when its referenced work is demonstrably merged;
- correct status prose that contradicts the default branch;
- surface stale claims and closed-but-unmerged reviews without inventing resolution.

Land status-only repairs through the normal review path. Do not claim external state that this
session cannot verify.

## 2. Select and claim

If no item is eligible, report a clean no-op with blocked and review-needed counts. Otherwise select
the selector's highest-ranked eligible item and read its full goal, evidence, scope, and acceptance
criteria.

Claim before implementation using the repository's collision-resistant branch or review mechanism.
If another worker already owns the claim, rerun selection and choose the next eligible item. Never
work two items in one drain.

## 3. Implement to the contract

Stay within the item's acceptance criteria. Route neighboring discoveries to new queue entries.
For behavioral fixes, demonstrate the weakness with a failing regression check before fixing it,
then show the same check passing. Explain when a documentation, configuration, or pure-refactor item
has no meaningful held-in failure.

If the item belongs in canonical AI Tools, use `promote-skill` or make the scoped upstream change;
do not fork a shared workflow inside the consumer repository.

## 4. Validate and review

Run the repository's actual green checks. Inspect the diff for scope creep and grader weakening. If
validation fails outside the item's safe scope, preserve the work as draft, record the failure, and
leave the item in progress.

When acceptance criteria pass:

- update the queue item to done in the same change;
- cite the review or commit that satisfies it;
- push only the claim branch;
- leave code or behavior changes for human review unless the repository explicitly authorizes a
  narrower queue-only auto-merge path.

Report the selected item, proof, checks, review state, status hygiene, and remaining blockers.
