# CS 0.7.5 — Verifiable Trust II & Containers

## Product center

Version 0.7.5 extends Verifiable Trust from **evidence about a skill** to **containment during execution**.

The release introduces the **Skill Container** concept and the **Container Guardian**.

> Verifiable Trust tells us what was reviewed.  
> Skill Containers constrain what may happen next.

## Threat model

0.7.5 focuses on failure modes where a skill or agentic workflow may otherwise:

- produce unsupported data because an answer is expected;
- misrepresent inference as evidence;
- fabricate a tool result after tool failure;
- keep retrying beyond a bounded budget;
- seek information outside the authorized context;
- request or use more privilege than the task originally allowed;
- expose secrets or private data to undeclared destinations;
- compose skills in a way that expands privilege;
- follow task-level instructions that attempt to weaken the container.

The release treats these as containment failures, not merely response-quality problems.

## Container decisions

Every proposed step resolves to one of four states:

- `allow`
- `allow-with-confirmation`
- `degrade`
- `stop`

A `degrade` result means the workflow may return a partial, explicitly limited answer without inventing the missing portion.

A `stop` result is successful enforcement when the next step would cross the container boundary.

## 0.7.5 workstreams

### A. Container profile

- machine-readable schema;
- default fail-closed policy;
- evidence, capability, acquisition, data, budget, composition, and audit boundaries;
- stable stop codes.

### B. Container Guardian

- policy-decision interface;
- deterministic decision record;
- human-confirmation state;
- no self-escalation;
- no child-over-parent privilege expansion.

### C. Hallucination containment fixtures

- missing source;
- missing required field;
- unavailable tool;
- conflicting sources;
- fabricated citation attempt;
- fabricated tool-output attempt.

### D. Security containment fixtures

- unauthorized network destination;
- secret acquisition/exfiltration;
- permission widening;
- authentication/authorization bypass request;
- dangerous repeated acquisition attempts;
- composition privilege expansion.

### E. Navigator integration

- container-aware recommendation;
- explain why a task was degraded or stopped;
- keep native-first behavior;
- expose only material permission differences;
- never turn a container pass into a claim of total safety.

### F. Public communication

- promote Skill Containers as defense-in-depth;
- explain safe failure in plain language;
- document limitations;
- make `unknown` and `stopped` legitimate trust states.

## Exit criteria

0.7.5 is ready when the repository can prove, with deterministic fixtures, that its container layer:

- does not invent missing evidence;
- does not self-grant permission;
- does not use an undeclared acquisition path;
- does not widen privilege through composition;
- stops on explicit boundary violations;
- records why it stopped;
- continues safely when a bounded partial result is possible.

## Non-goals

0.7.5 does not claim to:

- eliminate all hallucinations;
- replace platform safeguards;
- provide a universal OS sandbox on every execution surface;
- certify a skill as safe forever;
- authorize actions the host platform or user is not allowed to authorize.
