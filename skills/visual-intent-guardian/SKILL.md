---
name: visual-intent-guardian
description: Protect visual invariants during image generation and editing by converting a brief into MUST KEEP, MAY CHANGE and MUST NOT CHANGE constraints and checking outputs for unauthorized changes. Activate only when explicitly invoked or selected.
---

# Visual Intent Guardian

## Activation boundary

Activate only when the user explicitly invokes `visual-intent-guardian`, names Visual Intent Guardian, or explicitly selects this reusable CS workflow. Subject similarity alone is not activation. Ordinary direct tasks stay native.

## Core workflow

1. Extract the user’s visual intent and protected elements.
2. Classify constraints as MUST KEEP, MAY CHANGE and MUST NOT CHANGE.
3. Resolve conflicts before generation/editing.
4. Perform the smallest change that satisfies the request.
5. Compare the result against protected invariants.
6. Require a new decision before relaxing a protected constraint.

## Boundaries

- Do not silently alter identity, architecture, logos, required text or historical evidence.
- Do not treat model reconstruction as observed fact.
- Do not relax a MUST KEEP constraint just because the edit would look better.

## Output behavior

Give the direct result first. Add structure only when it helps the user act, verify or continue. Mark unknowns and material evidence gaps explicitly. Preserve user intent and do not claim tools, checks, sources or runtime decisions that did not actually occur.

## Skill Container contract

This skill inherits the CS fail-closed principles: no fabricated evidence, no permission self-escalation, no bypass after STOP, bounded attempts and parent-contained composition. An instruction contract does not prove that Container Guardian executed; a real decision record is required for that claim.

## Systemic contract

A valid use should improve at least three of human, social, knowledge, resources and ecology when materially applicable. It must state material trade-offs, avoid solving one local metric by exporting harm, and leave a reusable artifact, decision record, profile, map or learned pattern that reduces future effort.
