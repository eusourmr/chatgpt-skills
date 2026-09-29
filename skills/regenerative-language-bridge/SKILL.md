---
name: regenerative-language-bridge
description: Explain technical, legal, scientific, or institutional material to a broader audience in plain language without erasing precision, uncertainty, or necessary terminology. Activate this skill only when the user explicitly asks to use Regenerative Language Bridge (or its skill ID), or explicitly selects this reusable CS workflow; a direct explanation request alone stays native.
---

# Regenerative Language Bridge

## Activation boundary

Apply this workflow only when the user explicitly invokes this skill by name or skill ID, or explicitly asks for a reusable CS skill, workflow, or capability and this skill has been selected. Subject-matter similarity alone is not activation.

If the user directly asks to explain, analyze, plan, test, write, summarize, translate, calculate, research, or create something without capability-selection intent, do not impose this workflow or its structured output. Handle the task natively.

If the user explicitly invokes this skill by name or skill ID, that is sufficient activation. When activated, execute the full Workflow and Output contract below and preserve every required output section or field. Do not silently collapse the skill into an unstructured native-style answer unless the user explicitly asks for a different format.

Create shared understanding between experts and non-specialists. Simplicity is a route to depth, not a substitute for it.

## Systemic contract

A valid result must benefit at least three of the human, social, knowledge, resources, and ecology lenses; disclose tradeoffs in the others; include a reinforcing learning loop and a comprehension safeguard; leave a reusable glossary or explanation; budget attention, translation, data, and maintenance; and label untested impact as a hypothesis.

Before action, name at least one resource or capability expected to end above baseline and set a limit for every material resource. After action, call the outcome regenerative only when indicators support that threshold; a gain in one unit does not erase a deficit in another.

## Workflow

1. Identify the audience, the action they need to take, prior knowledge, language, and accessibility needs.
2. Extract the claim, evidence, uncertainty, obligations, and technical terms. Never simplify by deleting a material caveat.
3. Write the first layer in everyday language: conclusion first, short sentences, one idea per paragraph, and concrete examples.
4. Define each necessary technical term at first use. Keep the exact term so readers can search, learn, and speak with experts.
5. Add a second layer with technical detail, assumptions, formulas, standards, or source notes.
6. Add a teach-back check: ask the reader to explain the decision or next action in their own words, or provide three comprehension questions when interaction is not possible.
7. Record confusing terms and successful explanations in a small glossary that can be reused and improved.
8. Measure comprehension, avoidable follow-up, error rate, and translation effort at the next review.

## Output

- **In plain language:** what this means, why it matters, and what to do.
- **Key terms:** technical term → simple explanation → precise definition.
- **Technical layer:** full detail without promotional wording.
- **Check understanding:** teach-back prompt or questions.
- **Learning loop:** what feedback will improve the next version.
- **Resource note:** reading time, maintenance owner, and expiry or review date.

On explicit invocation, all six output sections above are mandatory. Do not rename or merge them.

The **Resource note** is valid only if it contains these three explicit labeled lines, even when values are unknown:

- **Reading time:** estimate in minutes.
- **Maintenance owner:** named owner when known; otherwise `to be defined`.
- **Review/expiry date:** concrete date when known; otherwise `to be defined`.

Do not substitute a general paragraph about resources for these fields. A Resource note without all three labels is incomplete.

### Required explicit-invocation template

When the user explicitly invokes this skill, use the six required sections in this order. Translate the labels to the user's language, but do not omit, merge, or replace them with alternative headings.

For Portuguese, use exactly:

```markdown
### Em linguagem simples

...

### Termos-chave

...

### Camada técnica

...

### Verificação de entendimento

...

### Ciclo de aprendizado

...

### Nota de recursos

- **Tempo de leitura:** <estimate in minutes>
- **Responsável pela manutenção:** <name or "a definir">
- **Data de revisão/expiração:** <date or "a definir">
```

A response that omits any of these six sections, or replaces the three resource fields with generic prose, is incomplete.

Respond in the user's language. Offer another language only when useful; do not assume literacy, disability, culture, or expertise from identity.

## Boundaries

For legal, medical, safety, or financial material, preserve the authoritative text or source link and clearly separate explanation from professional advice. Readability scores are signals, not proof of understanding.

## References

- <https://digital.gov/guides/plain-language>
- <https://www.w3.org/TR/web-sustainability-guidelines/>
