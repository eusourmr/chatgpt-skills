# CS Navigator Labs Web 0.20.0-beta.4 — private diagnostic variant

Purpose: test whether the previous `Open in desktop app` and absence of CS Navigator Labs skills on ChatGPT web was related to bundling a portable MCP configuration.

- Six laboratory skills preserved, including `cs-navigator-labs`.
- Existing authenticated/registered app **CS Navigator Registry** is referenced by `.app.json` and `extensions.com.openai.apps`.
- **No bundled `mcp.json`, `.mcp.json` or `mcpServers` compatibility pointer.** The app owns the MCP integration; do not duplicate it.
- The curator is declared as an onboarding skill (if this capability is supported on the host).
- Keep the existing Labs 0.20.0-beta.3 unchanged as the desktop/portable comparison; this is a new private temporary test identity, not production 0.17.
- Success must be observed in a web chat: actual skill `skills__read` and real Registry `registry_status` in the same session. Source/installation alone is not success.
- If ChatGPT cannot expose skills due to account/plan/host restrictions, do not claim the package bypasses them.

Official reference: https://help.openai.com/en/articles/20001256-plugins-in-chatgpt
