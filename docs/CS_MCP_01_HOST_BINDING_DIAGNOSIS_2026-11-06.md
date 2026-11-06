# MCP-01 — integração com ChatGPT bloqueada na camada de exposição

**Observação:** 06/11/2026. **Status:** `fail_host_tool_exposure_no_invocation`.

## O que foi observado

O usuário reproduziu a resposta de uma sessão de ChatGPT com CS Navigator Labs solicitado. A resposta informou que `registry_status` **não estava entre as ferramentas disponíveis**, nenhuma chamada havia sido executada e nenhum campo do registro foi obtido.

Este é um **resultado negativo do teste de integração no ChatGPT**, não uma falha do serviço MCP. Como a evidência veio do texto da sessão produtora, não temos o inventário de ferramentas independente daquela sessão; o relato foi conservador e não inventou execução. Nesta sessão revisora, a enumeração das ferramentas também não encontrou um comando MCP do CS Registry.

**Inspeção da fonte armazenada do plugin:** backend confirma CS Navigator Labs `0.20.0-beta.2`, release `pluginrel_6aee1571e5348191838071f4c3e2d774`, privado pessoal, seis skills e `mcp.json` no pacote. O arquivo contém `cs-navigator-registry` do tipo `streamable-http`, endpoint `https://chatgpt-skills.onrender.com/mcp`, autenticação `none`; arquivo de compatibilidade `.mcp.json` também está presente. **Não existe uma vinculação `.app.json` a um app MCP registrado nessa conta no plugin Labs.** Isso é um indício de possível necessidade de registro/conexão na interface, não prova isolada da causa.

**Evidência anterior ainda válida:** o job de GitHub Actions `42267515610` realizou inicialização MCP, obteve `tools/list` (quatro ferramentas), executou `registry_status` e consultou duas capacidades excluídas com `get_capability`. O retorno do registro (`source_commit=development`, `published_at=2026-10-11`) também permanece uma pendência de proveniência.

## Diagnóstico: não alterar código servidor nem repetir ZIP às cegas

O estado atual demonstra três camadas diferentes:
1. **Fonte e conta:** plugin privado salvo e configurado.
2. **Transporte externo:** servidor MCP acessível e ferramentas respondendo em CI.
3. **ChatGPT:** ferramentas não expostas/acionadas na sessão de teste.

A falha está **entre 2 e 3**; as hipóteses não devem ser apresentadas como fatos: versão antiga em sessão, plugin selecionado sem app habilitado, necessidade de registrar/vincular conexão MCP ou política de plano/espaço de trabalho/interface.

### Caminho oficial de registro e teste

Conforme a documentação de desenvolvedor:
- <https://developers.openai.com/plugins/build/plugins>
- <https://help.openai.com/pt-br/articles/12584461-connecting-custom-mcp-servers-in-chatgpt>
- <https://help.openai.com/pt-br/articles/20001497-troubleshooting-plugins-and-apps-in-chatgpt>

Em ambiente elegível, no **ChatGPT web**:
1. Abrir **Plugins** e localizar **CS Navigator Labs** nos plugins pessoais/instalados. Confirmar conexão/estado de app, se houver botão; recarregar a página após atualização de release.
2. Se a lista de apps/ferramentas conectadas não contiver o Registry, abrir **Plugins → + → Adicionar servidor MCP personalizado** (se disponível para o plano/ambiente e permissões de workspace).
3. Informar `https://chatgpt-skills.onrender.com/mcp` como URL **exata**; autenticação **nenhuma**, pois o serviço é somente leitura e não exige conta.
4. Ler o aviso de risco, confirmar conscientemente e selecionar **Criar como plugin**, conferindo na UI se o servidor retornou `registry_status`, `search_capabilities`, `get_capability`, `get_evidence`.
5. Instalar/selecionar o plugin MCP resultante, conferir se está conectado e executar numa nova conversa o comando `registry_status`. Guardar o retorno de ferramenta real.
6. Se for desejável agrupar esse app registrado às seis skills em **um só plugin**, capturar o ID **efetivamente atribuído** pela UI `plugin_asdk_app_...`. Só então atualizar `CS Navigator Labs` com a **vinculação real** `.app.json` e `extensions.com.openai.apps` seguindo o formato oficial; preservar os seis workflows e a identidade e não usar ID de outro app.

**Atenção:** a documentação atual de suporte completo a MCP personalizado especifica Business e Enterprise/Edu na web, com permissões administrativas/por função. A disponibilidade em um usuário pessoal de outro plano **não pode ser presumida**. Se o botão não aparecer, **não** tentar forçar instalação via ZIP ou declarar sucesso: confirmar elegibilidade de plano/workspace ou usar um ambiente habilitado.

### Procedimento de aceite após habilitar o app

Prompt neutro: `Use a ferramenta registry_status do CS Navigator Registry. Mostre o retorno literal e a referência à chamada real; se indisponível, não invente resultados.`

**PASS:** a conversa registra chamada à ferramenta MCP e exibe `capability_count`, `published_at`, `source_commit` recebidos, com identificação da fonte. **FAIL:** resposta autorrelatada sem ferramenta, mesmo que contenha valores corretos do registro da CI.

## Limites de intervenção

Não atualizamos novamente o plugin Labs, pois a configuração já está correta na fonte e uma atualização não garantiria habilitação no host. Não alteramos servidor, produção 0.17, registro público ou status das 48 skills. Não incluímos nenhum ID de app que não corresponda ao CS Registry.

Registro machine-readable: `trust/qualification/pilots/mcp-01-host-tool-unavailable-2026-11-06.json`.

## Resolução posterior: MCP-01R

Em 06/11/2026 o usuário conectou o **CS Navigator Registry** como app privado. A sessão revisora passou a expor `registry_status`, `get_capability`, `get_evidence` e `search_capabilities`. A chamada real de `registry_status` foi executada com resposta do servidor (61 capacidades, fonte publicada em 11/10/2026, `source_commit=development`). Foram executadas chamadas a `get_capability` e `search_capabilities`.

O registro MCP foi associado ao pacote privado **CS Navigator Labs 0.20.0-beta.3** por seu app ID verificado, preservando seis skills e o MCP portátil. A falha original permanece registrada, mas a ligação do app independente passou no teste. O aceite do plugin **consolidado** ainda não foi executado em uma conversa nova.

Evidência: `trust/qualification/pilots/mcp-01r-registry-connected-2026-11-06.json`.
