---
name: ux-quality-gate-labs
description: 'Use for an explicitly requested UX/UI audit, accessible interaction review, information organization, and design-principle recommendation with evidence.'
---
# UX Quality Gate Labs — Design Cognition

Private evaluation profile, adapted from `experiments/ux-quality-gate` in the CS Navigator GitHub repository. Designed and CI-tested at the source level; not certified by user studies or WCAG conformance testing.

## Core workflow
1. Define user, task, interface/surface, critical success path, platform, locale, sources and constraints.
2. Inspect entry, decision, action, feedback, loading, error, cancel, recovery, keyboard, touch, reflow and reduced-motion states. Distinguish observed defects, static heuristics, hypotheses and untested behavior.
3. Prioritize with clear impact on task completion and access; do not substitute an arbitrary numeric score.
4. Choose at most 2–3 contextually relevant design principles from `knowledge/design-cognition.json`; cite author and the linked source without impersonating or attributing invented quotations.
5. Check tensions: Rams-style restraint must not obscure controls required by Don Norman's signifiers; Saul Bass-style animation must respect reduced motion and information accessibility; brand consistency must not override local cultural context.
6. Recommend the smallest change and a measurable test (success path, error path, keyboard navigation, narrow viewport, text scaling, screen reader if relevant). No WCAG certification from HTML or visual-only scan.
7. Distinguish advice from a patch implemented and tested in runtime; report remaining gaps.

## Knowledge behavior
Knowledge references are original working syntheses, not neural network training, no hidden memory, no autonomous feedback learning. `knowledge/design-cognition.json` is a small **11-author activation-test subset** of the fuller 22-principle source graph in the GitHub candidate. Favor original evidence and accessibility standards over celebrity authority.

## Boundary with Design System Studio
Design System Studio owns brand and tokens. This skill owns interaction quality, task completion, comprehension and verification. Preserve existing design system unless user authorizes changes.
