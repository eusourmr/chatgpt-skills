# Auditoria das Skills — base 06/11/2026 e carteira de 27 frentes

## 1. Diagnóstico de inventário (não confundir as contagens)

| Fonte | Quantidade | O que conta |
|---|---:|---|
| `catalog/skills.json` | **80** | 63 skills autorais + 17 entradas de ecossistema, incluindo uma coleção |
| `catalog.json` | **79** | 63 itens autorais + 16 produtos comunitários/oficiais; a coleção não entra |
| `catalog.json` `draft` | **48** | Skills autorais em rascunho, sem promoção por simples existência |
| `catalog.json` `verified` | **15** | Itens de curadoria verificados segundo política do catálogo; **não equivale a execução em ChatGPT** |
| `catalog.json` `official` | **12** | Itens cuja origem é OpenAI; não significa endosso do repositório |
| `catalog.json` `community` | **4** | Itens comunitários externos |

**A meta de 50 skills por quantidade já foi superada: são 63 autorais.** Se a meta for **50 qualificadas por evidência de uso real**, essa base ainda não pode ser estabelecida pelos 15 itens com selo editorial `verified`. É necessário inventariar os testes nativos por skill antes de definir quantas faltam. Um plano de "mais 27" **não deve ser executado em massa** enquanto houver duplicação de capacidade e ativação não comprovada.

Este relatório é uma **auditoria documental e de catálogo**, não uma auditoria individual com piloto de execução para todas as 63 skills. A checagem estrutural reprodutível é `scripts/audit-core-skills.py`. Avaliação semântica nativa e observação em produto ainda exigem evidências separadas.

## 2. Correções executadas nesta revisão

- Guia de instalação reescrito para ChatGPT (plugin vs skill), Codex, ZIP de avaliação e host/execução real. Removidas versões históricas indevidamente apresentadas como atuais.
- `engineering-investigator`: contratos de mudança, diagnóstico, integrações, regressões, esquema e evidência.
- `codex-pr-reviewer`: versão distribuída preservada sem alterações — possui passaporte imutável e exige novo processo de revisão/qualificação. As melhorias de CI, merge, release e rollback foram especificadas em `experiments/code-lifecycle-governor` para futura promoção.
- `text-integrity-editor`: norma culta contextual, variante pt-BR e voz do autor, modalidade e citações preservadas.
- `document-compliance-auditor` + `academic-writing-navigator`: identificação e fontes de edições ABNT, manual institucional, perfil `abnt-br` sem inventar conteúdo normativo.
- Novo perfil opcional `pt-br-norma-culta`, ainda `designed`.
- `experiments/code-lifecycle-governor`: candidata independente para gestão de código de ponta a ponta, ainda `designed`.
- A candidata `experiments/ux-quality-gate` permanece na revisão PR #111; não duplicar seu escopo nem fazer fork upstream.

## 3. Carteira de 27 frentes, orientadas a problemas

**Estado de todas abaixo:** `candidate / not created`, exceto onde o arquivo experimental já existe. A lista é uma **pipeline de avaliação**, não 27 skills instaladas ou aprovadas. Antes de abrir um pacote novo, executar teste de não sobreposição com o skill mais próximo.

| # | Frente de capacidade candidata | Critério de distinção / skill que já existe |
|---:|---|---|
| 1 | **Code Lifecycle Governor** — governança de mudanças, release, rollback | Implementada em `experiments/`; diferencia-se de `engineering-investigator` e `codex-pr-reviewer` |
| 2 | Architecture Decision Ledger — decisões arquiteturais rastreáveis | Diferencia-se de `personal-decision-record`: foco em contrato de software e trade-off técnico |
| 3 | API Contract Verifier — compatibilidade e schemas | Fora do `realtime-api-integration`, dedicado a contratos versionados |
| 4 | Data Migration Guardian — migração segura, backfill, reversibilidade | Foco DB/data, não investigação geral |
| 5 | Test Matrix Architect — matriz de riscos e níveis de teste | Projeto de cobertura baseado em invariantes, não revisão de PR |
| 6 | Dependency Upgrade Auditor — riscos de supply chain/lockfile | Verificar CVE e incompatibilidade sem instalação automática |
| 7 | Performance Budget Investigator — benchmark de regressão | Exige medidas reproduzíveis; não diagnóstico sem métrica |
| 8 | Incident Response Record — incidentes e postmortem | Diferencia de `proof-of-progress`: operação de serviço e recuperação |
| 9 | Release Artifact Verifier — proveniência e SHA-256 | Pacote exato, não execução do plugin |
| 10 | Secrets Hygiene Reviewer — permissões/logs/redação de segredos | Segurança de código sem coletar segredos do usuário |
| 11 | **UX Quality Gate** — jornada, acessibilidade e falhas de interface | Implementação candidata no PR #111, distinta de `design-system-studio` |
| 12 | UX Research Protocol — pesquisa de usabilidade com ética | Estudos com participantes, não heurística de HTML |
| 13 | Design Token Migration Planner — migração e regressão de tokens | Complementa `design-system-studio` |
| 14 | Mobile Interaction Audit — safe areas/teclado/touch de apps | Foco plataformas nativas, não checklist web genérico |
| 15 | Accessible Form Flow Evaluator — jornada de formulários | Apenas se houver casos aprofundados além de UX Quality Gate |
| 16 | ABNT Reference Metadata Checker — metadados bibliográficos | Perfil subordinado ao `document-compliance-auditor`, sem duplicar o motor de regras |
| 17 | Citation Claim Binder — vínculo citação/afirmação | Difere de `academic-integrity-reviewer` se houver instrumento de rastreabilidade |
| 18 | Journal Submission Checklist — requisitos por periódico | Pode ser perfil de `academic-writing-navigator` se não houver valor exclusivo |
| 19 | Linguistic Ambiguity Clinic — ambiguidade material em textos jurídicos/técnicos | Perfil especializado do `text-integrity-editor`, não editor completo |
| 20 | Corpus Evidence Matrix — organização da literatura empírica | Requer dados verificáveis, não inventar estudos |
| 21 | Plugin Activation Diagnostician — host/package/MCP smoke test | Complementa `cs-navigator` com identificação de superfície e rastros |
| 22 | Skill Runtime Evaluation Harness — testes semânticos e adversariais | Complementa `skill-workbench` quando houver executor de avaliação real |
| 23 | Permission Boundary Mapper — dados/credenciais/escopos | Difere de segurança genérica por grafo de permissões |
| 24 | Evidence Drift Monitor — referências e efeitos de atualização | Complementa `information-expiry-guard` com verificação técnica agendada |
| 25 | Operational Import Reconciler — integridade de importação e pareamento | Foco financeiro/operacional, exige trilha auditável e autorização |
| 26 | Documentation Onboarding Tester — primeiro uso real | Complementa `digital-helper-simple` com teste reproduzível de instalação |
| 27 | Product Experiment Gate — hipóteses, métricas e reversibilidade | Foco produto, não experimentos científicos genéricos |

## 4. Critérios obrigatórios antes de criar ou promover

1. **Job distinto:** demonstrar falha ou fricção real que outra skill existente não resolve; se não houver ganho, criar perfil/ajuste, não uma skill nova.
2. **Fonte e licença:** preservar proveniência de terceiros. Analisar UI/UX Pro Max sem fork, cópia indiscriminada ou dependências npm remotas.
3. **Contratos:** ativação e não ativação, entradas, saídas, permissões, estados de erro, compatibilidade e usuário responsável.
4. **CI:** fixtures positivos, negativos, adversariais, regressão, integridade, ausência de segredos e política de saúde/exclusões.
5. **Host:** prova de que ChatGPT/Codex carregou a versão exata, ferramenta executou e resultado foi observado, sem inferência a partir de ZIP ou catálogo.
6. **Governança:** `designed` → `CI-tested` → `host-loaded` → `tool-invoked` → `outcome-verified`; não converter automaticamente estados.
7. **Distribuição:** só após revisão, política de dados e compatibilidade. O plugin 0.17 de produção não é alterado por este plano.

## 5. Priorização recomendada

**Agora:** terminar PR #111 de UX; homologar `code-lifecycle-governor`; testar ABNT 6023:2025, 10520:2023 e 14724:2024 em documentos com manual identificado; corrigir o onboarding e a ativação real do CS Navigator.

**Em seguida:** pilotos de API Contract Verifier, Data Migration Guardian, Test Matrix Architect e Plugin Activation Diagnostician — problemas com risco mensurável.

**Depois:** avaliar o restante das 27 frentes pelo ganho marginal demonstrado. Não declarar conclusão por ter escrito uma lista.
