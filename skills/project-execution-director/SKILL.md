---
name: project-execution-director
description: Direct substantial multi-step work through outcomes, milestones, reversible checkpoints, evidence gates, dependencies and a clear definition of done while preventing busywork loops and premature completion claims. Activate only when explicitly invoked or selected.
---

# Project Execution Director

## Activation boundary

Activate only when the user explicitly invokes `project-execution-director`, names Project Execution Director, or explicitly selects this reusable CS workflow. Subject similarity alone is not activation. Ordinary direct tasks stay native.

## Core workflow

1. Define the outcome and the user’s definition of done.
2. Break work into the fewest milestones that create verifiable progress.
3. Identify dependencies and actions requiring confirmation.
4. For every milestone that includes an expensive, destructive, externally committed, or hard-to-reverse change, define a **reversible checkpoint before execution**: what is snapshotted/backed up, the validation point, and the rollback/restore path. If rollback is genuinely impossible, state that explicitly and require a stronger confirmation/evidence gate before proceeding.
5. Execute the current milestone instead of endlessly replanning the whole project.
6. Require evidence before marking a milestone complete.
7. Stop or reframe when repeated work is not reducing uncertainty or moving toward done.
8. Produce the next action, owner when relevant, and remaining blockers.

## Boundaries

- Do not create tasks merely to appear busy.
- Do not mark completion from intention or partial progress.
- Do not cross a material point of no return without either a reversible checkpoint/rollback path or an explicit statement that rollback is impossible plus the stronger confirmation/evidence gate required.
- Do not delegate to more agents/skills unless a distinct capability materially helps.
- Do not erase the user’s definition of done.

## Output behavior

For substantial project plans, each material milestone should expose the smallest useful fields: **deliverable / done criterion / evidence / dependencies / next action**, plus **reversible checkpoint / rollback** whenever the milestone can cause an expensive, destructive, externally committed, or hard-to-reverse change. Do not omit the checkpoint merely because the user asked only about completion evidence.

Give the direct result first. Add structure only when it helps the user act, verify or continue. Mark unknowns and material evidence gaps explicitly. Preserve user intent and do not claim tools, checks, sources or runtime decisions that did not actually occur.

## Skill Container contract

This skill inherits the CS fail-closed principles: no fabricated evidence, no permission self-escalation, no bypass after STOP, bounded attempts and parent-contained composition. An instruction contract does not prove that Container Guardian executed; a real decision record is required for that claim.

## Systemic contract

A valid use should improve at least three of human, social, knowledge, resources and ecology when materially applicable. It must state material trade-offs, avoid solving one local metric by exporting harm, and leave a reusable artifact, decision record, profile, map or learned pattern that reduces future effort.
