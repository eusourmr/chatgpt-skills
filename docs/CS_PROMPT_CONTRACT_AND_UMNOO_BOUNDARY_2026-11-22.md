# CS Navigator — Contrato de prompt e fronteira UMNOO (22/11/2026)

**Estado:** experimento de desenvolvimento `PC-01`; nenhum plugin de produção foi modificado, nenhuma nova versão foi anunciada e nenhuma habilidade foi promovida. A SophIA tornou-se a linha **UMNOO / Noem**, projeto independente. Não retomá-la como módulo do CS Navigator. Integração entre ambos: **não implementada, não autorizada por padrão e sem prazo assumido**.

## Decisão arquitetural
O **CS Navigator** usa a capacidade cognitiva do ChatGPT existente para curar competências e estruturar melhores instruções, com a menor complexidade necessária. A engenharia contextual de prompts é **capacidade transversal**, não uma nova Skill anunciada nem um suposto modelo neural próprio. O **UMNOO** segue arquitetura e roadmap independentes até demonstrar, com testes, raciocínio e aprendizagem próprios. Não reutilizar resultados do ChatGPT como prova de aprendizagem do UMNOO.

## Entrega PC-01: biblioteca executável limitada
`runtime/prompt-contract.mjs` exporta `compilePromptContract({task, mode?, route?, context?, constraints?, success_criteria?, skill_id?})`. É uma função **determinística e sem I/O**, que produz o envelope de trabalho e indicadores de evidência explicitamente **não verificados**. Não classifica intenção, não seleciona nem lê Skills, não consulta Registry, não usa MCP, não executa prompts, não autoriza ações e não guarda dados.

- Modos: `execute`, `create-prompt` e `review-prompt`.
- Rota padrão: `unselected`; o chamador pode propor `native`, `specialist` ou `connected-action`, mas isso **não comprova execução ou autorização**.
- `skill_id` é um **candidato** válido somente com `route=specialist`; não comprova disponibilidade, leitura ou aplicação.
- `state=prepared_not_executed`; `skill_file_read=false`, `mcp_invoked=false`, `outcome_verified=false`, `connected_action_authorized=false`.
- `umnoo_bridge=disabled_not_integrated`; não há comunicação ou memória cruzada.
- O texto do usuário é preservado como dado citado em JSON, não como instrução de autoridade. Isso **não elimina sozinho** risco de injeção de prompt; controles do host seguem obrigatórios.
- Não registrar entrada/saída privada na telemetria por padrão. O consumidor deve tratar `prompt` como informação potencialmente sensível.

Exemplo local, sem rede:
```js
import { compilePromptContract } from "./runtime/prompt-contract.mjs";
const draft = compilePromptContract({
  task: "Investigue por que uma sessão PHP expira no Android sem quebrar os demais fluxos.",
  route: "specialist",
  skill_id: "engineering-investigator-labs",
  constraints: ["Não alterar credenciais", "Não publicar sem regressões"],
  success_criteria: ["Reprodução do defeito", "Teste de regressão executado"]
});
console.log(draft.state); // prepared_not_executed
```

**Teste reproduzível:** `node --test tests/test_prompt_contract.mjs` (Node >=20). O comando passa a integrar `npm run validate`. Os testes são **unitários do compilador**; não são testes de host, de inteligência semântica, de superioridade frente ao ChatGPT nativo nem de integração no UMNOO.

## Como chegar a uma função real do plugin
1. **F3.1**: ROUTE-01/02 com rastro completo no host, incluindo abstenção nativa correta.
2. **F3.2**: proveniência imutável do Registry, sem alterar datas históricas para aparentar atualização.
3. **PC-02**: avaliação cega de preservação de intenção, ambiguidade, alucinação de ferramentas e sobre-roteamento; benchmark contra ChatGPT nativo com controle limpo.
4. **PC-03**: integração opt-in ao curador Web apenas após compatibilidade do host, sem publicar nova Skill duplicada; rollback para modo nativo.
5. **PC-04**: testar desempenho e utilidade por terceiros antes de promover ou distribuir.

## Ponte futura possível, desativada
O contrato estruturado poderá um dia ser exportado por adaptador **separado**, versionado, com consentimento específico, redator de dados pessoais, permissão por finalidade e desligamento imediato. Os dois produtos **não compartilham automaticamente** prompt, memória, pesos, credenciais ou dados de usuários. Antes de qualquer ponte, exigir compatibilidade de esquemas, testes de isolamento, evidências de benefício real e reversão. Um contrato exportado não equivale a raciocínio ou aprendizagem do UMNOO.

## Critérios de aceitação e limites
PC-01 só pode ser chamado de *biblioteca de desenvolvimento* se o código for testado e revisado. Não confundir a passagem de testes locais com host instalado ou aplicação em produção. Permanecem intactos CS Navigator 0.17.0, Labs Web 0.20.0-beta.4, Registry, 48 drafts, histórico de evidência, releases e permissões. Mudanças em plugin, ativação automática, distribuição ou qualquer conexão ao UMNOO precisam de revisão e testes próprios.
