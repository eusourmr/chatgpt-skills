# SophIA Web — Alpha 0.8

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
