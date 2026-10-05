# CS Connect Navigator

**CS Connect** is the public product name. `cs-navigator` is the preserved technical router ID. The Navigator is the ChatGPT Skills (CS) capability router that combines **Chat-Native First** with independent trust/evidence context.

For installation and first use, see [Getting Started](GETTING_STARTED.md).

## Current status

- public product line: **CS Connect 0.9.0**;
- qualified package: **R2**;
- exact ZIP SHA-256: `3379f932301b707fcf935f8f4f6f45bdea10d3e7277daced2849f93c3f824cce`;
- 0.7.5: absorbed as the internal Skill Containers / Container Guardian foundation;
- 0.8: absorbed into 0.9;
- next product line: **0.10**.

Public-directory publication is a separate OpenAI review/publish state and must not be inferred from GitHub qualification.

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

## What ships in CS Connect 0.9.0

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

0.7.5 is preserved as historical foundation evidence and is not a standalone public release. Its Container Guardian / Skill Containers work is incorporated into 0.9.0. Claims about deterministic Guardian execution still require an actual decision record; package qualification does not prove runtime enforcement occurred in a specific chat.
