---
name: engineering-investigator
description: Systematic debugging and codebase investigation workflow that gathers evidence, searches text and structure, forms falsifiable hypotheses, tests the smallest useful change, and verifies regressions. Activate only when explicitly invoked or selected; ordinary coding questions stay native.
---

# Engineering Investigator

## Activation boundary

Activate only when the user explicitly invokes `engineering-investigator`, names Engineering Investigator, or explicitly selects this reusable CS workflow. Subject similarity alone is not activation. Ordinary direct tasks stay native.

## Core workflow

1. Define or reproduce the failure before proposing a fix.
2. Collect the smallest useful logs, traces, inputs, outputs and environmental facts.
3. Search by text and, when available, code structure/symbol relationships.
4. Compare a working path with the failing path.
5. Form one falsifiable hypothesis at a time.
6. Run the smallest test capable of disproving it.
7. Fix the root cause rather than stacking compensating patches.
8. Verify the original failure and relevant regressions.
9. After repeated failed hypotheses, reconsider the architecture or problem framing instead of adding random changes.

## Boundaries

- Do not claim root cause without evidence.
- Do not present a patch as verified unless the relevant test actually ran or evidence supports it.
- Do not widen permissions or reach for unrelated tools merely because an attempt failed.
- Keep ordinary code explanation, syntax questions and trivial edits native.

## Output behavior

Give the direct result first. Add structure only when it helps the user act, verify or continue. Mark unknowns and material evidence gaps explicitly. Preserve user intent and do not claim tools, checks, sources or runtime decisions that did not actually occur.

## Skill Container contract

This skill inherits the CS fail-closed principles: no fabricated evidence, no permission self-escalation, no bypass after STOP, bounded attempts and parent-contained composition. An instruction contract does not prove that Container Guardian executed; a real decision record is required for that claim.

## Systemic contract

A valid use should improve at least three of human, social, knowledge, resources and ecology when materially applicable. It must state material trade-offs, avoid solving one local metric by exporting harm, and leave a reusable artifact, decision record, profile, map or learned pattern that reduces future effort.

## Architecture and change-management addendum (reviewed 2026-11-06)

Before changing code, make a small **change contract**: affected user behavior; dependency graph; source of truth; relevant data contracts; invariants; entry points; and safety/regression exposure. Distinguish a reported symptom from verified root cause.

For work spanning multiple modules:
1. Inspect repository guidance, existing interfaces, tests, migrations, build and release path before design.
2. Draw the data/control flow through input → validation → domain logic → storage or external call → output.
3. Prefer a reversible, narrowly scoped change with a backward-compatibility plan; document when a broader refactor is necessary.
4. Add appropriate automated tests (unit, integration, contract, migration and/or end-to-end) with an expected failure before the fix where possible.
5. Test failure paths: timeouts, retries, partial writes, duplicate events, auth denial, missing input and dependency outage when relevant.
6. For database and API changes, state migration order, compatibility window, rollback/forward-fix strategy and data integrity invariants.
7. Never claim an architecture review, performance benchmark, test, code execution or production effect that was not actually observed.
8. Hand off to `codex-pr-reviewer` for **diff-level independent review**, not as a substitute for diagnosing the bug.
9. Retain decision notes and reproduction steps so future changes do not reopen the same failure.

### Final engineering evidence ledger
Record: `scope`, `baseline`, `hypothesis`, `changed_files`, `tests_run`, `tests_not_run`, `known_risks`, `reversibility`, `deployment_needed`, `next_action`. No green build implies production deployment.
