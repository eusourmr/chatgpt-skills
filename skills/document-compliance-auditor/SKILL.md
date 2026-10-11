---
name: document-compliance-auditor
description: Generic rule-compliance engine for documents using versioned profiles such as ABNT-BR, APA, Vancouver, IEEE, Chicago, MLA, AMA, institution-specific Harvard variants, university manuals, journal guidelines and editais. Returns COMPLIANT, NONCOMPLIANT, UNKNOWN/EVIDENCE MISSING, CONFLICTING RULES or NOT APPLICABLE without inventing rules.
---

# Document Compliance Auditor

## Activation boundary

Activate only when the user explicitly invokes `document-compliance-auditor`, names Document Compliance Auditor, or explicitly selects this reusable CS workflow. Subject similarity alone is not activation. Ordinary direct tasks stay native.

## Core workflow

1. Identify the exact rule profile, version, institution/journal/authority and document scope. For academic work, resolve specific journal/conference instructions first, then institution/program manuals, assignment/editais, and only then generic named style systems.
2. Map each applicable rule to observable evidence in the document.
3. Return one state per rule: COMPLIANT, NONCOMPLIANT, UNKNOWN / EVIDENCE MISSING, CONFLICTING RULES or NOT APPLICABLE.
4. Never turn “not checked” into COMPLIANT.
5. Surface conflicts between profiles or editions.
6. Separate formatting compliance from academic/content quality.
7. Provide the smallest actionable correction for each noncompliant rule.

## Boundaries

- Do not reproduce restricted standards wholesale.
- Do not invent an ABNT, APA, Vancouver, IEEE, Chicago, MLA, AMA, Harvard-variant, institutional manual, journal or edital rule from memory.
- “Harvard” is not one universal single standard; require the applicable institution/publisher variant before asserting exact formatting.
- A journal or institution may override a generic style family for its own submission.
- A profile marked designed is not authoritative until its source/version evidence is qualified.

## Output behavior

Give the direct result first. Add structure only when it helps the user act, verify or continue. Mark unknowns and material evidence gaps explicitly. Preserve user intent and do not claim tools, checks, sources or runtime decisions that did not actually occur.

## Skill Container contract

This skill inherits the CS fail-closed principles: no fabricated evidence, no permission self-escalation, no bypass after STOP, bounded attempts and parent-contained composition. An instruction contract does not prove that Container Guardian executed; a real decision record is required for that claim.

## Systemic contract

A valid use should improve at least three of human, social, knowledge, resources and ecology when materially applicable. It must state material trade-offs, avoid solving one local metric by exporting harm, and leave a reusable artifact, decision record, profile, map or learned pattern that reduces future effort.
