---
name: codex-pr-reviewer
description: Review pull requests with Codex using repository-specific business rules, risk-ranked findings, evidence from changed lines, regression checks, and a machine-readable policy that teams can version with the code.
---

# Codex PR Reviewer

## Description

Create repeatable PR reviews that combine normal engineering checks with repository-specific business rules. Findings must be tied to changed code, ranked by impact, and written as actionable review comments. Prefer a few high-confidence issues over generic style commentary.

## Use Cases

- Review pull requests with custom business invariants.
- Enforce rules such as “money fields must use decimal”, “destructive actions require confirmation”, or “PII must not enter logs”.
- Generate a focused Codex review prompt from a versioned policy file.
- Separate blockers, warnings, and non-blocking suggestions.
- Add CI review preparation without giving the reviewer write access to production systems.

## Installation

Install this skill with the repository CLI or copy this folder into your skills directory. Store team rules in a JSON file committed to the repository.

## Workflow

1. Read the PR goal, diff, tests, and repository guidance before judging code.
2. Load business rules and classify each as blocker, warning, or advisory.
3. Inspect changed behavior first: authorization, data integrity, money, privacy, concurrency, migrations, external calls, and rollback.
4. Cite exact files/lines or diff hunks for every finding.
5. Distinguish proven defects from questions or assumptions.
6. Do not invent failures in unchanged code merely to increase review volume.
7. Conclude with test gaps and the smallest safe next action.

## Example

```text
Use $codex-pr-reviewer to review PR #42. Apply rules.json, focus on payment rounding and role authorization, and return only high-confidence findings.
```

```bash
python scripts/build_review_prompt.py rules.json --output .codex-review-prompt.md
codex exec "$(cat .codex-review-prompt.md)"
```

## Business Rule Format

```json
{
  "rules": [
    {"id": "money-decimal", "severity": "blocker", "rule": "Monetary values must not use binary floating point."}
  ]
}
```

## Output Contract

Return findings ordered by severity, evidence, violated rule, why it matters, suggested fix, and missing tests. If there are no high-confidence findings, say so explicitly.

## References

- https://developers.openai.com/

## Repository lifecycle quality gate (reviewed 2026-11-06)

A passing automated workflow alone is not approval for merge. Before recommending release, inspect the exact base/head revisions and distinguish:
- **Static:** syntax, formatting, types, lint and unit tests.
- **Behavior:** integration, API contract and user-journey tests.
- **Operational:** migration sequencing, compatibility, secrets, permissions, monitoring and rollback/forward-fix.
- **Human:** policy authorization, privacy-sensitive diffs, architecture change approval and release sign-off.

For changes in money, personal data, authentication, asynchronous operations and external APIs, ask whether the test proves the required invariant, not simply whether it passed. Check negative and boundary cases. Do not assign a confidence percentage without an explicit validated calibration method.

### Branch, PR and release management
1. Preserve the protected stable branch; make scoped commits on a feature branch.
2. Explain *why* each changed file is necessary; avoid unrelated cleanup.
3. Compare rendered or affected outputs before and after; identify changed interface contracts.
4. Confirm tests were run against the **same commit** being merged.
5. Identify merge dependencies, environment variables, migrations and documentation drift.
6. Separate "merged", "deployed", "enabled for users", "observed healthy" and "released". These are different states.
7. Require explicit user/owner authorization for destructive migrations or production actions; do not interpret a PR success as blanket consent.
8. Keep evidence of deployment, rollback/forward-fix and a specific post-release health check, where material.

### Review record
`PR, base_sha, head_sha, scope, invariants, findings[file:line], evidence_type, CI_runs, missing_tests, approvals, merge_state, deployment_state`.

If the review has no verified blockers, say **no high-confidence blockers found in inspected scope**, not that the change is fully safe or universally tested.
