# Getting Started — CS Navigator

This is the canonical installation and first-use guide for CS Navigator.

[Português do Brasil](GETTING_STARTED.pt-BR.md)

## Public-directory status

The version currently submitted to OpenAI is **CS Navigator 0.9.4 — Submission Compliance**.

As of **2026-10-08**:
- review status: **in review**;
- publication status: **not published**.

The active development candidate is **0.15.0 — Everyday Life & Human Capability**. It is not yet the public-directory release.

## If you only want to use it

When CS Navigator is publicly published:

1. Open **Plugins** in ChatGPT.
2. Search **CS Navigator**.
3. Install it once.
4. Start a normal conversation.
5. If you want quiet capability curation in that conversation, write:

```text
Use CS Navigator as my curator.
```

Then talk normally.

The intended behavior is:
- stay native when ChatGPT can do the job directly;
- use a focused skill when a reusable workflow materially helps;
- use a Life Journey only for genuinely multi-stage situations;
- use connected actions only when external access materially changes the outcome.

## Persistence boundary

A sentence in one chat does **not** prove that curator mode is active in every future chat. Cross-chat persistence may only be claimed when the host product explicitly provides and confirms it.

## Simple Mode

For the simplest interaction, write:

```text
Use CS Navigator as my curator and explain things in Simple Mode.
```

Simple Mode should use plain language, short steps, and one action at a time when useful, without hiding material warnings or uncertainty.

## Current development candidate

| Component | Status |
|---|---|
| OpenAI directory submission | **0.9.4 — in review / not published** |
| Development candidate | **0.15.0 — static candidate built; native semantic qualification pending** |
| Candidate ZIP entries | **126** |
| Candidate ZIP SHA-256 | `b8a18c87526883dc01331c1f3428c77a375ebf5dd33a8b038db3c6641af29bb2` |
| New 0.15 skills | **31, all initially designed** |
| Live registry MCP | **planned, not active** |

## How 0.15.0 is different

0.15.0 introduces four routing levels:

```text
Native → Skill → Life Journey → Connected Action
```

It also adds:
- Personal Curator;
- Simple Mode;
- Capability Preferences;
- Life Resolution Contract;
- Human Escalation Contract;
- Proof of Progress;
- Everyday Life, Family & Care, Citizen Brazil, Home, Travel, Digital Safety, and Life Journey skills;
- a bundled registry-ready capability data contract.

## Evidence boundary

The 31 new skills are **designed**, not automatically tested.

Static validation, bundling, installation, or a successful build do not convert them to `tested` or `qualified`.

The exact 0.15.0 candidate still requires native semantic qualification.

## Technical identity

- public name: **CS Navigator**
- technical slug: `cs-navigator`
- submitted directory version: `0.9.4`
- development candidate: `0.15.0`
- candidate build workflow: `.github/workflows/build-v015-human-capability.yml`
- release manifest: `release/v015-human-capability.json`
- capability registry foundation: `registry/capabilities-v1.json`
- architecture: `docs/CS_NAVIGATOR_0.15.0_HUMAN_CAPABILITY.md`

Independent community project. Not affiliated with or endorsed by OpenAI.
