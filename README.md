# ChatGPT Skills

<img width="1774" height="887" alt="banner" src="https://github.com/user-attachments/assets/108b98b3-1c3d-4cc1-8daa-a71abf0debf9" />
</br>
</br>

[![Validate catalog](https://github.com/eusourmr/chatgpt-skills/actions/workflows/validate.yml/badge.svg)](https://github.com/eusourmr/chatgpt-skills/actions/workflows/validate.yml)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Curation](https://img.shields.io/badge/curation-human--governed-2f6f4e.svg)](CONTRIBUTING.md)
[![Catalog](https://img.shields.io/badge/catalog-78%20entries-4c1.svg)](PROGRESS.md)
[![npm](https://img.shields.io/npm/v/chatgpt-skills.svg)](https://www.npmjs.com/package/chatgpt-skills)
[![Standard](https://img.shields.io/badge/Agent%20Skills-agentskills.io-6f42c1.svg)](https://agentskills.io/)

**The curated skills catalog for the OpenAI ecosystem.** Unlike a flat community list, entries here are source-checked, categorized by use case, mapped to the open Agent Skills format, and separated by provenance: OpenAI-published, independently verified, or community-authored.

[Português do Brasil](README.pt-BR.md) · [Getting Started](docs/GETTING_STARTED.md) · [Bundles](BUNDLES.md) · [Progress](PROGRESS.md) · [Roadmap](ROADMAP.md) · [Community](COMMUNITY.md)

> **Independent community project. Not affiliated with or endorsed by OpenAI.** “Official” in this repository describes attributable OpenAI publication/provenance; it never means OpenAI has endorsed this repository.

## 🏛️ Official OpenAI Catalog

This section is a **source-verified window into OpenAI-published skills/plugins**, not a claim that this repository itself is official.

[![OpenAI Build iOS Apps](https://img.shields.io/badge/OpenAI-Build%20iOS%20Apps-000000?logo=openai&logoColor=white)](https://github.com/openai/plugins/tree/main/plugins/build-ios-apps)
[![OpenAI Build Web Apps](https://img.shields.io/badge/OpenAI-Build%20Web%20Apps-000000?logo=openai&logoColor=white)](https://github.com/openai/plugins/tree/main/plugins/build-web-apps)
[![OpenAI Developers](https://img.shields.io/badge/OpenAI-Developers-000000?logo=openai&logoColor=white)](https://github.com/openai/plugins/tree/main/plugins/openai-developers)

The quality catalog currently tracks **78 entries**: **77 skills + 1 source collection**, comprising **61 regenerative-core** and **17 OpenAI-catalog** entries. Catalog presence is not execution evidence; `designed`, `tested`, freshness, security findings, and recommendation state remain separate. See [`PROGRESS.md`](PROGRESS.md) and [`catalog.json`](catalog.json).

## Why this catalog is different

| Capability | This catalog | Typical flat list |
|---|---:|---:|
| OpenAI provenance distinguished from third-party authorship | ✅ | Sometimes |
| Agent Skills / `SKILL.md` format checks | ✅ | Inconsistent |
| Continuous verification date | ✅ | Rare |
| Human-governed curation policy | ✅ | Varies |
| Machine-readable status, compatibility, rating state and reviews | ✅ | Rare |
| Bundles by real use case | ✅ | ❌ |
| Interactive installer | ✅ | ❌ |
| Public health/progress report | ✅ | ❌ |
| Regenerative/systemic design standard | ✅ | ❌ |
| Skill Containers: fail-closed evidence/permission containment | ✅ CS Navigator 0.9.0 | ❌ |

## 🛡️ Current development line

**Current development candidate:** **CS Navigator 0.16.0 — Evergreen Core & Live Registry**.

0.16.0 responds directly to the current OpenAI plugin-review constraints:

- adds the required Support URL;
- migrates away from a skills-only public submission toward **skills + remote MCP**;
- excludes healthcare/medical workflows from the public distribution boundary;
- reduces the distributed plugin to a stable six-skill Evergreen Core;
- moves live capability discovery, evidence, freshness, and distribution availability into a read-only GitHub-backed registry;
- never executes arbitrary GitHub files as remote instructions.

The repository implementation and MCP server code are already in place and pass the 0.16 static build/audit. The remaining release blocker is external: a stable public HTTPS MCP endpoint must be deployed and verified before the final ZIP can be built.

The GitHub release **CS Navigator 0.15.0 — Everyday Life & Human Capability** remains the last fully qualified release. Its exact private candidate passed the recorded 12/12 native semantic Navigator matrix.

The OpenAI Platform portal currently shows **0.15.0 Draft / Not published / Needs attention**. The portal findings are tracked in [Public plugin submission](docs/PUBLIC_PLUGIN_SUBMISSION.md).

> **No evidence → no invented fact. No permission → no self-escalation. No authorized path → stop.**

Read: [0.16.0 Evergreen Core](docs/CS_NAVIGATOR_0.16.0_EVERGREEN_CORE.md) · [Getting Started](docs/GETTING_STARTED.md) · [Public plugin submission](docs/PUBLIC_PLUGIN_SUBMISSION.md)

## 🚀 Start in 1 Minute

The intended end-user experience is deliberately simple:

1. Install **CS Navigator** once.
2. Start a normal ChatGPT conversation.
3. If you want silent capability curation in that conversation, write: `Use CS Navigator as my curator.`
4. Then talk normally. Navigator should keep work native when sufficient and only add a skill, Life Journey, or connected action when it materially helps.

**Persistence boundary:** one chat instruction does not prove that curator mode is active in every future conversation. Cross-chat persistence may only be claimed when the host product explicitly supports and confirms it.

Version lines:
- OpenAI Platform portal: **0.15.0 Draft / Needs attention / Not published**
- current development candidate: **0.16.0 Evergreen Core / static build PASS / production MCP endpoint required**
- technical slug: `cs-navigator`
- 0.7.5: historical trust/runtime foundation
- 0.9.x: first-party platform and submission-compliance foundation
- `chatgpt-skills` CLI/npm: independent version line
- next architectural step after 0.15 qualification: live read-only capability registry and stronger personal continuity, without making arbitrary GitHub content executable

## Featured OpenAI-native production skills

| Skill | Purpose |
|---|---|
| [`openai-agents-sdk-builder`](skills/featured/openai-agents-sdk-builder/) | Scaffold and review Agents SDK projects with tools, guardrails, state, tracing and sandbox boundaries. |
| [`realtime-api-integration`](skills/featured/realtime-api-integration/) | Design WebSocket/WebRTC Realtime integrations with explicit transport fallback and secret isolation. |
| [`chatgpt-apps-deployer`](skills/featured/chatgpt-apps-deployer/) | Package and validate ChatGPT Apps SDK releases without pretending platform approval is automatic. |
| [`codex-pr-reviewer`](skills/featured/codex-pr-reviewer/) | Review PRs against versioned business rules with risk-ranked evidence. |

## Curation model

A folder named `skill` is not enough. This catalog favors focused workflows, inspectable source, visible licensing, honest compatibility claims, narrow permissions, testable installation paths, and plain language before technical depth.

OpenAI distinguishes standalone skills from plugin packages, while the open Agent Skills format defines a lightweight folder centered on `SKILL.md`. This repository uses both concepts conservatively and records what surface a candidate actually supports.

The repository also has a stricter **Regenerative core**: repository-authored skills there must improve at least three of five lenses—human, social, knowledge, resources, and ecology—while checking harm across all five, creating a reinforcing benefit loop, adding a balancing safeguard, and leaving reusable capability behind. Read the complete [Regenerative Skills Standard](docs/REGENERATIVE_STANDARD.md).

## Catalog

<!-- CATALOG:START -->
<!-- Generated by scripts/catalog.py. Do not edit this block manually. -->

### Official collection

- [**OpenAI Plugins**](https://github.com/openai/plugins) — The current official collection of plugin examples for ChatGPT and Codex, including skill-only and MCP-backed packages. `Collection` · `OpenAI catalog` · `Chat` · `Work` · `Codex` · `License: Per package` · OpenAI · 2026-09-08

### Regenerative core

- [**Academic Integrity Reviewer**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/academic-integrity-reviewer) — Review TCCs, dissertations, theses and academic articles for objective-method-result-conclusion consistency, claim-source support, citation-bibliography matching, figure/table references, scope drift and unsupported conclusions without inventing sources. Activate only when explicitly invoked or selected. `Skill` · `Regenerative core` · `Design reviewed` · `4/5 lenses: human, social, knowledge, resources` · `Chat` · `Codex` · `License: MIT` · eusourmr · 2026-10-05
- [**academic-writing-navigator**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/academic-writing-navigator) — Orchestrate academic writing for Portuguese-language students and researchers across international citation/formatting systems, institution and journal instructions, evidence quality, argument structure and academic integrity. Resolve the applicable style/profile before asserting formatting rules. `Skill` · `Regenerative core` · `Design reviewed` · `4/5 lenses: human, social, knowledge, resources` · `Chat` · `Codex` · `License: MIT` · eusourmr · 2026-10-11
- [**Argument & Article Architect**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/argument-article-architect) — Structure and strengthen articles, essays, opinion pieces, institutional texts, and academic-style articles while preserving the author's thesis and separating evidence from interpretation. Activate only when explicitly invoked or selected as a reusable CS writing workflow; ordinary rewriting stays native. `Skill` · `Regenerative core` · `Design reviewed` · `4/5 lenses: human, social, knowledge, resources` · `Chat` · `Codex` · `License: MIT` · eusourmr · 2026-10-05
- [**Art Critique Studio**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/art-critique-studio) — Critique works in progress and finished art through intention, composition, value, color, edges, rhythm and focal hierarchy while separating observation, interpretation and recommendation and preserving the artist’s style. Activate only when explicitly invoked or selected. `Skill` · `Regenerative core` · `Design reviewed` · `4/5 lenses: human, social, knowledge, resources` · `Chat` · `Codex` · `License: MIT` · eusourmr · 2026-10-05
- [**bureaucracy-br-navigator**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/bureaucracy-br-navigator) — Navigate Brazilian administrative procedures by identifying competent authority, territorial scope, required object, documents, official channel, and currentness. `Skill` · `Regenerative core` · `Design reviewed` · `4/5 lenses: human, social, knowledge, resources` · `Chat` · `Codex` · `License: MIT` · eusourmr · 2026-10-08
- [**capability-preferences**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/capability-preferences) — Define how CS Navigator should curate: automatic vs ask-first, simple/standard/expert depth, connected-action confirmation, and visibility of skill mechanics. `Skill` · `Regenerative core` · `Design reviewed` · `4/5 lenses: human, social, knowledge, resources` · `Chat` · `Codex` · `License: MIT` · eusourmr · 2026-10-08
- [**caregiver-coordinator**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/caregiver-coordinator) — Coordinate non-clinical family caregiving tasks, contacts, appointments, documents, responsibilities, handoffs, and emergency information without replacing medical judgment. `Skill` · `Regenerative core` · `Design reviewed` · `4/5 lenses: human, social, knowledge, resources` · `Chat` · `Codex` · `License: MIT` · eusourmr · 2026-10-08
- [**chatgpt-apps-deployer**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/featured/chatgpt-apps-deployer) — Prepare, validate, package, and release ChatGPT Apps SDK projects with MCP-compatible tools, UI assets, privacy metadata, deployment checks, submission evidence, and rollback-ready release artifacts. `Skill` · `Regenerative core` · `Design reviewed` · `4/5 lenses: human, social, knowledge, resources` · `Chat` · `Codex` · `License: MIT` · eusourmr · 2026-10-08
- [**codex-pr-reviewer**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/featured/codex-pr-reviewer) — Review pull requests with Codex using repository-specific business rules, risk-ranked findings, evidence from changed lines, regression checks, and a machine-readable policy that teams can version with the code. `Skill` · `Regenerative core` · `Design reviewed` · `4/5 lenses: human, social, knowledge, resources` · `Chat` · `Codex` · `License: MIT` · eusourmr · 2026-10-08
- [**consumer-rights-navigator**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/consumer-rights-navigator) — Help users structure a consumer dispute, evidence, desired remedy, complaint path, and current-rule verification without inventing legal rights. `Skill` · `Regenerative core` · `Design reviewed` · `4/5 lenses: human, social, knowledge, resources` · `Chat` · `Codex` · `License: MIT` · eusourmr · 2026-10-08
- [**Context Continuity Manager**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/context-continuity-manager) — Preserve durable project state across long work, handoffs and new chats by compacting decisions, invariants, blockers, evidence and next actions while discarding disposable tool noise. Activate only when explicitly invoked or selected. `Skill` · `Regenerative core` · `Design reviewed` · `4/5 lenses: human, social, knowledge, resources` · `Chat` · `Codex` · `License: MIT` · eusourmr · 2026-10-05
- [**cs-navigator**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/featured/cs-navigator) — Curate the smallest useful capability path for explicit capability-selection requests or after the user explicitly enables CS Navigator as their curator in the current conversation. Prefer native ChatGPT when sufficient, consult the live read-only capability registry when useful, and escalate to connected actions only when they materially improve the outcome. `Skill` · `Regenerative core` · `Design reviewed` · `4/5 lenses: human, social, knowledge, resources` · `Chat` · `Codex` · `License: MIT` · eusourmr · 2026-10-08
- [**decision-stop-rule**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/decision-stop-rule) — Detect when more comparison or research is no longer likely to change a decision and define a rational stopping rule without forcing the choice. `Skill` · `Regenerative core` · `Design reviewed` · `4/5 lenses: human, social, knowledge, resources` · `Chat` · `Codex` · `License: MIT` · eusourmr · 2026-10-08
- [**Design System Studio**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/design-system-studio) — Intentional visual-system workflow for web interfaces, social/canvas pieces, and reusable themes. Defines visual direction, hierarchy, tokens, spacing, typography, accessibility, and invariants before implementation. Activate only when explicitly invoked or selected; ordinary image/design requests stay native. `Skill` · `Regenerative core` · `Design reviewed` · `4/5 lenses: human, social, knowledge, resources` · `Chat` · `Codex` · `License: MIT` · eusourmr · 2026-10-05
- [**difficult-conversation-prep**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/difficult-conversation-prep) — Prepare a difficult conversation using objective facts, needs, boundaries, requests, likely misunderstandings, and non-manipulative language. `Skill` · `Regenerative core` · `Design reviewed` · `4/5 lenses: human, social, knowledge, resources` · `Chat` · `Codex` · `License: MIT` · eusourmr · 2026-10-08
- [**digital-helper-simple**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/digital-helper-simple) — Give plain-language, step-by-step help for common phone, computer, app, account, and internet tasks, especially for people with low digital familiarity. `Skill` · `Regenerative core` · `Design reviewed` · `4/5 lenses: human, social, knowledge, resources` · `Chat` · `Codex` · `License: MIT` · eusourmr · 2026-10-08
- [**Document Compliance Auditor**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/document-compliance-auditor) — Generic rule-compliance engine for documents using versioned profiles such as ABNT-BR, university manuals, journal guidelines and editais. Returns COMPLIANT, NONCOMPLIANT, UNKNOWN/EVIDENCE MISSING, CONFLICTING RULES or NOT APPLICABLE without inventing rules. Activate only when explicitly invoked or selected. `Skill` · `Regenerative core` · `Design reviewed` · `4/5 lenses: human, social, knowledge, resources` · `Chat` · `Codex` · `License: MIT` · eusourmr · 2026-10-05
- [**Engineering Investigator**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/engineering-investigator) — Systematic debugging and codebase investigation workflow that gathers evidence, searches text and structure, forms falsifiable hypotheses, tests the smallest useful change, and verifies regressions. Activate only when explicitly invoked or selected; ordinary coding questions stay native. `Skill` · `Regenerative core` · `Design reviewed` · `4/5 lenses: human, social, knowledge, resources` · `Chat` · `Codex` · `License: MIT` · eusourmr · 2026-10-05
- [**everyday-problem-solver**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/everyday-problem-solver) — Turn an ordinary life problem into a clear path: facts, unknowns, safe immediate actions, dependencies, evidence to keep, escalation, and definition of resolved. `Skill` · `Regenerative core` · `Design reviewed` · `4/5 lenses: human, social, knowledge, resources` · `Chat` · `Codex` · `License: MIT` · eusourmr · 2026-10-08
- [**Evidence-First Research**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/evidence-first-research) — Reusable research workflow that separates source facts, inference, contradiction, and unknowns; tracks freshness and source quality; and can apply a Brazil-context profile. Activate only when explicitly invoked or selected as a CS research capability; ordinary research questions stay native. `Skill` · `Regenerative core` · `Design reviewed` · `4/5 lenses: human, social, knowledge, resources` · `Chat` · `Codex` · `License: MIT` · eusourmr · 2026-10-05
- [**family-digital-safety**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/family-digital-safety) — Help families manage online safety, privacy, scams, account security, age-appropriate boundaries, and digital habits without covert surveillance or manipulative control. `Skill` · `Regenerative core` · `Design reviewed` · `4/5 lenses: human, social, knowledge, resources` · `Chat` · `Codex` · `License: MIT` · eusourmr · 2026-10-08
- [**Founder Product Strategist**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/founder-product-strategist) — Product and founder decision workflow combining focus, simplicity, end-to-end experience, positioning, business-model discipline, reversible experiments, and evidence-aware behavioral science. Activate only when explicitly invoked or selected as a reusable CS strategy capability; ordinary business advice stays native. `Skill` · `Regenerative core` · `Design reviewed` · `4/5 lenses: human, social, knowledge, resources` · `Chat` · `Codex` · `License: MIT` · eusourmr · 2026-10-05
- [**home-maintenance-planner**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/home-maintenance-planner) — Create a preventive maintenance plan for a home and common equipment with priorities, intervals, evidence, and escalation to qualified help when needed. `Skill` · `Regenerative core` · `Design reviewed` · `4/5 lenses: human, social, knowledge, resources` · `Chat` · `Codex` · `License: MIT` · eusourmr · 2026-10-08
- [**household-finance-planner**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/household-finance-planner) — Organize household cash flow, recurring bills, priorities, buffers, scenarios, and trade-offs without acting as an investment adviser. `Skill` · `Regenerative core` · `Design reviewed` · `4/5 lenses: human, social, knowledge, resources` · `Chat` · `Codex` · `License: MIT` · eusourmr · 2026-10-08
- [**human-handoff-preparer**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/human-handoff-preparer) — When AI has reached its useful limit, prepare a concise handoff to a lawyer, accountant, school, bank, insurer, technician, public agency, or other qualified human professional. `Skill` · `Regenerative core` · `Design reviewed` · `4/5 lenses: human, social, knowledge, resources` · `Chat` · `Codex` · `License: MIT` · eusourmr · 2026-10-08
- [**information-expiry-guard**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/information-expiry-guard) — Mark date-sensitive life information with when it was verified, what could make it stale, and when it must be checked again before action. `Skill` · `Regenerative core` · `Design reviewed` · `4/5 lenses: human, social, knowledge, resources` · `Chat` · `Codex` · `License: MIT` · eusourmr · 2026-10-08
- [**Interactive Creative Builder**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/interactive-creative-builder) — Build interactive visual experiences and richer web artifacts with explicit state, parameters, deterministic seeds where useful, navigation, accessibility, performance and export boundaries. Activate only when explicitly invoked or selected; ordinary image generation and simple pages stay native. `Skill` · `Regenerative core` · `Design reviewed` · `4/5 lenses: human, social, knowledge, resources` · `Chat` · `Codex` · `License: MIT` · eusourmr · 2026-10-05
- [**learning-mastery-coach**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/learning-mastery-coach) — Build an adaptive learning loop from user-provided study material using understanding, active recall, Feynman explanation, quizzes, flashcards, application, error correction and spaced review. Do not confuse generated study material with evidence that the learner has mastered the topic. `Skill` · `Regenerative core` · `Design reviewed` · `4/5 lenses: human, social, knowledge, resources` · `Chat` · `Codex` · `License: MIT` · eusourmr · 2026-10-11
- [**life-admin-organizer**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/life-admin-organizer) — Organize personal bureaucracy, documents, renewals, appointments, bills, pending requests, deadlines, and next actions into a manageable life-admin system. `Skill` · `Regenerative core` · `Design reviewed` · `4/5 lenses: human, social, knowledge, resources` · `Chat` · `Codex` · `License: MIT` · eusourmr · 2026-10-08
- [**life-state-map**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/life-state-map) — Maintain an explicit state map for a real-world situation: resolved, active, blocked, waiting on others, next, and dropped, with dependencies. `Skill` · `Regenerative core` · `Design reviewed` · `4/5 lenses: human, social, knowledge, resources` · `Chat` · `Codex` · `License: MIT` · eusourmr · 2026-10-08
- [**major-life-change-planner**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/major-life-change-planner) — Plan major transitions such as job loss, retirement, marriage, separation, birth, relocation, or caregiving across practical non-medical domains without pretending one template fits all. `Skill` · `Regenerative core` · `Design reviewed` · `4/5 lenses: human, social, knowledge, resources` · `Chat` · `Codex` · `License: MIT` · eusourmr · 2026-10-08
- [**medical-appointment-prep**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/medical-appointment-prep) — Prepare a concise health-appointment brief from user-provided information: main concern, timeline, medications, records, questions, and urgent-care red flags. `Skill` · `Regenerative core` · `Design reviewed` · `4/5 lenses: human, social, knowledge, resources` · `Chat` · `Codex` · `License: MIT` · eusourmr · 2026-10-08
- [**moving-life-journey**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/moving-life-journey) — Coordinate a move across contract, utilities, address changes, packing, inventory, transport, handover evidence, budget, and post-move tasks. `Skill` · `Regenerative core` · `Design reviewed` · `4/5 lenses: human, social, knowledge, resources` · `Chat` · `Codex` · `License: MIT` · eusourmr · 2026-10-08
- [**openai-agents-sdk-builder**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/featured/openai-agents-sdk-builder) — Scaffold and review production-oriented OpenAI Agents SDK projects with explicit tools, guardrails, handoffs, tracing, state, sandbox boundaries, and testable acceptance criteria. `Skill` · `Regenerative core` · `Design reviewed` · `4/5 lenses: human, social, knowledge, resources` · `Chat` · `Codex` · `License: MIT` · eusourmr · 2026-10-08
- [**overwhelm-to-next-action**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/overwhelm-to-next-action) — Reduce a pile of obligations into one next action, a small today list, a later list, and explicit dependencies without pretending to provide therapy. `Skill` · `Regenerative core` · `Design reviewed` · `4/5 lenses: human, social, knowledge, resources` · `Chat` · `Codex` · `License: MIT` · eusourmr · 2026-10-08
- [**personal-curator**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/personal-curator) — Curate capabilities silently after the user explicitly asks CS Navigator to act as their curator. Keep ordinary work native, surface mechanics only when useful, and never claim persistent cross-chat activation unless the host provides it. `Skill` · `Regenerative core` · `Design reviewed` · `4/5 lenses: human, social, knowledge, resources` · `Chat` · `Codex` · `License: MIT` · eusourmr · 2026-10-08
- [**personal-decision-record**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/personal-decision-record) — Create a durable record of a personal decision: objective, criteria, options, evidence, trade-offs, chosen path, rejected alternatives, and review trigger. `Skill` · `Regenerative core` · `Design reviewed` · `4/5 lenses: human, social, knowledge, resources` · `Chat` · `Codex` · `License: MIT` · eusourmr · 2026-10-08
- [**Photo Restoration Conservator**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/photo-restoration-conservator) — Conservative restoration workflow for family, archival and historical photos that separates visible recovery from reconstruction, preserves identity and historically meaningful details, records uncertainty and avoids unsolicited beautification. Activate only when explicitly invoked or selected. `Skill` · `Regenerative core` · `Design reviewed` · `4/5 lenses: human, social, knowledge, resources` · `Chat` · `Codex` · `License: MIT` · eusourmr · 2026-10-05
- [**Project Execution Director**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/project-execution-director) — Direct substantial multi-step work through outcomes, milestones, reversible checkpoints, evidence gates, dependencies and a clear definition of done while preventing busywork loops and premature completion claims. Activate only when explicitly invoked or selected. `Skill` · `Regenerative core` · `Design reviewed` · `4/5 lenses: human, social, knowledge, resources` · `Chat` · `Codex` · `License: MIT` · eusourmr · 2026-10-05
- [**proof-of-progress**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/proof-of-progress) — Close a task or life workflow with explicit resolved, pending, blocked, waiting, next action, owner, and evidence so conversation does not masquerade as progress. `Skill` · `Regenerative core` · `Design reviewed` · `4/5 lenses: human, social, knowledge, resources` · `Chat` · `Codex` · `License: MIT` · eusourmr · 2026-10-08
- [**public-service-br-navigator**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/public-service-br-navigator) — Find and explain the correct Brazilian public-service path across federal, state, municipal, district, and regulatory bodies with official-source preference. `Skill` · `Regenerative core` · `Design reviewed` · `4/5 lenses: human, social, knowledge, resources` · `Chat` · `Codex` · `License: MIT` · eusourmr · 2026-10-08
- [**purchase-decision-helper**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/purchase-decision-helper) — Compare an important purchase by need, total cost, maintenance, reliability, lock-in, alternatives, and exit cost rather than headline price alone. `Skill` · `Regenerative core` · `Design reviewed` · `4/5 lenses: human, social, knowledge, resources` · `Chat` · `Codex` · `License: MIT` · eusourmr · 2026-10-08
- [**real-world-evidence-kit**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/real-world-evidence-kit) — Help users preserve truthful evidence for disputes, services, insurance, purchases, property, school, work, or public administration without fabricating or altering records. `Skill` · `Regenerative core` · `Design reviewed` · `4/5 lenses: human, social, knowledge, resources` · `Chat` · `Codex` · `License: MIT` · eusourmr · 2026-10-08
- [**realtime-api-integration**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/featured/realtime-api-integration) — Design and scaffold OpenAI Realtime API integrations with server-side WebSocket control, browser WebRTC transport, explicit fallback policy, session configuration, observability, and secret isolation. `Skill` · `Regenerative core` · `Design reviewed` · `4/5 lenses: human, social, knowledge, resources` · `Chat` · `Codex` · `License: MIT` · eusourmr · 2026-10-08
- [**Regenerative Adaptive Experiment**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/regenerative-adaptive-experiment) — Use only when the user explicitly asks to use Regenerative Adaptive Experiment (or $regenerative-adaptive-experiment), or explicitly asks for this reusable CS workflow. Do not activate from a direct request to design a pilot, experiment, or reversible change; direct tasks stay native unless capability selection is requested. `Skill` · `Regenerative core` · `Design reviewed` · `4/5 lenses: human, social, knowledge, resources` · `Chat` · `Codex` · `License: MIT` · eusourmr · 2026-09-08
- [**Regenerative Capability Exchange**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/regenerative-capability-exchange) — Design a reciprocal learning exchange that grows practical capability, relationships, and local agency instead of creating dependence on one expert. `Skill` · `Regenerative core` · `Design reviewed` · `4/5 lenses: human, social, knowledge, resources` · `Chat` · `Codex` · `License: MIT` · eusourmr · 2026-09-08
- [**Regenerative Conflict Repair**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/regenerative-conflict-repair) — Structure a voluntary repair process for workable conflict while addressing relational, informational, and systemic causes without hiding power differences. `Skill` · `Regenerative core` · `Design reviewed` · `4/5 lenses: human, social, knowledge, resources` · `Chat` · `Codex` · `License: MIT` · eusourmr · 2026-09-08
- [**Regenerative Impact Map**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/regenerative-impact-map) — Use only when the user explicitly asks to use Regenerative Impact Map (or $regenerative-impact-map), or explicitly asks for this reusable CS workflow. Do not activate from a direct request to analyze systemic impacts or evaluate a decision; direct tasks stay native unless capability selection is requested. `Skill` · `Regenerative core` · `Design reviewed` · `5/5 lenses: human, social, knowledge, resources, ecology` · `Chat` · `Codex` · `License: MIT` · eusourmr · 2026-09-08
- [**Regenerative Knowledge Commons**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/regenerative-knowledge-commons) — Turn project learning into reusable, accessible, governed knowledge when a team or community needs memory that survives people, tools, and handoffs. `Skill` · `Regenerative core` · `Design reviewed` · `4/5 lenses: human, social, knowledge, resources` · `Chat` · `Codex` · `License: MIT` · eusourmr · 2026-09-08
- [**Regenerative Language Bridge**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/regenerative-language-bridge) — Explain technical, legal, scientific, or institutional material to a broader audience in plain language without erasing precision, uncertainty, or necessary terminology. Activate only when the user explicitly asks to use Regenerative Language Bridge (or its skill ID), or explicitly selects this reusable CS workflow; a direct explanation request alone stays native. `Skill` · `Regenerative core` · `Design reviewed` · `4/5 lenses: human, social, knowledge, resources` · `Chat` · `Codex` · `License: MIT` · eusourmr · 2026-09-08
- [**Regenerative Listening Loop**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/regenerative-listening-loop) — Build an ethical feedback process that listens to an affected community, returns findings, tracks action, and strengthens trust instead of extracting opinions. `Skill` · `Regenerative core` · `Design reviewed` · `4/5 lenses: human, social, knowledge, resources` · `Chat` · `Codex` · `License: MIT` · eusourmr · 2026-09-08
- [**Regenerative Participatory Decision**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/regenerative-participatory-decision) — Design a fair, traceable decision process when several people are affected, power is uneven, or legitimacy and long-term adoption matter. `Skill` · `Regenerative core` · `Design reviewed` · `4/5 lenses: human, social, knowledge, resources` · `Chat` · `Codex` · `License: MIT` · eusourmr · 2026-09-08
- [**Regenerative Resilience Plan**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/regenerative-resilience-plan) — Use only when the user explicitly asks to use Regenerative Resilience Plan (or $regenerative-resilience-plan), or explicitly asks for this reusable CS workflow. Do not activate from a direct request to plan continuity, resilience, recovery, or incident response; direct tasks stay native unless capability selection is requested. `Skill` · `Regenerative core` · `Design reviewed` · `5/5 lenses: human, social, knowledge, resources, ecology` · `Chat` · `Codex` · `License: MIT` · eusourmr · 2026-09-08
- [**Regenerative Resource Cycle**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/regenerative-resource-cycle) — Redesign a product, service, event, or workflow so material, energy, money, data, time, and attention circulate with less waste and measurable restoration. `Skill` · `Regenerative core` · `Design reviewed` · `5/5 lenses: human, social, knowledge, resources, ecology` · `Chat` · `Codex` · `License: MIT` · eusourmr · 2026-09-08
- [**repair-decision-helper**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/repair-decision-helper) — Decide whether to inspect, repair, replace, or seek a professional using symptoms, age, cost, safety, recurrence, warranty, and evidence. `Skill` · `Regenerative core` · `Design reviewed` · `4/5 lenses: human, social, knowledge, resources` · `Chat` · `Codex` · `License: MIT` · eusourmr · 2026-10-08
- [**scam-checker**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/scam-checker) — Assess suspicious messages, calls, links, invoices, payment requests, and offers using observable warning signs and safe verification steps without declaring fraud without enough evidence. `Skill` · `Regenerative core` · `Design reviewed` · `4/5 lenses: human, social, knowledge, resources` · `Chat` · `Codex` · `License: MIT` · eusourmr · 2026-10-08
- [**school-family-organizer**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/school-family-organizer) — Organize school calendars, documents, meetings, assignments, communications, activities, and unresolved issues into one family-facing plan. `Skill` · `Regenerative core` · `Design reviewed` · `4/5 lenses: human, social, knowledge, resources` · `Chat` · `Codex` · `License: MIT` · eusourmr · 2026-10-08
- [**simple-mode**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/simple-mode) — Adapt explanations for people who want the simplest usable path: plain language, short steps, one action at a time, and technical terms only when they help. `Skill` · `Regenerative core` · `Design reviewed` · `4/5 lenses: human, social, knowledge, resources` · `Chat` · `Codex` · `License: MIT` · eusourmr · 2026-10-08
- [**Skill Workbench**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/skill-workbench) — Create and evolve ChatGPT/CS skills with activation boundaries, native-vs-skill routing, profiles, permissions, deterministic fixtures, adversarial tests, native semantic qualification, evidence binding and release gates. Activate only when explicitly invoked or selected. `Skill` · `Regenerative core` · `Design reviewed` · `4/5 lenses: human, social, knowledge, resources` · `Chat` · `Codex` · `License: MIT` · eusourmr · 2026-10-05
- [**subscription-cleanup**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/subscription-cleanup) — Identify recurring services, duplicates, low-use subscriptions, renewal traps, and a safe cancellation/review plan without accessing accounts unless explicitly connected. `Skill` · `Regenerative core` · `Design reviewed` · `4/5 lenses: human, social, knowledge, resources` · `Chat` · `Codex` · `License: MIT` · eusourmr · 2026-10-08
- [**Text Integrity Editor**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/text-integrity-editor) — High-fidelity editing for important text where facts, names, numbers, commitments, uncertainty, argument, and the author's voice must survive revision. Activate only when the user explicitly invokes Text Integrity Editor or selects this reusable CS workflow; ordinary sentence correction or casual rewriting stays native. `Skill` · `Regenerative core` · `Design reviewed` · `4/5 lenses: human, social, knowledge, resources` · `Chat` · `Codex` · `License: MIT` · eusourmr · 2026-10-05
- [**travel-readiness**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/travel-readiness) — Prepare a practical trip-readiness checklist covering documents, timing, transport, money, connectivity, baggage, reservations, and current entry requirements. `Skill` · `Regenerative core` · `Design reviewed` · `4/5 lenses: human, social, knowledge, resources` · `Chat` · `Codex` · `License: MIT` · eusourmr · 2026-10-08
- [**Visual Intent Guardian**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/visual-intent-guardian) — Protect visual invariants during image generation and editing by converting a brief into MUST KEEP, MAY CHANGE and MUST NOT CHANGE constraints and checking outputs for unauthorized changes. Activate only when explicitly invoked or selected. `Skill` · `Regenerative core` · `Design reviewed` · `4/5 lenses: human, social, knowledge, resources` · `Chat` · `Codex` · `License: MIT` · eusourmr · 2026-10-05

### Development

- [**Build iOS Apps**](https://github.com/openai/plugins/tree/main/plugins/build-ios-apps) — Build and debug iOS apps with SwiftUI, App Intents, Xcode, Simulator, performance, and memory workflows. `Plugin` · `OpenAI catalog` · `Codex` · `License: MIT` · OpenAI · 2026-09-08
- [**Build macOS Apps**](https://github.com/openai/plugins/tree/main/plugins/build-macos-apps) — Build, test, instrument, and debug native macOS apps using SwiftUI, AppKit, Xcode, signing, and unified logging. `Plugin` · `OpenAI catalog` · `Codex` · `License: MIT` · OpenAI · 2026-09-08
- [**Build Web Apps**](https://github.com/openai/plugins/tree/main/plugins/build-web-apps) — Build frontend-focused web apps with visual assets, browser testing, UI components, payments, and database guidance. `Plugin` · `OpenAI catalog` · `Work` · `Codex` · `License: MIT` · OpenAI · 2026-09-08
- [**OpenAI Developers**](https://github.com/openai/plugins/tree/main/plugins/openai-developers) — Build with OpenAI APIs, Agents SDK, and ChatGPT Apps using official documentation and development workflows. `Plugin` · `OpenAI catalog` · `Codex` · `License: Proprietary` · OpenAI · 2026-09-08
- [**Plugin Eval**](https://github.com/openai/plugins/tree/main/plugins/plugin-eval) — Evaluate and benchmark Codex skills and plugins with local reports, scoring explanations, and token-use measurements. `Plugin` · `OpenAI catalog` · `Codex` · `License: MIT` · OpenAI · 2026-09-08
- [**Superpowers**](https://github.com/openai/plugins/tree/main/plugins/superpowers) — A software-development skill framework covering brainstorming, planning, TDD, debugging, collaboration, and code review. `Plugin` · `OpenAI catalog` · `Codex` · `License: MIT` · Jesse Vincent · 2026-09-08

### Data & research

- [**Build Web Data Visualization**](https://github.com/openai/plugins/tree/main/plugins/build-web-data-visualization) — Design, implement, test, and export browser-based charts, maps, dashboards, diagrams, and advanced visual stories. `Plugin` · `OpenAI catalog` · `Work` · `Codex` · `License: MIT` · OpenAI · 2026-09-08
- [**Data Analytics**](https://github.com/openai/plugins/tree/main/plugins/data-analytics) — Answer product and business questions with data, validation, diagnostics, charts, dashboards, notebooks, and reports. `Plugin` · `OpenAI catalog` · `Chat` · `Work` · `Codex` · `License: Proprietary` · OpenAI · 2026-09-08
- [**Life Science Research**](https://github.com/openai/plugins/tree/main/plugins/life-science-research) — Route and synthesize evidence across genetics, omics, biology, chemistry, clinical research, and public datasets. `Plugin` · `OpenAI catalog` · `Work` · `Codex` · `License: Proprietary` · OpenAI · 2026-09-08

### Design & media

- [**Creative Production**](https://github.com/openai/plugins/tree/main/plugins/creative-production) — Turn briefs, products, and source images into campaign concepts, mood boards, ads, social posts, and launch assets. `Plugin` · `OpenAI catalog` · `Chat` · `Work` · `Codex` · `License: Proprietary` · OpenAI · 2026-09-08
- [**Figma**](https://github.com/openai/plugins/tree/main/plugins/figma) — Implement Figma designs in code, create Code Connect templates, and generate project-specific design-system rules. `Plugin` · `OpenAI catalog` · `Work` · `Codex` · `License: LicenseRef-Figma-Developer-Terms` · Figma · 2026-09-08
- [**Product Design**](https://github.com/openai/plugins/tree/main/plugins/product-design) — Turn early ideas, URLs, screenshots, and briefs into reviewable product directions, UX audits, and interactive prototypes. `Plugin` · `OpenAI catalog` · `Work` · `Codex` · `License: Proprietary` · OpenAI · 2026-09-08
- [**Remotion**](https://github.com/openai/plugins/tree/main/plugins/remotion) — Create programmatic videos with React using reusable guidance for animation, audio, captions, charts, 3D, and transitions. `Plugin` · `OpenAI catalog` · `Codex` · `License: MIT` · Remotion · 2026-09-08

### Productivity & collaboration

- [**Google Drive**](https://github.com/openai/plugins/tree/main/plugins/google-drive) — Use one entry point for Google Drive search, organization, sharing, and Docs, Sheets, and Slides workflows. `Plugin` · `OpenAI catalog` · `Chat` · `Work` · `Codex` · `License: MIT` · OpenAI · 2026-09-08
- [**Notion**](https://github.com/openai/plugins/tree/main/plugins/notion) — Turn specifications, research, meetings, and workspace context into plans, documentation, and durable knowledge. `Plugin` · `OpenAI catalog` · `Chat` · `Work` · `Codex` · `License: MIT` · Notion · 2026-09-08

### Security & quality

- [**Codex Security**](https://github.com/openai/plugins/tree/main/plugins/codex-security) — Run reusable security scanning, analysis, validation, triage, and investigation workflows across code and diffs. `Plugin` · `OpenAI catalog` · `Codex` · `License: Proprietary` · OpenAI · 2026-09-08
<!-- CATALOG:END -->

## Quality & verification

`catalog.json` adds the required quality metadata for each tracked skill: category, status, rating, review count, verification date, and compatibility. Ratings are never inferred from provenance. A `0` paired with `rating_state: unrated` means no public score exists yet.

Validate locally:

```bash
python scripts/catalog.py --check
python scripts/validate_catalog.py
```

Regenerate the visual progress panel:

```bash
python scripts/validate_catalog.py --write-progress
```

## Contributing

Every new bundled skill must follow the Agent Skills format, include a `SKILL.md` with `Description`, `Use Cases`, `Installation`, and `Example`, pass automated validation, and run through [`$catalog-curator`](.agents/skills/catalog-curator/SKILL.md) before acceptance. See [CONTRIBUTING.md](CONTRIBUTING.md) and [COMMUNITY.md](COMMUNITY.md).

## Official starting points

- [OpenAI developer documentation](https://developers.openai.com/)
- [OpenAI Plugins repository](https://github.com/openai/plugins)
- [OpenAI Agents SDK](https://openai.github.io/openai-agents-python/)
- [Agent Skills open standard](https://agentskills.io/)

## License

Repository-authored content and validation code are licensed under the [MIT License](LICENSE). Linked projects keep their own licenses.
