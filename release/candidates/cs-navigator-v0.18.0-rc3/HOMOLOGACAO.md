# CS Navigator 0.18.0 RC3 — homologação com evidências

**Decisão em 27/10/2026:** a integração MCP de CI foi aprovada pelo mantenedor. Aprovação **restrita ao CI**, não a release pública.

## Evidência objetiva
- GitHub Actions: https://github.com/eusourmr/chatgpt-skills/actions/runs/40562737578
- 23/23 testes unitários verdes; inicialização MCP HTTP, descoberta das seis ferramentas e chamadas reais em localhost, com encerramento do processo.
- Curadoria de aprendizado: `guided`; inexistente e excluída: `not_available`.
- `execution_verified:false` significa que a execução de uma **skill** não foi comprovada, apesar de chamadas reais das **ferramentas MCP** no runner.
- Doze respostas conversacionais tiveram comportamento esperado, porém foram obtidas sem prova de host 0.18 ativo; **não contam como os 12 testes nativos do candidato**.

## Próximo gate: ChatGPT real
1. Congelar commit/artefato 0.18 RC3 e SHA-256 verificável antes de qualquer qualificação nativa.
2. Usar somente superfície privada de testes compatível com importação de plugin/Skill; não alterar plugin 0.17 submetido.
3. Conectar um endpoint de testes controlado que exponha realmente `assess_capability_delivery` e `curate_user_goal` (sem dados pessoais). Runner efêmero GitHub Actions **não** fornece endpoint público persistente para ChatGPT.
4. Registrar para cada cenário data, commit exato, cliente, ferramenta realmente invocada, resultado observado, decisão e evidência verificável sem dados sensíveis.
5. Executar 12 cenários nativos com plugin **habilitado**; repetir negativos sem alegar chamada quando não aconteceu.
6. Fazer três pilotos voluntários (aprendizagem, escrita acadêmica, uso cotidiano) comparando com ChatGPT nativo.
7. Revisar exclusões, segurança, proveniência imutável, integridade do pacote, disponibilidade do endpoint e requisitos da OpenAI antes de qualquer promoção ou publicação.

## Critério de parada
Se o host não expuser as ferramentas ou não houver staging acessível sem custo, registrar `blocked-host-unavailable` e manter 0.18 como candidata. Não trocar a URL do plugin 0.17 nem registrar execução fictícia.

## Resumo dos estados
- CI/protocolo MCP em loopback: **PASS**
- ChatGPT com RC3 habilitada: **NOT RUN**
- Pilotos humanos: **NOT RUN**
- Release pública 0.18: **BLOCKED**
