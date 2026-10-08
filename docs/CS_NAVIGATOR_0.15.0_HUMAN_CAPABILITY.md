# CS Navigator 0.15.0 — Everyday Life & Human Capability

## Product direction

CS Navigator 0.15.0 moves beyond a capability catalog. The goal is to make specialized help usable by people who do not know or care what a skill, plugin, router, MCP server, evidence state, or workflow is.

The intended user experience is simple:

> Install once. Talk normally. CS Navigator helps choose the smallest useful way to help.

A person should be able to say:

> Use CS Navigator as my curator.

From that point, inside the conversation where that preference is active, Navigator may quietly decide whether the task should stay native, use a skill, become a Life Journey, or use a connected action.

**Persistence boundary:** one chat instruction does not prove that the preference is active in all future chats. Cross-chat persistence may only be claimed when the host product explicitly provides and confirms it.

## Four routing levels

1. **Native** — ChatGPT can complete the task directly.
2. **Skill** — one reusable workflow materially improves the result.
3. **Life Journey** — the situation spans several dependent stages, people, dates, or domains.
4. **Connected Action** — an app, account, API, MCP server, or external action materially changes the outcome.

The router should always prefer the lowest-complexity level that can solve the user's real problem.

## Personal capability layer

### Personal Curator

When explicitly enabled by the user, Navigator performs silent capability curation. It should not force skill names or architecture on ordinary users.

### Simple Mode

Designed for anyone who wants the easiest usable path, including people with low digital familiarity. It uses plain language, short steps, visible button names, and one action at a time when useful. Simplicity must never become patronizing language or omission of material warnings.

### Capability Preferences

A user-visible preference contract may define:

- curation: automatic or ask-first;
- explanation: simple, standard, or expert;
- skill mechanics: hidden, show when relevant, or always show;
- connected actions: always confirm or follow platform confirmation;
- evidence detail: concise, standard, or detailed;
- Life Journeys: automatic when needed or ask-first.

These are conversational operating preferences unless the host explicitly confirms account-level persistence.

## Life Resolution Contract

For ordinary real-world problems, use only the parts that materially help:

1. What is happening.
2. What we know.
3. What remains unknown.
4. Immediate risks or deadlines.
5. What the user can do now.
6. What depends on another person, company, professional, or authority.
7. What evidence/documents to keep.
8. The single next action.
9. What “resolved” means.

## Human Escalation Contract

When AI has reached its useful limit, do more than say “talk to a professional.” Prepare a clean handoff with:

- why escalation is needed;
- objective;
- timeline;
- key facts;
- evidence/documents;
- actions already taken;
- responses/protocols;
- open questions;
- desired outcome;
- urgency/deadline;
- remaining uncertainty.

## Proof of Progress

A conversation is not proof that a real-world task moved forward. When useful, close with:

- resolved;
- in progress;
- pending;
- blocked;
- waiting on;
- evidence obtained;
- next action;
- owner;
- definition of done;
- review trigger/date.

## Everyday Life skill families

### Personalization and curation
- personal-curator
- simple-mode
- capability-preferences

### Everyday administration and decisions
- everyday-problem-solver
- life-admin-organizer
- overwhelm-to-next-action
- personal-decision-record
- decision-stop-rule
- purchase-decision-helper
- subscription-cleanup
- household-finance-planner

### Home
- home-maintenance-planner
- repair-decision-helper

### Citizen Brazil
- consumer-rights-navigator
- bureaucracy-br-navigator
- public-service-br-navigator

### Family and care
- family-digital-safety
- school-family-organizer
- caregiver-coordinator
- medical-appointment-prep

### Communication and digital safety
- difficult-conversation-prep
- scam-checker
- digital-helper-simple

### Life Journeys
- travel-readiness
- moving-life-journey
- major-life-change-planner

### Cross-cutting resolution
- human-handoff-preparer
- proof-of-progress
- life-state-map
- information-expiry-guard
- real-world-evidence-kit

## Evidence policy

Every new 0.15 skill starts as **designed**.

- Creation is not testing.
- Bundling is not testing.
- Installation is not testing.
- Passing static validation is not native semantic qualification.
- Changed bytes do not automatically inherit exact-byte evidence from older artifacts.

## Live Capability Registry direction

0.15.0 establishes the data contract for a future read-only Live Capability Registry. The registry may eventually expose current capability metadata such as:

- skill ID and version;
- summary;
- evidence state;
- freshness;
- permissions;
- profiles;
- jurisdiction;
- known gaps;
- reviewed commit or artifact.

The registry must not make arbitrary GitHub content executable. Promotion into the usable registry remains gated by validation and evidence.

The first live MCP surface, when implemented and separately reviewed, should remain low privilege and read-only, with operations conceptually equivalent to:

- search_capabilities;
- get_capability;
- get_evidence.

The 0.15.0 package must not claim that a live MCP registry exists until it actually does.

## Human-centered principle

The user should not have to learn the skill system.

**User → problem → useful help**

rather than:

**User → catalog → skill name → workflow**

The best skill for an ordinary person may be the one they never need to know by name.
