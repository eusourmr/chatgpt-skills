# Public OpenAI Plugin Directory — CS Navigator

## Current platform state

The 0.15.0 skills-only draft is **not published** and currently requires attention.

Observed findings on 2026-10-11:

- **Support URL is required.**
- **New skills-only submissions are not being accepted at this time.**
- `medical-appointment-prep` was classified as a healthcare/medical workflow that is currently out of scope for distribution in the skill ecosystem.

The 0.15.0 GitHub release and native 12/12 Navigator qualification remain valid historical evidence. They do not override the current directory-submission findings.

## Architectural consequence

Current OpenAI documentation states that adding an MCP server to an existing skills-only plugin is not currently supported.

Therefore the public future line uses a **new hybrid plugin identity**:

- display name: **CS Navigator**
- technical package name: `cs-navigator-live`
- development version: **0.16.0**
- architecture: **stable kernel + read-only MCP + GitHub Live Registry**

Do not attempt to convert the existing `cs-navigator` skills-only draft into the hybrid plugin by silently adding MCP.

## Required listing URLs

0.16 defines all required public MCP listing URLs:

- Website: https://github.com/eusourmr/chatgpt-skills
- Support: https://github.com/eusourmr/chatgpt-skills/blob/main/docs/SUPPORT.md
- Privacy: https://github.com/eusourmr/chatgpt-skills/blob/main/docs/PRIVACY.md
- Terms: https://github.com/eusourmr/chatgpt-skills/blob/main/docs/TERMS.md

## Public MCP

Repository implementation:

`mcp/cs-navigator/`

Required endpoints:

- `/mcp`
- `/health`
- `/.well-known/openai-apps-challenge`

The public endpoint must use stable HTTPS and Streamable HTTP.

The final plugin ZIP builder refuses to build while the MCP URL is a placeholder.

## MCP tools

### search_capabilities
Read-only search of the policy-filtered public registry.

### get_capability
Read one selected public capability card/playbook.

### get_evidence
Read evidence, freshness, permission, source-hash, and provenance metadata.

The tool contract intentionally contains no write, send, delete, purchase, account, or authentication action.

## Public distribution policy

The MCP serves only:

`registry/public-capabilities-v1.json`

generated under:

`registry/public-capabilities-policy.json`

The initial policy exposes 48 public capability entries and excludes at least:

- `medical-appointment-prep` — platform-out-of-scope;
- `caregiver-coordinator` — conservatively excluded because its existing workflow coordinates medication/clinician/care information.

The server must not load excluded capabilities directly from GitHub.

## Review cases

The 0.16 manifest defines exactly:

- **5 positive cases**
- **3 negative cases**

Positive cases cover search, capability retrieval, evidence retrieval, search→retrieve composition, and healthcare exclusion.

Negative cases cover arbitrary GitHub execution, registry writes/evidence promotion, and bypass of excluded healthcare workflows.

A real demo-recording URL remains required before final MCP review submission.

## New-plugin submission order

1. finish 0.16 repository build/static validation;
2. deploy `mcp/cs-navigator` to a stable public HTTPS host;
3. configure the exact OpenAI domain-verification challenge token;
4. verify `/health`, `/mcp`, and the challenge endpoint;
5. rebuild `plugins/cs-navigator-live` with the real MCP URL;
6. build/freeze the exact 0.16 ZIP and SHA-256;
7. create a **new** plugin draft from that ZIP;
8. connect the MCP in the dashboard;
9. complete domain verification;
10. select **Scan Tools** and resolve tool findings;
11. provide the demo-recording URL;
12. run native qualification against the connected 0.16 plugin;
13. submit for review;
14. claim public availability only after OpenAI approval **and** explicit publication.

## Long-term update model

After initial publication, compatible MCP server and live-data changes may be picked up through OpenAI's MCP scan process without uploading a new plugin ZIP for every registry update.

Changes to packaged skills, plugin metadata, or incompatible MCP contracts still require a new plugin version.

This is the foundation for keeping CS Navigator stable for ordinary users while its governed capability layer continues to improve through GitHub.

Independent community project. Not affiliated with or endorsed by OpenAI.
