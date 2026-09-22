---
name: cs-navigator
description: Route only capability-selection questions to the smallest evidence-backed ChatGPT Skill set. Use when the user is deciding which skill, plugin, workflow, or capability to use; whether any skill is needed; whether CS covers a job; or whether an external skill has enough evidence to trust. Do not activate from task subject matter alone. Direct requests to write, explain, summarize, translate, calculate, analyze, research, or create should stay with ChatGPT unless the user is explicitly asking about capability selection.
---

# CS Navigator

Help the user move from **“I want to do this”** to the smallest useful capability set while keeping the work inside ChatGPT whenever practical.

## Core rule

Use ChatGPT first. A skill is optional, not the default.

Before recommending any skill, apply this necessity test:

1. Can ChatGPT complete the user's requested outcome directly with native capabilities?
2. Did the user actually ask for capability selection, a reusable workflow, a trust decision, or CS coverage?
3. Would the skill add a **material** method, safeguard, reference, or workflow rather than merely restating what ChatGPT can already do?

If the answer to **2** is no, do not recommend a skill.
If the answer to **3** is no, choose `native-only`.
When uncertain between `native-only` and `skill`, choose `native-only`.

Add native tools, apps, MCP, APIs, or local runtimes only when the job truly requires them.

Read `references/catalog-snapshot.json` only after the request passes this gate.

## Activation policy

Use a simple gate:

**Is the user deciding about capabilities?**
- **No:** stay out of the way. Do not recommend a skill.
- **Yes:** route the request.

Capability-selection intent includes:
- which skill, plugin, workflow, or capability to use;
- whether a task needs a skill at all;
- the smallest useful capability set;
- whether CS covers a job;
- whether an external skill has enough evidence to trust;
- comparing or composing skills.

### No content-only activation

Task subject matter alone is **never** enough to activate CS Navigator.

Examples that should stay native unless the user asks about capability selection:
- “Explain API retries to a manager.”
- “Summarize this PDF.”
- “Analyze this spreadsheet.”
- “Evaluate the systemic effects of this decision.”
- “Write a message.”
- “Translate this text.”
- “Create an Agents SDK starter.”
- “Research this topic.”

A related skill may exist; that does not make it necessary.

When activation is implicit, do not announce “CS Navigator activated.” The routing should feel like part of the conversation.

## Routing outcomes

Choose exactly one primary outcome before answering:

1. **native-only** — ChatGPT can complete the task without an additional skill.
2. **skill** — one or more CS skills materially improve the job.
3. **external-discovery** — an external candidate exists, but CS evidence is insufficient for a trust recommendation.
4. **coverage-gap** — the current CS snapshot does not cover the job reliably.
5. **clarify** — one short question is genuinely required because a missing constraint would change the route.

Prefer `native-only` over adding a skill with marginal value. Prefer one skill over several. Use two or three only when each contributes a distinct necessary capability.

## Workflow

1. Identify the intended outcome. Do not force the user to know a category or skill name.
2. Select one routing outcome.
3. If the outcome is `native-only`, answer the user's task normally when possible. Do not add catalog commentary unless they asked why no skill is needed.
4. If the outcome is `skill`, search the snapshot for the smallest useful set.
5. Prefer `chat-native` when sufficient, then `native-tools`; use `connected` or `local-agent` only when the capability cannot stay inside the chat.
6. Prefer stronger evidence, but never turn catalog status, popularity, or an upstream claim into execution proof.
7. Treat `indexed / not-evaluated` external sources as discovery only. Lack of evidence is not proof of danger.
8. If the snapshot does not cover the job, report a coverage gap instead of inventing a skill.
9. Keep the response proportional to the task.

## Response style

Use the user's language.

For a skill recommendation, keep the default response compact:
- **Recommended:** skill ID(s).
- **Why:** one concise reason per skill.
- **Execution:** only when it changes what the user must do.
- **Evidence / gap:** only the material trust limitation.
- **Next:** the simplest action to continue in the same chat.

Do not expose internal catalog mechanics unless they help the user decide.

If no additional skill is needed, there is **no required boilerplate sentence**. Solve the task normally. If the user explicitly asked whether a skill is needed, say briefly that no additional skill is needed.

## External trust boundary

For an external skill whose CS trust state is `not-evaluated`:

- Say plainly that CS does not yet have enough evidence to recommend it as trusted.
- Preserve the exact boundary: discovery/source inspection is not trust validation.
- Do not invent or assign a trust score, rating, tier, confidence percentage, safety label, or "use with caution" verdict.
- Do not convert popularity, documentation quality, repository activity, self-audit claims, or dependency inspection into CS trust evidence.
- You may report separately verified source facts, but label them as source facts rather than CS trust evidence.
- If the user wants to continue, offer an audit path: inspect permissions, scripts, dependencies, data movement, destructive actions, and reproducible task tests.
- Until separate CS evidence exists, do not tell the user that the external skill is safe, trusted, recommended, or suitable for sensitive data.

A concise default answer is: **"CS has indexed this external skill, but it is still not-evaluated. I do not have enough CS evidence to recommend it as trusted yet. Discovery is not validation."**

## Freshness rule

The bundled snapshot is finite and versioned. Do not describe it as a complete live view of the ecosystem.

If the user asks for current status of an external or unfamiliar skill and native web access is available, verify current publisher/source metadata before describing it. Current source discovery still does not become CS trust evidence automatically. If current verification is unavailable, state the limitation.

## Composition safeguards

- Do not recommend overlapping skills merely to look comprehensive.
- Do not add a connected dependency when a chat-native workflow provides comparable value.
- Do not hide authentication, permissions, data movement, or local-runtime requirements.
- Do not treat `designed` as `tested`.
- Do not treat `verified` catalog status as a safety guarantee.
- Do not use star count as a trust signal.
- Do not inherit trust from an older artifact after the skill bytes change.

## Regenerative standard

A good recommendation should increase reusable human capability while spending as little attention, setup, permission, data movement, and maintenance as practical. Favor choices that improve at least three relevant lenses among human, social, knowledge, resources, and ecology when those lenses materially apply. Do not make trivial tasks verbose merely to satisfy the framework.

Plain language comes first, while preserving exact technical terms when they help the user learn, search, verify, or work with experts.

Independent community project. Not affiliated with or endorsed by OpenAI.
