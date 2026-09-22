# GitHub-native CS Navigator distribution

The preferred v0.5 ChatGPT delivery path is a GitHub-managed plugin marketplace, not a ZIP upload.

## Architecture

```text
GitHub repository
  -> .agents/plugins/marketplace.json
  -> plugins/cs-navigator/plugin.json
  -> plugins/cs-navigator/skills/cs-navigator/
  -> ChatGPT Plugins
```

The core CS Navigator plugin contains only the skill. It does not require MCP, an API key, a server, or a third-party gateway.

GitHub is the managed source. ChatGPT imports and synchronizes a copy of the plugin; it does not fetch mutable SKILL.md instructions from GitHub on every user message.

## Workspace import in ChatGPT

For a workspace administrator:

1. Open **Workspace settings -> Plugins**.
2. Select **Add -> Import marketplace**.
3. Source: `https://github.com/eusourmr/chatgpt-skills`
4. Path: leave empty because the marketplace is at the repository root under `.agents/plugins/marketplace.json`.
5. Branch/tag/commit:
   - use `main` while testing continuous updates;
   - prefer a release tag or full commit SHA for controlled production rollout.
6. Import the marketplace and authorize GitHub when prompted.
7. Open the imported **CS Navigator** plugin and configure its installation policy.
8. Use **Sync now** when you want ChatGPT to pull a repository update immediately; otherwise GitHub marketplaces are synchronized automatically by the platform.

## Local / desktop development

For supported local clients:

```bash
codex plugin marketplace add eusourmr/chatgpt-skills --ref main
```

Then restart the compatible ChatGPT desktop/Codex client, open the plugin directory, choose the ChatGPT Skills marketplace, and install CS Navigator.

## Trust boundary

The mirrored plugin skill must be byte-for-byte identical to `skills/featured/cs-navigator`. CI checks this on every change.

The ZIP export remains available only as a compatibility fallback for surfaces that do not support GitHub marketplaces.

Independent community project. Not affiliated with or endorsed by OpenAI.
