# GitHub-native CS Navigator distribution

GitHub marketplace import is the managed-workspace distribution path for CS Navigator.

For the canonical user guide, see [Getting Started](GETTING_STARTED.md). For release/update responsibilities, see [Plugin Maintenance](PLUGIN_MAINTENANCE.md).

## Current status

- Stable CS Navigator plugin: **0.7.0 — Verifiable Trust I**
- Stable release tag: `cs-navigator-v0.7.0`
- 0.7.5: **in qualification**, not yet the stable plugin
- CLI/npm release line: independent, currently `0.4.0`

## Architecture

```text
GitHub repository
  -> .agents/plugins/marketplace.json
  -> plugins/cs-navigator/plugin.json
  -> plugins/cs-navigator/skills/*
  -> managed ChatGPT workspace marketplace
```

The stable plugin is skills-only and does not require MCP, an API key, an external server, or a third-party gateway for its core pack.

GitHub is the managed source for this path. ChatGPT imports and synchronizes a copy of the marketplace/plugin; it does not fetch mutable skill instructions on every user message.

## Import in a compatible managed ChatGPT workspace

For a workspace administrator:

1. Open **Workspace settings → Plugins**.
2. Select **Add → Import marketplace**.
3. Source: `https://github.com/eusourmr/chatgpt-skills`
4. Path: leave empty; the marketplace is at `.agents/plugins/marketplace.json`.
5. Choose a ref deliberately:
   - `main` for controlled development/testing;
   - a qualified release tag such as `cs-navigator-v0.7.0` for stable use;
   - a full commit SHA when exact immutability is required.
6. Import the marketplace and authorize GitHub when prompted.
7. Open **CS Navigator** and set the workspace installation policy.

## How updates work

A GitHub marketplace imported by a workspace checks for updates **daily**.

To request an immediate refresh:

```text
Workspace settings → Plugins → Marketplaces → <marketplace> → Sync now
```

A sync can update existing plugins and add new marketplace entries.

If an update to an existing plugin is invalid, ChatGPT retains the last working imported version while reporting the failed update.

### Important: `main` versus tag/SHA

If the marketplace tracks `main`, valid merged plugin changes can arrive on the next daily sync or after **Sync now**.

If the marketplace is pinned to a release tag or SHA, it intentionally stays on that revision. A later 0.7.5 release will **not** replace a pinned 0.7.0 deployment until the workspace source ref is deliberately advanced.

## This is not the public Plugin Directory

GitHub marketplace sync is a workspace-managed distribution path.

It is **not** the same as publishing CS Navigator to the public OpenAI Plugin Directory. Public-directory updates to bundled skills/metadata require a new ZIP package version to the existing public plugin, checks/review, and publication.

See [Public Plugin Submission](PUBLIC_PLUGIN_SUBMISSION.md) and [Plugin Maintenance](PLUGIN_MAINTENANCE.md).

## Local / Codex development

For supported local clients:

```bash
codex plugin marketplace add eusourmr/chatgpt-skills --ref main
```

Use a release tag instead of `main` when you need a stable, controlled version.

## Trust boundary

The canonical plugin bytes, release artifact, evidence, and version must stay aligned. A changed skill does not inherit old trust merely because its name is unchanged.

The ZIP/export path remains available for surfaces that do not use GitHub marketplace import.

Independent community project. Not affiliated with or endorsed by OpenAI.
