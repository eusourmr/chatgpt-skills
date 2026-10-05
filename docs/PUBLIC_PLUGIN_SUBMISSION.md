# Public OpenAI Plugin Directory — CS Connect

This document is the release checklist for publishing **CS Connect 0.9.0** to the universal OpenAI plugin directory shared by ChatGPT and Codex.

For end-user installation, see [Getting Started](GETTING_STARTED.md). For repository/workspace distribution, see [GitHub Plugin Distribution](GITHUB_PLUGIN_DISTRIBUTION.md).

## Qualified package

- public name: **CS Connect**
- technical plugin slug: `cs-navigator`
- version: `0.9.0`
- package type: skills-only
- qualified candidate: **R2**
- exact ZIP SHA-256: `3379f932301b707fcf935f8f4f6f45bdea10d3e7277daced2849f93c3f824cce`
- exact entries: 63
- package evidence: `release/candidates/cs-connect-v0.9.0-r2.json`
- native evidence: `trust/evals/runs/cs-connect-v0.9.0-r2-native-requalification.json`

The R2 package was reproduced by GitHub Actions with the same inner ZIP SHA-256.

## Current public-directory state

A private 0.9.0 plugin draft has been created from the exact qualified R2 ZIP.

**It is not yet a public listing.**

The OpenAI public flow is:

1. choose the verified developer identity;
2. upload/select the complete ZIP;
3. wait for automated package/skill checks;
4. resolve blocking findings;
5. submit the package for OpenAI review;
6. wait for approval;
7. explicitly select **Publish plugin**;
8. verify the directory shows **CS Connect 0.9.0**.

Approval alone does not publish the plugin. A GitHub release or private plugin draft also does not prove public availability.

## Submission metadata

Use:

```text
submission/cs-navigator-0.9.0.json
```

The public listing should present **CS Connect**. The technical slug remains `cs-navigator` so the product can evolve without breaking technical identity.

The plugin is skills-only:

- no MCP server;
- no external auth;
- no API key;
- no required external network;
- no third-party gateway.

## Review claim boundaries

Allowed:

- exact-byte R2 qualification passed for the recorded matrix and scoped regressions;
- native-first behavior was explicitly tested;
- Guardian STOP/no-bypass behavior was regression-tested;
- Brazil jurisdiction/authority and project rollback defects were found, fixed, and requalified;
- GitHub Actions reproduced the exact R2 inner ZIP hash.

Do **not** claim:

- zero hallucinations;
- perfect safety;
- that Container Guardian necessarily executed inside ChatGPT without an actual decision record;
- that a Security Gate pass is a universal safety guarantee;
- that OpenAI approved or verified the plugin before the portal says so.

## After approval

Only after approval:

1. open the approved package version;
2. select **Publish plugin**;
3. search the public directory for **CS Connect**;
4. confirm the displayed version is 0.9.0;
5. install it from a normal eligible account;
6. run a native-first smoke test;
7. record the public listing evidence in issue #62;
8. update README status from “review path” to “published”.

## Updates after 0.9.0

For future bundled skill or metadata changes:

- increment the plugin version;
- create a complete new ZIP;
- qualify the new bytes;
- upload the new ZIP to the existing public plugin;
- complete required checks/review;
- publish the approved package.

Do not create a duplicate public plugin for routine updates.

## GitHub marketplace is separate

Managed workspaces may import and sync the GitHub marketplace. That is a workspace distribution mechanism and does not publish to the universal public directory.

Independent community project. Not affiliated with or endorsed by OpenAI.
