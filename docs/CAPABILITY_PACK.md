# CS Navigator Capability Pack I

## Goal

Install one CS Navigator plugin and make a small, evidence-tracked set of chat-native CS workflows available without requiring separate plugin installs.

OpenAI's current plugin model supports plugins that include skills, apps, or both, and plugin pages can expose one or more skills. The pack uses that native model; it does not introduce a custom runtime, MCP server, API key, or control plane.

## Product contract

**Availability is not activation.**

Bundling a skill means the user has it available. It does not mean the skill should intercept every related task.

The Simple Gate remains authoritative:

- direct task -> ChatGPT first;
- capability-selection intent -> CS Navigator routes;
- explicit bundled-skill invocation -> that skill runs;
- no material capability gain -> native-only;
- missing capability -> coverage-gap;
- external not-evaluated source -> discovery is not validation.

## Capability Pack I

- `regenerative-language-bridge`
- `regenerative-impact-map`
- `regenerative-resilience-plan`
- `regenerative-adaptive-experiment`

Each skill remains a byte-for-byte mirror of its canonical source and keeps its own execution evidence. Being bundled does not promote `designed` to `tested`.

## Handoff model

Do not assume an undocumented skill-to-skill handoff primitive.

When Navigator recommends a bundled skill, it should make clear that the capability is already included in the installed plugin. The user can continue with that capability without a separate installation. Qualification must test the actual native ChatGPT behavior rather than inventing a hidden chaining mechanism.

## Native qualification gates

1. One plugin install exposes Navigator plus all four bundled skills.
2. Each bundled skill can be explicitly invoked.
3. Direct ordinary tasks do not auto-route only because a related skill is bundled.
4. Capability-selection prompts route to the correct smallest useful bundled skill.
5. Follow-up use of a recommended bundled skill requires no second install.
6. Evidence states remain independent and visible.
7. Coverage-gap and external-trust boundaries do not regress.
8. No mandatory external runtime, auth, server, MCP, or network dependency is introduced.

## Expansion rule

Do not add more skills merely to increase catalog size. A new bundled capability must be chat-native, broadly useful, non-overlapping, evidence-compatible, and able to pass activation-collision tests.
