# Behavior Evals

0.7-D separates **what should be tested** from **what was actually observed**.

The existing in-product evidence remains authoritative history. The normalized eval layer exports it into one file per plan and one file per run so other tools can inspect and compare evidence without parsing a monolithic log.

## Paths

```text
trust/evals/plans/<plan-id>.json
trust/evals/runs/<run-id>.json
```

## Metrics

The run schema supports:

- input tokens;
- output tokens;
- elapsed time;
- cost;
- tool-call count.

These values are **null unless actually measured**.

The current migrated ChatGPT qualification runs therefore use:

```json
"measurement_state": "not-collected"
```

The project must never reconstruct or estimate these values and present them as observed telemetry.

## Comparisons

Future like-for-like comparisons must:

1. use the same task fixture or document why fixtures differ;
2. bind results to exact skill versions/artifact hashes;
3. preserve failure cases;
4. separate measured metrics from qualitative review;
5. avoid an overall winner when evidence cannot support one.

## Commands

```bash
node scripts/export-behavior-evals.mjs --write
node scripts/export-behavior-evals.mjs --check
```

Schemas live at:

```text
spec/osts/0.1/eval-plan.schema.json
spec/osts/0.1/eval-run.schema.json
```
