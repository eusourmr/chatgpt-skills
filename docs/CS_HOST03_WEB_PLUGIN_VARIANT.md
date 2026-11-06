# HOST-03 — Beta web sem MCP portátil

**Data:** 06/11/2026. **Plugin de teste:** CS Navigator Labs Web `0.20.0-beta.4` (privado).

## Motivo

O laboratório original `0.20.0-beta.3` aparece no diretório com seis skills e app Registry conectado; sua ficha exibia botão **Open in desktop app**. Em duas conversas, o MCP Registry respondeu a chamadas reais, mas nenhuma skill `cs-navigator-labs` apareceu em `skills__list`.

Segundo a documentação oficial, **plugins importados com `mcp.json` ou `.mcp.json` podem receber a restrição Desktop only, mesmo para endpoint HTTPS**. Adicionar um app registrado a um pacote com esse MCP não necessariamente elimina a restrição. Fontes: [Plugins in ChatGPT](https://help.openai.com/en/articles/20001256-plugins-in-chatgpt) e [GitHub plugin marketplace import](https://help.openai.com/en/articles/20001504-importing-and-syncing-plugin-marketplaces-from-github). Isto é uma **hipótese forte, não causa comprovada por telemetria**.

## Mudança controlada

Criamos a **variante web privada** como plugin separado, sem alterar a versão original `0.20.0-beta.3` nem a produção `0.17.0`:

- plugin: `cs-navigator-web-labs` `0.20.0-beta.4`;
- seis skills e referências preservadas;
- registra **apenas o app CS Navigator Registry existente**, `asdk_app_6aee1bad0884819196a97a44393e1a53`, em `.app.json` / `extensions.com.openai.apps`;
- **não inclui** `mcp.json` nem `.mcp.json` e não declara `mcpServers` no overlay;
- configura `onboardingSkill: ./skills/cs-navigator-labs/SKILL.md`, quando suportado pelo host;
- fica privado; não representa lançamento público nem promoção das 48 skills.

URL privada: <https://chatgpt.com/plugins/plugins_6aee22530eb88191bed0e982d96d1218>.

## Teste de aceite na interface

1. Abrir a ficha do **CS Navigator Labs Web** no ChatGPT na web e verificar se aparece opção de **instalar/usar no ChatGPT web** em vez de **Open in desktop app**.
2. Instalar ou selecionar a variante web e iniciar uma conversa nova a partir dela.
3. Pedir inventário `skills__list`, ler por URI retornada a skill `cs-navigator-labs`, verificar se o conteúdo declara `0.20.0-beta.4`.
4. Executar `mcp__CS_Navigator_Registry__registry_status` na mesma sessão, verificando chamada real e resposta do servidor.

**PASS:** skill realmente disponível/lida na conversa e ferramenta MCP invocada na mesma sessão. **PASS de interface parcial:** não é mais Desktop only, mas não há skill; investigar permissões e disponibilização das Skills. **FAIL:** continua Desktop only, nenhuma skill é exposta, ou a ação de leitura foi apenas alegada.

A documentação de [Skills in ChatGPT](https://help.openai.com/en/articles/20001066-skills-in-chatgpt) estabelece que o acesso a skills depende de plano e configuração de workspace, principalmente Business, Enterprise, Healthcare e Edu. Remover MCP portátil **não contorna** requisitos de elegibilidade. Não afirmar que o usuário tenha ou não direito à feature sem confirmação do host.

## Evidências

- Fonte de plugin salva, inventário lido novamente, sem `mcp.json` e `.mcp.json`;
- registro `trust/qualification/pilots/host-03-web-surface-mcp-isolation-2026-11-06.json`;
- testes estáticos e empacotamento reproduzível em CI;
- execução e disponibilidade de skill no ChatGPT web **ainda aguardando aceite**.

Manter a Beta 0.20.0-beta.3 como comparação enquanto o teste não confirmar a variante. Após comprovação, escolher apenas uma distribuição principal para o usuário final e planejar descontinuação segura da outra; não afirmar que duas instalações são a solução final.
