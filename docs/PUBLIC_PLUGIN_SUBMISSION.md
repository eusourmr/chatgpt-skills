# Public OpenAI Plugin Directory — CS Navigator

This document separates the **currently submitted public-directory version** from the **next development candidate**.

## Current OpenAI directory state

- public name: **CS Navigator**
- technical slug: `cs-navigator`
- submitted version: **0.9.4 — Submission Compliance**
- review status: **in review**
- publication status: **not published**
- observed status date: **2026-10-08**
- package type: skills-only

The current review must not be described as approved or published before the OpenAI product UI confirms that state.

## Next development candidate

**CS Navigator 0.15.0 — Everyday Life & Human Capability**

Current static candidate:

- 31 new Human Capability skills;
- 50 bundled skills total;
- ZIP entries: **126**;
- ZIP SHA-256: `b8a18c87526883dc01331c1f3428c77a375ebf5dd33a8b038db3c6641af29bb2`;
- routing: Native → Skill → Life Journey → Connected Action;
- Personal Curator / Simple Mode / Capability Preferences;
- bundled registry foundation;
- live registry MCP: **planned-not-active**;
- private plugin: **0.15.0 installed**;
- private plugin release: `pluginrel_6ac7925aa40481919ababb85f9ef299e`;
- native semantic qualification: **PASS 12/12**;
- native evidence: `trust/evals/runs/cs-navigator-v0.15.0-r1-native-requalification.json`.

Static build success is not enough to replace the 0.9.4 submission.

## Private-plugin identity

The editable personal plugin remains:

`plugins_6ac41c5909b481918b0523726e763aa3`

The exact 0.15.0 candidate has now been uploaded to that private plugin as release `pluginrel_6ac7925aa40481919ababb85f9ef299e`. The updating conversation did not hot-reload the new skill inventory, so native semantic qualification must run from a newly loaded conversation. This private release is not a public-directory publication.

## 0.15.0 qualification order

1. finish repository documentation and stale-current-state cleanup;
2. validate deterministic/static repository gates;
3. freeze the exact 0.15.0 candidate bytes;
4. record a native semantic qualification matrix for curator behavior and new routing boundaries;
5. **DONE:** upload the frozen candidate to the editable private plugin for native product qualification;
6. **DONE:** native 0.15 runtime loaded and the recorded matrix passed 12/12;
7. if bytes change, invalidate exact-byte qualification and repeat the affected gates;
8. merge the final release candidate after evidence is complete;
9. create the GitHub tag/release from the exact qualified bytes;
10. decide whether to replace/update the OpenAI directory submission, depending on the state of the existing 0.9.4 review;
11. claim public availability only after OpenAI approval **and** explicit publication are visible.

## 0.15.0 native matrix must cover

At minimum:

- explicit “Use CS Navigator as my curator” activates curator behavior without claiming cross-chat persistence;
- ordinary direct tasks remain native when curator mode is not active;
- curator mode does not force visible skill names;
- curator mode still chooses native when sufficient;
- Simple Mode preserves warnings and uncertainty;
- connected actions retain normal confirmation and least-privilege boundaries;
- a multi-stage situation can escalate to a Life Journey without turning every task into one;
- Brazilian current-rule ambiguity emits `Jurisdição/autoridade aplicável: UNKNOWN / EVIDENCE MISSING`;
- new 0.15 skills remain `designed` unless separately supported by native execution evidence;
- Human Handoff prepares context without pretending the professional was contacted;
- Proof of Progress does not mark planned work as resolved.

## Listing identity

```text
Display name: CS Navigator
Technical slug: cs-navigator
Developer: RICARDO MOREIRA DA ROCHA
Category: Productivity
Short description: Everyday capability routing
```

## Claim boundaries

Never claim without the corresponding evidence:

- cross-chat/global curator persistence;
- automatic plugin execution in every conversation;
- live GitHub-fed runtime skill execution;
- live registry MCP before a reviewed MCP surface exists;
- every bundled skill is tested;
- zero hallucinations;
- universal safety;
- deterministic Guardian execution inside a chat without an actual decision record;
- public OpenAI approval/publication before the UI confirms it.

The 0.15 architecture may be described as **registry-ready**, not as a live self-updating plugin.

Independent community project. Not affiliated with or endorsed by OpenAI.
