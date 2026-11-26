# CS Navigator Labs Web 0.20.0-beta.9 — versão privada de engenharia

**CS Navigator é o canivete suíço para quem quer usar o ChatGPT ao máximo.**

Esta versão incorpora o **ciclo CS-SQ-01** nas seis Skills existentes. O ciclo aplica quatro movimentos proporcionais: compreender a intenção, executar, avaliar os pontos materiais e corrigir apenas falhas identificadas. Cada Skill mantém critérios próprios de sua disciplina.

**Fonte central:** `skills/cs-navigator-labs/references/SEMANTIC_QUALITY_CYCLE.md`; registro estruturado em `skills/cs-navigator-labs/knowledge/semantic-quality-v1.json`.

**Continuidade:** mesmo app Registry (somente metadados), seis Skills; nenhuma permissão nova, instalação de Skill adicional ou conexão com UMNOO. A produção histórica 0.17.0 e a versão privada beta.8 são referências de regressão. O pacote é construído a partir da pasta canônica por `scripts/build-cs-web-labs-current.py`.

**Integridade:** manifesto SHA-256 de Skills e referências, testes automatizados, ZIP reproduzível e rollback. Construir ou instalar uma versão não comprova roteamento automático do ChatGPT nem ganho em comparação com o uso nativo. Esses critérios seguem pendentes de testes independentes.
