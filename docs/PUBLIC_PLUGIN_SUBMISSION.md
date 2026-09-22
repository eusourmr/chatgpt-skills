# Public Plugin Directory submission — CS Navigator 0.5.0

This is the consumer distribution path for CS Navigator.

## Intended user experience

```text
ChatGPT
  -> Plugins
  -> search "CS Navigator"
  -> Install
  -> @CS Navigator
```

No ZIP, GitHub account, workspace marketplace import, MCP server, API key, or specific model is required from the end user. Actual availability still depends on OpenAI's plugin rollout, region, account, and product surface.

## Submission type

Choose **Skills only** in the OpenAI Plugin submission portal.

Use `submission/cs-navigator-0.5.0.json` as the source of truth for listing copy, capabilities, starter prompts, review cases, and release notes.

## Publisher prerequisites

1. Use the OpenAI Platform organization that will own the public listing.
2. Complete individual or business developer verification in that organization.
3. Ensure the submitter has write access to App Management.
4. Prepare a production logo for the portal.
5. Choose the countries/regions where the plugin should be available.

## Build the reviewer package

```bash
npm run build:public-plugin
```

This creates:

```text
dist/plugin-submission/cs-navigator-skills-0.5.0.zip
dist/plugin-submission/cs-navigator-skills-0.5.0.zip.sha256
```

The ZIP is for the OpenAI review portal only. End users should install the published plugin from the Plugin Directory.

## Review evidence

The submission contains:
- 5 positive cases;
- 3 negative cases;
- a skill-only architecture;
- no external server;
- no MCP;
- no authentication;
- no third-party data transfer introduced by the plugin;
- the native CS Navigator 6/6 qualification record in the CS Trust Layer.

## Public URLs

- Website: https://github.com/eusourmr/chatgpt-skills
- Support: https://github.com/eusourmr/chatgpt-skills/issues
- Privacy: https://github.com/eusourmr/chatgpt-skills/blob/main/docs/PRIVACY.md
- Terms: https://github.com/eusourmr/chatgpt-skills/blob/main/docs/TERMS.md

## Publication flow

Submission starts review; it does not immediately publish the plugin. After OpenAI approval, publish the approved version from the portal. Once published, it appears in the universal Plugin Directory shared by ChatGPT and Codex.

A new public skill version requires a new submission/review/publication cycle.

Independent community project. Not affiliated with or endorsed by OpenAI.
