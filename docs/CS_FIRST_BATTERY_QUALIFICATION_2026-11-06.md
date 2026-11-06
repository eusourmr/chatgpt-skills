# CS Navigator Labs — Primeira bateria de qualificação (2026-11-06)

## Escopo e decisão

**Estado da avaliação:** resultados positivos em vários pilotos, **não** homologação integral nem demonstração causal de que o plugin melhora qualquer modelo nativo. A skill `academic-writing-labs` passou no ACADEMIC-01 em seis critérios de redação científica responsável, conforme `trust/qualification/pilots/academic-01-source-integrity-2026-11-06.json`.

O ChatGPT do revisor acessou os arquivos `SKILL.md` de skills instaladas; isso confirma acessibilidade **nesta sessão revisora**. A execução em sessões que produziram respostas fornecidas pelo usuário não foi auditada por rastreio de ferramentas e versão do host. A plugin privada `0.19.0-alpha.2` não possui MCP próprio; habilidade de curadoria conversacional não é garantia de ativação automática especializada.

## Matriz de evidências e maturidade

| Competência | Pilotos | Comprovação efetiva | Limite / pendência |
| --- | --- | --- | --- |
| UX/UI Pro / Design Cognition | UX-01, UX-03, UX-04 | Boa resposta de jornada, recusa de alegação falsa, resposta trivial concisa | UX-02 sem A/B pareado; sem interface real, participantes ou certificação WCAG |
| Investigação de engenharia | ENG-01, ENG-02 | Corrida sintética reproduzida; 13 testes fornecidos reexecutados em Node 22; 7 casos de CI em Node 22/24; release gate respeitado | Sem integração ao AP+ Eventos nem prova de mudança de produção |
| Integridade textual PT-BR | TEXT-01, TEXT-02, TEXT-02R | Preservou invariantes; falhou inicialmente ao apresentar texto adulterado antes do aviso; resposta de novo teste começou com alerta | Eficácia da versão `0.19.0-alpha.2` em sessão produtora ainda sem rastreio da versão efetivamente carregada |
| Conformidade ABNT | ABNT-01, ABNT-02 | Detectou anos e referência ausente; questionou alegações falsas; trechos da NBR 6022:2018 foram conferidos em fonte universitária | Sem manuscrito real, manual de periódico, texto completo das demais normas ou homologação ABNT |
| Escrita acadêmica | ACADEMIC-01 | Resumo/proposta sem inventar N=120, +38%, parecer ético ou DOI | Sem revisão editorial humana, estudo executado ou comparação com modelo nativo |
| Curadoria / roteamento | Host listing e UX-03 | Seis skills do laboratório identificadas e acessadas por leitura em sessão revisora; resposta simples não virou workflow desnecessário | Ativação automática sem seleção explícita ou rastreio e benefício adicional não demonstrados |

**Classificação indicada:** `conversationally_reviewed` para os pilotos de respostas, `independently_reproduced_synthetic_regression` para ENG-01, `host_read_accessible_in_reviewer_session` para habilidades instaladas. Nenhum desses estados equivale automaticamente a `tested_in_live_application`, `production_ready` ou `catalog verified`.

## ACADEMIC-01 — lições

A resposta fornecida pelo usuário apresentou título, resumo em futuro/proposta e palavras-chave. Tratou diagnóstico, oficinas e instrumentos como plano, não como dados coletados; explicitou ausência de participantes recrutados, resultados, aprovação ética e fontes. Não criou DOI ou referência falsa. A menção a contribuições esperadas foi prospectiva e não resultado demonstrado.

**Status:** 6/6 critérios de integridade textual atendidos. Sem inferência de uso real de ferramenta na sessão produtora.

## Próximo gate de alto valor: HOST-01 / A-B de roteamento

A sequência anterior acumulou avaliações de respostas, mas ainda tem lacuna de rastreabilidade. Para fechar essa lacuna, executar em uma **conversa nova com CS Navigator Labs selecionado**, deixando o host realizar leituras quando estiverem disponíveis:

1. Solicitar `skills__list` e `skills__read` do `cs-navigator-labs` e especialista `engineering-investigator-labs` usando recursos do host, com URIs e versão efetivamente retornadas. **Não considerar uma frase autorrelatada como prova de chamada.** Exportar rastreio, quando a interface permitir, ou usar o próprio retorno do host em revisão.
2. Dar um problema de engenharia sintético novo e documentar código, hipótese, execução e artefato. A skill deve distinguir qual arquivo foi realmente carregado e qual ferramenta executou a reprodução.
3. Rodar prompt **idêntico** em conversa sem o plugin, sob configuração de modelo e contexto equivalentes. Avaliar por rubrica cega, diferenciando completude, precisão, falsos positivos e custo de intervenção. O UX-02 anterior não constitui par pareado válido.
4. Só mudar o status de ativação/benefício após provas correspondentes, revisão independente e autorização de alteração no catálogo.

Não exigir do usuário fornecer segredos, APIs privadas ou dados reais. Para artefato sintético, a instrução deve dizer explicitamente "proposto" quando nada foi executado.

## Próxima etapa de catálogo: 48 drafts

A campanha `trust/qualification/draft-behavior-scenarios-v1.json` contém 48 cenários positivos, 48 negativos e 48 adversariais **planejados**; não se devem promover `draft` por aprovação dos prompts, existência em GitHub ou instalação de seis skills adaptadas de laboratório. Recomenda-se qualificação por lotes pequenos, começando pelas skills cujo escopo e evidências podem ser auditados com os recursos disponíveis, sem dados pessoais.

## Não alterado

- Nenhuma skill do catálogo foi promovida.
- O plugin CS Navigator de produção `v0.17` não foi modificado.
- O plugin privado `CS Navigator Labs v0.19.0-alpha.2` não foi atualizado neste PR.
- Nenhum teste em usuários, software real, aprovação ética ou certificação ABNT/WCAG foi criado por este registro.
