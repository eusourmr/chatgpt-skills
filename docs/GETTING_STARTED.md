# Getting Started — CS Connect

This is the canonical installation and first-use guide for **CS Connect 0.9.0**.

[Português do Brasil](GETTING_STARTED.pt-BR.md)

## If you only want to install and use it

You do **not** need GitHub, a terminal, an API key, or programming knowledge.

Once CS Connect is published in OpenAI's public plugin directory:

1. Open **ChatGPT** or **Codex**.
2. Open **Plugins**.
3. Search for **CS Connect**.
4. Open the plugin card.
5. Select **Install plugin**.
6. Start a chat and write, for example:

```text
Use CS Connect to review this text without changing dates, numbers, or my meaning.
```

CS Connect 0.9.0 is skills-only and does not require an MCP server, external authentication, or an API key for its core package.

> If CS Connect is not visible in public search yet, the public package is still under review or has not been published. A GitHub release alone is not proof of public-directory availability.

## Current version

| Component | Status |
|---|---|
| CS Connect | **0.9.0 R2 — qualified production candidate** |
| Qualified ZIP | SHA-256 `3379f932301b707fcf935f8f4f6f45bdea10d3e7277daced2849f93c3f824cce` |
| 0.7.5 | absorbed as the internal Skill Containers / Container Guardian foundation |
| 0.8 | absorbed into 0.9 |
| `chatgpt-skills` CLI | independent version line, currently `0.4.0` |
| Next line | 0.10 — Ecosystem Intelligence & Community Scale |

R2 qualification is exact-byte and case-bound. It is not a universal safety guarantee or zero-hallucination claim.

## How CS Connect behaves

Simple tasks should stay native:

```text
What is 17 × 4?
Fix this sentence.
Summarize this paragraph.
```

Invoke CS Connect explicitly when you want one of its workflows:

```text
Use CS Connect to research this Brazilian rule and distinguish current law, a bill, and old reporting.
```

```text
Use CS Connect to organize this project into a few verifiable milestones.
```

## While public review is pending

### A. Qualified ZIP

Use the GitHub 0.9.0 release ZIP on a surface that supports plugin upload and verify:

```text
3379f932301b707fcf935f8f4f6f45bdea10d3e7277daced2849f93c3f824cce
```

### B. Managed GitHub marketplace

Workspace administrators can import:

```text
Repository: https://github.com/eusourmr/chatgpt-skills
Path:       leave empty
Ref:        use the stable 0.9.0 release tag once published
```

See [GitHub distribution](GITHUB_PLUGIN_DISTRIBUTION.md).

### C. CLI for technical users

```bash
npx chatgpt-skills install
npx chatgpt-skills inspect cs-navigator
npx chatgpt-skills doctor
```

## Quick verification

```text
Use CS Connect. What is 17 × 4?
```

Expected: **68**, with no unnecessary routing workflow.

For a specialist behavior check:

```text
Use CS Connect to organize a large project into milestones and prevent me from marking stages complete without evidence.
```

The result should use a small milestone set, evidence gates, and reversible checkpoints where material.

## Technical identity

- public name: **CS Connect**
- technical slug: `cs-navigator`
- version: `0.9.0`
- package type: skills-only
- qualified candidate: R2
- package evidence: `release/candidates/cs-connect-v0.9.0-r2.json`
- native requalification: `trust/evals/runs/cs-connect-v0.9.0-r2-native-requalification.json`

For release engineering, see [Public Plugin Submission](PUBLIC_PLUGIN_SUBMISSION.md) and [Plugin Maintenance](PLUGIN_MAINTENANCE.md).

Independent community project. Not affiliated with or endorsed by OpenAI.
