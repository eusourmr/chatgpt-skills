# SophIA 1.1.0 — Experiência Fluida (candidata)

**Base:** versão 1.0.0 estável corrigida, PR #100 integrado à main.

## Entregas
- Orientação proporcional e *determinística*: sugestões locais de formato **curto, equilibrado ou aprofundado**, com prioridade a solicitações explícitas de concisão/profundidade; respeita a escolha manual e preferências salvas previamente mediante consentimento. Não interpreta semanticamente nem faz ML.
- Menos perda de trabalho: após a pessoa editar manualmente o texto preparado, mudanças posteriores de formato/método aguardam ação explícita **Aplicar mudanças**; o conteúdo original permanece até a confirmação.
- Uma linha discreta no resultado explica a sugestão de formato, sem nova tela ou menu.
- Política de privacidade corrigida para remover a referência a `intent://` Android, que já não é usado desde o hotfix da 1.0.
- PWA cache e manifesto, índice/base aprovada, catálogo e checksums versionados para 1.1.0.
- Links HTTPS oficiais, fluxo de dois toques para copiar e abrir, sem prompts em URLs nem integrações pagas **inalterados**.

## Evidências
- Testes Node incluem os novos cenários de proporcionalidade, edição, privacidade, catálogo, handoff e versão.
- Não foram executados testes físicos desta build. Testar iOS e Android, teclado e modo avião em beta.
- Curadoria dos 14 métodos e regras de roteamento inalteradas. Hash SHA-256 não equivale a assinatura do servidor. Logs técnicos da hospedagem continuam possíveis.

## Homologação
1. Fazer backup da 1.0 e dos cabeçalhos da hospedagem.
2. Descompactar ZIP público em `https://sophia.meuapoio.com/beta/`.
3. Testar pedido curto, extenso, ambíguo e urgente; escolher manualmente outro formato.
4. Editar a orientação, mudar o estilo e conferir que **não foi perdida**; tocar em Aplicar mudanças e conferir nova composição.
5. Testar 1. Copiar / 2. Abrir em ChatGPT/Gemini nos celulares, inclusive fallback manual.
6. Simular offline depois de cache inicial; conferir cadastro PWA e ausência de requisições externas.
7. Conferir CSP e cabeçalhos antiframe (`DENY`, `frame-ancestors 'none'`) e acessibilidade.
8. Somente depois de PR e CI verdes e homologação, publicar manualmente em produção, preservando `.htaccess`. Fazer rollback para 1.0 em caso de regressão.
