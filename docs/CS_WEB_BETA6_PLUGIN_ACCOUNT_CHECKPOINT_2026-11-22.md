# CS Navigator Web Labs beta.6 — atualização do plugin pessoal (22/11/2026)

## Resultado verificado
O desenvolvimento da beta.6 foi integrado na `main` pela PR #136. O GitHub Actions validou o pacote `cs-navigator-web-labs-0.20.0-beta.6.zip` e seu checksum SHA-256. O pacote foi normalizado para raiz de plugin, com 14 arquivos, seis `SKILL.md`, vínculo do app Registry preservado e ausência de configuração MCP portátil duplicada.

Na mesma sessão, após a compilação, uma atualização do **plugin pessoal já existente** foi executada pelo Plugin Creator, com recibo `status=updated`, `version=0.20.0-beta.6` e escopo `USER / PRIVATE`. Uma leitura posterior da fonte realmente armazenada retornou:
- `version=0.20.0-beta.6`, com 14 arquivos no release;
- seis arquivos `SKILL.md` existentes, sem novo especialista;
- curador com versão beta.6, uso de URI efetivamente enumerado pelo host e diagnóstico inicial somente sob solicitação;
- nenhum caminho inexistente entre os arquivos consultados;
- chamada real e independente ao Registry `registry_status`, retornando 61 capacidades, `published_at=2026-10-11`, `source_commit=development`.

## Limite de evidência
A atualização e a leitura posterior da fonte do **plugin pessoal** estão comprovadas. A chamada ao Registry foi real nesta sessão, mas **não é prova de que a beta.6 foi ativada por roteamento automático em uma conversa nova**. A qualificação semântica para casos simples e complexos permanece aberta; não inventar resultado de host. O Registry ainda precisa de proveniência imutável (F3.2).

## O que foi corrigido
1. URI de especialistas: deixar de adivinhar o slug do plugin Labs portátil, usando o caminho exato retornado pelo host.
2. Evitar inventário e diagnóstico a cada conversa.
3. Responder naturalmente, sem relatório de roteamento salvo quando necessário.
4. Engenharia de prompts deve permanecer invisível quando foi pedida execução, e produzir prompt copiável apenas sob pedido.
5. Não instalar novas Skills; preservar as seis existentes e o Registry conectado.

## Testes futuros no ChatGPT (não executados automaticamente)
- NAT-01: uma pergunta simples sem consultas desnecessárias e com resposta direta.
- NAT-02: investigação substantiva de código com leitura efetiva do especialista pelo URI listado.
- NAT-03: pedido de engenharia de prompts produz prompt reutilizável sem alegar execução.
- NAT-04: pedido de execução produz a entrega, não uma orientação para copiar um prompt.
- NAT-05: auditoria explícita informa fontes e ferramentas efetivamente observadas.
- NAT-06: indisponibilidade de especialista não gera alegação de ativação.
- NAT-07: solicitação sem permissão conectada não autoriza escrita/envio.
- NAT-08: nenhuma ponte com UMNOO ou uso cruzado de memória.

Cada caso só poderá ser marcado como aprovado após observar uma execução própria no host e registrar entrada, eventos e saída. Resultado de testes de código não é homologação de seleção automática.

## Estratégia de atualização
A fonte única permanece no GitHub e o ZIP é compilado automaticamente pelo Actions. O plugin pessoal foi atualizado nesta ocasião, mas **não há evidência de sincronização automática GitHub → ChatGPT em futuras releases**. Manter update guardado por release e rollback para beta.4/beta.5, com atualização explícita e auditoria de recepção.

Projeto UMNOO/Noem: independente e não integrado.
