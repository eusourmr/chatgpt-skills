# Drift Watch

Drift Watch prevents a reviewed skill from silently keeping old trust evidence after its bytes change or its review expires.

For every bundled skill, the project records:

- reviewed immutable source revision;
- reviewed artifact SHA-256;
- current artifact SHA-256;
- review due date;
- drift state;
- required next action.

## States

- `current` — current bytes still match the reviewed artifact and evidence is within its freshness window.
- `changed-unreviewed` — current bytes differ from the reviewed artifact.
- `stale` — bytes still match, but the review freshness window expired.

Both `changed-unreviewed` and `stale` require `re-review-required`.

## Files

```text
trust/upstream/<skill-id>.json
```

## Commands

```bash
node scripts/update-drift-status.mjs --write --as-of YYYY-MM-DD
node scripts/update-drift-status.mjs --check --as-of YYYY-MM-DD
```

The explicit `--as-of` option makes fixtures and release qualification reproducible.

A scheduled workflow runs against the current date and raises an auditable alert when reviewed evidence is no longer current.

## Trust rule

**A new upstream version never inherits old trust automatically.**
