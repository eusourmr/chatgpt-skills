# CS Navigator Labs Web — beta.6: funcionamento natural

**Data:** 22/11/2026. **Candidato:** 0.20.0-beta.6. **Status:** fonte versionada e testes de pacote; comportamento do host sujeito a teste independente.

## Problema realmente identificado na fonte beta.5

1. O curador indicava um endereço fixo de Skill do plugin Labs portátil. No Web Labs, o espaço de nomes pode ser diferente; a execução real depende do URI anunciado pelo host.
2. O texto mandava inspecionar o inventário e o Registry ao começar novas conversas; isso é indevido para perguntas simples.
3. O contrato de saída induzia apresentação de mecânica e diagnóstico mesmo sem pedido, contrariando a curadoria discreta.
4. A beta.5 foi integrada ao GitHub, mas o plugin privado do usuário ainda estava na beta.4, provando que build e instalação são operações distintas.

## Ajustes aplicados

- Roteamento continua nativo primeiro. Skill só deve ser lida se materialmente necessária, pelo URI efetivamente listado no host.
- Diagnóstico do inventário apenas por solicitação explícita de auditoria; nenhuma chamada para tarefas triviais.
- Conversas comuns recebem diretamente a entrega esperada, sem relatório técnico. O estado de evidência aparece quando muda a decisão ou quando solicitado.
- Engenharia de prompts é silenciosa quando o usuário pede execução; prompt copiável apenas se esse for o pedido.
- Seis especialistas anteriores preservados, com seus conteúdos idênticos aos da beta.5; Registry app existente preservado.
- A infraestrutura de build GitHub Actions produz ZIP e SHA-256. O upload do plugin pessoal exige uma atualização separada.
- Versões 0.17, beta.4 e beta.5 são bases de regressão e rollback; evolução não deve ser artificialmente bloqueada.
- UMNOO permanece projeto independente, sem integração e sem compartilhamento de dados ou memória.

## Gates de validação

- **Fonte/CI:** hashes, seis Skills, app Registry preservado, ausência de MCP portátil e ZIP reproduzível.
- **Plugin pessoal:** verificar versão e lista dos arquivos após atualização com o Plugin Creator.
- **ChatGPT host:** em conversa nova observar tarefas simples nativas, roteamento material de engenharia/ABNT/revisão, prompt sob demanda, diagnóstico somente sob solicitação. A mera leitura de fonte ou atualização do plugin não comprova ativação automática universal.
- **Segurança:** nenhuma transferência de dados ao Registry em tarefas simples, nenhuma autorização presumida de ações conectadas.
- **Próximo:** F3.1/ROUTE-01 e 02 com rastros reais e F3.2 sobre publicação imutável do Registry.

## Limites

Alterar instruções de uma Skill não garante que o host a ative em toda conversa. CI testa bytes e regressões locais; teste real do modelo exige chamadas específicas e recibos. Se a beta.6 falhar, voltar à release beta.4 ou beta.5 disponível, sem tocar a produção estável.
