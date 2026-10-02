# CS Navigator Capability Pack I

## Goal

One CS Navigator plugin install exposes a small, evidence-tracked set of chat-native CS workflows without requiring a second plugin install for each capability.

## Current release context

Capability Pack I was introduced and natively qualified on the 0.6 line. It remains bundled in the **stable CS Navigator 0.7.0** release, which adds Verifiable Trust I around the routing/evidence layer.

0.7.5 is in qualification and adds Container Guardian infrastructure; it does not automatically change the independent evidence state of the four bundled capabilities.

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

The **0.7.0 production plugin** was separately qualified through the Verifiable Trust I review matrix and released as:

- tag: `cs-navigator-v0.7.0`;
- release source: `6cc953705a069b3f384e7cc266110e7f51f0b988`;
- production ZIP SHA-256: `a1ac38a482f6e3ad839eefc3ed555c2cc001e24cf28b1be2740024d963b6048d`.

The 0.7.0 qualification preserved each bundled capability's independent evidence state.

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
