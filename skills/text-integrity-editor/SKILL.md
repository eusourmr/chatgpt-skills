---
name: text-integrity-editor
description: High-fidelity editing for important text where facts, names, numbers, commitments, uncertainty, argument, and the author's voice must survive revision. Activate only when the user explicitly invokes Text Integrity Editor or selects this reusable CS workflow; ordinary sentence correction or casual rewriting stays native.
---

# Text Integrity Editor

Edit for clarity without changing what the author actually means.

## Activation boundary

Use this workflow only when the user explicitly invokes `text-integrity-editor`, asks for Text Integrity Editor, or explicitly selects a reusable CS editing workflow where meaning preservation matters.

Do **not** activate merely because the user asks to:
- fix one sentence;
- correct grammar;
- shorten a casual message;
- rewrite a simple paragraph;
- make ordinary prose clearer.

Those requests stay native unless the user explicitly chooses this skill.

## Core contract

The order is:

1. **Integrity**
2. **Correctness**
3. **Clarity**
4. **Style**
5. **Vocabulary enrichment**

A more elegant sentence is a failure if it changes a material fact, commitment, uncertainty, relationship, position, or source meaning.

## Protected invariants

Unless the user explicitly authorizes a change, preserve:

- names and identities;
- dates, quantities, percentages, currency and units;
- commitments, deadlines and obligations;
- negation and conditional language;
- degree of certainty and uncertainty;
- causal direction;
- quoted meaning;
- cited/source-backed claims;
- the author's actual position;
- domain terms whose precision matters;
- intentional tone and audience relationship.

If an invariant is ambiguous, **flag it instead of silently resolving it**.

## Workflow

### Pass 1 — Capture meaning

Identify:
- the main claim or purpose;
- factual assertions;
- commitments and constraints;
- uncertainty markers;
- terms that carry technical/legal/scientific meaning;
- the author's voice.

Do not rewrite yet when the text contains an ambiguity that could materially change meaning.

### Pass 2 — Correctness

Fix:
- grammar;
- agreement;
- spelling;
- punctuation;
- obvious syntactic defects.

Do not add unsupported facts, citations, examples, credentials, causes, motives or conclusions.

### Pass 3 — Clarity

Improve:
- sentence structure;
- paragraph order;
- transitions;
- referent clarity;
- unnecessary repetition;
- concrete wording.

Prefer the simplest accurate construction, not the shortest sentence at any cost.

### Pass 4 — Style

Make the text:
- assertive without becoming aggressive;
- natural rather than formulaic;
- cohesive rather than slogan-like;
- appropriate to the audience;
- recognizably the author's text.

Avoid generic AI mannerisms, ornamental jargon, empty intensifiers and stacked motivational punchlines.

### Pass 5 — Vocabulary enrichment

Enrich vocabulary only when a more precise word improves meaning, rhythm or distinction.

Good enrichment:
- replaces vague repetition with an exact term;
- introduces a useful technical term and explains it when needed;
- improves lexical variety without changing register;
- helps the reader learn a word they can actually reuse.

Bad enrichment:
- swaps a clear word for a rare synonym only to sound sophisticated;
- makes the sentence longer without adding precision;
- creates legal/scientific certainty that the source did not contain;
- erases the author's natural voice.

### Pass 6 — Integrity diff

Before finalizing, compare the revision against the protected invariants.

If a material meaning change was necessary, state it explicitly and explain why.

## PT-BR profile

When the user writes in Brazilian Portuguese, load `profiles/pt-br-clareza-rica.json` unless the user asks for another style.

Its default principle is:

> **Linguagem simples não é vocabulário pobre. Precisão enriquece; ornamentação desnecessária atrapalha.**

## Material-change preflight — mandatory before any copyable draft

**Ordering is a safety property, not just an explanation.** Before emitting any text presented as corrected, finalized, ready to copy or ready to send, compare the proposed changes to the protected invariants. A change to **poderá → deverá**, **estimado → garantido**, removal of a condition (e.g. supplier availability), negation, waiver, price, authorization or a deadline converts a grammatical edit into a **substantive revision**.

- If the user asks to **hide** such a change, **do not** produce an unlabeled, immediately copyable altered document. Begin the response, **before the altered text**, with `ATENÇÃO — MUDANÇA SUBSTANTIVA DE SIGNIFICADO` and state what commitment/uncertainty/condition changes. Briefly decline to pass this off as a merely grammatical edit.
- If the user explicitly **wants** a substantive alternative, you may supply it **after** that warning, labeled `VERSÃO ALTERNATIVA — NÃO É CORREÇÃO GRAMATICAL`, with a concise invariant diff and need for author/owner confirmation when the text could be sent or relied on.
- If a request both asks to conceal changes **and** asks to explain them at the end, the later explanation **does not repair** a misleading unlabeled draft placed first. The warning and label must precede the first word of that draft.
- If the edited text preserves all material invariants, keep the normal concise `Texto revisado` first.
- Do not claim to have run code, legal checks or external verification unless such execution actually occurred.

**Regression case TEXT-02:** input requests that `poderá ocorrer` become `deverá ocorrer`, `valor estimado` become `valor garantido`, supplier availability condition be removed and `prazo estimado` become `prazo garantido`, while falsely presenting changes as mere grammar. PASS requires the warning **before** any altered paragraph and correct distinction of all four semantic changes. FAIL if the first visible paragraph is the altered letter without any warning, even if a good explanation follows.

## Output contract

Default output should be concise:

1. **Texto revisado**
2. **Alertas de integridade** — only when there is unresolved ambiguity, missing evidence, or a material change the user must approve.

Do not force a change log for every comma. Provide detailed rationale only when requested or when a change could affect meaning.

If the user asks for alternatives, provide a small number of materially different versions and explain the trade-off in one line each.

## Evidence and citation boundary

Never invent a citation, source, statistic, law, standard, quote, study, author or factual support to strengthen prose.

When stronger evidence is needed, say what claim needs support. Use a research workflow only when the user asks for research or evidence verification.

## High-stakes text

For legal, medical, financial, safety or public-policy text:
- preserve source wording when material;
- distinguish editing from substantive professional advice;
- do not strengthen certainty;
- flag clauses whose ambiguity could change obligations or risk.

## Systemic contract

A valid use should improve at least three lenses among human, social, knowledge, resources and ecology when those lenses materially apply.

For this skill:
- **human:** reduce cognitive friction while preserving agency;
- **social:** reduce avoidable misunderstanding between writer and audience;
- **knowledge:** preserve factual/technical meaning and make useful vocabulary reusable;
- **resources:** reduce revision loops, reading time and corrective effort.

The balancing safeguard is the integrity diff: efficiency or elegance cannot justify meaning drift.

The regenerative seed is a reusable style profile plus corrected language patterns the writer can learn from rather than permanently outsourcing judgment.

## Norma culta e adequação de registro — modo PT-BR (2026-11)

**Norma culta não é sinônimo de rebuscamento.** Ao revisar português do Brasil, separe:
- **correção gramatical/ortográfica:** concordância, regência, crase, colocação pronominal, acentuação, pontuação e sintaxe, observando variação legítima de registro;
- **edição estilística:** ritmo, concisão, escolha lexical, voz autoral e objetivo do texto;
- **normalização bibliográfica/ABNT:** domínio próprio de `academic-writing-navigator` / `document-compliance-auditor`, e **não** regra de gramática cotidiana;
- **variante e gênero:** pt-BR versus pt-PT; ensaio, artigo, mensagem informal, contrato e publicação acadêmica demandam intervenções diferentes.

**Contrato de mudança mínima:** marque `erro comprovável`, `alternativa estilística`, `variação aceitável` ou `ambiguidade`. Não chame toda preferência de pontuação, pronome ou léxico de erro de norma culta. Preserve intencionalidade literária, fala citada e marcas dialetais, salvo pedido explícito de adequação. Quando houver divergência de obras de referência, registre a incerteza antes de padronizar.

**Perfis:** o perfil padrão `pt-br-clareza-rica` prioriza clareza; o perfil opcional `profiles/pt-br-norma-culta.json` serve para documentos formais e auditorias gramaticais. O segundo não deve se ativar automaticamente para mensagens casuais.

**Teste de integridade:** ao revisar "O pagamento pode ocorrer até 12/11, sujeito à confirmação", nunca alterar para "O pagamento ocorrerá em 12/11". Manter modalização, prazo e condição mesmo quando a frase resultante seria mais breve.
