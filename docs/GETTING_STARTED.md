# CS Navigator — How to use in ChatGPT, Codex and this repository

> **Private Web Beta verified (2026-11-06):** [CS Navigator Labs Web `0.20.0-beta.4`](https://chatgpt.com/plugins/plugins_6aee22530eb88191bed0e982d96d1218) exposed six skills, its curator file was read by the ChatGPT host and the Registry MCP was called in the same session (HOST-03R). Not a public directory release, cross-chat auto-activation, or qualification of 48 draft skills. [Canonical project state](CS_NAVIGATOR_ESTADO_E_CONTINUIDADE_2026-11-06.md).

**Reviewed 2026-11-06.** This is an operating guide, not a claim of public availability.

## Start with the job, not the folder
- For ordinary tasks, use native ChatGPT; no skill installation is required.
- For reusable workflows, install or select a skill/plugin in an actually supported host UI. Merely typing its name is not a tool call.
- For local programming, use compatible Codex desktop/CLI/IDE skills. The npm `chatgpt-skills` CLI manages local discovery/installation and does **not** automatically install a plugin in ChatGPT web/mobile.
- MCP tools require a real deployed server and a compatible connected plugin.

## Evidence ladder

| State | Required evidence |
|---|---|
| Discovered | Versioned catalog entry, not activation |
| Installed | Host/account confirmation; downloading a ZIP is not enough |
| Loaded | Evidence that the session exposed or read the skill instructions |
| Invoked | Actual tool/runtime invocation trace, distinct from outcome proof |
| Outcome verified | Observed, user-reported or independently supported success |

## ChatGPT first use
1. Open **Plugins** and check options available for your account and workspace.
2. Check **Skills** if present; standalone skill access depends on plan, workspace, and interface. Do not assume every account supports upload.
3. For plugins, use the directory or the Plugin Creator where available. ZIP uploads can require workspace/admin permissions.
4. Only use an `@` selector if the host actually offers it. Confirm the resource and tools are visible in that session.
5. Without a supported install option, you can still give native ChatGPT a curation instruction; it is **not** skill/MCP activation.

## Version and surface distinction
- GitHub editorial catalog: 80 entries, including one collection. The quality catalog `catalog.json` has 79 tracked items.
- 63 repository-authored core skills are design assets, not 63 host-executed skills.
- A private CS Navigator 0.17 plugin is recorded in account metadata, but this does not prove selection in any current chat.
- 0.18 RC3: the MCP protocol integration passed in GitHub Actions; a CI/evaluation archive is **not** an installable plugin unless it includes a valid plugin package.
- No public directory approval can be claimed without verified portal status.

## ZIP types
**Standalone skill ZIP** must be uploaded in an eligible skill surface. **Plugin ZIP** needs root `plugin.json`, `skills/<name>/SKILL.md` and `mcp.json` only for a declared MCP connection. **CI artifact ZIP** may be evaluation-only. Never conflate the three.

## Troubleshooting
If a resource is absent, check whether you're in Plugins or Skills, your account/workspace, whether installation actually occurred, the host selection UI, permissions, and the MCP endpoint if applicable. Absence from a single session does not prove absence from an account. Never infer skill invocation from a prompt or registry search. Do not send private data to experimental endpoints.

## Sources
- [Skills in ChatGPT](https://help.openai.com/en/articles/20001066-skills-in-chatgpt)
- [Plugins in ChatGPT](https://help.openai.com/en/articles/20001256-plugins-in-chatgpt)
- [Build skills](https://learn.chatgpt.com/docs/build-skills)
- [Package plugins](https://developers.openai.com/plugins/build/plugins)

**Use the evidence labels:** `designed`, `CI-tested`, `host-loaded`, `tool-invoked`, `outcome-verified`. Earlier evidence never automatically proves later states.
