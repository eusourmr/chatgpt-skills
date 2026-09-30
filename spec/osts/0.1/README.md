# Open Skill Trust Standard (OSTS) 0.1 — Draft

OSTS is an open, implementation-independent evidence format for describing the trust state of an AI skill or agent workflow.

It is intentionally **not** a certification system and **not** a universal safety score.

## Purpose

An implementation should be able to answer:

1. What exact artifact is being discussed?
2. Where did it come from?
3. What can it access, change, send, or execute?
4. What security evidence exists?
5. What behavior was actually tested?
6. How fresh is the evidence?
7. Who reviewed it and what conflicts exist?
8. What remains unknown?

## Normative principles

An OSTS implementation MUST:

- bind positive trust claims to an immutable artifact or source revision;
- distinguish discovery from review, testing, and recommendation;
- preserve unknowns and known gaps;
- separate permission/security evidence from task-quality evidence;
- record evidence freshness;
- avoid turning popularity into trust;
- avoid inventing reviews, benchmarks, measurements, or reviewer identities;
- make machine-readable evidence available for audit.

An implementation SHOULD:

- publish artifact hashes;
- record structured security findings;
- provide reproducible behavior evals;
- expose drift/re-review status;
- disclose conflicts of interest;
- support accessible plain-language labels;
- preserve evidence history rather than silently rewriting it.

## Schemas in 0.1

- `trust-passport.schema.json`
- `security-report.schema.json`
- `risk-label.schema.json`
- `upstream-status.schema.json`
- `eval-plan.schema.json`
- `eval-run.schema.json`

## Conformance profiles

Profiles describe **available evidence**, not quality tiers.

### Discovery profile

Minimum:

- skill identity;
- canonical source;
- publisher when known;
- discovery state.

No positive trust claim is implied.

### Reviewed Artifact profile

Requires:

- immutable source revision;
- artifact hash;
- permission declarations;
- review timestamp;
- governance attribution;
- known gaps.

### Behavior Evidenced profile

Adds:

- version-bound eval plan;
- observed run;
- assertions/results;
- execution surface;
- measured metrics only when actually collected.

### Continuously Verified profile

Adds:

- freshness window;
- upstream/current hash comparison;
- drift state;
- re-review transition;
- immutable history of prior review evidence.

## Recommendation

Recommendation is a separate policy decision.

A conforming catalog may use its own recommendation states, but it MUST explain the evidence and context behind them and MUST NOT imply that recommendation is a permanent safety guarantee.

## Interoperability

OSTS is designed so another catalog can adopt the schemas without:

- using CS Navigator;
- using the ChatGPT Skills repository;
- adopting the Regenerative Skills philosophy;
- depending on a proprietary gateway.

## Version 0.1 status

0.1 is a working draft used by ChatGPT Skills 0.7.0.

Breaking changes are allowed before 1.0, but must be recorded in the change log.
