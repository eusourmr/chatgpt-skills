# Getting Started

This is the canonical installation and first-use guide for ChatGPT Skills / CS Navigator.

[Português do Brasil](GETTING_STARTED.pt-BR.md)

## Current versions

The project has independent release lines:

| Component | Current status |
|---|---|
| CS Navigator plugin | **0.7.0 stable** — Verifiable Trust I |
| CS Navigator 0.7.5 | **In qualification** — Container Guardian / Skill Containers foundation is merged, but 0.7.5 is not released yet |
| `chatgpt-skills` CLI on npm | **0.4.0** |

Do not treat 0.7.5 as the stable plugin until its native ChatGPT qualification and release gate are complete.

Stable release: [CS Navigator 0.7.0 — Verifiable Trust I](https://github.com/eusourmr/chatgpt-skills/releases/tag/cs-navigator-v0.7.0)

## Public Plugin Directory

When CS Navigator has a verified published package in the public OpenAI Plugin Directory, the simplest end-user path is:

```text
ChatGPT / Codex → Plugins → search "CS Navigator" → Install
```

The repository does **not** claim public-directory availability solely from a GitHub release or workspace marketplace import. Verify the published listing/version before directing users to this path.

Public plugin package updates are not pulled automatically from GitHub for bundled skill/metadata changes; maintainers must upload and publish the approved package update to the existing public plugin. See [Plugin Maintenance](PLUGIN_MAINTENANCE.md).

## Option A — Install CS Navigator in a compatible ChatGPT workspace

Where GitHub-managed plugin marketplaces are supported:

1. Open your ChatGPT workspace/plugin settings.
2. Add or import a GitHub plugin marketplace.
3. Use this repository as the source:

```text
Repository: https://github.com/eusourmr/chatgpt-skills
Path:       (leave empty)
Ref:        cs-navigator-v0.7.0
```

4. Install **CS Navigator** from the imported marketplace.
5. For controlled production use, prefer the release tag above instead of tracking `main`.

The stable CS Navigator plugin is skills-only. Its core pack does not require an MCP server, API key, external auth, or third-party gateway.

See [GitHub-native distribution](GITHUB_PLUGIN_DISTRIBUTION.md) for administrator and local-development details.

## Option B — Use the stable release artifact

The 0.7.0 GitHub release contains:

```text
cs-navigator-plugin-0.7.0.zip
cs-navigator-plugin-0.7.0.zip.sha256
```

Published plugin SHA-256:

```text
a1ac38a482f6e3ad839eefc3ed555c2cc001e24cf28b1be2740024d963b6048d
```

The release ZIP is the exact qualified production payload. Whether a product surface accepts direct ZIP installation depends on that surface. Do not treat a local ZIP merely existing on disk as proof that it is installed or active in ChatGPT.

## Option C — Use the CLI

The npm CLI follows its own version line.

Interactive start:

```bash
npx chatgpt-skills install
```

Inspect a skill before adopting it:

```bash
npx chatgpt-skills inspect cs-navigator
npx chatgpt-skills inspect openai-agents-sdk-builder
```

Verify an installation or export:

```bash
npx chatgpt-skills doctor
```

Install/export for supported targets:

```bash
npx chatgpt-skills install --bundle openai-ecosystem --tool codex-cli --scope project --yes
npx chatgpt-skills install --bundle education --tool cursor --scope project --yes
npx chatgpt-skills install --bundle data-analyst --tool agents-portable --scope project --yes
```

Prepare ChatGPT upload/export artifacts when direct GitHub marketplace import is unavailable:

```bash
npx chatgpt-skills install --skill cs-navigator --tool chatgpt-web --yes
```

Repository fallback:

```bash
npx --allow-git=root github:eusourmr/chatgpt-skills install
```

## How to use CS Navigator

CS Navigator is a **capability router**, not a requirement for every task.

Use it when you are deciding things such as:

- whether a task needs a skill at all;
- which CS capability is the smallest useful fit;
- whether an external skill has enough evidence to trust;
- whether a candidate is current, tested, stale, changed-unreviewed, or not evaluated;
- which materially equivalent option uses fewer permissions.

Example prompts:

```text
@CS Navigator
Do I need a skill for this, or can ChatGPT handle it directly?
```

```text
@CS Navigator
Which CS capability fits this goal with the smallest permission footprint?
```

```text
@CS Navigator
Is this skill current, tested, and sufficiently evidenced for this use?
```

If the task is ordinary and ChatGPT can do it directly, the correct route may be **native-only**.

Examples that should normally stay native:

```text
Summarize this PDF.
Correct this sentence.
What is 17 × 4?
Explain exponential backoff simply.
```

## Bundled Capability Pack I

One CS Navigator plugin install includes these chat-native capabilities:

- Regenerative Language Bridge
- Regenerative Impact Map
- Regenerative Resilience Plan
- Regenerative Adaptive Experiment

Bundled availability does **not** mean automatic activation, and bundling does not promote a skill from `designed` to `tested`.

## What 0.7.0 adds

CS Navigator 0.7.0 adds Verifiable Trust I:

- Trust Passports;
- Security Gate v2 evidence;
- Risk Labels;
- freshness and drift state;
- version-bound evidence;
- normalized behavior evals;
- trust-aware routing;
- governance and multilingual trust vocabulary foundations;
- OSTS 0.1.

A Security Gate `pass` is not a safety guarantee. A changed skill does not automatically inherit evidence from older bytes.

## What is happening in 0.7.5

0.7.5 extends trust from “what was reviewed” to “what may happen next.”

The Container Guardian foundation is already merged into `main` and has deterministic runtime tests for:

- no permission self-escalation;
- no fabricated citations, observations, or tool results;
- no unauthorized acquisition/external transfer;
- bounded retries/tool attempts;
- child workflow permissions no wider than the parent;
- auditable `ALLOW / CONFIRM / DEGRADE / STOP` decisions.

However, **0.7.5 is not the stable plugin yet**. Native ChatGPT qualification of the force-fresh RC remains a release gate.

See [Skill Containers](SKILL_CONTAINERS.md) and [0.7.5 plan](V075_VERIFIABLE_TRUST_II_CONTAINERS.md).

## 0.8 direction

The next product line is being designed around first-party **Everyday Trust Skills** and reusable **Community Profiles**: research, document-rule validation, academic integrity, text integrity, visual-intent preservation, and restoration workflows.

Track the planning issue: [#60 — v0.8.0 First-Party Skills I](https://github.com/eusourmr/chatgpt-skills/issues/60).

## Troubleshooting

If a route or result looks stale:

1. confirm which plugin/version is installed;
2. prefer the stable release tag for controlled use;
3. sync/reload the marketplace/plugin where the surface supports it;
4. do not assume an older test result applies after skill bytes change;
5. run `chatgpt-skills doctor` for CLI-managed installations/exports.

For bugs and documentation issues, open a GitHub issue.

Independent community project. Not affiliated with or endorsed by OpenAI.
