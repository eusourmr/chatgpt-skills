# Executive Summary — ChatGPT Skills

ChatGPT Skills (CS) is an independent, human-governed catalog and trust layer for reusable ChatGPT/Codex capabilities. The project is no longer only a curated list: it now combines discovery, evidence, distribution, runtime containment foundations, and a path for first-party/community extensibility.

## Current release state (2026-10-11)

- **CS Navigator 0.17.0 — Learning & Academic Mastery:** latest GitHub release and currently installed private ChatGPT plugin.
- **Evergreen Core:** six distributed skills, live GitHub-backed capability registry via public read-only MCP. MCP Inspector confirmed four tools and two healthcare exclusions through `get_capability`.
- **Evidence boundary:** MCP Inspector success is not native ChatGPT semantic qualification or OpenAI public approval. The new learning and academic-writing capabilities remain `designed` until separately qualified.
- **Public Plugin Directory:** not published. Final native semantic qualification and submission/review remain outstanding.
- **CLI/npm:** `chatgpt-skills@0.4.0` is an independent release line.

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

## Current product direction

Focus on 0.17.0 native ChatGPT qualification and public Plugin Directory submission before opening a larger feature release. The 0.16 Evergreen architecture is incorporated into 0.17.0, not a separate public release. Historical 0.8 planning remains in repository history.

## Project principle

> **No evidence → no invented fact. No permission → no self-escalation. No authorized path → stop.**

The project remains independent and is not affiliated with or endorsed by OpenAI.
