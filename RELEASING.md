# Releasing ChatGPT Skills

This repository has **two independent release lines**:

1. the `chatgpt-skills` CLI/npm package;
2. the **CS Navigator plugin**.

Never infer one version from the other.

Current reference point:

- CLI/npm: `0.4.0`
- stable CS Navigator plugin: `0.7.0`
- CS Navigator 0.7.5: in qualification

For the permanent plugin update checklist, read [docs/PLUGIN_MAINTENANCE.md](docs/PLUGIN_MAINTENANCE.md).

## CLI/npm release

The CLI uses npm Trusted Publishing through GitHub Actions.

For a subsequent CLI release:

1. update `package.json`;
2. update `CHANGELOG.md`;
3. run `npm run validate`;
4. run `npm run pack:check`;
5. review the packed file list;
6. merge the release PR to `main`;
7. create a tag matching the CLI package version;
8. let the trusted-publishing workflow publish;
9. verify the npm version and CLI smoke test.

### npm safety rules

- never store a long-lived npm write token in the repository;
- never publish from an unreviewed branch;
- never reuse a published version;
- keep npm 2FA enabled;
- treat a failed package/CLI smoke test as a release blocker.

## CS Navigator plugin release

Plugin releases are separate from npm releases.

Before changing the stable plugin version:

1. complete deterministic repository gates;
2. complete native ChatGPT qualification for the exact candidate;
3. freeze the qualified source revision;
4. promote the exact qualified behavior into canonical plugin bytes;
5. renew all byte/version-bound evidence;
6. update `plugins/cs-navigator/plugin.json`;
7. create/update `submission/cs-navigator-<version>.json`;
8. run final repository validation;
9. build the production plugin ZIP from the exact merged release source;
10. verify the ZIP SHA-256 against the qualified production payload;
11. create the plugin release tag and GitHub release;
12. verify release assets.

## Distribution follow-through is part of the release

A GitHub release alone is **not** the end of the plugin release.

### Managed GitHub marketplace

- if a controlled workspace tracks `main`, request **Sync now** or wait for daily sync;
- if it is pinned to a tag/SHA, deliberately advance the ref only after qualification;
- verify the imported plugin version.

### Public OpenAI Plugin Directory

If CS Navigator is publicly published, skill/metadata/package changes require updating the **existing public plugin**:

1. upload the new complete ZIP as a new package version;
2. resolve automated findings;
3. complete the required review;
4. after approval, publish the package version;
5. verify the public directory displays the intended version;
6. record publication evidence in the release issue.

Do not assume GitHub sync updates the public directory.

## Release closure checklist

Do not close a CS Navigator release issue until:

- [ ] native qualification passed;
- [ ] canonical bytes match the qualified candidate;
- [ ] evidence was rebound to those bytes;
- [ ] final CI passed;
- [ ] GitHub tag/release and SHA-256 are recorded;
- [ ] managed-workspace marketplace state is known;
- [ ] public Plugin Directory state is known;
- [ ] if publicly published, the new package version was reviewed/published and verified;
- [ ] documentation/version references are updated in EN and PT-BR;
- [ ] the next-version docs do not claim unreleased behavior as stable.

Independent community project. Not affiliated with or endorsed by OpenAI.
