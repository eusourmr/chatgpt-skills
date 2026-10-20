# SophIA Web — Alpha 0.7

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
