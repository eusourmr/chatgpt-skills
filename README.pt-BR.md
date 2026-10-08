# ChatGPT Skills

[![Awesome](https://awesome.re/badge-flat2.svg)](https://awesome.re)
[![Validar catálogo](https://github.com/eusourmr/chatgpt-skills/actions/workflows/validate.yml/badge.svg)](https://github.com/eusourmr/chatgpt-skills/actions/workflows/validate.yml)
[![npm](https://img.shields.io/npm/v/chatgpt-skills.svg)](https://www.npmjs.com/package/chatgpt-skills)
[![Licença](https://img.shields.io/badge/licen%C3%A7a-MIT-blue.svg)](LICENSE)

Um diretório selecionado e conferido de skills reutilizáveis e plugins orientados por skills para ChatGPT e Codex, com um núcleo regenerativo auditável.

[English](README.md) · [Primeiros Passos](docs/GETTING_STARTED.pt-BR.md)

> Projeto comunitário independente. Não possui afiliação nem endosso da OpenAI. ChatGPT e Codex são marcas da OpenAI.

## 🛡️ Linha atual de desenvolvimento

**Candidato atual de desenvolvimento:** **CS Navigator 0.15.0 — Everyday Life & Human Capability**.

A 0.15.0 transforma o produto de um seletor de skills em uma camada humana de curadoria de capacidades. O Navigator passa a escolher entre **Nativo → Skill → Jornada de Vida → Ação Conectada**, adiciona **Personal Curator**, **Simple Mode** e **Capability Preferences** opcionais e inclui 31 novas skills para administração pessoal, decisões domésticas, casa, família, cuidado, serviços públicos brasileiros, segurança digital, viagens, grandes mudanças de vida, passagem para profissionais humanos, acompanhamento de progresso, validade de informação e preservação de evidências.

O ZIP estático atual tem **126 entradas** e SHA-256:

`b8a18c87526883dc01331c1f3428c77a375ebf5dd33a8b038db3c6641af29bb2`

Os gates estáticos do candidato passaram: Skill Profiles, Skill Containers, Container Guardian 9/9, validação de submissão pública, estrutura do plugin, inventário das 31 novas skills, ausência da marca antiga no payload e ausência de marcadores obsoletos de qualificação 0.9.

**Limite de evidência:** as 31 novas skills continuam como `designed`. O novo comportamento de curadoria e os bytes exatos da 0.15.0 ainda precisam de qualificação semântica nativa antes de serem chamados de `tested`, `qualified` ou publicados como nova versão do plugin.

A versão atualmente submetida ao diretório da OpenAI continua sendo **CS Navigator 0.9.4 — Submission Compliance**, com status **em revisão / ainda não publicada** em 08/10/2026. A 0.15.0 não deve substituir silenciosamente essa revisão antes de passar seus próprios gates.

> **Sem evidência → não invente. Sem permissão → não escale. Sem caminho autorizado → pare.**

Leia: [0.15.0 Human Capability](docs/CS_NAVIGATOR_0.15.0_HUMAN_CAPABILITY.md) · [Primeiros passos](docs/GETTING_STARTED.pt-BR.md) · [Skill Containers](docs/SKILL_CONTAINERS.md) · [Submissão pública](docs/PUBLIC_PLUGIN_SUBMISSION.md)

## 🚀 Comece em 1 minuto

A experiência pretendida é simples:

1. Instale **CS Navigator** uma vez.
2. Abra uma conversa normal no ChatGPT.
3. Se quiser curadoria silenciosa naquela conversa, escreva: `Use o CS Navigator como meu curador.`
4. Depois converse normalmente. O Navigator deve manter a tarefa nativa quando isso bastar e só acrescentar skill, Jornada de Vida ou ação conectada quando houver ganho material.

**Limite de persistência:** uma frase em uma conversa não prova ativação em todas as conversas futuras. Só podemos afirmar persistência entre chats quando o produto hospedeiro oferecer e confirmar esse mecanismo.

Linhas de versão:
- submissão ao diretório OpenAI: **0.9.4 / em revisão / não publicada**
- candidato de desenvolvimento: **0.15.0 / candidato estático PASS / qualificação semântica nativa pendente**
- slug técnico: `cs-navigator`
- 0.7.5: fundação histórica de confiança/runtime
- 0.9.x: fundação da plataforma first-party e conformidade de submissão
- `chatgpt-skills` CLI/npm: linha independente
- próximo passo arquitetural após qualificar a 0.15: registry vivo somente leitura e continuidade pessoal mais forte, sem tornar conteúdo arbitrário do GitHub executável

## Por que esta lista existe

Não basta chamar uma pasta de `skill`. Este catálogo prioriza fluxos bem delimitados, licença visível, código inspecionável, compatibilidade declarada com honestidade e caminhos práticos de instalação.

A OpenAI diferencia duas formas de distribuição:

- Uma **skill independente** é uma pasta com `SKILL.md` e, opcionalmente, scripts, referências, recursos e `agents/openai.yaml`. Ela está disponível no aplicativo do ChatGPT para desktop, no Codex CLI e na extensão do Codex para IDE.
- Um **plugin** é um pacote instalável que pode reunir skills, conectores e ferramentas MCP. Plugins com skills podem operar no Chat e no Work do ChatGPT e também no Codex, conforme a disponibilidade do produto, da conta, da plataforma e das dependências.

Consulte os guias oficiais para [criar skills](https://learn.chatgpt.com/docs/build-skills) e entender [skills e plugins](https://learn.chatgpt.com/docs/skills-and-plugins).

## O que nos torna diferentes

Este repositório possui duas camadas:

- O **mapa do ecossistema** indica projetos oficiais e comunitários úteis. A inclusão significa que fonte e alegações foram revisadas; não é uma certificação regenerativa.
- O **Núcleo regenerativo** reúne skills autorais que precisam melhorar pelo menos três de cinco áreas — humana, social, conhecimento, recursos e ecologia — e verificar danos nas cinco.

Cada skill do núcleo exige um ciclo de benefício que se reforça **e** uma salvaguarda de equilíbrio, uma semente regenerativa para o próximo ciclo, balanços separados de recursos, linguagem simples antes da profundidade técnica e indicadores observáveis. O selo descreve um projeto revisado, não um resultado real já comprovado.

Leia o [Padrão de Skills Regenerativas](docs/REGENERATIVE_STANDARD.pt-BR.md) completo.

## Selos de curadoria

| Selo | Significado |
|---|---|
| `Catálogo OpenAI` | Presente no repositório oficial de exemplos `openai/plugins`. Isso não garante endosso nem disponibilidade para todas as contas. |
| `Comunidade` | Publicação independente revisada segundo os critérios deste repositório. |
| `Núcleo regenerativo` | Skill autoral do repositório que passa por todos os critérios sistêmicos de projeto. |
| `Projeto revisado` | Instruções e metadados passaram pela validação; resultados em campo ainda não estão comprovados. |
| `Chat` | Indicada para uso conversacional no ChatGPT. Nas skills independentes do núcleo, isso atualmente significa o aplicativo para desktop. |
| `Work` | Indicada para fluxos e artefatos do ChatGPT Work. |
| `Codex` | Indicada para fluxos do Codex desktop, CLI, IDE ou nuvem. |

Os selos de superfície são classificações conservadoras, não garantias de disponibilidade. Examine código, permissões, scripts e dependências antes de instalar.

## Catálogo

<!-- CATALOG:START -->
<!-- Gerado por scripts/catalog.py. Não edite este bloco manualmente. -->

### Coleção oficial

- [**OpenAI Plugins**](https://github.com/openai/plugins) — Coleção oficial atual de exemplos de plugins para ChatGPT e Codex, incluindo pacotes somente com skills e pacotes apoiados por MCP. `Coleção` · `Catálogo OpenAI` · `Chat` · `Work` · `Codex` · `Licença: Per package` · OpenAI · 2026-09-08

### Núcleo regenerativo

- [**Academic Integrity Reviewer**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/academic-integrity-reviewer) — Revisa trabalhos acadêmicos por consistência interna, suporte de fontes, alinhamento citação/referência, figuras/tabelas, desvio de escopo e conclusões sem suporte, sem fabricar fontes. `Skill` · `Núcleo regenerativo` · `Projeto revisado` · `4/5 áreas: humana, social, conhecimento, recursos` · `Chat` · `Codex` · `Licença: MIT` · eusourmr · 2026-10-05
- [**Argument & Article Architect**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/argument-article-architect) — Estrutura artigos com tese clara, evidência real, contra-argumentos sérios e linguagem precisa, sem inventar citações nem alterar a posição do autor. `Skill` · `Núcleo regenerativo` · `Projeto revisado` · `4/5 áreas: humana, social, conhecimento, recursos` · `Chat` · `Codex` · `Licença: MIT` · eusourmr · 2026-10-05
- [**Art Critique Studio**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/art-critique-studio) — Critica arte por intenção, composição, valores, cor, bordas, ritmo e hierarquia focal, preservando o estilo do artista e separando observação de interpretação. `Skill` · `Núcleo regenerativo` · `Projeto revisado` · `4/5 áreas: humana, social, conhecimento, recursos` · `Chat` · `Codex` · `Licença: MIT` · eusourmr · 2026-10-05
- [**bureaucracy-br-navigator**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/bureaucracy-br-navigator) — Navega procedimentos administrativos brasileiros identificando autoridade, escopo territorial, documentos, canal oficial e atualidade. `Skill` · `Núcleo regenerativo` · `Projeto revisado` · `4/5 áreas: humana, social, conhecimento, recursos` · `Chat` · `Codex` · `Licença: MIT` · eusourmr · 2026-10-08
- [**capability-preferences**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/capability-preferences) — Define como o CS Navigator deve fazer curadoria: automático ou perguntar, nível simples/padrão/especialista, confirmação de conexões e visibilidade das skills. `Skill` · `Núcleo regenerativo` · `Projeto revisado` · `4/5 áreas: humana, social, conhecimento, recursos` · `Chat` · `Codex` · `Licença: MIT` · eusourmr · 2026-10-08
- [**caregiver-coordinator**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/caregiver-coordinator) — Coordena tarefas não clínicas de cuidado, contatos, consultas, documentos, responsabilidades, passagens de informação e emergência. `Skill` · `Núcleo regenerativo` · `Projeto revisado` · `4/5 áreas: humana, social, conhecimento, recursos` · `Chat` · `Codex` · `Licença: MIT` · eusourmr · 2026-10-08
- [**chatgpt-apps-deployer**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/featured/chatgpt-apps-deployer) — Prepare, validate, package, and release ChatGPT Apps SDK projects with MCP-compatible tools, UI assets, privacy metadata, deployment checks, submission evidence, and rollback-ready release artifacts. `Skill` · `Núcleo regenerativo` · `Projeto revisado` · `4/5 áreas: humana, social, conhecimento, recursos` · `Chat` · `Codex` · `Licença: MIT` · eusourmr · 2026-10-08
- [**codex-pr-reviewer**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/featured/codex-pr-reviewer) — Review pull requests with Codex using repository-specific business rules, risk-ranked findings, evidence from changed lines, regression checks, and a machine-readable policy that teams can version with the code. `Skill` · `Núcleo regenerativo` · `Projeto revisado` · `4/5 áreas: humana, social, conhecimento, recursos` · `Chat` · `Codex` · `Licença: MIT` · eusourmr · 2026-10-08
- [**consumer-rights-navigator**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/consumer-rights-navigator) — Estrutura um problema de consumo, evidências, solução desejada, caminho de reclamação e verificação de regra atual sem inventar direitos. `Skill` · `Núcleo regenerativo` · `Projeto revisado` · `4/5 áreas: humana, social, conhecimento, recursos` · `Chat` · `Codex` · `Licença: MIT` · eusourmr · 2026-10-08
- [**Context Continuity Manager**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/context-continuity-manager) — Cria pacotes duráveis de continuidade para projetos longos, preservando decisões, invariantes, bloqueios, evidências e próximos passos sem fingir controlar contexto ou memória ocultos. `Skill` · `Núcleo regenerativo` · `Projeto revisado` · `4/5 áreas: humana, social, conhecimento, recursos` · `Chat` · `Codex` · `Licença: MIT` · eusourmr · 2026-10-05
- [**cs-navigator**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/featured/cs-navigator) — Curate the smallest useful capability path for explicit capability-selection requests or after the user explicitly enables CS Navigator as their curator in the current conversation. Route among native ChatGPT, a skill, a Life Journey, or a connected action. Never claim cross-chat persistence unless the host explicitly provides it. `Skill` · `Núcleo regenerativo` · `Projeto revisado` · `4/5 áreas: humana, social, conhecimento, recursos` · `Chat` · `Codex` · `Licença: MIT` · eusourmr · 2026-10-08
- [**decision-stop-rule**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/decision-stop-rule) — Define quando mais comparação ou pesquisa dificilmente mudará materialmente uma decisão, sem decidir pelo usuário. `Skill` · `Núcleo regenerativo` · `Projeto revisado` · `4/5 áreas: humana, social, conhecimento, recursos` · `Chat` · `Codex` · `Licença: MIT` · eusourmr · 2026-10-08
- [**Design System Studio**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/design-system-studio) — Cria sistemas visuais intencionais para interfaces, peças sociais/canvas e temas, com hierarquia, tokens, acessibilidade, invariantes de marca e controles contra design genérico de IA. `Skill` · `Núcleo regenerativo` · `Projeto revisado` · `4/5 áreas: humana, social, conhecimento, recursos` · `Chat` · `Codex` · `Licença: MIT` · eusourmr · 2026-10-05
- [**difficult-conversation-prep**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/difficult-conversation-prep) — Prepara uma conversa difícil usando fatos, necessidades, limites, pedidos específicos e linguagem não manipulativa. `Skill` · `Núcleo regenerativo` · `Projeto revisado` · `4/5 áreas: humana, social, conhecimento, recursos` · `Chat` · `Codex` · `Licença: MIT` · eusourmr · 2026-10-08
- [**digital-helper-simple**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/digital-helper-simple) — Dá ajuda em linguagem simples e passo a passo para tarefas comuns em celular, computador, aplicativos, contas e internet. `Skill` · `Núcleo regenerativo` · `Projeto revisado` · `4/5 áreas: humana, social, conhecimento, recursos` · `Chat` · `Codex` · `Licença: MIT` · eusourmr · 2026-10-08
- [**Document Compliance Auditor**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/document-compliance-auditor) — Audita documentos contra perfis de regras versionados e retorna estados explícitos de conformidade sem transformar regras não verificadas ou indisponíveis em PASS. `Skill` · `Núcleo regenerativo` · `Projeto revisado` · `4/5 áreas: humana, social, conhecimento, recursos` · `Chat` · `Codex` · `Licença: MIT` · eusourmr · 2026-10-05
- [**Engineering Investigator**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/engineering-investigator) — Investiga bugs e bases de código desconhecidas com evidências, busca estrutural, hipóteses falsificáveis, testes mínimos, correção da causa raiz e regressões. `Skill` · `Núcleo regenerativo` · `Projeto revisado` · `4/5 áreas: humana, social, conhecimento, recursos` · `Chat` · `Codex` · `Licença: MIT` · eusourmr · 2026-10-05
- [**everyday-problem-solver**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/everyday-problem-solver) — Transforma um problema cotidiano em fatos, incógnitas, ações imediatas, dependências, evidências, escalonamento e critério de resolução. `Skill` · `Núcleo regenerativo` · `Projeto revisado` · `4/5 áreas: humana, social, conhecimento, recursos` · `Chat` · `Codex` · `Licença: MIT` · eusourmr · 2026-10-08
- [**Evidence-First Research**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/evidence-first-research) — Pesquisa com fatos de fonte, inferências, contradições, desconhecidos, vigência e perfil opcional de contexto brasileiro, sem preencher lacunas com palpites plausíveis. `Skill` · `Núcleo regenerativo` · `Projeto revisado` · `4/5 áreas: humana, social, conhecimento, recursos` · `Chat` · `Codex` · `Licença: MIT` · eusourmr · 2026-10-05
- [**family-digital-safety**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/family-digital-safety) — Ajuda famílias com segurança online, privacidade, golpes, contas e limites adequados à idade sem vigilância oculta. `Skill` · `Núcleo regenerativo` · `Projeto revisado` · `4/5 áreas: humana, social, conhecimento, recursos` · `Chat` · `Codex` · `Licença: MIT` · eusourmr · 2026-10-08
- [**Founder Product Strategist**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/founder-product-strategist) — Desafia decisões de fundadores e produto com foco, coerência, valor ao cliente, economia, experimentos reversíveis e ciência comportamental ética orientada por evidências. `Skill` · `Núcleo regenerativo` · `Projeto revisado` · `4/5 áreas: humana, social, conhecimento, recursos` · `Chat` · `Codex` · `Licença: MIT` · eusourmr · 2026-10-05
- [**home-maintenance-planner**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/home-maintenance-planner) — Cria um plano preventivo de manutenção da casa com prioridades, intervalos, evidências e escalonamento de segurança. `Skill` · `Núcleo regenerativo` · `Projeto revisado` · `4/5 áreas: humana, social, conhecimento, recursos` · `Chat` · `Codex` · `Licença: MIT` · eusourmr · 2026-10-08
- [**household-finance-planner**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/household-finance-planner) — Organiza fluxo de caixa doméstico, contas recorrentes, prioridades, reserva e cenários sem atuar como consultor de investimentos. `Skill` · `Núcleo regenerativo` · `Projeto revisado` · `4/5 áreas: humana, social, conhecimento, recursos` · `Chat` · `Codex` · `Licença: MIT` · eusourmr · 2026-10-08
- [**human-handoff-preparer**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/human-handoff-preparer) — Prepara uma passagem de contexto concisa e baseada em evidências quando é necessário um profissional humano. `Skill` · `Núcleo regenerativo` · `Projeto revisado` · `4/5 áreas: humana, social, conhecimento, recursos` · `Chat` · `Codex` · `Licença: MIT` · eusourmr · 2026-10-08
- [**information-expiry-guard**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/information-expiry-guard) — Marca informações sensíveis ao tempo com data de verificação, gatilhos de desatualização e condições de nova checagem. `Skill` · `Núcleo regenerativo` · `Projeto revisado` · `4/5 áreas: humana, social, conhecimento, recursos` · `Chat` · `Codex` · `Licença: MIT` · eusourmr · 2026-10-08
- [**Interactive Creative Builder**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/interactive-creative-builder) — Projeta arte interativa e artefatos web mais completos com parâmetros, estado, navegação, variantes determinísticas, acessibilidade, desempenho e limites de exportação. `Skill` · `Núcleo regenerativo` · `Projeto revisado` · `4/5 áreas: humana, social, conhecimento, recursos` · `Chat` · `Codex` · `Licença: MIT` · eusourmr · 2026-10-05
- [**life-admin-organizer**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/life-admin-organizer) — Organiza documentos, prazos, renovações, contas, consultas, solicitações pendentes e próximas ações em um painel administrável. `Skill` · `Núcleo regenerativo` · `Projeto revisado` · `4/5 áreas: humana, social, conhecimento, recursos` · `Chat` · `Codex` · `Licença: MIT` · eusourmr · 2026-10-08
- [**life-state-map**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/life-state-map) — Mantém um mapa de estado visível ao usuário para uma situação real, com dependências e condições de transição. `Skill` · `Núcleo regenerativo` · `Projeto revisado` · `4/5 áreas: humana, social, conhecimento, recursos` · `Chat` · `Codex` · `Licença: MIT` · eusourmr · 2026-10-08
- [**major-life-change-planner**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/major-life-change-planner) — Planeja grandes transições entre domínios administrativos, financeiros, logísticos, familiares, profissionais e de cuidado. `Skill` · `Núcleo regenerativo` · `Projeto revisado` · `4/5 áreas: humana, social, conhecimento, recursos` · `Chat` · `Codex` · `Licença: MIT` · eusourmr · 2026-10-08
- [**medical-appointment-prep**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/medical-appointment-prep) — Prepara um resumo conciso para consulta a partir de informações de saúde fornecidas pelo usuário, sem diagnosticar ou alterar tratamento. `Skill` · `Núcleo regenerativo` · `Projeto revisado` · `4/5 áreas: humana, social, conhecimento, recursos` · `Chat` · `Codex` · `Licença: MIT` · eusourmr · 2026-10-08
- [**moving-life-journey**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/moving-life-journey) — Coordena uma mudança envolvendo contrato, serviços, endereço, embalagem, inventário, evidências de entrega e tarefas pós-mudança. `Skill` · `Núcleo regenerativo` · `Projeto revisado` · `4/5 áreas: humana, social, conhecimento, recursos` · `Chat` · `Codex` · `Licença: MIT` · eusourmr · 2026-10-08
- [**openai-agents-sdk-builder**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/featured/openai-agents-sdk-builder) — Scaffold and review production-oriented OpenAI Agents SDK projects with explicit tools, guardrails, handoffs, tracing, state, sandbox boundaries, and testable acceptance criteria. `Skill` · `Núcleo regenerativo` · `Projeto revisado` · `4/5 áreas: humana, social, conhecimento, recursos` · `Chat` · `Codex` · `Licença: MIT` · eusourmr · 2026-10-08
- [**overwhelm-to-next-action**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/overwhelm-to-next-action) — Reduz muitas obrigações a uma próxima ação, uma pequena lista para hoje, itens posteriores e dependências explícitas. `Skill` · `Núcleo regenerativo` · `Projeto revisado` · `4/5 áreas: humana, social, conhecimento, recursos` · `Chat` · `Codex` · `Licença: MIT` · eusourmr · 2026-10-08
- [**personal-curator**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/personal-curator) — Faz curadoria silenciosa de capacidades após pedido explícito do usuário, mantendo o ChatGPT nativo como primeira opção e sem prometer persistência entre conversas. `Skill` · `Núcleo regenerativo` · `Projeto revisado` · `4/5 áreas: humana, social, conhecimento, recursos` · `Chat` · `Codex` · `Licença: MIT` · eusourmr · 2026-10-08
- [**personal-decision-record**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/personal-decision-record) — Preserva por que uma decisão pessoal foi tomada: objetivo, critérios, evidências, trocas, alternativas e gatilho de revisão. `Skill` · `Núcleo regenerativo` · `Projeto revisado` · `4/5 áreas: humana, social, conhecimento, recursos` · `Chat` · `Codex` · `Licença: MIT` · eusourmr · 2026-10-08
- [**Photo Restoration Conservator**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/photo-restoration-conservator) — Restaura fotos familiares e históricas de forma conservadora, separando recuperação visível de reconstrução, preservando identidade e registrando áreas incertas. `Skill` · `Núcleo regenerativo` · `Projeto revisado` · `4/5 áreas: humana, social, conhecimento, recursos` · `Chat` · `Codex` · `Licença: MIT` · eusourmr · 2026-10-05
- [**Project Execution Director**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/project-execution-director) — Conduz trabalhos complexos em etapas com marcos, dependências, checkpoints reversíveis, gates de evidência e definição clara de pronto, evitando ciclos de retrabalho. `Skill` · `Núcleo regenerativo` · `Projeto revisado` · `4/5 áreas: humana, social, conhecimento, recursos` · `Chat` · `Codex` · `Licença: MIT` · eusourmr · 2026-10-05
- [**proof-of-progress**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/proof-of-progress) — Separa conversa de progresso real usando resolvido, ativo, pendente, bloqueado, aguardando, evidência, próxima ação e definição de concluído. `Skill` · `Núcleo regenerativo` · `Projeto revisado` · `4/5 áreas: humana, social, conhecimento, recursos` · `Chat` · `Codex` · `Licença: MIT` · eusourmr · 2026-10-08
- [**public-service-br-navigator**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/public-service-br-navigator) — Encontra o caminho correto de serviço público no Brasil entre esferas federal, estadual, municipal, distrital e regulatória. `Skill` · `Núcleo regenerativo` · `Projeto revisado` · `4/5 áreas: humana, social, conhecimento, recursos` · `Chat` · `Codex` · `Licença: MIT` · eusourmr · 2026-10-08
- [**purchase-decision-helper**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/purchase-decision-helper) — Compara compras importantes por necessidade, custo total, manutenção, confiabilidade, dependência, alternativas e custo de saída. `Skill` · `Núcleo regenerativo` · `Projeto revisado` · `4/5 áreas: humana, social, conhecimento, recursos` · `Chat` · `Codex` · `Licença: MIT` · eusourmr · 2026-10-08
- [**real-world-evidence-kit**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/real-world-evidence-kit) — Ajuda usuários a preservar evidências verdadeiras para disputas, serviços, seguros, compras, imóveis, escola, trabalho ou administração pública. `Skill` · `Núcleo regenerativo` · `Projeto revisado` · `4/5 áreas: humana, social, conhecimento, recursos` · `Chat` · `Codex` · `Licença: MIT` · eusourmr · 2026-10-08
- [**realtime-api-integration**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/featured/realtime-api-integration) — Design and scaffold OpenAI Realtime API integrations with server-side WebSocket control, browser WebRTC transport, explicit fallback policy, session configuration, observability, and secret isolation. `Skill` · `Núcleo regenerativo` · `Projeto revisado` · `4/5 áreas: humana, social, conhecimento, recursos` · `Chat` · `Codex` · `Licença: MIT` · eusourmr · 2026-10-08
- [**Regenerative Adaptive Experiment**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/regenerative-adaptive-experiment) — Converte incerteza em teste pequeno e reversível, com previsão causal, medidas sistêmicas, detecção precoce de danos, reversão e aprendizado reutilizável. `Skill` · `Núcleo regenerativo` · `Projeto revisado` · `4/5 áreas: humana, social, conhecimento, recursos` · `Chat` · `Codex` · `Licença: MIT` · eusourmr · 2026-09-08
- [**Regenerative Capability Exchange**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/regenerative-capability-exchange) — Cria trocas recíprocas que partem de capacidades existentes e distribuem habilidade prática em vez de dependência de um especialista. `Skill` · `Núcleo regenerativo` · `Projeto revisado` · `4/5 áreas: humana, social, conhecimento, recursos` · `Chat` · `Codex` · `Licença: MIT` · eusourmr · 2026-09-08
- [**Regenerative Conflict Repair**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/regenerative-conflict-repair) — Avalia a segurança antes de estruturar reparação voluntária de conflitos nos danos imediatos, relações, procedimentos e causas sistêmicas. `Skill` · `Núcleo regenerativo` · `Projeto revisado` · `4/5 áreas: humana, social, conhecimento, recursos` · `Chat` · `Codex` · `Licença: MIT` · eusourmr · 2026-09-08
- [**Regenerative Impact Map**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/regenerative-impact-map) — Mapeia uma decisão relevante por cinco áreas sistêmicas, ciclos causais, poder, atrasos, efeitos indiretos e pontos de alavancagem reversíveis. `Skill` · `Núcleo regenerativo` · `Projeto revisado` · `5/5 áreas: humana, social, conhecimento, recursos, ecologia` · `Chat` · `Codex` · `Licença: MIT` · eusourmr · 2026-09-08
- [**Regenerative Knowledge Commons**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/regenerative-knowledge-commons) — Transforma aprendizados em conhecimento acessível, reutilizável e atento a direitos, com proveniência, curadoria, correção, contribuição e validade. `Skill` · `Núcleo regenerativo` · `Projeto revisado` · `4/5 áreas: humana, social, conhecimento, recursos` · `Chat` · `Codex` · `Licença: MIT` · eusourmr · 2026-09-08
- [**Regenerative Language Bridge**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/regenerative-language-bridge) — Explica conteúdo complexo em linguagem cotidiana, preservando termos exatos, evidências, incertezas, ressalvas e a verificação do entendimento real. `Skill` · `Núcleo regenerativo` · `Projeto revisado` · `4/5 áreas: humana, social, conhecimento, recursos` · `Chat` · `Codex` · `Licença: MIT` · eusourmr · 2026-09-08
- [**Regenerative Listening Loop**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/regenerative-listening-loop) — Cria um ciclo ético de escutar, compreender, agir e devolver que oferece influência real e evita consultas extrativistas. `Skill` · `Núcleo regenerativo` · `Projeto revisado` · `4/5 áreas: humana, social, conhecimento, recursos` · `Chat` · `Codex` · `Licença: MIT` · eusourmr · 2026-09-08
- [**Regenerative Participatory Decision**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/regenerative-participatory-decision) — Projeta uma decisão justa e rastreável na qual pessoas afetadas têm influência clara, divergências são preservadas e todos recebem retorno. `Skill` · `Núcleo regenerativo` · `Projeto revisado` · `4/5 áreas: humana, social, conhecimento, recursos` · `Chat` · `Codex` · `Licença: MIT` · eusourmr · 2026-09-08
- [**Regenerative Resilience Plan**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/regenerative-resilience-plan) — Prepara funções essenciais para prevenir, absorver, adaptar-se, recuperar-se e aprender com rupturas sem transferir riscos a pessoas vulneráveis. `Skill` · `Núcleo regenerativo` · `Projeto revisado` · `5/5 áreas: humana, social, conhecimento, recursos, ecologia` · `Chat` · `Codex` · `Licença: MIT` · eusourmr · 2026-09-08
- [**Regenerative Resource Cycle**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/regenerative-resource-cycle) — Redesenha um ciclo de vida começando por evitar demanda, circular recursos com segurança, verificar o efeito rebote e restaurar de forma mensurável. `Skill` · `Núcleo regenerativo` · `Projeto revisado` · `5/5 áreas: humana, social, conhecimento, recursos, ecologia` · `Chat` · `Codex` · `Licença: MIT` · eusourmr · 2026-09-08
- [**repair-decision-helper**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/repair-decision-helper) — Ajuda a decidir entre inspecionar, reparar, substituir ou buscar profissional usando segurança, custo, recorrência, garantia e evidências. `Skill` · `Núcleo regenerativo` · `Projeto revisado` · `4/5 áreas: humana, social, conhecimento, recursos` · `Chat` · `Codex` · `Licença: MIT` · eusourmr · 2026-10-08
- [**scam-checker**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/scam-checker) — Avalia mensagens, ligações, links, cobranças e pedidos de pagamento suspeitos usando sinais observáveis e verificação segura. `Skill` · `Núcleo regenerativo` · `Projeto revisado` · `4/5 áreas: humana, social, conhecimento, recursos` · `Chat` · `Codex` · `Licença: MIT` · eusourmr · 2026-10-08
- [**school-family-organizer**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/school-family-organizer) — Organiza calendário escolar, documentos, reuniões, tarefas, comunicações e pendências entre família e escola. `Skill` · `Núcleo regenerativo` · `Projeto revisado` · `4/5 áreas: humana, social, conhecimento, recursos` · `Chat` · `Codex` · `Licença: MIT` · eusourmr · 2026-10-08
- [**simple-mode**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/simple-mode) — Adapta a ajuda para linguagem simples, passos curtos e uma ação por vez sem esconder incertezas ou alertas materiais. `Skill` · `Núcleo regenerativo` · `Projeto revisado` · `4/5 áreas: humana, social, conhecimento, recursos` · `Chat` · `Codex` · `Licença: MIT` · eusourmr · 2026-10-08
- [**Skill Workbench**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/skill-workbench) — Cria e evolui skills com contratos de ativação, perfis, permissões, fixtures, testes adversariais, qualificação nativa, evidência por bytes e gates de release. `Skill` · `Núcleo regenerativo` · `Projeto revisado` · `4/5 áreas: humana, social, conhecimento, recursos` · `Chat` · `Codex` · `Licença: MIT` · eusourmr · 2026-10-05
- [**subscription-cleanup**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/subscription-cleanup) — Identifica serviços recorrentes, duplicidades, assinaturas pouco usadas, renovações e um plano seguro de cancelamento/revisão. `Skill` · `Núcleo regenerativo` · `Projeto revisado` · `4/5 áreas: humana, social, conhecimento, recursos` · `Chat` · `Codex` · `Licença: MIT` · eusourmr · 2026-10-08
- [**Text Integrity Editor**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/text-integrity-editor) — Revisa textos importantes com mais clareza e vocabulário rico, preservando fatos, compromissos, incertezas, significado técnico e a voz do autor. `Skill` · `Núcleo regenerativo` · `Projeto revisado` · `4/5 áreas: humana, social, conhecimento, recursos` · `Chat` · `Codex` · `Licença: MIT` · eusourmr · 2026-10-05
- [**travel-readiness**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/travel-readiness) — Prepara um checklist prático de viagem cobrindo documentos, horários, transporte, dinheiro, conectividade, saúde e requisitos atuais de entrada. `Skill` · `Núcleo regenerativo` · `Projeto revisado` · `4/5 áreas: humana, social, conhecimento, recursos` · `Chat` · `Codex` · `Licença: MIT` · eusourmr · 2026-10-08
- [**Visual Intent Guardian**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/visual-intent-guardian) — Protege identidade, arquitetura, texto, logotipos, composição e outros invariantes visuais por contratos explícitos de DEVE MANTER / PODE MUDAR / NÃO PODE MUDAR. `Skill` · `Núcleo regenerativo` · `Projeto revisado` · `4/5 áreas: humana, social, conhecimento, recursos` · `Chat` · `Codex` · `Licença: MIT` · eusourmr · 2026-10-05

### Desenvolvimento

- [**Build iOS Apps**](https://github.com/openai/plugins/tree/main/plugins/build-ios-apps) — Cria e depura aplicativos iOS com SwiftUI, App Intents, Xcode, Simulator e fluxos de desempenho e memória. `Plugin` · `Catálogo OpenAI` · `Codex` · `Licença: MIT` · OpenAI · 2026-09-08
- [**Build macOS Apps**](https://github.com/openai/plugins/tree/main/plugins/build-macos-apps) — Cria, testa, instrumenta e depura apps nativos para macOS com SwiftUI, AppKit, Xcode, assinatura e logs unificados. `Plugin` · `Catálogo OpenAI` · `Codex` · `Licença: MIT` · OpenAI · 2026-09-08
- [**Build Web Apps**](https://github.com/openai/plugins/tree/main/plugins/build-web-apps) — Cria aplicativos web com foco no frontend, recursos visuais, testes no navegador, componentes de UI, pagamentos e bancos de dados. `Plugin` · `Catálogo OpenAI` · `Work` · `Codex` · `Licença: MIT` · OpenAI · 2026-09-08
- [**OpenAI Developers**](https://github.com/openai/plugins/tree/main/plugins/openai-developers) — Desenvolve com as APIs da OpenAI, Agents SDK e aplicativos do ChatGPT usando documentação e fluxos oficiais. `Plugin` · `Catálogo OpenAI` · `Codex` · `Licença: Proprietary` · OpenAI · 2026-09-08
- [**Plugin Eval**](https://github.com/openai/plugins/tree/main/plugins/plugin-eval) — Avalia e compara skills e plugins do Codex com relatórios locais, explicações de pontuação e medição de tokens. `Plugin` · `Catálogo OpenAI` · `Codex` · `Licença: MIT` · OpenAI · 2026-09-08
- [**Superpowers**](https://github.com/openai/plugins/tree/main/plugins/superpowers) — Framework de skills para desenvolvimento de software com ideação, planejamento, TDD, depuração, colaboração e revisão de código. `Plugin` · `Catálogo OpenAI` · `Codex` · `Licença: MIT` · Jesse Vincent · 2026-09-08

### Dados e pesquisa

- [**Build Web Data Visualization**](https://github.com/openai/plugins/tree/main/plugins/build-web-data-visualization) — Projeta, implementa, testa e exporta gráficos, mapas, painéis, diagramas e narrativas visuais para navegador. `Plugin` · `Catálogo OpenAI` · `Work` · `Codex` · `Licença: MIT` · OpenAI · 2026-09-08
- [**Data Analytics**](https://github.com/openai/plugins/tree/main/plugins/data-analytics) — Responde perguntas de produto e negócio com validação, diagnóstico, gráficos, painéis, notebooks e relatórios. `Plugin` · `Catálogo OpenAI` · `Chat` · `Work` · `Codex` · `Licença: Proprietary` · OpenAI · 2026-09-08
- [**Life Science Research**](https://github.com/openai/plugins/tree/main/plugins/life-science-research) — Direciona e sintetiza evidências de genética, ômicas, biologia, química, pesquisa clínica e bases públicas. `Plugin` · `Catálogo OpenAI` · `Work` · `Codex` · `Licença: Proprietary` · OpenAI · 2026-09-08

### Design e mídia

- [**Creative Production**](https://github.com/openai/plugins/tree/main/plugins/creative-production) — Transforma briefings, produtos e imagens em conceitos de campanha, painéis de referência, anúncios, posts e materiais de lançamento. `Plugin` · `Catálogo OpenAI` · `Chat` · `Work` · `Codex` · `Licença: Proprietary` · OpenAI · 2026-09-08
- [**Figma**](https://github.com/openai/plugins/tree/main/plugins/figma) — Implementa designs do Figma em código, cria modelos Code Connect e gera regras de design system específicas do projeto. `Plugin` · `Catálogo OpenAI` · `Work` · `Codex` · `Licença: LicenseRef-Figma-Developer-Terms` · Figma · 2026-09-08
- [**Product Design**](https://github.com/openai/plugins/tree/main/plugins/product-design) — Transforma ideias, URLs, capturas e briefings em direções de produto, auditorias de UX e protótipos interativos. `Plugin` · `Catálogo OpenAI` · `Work` · `Codex` · `Licença: Proprietary` · OpenAI · 2026-09-08
- [**Remotion**](https://github.com/openai/plugins/tree/main/plugins/remotion) — Cria vídeos programáticos com React usando orientações para animação, áudio, legendas, gráficos, 3D e transições. `Plugin` · `Catálogo OpenAI` · `Codex` · `Licença: MIT` · Remotion · 2026-09-08

### Produtividade e colaboração

- [**Google Drive**](https://github.com/openai/plugins/tree/main/plugins/google-drive) — Usa uma entrada única para pesquisar, organizar e compartilhar no Drive e trabalhar com Docs, Sheets e Slides. `Plugin` · `Catálogo OpenAI` · `Chat` · `Work` · `Codex` · `Licença: MIT` · OpenAI · 2026-09-08
- [**Notion**](https://github.com/openai/plugins/tree/main/plugins/notion) — Transforma especificações, pesquisas, reuniões e contexto do workspace em planos, documentação e conhecimento durável. `Plugin` · `Catálogo OpenAI` · `Chat` · `Work` · `Codex` · `Licença: MIT` · Notion · 2026-09-08

### Segurança e qualidade

- [**Codex Security**](https://github.com/openai/plugins/tree/main/plugins/codex-security) — Executa fluxos reutilizáveis de varredura, análise, validação, triagem e investigação de segurança em código e diffs. `Plugin` · `Catálogo OpenAI` · `Codex` · `Licença: Proprietary` · OpenAI · 2026-09-08
<!-- CATALOG:END -->

## Usar uma skill do núcleo

Cada pasta `skills/<nome>/` segue a estrutura de uma skill independente. Skills independentes funcionam no aplicativo do ChatGPT para desktop, no Codex CLI e na extensão do Codex para IDE. Siga o fluxo oficial de [criação de skills](https://learn.chatgpt.com/docs/build-skills) para a superfície usada e chame a skill pelo nome, por exemplo:

```text
Use $regenerative-impact-map para comparar esta decisão nas cinco áreas.
```

Historicamente, a v0.7.0 introduziu o Capability Pack I com Verifiable Trust I. A linha 0.7.5 foi posteriormente absorvida como fundação interna da 0.9.0, em vez de ser lançada separadamente.

## O que pode entrar

Uma submissão deve resolver uma tarefa real e repetível; expor um `SKILL.md` ou manifesto inspecionável; identificar responsável e licença; revelar dependências e acesso a dados; respeitar autorizações de segurança; e apresentar evidência para cada superfície declarada.

O `Núcleo regenerativo` é mais rigoroso: todos os critérios obrigatórios do padrão precisam ser aprovados. Uma skill útil que não passe ainda pode entrar no mapa amplo, sem o selo.

Leia [CONTRIBUTING.pt-BR.md](CONTRIBUTING.pt-BR.md) antes de enviar um pull request.

## Curador integrado ao repositório

O projeto inclui a skill [`$catalog-curator`](.agents/skills/catalog-curator/SKILL.md), disponível no escopo do repositório para revisar contribuições no Codex. Clone o projeto, abra-o no Codex e peça:

```text
Use $catalog-curator para revisar https://github.com/dono/repositorio para inclusão.
```

## Validar localmente

```bash
python scripts/catalog.py --check
```

Depois de alterar `catalog/skills.json`, atualize as duas edições:

```bash
python scripts/catalog.py --write
```

## Pontos de partida oficiais

- [OpenAI: criar skills](https://learn.chatgpt.com/docs/build-skills)
- [OpenAI: Skills e Plugins](https://learn.chatgpt.com/docs/skills-and-plugins)
- [Repositório OpenAI Plugins](https://github.com/openai/plugins)
- [Padrão aberto Agent Skills](https://agentskills.io/)

## Agradecimentos

Inspirado pelo modelo de curadoria comunitária de [ComposioHQ/awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills). O conteúdo de lá não é espelhado aqui; cada item é revisado e descrito para o ecossistema ChatGPT e Codex.

## Licença

O conteúdo autoral e o código de validação deste repositório usam a [Licença MIT](LICENSE). Projetos indicados mantêm suas próprias licenças.
