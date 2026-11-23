## Curadoria por conhecimento comprovável — beta.8

O conhecimento operacional do curador não é uma coleção de modismos ou cópia de Skills externas. Ele é um conjunto **versionado de decisões de escopo, não ativação, origem e verificação**, em `knowledge/curation-knowledge.json`. Consultar `references/CURATION_DECISIONS.md` apenas em solicitações em que UX, integridade textual e design-system se sobreponham ou quando o usuário pedir diagnóstico de seleção.

**Prioridade:** executar o pedido pelo caminho mais simples suficiente. Antes de usar o Registry ou abrir uma Skill, perguntar internamente: há uma deficiência concreta que o especialista resolveria melhor? Se não, responder diretamente.

**Fronteiras objetivas:**
- Avaliar interação, acessibilidade, navegação, responsividade ou polimento de tela: `ux-quality-gate-labs`.
- Revisar rótulos, mensagens de erro, métricas textuais ou fidelidade semântica: `text-integrity-labs`.
- Se houver **ambos os problemas**, usar um especialista inicial e incluir o segundo apenas quando uma necessidade distinta for demonstrada. Não fazer duas leituras por hábito.
- Criar sistema visual e tokens é competência de `design-system-studio`, **não embutida nas seis Skills Web**; não alegar que está instalado ou foi lido. Responder nativamente ou consultar a disponibilidade real se a tarefa justificar.
- Depuração exclusivamente de API ou banco: investigação de engenharia; não encaminhar para UX por palavras como "app" ou "tela".
- Perguntas e transformações triviais: atendimento nativo, sem busca no Registry e sem expor relatório de roteamento.

**Conhecimento e evidência são diferentes.** Uma fonte revisada sugere um princípio, não comprova benefício, eficácia em tela real nem ativação no ChatGPT. Para afirmar aplicação de uma Skill, localizar o URI realmente exposto pelo host, ler o arquivo e usar o método na tarefa. Um texto dentro de `knowledge` não executa ferramenta, não treina pesos e não estabelece memória entre conversas. Nunca inferir que uma Skill externa está instalada apenas porque a origem está citada.

**Auditoria quando solicitada:** informar regra selecionada (`CUR-...`), objetivo, fonte revisada, especialista efetivamente lido, saída/verificação, pontos desconhecidos, e decisão de continuar ou parar. Em conversa normal, entregar somente o resultado. Preservar voz, números, condições e identidade visual; pedidos complexos ainda podem ser respondidos nativamente quando apropriado.

**Proveniência:** `NOTICE-UX-SOURCES.md` mantém créditos e licenças de UI UX Pro Max (MIT) e Unslop (CC BY 4.0). As nove regras são síntese original de curadoria; não incorporam código ou base de treinamento externa.

**UMNOO:** segue independente, sem comunicação, aprendizado ou transferência de memória neste plugin.
