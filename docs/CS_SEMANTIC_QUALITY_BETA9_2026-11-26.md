# CS Navigator Web beta.9 — qualidade semântica transversal

**Data:** 26/11/2026. **Versão candidata:** `0.20.0-beta.9`. **Objetivo:** incorporar conhecimento de avaliação de linguagem e qualidade de respostas às **seis Skills Web existentes**, sem criar outra Skill nem importar uma técnica de terceiros.

## O que foi implementado

O método **CS-SQ-01** é uma adaptação original de princípios gerais de engenharia de prompts e avaliação crítica:

1. **Compreender:** reconhecer a intenção real, público, contexto, permissões e evidência disponível.
2. **Executar:** entregar o resultado solicitado, usando apenas as Skills e ferramentas necessárias.
3. **Avaliar:** conferir fidelidade à intenção, correção factual, qualidade disciplinar e riscos pertinentes.
4. **Corrigir seletivamente:** revisar somente problemas encontrados, preservar conteúdo correto e parar quando a tarefa estiver satisfeita.

Esse ciclo não deve gerar raciocínios visíveis, relatório de ferramenta em tarefas simples ou chamadas desnecessárias. O efeito é **declarativo**, por instruções; não representa treinamento de pesos, autossupervisão independente ou memória persistente.

## Como cada Skill aplica

| Skill | Verificação especializada | Defeito a evitar |
| --- | --- | --- |
| `cs-navigator-labs` | escolha do menor método, disponibilidade efetiva e resultado | ferramentas e Skills invocadas sem necessidade |
| `academic-writing-labs` | tese, método, referência e conclusão | DOI, fontes, normas ou resultados inventados |
| `document-compliance-labs` | norma/edição/autoridade/trecho real | conformidade alegada sem evidência |
| `engineering-investigator-labs` | hipótese refutável, teste, regressão e rollback | confundir build e deploy com funcionamento |
| `text-integrity-labs` | sentido, voz, modalidade, números e dados | alteração substantiva sem aviso prévio |
| `ux-quality-gate-labs` | fluxo humano, acessibilidade, estados e recuperação | redesenho desnecessário e alegação de teste não feito |

O método também estará disponível nas decisões do curador quando outra Skill for descoberta; **isso não significa alteração dos arquivos das 79 competências catalogadas nem instalação automática das demais**. A integração física desta release é nas seis Skills do plugin privado.

## Contratos preservados

- Seis Skills Web; mesmo app Registry de metadados; sem MCP portátil extra e sem permissões novas.
- Regras de integridade textual e aviso antecipado a mudanças materiais.
- Resposta nativa para tarefas triviais; seleção proporcional de especialistas.
- Originalidade da redação: conhecimento reinterpretado e incorporado à curadoria, sem copiar prompts ou atribuir este protocolo a outra pessoa.
- UMNOO/Noem independente, sem troca automática de dados, memórias ou treinamento.

## Artefatos

- `plugins/cs-navigator-web-labs-current/skills/*/SKILL.md`: seis perfis atualizados.
- `skills/cs-navigator-labs/references/SEMANTIC_QUALITY_CYCLE.md`: guia transversal.
- `skills/cs-navigator-labs/knowledge/semantic-quality-v1.json`: registro estruturado.
- `QUALIFICATION-MANIFEST.json`: hashes SHA-256 atualizados e estado de host ainda não qualificado.
- `tests/test_cs_semantic_quality.py`: testes dos seis perfis e limites.
- `tests/test_cs_web_flat_builder.py`: compatibilidade da beta.8 e ZIP atual reproduzível.
- `scripts/build-cs-web-labs-current.py`: geração única do pacote, sem builders em cadeia.

## Critérios de homologação

**Aprovado apenas quando observado:**
- integridade de fontes e invariantes anteriores;
- ZIP reprodutível, seis Skills e Registry preservados;
- plugin pessoal atualizado e fonte relida.

**Ainda a medir:** execução efetiva em conversas independentes, qualidade em tarefas variadas e ganho contra ChatGPT nativo com controle isolado. O protocolo CUR08/PC-04 permanece aberto na issue #144. Não promover `candidate_host_accepted` a `true` sem estas evidências.

## Política de reversão

Manter a beta.8 privada como baseline verificável. Se a beta.9 causar verbosidade, sobreprocessamento, degradação de fidelidade ou falha de leitura no host, recuar à versão anterior. Toda melhora subsequente deve preservar a privacidade e reduzir, não aumentar, o trabalho do usuário.
