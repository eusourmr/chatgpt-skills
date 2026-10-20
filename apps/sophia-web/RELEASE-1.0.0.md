# SophIA 1.0.0 — Release candidate

Data: 20/10/2026. Base: Alpha 0.9.6, PR #99 já integrado à `main`.

## Funcionalidades mantidas
- PWA, interface trilíptica Aprender / Escrever / Resolver, curadoria lexical do CS Navigator e 14 métodos editoriais.
- Catálogo versionado de mesma origem com SHA-256, manifesto de distribuição e fallback para baseline.
- Ações de copiar e abrir IA externa, inclusive fluxo explícito para Safari; feedback local sem armazenar conversas por padrão.
- Segurança de URL `?skill=id`, CSP estática e compatibilidade de UX móvel.

## Alterações desta release
- Versão `1.0.0` consistente entre página, manifesto, catálogo, baseline, documentação e service worker.
- Metadados de descoberta: remoção do `noindex` e inclusão de URL canônica e descrição Open Graph pública, sem dados pessoais.
- Teste automático específico de invariantes de release, política de não envio automático e rotas públicas.
- Instruções de backup, deploy controlado e rollback sem alterações automáticas no `.htaccess`.

## Evidências e pendências
- Android/iPhone na versão anterior: teste reportado pelo mantenedor, sem logs de dispositivo.
- CI do PR 1.0 e suíte de testes: resultados devem ser citados somente após execução.
- Pendente para homologação final: experiência offline real, leitores de tela, captura de console no dispositivo, implantação da 1.0 na HostGator.
- O GitHub release não faz deploy; nenhuma skill passa de `designed` para `tested` por essa versão.

## Correção RC2 — handoff após relato de falha
- Botões separados em copiar (com tentativa síncrona para compatibilidade e API moderna opcional) e abrir (link HTTPS oficial, gesto explícito).
- Retirados links Android `intent://`, popups assíncronos e tentativa de navegação após `await`.
- Links diretos sempre visíveis, mesmo se a cópia for negada.
- Service Worker agora consulta a rede para HTML e módulos, usando cache offline como fallback; cache de release v1.0.0-v2.
- Preservação do catálogo de 14 métodos e da política de não colocar dados pessoais em URLs.
- Requer reteste em Android/iPhone; não inferir que o defeito original foi eliminado sem validação em aparelhos reais.
