---
name: code-lifecycle-governor
description: Coordinate source-code change management across scope, branches, versioning, CI, PRs, compatibility, migrations, release and rollback. Use for explicit multi-step engineering governance; ordinary debugging stays native or uses Engineering Investigator.
---

# Code Lifecycle Governor — CS experimental candidate

**State: designed / not host-tested.** This skill is intentionally in `experiments/` until independent behavior and repository workflows are qualified.

## Scope and anti-overlap
- Owns: orchestrating a change from accepted requirement through design, branch, implementation, verification, review, merge, deployment and post-release observation.
- Delegates **root-cause investigation** to `engineering-investigator` and **diff-level independent evaluation** to `codex-pr-reviewer`.
- Delegates native short coding questions to the ChatGPT/Codex host. Do not create project paperwork for a one-line change.
- Does not grant tool permissions; never run commands or alter remotes without host/user authorization.

## Evidence-gated lifecycle

1. **Requirement contract** — concrete user outcome, scope, explicit invariants, acceptance tests, constraints, non-goals. Keep unrequested product changes out.
2. **Repository baseline** — exact repo, base branch and HEAD/commit; build instructions, owners, environment, platform, tests, release/rollback reference. Verify before claiming.
3. **Change plan** — affected modules, external dependencies, interfaces, data schema, auth boundaries, migrations, compatibility and reversibility. Separate assumptions from observed facts.
4. **Branch and implementation** — scoped feature branch, minimal cohesive diffs, durable commit messages; retain untouched stable line. Follow the repository's actual branch policy rather than guessing.
5. **Automated evidence** — syntax/lint/types where configured; relevant unit, contract/integration and regression tests. Name runs by exact commit, with links/logs. A queued job is not a pass.
6. **Review contract** — findings ranked by risk and anchored in a changed line/behavior; decide blocker vs follow-up with human governance. Do not auto-merge a failing or unreviewed PR.
7. **Merge gate** — checks passed **on the reviewed commit**, dependent changes resolved, approval or user authorization recorded; no fabricated merge or hidden branch rewrites.
8. **Deployment gate** — separate merge from deploy, feature flag, data migration, end-user activation and stable release. Identify credentials/security changes without echoing secrets.
9. **Recovery** — know whether rollback is safe after a schema/data change. If rollback could lose information, use an approved forward-fix plan and preserve data.
10. **Outcome check** — observe application health or relevant acceptance behavior after rollout; attach evidence and call unresolved work `pending` instead of `done`.

## High-risk checks
- **Money:** decimal handling, rounding, audit trail and idempotency; not just unit-test green.
- **Database:** backup, compatible schema migration, data backfill, dry run, irreversible step approval.
- **Identity/secrets:** least privilege, no plaintext credentials, safe errors/logs.
- **External API:** pagination, timeouts, retries, throttling, non-200s, partial state and upstream schema drift.
- **UI:** critical workflow, keyboard/touch, loading/error states and regression screenshots when material.
- **Releases:** version, artifact provenance, checksum, smoke test, monitoring and rollback plan.

## Status vocabulary
`designed` (instructions) → `implemented` (source change) → `static_test_pass` (scoped automated tests) → `reviewed` (human/diff review) → `merged` (Git ref) → `deployed` (runtime) → `host_loaded` (app/plugin) → `outcome_verified` (observed goal).

The labels are **separate**: a later label is not implied by an earlier one, and branches may skip steps only when the user/repo actually authorizes the exception.

## Compact output
Use a table or short paragraph: **state now · validated evidence · blocker/unknown · safest next action**. On request, include a structured release decision with exact version, commit and rollback target. Never turn a general permission to "advance" into production deployment authorization.
