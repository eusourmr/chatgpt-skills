# SophIA 0.6: metodologia e limites

A aplicação usa apenas 14 templates editoriais no arquivo `assets/skill-index.json`, derivados de IDs válidos do CS Navigator. Todas as capacidades escolhidas têm **estado de evidência declarado `designed`** no registry examinado, e a forma de entrega é `registry_only`: não há instalação ou invocação automática.

A busca local é lexical por palavras e expressões, **não é inteligência semântica nem garantia de escolha perfeita**. Com correspondência insuficiente o resultado é nativo; empates relevantes mostram opções. Perguntas de urgência explicitamente reconhecidas interrompem a recomendação. O filtro não é abrangente e não serve como triagem médica ou de emergências.

O botão para a IA abre apenas a página oficial; não coloca perguntas confidenciais na URL e não transmite dados sem cópia e ação voluntária. A aplicação não tem API de IA, contas, tracking ou custos por token.

A geração de catálogo pelo GitHub Actions deve ser acrescentada/qualificada ao integrar `apps/sophia-web/` ao repositório; esta Alpha traz um **snapshot editorial versionado**, não um sincronizador automático. Não edite o índice de produção com conteúdos remotos sem revisão e testes.

A política de privacidade deve ser auditada novamente antes de lançamento público geral, inclusive recursos que a HostGator ou terceiros possam registrar como logs de acesso.
