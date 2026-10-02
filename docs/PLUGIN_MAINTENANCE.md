# CS Navigator Plugin Maintenance

[Português do Brasil](PLUGIN_MAINTENANCE.pt-BR.md)

This document is the permanent release/update checklist for CS Navigator distribution.

## Never confuse these distribution paths

| Path | Does a GitHub change update installed users automatically? | What we must do for a new CS Navigator version |
|---|---|---|
| GitHub marketplace imported into a managed workspace and tracking `main` | **Yes, after marketplace sync** | Merge valid changes, then wait for daily sync or use **Sync now** |
| GitHub marketplace pinned to a release tag/SHA | **No version jump** | Move/update the marketplace source ref deliberately to the new qualified tag/SHA |
| Manually uploaded plugin ZIP in a workspace | **No** | Open the plugin and upload the new version |
| Public OpenAI Plugin Directory | **No for metadata/bundled skill changes** | Upload a new ZIP to the **existing plugin**, pass checks/review, then publish the approved package version |
| Hosted MCP implementation behind an already-published plugin | Eligible server/tool changes may be picked up through OpenAI's MCP scanning flow | Deploy server changes and review/rescan as required; this does not apply to CS Navigator's skills-only package updates |

## Current CS Navigator rule

CS Navigator is a **skills-only** plugin.

Therefore, a new CS Navigator release such as 0.7.5 **must not be considered updated in the public OpenAI Plugin Directory merely because GitHub changed**.

For every public plugin release that changes skills, metadata, assets, or package contents:

1. finish repository qualification;
2. freeze the exact source revision;
3. build the production plugin ZIP from that source;
4. verify its SHA-256 and package contents;
5. update `plugins/cs-navigator/plugin.json` version;
6. update the matching `submission/cs-navigator-<version>.json`;
7. create the GitHub release/tag;
8. open the **existing CS Navigator plugin** in the OpenAI plugin submission portal;
9. upload the new ZIP as a new package version — do **not** create a duplicate plugin;
10. resolve automated findings;
11. complete the required review flow;
12. after approval, publish the new package version;
13. verify the public directory shows the intended version;
14. record the public publication/version evidence in the release issue.

Publishing an approved update replaces the previously published package version in the public directory.

## GitHub marketplace release rule

Use two modes deliberately:

### Development / qualification

Track `main` or an explicit candidate branch only in controlled test workspaces.

- GitHub marketplace sync checks for updates daily.
- Use **Sync now** when an immediate refresh is needed.
- If an updated plugin is invalid, ChatGPT retains the last working imported version.

### Stable / production

Prefer a qualified release tag or immutable commit SHA.

Example:

```text
cs-navigator-v0.7.0
```

A tag/SHA is intentionally pinned. It will not move to 0.7.5 merely because `main` advances. Update the marketplace source ref only after the new release passes all required gates.

## Release reminder — mandatory

Every CS Navigator release PR must answer all of these before closure:

- [ ] Has the plugin version been updated?
- [ ] Has the exact production ZIP been rebuilt from the qualified source?
- [ ] Does its SHA-256 match the qualified artifact?
- [ ] Has the GitHub release/tag been created?
- [ ] Has the workspace GitHub marketplace source/sync been updated or intentionally left pinned?
- [ ] If CS Navigator is publicly listed, has the **existing public plugin** received the new ZIP?
- [ ] Have OpenAI automated checks/review completed for the public package update?
- [ ] Has the approved package version been published?
- [ ] Has the public directory version been verified after publication?
- [ ] Has evidence of that publication been recorded in the release issue?

## Public-listing claim rule

A GitHub release, a workspace marketplace import, or a successful native QA run **does not by itself prove public Plugin Directory publication**.

Only claim “available in the public OpenAI Plugin Directory” after verifying the published plugin in the OpenAI portal/directory.

## Authoritative product references

- OpenAI Help: Plugins in ChatGPT
- OpenAI Help: Importing and syncing plugin marketplaces from GitHub
- OpenAI Developers: Upload and submit your plugin

Re-check the official documentation before every public release because platform behavior can change.

Independent community project. Not affiliated with or endorsed by OpenAI.
