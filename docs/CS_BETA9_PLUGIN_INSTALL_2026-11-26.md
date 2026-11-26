# CS Navigator Web Labs beta.9 — instalação privada confirmada

**Data:** 26/11/2026. **Status:** plugin privado atualizado e fonte conferida. **Não equivale à homologação de roteamento automático em qualquer conversa.**

## Implementação

A versão `0.20.0-beta.9` foi incorporada ao GitHub pela [PR #145](https://github.com/eusourmr/chatgpt-skills/pull/145) com testes automatizados aprovados. O [workflow canônico da `main`](https://github.com/eusourmr/chatgpt-skills/actions/runs/45809618092) gerou o ZIP e confirmou seu SHA-256 e estrutura.

O pacote foi derivado do artefato CI, conferido e normalizado para a raiz do plugin. A comparação com a beta.8 demonstrou **10 arquivos anteriores modificados** (seis SKILL.md e quatro arquivos de versão/manifesto/README), **dois novos arquivos** de referência e registro semântico, e todos os demais arquivos preservados. A fonte do plugin mantém o vínculo `.app.json` idêntico.

- Versão instalada: **0.20.0-beta.9**.
- Identificador da instalação pessoal: `plugins_6aee22530eb88191bed0e982d96d1218`.
- Release conferida: `pluginrel_6b08162e0b748191ab234f0e0b2a1b90`.
- Escopo e visibilidade: `USER / PRIVATE`.
- Arquivos lidos no Plugin Creator: **21**.
- Skills existentes: **6/6**, todas com o marcador `CS-SQ-01`.
- Registro estruturado: `cs.semantic-quality.v1` com os seis perfis e revisão de intenção/qualidade/correção seletiva.
- Manifesto: `version=0.20.0-beta.9`, 15 arquivos de Skills/referências com SHA-256 e `semantic_quality_host_cases_executed=0`.
- `candidate_host_accepted=false`, `umnoo_integration=disabled_not_integrated`.
- Nenhuma referência nominal de terceiros foi incluída nos novos textos da beta.9.

## Conteúdo do aprimoramento

**Compreender → Executar → Avaliar → Corrigir seletivamente** foi incorporado como método original e proporcional da curadoria. Cada Skill mantém sua especialização: curadoria, escrita acadêmica, normas documentais, engenharia, integridade textual e UX. A medida do ganho deve ser a conclusão melhor da tarefa do usuário, não a quantidade de passos adicionais.

## Evidência e limites

Esta execução comprovou integridade do código/pacote, atualização da release e leitura dos arquivos armazenados na conta. Não comprovou que um novo chat usou cada uma das Skills automaticamente, nem que os resultados superaram um controle ChatGPT nativo isolado.

Os doze casos F3.1/CUR08 e o comparativo PC-04 continuam em [issue #144](https://github.com/eusourmr/chatgpt-skills/issues/144). Regressões de fonte/CI não substituem avaliação humana independente do comportamento.

## Rollback

Versão privada anterior `0.20.0-beta.8`, release `pluginrel_6b0436ff1c34819182ab0d1240d72617`, com pacote ZIP previamente preservado. Retornar à versão anterior apenas se houver falha real, preservando a identidade e o Registry. A linha estável GitHub `0.17.0` permanece separada.

**Posicionamento:** CS Navigator é o canivete suíço para quem quer usar o ChatGPT ao máximo — utilizando o menor caminho útil, com privacidade, rastreabilidade e sem alegar capacidades ainda não demonstradas.
