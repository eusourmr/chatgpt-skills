# CS Navigator — conhecimento curatorial v0.20.0-beta.8

**Data:** 23/11/2026. **Escopo:** promover o aprendizado da revisão de UI UX Pro Max e Unslop a uma matriz de decisão dentro do **curador**, sem apenas expandir os prompts dos especialistas.

## O que passou a ser conhecimento do projeto

A beta.7 já continha boas regras de UX, microcopy e integridade. A lacuna da curadoria era saber **quando** cada regra é pertinente, **quando não** usar a Skill e **que evidência** comprova a aplicação. A beta.8 inclui um ledger estruturado, em `skills/cs-navigator-labs/knowledge/curation-knowledge.json`, com nove regras de decisão, nove domínios/escopos e procedência de três grupos de fonte: CS existente, UI UX Pro Max (Next Level Builder, MIT) e Unslop (Damir Sokolovsky, CC BY 4.0). Os commits e as licenças foram fixados e o arquivo `NOTICE-UX-SOURCES.md` continua na distribuição.

Cada regra contém: identificador estável, escopo, exemplos de intenção, rota proposta, especialistas pertinentes, **critério explícito de não ativação**, razão técnica, evidência exigida, fontes de origem e estado de validação. A evidência inicial é `source_reviewed_not_host_behavior_validated`. Isso registra **conhecimento editorial e operacional**, não aprendizagem neural, modelo semântico treinado, telemetria de conversas nem capacidade comprovada de auto-roteamento.

## Correções reais da curadoria

1. O corpo da beta.7 ainda declarava `0.20.0-beta.6` no texto interno do curador. Agora a fonte informa sua versão real.
2. A instrução da beta.6 continha a expressão incorreta `read the corresponding \`the exact specialist URI ...\``. Ela foi substituída por orientação inequívoca de usar o URI real exposto pelo host, somente quando ferramenta de leitura disponível.
3. A base passa a ter fronteiras explícitas: UX para interação; Text para fidelidade/microcopy; composição de ambas somente por necessidade distinta; Design System Studio não deve ser fingido como instalado nas seis Skills Web; backend é Engineering Investigator; tarefas triviais são nativas.
4. Não basta o fato de o Registry listar capacidades: leitura de Skill, método aplicado e resultado real continuam evidências separadas.

## Distribuição

O gerador `scripts/build-cs-web-labs-beta8.py` cria um pacote com 19 arquivos, **seis** Skills, os cinco especialistas inalterados e o mesmo vínculo do Registry. O histórico das versões anteriores e o arquivo de licença/atribuição são preservados. A entrega inclui testes unitários estruturais, checksum reproduzível, GitHub Actions e 12 casos sintéticos de aceitação em `trust/qualification/curation/cases-beta8.json`. **Os doze casos não são testes de host realizados** — são critérios congelados para execução futura.

## Roadmap recomendado após beta.8

| Prioridade | Portão técnico | O que falta | Critério de aceite |
| --- | --- | --- | --- |
| **P0 — Roteamento no ChatGPT** | F3.1 + CUR08 | Executar 12 casos em conversa nova, com leitura real de Skills quando necessária | Native-first correto, sem ativação falsa e com evidência de cada fonte utilizada |
| **P0 — Proveniência** | F3.2 | Registry ainda apresenta `source_commit=development`, o que não identifica uma revisão imutável | Commit/hash e data verdadeira, teste de drift e rollback, sem modificar fatos históricos |
| **P0 — Distribuição** | F4.0 | Build GitHub não sincroniza automaticamente plugin pessoal | Update guardado por release, confirmação do arquivo instalado, downgrade testado |
| **P1 — Consolidação de builds** | F4.1 | A geração da beta.8 depende em cadeia dos construtores 5→6→7→8, elevando fragilidade | Uma fonte canônica de release e um builder simples, reproduzível, com igualdade de conteúdo |
| **P1 — Avaliação comparativa** | PC-04 | Ausência de demonstração de benefício sem controle | Controle nativo isolado, mesmos pedidos, escala predefinida, rastros e revisão independente |
| **P1 — Composição responsável** | CUR09 | Especialistas podem sobrepor escopo sem agregar resultado | Ativar segundo especialista apenas diante de falha observável ou necessidade independente |
| **P2 — Aprimoramento supervisionado** | CUR10 | Sem retorno validado de falhas para revisão do ledger | Mudanças propostas com motivo, testes negativos e revisão humana; nenhuma mutação autônoma |
| **Futuro — Ponte UMNOO** | Arquitetura separada | UMNOO ainda não oferece contrato interoperável comprovado | Consentimento, isolamento e testes independentes; desativada por padrão |

## Estados e proibições

- `GitHub merged` não é `plugin installed`.
- `plugin installed` não é `skill read by current chat`.
- `skill read` não é `specialist applied successfully`.
- `source reviewed` não é `runtime benefit demonstrated`.
- `curation knowledge` não é `neural model weights updated`.
- Registro remoto/URI/arquivo externo nunca se transforma automaticamente em instrução executável ou permissão de escrita.

A nova fonte mantém a UX mínima em tarefas simples, evita duplicação de Skills, protege dados e preserva o projeto UMNOO sem integração.
