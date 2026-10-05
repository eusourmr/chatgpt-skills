# ChatGPT Skills

[![Awesome](https://awesome.re/badge-flat2.svg)](https://awesome.re)
[![Validar catálogo](https://github.com/eusourmr/chatgpt-skills/actions/workflows/validate.yml/badge.svg)](https://github.com/eusourmr/chatgpt-skills/actions/workflows/validate.yml)
[![npm](https://img.shields.io/npm/v/chatgpt-skills.svg)](https://www.npmjs.com/package/chatgpt-skills)
[![Licença](https://img.shields.io/badge/licen%C3%A7a-MIT-blue.svg)](LICENSE)

Um diretório selecionado e conferido de skills reutilizáveis e plugins orientados por skills para ChatGPT e Codex, com um núcleo regenerativo auditável.

[English](README.md) · [Primeiros Passos](docs/GETTING_STARTED.pt-BR.md)

> Projeto comunitário independente. Não possui afiliação nem endosso da OpenAI. ChatGPT e Codex são marcas da OpenAI.

## 🛡️ Release atual

**Release atual do produto:** **CS Connect 0.9.0 — First-Party Skills Platform**.

O CS Connect mantém tarefas simples no próprio ChatGPT, incorpora a fundação Verifiable Trust II / Skill Containers e reúne 15 workflows first-party próprios para escrita, pesquisa, contexto brasileiro, revisão acadêmica/documental, design, engenharia, preservação visual, continuidade de projetos e estratégia de produto.

O candidato de produção qualificado é o **R2**, ligado ao ZIP exato com SHA-256:

`3379f932301b707fcf935f8f4f6f45bdea10d3e7277daced2849f93c3f824cce`

A qualificação nativa foi concluída com a matriz congelada e as regressões específicas do R2. Isso comprova os cenários registrados nesses bytes exatos; não é promessa de segurança absoluta nem de “zero alucinação”.

A antiga linha 0.7.5 virou **fundação interna** da 0.9 e não será lançada separadamente. O escopo que antes seria 0.8 foi absorvido pela 0.9.

> **Sem evidência → não inventar. Sem permissão → não se autorizar sozinho. Sem caminho autorizado → parar.**

Estado do diretório público: o draft 0.9.0 já foi criado e está preparado para o fluxo de revisão da OpenAI. Só chamaremos de “publicado no diretório” depois da aprovação e do clique explícito em **Publish plugin**.

Leia: [Primeiros Passos](docs/GETTING_STARTED.pt-BR.md) · [Skill Containers](docs/SKILL_CONTAINERS.md) · [Publicação pública](docs/PUBLIC_PLUGIN_SUBMISSION.md) · [Manutenção](docs/PLUGIN_MAINTENANCE.pt-BR.md)

## 🚀 Comece em 1 minuto

Para a maioria das pessoas, o caminho pretendido é:

1. Abra **Plugins** no ChatGPT ou no Codex.
2. Procure por **CS Connect**.
3. Clique em **Instalar plugin**.
4. Em uma conversa, escreva: `Use CS Connect para...`

Esse caminho ficará disponível assim que a OpenAI aprovar e o plugin for publicado. Enquanto estiver em revisão, continuam disponíveis os caminhos por GitHub/workspace e ZIP para testes e administração.

O guia começa pela instalação mais simples e só depois mostra opções técnicas:

**[Primeiros Passos →](docs/GETTING_STARTED.pt-BR.md)**

Linhas de versão independentes:

- plugin CS Connect: **0.9.0 candidato de produção qualificado / caminho de revisão pública**
- 0.7.5: **fundação interna de confiança/runtime absorvida**
- 0.8: **absorvida pela 0.9**
- CLI/npm `chatgpt-skills`: **0.4.0**
- próxima linha: **0.10 — Ecosystem Intelligence & Community Scale**

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
- [**Context Continuity Manager**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/context-continuity-manager) — Cria pacotes duráveis de continuidade para projetos longos, preservando decisões, invariantes, bloqueios, evidências e próximos passos sem fingir controlar contexto ou memória ocultos. `Skill` · `Núcleo regenerativo` · `Projeto revisado` · `4/5 áreas: humana, social, conhecimento, recursos` · `Chat` · `Codex` · `Licença: MIT` · eusourmr · 2026-10-05
- [**Design System Studio**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/design-system-studio) — Cria sistemas visuais intencionais para interfaces, peças sociais/canvas e temas, com hierarquia, tokens, acessibilidade, invariantes de marca e controles contra design genérico de IA. `Skill` · `Núcleo regenerativo` · `Projeto revisado` · `4/5 áreas: humana, social, conhecimento, recursos` · `Chat` · `Codex` · `Licença: MIT` · eusourmr · 2026-10-05
- [**Document Compliance Auditor**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/document-compliance-auditor) — Audita documentos contra perfis de regras versionados e retorna estados explícitos de conformidade sem transformar regras não verificadas ou indisponíveis em PASS. `Skill` · `Núcleo regenerativo` · `Projeto revisado` · `4/5 áreas: humana, social, conhecimento, recursos` · `Chat` · `Codex` · `Licença: MIT` · eusourmr · 2026-10-05
- [**Engineering Investigator**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/engineering-investigator) — Investiga bugs e bases de código desconhecidas com evidências, busca estrutural, hipóteses falsificáveis, testes mínimos, correção da causa raiz e regressões. `Skill` · `Núcleo regenerativo` · `Projeto revisado` · `4/5 áreas: humana, social, conhecimento, recursos` · `Chat` · `Codex` · `Licença: MIT` · eusourmr · 2026-10-05
- [**Evidence-First Research**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/evidence-first-research) — Pesquisa com fatos de fonte, inferências, contradições, desconhecidos, vigência e perfil opcional de contexto brasileiro, sem preencher lacunas com palpites plausíveis. `Skill` · `Núcleo regenerativo` · `Projeto revisado` · `4/5 áreas: humana, social, conhecimento, recursos` · `Chat` · `Codex` · `Licença: MIT` · eusourmr · 2026-10-05
- [**Founder Product Strategist**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/founder-product-strategist) — Desafia decisões de fundadores e produto com foco, coerência, valor ao cliente, economia, experimentos reversíveis e ciência comportamental ética orientada por evidências. `Skill` · `Núcleo regenerativo` · `Projeto revisado` · `4/5 áreas: humana, social, conhecimento, recursos` · `Chat` · `Codex` · `Licença: MIT` · eusourmr · 2026-10-05
- [**Interactive Creative Builder**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/interactive-creative-builder) — Projeta arte interativa e artefatos web mais completos com parâmetros, estado, navegação, variantes determinísticas, acessibilidade, desempenho e limites de exportação. `Skill` · `Núcleo regenerativo` · `Projeto revisado` · `4/5 áreas: humana, social, conhecimento, recursos` · `Chat` · `Codex` · `Licença: MIT` · eusourmr · 2026-10-05
- [**Photo Restoration Conservator**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/photo-restoration-conservator) — Restaura fotos familiares e históricas de forma conservadora, separando recuperação visível de reconstrução, preservando identidade e registrando áreas incertas. `Skill` · `Núcleo regenerativo` · `Projeto revisado` · `4/5 áreas: humana, social, conhecimento, recursos` · `Chat` · `Codex` · `Licença: MIT` · eusourmr · 2026-10-05
- [**Project Execution Director**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/project-execution-director) — Conduz trabalhos complexos em etapas com marcos, dependências, checkpoints reversíveis, gates de evidência e definição clara de pronto, evitando ciclos de retrabalho. `Skill` · `Núcleo regenerativo` · `Projeto revisado` · `4/5 áreas: humana, social, conhecimento, recursos` · `Chat` · `Codex` · `Licença: MIT` · eusourmr · 2026-10-05
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
- [**Skill Workbench**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/skill-workbench) — Cria e evolui skills com contratos de ativação, perfis, permissões, fixtures, testes adversariais, qualificação nativa, evidência por bytes e gates de release. `Skill` · `Núcleo regenerativo` · `Projeto revisado` · `4/5 áreas: humana, social, conhecimento, recursos` · `Chat` · `Codex` · `Licença: MIT` · eusourmr · 2026-10-05
- [**Text Integrity Editor**](https://github.com/eusourmr/chatgpt-skills/tree/main/skills/text-integrity-editor) — Revisa textos importantes com mais clareza e vocabulário rico, preservando fatos, compromissos, incertezas, significado técnico e a voz do autor. `Skill` · `Núcleo regenerativo` · `Projeto revisado` · `4/5 áreas: humana, social, conhecimento, recursos` · `Chat` · `Codex` · `Licença: MIT` · eusourmr · 2026-10-05
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

Na v0.7.0 estável, o CS Navigator distribui o Capability Pack I como plugin e adiciona Verifiable Trust I. A linha 0.7.5 permanece em qualificação até concluir seus gates nativos.

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
