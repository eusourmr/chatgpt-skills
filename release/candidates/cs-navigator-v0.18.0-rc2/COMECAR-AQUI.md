# CS Navigator 0.18 RC2 — três caminhos de uso

**Objetivo:** descrever o problema normalmente e receber o método mais simples que realmente possa ajudar.

### 1. Sem instalar nada — imediato
Cole o texto de `CONVERSA-RAPIDA.txt` no início de qualquer conversa ChatGPT. Ele estabelece curadoria **nativa** na conversa atual; **não instala nem ativa o plugin** e não acessa o GitHub automaticamente. Também funciona como opção de emergência se o MCP estiver offline.

### 2. Skill autônoma (ZIP)
Se sua versão do ChatGPT disponibilizar importação de Skills, importe `cs-navigator-0.18.0-rc2-skill.zip` e **selecione a Skill na interface**. O arquivo contém as instruções e seis métodos editoriais já revisados para uso como orientação — não os executa nem garante ativação por apenas digitar o nome. Testar o comportamento real na superfície escolhida.

### 3. Plugin completo (ZIP)
Em uma conta/superfície que permita instalar ou atualizar **plugins privados**, use `cs-navigator-0.18.0-rc2-plugin.zip` como **candidato de testes**. Esse ZIP contém o núcleo e conexão MCP existente. A nova ferramenta de roteamento `curate_user_goal` só ficará disponível quando o servidor MCP 0.18 for realmente implantado e habilitado para testes; até lá, o plugin deve trabalhar com núcleo empacotado e ferramentas 0.17. Não confunda menção em texto com confirmação de uso da ferramenta.

### Comando de conversa
Com o plugin instalado e selecionável: escolha **@CS Navigator** no seletor, quando disponível, e escreva sua necessidade. Se não existir seletor ou plugin ativo, o texto "CS Navigator, ..." é somente uma instrução para ChatGPT nativo — não é uma chamada de ferramenta.

### Limites
- O usuário nunca precisa baixar **cada skill** do GitHub para receber uma orientação editorial.
- Uma entrada descoberta no registry não está necessariamente instalada ou executada.
- Atualizações de texto de método aprovado podem ocorrer pelo GitHub após PR revisado, **desde que o MCP de testes/produção realmente esteja utilizando o catálogo**, sem atualizar o plugin; novas ferramentas ou regras centrais exigem release/qualificação.
- Não envie documentos pessoais ou dados sensíveis para o MCP. Envie apenas resumo do objetivo, com permissão do host; o modo nativo pode ajudar sem a ferramenta.
- Não publicar ou substituir a 0.17 privada em revisão sem homologação e decisão explícita.
