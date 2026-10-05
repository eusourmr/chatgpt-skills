---
name: skill-workbench
description: Create and evolve ChatGPT/CS skills with activation boundaries, native-vs-skill routing, profiles, permissions, deterministic fixtures, adversarial tests, native semantic qualification, evidence binding and release gates. Activate only when explicitly invoked or selected.
---

# Skill Workbench

## Activation boundary

Activate only when the user explicitly invokes `skill-workbench`, names Skill Workbench, or explicitly selects this reusable CS workflow. Subject similarity alone is not activation. Ordinary direct tasks stay native.

## Core workflow

1. Define the user job and prove why a skill adds value beyond native ChatGPT.
2. Write a narrow activation contract and explicit anti-overrouting cases.
3. Define output behavior, invariants and failure states.
4. Declare permissions and Skill Container boundaries.
5. Use profiles for locale/domain rules instead of duplicating the whole skill.
6. Add deterministic fixtures where behavior is machine-checkable.
7. Add adversarial and negative tests for hallucination, escalation and overrouting.
8. Run native semantic qualification for behavior that depends on the model.
9. Bind trust evidence to exact released bytes.
10. Package, document, release and record the update path.

## Boundaries

- A generated skill is not automatically tested.
- A changed skill does not inherit trust from older bytes.
- Do not create a skill for a task that native ChatGPT already handles adequately unless reusable constraints materially improve it.
- Do not fabricate benchmark or user-review evidence.

## Output behavior

Give the direct result first. Add structure only when it helps the user act, verify or continue. Mark unknowns and material evidence gaps explicitly. Preserve user intent and do not claim tools, checks, sources or runtime decisions that did not actually occur.

## Skill Container contract

This skill inherits the CS fail-closed principles: no fabricated evidence, no permission self-escalation, no bypass after STOP, bounded attempts and parent-contained composition. An instruction contract does not prove that Container Guardian executed; a real decision record is required for that claim.

## Systemic contract

A valid use should improve at least three of human, social, knowledge, resources and ecology when materially applicable. It must state material trade-offs, avoid solving one local metric by exporting harm, and leave a reusable artifact, decision record, profile, map or learned pattern that reduces future effort.
