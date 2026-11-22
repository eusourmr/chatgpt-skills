# CS Navigator Labs Web beta.5 — engenheiro contextual de prompts

**Data:** 22/11/2026. **Versão:** `0.20.0-beta.5` candidata. **Estado:** fontes e testes de pacote; execução semântica do host ainda depende de homologação. A beta.4 foi comprovada no HOST-03R e permanece uma referência para regressão. A versão de produção 0.17.0 não foi atualizada automaticamente.

## Direção do produto

O CS Navigator deve ser usado de forma natural no ChatGPT: o usuário conversa normalmente; o curador responde nativamente quando isso basta e especializa a tarefa somente quando agrega valor. A engenharia contextual de prompts é método transversal do curador; a nova versão **não acrescenta uma sétima Skill**, não demanda copiar um prompt quando o usuário solicitou execução, e não implanta modelo neural ou sistema de aprendizagem próprio.

As versões estáveis são **parâmetros de aperfeiçoamento e compatibilidade**, não impeditivos permanentes de evolução. A promoção deve seguir evidência de benefício, regressão e rollback; não está bloqueada por fidelidade a números históricos.

## Incremento da beta.5

O construtor `scripts/build-cs-web-labs-beta5.py` reutiliza a fonte congelada da Web beta.4 e aplica apenas um diferencial versionado em `plugins/cs-navigator-web-labs-beta5/`:

- metadados e instruções de entrada ajustados ao uso cotidiano;
- curador com três modos: **executar**, **criar prompt** e **revisar prompt**;
- preservação da intenção, dos números, da autoria e das permissões;
- método de leitura em `references/PROMPT_ENGINEERING.md`, sem Skill adicional;
- seis Skills e app Registry existente preservados, sem MCP portátil;
- manifesto de hashes recalculado para a candidata, ZIP reproduzível e SHA-256;
- testes `tests/test_cs_web_labs_beta5.py` e workflow de GitHub Actions.

O `runtime/prompt-contract.mjs` da PC-01 segue disponível como biblioteca estruturada, **não executada automaticamente** pelo plugin. A nova capacidade de linguagem utiliza o modelo do ChatGPT por meio de instruções declarativas. CI valida fonte e empacotamento, não inteligência ou generalização do curador.

## Distribuição e atualização com mínimo esforço

1. Cada PR e cada atualização pertinente mesclada à `main` executam `Validate CS Navigator Web Labs beta.5`; o workflow monta automaticamente o ZIP com checksum e o arquiva como artefato versionado. Também é possível dispará-lo manualmente quando necessário.
2. O administrador revisa integridade, testes e risco antes de incorporar à `main`. A beta.4 continua disponível como rollback.
3. Em ambiente que suporte **sincronização de marketplaces GitHub**, usar esse caminho após revisão das configurações de organização e da versão do plugin; sincronização nativa precisa ser comprovada no host.
4. Na conta sem sincronização, baixar o artefato do GitHub e atualizar o plugin privado pelo fluxo de edição suportado. Isso exige uma ação manual; um commit não atualiza a instalação por si só.
5. Apenas após teste em conversa nova, registrar evidência real de que o ChatGPT leu a nova fonte e aplicou o método. Não declarar atualização em nuvem nem disponibilidade universal sem este retorno.

## Qualificação a executar no host

Os oito cenários PC02-01 a PC02-08 estão em `plugins/cs-navigator-web-labs-beta5/PROMPT_ENGINEERING.md`. Verificar resposta simples sem chamada desnecessária, criação sem alegar execução, revisão com aviso prévio, investigação real quando solicitada, fontes não fabricadas, escopo de autorização, Skill não carregada e ausência da ponte UMNOO.

Necessário registrar, para cada cenário, entrada, estado das ferramentas, eventual leitura de Skill, saída e avaliação contra critérios previamente congelados. O desenvolvimento não afirma benefício comparativo com ChatGPT nativo; um teste A/B limpo permanece independente e só deve ser feito com controles realmente isolados.

## Marcos seguintes

- **F3.1 (P0):** prova independente ROUTE-01 e ROUTE-02, com rastros do host.
- **F3.2 (P0):** fixar revisão/publicação real do Registry em metadados verificáveis.
- **PC-02/03:** homologar o uso natural do curador no host, incluindo abstenção correta e prompts efetivamente úteis.
- **F3.3/4:** qualificar as três Skills do primeiro lote, com 12 testes e piloto de uso por terceiros.
- **F4:** definir um canal suportado de atualização mínima, autenticação adequada, rollback e distribuição.
- **UMNOO/Noem:** pesquisa futura independente. Nenhum dado, memória, token ou prompt é compartilhado; integrações futuras exigem consentimento específico, contrato interoperável, prova técnica, isolamento e desligamento.

## Reversão e limites

Nenhum arquivo de produção 0.17.0, Labs original beta.3 ou Web beta.4 é modificado. Se houver falha de host, remover a candidata beta.5 e retornar à beta.4. Sem testes reais do host, classificar a versão como **candidata técnica**, não como versão de desempenho comprovado.
