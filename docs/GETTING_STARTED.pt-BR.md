# CS Navigator — Como usar no ChatGPT, Codex e no repositório

**Revisão:** 06/11/2026. Guia operacional, não um anúncio de publicação.

## Comece pelo problema, não pela pasta

> **Piloto privado disponível (06/11/2026):** [CS Navigator Labs Web `0.20.0-beta.4`](https://chatgpt.com/plugins/plugins_6aee22530eb88191bed0e982d96d1218) teve sua skill de curadoria realmente lida e o Registry MCP chamado na mesma conversa (HOST-03R). Não é um plugin público universal, nem instala automaticamente as 48 skills `draft` do catálogo. [Leia o estado e o roteiro atual](CS_NAVIGATOR_ESTADO_E_CONTINUIDADE_2026-11-06.md).

- Para uma tarefa simples, use o ChatGPT normalmente. **Não é necessário instalar uma skill** para perguntar, escrever, criar ou analisar com os recursos nativos.
- Para um workflow reutilizável, verifique se há uma skill **disponibilizada pela interface** ou um plugin que realmente a contenha. Use o seletor `@` quando ele aparecer ou siga a invocação suportada pelo seu host.
- Para trabalho de programação local, use Codex/CLI/IDE e configure as skills no ambiente local. O pacote npm `chatgpt-skills` é uma ferramenta de descoberta/instalação **local**; executar `npx` não instala automaticamente um plugin no ChatGPT web ou Android.
- Para acesso a catálogo remoto/ferramentas MCP, um plugin precisa estar instalado, acessível e com servidor real configurado. Um arquivo ZIP ou link de GitHub **não** constitui conexão.

## Quatro estados que não podem ser confundidos

| Estado | Evidência necessária |
|---|---|
| Descoberta | A capacidade consta no catálogo versionado; isso não é ativação |
| Instalação | O host/conta indica o recurso instalado ou plugin cadastrado; ZIP baixado não conta |
| Carregamento | O host expõe o recurso na conversa ou evidencia leitura do arquivo de skill |
| Execução | Registros de chamada/ferramenta/resultado e, separadamente, evidência do objetivo do usuário |

A ausência de uma skill numa lista **da sessão atual** é apenas ausência de evidência de disponibilização naquela sessão, não prova de ausência no backend da conta. Uma frase como "use CS Navigator" não executa por si uma ferramenta MCP.

## ChatGPT — caminho para usuário final

1. Abra **Plugins** na barra lateral e examine o que está disponível para sua conta e espaço de trabalho.
2. Se houver uma seção **Habilidades/Skills**, confira se existe uma skill instalada ou criável. A disponibilidade para skills autônomas depende do plano, da configuração do workspace e da interface; não presuma que esteja presente.
3. Para plugins, use o diretório para instalar um plugin compatível ou o Plugin Creator quando disponível. A permissão de **upload de ZIP de plugin** pode depender de um administrador/workspace na interface web.
4. Em uma nova conversa, selecione/mencione pelo `@` **somente se a interface realmente apresentar** o plugin ou a skill. Verifique o comportamento e se ferramentas esperadas aparecem.
5. Se não houver recurso instalável na interface, ainda é possível usar uma instrução de curadoria como **preferência conversacional**, mas não atribua a ela execução de skill, registro, persistência ou MCP.

**Exemplos de tarefas**
- Sem plugin: "Analise esta decisão e diga o próximo passo com os fatos disponíveis." (ChatGPT nativo).
- Com recurso **realmente disponível**: selecione `@CS Navigator` na interface e diga "Escolha o caminho mais simples para revisar meu texto sem mudar seus fatos".
- Para teste: "Quais ferramentas deste plugin você realmente tem disponíveis e quais invocou? Distinga instruções carregadas de ferramentas executadas."

## Codex e instalações locais

- Uma pasta contendo `SKILL.md` pode ser usada no ambiente local/IDE/CLI compatível. Leia a documentação da ferramenta e veja seu diretório de destino.
- A CLI npm `chatgpt-skills` não sincroniza automaticamente skills com a conta ChatGPT. A presença de arquivos no seu dispositivo é apenas evidência local.
- Reabra/recarregue o host quando necessário; confirme que o recurso é listado antes de declarar sucesso.

## Projeto CS — situação verificável (em 06/11/2026)

| Linha | Evidência e limite |
|---|---|
| Catálogo do GitHub | `catalog/skills.json` contém 80 entradas editoriais; uma é coleção; `catalog.json` contém 79 itens classificados para acompanhamento |
| Core autoral | 63 skills no catálogo editorial, mas a maior parte permanece em estado de projeto e não possui piloto de execução individual |
| Plugin privado 0.17 | Versão 0.17.0 está registrada no backend da conta em inspeção anterior; isso não garante visibilidade ou instalação nesta sessão |
| RC3/0.18 | Testes de MCP no CI passaram; pacote de avaliação não prova instalação ou ativação no ChatGPT |
| Submissão pública | Não tratar como aprovada/publicada sem confirmação do portal e fonte atual |
| MCP | Registry é metadado; nenhuma skill externa arbitrária é automaticamente executável por estar indexada |

Os documentos históricos da 0.9.4, 0.15 e da 0.16 são registros de versão, não guia de instalação atual.

## Quando um ZIP serve

**ZIP de skill independente**: tem formato de skill e só deve ser enviado à superfície compatível quando disponibilizada.

**ZIP de plugin**: tem raiz `plugin.json` e `skills/<nome>/SKILL.md`; um `mcp.json` válido é necessário se o plugin declarar um servidor. A interface de envio, permissões e disponibilidade são específicas do host.

**ZIP de avaliação/CI**: pode conter instruções, relatórios e checksums sem estrutura instalável. **Não instalar como se fosse plugin**.

## Solução de problemas

1. Se "não aparece em Criados por você", confira o **escopo correto** (plugin vs habilidade), a conta/workspace e a forma como o pacote foi efetivamente cadastrado.
2. Se o plugin consta no backend, mas não está selecionável, considere a ativação **pendente**, não "testada".
3. Se a skill é visível, mas o MCP não, examine endpoint, permissão, autenticação, superfície e versão do servidor — sem inventar logs.
4. Não envie dados privados a um endpoint experimental; use objetivos sintéticos.
5. Se a instalação autônoma não está disponível no seu plano/workspace, use o ChatGPT nativo ou um plugin compatível; não prometa um botão inexistente.

## Documentação de referência

- [OpenAI — Skills no ChatGPT](https://help.openai.com/pt-br/articles/20001066-skills-in-chatgpt)
- [OpenAI — Plugins no ChatGPT](https://help.openai.com/pt-br/articles/20001256-plugins-in-chatgpt)
- [OpenAI — Build Skills](https://learn.chatgpt.com/docs/build-skills)
- [OpenAI — Package your plugin](https://developers.openai.com/plugins/build/plugins)

**Política de linguagem:** diferenciar `designed`, `CI-tested`, `host-loaded`, `tool-invoked` e `outcome-verified`. Nunca inferir os últimos três pelos anteriores.
