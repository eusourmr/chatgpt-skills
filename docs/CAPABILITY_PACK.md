# CS Navigator Capability Pack

## Goal

One CS Navigator plugin install exposes a small, evidence-tracked set of chat-native CS workflows without requiring a second plugin install for each capability.

## Current release context

Capability Pack I began on the 0.6 line and the original four regenerative capabilities remain bundled inside **CS Navigator 0.9.0**.

The 0.9 release adds 15 original first-party workflows and absorbs the 0.7.5 Skill Containers / Container Guardian foundation. Historical 0.6/0.7 evidence remains version-bound; it is not silently promoted to new bytes.

The exact 0.9.0 R2 package completed native qualification for the recorded matrix and scoped regressions. See `release/candidates/cs-navigator-v0.9.0-r2.json`.

## Product contract

**Availability is not activation.**

- direct ordinary task → ChatGPT first;
- capability-selection intent → CS Navigator may route;
- explicit bundled-skill invocation → that capability may be used;
- no material capability gain → native-only;
- missing capability → coverage-gap;
- external `indexed / not-evaluated` source → discovery is not validation.

## Capability Pack I

- `regenerative-language-bridge`
- `regenerative-impact-map`
- `regenerative-resilience-plan`
- `regenerative-adaptive-experiment`

Each capability keeps its own execution evidence. Being bundled does not promote `designed` to `tested`.

## Qualification history

The original Capability Pack qualification used the exact R6 payload and passed:

- explicit invocation: 4/4;
- capability-selection routing: 4/4;
- no-second-install;
- native-only;
- external-trust boundary;
- evidence-boundary;
- anti-overrouting.

That evidence remains historical and version-bound.

The historical **0.7.0 production plugin** was separately qualified and released as `cs-navigator-v0.7.0`. That evidence remains historical and version-bound. The current public product line is CS Navigator 0.9.0.

## Handoff model

Do not assume an undocumented skill-to-skill handoff primitive.

When Navigator recommends a bundled capability, it should state that the capability is already included in the installed plugin. A follow-up can continue using that capability without a second install where the product surface supports it.

## Native qualification gates

1. One plugin install exposes Navigator plus all four bundled capabilities.
2. Each capability can be explicitly invoked.
3. Direct ordinary tasks do not route merely because a related capability is bundled.
4. Capability-selection prompts choose the smallest useful capability.
5. Follow-up use does not require a second plugin install.
6. Evidence states remain independent.
7. Coverage-gap and external-trust boundaries do not regress.
8. No mandatory external runtime/auth/server/MCP/network dependency is introduced for the core pack.

## Expansion rule

Do not add a capability merely to increase catalog size. A new bundled capability must be broadly useful, non-overlapping, evidence-compatible, compatible with Skill Containers, and able to pass activation-collision / anti-overrouting tests.

Independent community project. Not affiliated with or endorsed by OpenAI.
