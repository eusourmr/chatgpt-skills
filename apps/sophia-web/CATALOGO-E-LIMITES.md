# SophIA 0.7: metodologia e limites

A aplicação usa apenas 14 templates editoriais no arquivo `assets/skill-index.json`, derivados de IDs válidos do CS Navigator. Todas as capacidades escolhidas têm **estado de evidência declarado `designed`** no registry examinado, e a forma de entrega é `registry_only`: não há instalação ou invocação automática.

A busca local é lexical por palavras e expressões, **não é inteligência semântica nem garantia de escolha perfeita**. Com correspondência insuficiente o resultado é nativo; empates relevantes mostram opções. Perguntas de urgência explicitamente reconhecidas interrompem a recomendação. O filtro não é abrangente e não serve como triagem médica ou de emergências.

O botão para a IA abre apenas a página oficial; não coloca perguntas confidenciais na URL e não transmite dados sem cópia e ação voluntária. A aplicação não tem API de IA, contas, tracking ou custos por token.

A geração de catálogo pelo GitHub Actions deve ser acrescentada/qualificada ao integrar `apps/sophia-web/` ao repositório; esta Alpha traz um **snapshot editorial versionado**, não um sincronizador automático. Não edite o índice de produção com conteúdos remotos sem revisão e testes.

A política de privacidade deve ser auditada novamente antes de lançamento público geral, inclusive recursos que a HostGator ou terceiros possam registrar como logs de acesso.

A orientação de continuidade não acessa a conversa no ChatGPT/Gemini, apenas o texto que a pessoa digitar ou colar. O navegador/SO controla abertura de links no aplicativo instalado.


## Limite da curadoria Alpha 0.8

O motor é determinístico/lexical com padrões de linguagem: não usa embeddings, modelos ou APIs. Os 14 métodos têm proveniência editorial e estado `designed`; não afirmar que foram executados nem que a qualificação humana ocorreu. Quando o mecanismo não atinge evidência suficiente, permanece em modo direto. `tests/intent-cases.json` contém 116 cenários rotulados no desenvolvimento e não se confunde com avaliação humana independente.

## Alpha 0.9: aprendizado limitado ao navegador

O novo ciclo **não aprende semanticamente**, não treina modelos e não comprova resultados. Feedback é relato voluntário. O perfil persistente exige opt-in, contém apenas estilo e contadores limitados a 5 por método, e somente desempata dois métodos já plausíveis. Dados do pedido e respostas de outros sistemas nunca são persistidos por esta extensão. Não enviar telemetria.

## Alpha 0.9.5 — atualização governada

A opção deliberada é carregar o catálogo do mesmo domínio, com verificação SHA-256 contra manifesto e comparação com baseline imutável embutida no aplicativo. Não acessamos CDN de terceiros em nome dos visitantes. Não integramos automaticamente nenhuma das outras entradas apenas descobertas no registry. Métodos não previamente aprovados exigem PR com nova curadoria, testes, análise de segurança e uma nova aplicação. A checagem de hash não protege contra comprometimento do próprio servidor; mantém consistência de release, detecta atualização parcial e permite recuo à cópia segura.
