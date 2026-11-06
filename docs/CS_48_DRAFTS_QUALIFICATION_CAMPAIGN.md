# CS Navigator — Campanha de qualificação das 48 skills em rascunho

**Base:** 06/11/2026. **Mecanismo:** não renomear `draft` para `verified`/ `tested` sem nova evidência.

## Situação

- Catálogo de qualidade (`catalog.json`): **48** skills autorais com `status: draft`.
- Registro público: **46** dessas skills aparecem como disponíveis para consulta de metadados e **duas** têm `distribution_state: excluded` (`caregiver-coordinator`, `medical-appointment-prep`). Essa disponibilidade **não é instalação ou execução**.
- Este pacote cria **48 cenários positivos específicos por objetivo**, **48 anti-sobrerroteamento** e **48 adversariais de evidência** = **144 planos**. Esses prompts são **a executar** em host qualificado; um workflow de CI não simula um ChatGPT real.
- `scripts/qualify-draft-skills.py` valida correspondência entre catálogos, fontes `SKILL.md`, hash SHA-256, estados de distribuição e contratos de teste, e produz JSON revisável. Não altera `catalog.json` ou `registry`.
- `tests/test_qualify_draft_skills.py` verifica a integridade desse processo e os limites de promoção. Não é prova da eficácia das 48 skills em situações reais.

## Gates separados e evidências requeridas

| Gate | Evidência mínima | Resultado desta entrega |
|---|---|---|
| A — Fonte | SKILL.md existe, nome correto, hash e metadados | Automação implementada, executar CI |
| B — Segurança e permissões | Política de distribuição, riscos, revisão de escopos, regressões | Excluídas preservadas; revisão individual ainda necessária |
| C — Semântica | Pelo menos um cenário positivo, um negativo, um adversarial executados no host | **144 cenários preparados, 0 executados por este pacote** |
| D — Disponibilização | Host realmente identificou o arquivo/skill/plugin e versão exata | Pendente; não se infere pelo ZIP |
| E — Resultado | Resultado útil observado, falhas registradas, comparação com ChatGPT nativo | Pendente |
| F — Promoção | Revisão humana, assinatura/identificação da versão, integridade e sem restrição de distribuição | Não autorizado automaticamente |

## Procedimento real para cada skill

1. Selecionar um cenário positivo em `trust/qualification/draft-behavior-scenarios-v1.json`. Preencher dados sintéticos e anexar documento quando necessário.
2. Registrar a versão exata do source/artefato, host, plataforma e forma real de seleção.
3. Executar pedido positivo, pedido negativo e pedido adversarial. Não tratar a resposta natural do modelo, sem resource/traces, como prova de ativação.
4. Avaliar critério de aceitação específico; registrar falhas; revisar SKILL.md em branch; repetir os mesmos casos.
5. Realizar piloto com tarefa real ou autorização explícita e dados anonimizados. Distinguir auto-relato, observação e evidência reproduzível.
6. Verificar fronteira de distribuição. **Não reclassificar como distribuíveis** as duas exclusões de saúde apenas por obter aprovação técnica.
7. Só então propor alteração da classificação editorial por PR com evidência vinculada ao SHA-256 e aprovação humana.

## Fonte de verdade para contas

- `catalog.json`: 48 `draft`, 15 `verified` editoriais, 12 `official` e 4 `community`. Os 15 são estados de curadoria, não 15 comprovações de execução no ChatGPT.
- `catalog/skills.json`: 63 skills do núcleo e 17 referências externas (uma é coleção).
- `registry/public-capabilities-v1.json`: 61 `available` como metadados, duas `excluded`, com evidência por skill.
- A meta **50 efetivas** deve ser medida por habilidades individualmente qualificadas no **ambiente de destino**, não apenas contagem de pastas ou revisão editorial.

## Priorização para pilotos

**Lote 1 — alto impacto e possível observação:** `text-integrity-editor`, `engineering-investigator`, `academic-writing-navigator`, `document-compliance-auditor`, `design-system-studio` e `skill-workbench`. Testar versões atuais e distinguir norma culta de ABNT.

**Lote 2 — uso frequente:** `everyday-problem-solver`, `digital-helper-simple`, `learning-mastery-coach`, `personal-curator`, `project-execution-director`, `context-continuity-manager`.

**Lotes seguintes:** avaliar demais skills por semelhança, risco e demanda, agregando perfis quando uma nova skill não agrega valor diferencial. Não renomear o conjunto de 48 automaticamente.

## Próximo problema de produto

Sem uma superfície em ChatGPT que carregue skills do candidato e gere evidências confiáveis, os testes nativos permanecerão `not_run`. A montagem de ZIPs e a aprovação do CI são necessárias, mas insuficientes; deve-se testar primeiro a superfície de instalação no ChatGPT ou Codex conforme o produto alvo.

**Política:** nunca confundir existência, descoberta, instalação, carregamento, execução de ferramenta e entrega de resultado.
