# CS Navigator — Estado consolidado e passagem de continuidade

**Corte de revisão:** 06/11/2026 · **Projeto:** [eusourmr/chatgpt-skills](https://github.com/eusourmr/chatgpt-skills) · **Natureza:** relatório de continuidade baseado em source read-back, arquivos de qualificação, PRs mesclados, verificações CI e chamadas de ferramenta observadas. Não é certificado de disponibilidade pública.

> **Estado atual e conclusão:** a **Fase 2 está concluída no recorte de integração técnica privada em ChatGPT web**. O plugin **CS Navigator Labs Web 0.20.0-beta.4** expôs as seis skills e permitiu, na **mesma sessão revisora**, ler o `SKILL.md` da curadoria e executar o MCP `registry_status`. Não estão comprovados ativação universal entre chats, superioridade sobre ChatGPT nativo, execução automática de skills listadas no GitHub, aprovação pública no diretório ou qualificação das 48 skills em rascunho.

## 1. Mapa do produto: versões não intercambiáveis

| Componente | Versão / ID | Estado | Limite |
| --- | --- | --- | --- |
| CS Navigator — linha de produção GitHub | `0.17.0`, `plugins/cs-navigator/` | **Preservado**, sem modificação nesta campanha | Publicação no Diretório OpenAI **não comprovada** |
| CS Navigator Labs — laboratório original | `0.20.0-beta.3`, `plugins_6aedc9218d1c8191a5084bf09301973d` | Privado; 6 skills e app registrado **mais** `mcp.json` portátil | A ficha mostrou **Open in desktop app**; skill não exposta nas sessões testadas |
| **CS Navigator Labs Web** — referência técnica atual | **`0.20.0-beta.4`**, `plugins_6aee22530eb88191bed0e982d96d1218` | **Aceite host de integração APROVADO**; seis skills e Registry MCP em uma sessão | Beta privado, não publicação universal |
| CS Navigator Registry — app MCP independente | `asdk_app_6aee1bad0884819196a97a44393e1a53` | Conectado; quatro ferramentas somente leitura disponíveis | Metadados GitHub **não** executam `SKILL.md` remotamente |
| CS Registry — servidor HTTP | `https://chatgpt-skills.onrender.com/mcp`, servidor relata `0.17.0` | `initialize`, `tools/list` e `registry_status` testados em CI e no ChatGPT | Versão do servidor não é versão do plugin cliente |

**Links do ChatGPT:** [Labs Web privado](https://chatgpt.com/plugins/plugins_6aee22530eb88191bed0e982d96d1218) · [Labs original preservado](https://chatgpt.com/plugins/plugins_6aedc9218d1c8191a5084bf09301973d).

### Por que a variante web funcionou

A ficha do Labs original mostrava **Open in desktop app**, embora seis skills estivessem no pacote. Duas conversas consultaram o Registry mas não conseguiram ler a curadoria. Criou-se **um plugin privado separado** (Web beta.4) com as mesmas seis skills, **sem** `mcp.json` nem `.mcp.json`, com vínculo ao app Registry registrado (`.app.json`) e `onboardingSkill` explícito. Depois disso o leitor do host expôs as seis skills.

**Cuidado causal:** a experiência mudou **várias** coisas (identidade do plugin, configuração MCP e onboarding). O resultado prova que a **variante Web funciona** no ambiente testado; não prova isoladamente que remover `mcp.json` foi a causa única.

## 2. Prova principal — HOST-03R, reproduzida em 06/11/2026

O usuário trouxe saída de uma conversa nova com CS Navigator Labs Web afirmando leitura da skill e chamada real de `registry_status`. O revisor **não se limitou ao relato**: também chamou ferramentas nesta sessão e constatou:

| Critério | Evidência observável | Decisão |
| --- | --- | --- |
| Inventário de skills no host | `skills__list` retornou **41** skills no total, **6** do `cs-navigator-web-labs` | PASS |
| Skill do curador presente | URI retornada `skills://plugins/cs-navigator-web-labs/cs-navigator-labs` | PASS |
| Conteúdo efetivamente lido | `skills__read` de `skills://plugins/cs-navigator-web-labs/cs-navigator-labs/skill.md` | PASS |
| Versão declarada no conteúdo | `0.20.0-beta.4` | PASS |
| Tool MCP efetivamente chamada | `mcp__CS_Navigator_Registry__registry_status({})` | PASS |
| Resposta de Registry | `capability_count=61`, `published_at=2026-10-11`, `source_commit=development` | PASS |
| Fonte da versão salva | Plugin Creator leu o pacote de conta, com seis `SKILL.md`, vínculo `.app.json` e sem MCP portátil | PASS |

O **registro estruturado** é `trust/qualification/pilots/host-03r-web-skill-mcp-success-2026-11-06.json`. A evidência cobre **carregamento e invocação de ferramenta**, não a qualidade causal do roteamento automático em demandas reais.

## 3. Histórico de qualificação — o que já foi feito

| Piloto | Resultado / observação | Nível de prova |
| --- | --- | --- |
| UX-01 / UX-02 / UX-03 / UX-04 | UX fundamentada; pergunta trivial sem sobre-rotear; rejeição de estudo de usuários/WCAG inventado. UX-02 não é A/B controlado | Avaliação de resposta |
| ENG-01 / ENG-02 | Correção de corrida JavaScript em cenário sintético; testes reproduzidos; sem declaração de implantação no AP+ | Regressão sintética + revisão |
| TEXT-01 | Preservação de compromisso comercial; PR #119 | Avaliação de resposta |
| TEXT-02 / TEXT-02R | Falha inicial: versão adulterada antes do alerta; corrigido preflight de **mudança substancial** e reteste de resposta satisfatório; PR #120 | Falha documentada + remediação |
| ABNT-01 | Divergência `Silva 2021/2020`, Almeida ausente do trecho, sem inventar cláusula ABNT ou infração certificada; PR #121 | Avaliação de auditoria |
| ABNT-02 | Contestou dispositivo normativo não verificado e falsa certificação, com conferência limitada da NBR 6022:2018; PR #122 | Auditoria adversarial + fonte |
| ACADEMIC-01 | Resumo prospectivo sem inventar 120 participantes, melhoria de 38%, aprovação ética ou DOI; PR #123 | Integridade de redação |
| HOST-01B | Comparação **COM CS / SEM CS inconclusiva**: resposta controle também alegou skill do CS. ZIP Node sintético reexecutado **12/12**; PR #124 | Regressão técnica; **sem ganho causal atribuído** |
| MCP-01 | Falha: `registry_status` não exposto na primeira sessão; PR #126 | Incidente preservado |
| MCP-01R | App Registry registrado; chamadas reais a `registry_status`, `get_capability` e `search_capabilities`; PR #127 | MCP no host confirmado |
| HOST-02 | Labs original `beta.3`: 35 skills listadas; zero do Labs; leitura de curadoria indisponível; PR #128 | Falha real no host para versão testada |
| HOST-03 | Criada variante privada **Web beta.4** sem MCP portátil; seis skills preservadas, app registrado; PR #129 | Pacote/CI aprovados |
| **HOST-03R** | Web beta.4: **41 skills disponíveis (6 Labs)**, curadoria lida e `registry_status` chamado na mesma sessão | **Aceite técnico do host aprovado** |

**Histórico de PRs:** [#117](https://github.com/eusourmr/chatgpt-skills/pull/117) e [#118](https://github.com/eusourmr/chatgpt-skills/pull/118) (engenharia), [#119](https://github.com/eusourmr/chatgpt-skills/pull/119) a [#129](https://github.com/eusourmr/chatgpt-skills/pull/129) (integridade, ABNT, escrita, host, MCP, web). **Todos esses PRs estavam mesclados na revisão de 06/11/2026.**

Documentos de origem: `docs/CS_FIRST_BATTERY_QUALIFICATION_2026-11-06.md`, `docs/CS_HOST_01B_CONTROL_CONTAMINATION_2026-11-06.md`, `docs/CS_UNIVERSAL_BETA_PHASE2.md`, `docs/CS_HOST02_ACTIVATION_DIAGNOSIS_2026-11-06.md`, `docs/CS_HOST03_WEB_PLUGIN_VARIANT.md`.

## 4. Catálogo, números e proveniência

**Esses números têm denominadores diferentes e não devem ser misturados.**

- `PROGRESS.md`: **79 itens de qualidade editorial**: 12 oficiais de origem OpenAI, 15 verificados na curadoria do repositório, 4 da comunidade e **48 em rascunho**. O arquivo é gerado automaticamente e sua última atualização aparece em **11/10/2026**; não alterar métricas manualmente.
- `registry/public-capabilities-v1.json`: **63 entradas**, **61 distribuíveis** e **2 excluídas** (incluindo `medical-appointment-prep` e `caregiver-coordinator`).
- `registry_status` confirma **61**, não **61 skills instaladas**.
- O servidor informa `source_commit: "development"` e `published_at: "2026-10-11"`. Essa origem **não é um SHA imutável**; atualização/frescor do registro exige correção governada.
- O estado `designed`, `indexed` ou `verified` editorial não substitui `tested` em ambiente, nem prova aptidão para dados confidenciais.
- As 48 skills `draft` têm cenários planejados em `trust/qualification/draft-behavior-scenarios-v1.json`; **ainda não há aprovação individual das 48**.

## 5. Arquitetura que deve ser preservada

```text
Pessoa descreve objetivo normalmente
        |
        v
CS Navigator (curadoria nativa primeiro)
        +-- Resposta nativa quando basta
        +-- Skill instalada no host, lida se necessária
        +-- Registry MCP registrado: metadados e evidências em modo leitura
        +-- App externo autorizado apenas quando indispensável
        |
        v
Resposta e evidência separadas: descoberta ≠ instalação ≠ leitura ≠ chamada ≠ resultado
```

**Contrato:** “Instalar uma vez. Conversar normalmente.” Este é o **objetivo de experiência**, não uma afirmação de autoativação universal. O registro remoto é **somente metadados**, não executor universal de GitHub. O plugin web tem **seis skills empacotadas**; outras entradas de registry não são automaticamente instaladas. Menor privilégio, privacidade e confirmação humana para alterações externas continuam exigidos.

## 6. Estado da documentação após esta revisão

**Documento canônico de estado atual:** esta página. Os relatórios de falhas e a primeira bateria são **históricos com validade limitada ao momento em que foram escritos**. Instruções “aguardando HOST-03” devem ser acompanhadas de ponte para o aceite HOST-03R, e não apagadas retroativamente.

A versão `0.20.0-beta.4` já está salva no plugin da conta e no GitHub. **Não editar o `QUALIFICATION-MANIFEST.json` do pacote já liberado apenas para reescrever história:** seus flags `combined_plugin_host_invocation_tested=false` são o snapshot da ocasião da release; o novo resultado de host está no registro **HOST-03R**.

## 7. Pendências reais — próximos gates

1. **ROUTE-01/ROUTE-02** no Web beta.4: verificar que perguntas triviais não acionam Registry/skills desnecessariamente e que uma tarefa complexa seleciona e **lê de fato** a skill correta; registrar rastreio de ferramenta e qualidade de resultado.
2. **Comparador sem CS isolado:** controlar disponibilidade de skills, configuração de modelo e contexto; HOST-01B foi contaminado, portanto não há evidência de vantagem causal do CS sobre ChatGPT nativo.
3. **Proveniência do Registry:** trocar a origem `development` por referência de publicação auditável e revisar o `published_at`, sem fabricar frescor.
4. **Fase 3 — lotes das 48 drafts:** avaliar por habilidade (positivo, negativo, adversarial e teste de permissão), promovendo somente após evidência suficiente. Começar pequeno e registrar falhas, não expandir catálogo por contagem.
5. **Distribuição:** decidir versão web principal depois de pilotos de uso; manter `beta.3` para rollback/comparação. Instalação para outras pessoas, publicação no Diretório e acesso entre chats são gates separados. Garantir termos, permissões e política de dados antes de abrir distribuição.

## 8. Checklist operacional para a próxima aba/conversa

A próxima conversa **não** deve voltar a investigar se o Registry existe ou se a skill web está carregada: **HOST-03R já passou**. Começar em `ROUTE-01/ROUTE-02` ou na preparação da Fase 3. Antes de editar o repositório, confirmar branch `main`, PRs e resultados CI. Usar as fontes versionadas; evitar duplicar plugins desnecessariamente ou alterar a linha `0.17.0`.

**Prompt de continuidade sugerido:**

> Continue o projeto CS Navigator no GitHub `eusourmr/chatgpt-skills` a partir do documento `docs/CS_NAVIGATOR_ESTADO_E_CONTINUIDADE_2026-11-06.md`. O aceite HOST-03R foi aprovado: CS Navigator Labs Web `0.20.0-beta.4` expôs seis skills, leu a curadoria via `skills__read` e executou `registry_status` na mesma conversa. Produção GitHub `0.17.0` permanece preservada, Labs original `0.20.0-beta.3` é referência de rollback/comparação, e o Registry MCP tem 61 capacidades distribuíveis com proveniência `development` ainda a corrigir. A próxima etapa é testar roteamento mínimo/especializado e depois qualificar drafts em lotes, sem inventar execução ou promover skills sem evidência. Confira o estado atual do GitHub antes de mudanças.

## 9. Restrições de honestidade e revisão

- Não chamar `0.20.0-beta.4` de plugin público aprovado ou produto de ativação universal.
- Não anunciar certificação ABNT, WCAG, aprovação ética, reparo em software de produção ou acesso a dados financeiros reais.
- Não tratar CI de empacotamento como teste em ChatGPT, nem um texto autorrelatado como rastreio de ferramenta.
- Não modificar `PROGRESS.md` manualmente: é gerado.
- Não apagar as falhas MCP-01, HOST-02 e HOST-01B: fazem parte da trilha de auditoria.
- Não mudar a linha estável `0.17.0`, os limites de privacidade ou as exclusões de saúde sem autorização e evidência.

## 10. Fase 3 iniciada — incremento posterior ao corte acima

O [roadmap ativo](../ROADMAP.md) foi refeito por gates e o anterior preservado em
`docs/archive/ROADMAP_PRE_PHASE3_2026-11-06.md`. A
[revisão de maturidade](CS_ROADMAP_REVIEW_2026-11-06.md) separa integração funcional,
valor ainda não demonstrado, proveniência, drafts e experiência por terceiros.

A entrega inicial tem protocolo/validador de evidências e prompts congelados de
ROUTE-01/02; não repete HOST-03R. Um ensaio de desenvolvimento teve leitura real
do especialista pelo host e reproduziu o ENG-01: corrigido 7/7, original falha
esperada na corrida selecionada (Node v24.22.1). O recibo da leitura é transcrito,
não uma exportação completa de conversa. **ROUTE-01/02 independentes continuam
pendentes e A/B permanece `control_unavailable`**, pois esta conversa expõe CS.

Primeiro lote: fontes de `capability-preferences`, `context-continuity-manager` e
`decision-stop-rule` revistas, 12 casos próprios planejados, zero comportamentos
executados no lote e zero promoções. `decision-stop-rule` requer fronteira
explícita de ativação/não ativação no `SKILL.md` portátil, harmonizada com a
seleção explícita já exigida por `agents/openai.yaml`, antes de qualificar comportamento. As 48
continuam drafts; os dois itens de saúde continuam excluídos. Nenhum pacote de
plugin, catálogo, manifesto histórico ou dado do Registry foi alterado.

Operação e próximos passos: [protocolo da Fase 3](CS_PHASE3_QUALIFICATION.md).
O verificador confere consistência dos arquivos e hashes, não autentica o host
nem aprova um resultado, vantagem causal ou promoção automaticamente.
