# CS Navigator — F3: implementação dos quatro portões de homologação

**Data:** 23/11/2026. **Referência de release:** Web Labs privada `0.20.0-beta.8`, produção histórica `0.17.0`. Este trabalho não inventa uma nova versão do plugin nem altera as seis Skills existentes.

## Resultado esperado e estado honesto

| Portão solicitado | Entrega técnica | Condição que ainda exige evidência externa |
| --- | --- | --- |
| F3.1/CUR08 — roteamento do ChatGPT | Inventário e leitura do curador beta.8 observados nesta sessão; 12 casos e validador de receipts com isolamento, zero chamadas em casos triviais e rastros exigidos | **Não há 12 execuções independentes em novas conversas**, nem prova automática de seleção. Não homologar esse portão |
| F3.2 — proveniência do Registry | Manifesto de conteúdo com **commit Git imutável** e hash Git blob; servidor valida bytes efetivos antes de divulgar hash ou expor capacidades; mismatch bloqueia metadados não verificados | É necessário confirmar o deployment do novo servidor e `registry_status` ao vivo. Commit fixado prova identidade do snapshot, **não** a autoria/data exata de publicação original |
| F4.1 — builds | Fonte canônica `plugins/cs-navigator-web-labs-current/`, 19 arquivos da beta.8 instalada; único construtor sem dependência de builders 5→6→7→8; testes exigem equivalência de conteúdo (Skills e referências byte a byte, JSON por estrutura) com o histórico | A instalação pessoal **não sincroniza automaticamente** com GitHub; atualização e rollback de conta são operações próprias |
| PC-04 — benefício contra nativo | Protocolo A/B pré-fixado, 12 pares, modelo/configuração equivalentes, ambientes isolados, rastros, revisão cega com duas pessoas por braço, score 0–4 | Não existe comparação independente executada; sem dados, não há ganho mensurado nem homologação causal |

## Estado observado em ChatGPT nesta sessão

Foi chamada a listagem real de Skills e feita a leitura de `skills://plugins/cs-navigator-web-labs/cs-navigator-labs/skill.md`. A listagem retornou as seis Skills do plugin privado; o curador lido continha `0.20.0-beta.8` e o bloco `Curadoria por conhecimento comprovável`. Isso **confirma apenas disponibilidade e leitura nesta sessão**, não roteamento automático, aprovação de cada caso ou benefício sobre controle isolado.

## Registry — identidade do conteúdo, sem falsificar passado

A URL mutável permanece `https://raw.githubusercontent.com/eusourmr/chatgpt-skills/main/registry/public-capabilities-v1.json`. Em 23/11/2026 o conteúdo era exatamente o mesmo na revisão Git `946723c75683021ab5e733e83c08aa44522f540d`, com **Git blob SHA-1 `96128c4ef9bbc09415e01c09d6e7aa64bb115877`**. O manifesto `registry/publication-manifest-v1.json` registra essa revisão e mantém a afirmação original `published_at=2026-10-11` separada da data de revisão do snapshot.

O serviço `mcp/cs-registry-server/src/provenance.ts` verifica rigorosamente identidade da URL, schema, commit de 40 caracteres hexadecimais, Git blob exato, data declarada, distribuição 61 e ausência de alegação de revisão original confirmada. `server.ts` usa esse resultado em `registry_status` e nas buscas. Alteração do arquivo sem atualização de manifesto gera erro: não devolve um commit antigo como se fosse novo. O campo `source_commit` na resposta nova será uma revisão **verificada do snapshot**, e `raw_source_commit` continuará mostrando o valor editorial histórico `development`. `original_publication_commit_verified=false`.

Esse manifesto é governado pelo GitHub e continua revisável por PR; a verificação de conteúdo não equivale a uma assinatura digital externa, prova de autoria histórica ou verificação independente do deploy.

## Release Web sem cadeia de patches

O conteúdo do plugin instalado na conta foi recuperado por `Plugin Creator` e gravado como fonte de release sob `plugins/cs-navigator-web-labs-current/`. O construtor `scripts/build-cs-web-labs-current.py` exige seis Skills, app Registry preservado, manifesto consistente, mesmas hashes de instruções e `candidate_host_accepted=false`, e gera ZIP determinístico, SHA-256 e versão do próprio manifesto.

`tests/test_cs_web_flat_builder.py` exige **igualdade exata dos arquivos de Skills e referências, equivalência semântica dos manifestos JSON** entre cada arquivo da nova fonte e os `entries()` do builder histórico beta.8, mais reprodutibilidade byte a byte entre dois builds novos e resistência a manipulação. Não se deve apagar os construtores antigos até concluir os testes de rollback.

## Protocolo CUR08 / PC-04

O conjunto de prompts congelados fica em `trust/qualification/curation/cases-beta8.json`. O contrato de execução e rubrica estão em `host-protocol-v1.json`. O validador `scripts/qualify-cs-curation-host.py`:

- recusa declarar caso executado a partir de fixture sintética;
- exige **12 pares**, cada um com sessões e ambientes diferentes, resets, inventário e rastros completos;
- exige prompt e contexto idênticos por par, mesmo modelo, build, esforço e parâmetros;
- rejeita contaminação do controle com ferramentas, Skills ou menções ao CS Navigator;
- rejeita chamada de ferramenta nos casos nativos e alegação de leitura sem URI e hash da fonte;
- exige avaliações independentes e cegas, com critérios de fidelidade, correção, utilidade e segurança.

O validador informa no máximo `structurally_consistent_pending_independent_host_attestation`; JSON enviado por terceiros não prova sozinho que o host executou as chamadas ou que o avaliador foi independente. O gate de qualidade predefinido é diferença média de **pelo menos um ponto em 16**, sem regressão de segurança. Para 12 casos, esse é um critério de engenharia, **não significância estatística nem prova causal geral**.

## Instrução operacional de homologação

1. Validar PR, CI, ZIP canônico e testes do servidor (evidência de código).
2. Após merge, verificar endpoint Render e nova resposta `registry_status` após deployment. Se continuar devolvendo `development`, F3.2 não está operacionalmente encerrado.
3. Executar CUR08-01…12 em **novas conversas** com exportação completa de inventário/rastros. Não usar esta sessão de desenvolvimento como controle.
4. Executar doze pares A/B com modelo, configuração e conteúdo coincidentes; avaliação cega de respostas; calcular critérios.
5. Somente então revisar evidências em conjunto e alterar `candidate_host_accepted` por revisão humana documentada. Nunca mudar a flag para `true` com base em CI ou autoavaliação.

## Próximos riscos

- A URL do Registry atual continua sobre a branch `main` mutável; qualquer mudança do conteúdo sem manifesto coordenado será recusada pelo serviço — **fail closed**.
- O deploy Render está configurado com `autoDeployTrigger: checksPass`, mas a configuração no repositório **não comprova** que uma instância foi de fato atualizada.
- As consultas de registro são metadados apenas, não uma autorização de instalação/execução de Skills.
- Não há automação para conversar com o próprio ChatGPT de forma independente pelo plugin atual. Não fabricar testes ou usar um chat contaminado como controle.
- O UMNOO/Noem segue isolado, sem ponte ou transmissão de memórias/dados.

**Posicionamento:** CS Navigator é o canivete suíço para quem quer usar o ChatGPT ao máximo; o objetivo é tornar cada capacidade útil sem obrigar o usuário a conhecer o mecanismo. A marca não substitui provas de funcionamento.
