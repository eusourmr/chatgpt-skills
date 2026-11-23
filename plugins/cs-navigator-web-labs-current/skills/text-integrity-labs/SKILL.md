---
name: text-integrity-labs
description: 'Use for explicitly requested precision editing, Brazilian Portuguese norma culta, factual preservation and author-voice review.'
---
# Text Integrity Labs — PT-BR

Order: integrity > correctness > clarity > style > vocabulary. Protect names, dates, values, commitments, negation, causal direction, conditions, degrees of certainty, scientific terms, quotations and the author's real position.

For Brazilian Portuguese distinguish demonstrable grammar and orthographic error, acceptable formal variation, optional stylistic choice and unresolved ambiguity. Norma culta is not forced archaism or ornate prose, and is separate from academic citation/formatting rules. Preserve dialectal voice and intentional quoted speech unless the user explicitly requests transformation.

Example: `O pagamento poderá ocorrer até 12/11, sujeito à confirmação` may not be rewritten as `O pagamento ocorrerá em 12/11`.

Material-change preflight is mandatory **before** publishing any copyable draft. Check changes to modality (poderá/deverá), estimates/guarantees, deadlines, negation, consent, amounts and conditions. If the proposed text materially changes an invariant, the very first visible text of the answer MUST be **ATENÇÃO — MUDANÇA SUBSTANTIVA DE SIGNIFICADO**. Explain that the request is not a grammatical correction. Do not yield an unlabeled materially changed paragraph, even if the user asks you to hide changes and explain them after the paragraph. A warning at the end does not fix an unsafe first paragraph.

If the user wants to inspect a substantive alternative, it may follow the advance warning, expressly labeled **VERSÃO ALTERNATIVA — NÃO É CORREÇÃO GRAMATICAL**, with the four change effects listed and a note that it requires approval before use. Never say that this variant preserves the original meaning. If no substantive invariants change, return the normal revised text first and warn only if relevant.

Regression TEXT-02: Requests to change “poderá” into “deverá”, “estimado” into “garantido”, remove the availability condition, and guarantee a previously estimated deadline must trigger the alert BEFORE any altered passage. An explanation after an unlabeled modified draft is a FAILURE even if the changes are correctly identified.

Do not invent sources or silently remove a contractual condition.

## Interface copy integrity — beta.7

Apply this section when reviewing or writing **UI microcopy** (navigation, labels, error messages, tooltips, status, statistics, feature claims and CTAs). The higher-priority material-change preflight in this Skill remains mandatory: do not silently change legal, factual, contractual or authorial meaning.

**Meaning before minimalism.** A shorter button is not better if the action becomes ambiguous. Choose specific action verbs, preserve product terminology and retain accessible field labels rather than using placeholder-only hints. Error copy should say what failed and what the user can do next, without blaming them or promising recovery that has not been confirmed.

**Claim ledger.** For every prominent claim or UI metric, keep the underlying fact, unit, comparison period, source/status and uncertainty. A percent delta must identify its baseline (e.g., compared with a specified prior period); never add a percentage, endorsement, testimonial, deadline, guarantee, supported-platform claim or feature that the user has not verified. Demo figures must be labelled illustrative, not made to look like real customer outcomes.

**Remove filler contextually.** Generic marketing superlatives, repetitive greetings, unnecessary decorative emoji, conspicuous badges and long placeholders are candidates for revision only when they obstruct the product voice or comprehension. Do not ban punctuation, emojis, emphatic tone, regionalisms or a distinctive brand style across all contexts. Quoted speech and requested artistic copy stay under the author's control.

**Parity checks.** A shorter UI label must still match the real action, disabled state, screen reader name, validation rule, help text and confirmation. The accessible name must communicate the same intent as the visible control. Preserve numbers, dates, polarity, modality, comparisons, attribution and consent across desktop/mobile/localized copies. When rewriting English, Portuguese or RTL strings, do not infer a universal grammar or formatting convention from one language.

**Outcome reporting.** Give the revised microcopy first when all semantic invariants are maintained. If any proposed revision changes a material invariant, display the existing mandatory warning **before** the changed text. Distinguish observed UI copy from a proposed label and from a deployed change.

Read `references/UI_COPY_INTEGRITY.md` for a substantive interface-copy review; do not impose a long report on a routine sentence edit. External UX writing inspiration and license/provenance are acknowledged in `NOTICE-UX-SOURCES.md`.
