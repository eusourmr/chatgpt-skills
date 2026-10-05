# GitHub distribution — CS Connect

GitHub marketplace import is the managed-workspace distribution path for **CS Connect**. It is separate from OpenAI's universal public plugin directory.

For ordinary users, see [Getting Started](GETTING_STARTED.md).

## Current release

- public name: **CS Connect**
- technical slug: `cs-navigator`
- version: **0.9.0**
- qualified package: **R2**
- exact ZIP SHA-256: `3379f932301b707fcf935f8f4f6f45bdea10d3e7277daced2849f93c3f824cce`
- 0.7.5: absorbed internal foundation
- 0.8: absorbed into 0.9
- CLI/npm: independent line, currently 0.4.0

## Architecture

```text
GitHub repository
  -> .agents/plugins/marketplace.json
  -> plugins/cs-navigator/plugin.json
  -> plugins/cs-navigator/skills/*
  -> managed ChatGPT workspace marketplace
```

The core package is skills-only. It does not require an MCP server, API key, external authentication, or third-party gateway.

## Import in a managed ChatGPT workspace

For a workspace administrator:

1. Open **Workspace settings → Plugins**.
2. Open **Marketplaces** or **Import marketplace**.
3. Use:
   - Repository: `https://github.com/eusourmr/chatgpt-skills`
   - Path: leave empty
4. Choose the source ref deliberately:
   - a stable 0.9 release tag for production;
   - a full commit SHA for exact immutability;
   - `main` only when you intentionally want current development.
5. Import the marketplace.
6. Open **CS Connect** and choose the installation policy for the workspace.

## Updates

A GitHub marketplace can be synchronized by the workspace. When available:

```text
Workspace settings → Plugins → Marketplaces → <marketplace> → Sync now
```

A workspace pinned to a tag or SHA does not move automatically to a later release.

## Important: GitHub is not the public directory

GitHub distribution is for repository/managed-workspace use.

Publishing publicly requires the OpenAI submission portal, review, approval, and an explicit **Publish plugin** action. See [Public Plugin Submission](PUBLIC_PLUGIN_SUBMISSION.md).

## Local and Codex use

Technical users can also work from the repository/CLI. Prefer immutable release refs for controlled deployments.

```bash
npx chatgpt-skills install
npx chatgpt-skills inspect cs-navigator
npx chatgpt-skills doctor
```

## Trust boundary

Trust is tied to exact bytes. If plugin or skill bytes change, older qualification evidence must not be silently inherited.

Independent community project. Not affiliated with or endorsed by OpenAI.
