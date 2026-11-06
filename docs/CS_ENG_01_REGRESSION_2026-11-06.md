# ENG-01 — reproduzido, corrigido e reexecutado

**Data:** 06/11/2026  
**Projeto:** CS Navigator Labs, skill `engineering-investigator-labs`  
**Fonte:** ZIP enviado pelo usuário `investigacao-hospedagens.zip`; o ZIP completo não é publicado, apenas fontes sintéticas e testes de regressão.

## Evidência real independente

O usuário enviou um pacote com 7 arquivos (`README.md`, `correcao.diff`, `original.js`, `corrigido.js`, `regressao.test.cjs`, dois TAPs). O pacote foi inspecionado antes da execução: sem caminhos relativos perigosos; teste `node:test` trabalha em `vm`, com `fetch` e `render` simulados.

**ZIP SHA-256:** `7a186fba39d8680e6448c40287bdd5ae92c082ee43da0d93feca8c9b48a3b6a5`.

Reexecução independente com **Node v22.16.0**:
- Original: 1 teste selecionado; **falha reproduzida**, exit code 1, `ERR_ASSERTION`.
- Corrigido: **13/13 testes passaram**, exit code 0, 0 falhas/0 skips.
- As saídas TAP locais foram geradas separadamente das saídas TAP incluídas no ZIP. O registro JSON contém seus hashes.

Os 13 testes comprovam o comportamento do **exemplo isolado**, não um teste do site real. O relato do usuário indica execução anterior em Node 24.22.1; esta auditoria confirmou diretamente Node 22.16.0. A workflow CI proposta deve repetir uma suíte reduzida em Node 22 e 24.

## Análise do patch

O problema é uma *race condition*: respostas antigas escrevem em `resultados`, `erro` e `carregando` compartilhados.

A alteração incremental `ultimaBusca` identifica cada chamada. A guarda após `await resposta.json()` é necessária porque o parse/leitura do corpo também pode terminar depois da busca atual. Guardas em `catch` e `finally` impedem publicação de erros e encerramento indevido do estado. Limpar resultados e copiar filtros evita associações enganosas, mas são decisões de interface adicionais (não exigidas pela concorrência em si).

**Limites:** sem aborto de rede, sem descarte no unmount, sem validação de múltiplas instâncias de tela, sem teste real de API/navegador, sem integração com o AP+ Eventos. A cópia de filtros é superficial e pressupõe apenas a propriedade primitiva `cidade`.

## Estados honestos

`uploaded_zip_examined=true`; `synthetic_bug_reproduced=true`; `thirteen_tests_passed_on_node22=true`; `host_tool_invocation_in_other_chat_observed=false`; `real_app_tested=false`; `eng_skill_promoted=false`.

A qualidade dessa entrega supera uma proposta textual não executada: há reprodução adversarial real. **Não** é justificativa para promover a skill a `host-qualified` sem confirmar seleção/execução no host, testes negativos e resultado comparado com a alternativa nativa.

## Replicar em CI

```sh
cd experiments/engineering-investigator/eng01
node --test --test-reporter=tap eng01.test.cjs
HOSPEDAGENS_IMPL=original node --test --test-reporter=tap \
  --test-name-pattern="B vence A atrasada sem mudar estado ou renderizações" eng01.test.cjs
```

A última linha **deve falhar**, reproduzindo o comportamento do original. O workflow exige que isso aconteça, evitando aprovar testes que não conseguem detectar a regressão. O conjunto de 7 testes do repositório é um recorte de CI; **não** deve ser confundido com os 13 testes do arquivo original enviado.

## Próximo gate

Exigir casos para cancelamento, desmontagem e integração real quando houver controlador implementado. Separadamente, testar `engineering-investigator-labs` com um caso em que a skill **não** é necessária e um caso de fabricação de execução, e registrar os logs/identidade do host. A promoção da skill exige essa evidência e revisão humana.
