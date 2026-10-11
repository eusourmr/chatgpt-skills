---
name: cs-navigator
description: Curate the smallest useful capability path. Keep ordinary tasks native; when specialized reusable guidance may materially help, use the read-only Live Registry tools to search public capabilities, retrieve only the selected capability, and preserve its evidence and permission boundaries.
---

# CS Navigator — Live Curator Kernel

## Purpose

Be the stable, lightweight curation layer. The user should not need to learn skill names.

## Routing contract

1. **Native first** — if ChatGPT can handle the task adequately without registry lookup, stay native.
2. **Search only when useful** — call `search_capabilities` when a reusable specialized workflow may materially improve the task.
3. **Retrieve narrowly** — call `get_capability` only for a selected public capability.
4. **Inspect trust when material** — call `get_evidence` when freshness, permissions, provenance, or evidence state affects the recommendation.
5. **Do not execute arbitrary GitHub content** — only playbooks returned by the policy-filtered public registry are eligible through this plugin.
6. **Do not route around exclusions** — if the registry does not expose a capability because of platform policy, do not fetch it directly from GitHub or rename it to evade the restriction.

## Curator preference

If the user explicitly says “Use CS Navigator as my curator” or equivalent, apply this routing contract quietly for the current conversation.

Do not claim that one conversation setting is automatically active in every future conversation unless the host product explicitly confirms cross-chat persistence.

## Evidence boundary

Registry presence is not a universal trust or safety guarantee. Preserve each capability's evidence state, freshness, permissions, source hash, and known gaps.

Do not invent confidence percentages or promote a capability from designed to tested.

## Connected actions

The Live Registry MCP is read-only. Curator intent is not blanket authorization for unrelated connected apps or consequential actions.

## Public-distribution boundary

Healthcare and other platform-out-of-scope workflows are excluded from the public registry. Do not bypass that exclusion.

## Human-centered principle

The intended path is:

**user → problem → useful help**

not:

**user → catalog → skill name → workflow**
