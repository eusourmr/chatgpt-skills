# Public OpenAI Plugin Directory — CS Navigator

## GitHub release versus Plugin Directory

The current GitHub release is **0.17.0 — Learning & Academic Mastery**. The installed private plugin was independently verified as **0.15.0 (PRIVATE)**. No 0.17.0 production MCP endpoint, private plugin update or public directory approval has been verified. Historical portal details below must not be mistaken for a new review of the 0.17.0 package.

## Current portal state (last observation)

Observed in the OpenAI Platform plugin portal on **2026-10-11**:

- plugin: **CS Navigator**
- portal draft: **0.15.0**
- publication: **Not published**
- review status: **Needs attention**

Current findings shown by the portal:

1. **Support URL is required.**
2. **OpenAI is not accepting more skills-only submissions at this time.**
3. **medical-appointment-prep is outside the currently supported skill ecosystem because it is a healthcare/medical workflow that may involve health information.**

These findings are treated as product constraints, not text to work around.

## 0.17.0 response (incorporating 0.16.0 architecture)

**CS Navigator 0.17.0 — Learning & Academic Mastery** includes the Evergreen Core & Live Registry architecture designed in 0.16.0. The 0.16.0 line is historical, not an independently published public plugin.

### Addressed in source

- `supportURL` added to plugin metadata.
- public support page added at `docs/SUPPORT.md`.
- `medical-appointment-prep` excluded from public distribution.
- `caregiver-coordinator` also excluded conservatively because it may involve health information.
- plugin reduced to a stable Evergreen Core.
- read-only Registry MCP implemented under `mcp/cs-registry-server/`.
- GitHub-backed public registry generated at `registry/public-capabilities-v1.json`.
- arbitrary GitHub files are not fetched or executed as remote instructions.

### Why MCP

The public portal currently does not accept additional skills-only submissions. The 0.17.0 public distribution target is a **skills + remote MCP** plugin rather than another larger skills-only ZIP.

After an MCP-backed plugin is published, compatible MCP-server/data updates can evolve independently, while bundled skill or metadata changes still require a new plugin ZIP.

## Stable public core

The 0.17.0 intended distributed core contains:

- `cs-navigator`
- `personal-curator`
- `simple-mode`
- `capability-preferences`
- `proof-of-progress`
- `information-expiry-guard`

Domain-specific capability metadata lives in the GitHub-backed registry instead of being bundled wholesale into the plugin.

## Registry MCP

Read-only tools:

- `search_capabilities`
- `get_capability`
- `get_evidence`
- `registry_status`

The MCP does not expose write tools.

The registry is treated as bounded metadata/evidence. Repository presence does not imply tested, qualified, safe, or recommended.

## Remaining external blocker

The repository implementation is not yet public-submission-ready because a remote MCP review requires a real production endpoint.

Required before final 0.17.0 ZIP:

1. deploy `mcp/cs-registry-server/` to a stable public HTTPS URL ending in `/mcp`;
2. run MCP Inspector against that production endpoint;
3. place the verified URL into `plugins/cs-navigator/mcp.json`;
4. complete domain verification and remote-MCP review material;
5. run exact-byte plugin qualification;
6. upload the resulting 0.17.0 ZIP as a new portal version.

The build intentionally refuses to produce a public 0.17.0 package until the production MCP endpoint exists.

## Listing identity

```text
Display name: CS Navigator
Technical slug: cs-navigator
Developer: RICARDO MOREIRA DA ROCHA
Category: Productivity
Short description: Evergreen capability curator
Website: https://github.com/eusourmr/chatgpt-skills
Support: https://github.com/eusourmr/chatgpt-skills/blob/main/docs/SUPPORT.md
Privacy: https://github.com/eusourmr/chatgpt-skills/blob/main/docs/PRIVACY.md
Terms: https://github.com/eusourmr/chatgpt-skills/blob/main/docs/TERMS.md
```

## Claim boundaries

Do not claim:

- cross-chat/global curator persistence unless the host explicitly provides it;
- automatic execution in every conversation;
- that arbitrary GitHub content becomes executable;
- that registry presence equals testing or recommendation;
- healthcare capability availability while those workflows remain out of scope;
- public OpenAI approval/publication before the portal confirms it.

Independent community project. Not affiliated with or endorsed by OpenAI.
