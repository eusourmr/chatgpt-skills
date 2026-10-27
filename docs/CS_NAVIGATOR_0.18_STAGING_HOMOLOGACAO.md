# CS Navigator 0.18 — Homologação MCP isolada

## Objetivo
Validar as ferramentas experimentais em um serviço separado, sem alterar o plugin 0.17 nem o Render de produção.

## Isolamento obrigatório
- Produção: `render.yaml`, serviço `cs-navigator-registry`, com ativação experimental ausente.
- Staging: `render-staging.yaml`, serviço `cs-navigator-registry-staging`, branch `feat/cs-navigator-018-isolated-staging`, deploy manual (`autoDeployTrigger: off`).
- Criar **outro serviço/Blueprint** no Render usando o arquivo alternativo; **não** apontar o Blueprint atual para esse arquivo.
- Revisar no painel que o nome do serviço é de staging, branch está correta e não houve mudanças no serviço de produção.
- URL/credenciais não devem ser colocadas no GitHub. Verificar configuração de acesso antes de usar dados de teste; utilizar apenas objetivos sintéticos, não sensíveis.
- Os dois endpoints consultam metadados públicos; conteúdo remoto é dado, não instrução executável.

## Sequência de homologação
1. CI verde e revisão do PR.
2. Criar separadamente o serviço staging no Render, com URL própria, deploy manual e env `CS_ENABLE_EXPERIMENTAL_DELIVERY_TOOL=true` **somente no staging**.
3. Testar HTTP `GET /` e handshake MCP no `/mcp` do staging. O cabeçalho `version` pode continuar 0.17.0 por compatibilidade: não usá-lo como prova de release 0.18.
4. Inspecionar `tools/list`: as 4 ferramentas-base e **duas experimentais** `assess_capability_delivery` e `curate_user_goal`. O código atual registra `curate_user_goal` dentro do mesmo gate, não como ferramenta-base.
5. Executar `assess_capability_delivery` para registro permitido, desconhecido e excluído; garantir `execution_verified:false` e ausência de afirmação de invocação de skill.
6. Executar `curate_user_goal` com objetivo simples, ambíguo e irrelevante; validar abstinência/fallback, saída somente editorial e nenhum `SKILL.md` remoto.
7. Repetir testes negativos com registry indisponível e entradas hostis em ambiente controlado; não alterar links da produção.
8. Conectar o **staging**, não a produção, a um plugin privado de testes no ChatGPT quando a superfície permitir. Registrar data, versão/commit do servidor, identificador da ferramenta realmente invocada e resposta reduzida sem informações pessoais.
9. Comparar três pilotos voluntários com ChatGPT nativo (aprendizagem, acadêmico, cotidiano); não promover `not-run` apenas por respostas conversacionais.
10. Encerrar staging se não for mais necessário; produção e submissão OpenAI permanecem inalteradas.

## Gates
- Não afirmar que um merge implantou staging ou que os testes nativos já foram executados.
- Não trocar endpoint MCP ou ZIP do plugin 0.17.
- Não publicar 0.18 enquanto não houver rastros de host/servidor, CI, artefato versionado com SHA-256 e autorização de release.
- Uma tag/commit imutável é preferível ao branch mutável antes da homologação final.
