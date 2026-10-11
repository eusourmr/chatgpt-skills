# CS Navigator 0.16.0 — Evergreen Core & Live Registry

## Why this version exists

0.16.0 changes the maintenance model.

The public plugin should not need a new ZIP every time capability metadata, evidence state, freshness, or availability changes. The stable plugin core remains small while a read-only MCP server retrieves the current public registry from GitHub.

## Architecture

```text
User
  ↓
CS Navigator Evergreen Core
  ├─ Native ChatGPT first
  ├─ Personal Curator / Simple Mode / Preferences
  └─ Read-only Registry MCP
       ↓
GitHub public registry
       ↓
Capability metadata + evidence + freshness + distribution state
```

## Stable bundled core

- cs-navigator
- personal-curator
- simple-mode
- capability-preferences
- proof-of-progress
- information-expiry-guard

Domain workflows remain in the repository/catalog, but they are not all bundled into the public plugin.

## Live registry tools

The MCP exposes only read-only tools:

- search_capabilities
- get_capability
- get_evidence
- registry_status

The server does not execute arbitrary GitHub files. It only accepts a bounded JSON registry schema and returns allowlisted metadata fields.

## What can update without a new plugin ZIP

After the remote MCP is published and accepted by the platform, registry-backed metadata can evolve independently:

- capability discovery;
- evidence state;
- freshness;
- permission profile;
- known gaps;
- source links;
- distribution availability.

Changes to bundled skills, plugin metadata, privacy terms, or the core routing contract still require a new ZIP/review as required by the platform.

## Healthcare distribution correction

The repository preserves historical source, but public distribution excludes:

- medical-appointment-prep
- caregiver-coordinator

The distribution gate also requires explicit review when health/medical patterns appear in a capability intended for public distribution.

This is a policy boundary, not a renaming exercise.

## Current external blocker

A public plugin submission with MCP requires a stable public HTTPS Streamable HTTP endpoint.

The repository contains a deployable server under:

`mcp/cs-registry-server/`

0.16.0 must not be called submission-ready until:

1. the server is deployed to a stable HTTPS URL ending in `/mcp`;
2. MCP Inspector passes against production;
3. the endpoint is inserted into `mcp.json`;
4. domain verification and remote-MCP review requirements are completed;
5. a new exact-byte qualification binds the final package.

## Product principle

The plugin core should become boring and stable.

GitHub should carry the living catalog and evidence layer.

The user should continue to experience:

> Install once. Talk normally.

while the underlying curation metadata remains current.


## Current verification state

As of 2026-10-11:

- Evergreen Core static build: PASS
- Registry MCP TypeScript build: PASS
- Public submission metadata validation for skills + remote MCP: PASS
- Marketplace validation for Capability Pack v2: PASS
- Navigator static trust chain refreshed against the final snapshot source bytes
- Navigator 0.16 behavior evidence: `designed` pending production MCP deployment and native requalification
- Public release package: intentionally blocked until the HTTPS production MCP endpoint exists

This is a release gate, not a build failure.
