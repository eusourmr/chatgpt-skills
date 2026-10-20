# CS Navigator 0.18.0 — Capability Delivery & Proof of Value

**Estado:** linha de desenvolvimento; **não lançada**.  
**Base pública/privada preservada:** CS Navigator 0.17.0. O plugin enviado à OpenAI continua sujeito à revisão e não é alterado por este PR.

## Problema que esta versão resolve

A 0.17 permite encontrar capacidades e seus metadados. Isso não significa que suas instruções tenham sido carregadas ou executadas pelo ChatGPT. A 0.18 introduz o **Capability Fulfillment Contract** para que o produto não prometa uma execução inexistente.

Estados separados, **não intercambiáveis**:

1. **Discovered:** o registry encontrou metadados.
2. **Bundled core:** a capacidade consta no pacote de seis skills; ainda não comprova instalação no host.
3. **Host available:** host confirmou disponibilidade, se oferecer tal evidência.
4. **Invoked:** execução concreta comprovada por rastro da ferramenta/host.
5. **Outcome:** usuário confirmou ou demonstrou o resultado conforme critério previamente definido.

O MCP não tem como atestar os níveis 3–5 apenas consultando GitHub; a 0.18 deve responder com campos explícitos `host_activation_verified:false` e `execution_verified:false` até surgirem evidências apropriadas.

## Inovação funcional: assess_capability_delivery

Nova ferramenta MCP **somente leitura**, que recebe um ID de capacidade (máximo de 128 caracteres) e responde:

- `found` e `delivery_state`: `bundled_core`, `registry_only` ou `not_available`;
- `evidence_state`, `qualification_state`, `freshness_state` e `known_gaps` sem promoção artificial;
- `host_activation_verified:false`, `execution_verified:false`, `next_action` e `boundary`.

A ferramenta não instala skills, não solicita credenciais, não executa arquivos do GitHub e não autoriza ações externas. `bundled_core` refere-se ao manifesto esperado, **não a uma verificação da instalação do usuário**.

**Próxima etapa de integração:** incorporar o gate ao núcleo curator e manter os arquivos canônicos e distribuídos idênticos. Esse ajuste só será feito ao preparar e qualificar o pacote 0.18, com fallback para hosts que ainda não ofereçam a ferramenta.

## Aprimoramentos e revisões

- **Roteamento mais fiel:** a próxima ação deve estar disponível, ou a limitação precisa ser declarada.
- **Segurança:** IDs excluídos ou ausentes não devem ser expostos como capacidades executáveis. Sem contorno por renomeação.
- **Regressões:** garantir invariantes de read-only, nomes de ferramentas, tipagem, estados de evidência e ausência de promessas de execução.
- **Continuidade:** não alterar o ZIP 0.17 submetido; promover 0.18 somente com nova qualificação, nova submissão e conformidade do host.

## Proof of Value — teste humano proposto

Antes de chamar a 0.18 de útil e recomendável, realizar pilotos voluntários em três tipos de tarefa:

1. **Aprendizagem:** lembrança e aplicação em exemplos inéditos, depois de intervalo de revisão.
2. **Escrita acadêmica:** escolha de norma aplicável, detecção de erro real, ausência de referências inventadas.
3. **Problemas cotidianos não sensíveis:** decisão acionável, clareza do passo seguinte, conclusão observada.

Comparar com ChatGPT nativo sem exigir o Navigator. Critérios: qualidade avaliada por rubrica, erros, passos até conclusão, tempo e autonomia percebida. Preservar consentimento e não coletar conversas sensíveis como telemetria padrão. Medir também casos em que **o Navigator deveria se abster**; não premiar ativações desnecessárias.

As métricas serão resultados observados, não números de marketing. Não marcar piloto como `tested` antes de executá-lo e registrar cenário, ambiente, data, referência imutável e resultados.

## Gates para promoção e release

- [ ] Build TypeScript e testes automatizados do novo contrato verdes.
- [ ] Revisão de segurança, privacidade e bloqueios de saúde verde.
- [ ] Validação de regressão das quatro ferramentas 0.17 e do novo quinto contrato.
- [ ] Inventário exato e SHA-256 do novo ZIP, manifesto 0.18 e evidências aderentes ao pacote final.
- [ ] Testes semânticos **nativos no ChatGPT** com registro de chamada MCP e comportamentos negativos.
- [ ] Metadados de proveniência do registry corrigidos: `source_commit: development` não serve como prova imutável.
- [ ] Compatibilidade, disponibilidade do Render e procedimento de rollback documentados.
- [ ] Submissão/atualização pública somente depois de verificar o estado da versão em análise e os novos requisitos da plataforma.

**Limites:** esta PR de fundação não altera automaticamente o plugin privado/publicado nem comprova nenhum resultado de usuário. O GitHub pode hospedar candidatos de desenvolvimento sem torná-los releases.
