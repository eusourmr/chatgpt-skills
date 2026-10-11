# CS Navigator Live Registry MCP

This is the 0.16.0 read-only MCP service for CS Navigator.

## Purpose

The server makes the public, policy-filtered capability registry available to ChatGPT without turning arbitrary GitHub files into runtime instructions.

GitHub remains the source of truth. The server reads only:

`registry/public-capabilities-v1.json`

from the repository's `main` branch by default.

## Tools

- `search_capabilities` — search by an ordinary-language need.
- `get_capability` — retrieve one curated public capability card and playbook.
- `get_evidence` — retrieve evidence, freshness, permissions, source hash, and provenance.

All three tools are read-only.

## Public-distribution boundary

The generated public registry is fail-closed. A repository skill is not exposed unless it is explicitly present in `registry/public-capabilities-policy.json` with public distribution eligibility.

Healthcare workflows excluded by the current platform policy are not returned by this MCP service.

## Deploy on Vercel

Set the Vercel project root directory to:

`mcp/cs-navigator`

The deployment exposes:

- `/mcp` — MCP Streamable HTTP endpoint.
- `/health` — simple service-health endpoint.
- `/.well-known/openai-apps-challenge` — OpenAI domain-verification token endpoint.

When the OpenAI submission portal gives you a domain-verification token, set:

`OPENAI_APPS_CHALLENGE=<exact token>`

Optional override:

`CS_NAVIGATOR_REGISTRY_URL=<https URL>`

Do not point this variable at arbitrary user-controlled content.

## Privacy

The service does not require authentication and does not need user account data. Tool inputs are capability search terms or public capability IDs. The implementation does not intentionally persist tool inputs.

## Local checks

```bash
npm install
npm run check
npm test
```
