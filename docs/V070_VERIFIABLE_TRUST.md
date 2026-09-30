# CS 0.7.0 — Verifiable Trust I

## Product center

ChatGPT Skills has three visible surfaces:

1. a curated catalog;
2. CS Navigator;
3. repository-authored Regenerative skills.

They are not three separate products.

For 0.7.0 they share one center:

> **Verifiable trust and curation for skills.**

The catalog supplies evidence. Navigator uses that evidence to decide whether a skill is necessary and which candidate is the smallest useful fit. The Regenerative core remains a stricter repository-authored design track, not a trust rule imposed on third parties.

## User promise

For an exact skill version, a user should be able to answer:

- What is it?
- Who published it?
- Which exact source/artifact was reviewed?
- What can it read, write, send, or execute?
- Which security findings exist?
- What behavior was actually tested?
- How fresh is the evidence?
- Has upstream changed since review?
- Who reviewed it?
- What remains unknown?

0.7.0 must prefer an explicit unknown over an invented positive claim.

## Architecture

### 1. Trust Passport

Canonical machine-readable evidence should live under:

```text
trust/passports/<skill-id>.json
```

The passport references evidence; it does not duplicate every raw report.

Proposed top-level shape:

```json
{
  "schema_version": "0.1",
  "skill_id": "example",
  "identity": {},
  "provenance": {},
  "integrity": {},
  "execution": {},
  "permissions": {},
  "security": {},
  "behavior_evidence": {},
  "freshness": {},
  "governance": {},
  "recommendation": {},
  "known_gaps": []
}
```

### 2. Risk Label

Generated from Passport evidence:

```text
trust/risk-labels/<skill-id>.json
```

Required user-facing dimensions:

- Reads
- Writes
- Sends externally
- Executes
- Secrets
- Destructive potential
- Human confirmation
- Unknowns

A Risk Label is not a safety score.

### 3. Structured Security Reports

Security Gate v2 outputs:

```text
trust/security-reports/<skill-id>/<reviewed-ref>.json
```

Finding severity is evidence for review, not an automatic claim that the whole skill is safe or unsafe.

Each finding needs:

- rule id;
- category;
- severity;
- file/location when observable;
- evidence excerpt/hash where legally appropriate;
- automated/manual origin;
- disposition;
- reviewer note when manually adjudicated.

### 4. Behavior Evals

Separate plans from observed runs:

```text
trust/evals/plans/<skill-id>/<plan-id>.json
trust/evals/runs/<skill-id>/<run-id>.json
```

Every run must bind to:

- immutable source revision;
- exact artifact hash;
- execution surface;
- model/product context when available;
- case ids;
- pass/fail assertions;
- observed result;
- timestamp.

Optional metrics may include:

- tokens;
- elapsed time;
- cost;
- tool calls.

If a metric was not measured, store `null` / `not-collected`; never estimate it and present it as observed.

### 5. Upstream Drift Watch

Tracked source state:

```text
trust/upstream/<skill-id>.json
```

At minimum:

- reviewed immutable ref;
- reviewed hash;
- latest observed upstream ref;
- latest observed hash;
- checked_at;
- drift_state;
- changed_files or material-change summary;
- next action.

Initial drift states:

- `current`
- `changed-unreviewed`
- `source-unavailable`
- `stale`
- `superseded`

A positive recommendation cannot silently survive a material unreviewed source change.

### 6. Governance log

Public decisions:

```text
trust/reviews/reviewers.json
trust/reviews/decisions.jsonl
```

Decision outcomes:

- `accepted`
- `needs-evidence`
- `duplicate`
- `unsafe`
- `out-of-scope`
- `superseded`

Reviewer identities must be real, attributed, and never synthesized.

### 7. Localization

Trust vocabulary should be data-driven:

```text
i18n/trust/en.json
i18n/trust/pt-BR.json
i18n/trust/es.json
i18n/trust/fr.json
```

English is the canonical technical vocabulary for schemas. Localized files provide user-facing labels/explanations, not alternate evidence.

### 8. Open Skill Trust Standard

The portable standard lives under:

```text
spec/osts/0.1/
```

It should contain:

- JSON Schema;
- normative definitions;
- examples;
- conformance rules;
- change log.

The standard must be usable by another catalog without requiring CS Navigator or this repository's Regenerative framework.

## Trust state separation

Do not overload one field.

Different dimensions can have different evidence states.

Examples:

- provenance: verified;
- integrity: tested;
- security: inspected;
- execution: tested;
- usefulness: designed;
- recommendation: conditional.

This is more informative than one synthetic trust number.

## Security Gate v2 families

Minimum rule families for 0.7.0:

1. instruction override / prompt injection;
2. secret harvesting and exfiltration;
3. remote-download execution;
4. dangerous shell/process execution;
5. destructive filesystem/system operations;
6. external network/data destinations;
7. lifecycle/package hooks;
8. encoded/obfuscated content;
9. permission/description mismatch;
10. unexpected persistence or background behavior.

Every blocking family needs at least one deliberately unsafe test fixture proving that CI blocks it.

## Navigator 0.7 decision order

When capability-selection intent exists:

1. Can native ChatGPT complete the job?
2. Is a skill materially useful?
3. Which candidates actually cover the job?
4. What is each candidate's evidence freshness?
5. What permissions/side effects does each require?
6. What execution surface/setup is required?
7. What known gaps matter?
8. Select the smallest useful evidence-backed set.

If evidence cannot distinguish two candidates, Navigator should explain the tie instead of inventing a winner.

## Quality data

0.7.0 creates the evidence path before creating a rating.

Allowed:

- verified user review records;
- reproducible eval pass rates;
- measured token/time/cost;
- documented failure cases;
- like-for-like comparison fixtures.

Not allowed:

- inferred star ratings;
- popularity as quality;
- made-up reviews;
- a fabricated “trust score”.

## Regional and accessibility direction

Regional usefulness is a discovery dimension, not a lower trust tier.

0.7.0 should make room for metadata such as:

- locale;
- jurisdiction relevance;
- language support;
- accessibility considerations;
- low-bandwidth / low-resource suitability;
- public-sector / education / health / small-business applicability.

Any future Latin America or underserved-market collection passes the same evidence and security gates as every other collection.

## 0.7.0 implementation sequence

### A. Passport foundation
- schema;
- validator;
- first generated passports;
- backward mapping from existing trust files.

### B. Security Gate v2
- structured report;
- expanded rule families;
- adversarial fixtures;
- generated Risk Label.

### C. Drift Watch
- source/hash tracking;
- scheduled workflow;
- stale/re-review transitions;
- material diff report.

### D. Behavior Evals
- normalized plan/run schema;
- migrate existing in-product evidence;
- add objective metric fields;
- initial comparison fixture.

### E. Navigator Trust-Aware
- use Passport evidence;
- preserve anti-overrouting;
- surface permission/freshness trade-offs.

### F. Governance, i18n and OSTS
- public review log;
- reviewer registry;
- EN/PT-BR/ES/FR vocabulary;
- OSTS 0.1.

## Release gates

0.7.0 cannot be qualified unless:

- all bundled repository-authored skills have valid Passports;
- every Passport points to real evidence records;
- CI rejects broken evidence references;
- Security Gate v2 blocks malicious fixtures from each blocking family;
- drift detection can mark a reviewed source changed/unreviewed;
- Navigator preserves native-only and anti-overrouting behavior;
- no post-qualification bytes silently change;
- public release artifact has a verifiable hash and provenance link.

## Non-goals for 0.7.0

- becoming a mass marketplace;
- replacing the OpenAI Plugin Directory;
- collecting private user telemetry by default;
- claiming external adoption that has not happened;
- claiming community governance before external reviewers exist;
- forcing regenerative criteria onto third-party skills.
