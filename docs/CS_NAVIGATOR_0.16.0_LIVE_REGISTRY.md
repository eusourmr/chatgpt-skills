# CS Navigator 0.16.0 — Live Registry Foundation

## Why 0.16 exists

The 0.15.0 submission surfaced three platform realities that materially change the distribution architecture:

1. a public submission requires a support URL;
2. new skills-only submissions are currently not being accepted in the submission portal;
3. healthcare/medical workflows and workflows that may involve health information are currently out of scope for skill-ecosystem distribution.

OpenAI's current plugin documentation also states that an MCP server must be included in the initial plugin ZIP; adding an MCP server to an existing skills-only plugin is not currently supported.

Therefore 0.16.0 is not a cosmetic patch to 0.15.0. It is the first **hybrid CS Navigator architecture**.

## Product principle

> Install a small stable kernel once. Let the curated capability registry evolve behind a stable, read-only contract.

The user should still experience:

> Install once. Talk normally.

The architecture underneath changes from “bundle every workflow into the ZIP” to:

```text
ChatGPT
  ↓
CS Navigator stable kernel
  ↓
Native sufficiency gate
  ↓
Read-only Live Registry MCP
  ↓
GitHub-generated public registry
  ↓
Curated capability card + evidence + playbook
```

## GitHub remains the source of truth

The MCP server does not search arbitrary GitHub content.

It reads only:

`registry/public-capabilities-v1.json`

from the `main` branch by default.

That file is generated from repository skills only after the public-distribution policy is applied.

A commit anywhere else in the repository does not automatically become executable.

## Stable MCP contract

0.16.0 intentionally starts with only three tools:

### search_capabilities

Search the policy-filtered public registry by ordinary-language need.

### get_capability

Retrieve one selected capability card and its curated playbook.

### get_evidence

Retrieve evidence state, freshness, permissions, source hash, and provenance.

All three tools are read-only.

The small tool surface is deliberate. It reduces permission scope, review churn, and future compatibility risk.

## Why this becomes more timeless

Once the hybrid plugin is published, eligible changes to the live MCP service and live registry data can evolve without repackaging every skill into a new plugin ZIP, as long as the published MCP contract remains compatible with the approved version.

Plugin metadata or packaged skills still require a new plugin version when changed.

The result is a stable public shell with a living, policy-gated capability layer.

## Public package surface

The 0.16 public plugin should contain only:

- the CS Navigator curator kernel;
- a small onboarding skill;
- listing metadata/assets;
- MCP configuration.

It should **not** bundle the full skill catalog.

The live registry carries capability cards/playbooks and their evidence metadata.

## Healthcare distribution gate

The public distribution excludes:

- `medical-appointment-prep`;
- `caregiver-coordinator`.

These workflows remain in repository history but are marked `platform-out-of-scope` for public CS Navigator distribution under the current platform rules.

Adjacent workflows are also narrowed so their public-distribution behavior does not process health information or coordinate healthcare services.

The project must not rename or indirectly load excluded healthcare workflows to evade review.

## Registry safety model

Every public entry includes:

- stable capability ID;
- summary/category;
- execution mode;
- evidence state;
- freshness state;
- permission profile;
- source path;
- source SHA-256;
- source link;
- Trust Passport link when available;
- curated playbook.

The server rejects malformed registry entries and serves only entries whose distribution state is exactly `public`.

## Personal Curator

The stable kernel keeps the Personal Curator concept.

If a user says:

> Use CS Navigator as my curator.

Navigator applies the native-first and live-registry routing contract for the current conversation.

It must not claim global/cross-chat persistence unless the host product explicitly provides and confirms that setting.

## Deployment

The public MCP requires a stable HTTPS endpoint using Streamable HTTP.

The repository includes a Vercel-ready implementation under:

`mcp/cs-navigator/`

Required public endpoints:

- `/mcp`
- `/health`
- `/.well-known/openai-apps-challenge`

The OpenAI domain-verification challenge is supplied through the deployment environment variable:

`OPENAI_APPS_CHALLENGE`

## New plugin identity

Because current OpenAI guidance says an MCP server cannot be added to an existing skills-only plugin, 0.16 uses a new technical package identity:

`cs-navigator-live`

The display name remains:

**CS Navigator**

The 0.15.0 plugin/release remains preserved as historical evidence and should not be rewritten.

## Deployment gate

The repository may build a development skeleton with a placeholder MCP URL, but the submission ZIP builder refuses to produce a final ZIP until a real public HTTPS MCP endpoint is configured.

This prevents us from accidentally submitting a package that cannot pass MCP connection and domain-verification review.

## Evidence boundary

0.16 architecture code and static CI are not proof that:

- the public MCP endpoint is deployed;
- OpenAI connected/scanned the MCP;
- the new plugin is approved or published;
- every capability in the Live Registry is individually tested;
- Personal Curator persists across chats.

Those claims require their own evidence.

## Target state

The target experience is simple enough to explain to anyone:

> Install CS Navigator once. Then just talk normally.

The technical system underneath should be able to improve continuously through GitHub without making the user manage versions of dozens of skills.
