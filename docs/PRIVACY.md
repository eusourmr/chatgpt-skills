# CS Navigator Privacy Policy

**Effective date:** 2026-10-11  
**Applies to:** CS Navigator 0.16.0 and later versions until this policy is updated.

CS Navigator 0.16.0 uses a lightweight plugin kernel plus a developer-operated, read-only MCP service that serves a policy-filtered public capability registry generated from the project's GitHub repository.

## Data processed by the CS Navigator MCP service

The MCP service may receive:
- the capability search terms sent to the `search_capabilities` tool;
- the public capability ID sent to `get_capability` or `get_evidence`;
- ordinary network/request metadata handled by the hosting provider, such as timestamps, IP/network metadata, HTTP headers, and operational error information.

The service does **not** require:
- a CS Navigator account;
- user authentication;
- passwords or API keys supplied by the user;
- access to the user's email, calendar, cloud drive, bank, health records, or other private account data.

The public CS Navigator registry intentionally excludes healthcare workflows that are outside the current platform distribution scope. Users should not submit health information to the CS Navigator MCP tools.

## Purpose of processing

Tool inputs are processed only to:
- search the public CS capability registry;
- retrieve one requested public capability card/playbook;
- return evidence, freshness, permission, source-hash, and provenance metadata;
- operate, secure, debug, and maintain the public MCP service.

The CS Navigator application code does not intentionally persist capability search terms or capability IDs as a user profile.

## GitHub as the registry source

The MCP server retrieves the generated public registry from:

https://github.com/eusourmr/chatgpt-skills

The server fetches the policy-filtered registry artifact itself. User search terms are not sent to GitHub as GitHub search queries.

Only entries included in the generated public registry are served. Arbitrary GitHub files are not automatically executed through the public MCP service.

## Hosting provider

The MCP service is hosted by a third-party infrastructure provider. That provider may process ordinary request and operational metadata under its own terms, privacy policy, security controls, and retention practices.

The project aims to minimize application-level logging and does not intentionally use the MCP service for advertising profiles or behavioral tracking.

## Support channels

If a user voluntarily contacts the project through GitHub Issues or another public project channel, the information the user chooses to submit may be visible to the developer and, depending on the channel, to the public.

Do not post passwords, authentication tokens, private keys, health information, financial account credentials, or other sensitive personal data in a public support issue.

## Data sharing

The developer does not sell personal data obtained through CS Navigator.

Use of ChatGPT and the OpenAI product surface is processed by OpenAI under OpenAI's applicable privacy terms, workspace policies, data controls, and product settings.

GitHub processes repository and support activity under GitHub's own terms and privacy practices. The hosting provider processes service request/operational metadata under its own applicable terms.

## Retention

CS Navigator application code does not intentionally create a persistent store of capability search queries or capability IDs.

Operational logs, network metadata, or security telemetry may be retained by the hosting provider according to that provider's settings and policies.

Information voluntarily submitted to GitHub or another support channel is retained according to that platform's systems and the user's available controls.

## User controls

Users may:
- uninstall CS Navigator;
- choose not to invoke the Live Registry tools;
- use ChatGPT/OpenAI privacy and workspace controls;
- avoid submitting information through public support channels;
- edit or remove voluntarily submitted information where the relevant platform provides those controls.

## Future changes

If a future release adds authentication, account-specific data access, write actions, analytics, commerce, or additional data destinations, this policy must be reviewed and updated before that change is publicly distributed.

## Contact

Support and privacy questions:

https://github.com/eusourmr/chatgpt-skills/blob/main/docs/SUPPORT.md
