# Executive Summary — ChatGPT Skills

ChatGPT Skills (CS) is an independent, human-governed catalog and trust layer for reusable ChatGPT/Codex capabilities. The project is no longer only a curated list: it now combines discovery, evidence, distribution, runtime containment foundations, and a path for first-party/community extensibility.

## Current release state

- **CS Navigator plugin 0.7.0 — Verifiable Trust I:** stable and natively qualified.
- **CS Navigator 0.7.5 — Verifiable Trust II & Containers:** in qualification; Container Guardian foundation is merged, but 0.7.5 is not yet the stable plugin.
- **`chatgpt-skills` CLI/npm 0.4.0:** independent release line.

## What exists today

### Discovery and curation

- machine-readable catalog metadata;
- provenance separation between OpenAI-published, project-verified, and community-authored entries;
- curated bundles and a public roadmap;
- human-governed contribution rules.

### Verifiable trust

0.7.0 adds:

- Trust Passports;
- Security Gate v2 evidence;
- Risk Labels;
- freshness/drift tracking;
- version-bound review evidence;
- normalized behavior evals;
- trust-aware Navigator routing;
- governance and multilingual trust vocabulary;
- OSTS 0.1.

Trust is deliberately multidimensional. The project does not collapse evidence into an invented universal score.

### Chat-Native First

CS Navigator first asks whether a skill is needed at all.

Ordinary tasks should stay native when a skill adds no material capability. When a skill is useful, Navigator should prefer the smallest evidence-backed path with the least unnecessary permission/integration/data movement.

### Containment — 0.7.5

The Container Guardian foundation now provides deterministic runtime decisions:

`ALLOW / CONFIRM / DEGRADE / STOP`

It enforces boundaries for evidence fabrication, permission self-escalation, unauthorized acquisition/transfer, retry budgets, and parent/child workflow permissions.

This is defense in depth, not a claim of perfect safety or zero hallucination. Native ChatGPT qualification remains required before 0.7.5 release.

## Distribution

The project supports distinct distribution paths:

- public OpenAI Plugin Directory, when/if the plugin package version is approved and published;
- GitHub-managed plugin marketplaces for compatible managed workspaces;
- deterministic ZIP artifacts for release/qualification/controlled upload paths;
- CLI installation/export for Codex, Cursor and portable Agent Skills targets.

These paths have different update semantics. See [Getting Started](docs/GETTING_STARTED.md) and [Plugin Maintenance](docs/PLUGIN_MAINTENANCE.md).

## Next product line — 0.8

0.8 is being planned around **first-party Everyday Trust Skills** and reusable **Community Profiles**.

Initial directions include:

- evidence-first research;
- document compliance auditing with versioned rule profiles such as ABNT-BR;
- academic integrity review;
- text-integrity editing;
- visual-intent preservation;
- photo-restoration conservation;
- art critique workflows.

The goal is not a larger prompt collection. A CS first-party skill should add a repeatable method, verifiable rule, safeguard, or workflow that plain ChatGPT does not already provide well enough natively.

## Project principle

> **No evidence → no invented fact. No permission → no self-escalation. No authorized path → stop.**

The project remains independent and is not affiliated with or endorsed by OpenAI.
