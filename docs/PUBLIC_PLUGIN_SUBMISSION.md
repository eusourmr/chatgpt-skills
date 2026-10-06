# Public OpenAI Plugin Directory — CS Navigator

This is the release checklist for publishing **CS Navigator 0.9.3** to OpenAI's public plugin directory.

For end-user installation, see [Getting Started](GETTING_STARTED.md). For managed repository distribution, see [GitHub Plugin Distribution](GITHUB_PLUGIN_DISTRIBUTION.md).

## Current candidate

- public name: **CS Navigator**
- technical slug: `cs-navigator`
- version: `0.9.3`
- candidate: **R3-final**
- package type: skills-only
- exact ZIP SHA-256: `4a54c159901f1a58d55420ab31a30d1839084b0ff885738b244db226897115b6`
- exact entries: 63
- source commit: `b5886d8c981423d6704d527495f710a73a4e9f9d`
- package record: `release/candidates/cs-navigator-v0.9.3-r3.json`
- native qualification matrix: `tests/fixtures/v093-native-qualification-r3.json`

Static/package validation has passed. Native ChatGPT semantic requalification of the exact R3 bytes is still required before public submission.

## Private-plugin state

The editable private plugin is:

```text
plugins_6ac41c5909b481918b0523726e763aa3
```

Its current private release is **CS Navigator 0.9.3**. It is not a public listing.

## Submission order

1. complete exact-byte native R3 requalification;
2. record the passing run and update R3 evidence metadata;
3. merge the final release branch;
4. create the GitHub tag/release for `cs-navigator-v0.9.3` using the already-qualified ZIP;
5. open the existing private CS Navigator plugin;
6. choose the verified developer identity;
7. submit the exact qualified package for OpenAI review;
8. resolve any blocking review findings without silently changing qualified bytes;
9. after approval, explicitly publish;
10. verify public search shows **CS Navigator** and the intended version.

A GitHub release, private draft, successful static build, or OpenAI approval alone does not prove public publication.

## Listing identity

The user-facing identity must be consistent:

```text
Display name: CS Navigator
Technical slug: cs-navigator
Developer: RICARDO MOREIRA DA ROCHA
Category: Productivity
```

The core package remains skills-only: no required MCP server, external authentication, API key, developer-controlled server, or third-party gateway.

## Claim boundaries

Allowed after native R3 passes:
- exact-byte semantic qualification for the recorded R3 cases;
- preserved predecessor evidence where the change-impact policy explicitly permits it;
- static/package/security gates for the exact package.

Never claim:
- zero hallucinations;
- universal safety;
- deterministic Guardian execution inside a specific chat without a real decision record;
- OpenAI approval/publication before the product UI confirms it.

Independent community project. Not affiliated with or endorsed by OpenAI.
