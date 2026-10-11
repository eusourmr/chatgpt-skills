# Human Reality Review — CS Navigator 0.17

The purpose of this review is not to ask whether a skill is technically valid. It asks whether the capability is still useful, comprehensible, proportionate, and honest for a real person.

## Curation decisions

- **KEEP** — useful and clearly differentiated.
- **REFINE** — useful, but scope, language, activation, evidence, or handoff needs improvement.
- **MERGE** — overlapping capabilities should become one clearer capability.
- **RETIRE** — do not present as an active distributable capability; source/history may remain for audit.

## Delivery states

- **CORE** — stable plugin core; should change rarely.
- **REGISTRY-ONLY** — discoverable through the live registry, not bundled in the stable plugin.
- **SOURCE-ONLY** — preserved in source/history but excluded from public discovery/distribution.

A capability can be KEEP + REGISTRY-ONLY. Delivery location is not a quality score.

## Human Reality questions

For every capability ask:

1. What real human problem does this solve?
2. Could native ChatGPT already solve it adequately?
3. Would an ordinary person know when to use it?
4. Is the name understandable outside our project?
5. Does the description trigger too broadly or too narrowly?
6. Does it duplicate another capability?
7. What evidence does it actually have?
8. What could become stale?
9. What cultural, institutional, legal, educational, or regional assumptions are hidden?
10. Where must a human professional or institution remain in control?
11. Does the workflow leave a reusable artifact, skill, or decision record?
12. Should it remain bundled, move to registry-only, merge, or retire?

## First academic review

| Capability | Decision | 0.17 direction |
| --- | --- | --- |
| academic-integrity-reviewer | KEEP + REFINE | Preserve integrity review; add clearer handoff from Academic Writing Navigator and distinguish research quality from formatting. |
| document-compliance-auditor | KEEP + REFINE | Become the general profile engine for ABNT, APA, Vancouver, IEEE, Chicago, MLA, institutional manuals, journal instructions and editais. |
| argument-article-architect | KEEP | Preserve thesis/evidence/counterargument architecture; do not turn it into a scientific-method skill. |
| evidence-first-research | KEEP | Remain the evidence/freshness layer for literature and factual research. |
| learning-mastery-coach | CREATE | Super skill for understanding, active recall, Feynman, quizzes, flashcards, error-ledger, application and spaced review. |
| academic-writing-navigator | CREATE | Orchestrate academic writing, profile resolution, integrity, evidence and journal/institution instructions for Portuguese-language students. |

## Principle

Human curation must be allowed to delete, merge or simplify capabilities. Catalog growth is not a success metric.


## First-pass catalog result

The 2026-10-11 first pass is recorded in `governance/human-reality-review-v017.json`.

- 63 first-party capabilities reviewed at product-fit/catalog level
- KEEP: 48
- REFINE: 9
- MERGE: 4
- RETIRE: 2

This pass does not count as native semantic execution evidence.
