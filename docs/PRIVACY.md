# CS Navigator Privacy Policy

**Effective date:** 2026-10-11  
**Applies to:** CS Navigator 0.16.0 and later versions until this policy is updated.

CS Navigator is an independent community project. The 0.16 architecture combines a small bundled curator core with a developer-operated, read-only MCP service that retrieves public capability metadata from the CS Navigator GitHub registry.

## Data processed by the developer-operated MCP

The MCP service may receive the arguments necessary to answer a registry lookup, such as:

- a capability search phrase;
- a capability ID;
- an optional category;
- a result limit.

The service is designed for capability discovery and evidence lookup. It does not require the user to create a CS Navigator account and does not request passwords, API keys, payment credentials, health information, or other secrets.

The MCP service does not need or request the user's complete ChatGPT conversation. ChatGPT may derive a tool argument from the conversation when it decides to call one of the registry tools.

## Purpose of processing

MCP tool arguments are processed only to:

- search the current public capability registry;
- return one capability's metadata;
- return evidence, freshness, permission, and known-gap metadata;
- report registry publication/source status.

The MCP server is read-only. It does not modify ChatGPT data, user accounts, GitHub repositories, external services, or the registry.

## GitHub registry access

The MCP service reads a public, versioned registry published from:

https://github.com/eusourmr/chatgpt-skills

The server accepts only allowlisted registry fields. It does not fetch or execute arbitrary repository instructions as part of normal registry lookup.

## Application logging and retention

The CS Navigator application code is designed not to persist MCP query content in an application database.

The deployment provider may generate ordinary infrastructure logs for security, availability, abuse prevention, debugging, or operational reliability. Before public deployment, the project will document the selected provider and its applicable retention behavior.

The project should minimize logs, avoid storing query bodies unless required for a specific incident, and avoid using registry queries for advertising or profiling.

## Recipients and data sharing

Normal registry lookup data is processed by:

- the infrastructure provider hosting the CS Navigator MCP service;
- GitHub, when the MCP service retrieves the public registry;
- OpenAI, under the privacy terms, workspace policies, product settings, and data controls applicable to the user's ChatGPT/Codex use.

The developer does not sell personal data obtained through CS Navigator.

## Authentication

The public registry MCP is designed to work without a CS Navigator user account or user authentication because it accesses public capability metadata only.

If a future release adds authentication, private data, write tools, analytics, or additional destinations, this policy must be updated before that behavior is published.

## Public project support

If a user voluntarily contacts the project through GitHub Issues or another public project channel, information the user chooses to submit there may be visible to the developer and, depending on the channel, to the public.

Users should not post passwords, API keys, private conversation content, health information, payment credentials, or other sensitive personal data in public GitHub issues.

## User controls

Users may:

- uninstall CS Navigator at any time;
- choose not to use the live registry MCP;
- use the privacy, data, and workspace controls provided by ChatGPT/OpenAI;
- choose not to submit information through public project-support channels;
- edit or remove voluntarily submitted information where the relevant platform provides those controls.

If the live registry is unavailable or the user does not use it, the stable CS Navigator core is designed to fall back to native ChatGPT rather than requiring registry access for every task.

## Healthcare distribution boundary

Healthcare/medical workflow skills that may involve health information are excluded from the public CS Navigator distribution while they remain outside the supported public skill ecosystem. Their historical source may remain in the public repository for audit/history, but the public plugin and MCP do not expose them as distributable capabilities.

## Future changes

Material changes to the categories of personal data processed, authentication, write actions, analytics, telemetry, or third-party destinations require this policy to be updated before publication.

## Contact

For privacy questions or project support:

https://github.com/eusourmr/chatgpt-skills/blob/main/docs/SUPPORT.md

CS Navigator is not affiliated with or endorsed by OpenAI.
