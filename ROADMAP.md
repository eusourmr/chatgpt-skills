# CS Navigator — active roadmap

Phase 3 baseline reviewed on **2026-11-06**, starting from `main` at `df4e7e4` (merged PR #130). Current personal plugin installation verified on **2026-11-26**; retain the earlier baseline as history.
This page is the forward plan. The previous release-by-release roadmap is
preserved in [the historical archive](docs/archive/ROADMAP_PRE_PHASE3_2026-11-06.md).
Read the [maturity review in Portuguese](docs/CS_ROADMAP_REVIEW_2026-11-06.md),
[canonical state](docs/CS_NAVIGATOR_ESTADO_E_CONTINUIDADE_2026-11-06.md) and
[Phase 3 protocol](docs/CS_PHASE3_QUALIFICATION.md) for evidence and limitations.

## Product objective

Help someone finish a task through the simplest adequate path: a native answer,
a relevant available specialist, or a permitted connected workflow. Curation must
earn its additional steps. Catalog size, skill activation and version count are
not measures of user benefit.

Product positioning: **"CS Navigator é o canivete suíço para quem quer usar o ChatGPT ao máximo."** This describes a governed **curation/orchestration goal**, not universal plugin availability, guaranteed invocation or trained autonomous intelligence.

## Baseline: established and still unknown

| Component | Established | Not established |
| --- | --- | --- |
| Production `0.17.0` | Preserved GitHub production line | Public Directory approval or activation in every conversation |
| Private Web Labs `0.20.0-beta.4` | HOST-03R passed: six skills exposed, curator read, Registry called in the same session | Universal activation, effective routing or advantage over native ChatGPT |
| Private Web Labs `0.20.0-beta.8` | **Installed in personal account, source reread:** six Skills and nine rules; package CI passed | Automatic activation/skill selection in a fresh chat, independent outcomes and A/B advantage |
| Private Web Labs `0.20.0-beta.9` | **Installed 26 Nov 2026, read back:** 21 files, six Skills and CS-SQ-01; nine existing curator rules preserved | New-chat auto-routing, independent behavior and A/B quality improvement remain unqualified |
| Original Labs `0.20.0-beta.3` | Historical comparison/rollback reference | A reason to reopen the completed Web connection investigation |
| Registry | 63 source entries, 61 distributable; read-only metadata | Installation or execution of those 61 capabilities; immutable publication provenance (`development` remains) |
| Quality catalog | 79 items including 48 drafts; separate editorial catalog has 80 entries | Individual qualification of the 48 drafts |
| Phase 3 start | Evidence checker, neutral packets, three source reviews; synthetic regression reproduced | New independent ROUTE-01/02 host passes, a clean A/B outcome, draft promotions |

Discovery, packaging, host availability, source read, tool invocation and real
outcome are distinct evidence states. A CI pass does not merge these states.

## Active milestones

| Priority | Milestone and scope | Exit evidence | Dependencies |
| --- | --- | --- | --- |
| P0 | **F3.1 — minimal and substantive routing.** ROUTE-01 stays native; ROUTE-02 reads and applies the appropriate specialist. Preserve negative cases and complete task traces. | Reviewed host receipts, response and executed regressions; count unnecessary calls. Separate development rehearsals from host trials. | HOST-03R already closed; no reconnection work |
| P0 | **F3.2 — publication provenance and delivery states.** Bind Registry publication to an immutable source revision/hash and real publication date; distinguish reviewed date from publication date. | Reproducible publication manifest, drift/freshness tests, truthful unknowns and rollback. No cosmetic date refresh. | Separate change/review; preserve production interfaces |
| P1 | **F3.3 — small draft batches.** Begin with `capability-preferences`, `context-continuity-manager`, `decision-stop-rule`; inspect duplication and activation boundaries. | Per-skill positive, non-activation, adversarial and permission cases; corrected failures retested against exact bytes; human release decision. | Source review first; excluded healthcare skills stay excluded |
| P1 | **F3.4 — value and usability.** Evaluate engineering, PT-BR editing and academic writing; observe a new person installing and completing a task. | Frozen rubric, outcomes and friction recorded. A/B only with a separate CS-free control and comparable settings; otherwise descriptive findings. | Available test environments and participant agreement; no private-data telemetry by default |
| P2 | **F4 — sustainable distribution.** Choose one primary supported Web path, maintain versioned updates and recovery, then decide on public submission. | Third-party install/update/rollback evidence, exact release artifact, permissions/privacy review and explicit publication decision. Claim approval only after actual approval. | F3 evidence and operational ownership |
| Later | **Evidence-led expansion.** Add profiles, workflows or ecosystem integrations only for unmet jobs. | Demonstrated demand, maintenance owner, license/provenance and measurable acceptance criteria. | Do not replace current gates with catalog-growth goals |

F3.1 and F3.2 can proceed independently. F3.3 begins with source review while
behavioral promotion waits for its own evidence. Do not block all technical work
because an isolated A/B host is unavailable, and do not turn that limitation into
a claim of comparative benefit. Dates and release numbers follow the qualified
scope; this roadmap does not create a new release or rename 0.18 candidates.

## Immediate work and honest status

- ROUTE-01 and ROUTE-02 prompts and acceptance criteria are frozen in
  `trust/qualification/phase3/protocol.json`.
- The development ROUTE-02 rehearsal used an actual host specialist read, then
  re-ran the existing ENG-01 synthetic fixture: corrected **7/7**, original
  **expected failure** in the selected race test. This is not an independent
  automatic-routing trial or production software repair.
- A/B is **control_unavailable** in this conversation: CS capabilities are
  available here. The checker rejects exposed-CS controls, mismatched prompts,
  context/model settings, missing reads, incomplete receipts and changed hashes.
  Consistent receipts still require origin authentication and blind human review.
- Batch 01 has **three source reviews and 12 planned, unexecuted behavior cases**.
  `decision-stop-rule` has an explicit-selection default in `agents/openai.yaml`,
  but no activation/non-activation section in its portable `SKILL.md`. **48 remain drafts; zero promotions.**
- Registry provenance and third-party installation are separate open milestones.
  Do not rewrite historical qualification manifests or the generated progress panel.

## What to improve next

1. End every recommendation with an available, verifiable next action.
2. Treat correct abstention and less user effort as successes, not fewer activated skills as a failure.
3. Prefer a shared method plus versioned profiles when it reduces duplication without losing boundaries.
4. Give a short recovery path when a source, tool or permission is unavailable.
5. Keep evidence readable on demand; avoid turning routine answers into routing reports.
6. Distinguish local executable Guardian checks from textual host instructions; require a real decision trace for runtime-enforcement claims.
7. Publish negative and null findings. Retire or simplify workflows whose upkeep exceeds demonstrated benefit.

## Measures and stop conditions

Track task correctness, unsupported claims, permission violations, unnecessary
tool calls, steps to a useful result and third-party installation completion.
Measure time, tokens or cost only where actually collected, with a denominator
and context. Do not invent 0–100 trust scores or equate editorial `verified` with
field-tested outcomes. Resource and regenerative impact claims need separate
baselines; retain `design-reviewed` until suitable field evidence exists.

Stop promotion on fabricated evidence, unauthorized actions, unclear activation,
source drift or excluded distribution. If the native path is equally adequate
with less effort, keep that path and reconsider the specialist's scope.

## Protected boundaries

Production `0.17.0`, original Labs `beta.3`, Web release `beta.4`, historical
failures and release manifests stay preserved until an explicitly scoped,
reviewed change is authorized. No public release or universal activation is
announced by this roadmap. Registry metadata never becomes executable remote
instructions. Keep least privilege, plain language, reversible changes, no paid
trust and the stronger multi-lens standard for regenerative-core claims.

## PC-01 — engenharia contextual de prompts (laboratório, 22/11/2026)

Incremento experimental **não integrado ao plugin**: biblioteca pura `runtime/prompt-contract.mjs`, testes unitários `tests/test_prompt_contract.mjs` no comando `npm run validate`, contrato e limites em [documentação PC-01](docs/CS_PROMPT_CONTRACT_AND_UMNOO_BOUNDARY_2026-11-22.md). Gera um envelope determinístico e verificável para solicitação estruturada: `prepared_not_executed`. **Não** faz seleção semântica, leitura de Skills, chamadas MCP ou ações conectadas. Engenharia de prompts continua proposta para qualificação em PC-02/03; F3.1/F3.2 seguem P0 e não foram fechadas por este incremento. **UMNOO / Noem é projeto separado, sem integração ou compartilhamento de dados** até avaliação futura expressamente autorizada.

## PC-02 — Web Labs 0.20.0-beta.5 (candidata, 22/11/2026)

A beta.5 acrescenta engenharia contextual de prompts **como método transversal do curador**, sem sétima Skill, mantendo os três modos executar/criar/revisar e preservação da intenção. Fontes em `plugins/cs-navigator-web-labs-beta5/`; geração reproduzível do ZIP no workflow GitHub Actions e documentação em [beta.5](docs/CS_WEB_BETA5_PROMPT_ENGINEERING_2026-11-22.md). **Estados distintos:** fonte versionada, testes de pacote/CI, upload, host carregado e eficácia comprovada. O sucesso de CI não prova os últimos três. F3.1/F3.2 permanecem P0 e os oito cenários PC02 de host ainda exigem avaliação.

A versão estável 0.17.0 e a beta.4 são **referências de regressão, não limites permanentes de evolução**. A meta de atualização é sincronização pelo GitHub quando o host/workspace permitir; sem essa capacidade, manter ZIP versionado, checksum e atualização manual única, sem prometer automatismo. Preservar rollback. UMNOO/Noem permanece sem ponte ou troca de dados até decisão e testes independentes.

## Web Labs beta.6 — curadoria natural (candidata, 22/11/2026)

Correção verificável de três contratos de experiência na beta.5: URI de especialistas deve vir do inventário real (sem nome fixo do plugin Labs portátil); não realizar auditoria de instalação a cada conversa; não exibir relatórios de roteamento em tarefas cotidianas. Nenhuma nova Skill foi adicionada. A engenharia contextual de prompts continua no curador e só entrega prompt copiável quando solicitado. Fonte e testes: [beta.6](docs/CS_WEB_BETA6_NATURAL_USE_2026-11-22.md). O GitHub Actions gera ZIP e checksum; atualização do plugin na conta e homologação no ChatGPT exigem estados próprios. CS Navigator 0.17, beta.4 e beta.5 são marcos de comparação e rollback, não limites imutáveis. UMNOO segue independente.

## 22/11/2026 — instalação da Web Labs beta.6 comprovada

Após o build de CI e merge da PR #136, a beta.6 foi enviada ao **plugin pessoal existente** pelo Plugin Creator e confirmada por leitura posterior da fonte: 14 arquivos, seis Skills e mesma associação ao app Registry. Não confundir este estado com validação de roteamento automático em uma conversa nova. Os oito casos NAT-01 a NAT-08 permanecem pendentes, descritos no [checkpoint do plugin](docs/CS_WEB_BETA6_PLUGIN_ACCOUNT_CHECKPOINT_2026-11-22.md). A proveniência imutável do Registry continua F3.2. O GitHub compila automaticamente, mas ainda não há sincronização comprovadamente automática da instalação pessoal.

## 23/11/2026 — beta.7: avaliação visual e integridade de microcopy

Revisados [UI UX Pro Max e Unslop](docs/CS_UPSTREAM_UX_UNSLOP_2026-11-23.md) contra nossas Skills já instaladas. A beta.7 evolui `ux-quality-gate-labs` e `text-integrity-labs` com intervenções proporcionais, direção fundada no produto, correção por estados/etapas, UI copy com baseline e fonte, cuidados web/native/RTL/IME e atribuição das licenças MIT/CC BY 4.0. São apenas duas Skills alteradas, **seis mantidas**. Sem código externo ou sétima Skill. Geração do ZIP versionado e regressões em CI; atualização do plugin pessoal e testes semânticos de host são marcos distintos. O UMNOO/Noem permanece isolado.

## 23/11/2026 — beta.7 instalada na conta, ativação nova conversa pendente

A beta.7 de UX/Text foi atualizada **no plugin privado pessoal**, e o Plugin Creator releu 17 arquivos incluindo seis Skills e referências. Na mesma conversa, uma leitura via `skills__read` continuou retornando conteúdo antigo, portanto a aplicação imediata da nova fonte pelo host **não foi confirmada**. O [checkpoint beta.7](docs/CS_WEB_BETA7_INSTALL_CHECKPOINT_2026-11-23.md) distingue release armazenada, cache/instantâneo de conversa (hipótese), Skill lida e resultado realmente observado. Prioridade: testar em uma **nova conversa**, mantendo critérios de ativação e comparações intactos.

## 23/11/2026 — Web Labs beta.8: conhecimento curatorial explicitado

O curador recebeu um **ledger próprio de nove regras**, cada uma com escopo, roteamento recomendado, restrições de não ativação, fonte, evidência necessária e estado `source_reviewed_not_host_behavior_validated`, além de **12 casos sintéticos** com resultados não executados no host. O incremento corrige versão declarada e uma instrução de URI malformada, preserva os cinco especialistas, as seis Skills totais e o vínculo do Registry. Ver [relatório e roadmap detalhado](docs/CS_CURATION_KNOWLEDGE_BETA8_2026-11-23.md). A beta.8 é um ganho na governança do conhecimento — não aprendizado neural ou comprovação de roteamento automático.

**Próximas prioridades:** F3.1/CUR08 (executar casos reais e verificar rota), F3.2 (proveniência imutável do Registry), F4.0 (update/rollback na instalação pessoal), F4.1 (remover dependência sequencial dos construtores 5→6→7→8), PC-04 (A/B nativo isolado), CUR09 (composição proporcional), CUR10 (revisão supervisionada por falhas). Não lançar uma sétima Skill para substituir o aprendizado de curadoria; UMNOO permanece separado.

## 23/11/2026 — auditoria de apresentação e instalação

O [registro de auditoria](docs/CS_AUDIT_AND_POSITIONING_2026-11-23.md) sincroniza as páginas README/Getting Started com a versão realmente instalada **0.20.0-beta.8**, mantém 0.17 como produção histórica e a beta.4 como evidência HOST-03R. GitHub Actions, plugin armazenado e Registry foram inspecionados separadamente. Ainda faltam proveniência imutável do Registry (F3.2), homologação de roteamento em conversa nova (F3.1/CUR08), testes A/B e canal de atualização automática do plugin pessoal. Não confundir integridade de pacote com eficácia demonstrada.

## 23/11/2026 — fundações executáveis dos quatro portões de homologação

Foram implementados [verificação de provenance do Registry, construtor canônico de 19 arquivos e protocolo CUR08/PC-04](docs/CS_F3_HOMOLOGATION_FOUNDATIONS_2026-11-23.md). **Dois aprimoramentos são verificáveis por código/CI:** identidade do snapshot por commit+Git blob com falha fechada em drift, e substituição da cadeia de builds por fonte canônica única com comparação de integridade por tipo de arquivo. A leitura real do curador beta.8 nesta conversa confirma presença da Skill, mas **não fecha** 12 execuções independentes nem comparação nativa isolada. O validador de resultados exige receipts completos e revisão independente; resultado ausente não pode virar status homologado. F3.2 ao vivo ainda depende de deployment Render e validação pós-publicação. A versão privada do ChatGPT permanece beta.8, sem mudança funcional das seis Skills.

## F3.2 — snapshot imutável do Registry, verificado em produção (23/11/2026)

O MCP de produção passou a retornar commit de snapshot e Git blob SHA verificáveis, com data histórica e `raw_source_commit=development` explicitamente separados; também foram confirmados busca e exclusão correta de capacidade vedada. Registro: [checkpoint do serviço](trust/qualification/registry/live-provenance-checkpoint-2026-11-23.json). **Escopo aprovado:** integridade de snapshot e proveniência atual; **não** prova do commit original de 11/10. F3.1 e PC-04 requerem sessões A/B externas independentes; o build canônico F4.1 está aprovado em CI, sem atualização pessoal automática.

## 26/11/2026 — Web Labs beta.9: qualidade semântica transversal

O procedimento **CS-SQ-01** (compreender → executar → avaliar → corrigir seletivamente) foi incorporado aos **seis arquivos de Skills Web existentes** com critérios específicos para curadoria, escrita acadêmica, conformidade documental, investigação técnica, fidelidade de texto e UX. A melhoria é declarativa: não adiciona Skill, não treina pesos nem comprova automaticamente benefício. Versão `0.20.0-beta.9` candidata; método e QA em [relatório beta.9](docs/CS_SEMANTIC_QUALITY_BETA9_2026-11-26.md). Os critérios CUR08/PC-04 continuam independentes e não foram artificialmente homologados. A beta.8 permanece como referência de rollback.

## 26/11/2026 — beta.9 instalada e fonte relida

A nova beta.9 foi atualizada no plugin privado já existente após a aprovação dos testes do GitHub, com 21 arquivos e seis Skills. A leitura posterior confirmou a presença do ciclo CS-SQ-01 em todas elas, sem nomear terceiros, alterar permissões, adicionar Skills ou ligar UMNOO. [Checkpoint de instalação](docs/CS_BETA9_PLUGIN_INSTALL_2026-11-26.md). A beta.8 permanece baseline para rollback; roteamento em conversas independentes e desempenho A/B permanecem pendentes na issue #144.
