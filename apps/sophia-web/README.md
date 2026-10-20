# SophIA Web — Versão 1.0.0

Interface web estática, sem API própria, que prepara conversas para o ChatGPT/Gemini do visitante. A aplicação pública continua em https://sophia.meuapoio.com/. Mantém Aprender, Escrever e Resolver.

**Arquitetura:** aplicação em `apps/sophia-web/`, templates aprovados em `catalog/approved-templates.json`, índice JSON derivado em `assets/skill-index.json`, roteamento lexical em `assets/router.js`. O registry está em `registry/public-capabilities-v1.json`. Nenhuma skill remota é instalada ou executada. Não há login, chaves ou telemetria.

**Gerar índice:** `node scripts/generate-sophia-index.mjs` executado na raiz do repositório após revisão dos templates. Nunca converter SKILL.md diretamente em prompts. Atualizar índice em PR com revisão. `--check` falha quando houver drift ou exclusão de skill.

**Testes:** `node scripts/generate-sophia-index.mjs --check && node scripts/validate-sophia-web.mjs && node --test apps/sophia-web/tests/launcher.test.mjs`.

**Hospedagem:** não há deploy automático. Após merge/CI verde, crie ZIP dos arquivos públicos da pasta `apps/sophia-web/`, excluindo `catalog/`, `tests/`, `README.md`, `CATALOGO-E-LIMITES.md` e relatórios. Envie-os ao diretório da HostGator mediante teste manual. O ambiente de produção não deve ser modificado por um PR ainda em avaliação.

**Limite:** a correspondência é lexical, não semântica; os 14 modelos editoriais estão no estágio piloto e não comprovam instalação/execução. Logs da hospedagem obedecem às práticas do provedor; verificar retenção antes de divulgação pública.

## Novidades da Alpha 0.7
- PWA com identidade estável relativa ao escopo (`id: ./`) e `launch_handler` que reaproveita janela instalada em navegadores compatíveis. Abertura automática de links externos **não é garantida**, especialmente no iOS; iniciar pelo ícone instalado é o caminho mais confiável.
- Uma pergunta local apenas para pedidos vagos, seguida do roteiro existente.
- Continuidade: orientar após a primeira resposta externa sem ler contas do visitante; trecho colado é opcional e tratado como dados não confiáveis.
- Zero dependências de IA, sem chave ou API cobrada.
- Testes: `node --test apps/sophia-web/tests/launcher.test.mjs`; CI continua sem deploy automático.

## Alpha 0.7.1 — Transição para apps externos
Nos navegadores móveis, os links para ChatGPT/Gemini não forçam mais uma aba extra. No Chrome Android, tenta-se uma única intent HTTPS para os pacotes oficiais, **sem redirecionamento automático**. Se não abrir, o usuário pode clicar explicitamente na versão web. iOS e demais navegadores utilizam links HTTPS normais, sujeitos às associações de apps do sistema. O website não pode garantir a abertura de aplicativos de terceiros ou a ausência de comportamento próprio das plataformas.

Teste adicional: `node --test apps/sophia-web/tests/provider-handoff.test.mjs`.

## Alpha 0.8 — Discernimento Adaptativo (heurístico)

- Roteador local sem dependências nem APIs, com pistas por domínio, evidência forte e exclusões de ambiguidade/negação.
- O mesmo índice editorial de **14 métodos**, sem alegar execução ou novas validações científicas.
- Ao recomendar um método, permite **“Sem método especializado”** sem impedir a continuidade.
- O app instalado, a passagem ChatGPT/Gemini e todas as três jornadas permanecem.
- `node --test apps/sophia-web/tests/*.test.mjs` inclui teste de 116 situações simuladas.
- Os números do conjunto de 116 casos são **métricas internas de fixture**, não resultados de teste humano independente. Publique sem telemetria; aprimoramentos exigem revisão humana posterior.
- Não existe deploy automático: testar beta, validar Android/iOS/Windows e realizar merge conforme gate.

## Alpha 0.9 — Continuidade e Aprendizado Local

- Feedback voluntário **Consegui avançar / Em parte / Ainda não funcionou** em painel integrado, sem nova tela.
- Gera uma orientação subsequente específica ao resultado autorreferido, sem assumir que a ação foi concluída ou que o resultado foi verificado.
- A opção de memorizar preferências é **desmarcada por padrão**. Quando marcada, persiste **somente o estilo e pequenos contadores de feedback por ID de método**, em localStorage. Nunca persiste perguntas, notas nem respostas externas por meio desta funcionalidade.
- Preferência local **somente desempata caminhos já plausíveis**; jamais anula bloqueio, nem transforma uma busca nativa em skill.
- A pessoa pode apagar/desativar preferências. A continuidade usa a mesma conta externa de ChatGPT/Gemini.
- PWA mantém comportamento de lançamento e abertura externa da 0.7.1; o novo cache carrega `assets/feedback.js`.
- Testar: `node --test apps/sophia-web/tests/*.test.mjs`; CSP, checksums, funcional e visual em beta. Sem backend, login, chaves ou API paga.
- Esta etapa **não implementa aprendizado de máquina**; trata-se de personalização local e controlada por feedback.

## Alpha 0.9.5 — catálogo governado, transferência e privacidade

- O índice `assets/skill-index.json` é resultado de **templates editoriais aprovados** e do registry, jamais das pastas `SKILL.md` automaticamente. Os 14 métodos não são executáveis nem considerados tested por mera presença no repositório.
- `assets/catalog-manifest.json` contém SHA-256 e metadados; `assets/catalog-baseline.json` é a cópia imutável e limitada a esta versão. `assets/catalog-loader.js` compara digest e método/termos/IDs com baseline. Em caso de erro usa fallback. Integridade detecta diferença de arquivos, **não** autenticação independente do servidor. Atualização de templates requer uma release revisada e novos arquivos; não há espelhamento instantâneo de qualquer skill nem consulta ao CDN.
- `scripts/build-sophia-catalog.mjs --check` verifica consistência das duas cópias e metadados; na raiz do repositório. Para gerar, executar sem `--check`, revisar diff e aprovar PR.
- Ação "Copiar e abrir" tenta copiar localmente, com alternativa de seleção e link oficial quando clipboard ou sistema bloqueiam. Abrir app externo é determinado pelo navegador/SO. Nunca coloca prompt em URL.
- Compartilhamento inclui **somente ID público** em `?skill=...`. O parâmetro não ativa ou executa método sem demanda contextual do usuário.
- Avisos de transparência não prometem 100% de anonimato: HostGator registra metadados técnicos e a pessoa decide o que enviar à IA escolhida.
- **Não existe deploy automático para HostGator.** O GitHub é fonte de curadoria, testes e artefatos. Após CI, publicar manualmente ZIP homologado, idealmente com atualização atômica e rollback. O modo offline preserva o catálogo empacotado quando corretamente cacheado pelo PWA.

## Alpha 0.9.6 — Correções a partir da auditoria externa
- iOS/iPadOS e Safari/macOS: **cópia seguida de link explícito**; não tentar abrir popup depois de aguardar permissão do clipboard. A navegação automática segue apenas como melhor esforço em outros navegadores, sempre com link acionável de reserva.
- Novo link de continuação com foco visível; resultado e método anunciados, foco direcionado ao título após a preparação da orientação. Alvos de toque de pelo menos 48 px nos controles principais da jornada.
- Catálogo: SHA-256 é proteção de **integridade**, NÃO assinatura, garantia contra comprometimento do servidor nem SWR remoto.
- Confirmação de XSS: IDs estritamente validados, texto sem HTML injetado.
- A versão do catálogo permanece 0.9.5: o patch 0.9.6 não altera modelos editoriais.
- Testes automatizados são complementares; Safari físico, VoiceOver/NVDA e PWA offline exigem homologação real.

## SophIA 1.0.0 — release pública estável candidata à publicação

**Identidade funcional estável:** Aprender/Escrever/Resolver; 14 métodos editoriais, sem execução de skills, IA remota, login ou telemetria de perguntas. O visitante decide o que copiar e usar na própria conta ChatGPT/Gemini. Persiste apenas rascunhos ou preferências em caso de opt-in explícito; o navegador e a hospedagem ainda podem produzir metadados operacionais.

**Melhorias da 1.0:** consistência da versão visível, índice, baseline, manifesto e PWA; nova geração de hash SHA-256; pacote verificável e documentação de publicação/rollback; indexação pública (`robots index, follow`) e metadados básicos para compartilhamento, sem compartilhar pedidos pessoais; suíte automática estendida com gates de release. Sem alterações no motor de intenção ou no comportamento de abertura de apps testado pelo mantenedor no Android e iPhone.

**Testes de release (raiz do repositório):**

```sh
node scripts/generate-sophia-index.mjs --check
node scripts/build-sophia-catalog.mjs --check
node scripts/validate-sophia-web.mjs
node --test apps/sophia-web/tests/*.test.mjs
```

**Antes de publicar:** testar em `https://sophia.meuapoio.com/beta/`, conferir os cabeçalhos HTTP no domínio final (`frame-ancestors 'none'` e `X-Frame-Options: DENY`, previamente relatados pelo mantenedor), testar PWA offline, clipboard em dispositivos e modo de acessibilidade quando possível. O build não efetua deploy. Em caso de regressão, restaurar o backup de produção 0.9.6 e atualizar o Service Worker.

**Proveniência:** as métricas dos 116 casos são de corpus de regressão desenvolvido com o produto, não validação independente nem prova de segurança absoluta. O baseline SHA-256 garante integridade relativa aos artefatos de release, não autenticação independente do servidor. Não alegar certificação do Gemini nem aprovação de testes que não foram executados.
