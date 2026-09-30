# Trust Passport

A **Trust Passport** is the 0.7 evidence record for one exact skill artifact.

It answers a narrower and more useful question than “is this skill safe?”:

> What exact version was reviewed, what can it do, what evidence exists, how fresh is that evidence, and what remains unknown?

A Passport is **not** a safety guarantee, popularity score, certification, or permanent recommendation.

## Why it exists

A skill may be trustworthy on one dimension and uncertain on another.

For example:

- provenance may be verified;
- file integrity may be tested;
- security may be inspected;
- execution may be tested;
- task-level usefulness may still be only designed;
- an upstream change may make the previous review stale.

The Passport keeps those dimensions separate.

## Location

Checked-in Passports live at:

```text
trust/passports/<skill-id>.json
```

The draft portable schema lives at:

```text
spec/osts/0.1/trust-passport.schema.json
```

## Integrity algorithm

0.7-A uses `sha256-manifest-v1`.

For each skill file declared in `installer/manifest.json`:

1. hash the raw file bytes with SHA-256;
2. sort entries by skill-relative path;
3. build one UTF-8 manifest line per file:

```text
<path>\0<sha256>\n
```

4. hash the complete manifest with SHA-256.

The resulting digest is `integrity.artifact_sha256`.

This makes the Passport sensitive to both content and the declared file set.

## Source binding

`provenance.reviewed_source_revision` is an immutable 40-character Git commit.

Normal validation recomputes the current artifact bytes and detects drift from the checked-in Passport.

CI additionally runs strict source verification against Git history. The canonical skill path must be byte-identical to the reviewed source revision. If skill bytes change, the old Passport cannot silently remain current.

## Evidence references

Passports link to evidence already present in the repository instead of pretending that every skill has the same evidence.

Examples:

- `trust/skills.json`
- `trust/execution.json`
- `trust/in-product-tests.json`
- `trust/in-product-runs.json`
- `scripts/security-check.mjs`

Missing references are validation errors.

## Governance honesty

The initial Passports explicitly record that the current review is maintainer self-review and that independent review has not yet occurred.

Future contributors must be recorded by their real identity. The project must never invent reviewers or imply independent governance that has not happened.

## Freshness

Each Passport includes:

- review date;
- stale-after interval;
- due date;
- current freshness state.

0.7-C will add scheduled upstream drift detection and automatic re-review transitions.

## Generate and validate

```bash
node scripts/generate-trust-passports.mjs --write
node scripts/generate-trust-passports.mjs --check
node scripts/validate-trust-passports.mjs
```

In repository CI, strict provenance binding is also checked:

```bash
node scripts/validate-trust-passports.mjs --verify-git-source
```

## Design rule

When evidence is missing, the Passport must say that it is missing.

**Unknown is a valid result. Fabricated confidence is not.**
