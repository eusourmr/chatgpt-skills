# Getting Started — CS Navigator

This is the canonical installation and first-use guide for **CS Navigator 0.9.2**.

[Português do Brasil](GETTING_STARTED.pt-BR.md)

## If you only want to install and use it

You do **not** need GitHub, a terminal, an API key, or programming knowledge.

Once CS Navigator is approved and publicly published:

1. Open **ChatGPT** or **Codex**.
2. Open **Plugins**.
3. Search for **CS Navigator**.
4. Open the plugin card.
5. Select **Install plugin**.
6. Start a chat and write, for example:

```text
Use CS Navigator to review this text without changing dates, numbers, or my meaning.
```

The core package is skills-only. It does not require an MCP server, external authentication, or an API key.

> If CS Navigator is not visible in public search yet, it has not been publicly published. A GitHub release or private plugin draft alone is not proof of public-directory availability.

## Current version

| Component | Status |
|---|---|
| CS Navigator | **0.9.2 R3-final — private candidate; native requalification pending** |
| Exact ZIP | SHA-256 `890b4a7f8257021e2dedce10bce0abfa415ca4ebbed44de7966d5b90ca38117b` |
| Private plugin | version 0.9.2, not publicly listed |
| 0.7.5 | absorbed Skill Containers / Container Guardian foundation |
| 0.8 | absorbed into 0.9 |
| Next product line | 0.10 — Ecosystem Intelligence & Community Scale |

Static/package gates have passed. Native ChatGPT semantic requalification of the exact 0.9.2 bytes is still pending.

## How CS Navigator behaves

Simple tasks should stay native:

```text
What is 17 × 4?
Fix this sentence.
Summarize this paragraph.
```

Invoke CS Navigator explicitly when you want a specialized workflow:

```text
Use CS Navigator to research this Brazilian rule and distinguish current law, a bill, and old reporting.
```

```text
Use CS Navigator to organize this project into a few verifiable milestones.
```

## While public review is not complete

Ordinary users should wait for the public listing.

Technical testers may use the exact private qualification package only on a surface that supports plugin upload. Verify:

```text
890b4a7f8257021e2dedce10bce0abfa415ca4ebbed44de7966d5b90ca38117b
```

Managed-workspace administrators may use the repository marketplace after the release branch is merged and the qualified tag exists.

## Quick verification

```text
Use CS Navigator. What is 17 × 4?
```

Expected: **68**, with no unnecessary routing.

For the release qualification matrix, see:

```text
tests/fixtures/v092-native-qualification-r3.json
```

## Technical identity

- public name: **CS Navigator**
- technical slug: `cs-navigator`
- current candidate version: `0.9.2`
- package type: skills-only
- candidate: R3-final
- package evidence: `release/candidates/cs-navigator-v0.9.2-r3.json`
- native requalification: pending

Independent community project. Not affiliated with or endorsed by OpenAI.
