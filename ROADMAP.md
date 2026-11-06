# CS Navigator — active roadmap

Reviewed on **2026-11-06**, starting from `main` at `df4e7e4` (merged PR #130).
This page is the forward plan. The previous release-by-release roadmap is
preserved in [the historical archive](docs/archive/ROADMAP_PRE_PHASE3_2026-11-06.md).
Read the [maturity review in Portuguese](docs/CS_ROADMAP_REVIEW_2026-11-06.md),
[canonical state](docs/CS_NAVIGATOR_ESTADO_E_CONTINUIDADE_2026-11-06.md) and
[Phase 3 protocol](docs/CS_PHASE3_QUALIFICATION.md) for evidence and limitations.

## Product objective

Help someone finish a task through the simplest adequate path: a native answer,
a relevant available specialist, or a permitted connected workflow. Curation must
earn its additional steps. Catalog size, skill activation and version count are
not measures of user benefit.

## Baseline: established and still unknown

| Component | Established | Not established |
| --- | --- | --- |
| Production `0.17.0` | Preserved GitHub production line | Public Directory approval or activation in every conversation |
| Private Web Labs `0.20.0-beta.4` | HOST-03R passed: six skills exposed, curator read, Registry called in the same session | Universal activation, effective routing or advantage over native ChatGPT |
| Original Labs `0.20.0-beta.3` | Historical comparison/rollback reference | A reason to reopen the completed Web connection investigation |
| Registry | 63 source entries, 61 distributable; read-only metadata | Installation or execution of those 61 capabilities; immutable publication provenance (`development` remains) |
| Quality catalog | 79 items including 48 drafts; separate editorial catalog has 80 entries | Individual qualification of the 48 drafts |
| Phase 3 start | Evidence checker, neutral packets, three source reviews; synthetic regression reproduced | New independent ROUTE-01/02 host passes, a clean A/B outcome, draft promotions |

Discovery, packaging, host availability, source read, tool invocation and real
outcome are distinct evidence states. A CI pass does not merge these states.

## Active milestones

| Priority | Milestone and scope | Exit evidence | Dependencies |
| --- | --- | --- | --- |
| P0 | **F3.1 — minimal and substantive routing.** ROUTE-01 stays native; ROUTE-02 reads and applies the appropriate specialist. Preserve negative cases and complete task traces. | Reviewed host receipts, response and executed regressions; count unnecessary calls. Separate development rehearsals from host trials. | HOST-03R already closed; no reconnection work |
| P0 | **F3.2 — publication provenance and delivery states.** Bind Registry publication to an immutable source revision/hash and real publication date; distinguish reviewed date from publication date. | Reproducible publication manifest, drift/freshness tests, truthful unknowns and rollback. No cosmetic date refresh. | Separate change/review; preserve production interfaces |
| P1 | **F3.3 — small draft batches.** Begin with `capability-preferences`, `context-continuity-manager`, `decision-stop-rule`; inspect duplication and activation boundaries. | Per-skill positive, non-activation, adversarial and permission cases; corrected failures retested against exact bytes; human release decision. | Source review first; excluded healthcare skills stay excluded |
| P1 | **F3.4 — value and usability.** Evaluate engineering, PT-BR editing and academic writing; observe a new person installing and completing a task. | Frozen rubric, outcomes and friction recorded. A/B only with a separate CS-free control and comparable settings; otherwise descriptive findings. | Available test environments and participant agreement; no private-data telemetry by default |
| P2 | **F4 — sustainable distribution.** Choose one primary supported Web path, maintain versioned updates and recovery, then decide on public submission. | Third-party install/update/rollback evidence, exact release artifact, permissions/privacy review and explicit publication decision. Claim approval only after actual approval. | F3 evidence and operational ownership |
| Later | **Evidence-led expansion.** Add profiles, workflows or ecosystem integrations only for unmet jobs. | Demonstrated demand, maintenance owner, license/provenance and measurable acceptance criteria. | Do not replace current gates with catalog-growth goals |

F3.1 and F3.2 can proceed independently. F3.3 begins with source review while
behavioral promotion waits for its own evidence. Do not block all technical work
because an isolated A/B host is unavailable, and do not turn that limitation into
a claim of comparative benefit. Dates and release numbers follow the qualified
scope; this roadmap does not create a new release or rename 0.18 candidates.

## Immediate work and honest status

- ROUTE-01 and ROUTE-02 prompts and acceptance criteria are frozen in
  `trust/qualification/phase3/protocol.json`.
- The development ROUTE-02 rehearsal used an actual host specialist read, then
  re-ran the existing ENG-01 synthetic fixture: corrected **7/7**, original
  **expected failure** in the selected race test. This is not an independent
  automatic-routing trial or production software repair.
- A/B is **control_unavailable** in this conversation: CS capabilities are
  available here. The checker rejects exposed-CS controls, mismatched prompts,
  context/model settings, missing reads, incomplete receipts and changed hashes.
  Consistent receipts still require origin authentication and blind human review.
- Batch 01 has **three source reviews and 12 planned, unexecuted behavior cases**.
  `decision-stop-rule` has an explicit-selection default in `agents/openai.yaml`,
  but no activation/non-activation section in its portable `SKILL.md`. **48 remain drafts; zero promotions.**
- Registry provenance and third-party installation are separate open milestones.
  Do not rewrite historical qualification manifests or the generated progress panel.

## What to improve next

1. End every recommendation with an available, verifiable next action.
2. Treat correct abstention and less user effort as successes, not fewer activated skills as a failure.
3. Prefer a shared method plus versioned profiles when it reduces duplication without losing boundaries.
4. Give a short recovery path when a source, tool or permission is unavailable.
5. Keep evidence readable on demand; avoid turning routine answers into routing reports.
6. Distinguish local executable Guardian checks from textual host instructions; require a real decision trace for runtime-enforcement claims.
7. Publish negative and null findings. Retire or simplify workflows whose upkeep exceeds demonstrated benefit.

## Measures and stop conditions

Track task correctness, unsupported claims, permission violations, unnecessary
tool calls, steps to a useful result and third-party installation completion.
Measure time, tokens or cost only where actually collected, with a denominator
and context. Do not invent 0–100 trust scores or equate editorial `verified` with
field-tested outcomes. Resource and regenerative impact claims need separate
baselines; retain `design-reviewed` until suitable field evidence exists.

Stop promotion on fabricated evidence, unauthorized actions, unclear activation,
source drift or excluded distribution. If the native path is equally adequate
with less effort, keep that path and reconsider the specialist's scope.

## Protected boundaries

Production `0.17.0`, original Labs `beta.3`, Web release `beta.4`, historical
failures and release manifests stay preserved until an explicitly scoped,
reviewed change is authorized. No public release or universal activation is
announced by this roadmap. Registry metadata never becomes executable remote
instructions. Keep least privilege, plain language, reversible changes, no paid
trust and the stronger multi-lens standard for regenerative-core claims.
