# CS Navigator — auditoria de GitHub, plugin e apresentação

**Data da verificação: 23/11/2026.** Escopo: estado da `main`, construção Web beta.8, documentação de entrada, Registry somente leitura e plugin pessoal. Não é uma auditoria de segurança integral de todos os arquivos do repositório nem certificação de resultados de usuário.

## Posição do produto

> **CS Navigator é o canivete suíço para quem quer usar o ChatGPT ao máximo.**

A expressão comunica o **propósito**: aproveitar o ChatGPT como inteligência principal e, quando útil, selecionar Skills e ferramentas autorizadas para executar melhor uma tarefa. Não significa que o catálogo inteiro esteja instalado ou que toda Skill seja invocada automaticamente. O curador deve inclusive **não utilizar** uma Skill quando a resposta nativa for suficiente.

Essa apresentação aparece na página principal em inglês (com a frase original em PT-BR), na edição brasileira e no roadmap. O projeto segue independente, não afiliado nem endossado pela OpenAI.

## Inspeções verificadas

| Área | Evidência obtida | Resultado |
| --- | --- | --- |
| Repositório | `eusourmr/chatgpt-skills`, branch padrão `main`, PR #140 incorporada no commit `4e291778bc22be1f6e27d1d9b88ec80d2a44c207` | Confirmado |
| Workflows da PR #140 | Oito workflows de regressão/catálogo/CI finalizados em sucesso | Confirmado |
| Workflows do commit na `main` | Web beta.8, pacote npm e catálogo em sucesso | Confirmado |
| Artefato Web beta.8 | ZIP privado verificado localmente, 19 arquivos; checksum SHA-256 do ZIP interno `1579ff5600224f1b0f17bcaf41ff35e515833da92172a9fcbdf76e4590ac775c` | Confirmado |
| Conta ChatGPT | Plugin privado `plugins_6aee22530eb88191bed0e982d96d1218` atualizado e lido de volta em `0.20.0-beta.8`; release `pluginrel_6b0436ff1c34819182ab0d1240d72617` | Confirmado |
| Conteúdo instalado | Seis arquivos de Skill, nove regras em ledger versionado, referências e atribuição `NOTICE-UX-SOURCES.md`, sem MCP portátil duplicado | Confirmado |
| Registry | `registry_status` respondeu `capability_count=61`, `published_at=2026-10-11`, `source_commit=development` | Conectividade confirmada, proveniência imutável pendente |
| Catálogo editorial | 79 itens no catálogo de qualidade, incluindo 48 rascunhos; linha GitHub CS Navigator 0.17.0 preservada | Metadados do repositório |
| PRs abertas no momento da auditoria | Nenhuma antes deste ajuste documental | Confirmado |

## Inconsistências detectadas e resolvidas nesta revisão

1. `README.md`, `README.pt-BR.md` e os guias de início ainda colocavam a beta.4 em destaque como se fosse a versão privada corrente, embora HOST-03R fosse um teste histórico e a conta já tivesse beta.8.
2. A edição em inglês citava apenas um registro privado 0.17.0, sem distinguir esse histórico do Web Labs instalado.
3. O roadmap começava com uma data de revisão da Fase 3 de 06/11 e não destacava que seus marcos recentes foram atualizados em 23/11.
4. A marca não estava sintetizada de forma pública, direta e memorável. Foi incorporada a ideia de **canivete suíço**, junto à fronteira de disponibilidade real.

A documentação não altera a identidade das Skills instaladas, o código de produção nem o Registry. Os documentos históricos ficam preservados como registros datados.

## Lacunas encontradas, sem declarar correção

| Prioridade | Pendência | Por que importa |
| --- | --- | --- |
| P0 | F3.1/CUR08: executar os doze casos em **nova conversa** e verificar leitura de Skill, rota selecionada e resultado | Fonte instalada e teste de CI não comprovam que o ChatGPT a usou |
| P0 | F3.2: substituir identificador `development` do Registry por metadados de publicação rastreáveis e imutáveis, sem alterar data histórica | Não há revisão imutável comprovável na resposta atual |
| P0 | Atualização do plugin pessoal ainda depende de intervenção explícita | Push no GitHub não garante atualização na conta |
| P1 | Builders encadeados beta.5→beta.6→beta.7→beta.8 | Risco de fragilidade, retrabalho e regressões na distribuição |
| P1 | Comparativo A/B controlado com ChatGPT nativo não executado | Sem prova mensurada de melhoria efetiva |
| P1 | 48 drafts de catálogo não qualificados individualmente | Descoberta não equivale a disponibilidade ou eficácia |

## Conclusão limitada

**O repositório e o pacote Web beta.8 estão coerentes e os CI observados passaram.** O plugin privado está atualizado e os arquivos correspondem à versão esperada. Entretanto, ainda não seria correto dizer que **toda a experiência está homologada**: faltam evidências de roteamento automático, proveniência de publicação do Registry, atualização transparente do plugin e benefício frente ao ChatGPT nativo.

O UMNOO/Noem permanece projeto independente, sem ponte nem troca de dados automática.
