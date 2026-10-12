# CS Navigator Privacy Policy

**Effective date:** 2026-10-11  
**Last revised:** 2026-10-11  
**Current product release:** CS Navigator 0.17.0 — Learning & Academic Mastery

CS Navigator is an independent community project maintained by Ricardo Moreira da Rocha. It provides a small skill-based curator layer and an optional read-only Model Context Protocol (MCP) registry service. This policy describes **the developer-operated registry service**, rather than replacing OpenAI's own privacy policies for ChatGPT or other products.

**Registry MCP endpoint:** https://chatgpt-skills.onrender.com/mcp  
**Public project and support:** https://github.com/eusourmr/chatgpt-skills

## 1. Information processed

When the ChatGPT host or another MCP client calls the CS Navigator registry, the service receives the tool name and the parameters supplied to it. Depending on the tool, these may include:

- a search query describing the capability sought (up to 240 characters);
- an optional capability category and result limit;
- a capability identifier (up to 128 characters);
- a request for registry status without user-supplied arguments.

The host may create a search phrase from the user's conversation. Therefore, **the query may contain personal or sensitive information if it is included in a tool argument**, even though the registry is not designed to collect such information. Users should avoid including secrets or unnecessary personal information in registry searches.

The service does **not require** a CS Navigator user account, passwords, API keys, payment details, or the full conversation transcript. It has no tools for accessing accounts, editing user files, or modifying external services. We cannot independently verify which other information the ChatGPT host itself processes or retains under its applicable policies.

Technical connection information (which may include IP address, timestamps, request paths, user-agent data, and error or traffic metadata) can also be processed by hosting infrastructure in the normal operation of an HTTPS service.

## 2. Purposes and how the service works

Tool arguments are processed to discover publicly listed capabilities, retrieve an individual capability record, return evidence and limitations, or inspect registry publication status.

The currently exposed MCP tools are `search_capabilities`, `get_capability`, `get_evidence`, and `registry_status`. They are read-only: none authorizes a user-account change, purchase, write to GitHub, or execution of arbitrary GitHub repository instructions.

The application downloads public registry metadata from GitHub's raw-content hosting. **It performs capability searches locally in the MCP server; ordinary user search arguments are not directly sent to GitHub by the application.** The application keeps the public registry temporarily in memory (currently with a 60-second cache by default) to reduce repeated downloads. This is a cache of public capability metadata, not a database of individual search histories.

## 3. Hosting, service providers, and data flows

The developer-operated MCP service is deployed through **Render**, which provides hosting and technical infrastructure. As a service operator, Render may process connection information and infrastructure logs according to its own applicable terms, policies, and account configuration.

The MCP service retrieves the public capability catalog from **GitHub**. Its normal registry retrieval does not transmit the user's MCP search arguments to GitHub, although standard outbound connection metadata is necessarily processed.

**OpenAI/ChatGPT** may process the user conversation and MCP tool calls under its own applicable terms, privacy settings, and workspace controls. The developer does not control OpenAI's separate retention decisions.

Provider information: [Render Privacy Policy](https://render.com/privacy) · [GitHub Privacy Statement](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement) · [OpenAI Privacy Policy](https://openai.com/policies/privacy-policy/).

The developer does not sell personal data received through the CS Navigator registry or use registry search arguments for advertising profiling.

## 4. Storage, logs, and retention

The current CS Navigator application code does not create a database of MCP searches or deliberately save query text in application-managed persistent storage. The only application-level cache described above holds public catalog data in memory.

**This does not mean that no technical logs or connection records exist.** Render or related infrastructure may retain service logs, request metadata, error details, and security events under provider settings and retention rules. The exact available retention periods and any logging settings have not yet been independently verified for the deployed Render account; this policy does not claim a specific deletion deadline.

The project aims to minimize diagnostic logging of user-provided tool arguments, avoid logging query bodies unless needed for a documented incident, and restrict access to operational data.

For questions about the handling of operational records or a request concerning personal information held by the project, use the contact route below. Requests involving records controlled by Render, GitHub, or OpenAI may also be subject to those providers' processes.

## 5. User choices and privacy rights

Users may choose not to invoke the registry, uninstall or disconnect the plugin where supported, and use the privacy controls provided by ChatGPT and their workspace. Registry access is not required for every ordinary ChatGPT task.

Subject to applicable law, users may contact the project to request information about developer-controlled processing, access, correction, or deletion of personal data where identifiable records are held. Because the registry does not create user accounts or persistent user-query records in its application code, it may not be possible to match a particular request to an individual without additional information. Do not send credentials, medical records, or other sensitive documents merely to make a privacy request.

## 6. Public support channels

Content voluntarily posted to public GitHub Issues or discussions may be publicly visible and governed by GitHub's policies. Do not post private conversations, secrets, personal identifiers, financial details, or sensitive health information in a public issue.

## 7. Healthcare distribution and security boundaries

`medical-appointment-prep` and `caregiver-coordinator` are excluded from the public plugin distribution and from public MCP discovery. Historical source may remain in the GitHub repository for audit purposes; source availability does not mean that a capability is offered through the plugin.

The registry reports capability metadata and evidence states. A record marked `available` or `designed` does not prove execution, testing, professional suitability, or safety. Security checks reduce specific known risks but do not guarantee universal security.

## 8. Changes to this policy

If the product adds user authentication, persistent search histories, analytics, write tools, private-data access, or new destinations, this policy must be reviewed and updated before those changes are deployed. Material changes should be reflected in the public GitHub history and the applicable plugin submission.

## 9. Contact

**Project maintainer:** Ricardo Moreira da Rocha  
**Support and privacy requests:** https://github.com/eusourmr/chatgpt-skills/blob/main/docs/SUPPORT.md

This public policy describes the system as implemented and the information currently verified. Requests requiring private identity verification should not be posted in a public GitHub issue.

CS Navigator is an independent community project and is not affiliated with or endorsed by OpenAI.
