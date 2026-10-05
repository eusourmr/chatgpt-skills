---
name: evidence-first-research
description: Reusable research workflow that separates source facts, inference, contradiction, and unknowns; tracks freshness and source quality; and can apply a Brazil-context profile. Activate only when explicitly invoked or selected as a CS research capability; ordinary research questions stay native.
---

# Evidence-First Research

Research without filling evidence gaps with plausible-sounding facts.

## Activation boundary

Activate only when the user explicitly invokes `evidence-first-research`, asks for Evidence-First Research, or selects this reusable CS workflow.

A normal request such as “pesquise X” or “o que aconteceu?” stays native unless the user chooses this skill.

## Evidence states

Every material claim must be treated as one of:

- **SOURCE FACT** — directly supported by a cited source.
- **INFERENCE** — reasoned from source facts; label the reasoning.
- **CONTRADICTION** — credible sources materially disagree.
- **UNKNOWN / EVIDENCE MISSING** — evidence is insufficient.
- **STALE / DATE-SENSITIVE** — evidence may no longer support a current claim.

Do not turn UNKNOWN into a guess.

## Workflow

1. Define the exact question, scope, jurisdiction and time window.
2. Break the answer into material claims that would change the conclusion.
3. Prefer primary/current sources when they materially improve reliability.
4. Record source date, publication/issuing body and what each source actually supports.
5. Separate fact from interpretation.
6. Surface contradictions instead of choosing a convenient source silently.
7. Mark missing evidence explicitly.
8. Give the direct answer first, then only the evidence detail needed for verification.
9. State what new evidence would change the conclusion.

## Source hierarchy

Prefer, when relevant:
1. primary/official records;
2. original research or technical documentation;
3. high-quality secondary synthesis;
4. reputable reporting;
5. community discussion for experience/opinion, not as automatic factual authority.

Popularity is not evidence quality.

## Brazil profile

When the user selects `brasil-context`, load `profiles/brasil-context.json`.

The profile adds:
- **mandatory jurisdiction gate before any current-rule conclusion**: explicitly identify the applicable authority/scope (federal, state, municipal, Federal District, regulator/issuing body, mixed, or not applicable); if this cannot be determined, mark the conclusion UNKNOWN / EVIDENCE MISSING rather than silently assuming national scope;
- federal/state/municipal/regulatory scope;
- currentness date;
- official Brazilian source preference;
- distinction between law, regulation, court decision, bill, policy proposal, news report and commentary;
- regional context when material.

## Missing-object rule for Brazilian current-rule requests

When `brasil-context` is active and the user asks generically about a current Brazilian rule but has not yet supplied enough information to identify the rule/topic and competent authority, do **not** jump directly to a clarifying question.

First state:

**Jurisdição/autoridade aplicável: UNKNOWN / EVIDENCE MISSING**

Explain briefly that federal, state, municipal, Federal District, regulatory/issuing authority, or mixed scope cannot be assumed from “regra brasileira” alone. Then ask for the minimum missing object needed to identify the authority and current rule.

This UNKNOWN line is mandatory even when no substantive current-rule conclusion is attempted yet.

## Output contract

Default:
- **Resposta direta**
- **Jurisdição/autoridade aplicável**, whenever law, regulation, public policy, administrative rules or Brazilian official requirements are material
- **Evidência essencial**
- **Incertezas/conflitos**, only when present
- **O que falta verificar**, only when material

Avoid turning a simple question into a giant research report.

## Boundaries

Never invent:
- sources;
- URLs;
- publication dates;
- authors;
- quotations;
- statistics;
- laws;
- standards;
- court decisions;
- study results.

For legal, health, finance, public policy and safety, state material limitations and prefer authoritative current sources.

## Systemic contract

This workflow should improve at least human, social, knowledge and resource lenses by reducing false certainty, making disagreement visible, preserving reusable evidence trails and avoiding repeated low-value searching.

The balancing safeguard is explicit UNKNOWN and contradiction handling. The regenerative seed is a compact claim-evidence map that can be reused or updated when sources change.
