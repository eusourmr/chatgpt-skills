---
name: ux-quality-gate-labs
description: 'Use for an explicitly requested UX/UI audit, accessible interaction review, information organization, and design-principle recommendation with evidence.'
---
# UX Quality Gate Labs — Design Cognition

Private evaluation profile, adapted from `experiments/ux-quality-gate` in the CS Navigator GitHub repository. Designed and CI-tested at the source level; not certified by user studies or WCAG conformance testing.

## Core workflow
1. Define user, task, interface/surface, critical success path, platform, locale, sources and constraints.
2. Inspect entry, decision, action, feedback, loading, error, cancel, recovery, keyboard, touch, reflow and reduced-motion states. Distinguish observed defects, static heuristics, hypotheses and untested behavior.
3. Prioritize with clear impact on task completion and access; do not substitute an arbitrary numeric score.
4. Choose at most 2–3 contextually relevant design principles from `knowledge/design-cognition.json`; cite author and the linked source without impersonating or attributing invented quotations.
5. Check tensions: Rams-style restraint must not obscure controls required by Don Norman's signifiers; Saul Bass-style animation must respect reduced motion and information accessibility; brand consistency must not override local cultural context.
6. Recommend the smallest change and a measurable test (success path, error path, keyboard navigation, narrow viewport, text scaling, screen reader if relevant). No WCAG certification from HTML or visual-only scan.
7. Distinguish advice from a patch implemented and tested in runtime; report remaining gaps.

## Knowledge behavior
Knowledge references are original working syntheses, not neural network training, no hidden memory, no autonomous feedback learning. `knowledge/design-cognition.json` is a small **11-author activation-test subset** of the fuller 22-principle source graph in the GitHub candidate. Favor original evidence and accessibility standards over celebrity authority.

## Boundary with Design System Studio
Design System Studio owns brand and tokens. This skill owns interaction quality, task completion, comprehension and verification. Preserve existing design system unless user authorizes changes.

## Evidence-based visual refinement — beta.7

Use this addition **only** for substantive UI/UX design, audit or polish work. Do not activate for ordinary writing or backend-only tasks. UX Quality Gate remains responsible for interaction, accessibility and verified task outcomes; Design System Studio remains responsible for explicitly requested brand and visual tokens.

**Evidence before preference.** Obtain the user-supplied screen, screenshot, source or reachable interface. Mark each finding as observed, source-inferred, hypothesis or not tested; do not describe screenshots, code execution, browser tests or usability results not actually obtained.

**Scope the intervention.** (a) Existing UI adequate: report that no redesign is needed, give at most a few specific optional refinements; (b) isolated defects: retain layout, brand and assets, change only defective areas; (c) systemic problems: propose a coherent design direction and staged correction. Do not fabricate problems to justify a redesign.

**Direction from the product, not a trend.** Establish user, task, existing brand, product vocabulary, context of use and one distinctive, meaningful detail. Avoid generic "AI-looking" decoration only when it impairs clarity, task flow or brand fidelity. A deliberately chosen strong visual style is not a defect merely because it uses color, glow or animation.

**Nine checks, adjusted to severity:** 1 spacing/group rhythm, 2 semantic color and contrast, 3 icon purpose and consistency, 4 interface language and content truth, 5 typography and legibility, 6 layout and responsiveness, 7 components/data graphics, 8 imagery with actual product relevance, 9 useful motion. A blocking accessibility or data-loss issue outranks aesthetic ordering. Keep every original feature, section and data contract unless the user authorizes removal.

**Platform-aware evaluation.** Detect stack only from supplied project evidence; otherwise keep guidance stack-neutral. For native mobile separately verify safe areas, interaction targets, gesture alternatives, focus and screen reader order. For web verify semantic controls, visible focus, zoom/reflow, text scaling, keyboard and motion preference. When Enter submits a form with multilingual composition, avoid treating an IME candidate confirmation as submission; keep an explicit submit action. For RTL locales check direction metadata, logical CSS properties, mixed-script numbers and directional icons; never mirror an entire text container.

**Design-system boundary.** Reuse approved tokens. When the user explicitly requests a design-system deliverable, propose a canonical system and explicit page-specific overrides, without silently overwriting existing master files. Separate token/design documentation from a changed screen. Any generated charts or examples must be clearly identified as mock data unless source records confirm the figures.

**Check actual outcome.** Inspect focus, errors, empty/loading/recovery, responsive breakpoints relevant to the product, touch, reduced motion, real content lengths and contrast. If tests were not executed, report them as pending, not passed. A static HTML check does not certify WCAG compliance or usability.

Read `references/UX_REFINEMENT_PROTOCOL.md` only when a substantial visual audit, redesign or implementation requires additional precision. For simple interaction answers, use the existing concise core workflow.

**Attribution and license boundary:** Ideas were compared against the MIT-licensed UI UX Pro Max project and the CC BY 4.0 Unslop project. This text is an original CS Navigator adaptation, not a copied skill, dataset, script or aesthetic mandate. See `NOTICE-UX-SOURCES.md` for upstream authors, URLs and recorded source revisions.

## Ciclo de qualidade semântica CS-SQ-01 — beta.9

**Compreender → Executar → Avaliar → Corrigir seletivamente.** Entender intenção, contexto, destinatário, restrições e evidência; entregar o resultado pedido com o menor método suficiente; confrontar a saída com critérios materiais da disciplina; corrigir somente falhas identificadas e encerrar quando suficiente. Em tarefas simples, não adicionar etapas, ferramentas ou relatórios. Distinguir fatos, inferências e lacunas; não alegar fonte, teste, supervisão humana ou execução não observados. Não substituir a resposta por um checklist ou expor raciocínio interno.

**Verificação de UX:** observar compreensão, acesso, interação, estados de erro, recuperação e acessibilidade; separar problemas comprovados de hipóteses sobre telas ou usuários não observados. Preservar identidade e componentes já adequados. Redesenhar apenas quando há defeito sistêmico demonstrado e verificar efeito na tarefa real, não só na aparência.
