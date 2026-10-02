# CS Navigator

CS Navigator is the ChatGPT Skills (CS) capability router that combines **Chat-Native First** with independent trust/evidence context.

For installation and first use, see [Getting Started](GETTING_STARTED.md).

## Current status

- stable production plugin: **0.7.0 — Verifiable Trust I**;
- 0.7.5: **in qualification** with Container Guardian / Skill Containers infrastructure merged;
- public Plugin Directory publication must be verified separately from GitHub/workspace distribution.

## User path

`describe the job → decide whether a skill is needed → smallest useful capability → understand evidence/permissions → continue`

The core stable workflow requires no server, API key, MCP gateway, external account, or local runtime.

## Native-first rule

Navigator is not a compulsory preprocessor for every prompt.

If ChatGPT can complete the task directly and a skill adds no material capability, use **native-only**.

Examples that normally stay native:

- simple arithmetic;
- ordinary rewriting;
- straightforward explanation;
- summarizing a provided file when no specialized workflow is needed.

## What ships in the stable plugin

- `SKILL.md` — navigation/routing contract;
- `agents/openai.yaml` — product-facing metadata;
- `references/catalog-snapshot.json` — deterministic trust/capability snapshot;
- Capability Pack I:
  - Regenerative Language Bridge
  - Regenerative Impact Map
  - Regenerative Resilience Plan
  - Regenerative Adaptive Experiment

The snapshot is generated from machine-readable CS sources and does not fetch mutable third-party skill instructions at runtime.

## Trust boundary

Navigator keeps distinct dimensions separate:

- execution evidence;
- recommendation state;
- freshness;
- version/review binding;
- permissions/Risk Label;
- known gaps.

`indexed / not-evaluated` is discovery only.

A changed artifact does not automatically inherit evidence from older bytes.

Security Gate v2 `pass` means no configured blocking pattern was observed. It is not a universal safety guarantee.

Navigator does not invent an opaque 0–100 trust score or force a winner when evidence does not distinguish candidates.

## Smallest useful set

Prefer one capability. Recommend two or three only when each contributes a distinct necessary function.

If no covered capability fits, report a coverage gap instead of inventing a skill.

When options are materially equivalent, prefer the path with lower permissions, fewer integrations, and less unnecessary data movement.

## 0.7.5 integration boundary

The deterministic Container Guardian runtime now exists in the repository and can evaluate proposed actions as:

- `ALLOW`
- `CONFIRM`
- `DEGRADE`
- `STOP`

The Navigator adapter preserves STOP and requires a new Guardian decision for materially different alternative paths.

Native ChatGPT skill instructions must **not** claim that deterministic Guardian enforcement executed unless an actual runtime decision record is present.

The 0.7.5 force-fresh candidate remains in native qualification; therefore 0.7.5 is not yet the stable plugin.

## Validation

Repository CI checks the deterministic snapshot, trust/evidence data, external-source boundaries, packaging, Container Guardian fixtures/evals, and Navigator rules.

Native ChatGPT behavior is qualified separately. Deterministic runtime tests do not substitute for in-product native qualification.

Independent community project. Not affiliated with or endorsed by OpenAI.
