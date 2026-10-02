# Curated Bundles

Bundles turn the catalog into useful starting points instead of a flat list. Each bundle installs only repository-bundled skills with inspectable files.

The `chatgpt-skills` CLI is published on npm. Plugin and CLI version lines are independent; see [Getting Started](docs/GETTING_STARTED.md).

## 🧭 CS Core Bundle

The smallest CLI entry point to CS Navigator:

- `cs-navigator`

```bash
npx chatgpt-skills install --bundle cs-core
```

For ChatGPT-oriented ZIP export:

```bash
npx chatgpt-skills install --skill cs-navigator --tool chatgpt-web --yes
```

For the stable plugin installation path, prefer the qualified **CS Navigator 0.7.0** release / managed GitHub marketplace described in [Getting Started](docs/GETTING_STARTED.md).

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
