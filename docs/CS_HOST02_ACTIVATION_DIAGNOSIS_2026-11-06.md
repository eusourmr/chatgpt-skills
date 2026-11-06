# HOST-02: skills não expostas no ChatGPT

> **Incidente histórico, não o estado atual do Web Labs.** O HOST-02 falhou para a configuração original `0.20.0-beta.3`. Depois, a variante privada **Labs Web `0.20.0-beta.4` passou no HOST-03R**, com leitura real de `SKILL.md` e chamada MCP na mesma sessão. Ver [estado consolidado](CS_NAVIGATOR_ESTADO_E_CONTINUIDADE_2026-11-06.md). Não apagar o incidente nem atribuir causa única sem A/B isolado.

**Data:** 2026-11-06. **Status:** falha de ativação da skill de curadoria; causa raiz desconhecida.

O usuário relatou uma conversa com 35 skills disponíveis, nenhuma do CS Navigator Labs, e chamada real a `registry_status`. Na sessão revisora, `skills__list` também retornou 35 skills, nenhuma do Labs. Tentativas de `skills__read` para o curador e a skill de engenharia retornaram `Resource not found`.

Em contrapartida, Plugin Creator confirmou a fonte persistida do Labs `0.20.0-beta.3`, com as seis skills preservadas, e o Registry MCP conectado. Fonte salva não é comprovação de plugin instalado e carregado na sessão. Não se identificou falha de arquivos ou necessidade de outro ZIP.

## Próximo teste: instalação real no host

1. Abra a área Plugins do ChatGPT e procure **CS Navigator Labs** na seção pessoal e na seção de instalados. Ele é distinto do app **CS Navigator Registry**.
2. Abra a ficha do Labs, confira se está instalado e se são exibidas seis skills. Se houver botão **Instalar**, conclua a instalação. A versão esperada é `0.20.0-beta.3`, quando a interface a mostrar.
3. Atualize o navegador e comece uma conversa nova selecionando explicitamente o Labs pela interface ou menção de plugin, não só digitando seu nome.
4. Solicite ao modelo o inventário e a leitura real da skill `cs-navigator-labs`, depois a chamada MCP `registry_status`. Exija rastros das duas operações.
5. Se a ficha estiver instalada e as skills ainda não aparecerem, verificar disponibilidade de Skills na modalidade de conta, permissões e interface. Registrar o estado mostrado antes de qualquer reempacotamento.

O sucesso requer **leitura efetiva do SKILL.md na versão Beta e execução MCP na mesma sessão**; o MCP funcionando sozinho é sucesso parcial, não encerramento da Fase 2.

Referências oficiais:
- https://help.openai.com/en/articles/20001256-plugins-in-chatgpt
- https://help.openai.com/en/articles/20001066-skills-in-chatgpt
- https://developers.openai.com/plugins/build/plugins

Registro de evidências: `trust/qualification/pilots/host-02-labs-skill-exposure-2026-11-06.json`.

Nenhuma atualização de plugin, alteração de permissões, publicação pública ou promoção de skill foi feita.
