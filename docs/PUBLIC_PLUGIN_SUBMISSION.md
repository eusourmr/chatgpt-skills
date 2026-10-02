# Public OpenAI Plugin Directory — CS Navigator

This document governs the public-directory packaging and update path for CS Navigator.

For stable installation/use instructions, see [Getting Started](GETTING_STARTED.md). For the permanent update checklist, see [Plugin Maintenance](PLUGIN_MAINTENANCE.md).

## Current project state

Stable repository release:

- plugin: **CS Navigator 0.7.0 — Verifiable Trust I**
- tag: `cs-navigator-v0.7.0`
- production artifact: `cs-navigator-plugin-0.7.0.zip`
- SHA-256: `a1ac38a482f6e3ad839eefc3ed555c2cc001e24cf28b1be2740024d963b6048d`
- submission metadata: `submission/cs-navigator-0.7.0.json`

The repository does **not** treat GitHub release, workspace marketplace import, or native QA as proof that the plugin is publicly listed. Public availability must be verified in the OpenAI plugin submission portal/directory before making that claim.

At the time this documentation was refreshed, a directory search from the available plugin discovery surface did not verify a public CS Navigator listing. Treat public-directory status as **not verified** until the portal/directory confirms it.

## Intended public user experience

Once a package version is approved and published:

```text
ChatGPT / Codex
  -> Plugins
  -> search "CS Navigator"
  -> Install
  -> @CS Navigator
```

Availability can still vary by plan, workspace, role, region, and supported surface.

## Submission type

CS Navigator is currently **skills-only**.

Use the current versioned submission file as the source of truth for listing copy, capabilities, starter prompts, review cases, and release notes.

For 0.7.0:

```text
submission/cs-navigator-0.7.0.json
```

## Build the package

```bash
npm run validate
npm run build:public-plugin
```

The production ZIP must be rebuilt from the exact qualified source and its SHA-256 must be verified before submission/publication.

## Initial publication

For an initial public listing:

1. use the verified OpenAI developer identity that will own the plugin;
2. upload the complete plugin ZIP;
3. resolve required automated findings;
4. submit the selected package version for review;
5. after approval, explicitly choose **Publish plugin**;
6. verify the public directory entry.

Approval alone does not publish the plugin.

## Updating an already-published CS Navigator

For CS Navigator skill/metadata/package changes, **GitHub changes do not automatically update the public Plugin Directory**.

Use the same existing public plugin:

1. finish repository qualification;
2. increment the plugin package version;
3. build the complete new ZIP from the qualified source;
4. open the existing CS Navigator plugin in the OpenAI submission portal;
5. upload the new ZIP as a new package version;
6. review automated findings;
7. complete the required review flow;
8. after approval, publish the approved package version;
9. verify the directory shows the intended version;
10. record publication evidence in the release issue.

Do not create a duplicate public plugin for routine version updates.

A published package update replaces the previously published package version.

## Why GitHub sync is different

A managed workspace that imported our GitHub marketplace can receive repository changes through daily sync / **Sync now**.

That mechanism is separate from the universal public Plugin Directory review/publication flow.

## 0.7.5 rule

Do not upload or publish 0.7.5 publicly until:

- force-fresh native qualification passes;
- canonical plugin bytes are promoted deliberately;
- evidence is rebound to the new bytes;
- final production CI/release gate passes;
- the exact production ZIP is frozen and hashed.

Independent community project. Not affiliated with or endorsed by OpenAI.
