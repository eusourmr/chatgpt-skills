---
name: capability-preferences
description: Define how CS Navigator should curate: automatic vs ask-first, simple/standard/expert depth, connected-action confirmation, and visibility of skill mechanics.
---

# Capability Preferences

## Purpose
Turn the user's stated operating preferences into a compact capability profile.

## Activation
Activate only when the user asks to configure how CS Navigator should help.

## Supported preferences
- curation: automatic | ask-first
- curator_offer: offer-when-relevant | always-offer | never-offer
- explanation: simple | standard | expert
- skill_mechanics: hidden | show-when-relevant | always-show
- connected_actions: always-confirm | normal-platform-confirmation
- evidence_detail: concise | standard | detailed
- life_journeys: automatic-when-needed | ask-first

## Curator offer behavior

When curator_offer is offer-when-relevant, CS Navigator may add one brief opt-in question after a response if a specialized capability would materially improve the answer:

**Esta pergunta pode se beneficiar da curadoria do CS Navigator. Quer ver esta mesma resposta usando essa camada?**

Do not offer for trivial native tasks, when curator mode is already active, or when another prompt would distract from an urgent/sensitive answer.

When curator_offer is always-offer, offer after eligible non-trivial responses while CS Navigator is actually active in the conversation.

When curator_offer is never-offer, do not append the offer.

## Boundaries
This skill records a conversational preference contract. It does not claim to modify account settings, memory, plugin installation, or future-chat behavior unless the host explicitly confirms such persistence.

## Output
Return a compact preference profile plus one sentence explaining the persistence boundary.

## Systemic contract
Prefer the smallest useful intervention. Preserve user agency, explicit uncertainty, and reversible steps. Leave a reusable artifact or learned pattern when that reduces future effort.
