# Curated Bundles

Bundles turn the catalog into useful starting points instead of a flat list. Each bundle installs only repository-bundled skills with inspectable files.

The `chatgpt-skills` CLI is published on npm. Plugin and CLI version lines are independent; see [Getting Started](docs/GETTING_STARTED.md).

## 🧭 CS Core Bundle

The smallest CLI entry point to the CS Navigator Navigator:

- `cs-navigator`

```bash
npx chatgpt-skills install --bundle cs-core
```

For ChatGPT-oriented ZIP export:

```bash
npx chatgpt-skills install --skill cs-navigator --tool chatgpt-web --yes
```

For the current plugin path, the OpenAI directory submission is **CS Navigator 0.9.4** (in review / not published as of 2026-10-08), while **0.15.0** is the active Human Capability development candidate. See [Getting Started](docs/GETTING_STARTED.md). Public-directory availability remains a separate OpenAI review/publication state.

## 🧭 Human Capability layer (plugin candidate 0.15.0)

The 0.15.0 plugin candidate adds an Everyday Life & Human Capability layer directly to CS Navigator. It is not presented as a separate CLI bundle yet.

It includes personalization/curation, everyday administration, household decisions, home, Citizen Brazil, family/care, digital safety, Life Journeys, human handoff, progress tracking, freshness, and evidence-preservation workflows.

All 31 new workflows start as `designed`; inclusion in the plugin candidate does not promote them to `tested`.

See [CS Navigator 0.15.0 Human Capability](docs/CS_NAVIGATOR_0.15.0_HUMAN_CAPABILITY.md).

## 🧑‍💻 Developer Bundle

- `openai-agents-sdk-builder`
- `realtime-api-integration`
- `chatgpt-apps-deployer`
- `codex-pr-reviewer`
- `regenerative-resilience-plan`

```bash
npx chatgpt-skills install --bundle developer
```

## 📊 Data Analyst Bundle

- `regenerative-adaptive-experiment`
- `regenerative-impact-map`
- `regenerative-knowledge-commons`
- `regenerative-language-bridge`

```bash
npx chatgpt-skills install --bundle data-analyst
```

## 📈 Marketing & Growth Bundle

- `regenerative-listening-loop`
- `regenerative-language-bridge`
- `regenerative-capability-exchange`
- `regenerative-participatory-decision`

```bash
npx chatgpt-skills install --bundle marketing-growth
```

## 🎓 Education Bundle

- `regenerative-language-bridge`
- `regenerative-knowledge-commons`
- `regenerative-adaptive-experiment`
- `regenerative-listening-loop`

```bash
npx chatgpt-skills install --bundle education
```

## 🤖 OpenAI Ecosystem Bundle

- `openai-agents-sdk-builder`
- `realtime-api-integration`
- `chatgpt-apps-deployer`
- `codex-pr-reviewer`

```bash
npx chatgpt-skills install --bundle openai-ecosystem
```

## Non-interactive installation

```bash
npx chatgpt-skills install --bundle openai-ecosystem --tool codex-cli --yes
```

The installer records the selected bundle/skill, CLI version, target, hashes and enabled skills in the corresponding CS configuration.

For `chatgpt-web`, the CLI prepares export artifacts; it does not claim that writing files locally equals installing them in ChatGPT.

## Bundle policy

A bundle is a convenience grouping, not a trust promotion. Each skill retains its own evidence, permission, freshness and recommendation state.

Independent community project. Not affiliated with or endorsed by OpenAI.
