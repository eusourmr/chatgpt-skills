# Skill Containers

## Implementation status

The deterministic Container Guardian foundation is implemented and merged to `main`. Repository/runtime tests are green. Integration into the released CS Navigator plugin remains **qualification-gated**; the current stable plugin is 0.7.0 and 0.7.5 must not be presented as released yet.

**Skill Containers** are a defense-in-depth containment layer for AI skills and agentic workflows.

The core idea is simple:

> **A skill is allowed to fail safely. It is never required to complete a task at any cost.**

A Skill Container places an explicit boundary around what a skill may **know, claim, access, attempt, send, execute, and persist**. When evidence or permission ends, the task must degrade or stop instead of fabricating an answer, silently escalating capability, repeatedly searching for a way around a boundary, or acquiring data through an unauthorized path.

Skill Containers are planned for **CS 0.7.5 — Verifiable Trust II & Containers**.

## Why this exists

Agentic systems are often optimized to complete an objective. That is useful, but a dangerous failure mode appears when completion pressure is stronger than evidence or permission boundaries.

Examples include:

- inventing a missing fact because the workflow expects an answer;
- fabricating a citation, file, measurement, API result, user record, or tool result;
- treating inference as observed evidence;
- repeatedly trying tools after the allowed path has failed;
- widening permissions because the current permission set is insufficient;
- reading unrelated local data to fill a missing field;
- seeking credentials, secrets, or private context that were never authorized;
- sending data to an external service not declared by the skill;
- attempting to bypass authentication, authorization, sandbox, network, or platform restrictions;
- composing multiple skills in a way that silently produces more privilege than any single skill was allowed to use.

A trustworthy skill must be able to say:

**"I do not have enough evidence."**

**"This permission is not available."**

**"I cannot obtain that data through an authorized path."**

**"I can continue only if you explicitly provide or authorize the missing requirement."**

Stopping is a valid result.

## What a Skill Container contains

A container is not just one sandbox. It is a **policy envelope** that can be enforced at several layers: skill instructions, Navigator routing, tool authorization, runtime permissions, operating-system sandboxing, network controls, and audit infrastructure.

### 1. Epistemic boundary

The container distinguishes what is:

- supported by evidence;
- derived or inferred;
- generated/creative;
- unknown or unavailable.

A factual output may not be invented merely to satisfy an expected schema.

Default rules:

- no fabricated citations;
- no fabricated observations;
- no fabricated tool results;
- no invented values for missing required fields;
- inference must not be presented as direct evidence;
- missing evidence produces `unknown`, a clarification request, a bounded partial answer, or a stop state.

### 2. Capability boundary

Every tool/capability is deny-by-default unless the active container allows it.

The effective permission is:

```text
effective capability
= requested capability
∩ Skill Container allowance
∩ user/environment authorization
∩ host/runtime policy
```

A skill cannot grant itself a capability.

### 3. Acquisition boundary

The container forbids "obtain the information somehow" behavior.

The workflow must not use unauthorized acquisition methods such as:

- credential theft;
- secret harvesting or exfiltration;
- authentication or authorization bypass;
- exploitation to gain access;
- privilege escalation;
- stealth persistence;
- undeclared scraping or external transfer;
- searching unrelated private context to manufacture a missing answer.

If the only remaining route crosses the acquisition boundary, the container stops.

### 4. Data boundary

The container defines what data can enter and leave the workflow.

It should support:

- minimum-necessary data use;
- scoped file/path access;
- scoped domains/endpoints;
- explicit treatment of secrets and credentials;
- no cross-task or cross-user leakage;
- explicit external-send policy;
- retention/persistence limits where the runtime exposes them.

### 5. Attempt and resource budget

Repeated attempts can themselves become a risk.

A Skill Container can bound:

- tool calls;
- external requests;
- retries;
- recursion/delegation depth;
- execution time;
- data volume;
- compute or token budget where measurable.

Exhausting a budget must not trigger privilege expansion.

### 6. Composition boundary

A child skill cannot widen the parent container.

When skills are composed, the effective container must be no broader than the parent/user/runtime envelope. Composition must not create a "permission union" that silently grants new powers.

### 7. Stop states

A Skill Container uses explicit stop/degrade reasons such as:

- `EVIDENCE_EXHAUSTED`
- `PERMISSION_DENIED`
- `AUTHORIZATION_REQUIRED`
- `TOOL_UNAVAILABLE`
- `SOURCE_CONFLICT`
- `BUDGET_EXHAUSTED`
- `CONTAINER_ESCAPE_ATTEMPT`
- `POLICY_BOUNDARY`

A stop state is evidence, not a defect to hide.

### 8. Audit trail

Where the execution surface supports it, record:

- requested capability;
- allowed/denied decision;
- reason;
- source/evidence state;
- tool actually invoked;
- external destination, if any;
- user confirmation, if required;
- stop/degrade code.

Audit records should minimize sensitive content.

## The Container Guardian

The planned **Container Guardian** is the policy decision point.

Its job is not to solve the user's task. Its job is to decide whether the next proposed step is inside the active container.

Conceptually:

```text
User goal
   ↓
CS Navigator / selected skill
   ↓
proposed next step
   ↓
Container Guardian
   ├─ ALLOW
   ├─ ALLOW_WITH_CONFIRMATION
   ├─ DEGRADE
   └─ STOP
```

The Guardian must prefer a bounded failure over unsafe capability expansion or fabricated completion.

## Hallucination containment

Skill Containers cannot mathematically guarantee that a language model will never hallucinate.

They reduce the failure surface by making unsupported completion an invalid workflow outcome.

The key design rule is:

> **No evidence → no invented fact. No permission → no self-escalation. No authorized path → stop.**

This turns "I don't know" from a conversational weakness into a valid security state.

## What Skill Containers are not

A Skill Container is **not**:

- proof that a model is safe;
- a replacement for host/platform policy;
- a replacement for OS/process sandboxing;
- a replacement for authentication and authorization;
- a guarantee against every prompt-injection technique;
- a claim that static scanning can predict all runtime behavior.

For local-agent or connected skills, the strongest implementation combines the logical container with real technical controls such as filesystem isolation, network allowlists, scoped credentials, process sandboxes, human confirmation, and runtime auditing.

## Relationship to Verifiable Trust

Verifiable Trust I asks:

- What is this skill?
- What exact artifact was reviewed?
- What can it read/write/send/execute?
- What evidence exists?
- Is that evidence current?

**Verifiable Trust II & Containers adds:**

- What is this skill allowed to do **right now**?
- What happens when evidence is missing?
- What happens when a tool fails?
- Can it widen its own permissions?
- Can a child skill escape the parent boundary?
- Is external acquisition authorized?
- Will the workflow stop instead of fabricating success?

Trust evidence describes the artifact.

The Skill Container constrains the execution.

## Proposed 0.7.5 release gates

CS 0.7.5 should not qualify until:

1. the container policy is machine-readable and schema-validated;
2. deny-by-default capability rules have regression tests;
3. missing-evidence fixtures prove that the workflow returns unknown/stop instead of invented data;
4. permission-escalation fixtures are blocked;
5. unauthorized acquisition/exfiltration fixtures are blocked;
6. composition tests prove a child cannot widen the parent envelope;
7. retry/budget exhaustion cannot trigger privilege expansion;
8. Container Guardian decisions are auditable;
9. Navigator can explain a container stop in plain language;
10. the release documentation states clearly that containers are defense-in-depth, not a total safety guarantee.

## Design principle

**Completion is subordinate to truth, authorization, and containment.**

That principle is the center of Skill Containers.
