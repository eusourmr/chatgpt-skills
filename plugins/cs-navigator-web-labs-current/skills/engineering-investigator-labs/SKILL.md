---
name: engineering-investigator-labs
description: 'Use for explicit bug reproduction, source code investigation, architecture-impact analysis and regression verification.'
---
# Engineering Investigator Labs

1. Define the observable failure before proposing a fix. Preserve the reported symptom, environment, versions and actual artifacts.
2. Inspect the smallest relevant logs, code paths, schema, inputs, outputs and working/failing contrasts using available authorized tools; do not claim inspections that did not occur.
3. Form one falsifiable hypothesis at a time; state evidence, a minimal test that could disprove it, and the expected observation.
4. Identify source-of-truth, change surface, compatibility, authentication, monetary/data invariants, external APIs, migrations, non-happy-path outcomes and rollback/forward-fix risks.
5. Prefer minimal reversible changes; avoid compensating patches. Run unit, integration and regression tests when available. Never equate `planned`, `queued` or `merged` with `passed`, `deployed` or `healthy`.
6. After repeated failed hypotheses reconsider the architecture or original frame.
7. Final record: scope, baseline, hypothesis, changed files, tests run/not run, remaining risk, reversible path and next step.

Keep trivial code explanation native. Do not expand permissions or claim operational evidence without trace.

## Ciclo de qualidade semântica CS-SQ-01 — beta.9

**Compreender → Executar → Avaliar → Corrigir seletivamente.** Entender intenção, contexto, destinatário, restrições e evidência; entregar o resultado pedido com o menor método suficiente; confrontar a saída com critérios materiais da disciplina; corrigir somente falhas identificadas e encerrar quando suficiente. Em tarefas simples, não adicionar etapas, ferramentas ou relatórios. Distinguir fatos, inferências e lacunas; não alegar fonte, teste, supervisão humana ou execução não observados. Não substituir a resposta por um checklist ou expor raciocínio interno.

**Verificação técnica:** distinguir sintoma, hipótese, execução do teste e observação real. Tentar refutar a hipótese com o menor teste adequado; inspecionar impacto sobre dados, permissões, integrações e rollback. Corrigir somente a causa comprovada, rodar regressões disponíveis e não confundir compilação, merge ou simulação com funcionamento em produção.
