# CS Navigator Web Labs beta.7 — atualização instalada e necessidade de recarregamento

**Verificado em 23/11/2026.** O incremento UX/Text da beta.7 foi incorporado à `main` pela [PR #138](https://github.com/eusourmr/chatgpt-skills/pull/138). As sete validações de PR foram concluídas com sucesso, assim como a compilação na `main`. Artefato do GitHub Actions: [execução](https://github.com/eusourmr/chatgpt-skills/actions/runs/45143743736).

## Evidência de instalação pessoal

O plugin pessoal pré-existente `cs-navigator-web-labs` foi atualizado pelo Plugin Creator a partir da beta.6, sem trocar identidade nem visibilidade:
- Identidade: `plugins_6aee22530eb88191bed0e982d96d1218`
- Resultado: `status=updated`, `version=0.20.0-beta.7`
- Release confirmado: `pluginrel_6b0401ca1d088191b2a6e3434d900301`
- Escopo: `USER`, distribuição `PRIVATE`
- Nova fonte lida pelo Plugin Creator: 17 arquivos, **seis SKILL.md**, mesmo nome e app Registry registrado
- Foram lidos: `plugin.json`, `QUALIFICATION-MANIFEST.json`, as duas Skills aprimoradas, duas referências técnicas e `NOTICE-UX-SOURCES.md`
- Verificações verdadeiras: `0.20.0-beta.7`; UX com protocolo de refinamento; integridade textual com claim ledger; preservado alerta TEXT-02 anterior; documentação de créditos; nenhum arquivo MCP portátil extra

## Ressalva de host importante

Depois da atualização do plugin pessoal, uma chamada `skills__read` às URIs da UX Quality Gate Labs e Text Integrity Labs **na mesma conversa em andamento** ainda retornou o conteúdo antigo (sem os novos blocos). Isso **não invalida** a confirmação da fonte armazenada; comprova apenas que a versão usada pela leitura nesta sessão **não foi atualizada imediatamente**. Pode haver congelamento/cache por conversa, mas essa é hipótese operacional ainda não comprovada.

**Próximo teste:** iniciar conversa nova com o plugin beta.7 selecionado, consultar os arquivos pelo inventário real e verificar a presença dos títulos "Evidence-based visual refinement" e "Interface copy integrity" na saída de leitura. Então executar os casos UX-EXT/COPY-EXT do relatório comparativo, sem inventar o êxito da ativação automática. Não atualizar `candidate_host_accepted` até essa observação.

## Fonte externa / integridade

[Relatório de comparação](CS_UPSTREAM_UX_UNSLOP_2026-11-23.md). As fontes UI UX Pro Max (MIT) e Unslop de Damir Sokolovsky (CC BY 4.0) estão creditadas no `NOTICE-UX-SOURCES.md` empacotado. Nenhum script, catálogo proprietário, render, mecanismo de treinamento nem sétima Skill foi importado.

## Rollback e continuidade

Release anterior beta.6: `pluginrel_6b0372e76ec081918e37e755a69f6178`. Atualizações do plugin são ações explícitas e independentes do build GitHub. O UMNOO permanece projeto separado e não possui ponte nem compartilhamento automático.
