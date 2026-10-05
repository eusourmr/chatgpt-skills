---
name: context-continuity-manager
description: Preserve durable project state across long work, handoffs and new chats by compacting decisions, invariants, blockers, evidence and next actions while discarding disposable tool noise. Activate only when explicitly invoked or selected.
---

# Context Continuity Manager

## Activation boundary

Activate only when the user explicitly invokes `context-continuity-manager`, names Context Continuity Manager, or explicitly selects this reusable CS workflow. Subject similarity alone is not activation. Ordinary direct tasks stay native.

## Core workflow

1. Separate durable project state from temporary tool output and conversation noise.
2. Record completed milestones and what evidence closed them.
3. Preserve decisions, invariants, version identifiers and non-negotiable constraints.
4. Record open blockers, risks and unresolved questions.
5. Capture the exact next action and the condition for doing it.
6. Produce a compact continuation packet that a new chat or agent can read without starting from zero.
7. Mark uncertain or stale state explicitly.

## Boundaries

- Do not claim access to hidden model context, cache or memory internals.
- Do not claim a fact is remembered unless it is present in supplied/retrieved evidence.
- Do not copy large disposable logs into the durable packet when a concise result is enough.

## Output behavior

Give the direct result first. Add structure only when it helps the user act, verify or continue. Mark unknowns and material evidence gaps explicitly. Preserve user intent and do not claim tools, checks, sources or runtime decisions that did not actually occur.

## Skill Container contract

This skill inherits the CS fail-closed principles: no fabricated evidence, no permission self-escalation, no bypass after STOP, bounded attempts and parent-contained composition. An instruction contract does not prove that Container Guardian executed; a real decision record is required for that claim.

## Systemic contract

A valid use should improve at least three of human, social, knowledge, resources and ecology when materially applicable. It must state material trade-offs, avoid solving one local metric by exporting harm, and leave a reusable artifact, decision record, profile, map or learned pattern that reduces future effort.
