# Open Skill Trust Standard (OSTS) 0.1

OSTS is an open evidence format for describing the trust state of an AI skill without reducing trust to one opaque score.

It is designed so another catalog, repository, agent runtime, or review system can adopt the evidence format without depending on CS Navigator or ChatGPT Skills infrastructure.

## 0.1 artifacts

- `trust-passport.schema.json` — identity, provenance, integrity, execution, permissions, security, behavior evidence, freshness, governance, recommendation, and known gaps.
- `security-report.schema.json` — structured Security Gate findings.
- `risk-label.schema.json` — plain-language permission/risk summary.
- `upstream-status.schema.json` — reviewed bytes versus current bytes and stale/re-review state.
- `eval-plan.schema.json` — reproducible task-level evaluation plans.
- `eval-run.schema.json` — observed evaluation runs with optional measured metrics.

## Principles

1. Evidence is version-bound.
2. Discovery is not validation.
3. No single score can represent all trust dimensions.
4. Unknown must remain visible.
5. Automated checks are evidence, not human approval.
6. A new upstream version does not inherit an older review automatically.
7. Measured metrics must be distinguished from inferred or uncollected metrics.
8. Regional relevance never lowers security, provenance, or evidence requirements.
9. Implementations may extend OSTS, but extensions must not silently change the meaning of core fields.
10. OSTS does not certify that a skill is safe.

## Conformance levels

### OSTS-Passport
A valid Trust Passport whose evidence references resolve.

### OSTS-Security
Passport plus a structured security report and Risk Label for the same artifact.

### OSTS-Continuous
OSTS-Security plus freshness/upstream drift status and re-review behavior.

### OSTS-Evaluated
OSTS-Continuous plus at least one reproducible behavior eval plan/run for the exact reviewed artifact.

Conformance describes evidence coverage, not skill quality.

## Versioning

0.x versions are experimental. Breaking changes are allowed but must be documented in `CHANGELOG.md`.

The goal for 1.0 is a stable, independently implementable evidence contract.
