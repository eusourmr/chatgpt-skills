# CS Navigator Public Distribution Policy

This policy controls which repository capabilities may be exposed through the public CS Navigator plugin or Live Capability Registry.

## Core rule

A capability existing in GitHub does **not** make it publicly distributable or executable.

Promotion requires all applicable repository gates and an explicit public-distribution state.

## Distribution states

- `public` — may be returned by the public Live Registry.
- `held` — remains in the repository but is not returned publicly while evidence, policy, or compatibility is unresolved.
- `platform-out-of-scope` — preserved for history/research but excluded from the public plugin and Live Registry because the current platform distribution policy does not support that use case.
- `deprecated` — retained only for migration/history.

## Healthcare boundary — 0.16.0

The OpenAI submission review for 0.15.0 determined that healthcare or medical workflows, including activities that may involve health information, are currently outside the supported skill-distribution scope.

Therefore the public CS Navigator distribution must exclude at minimum:

- `medical-appointment-prep`;
- `caregiver-coordinator`.

The public registry must also reject any future capability whose distributed workflow is primarily for:

- medical appointment preparation;
- clinical care coordination;
- provider matching or healthcare access;
- symptom triage;
- medication or treatment management;
- medical records or health-information processing.

This is a platform-distribution boundary, not a claim that the underlying topic has no value.

## Non-circumvention

Do not rename, paraphrase, or route an excluded healthcare workflow through a generic capability merely to evade platform review.

Adjacent public workflows must be genuinely non-healthcare in their distributed behavior.

## GitHub as source of truth

The public MCP server reads only a generated, policy-filtered registry artifact from this repository. It does not execute arbitrary repository files or treat unreviewed commits as trusted capabilities.

The registry generator must fail closed when a capability is missing an explicit distribution state.
