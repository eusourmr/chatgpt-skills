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
