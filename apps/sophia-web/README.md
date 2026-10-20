# SophIA Web — Alpha 0.5

**Endereço de uso:** https://sophia.meuapoio.com  
**Projeto:** CS Navigator, com a SophIA como interface web independente do Plugin Directory.

A SophIA **não é um novo serviço de IA**. Ela ajuda visitantes a entender seu objetivo, seguir métodos simples, produzir um roteiro e preparar uma conversa com o **ChatGPT ou Gemini da própria conta**. Nenhuma assinatura/API do mantenedor é utilizada. O visitante escolhe se copia e cola suas informações na plataforma de IA de preferência.

## Arquitetura

- HTML + CSS + JavaScript estáticos, sem build, sem servidor de conversação;
- PWA opcional, com service worker restrito a recursos estáticos;
- jornadas Aprender, Escrever e Resolver, e ponte de conversa;
- armazenamento de rascunhos **opt-in** no navegador;
- nenhum login, OAuth, chave API ou banco de dados;
- saída do usuário para ChatGPT ou Gemini por link, sem integração à sessão pessoal nem envio automático.

**Limites:** uma skill no registry do CS Navigator não é executada automaticamente no navegador ou na conta do visitante. A SophIA usa métodos documentados como apoio para orientar a conversa e não deve alegar que instalou ou executou skills.

## Estrutura versionada

Após a importação completa, esta pasta contém:

\`\`\`text
apps/sophia-web/
├── README.md                  # documentação do repositório; não vai ao ZIP
├── CHECKSUMS.sha256
├── LEIA-ME-INSTALAR.txt
├── TESTES-E-VALIDACAO.txt
├── index.html
├── privacidade.html
├── manifest.webmanifest
├── sw.js
├── icons/
│   ├── icon-192.png
│   └── icon-512.png
└── identidade/
    ├── icone-lanterna.png
    └── logo-oficial.png
\`\`\`

Os **11 arquivos distribuídos** são os mesmos da Alpha 0.5 validada no cPanel. A documentação README fica somente no repositório. O arquivo CHECKSUMS.sha256 fixa SHA-256 dos outros dez arquivos.

## Validação e releases

Execute na raiz do repositório:

\`\`\`sh
node scripts/validate-sophia-web.mjs
\`\`\`

O workflow \`.github/workflows/sophia-web.yml\` verifica integridade, CSP, estrutura PWA e sintaxe dos scripts e gera o artefato \`sophia-web-alpha-0.5-hostgator\` contendo o ZIP instalável.

O ZIP **não é enviado automaticamente** para HostGator: a publicação permanece manual e requer confirmação do mantenedor. Após concluir os checks, baixe o ZIP no GitHub Actions, extraia na raiz do subdomínio, valide no celular/tablet/desktop e atualize a versão de produção.

Cuidado com o cache PWA: ao instalar versões futuras, atualize \`CACHE\` no \`sw.js\`, mantenha caminhos relativos e documente a migração de rascunhos.

## Critérios de aceitação

1. Todos os 11 arquivos presentes e checksums íntegros.
2. Navegação completa Aprender, Escrever, Resolver e Conversational Bridge.
3. Telas 320, 390, 768, 1024, 1366 e 1920 px, sem rolagem horizontal e sem colisão de botões.
4. \`Voltar\`/\`Continuar\` alinhados; rascunho salvo somente com opt-in.
5. Copiar e exportar .txt; links abrem apenas a IA escolhida pelo visitante.
6. Nenhuma solicitação de senha, chave API ou acesso ao conteúdo da conta de IA.
7. Sem upload automático de formulários, telemetria ou integração paga.
8. Política de privacidade coerente com a implementação e eventual registro de acessos pela hospedagem.

**Estado de importação:** enquanto somente este README existir nesta pasta, o código-fonte do site **ainda não foi importado**. Não marque o PR como pronto nem faça merge antes de enviar os 11 arquivos e obter CI verde.
