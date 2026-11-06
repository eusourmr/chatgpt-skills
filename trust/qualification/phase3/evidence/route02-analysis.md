# ROUTE-02 — ensaio de desenvolvimento, não aceite independente

Fonte do método efetivamente lida por `skills__read` nesta conversa; o recibo é uma transcrição do retorno observado, não uma exportação integral do host.

Falha observável: a busca A termina depois de B e sobrescreve os resultados recentes. Hipótese: ausência de identidade monotônica da chamada na implementação original. Teste refutável: resolver B antes de A e comparar estado e número de renderizações antes/depois da resolução atrasada.

Inspeção: `original.js`, `corrigido.js` e `eng01.test.cjs` do experimento ENG-01 existente. O código corrigido incrementa `ultimaBusca`, copia os filtros e verifica a identidade após `json()`, no `catch` e no `finally`. O caso A → B → A usa identidade da chamada, não só igualdade do filtro. Nenhum arquivo do experimento foi modificado nesta etapa.

Reprodução nesta etapa: Node v24.22.1; original falhou no teste de corrida selecionado (exit 1, ERR_ASSERTION, A substitui B); corrigido passou 7/7 (exit 0). TAPs completos e hashes constam no dossiê. São testes sintéticos locais sem rede, sem site de produção ou integração AP+.

Aplicação do método: sintoma → hipótese → contraste original/corrigido → regressão positiva e negativa → limites e reversibilidade. Os artefatos do ensaio são aditivos. Não há migração, credencial, API de produção ou mudança na linha 0.17.0.

Limitação de roteamento: o especialista foi selecionado deliberadamente para a tarefa de desenvolvimento; esta conversa já continha instruções e histórico CS. Isso não mede seleção automática ou economia de chamadas. ROUTE-01 e ROUTE-02 como testes em conversas novas continuam pendentes. O controle A/B não está disponível nesta sessão.
