# Primeiros Passos — CS Navigator

Este é o guia principal de instalação e primeiro uso do **CS Navigator 0.9.0**.

[English](GETTING_STARTED.md)

## Se você só quer instalar e usar

Você **não precisa saber programar**, usar terminal, GitHub ou API.

Quando o CS Navigator estiver publicado no diretório público da OpenAI:

1. Abra o **ChatGPT** ou o **Codex**.
2. Abra **Plugins**.
3. Pesquise por **CS Navigator**.
4. Abra o cartão do plugin.
5. Clique em **Instalar plugin**.
6. Volte para uma conversa e escreva, por exemplo:

```text
Use CS Navigator para revisar este texto sem mudar datas, valores ou meu sentido.
```

Pronto. O CS Navigator é composto por skills e, no núcleo 0.9.0, **não exige chave de API, servidor MCP, login em serviço externo nem configuração técnica adicional**.

> Se “CS Navigator” ainda não aparecer na busca pública, isso significa que a versão pública ainda está em revisão ou ainda não foi publicada. Uma release no GitHub, sozinha, não prova que o plugin já esteja disponível no diretório da OpenAI.

## O que o CS Navigator faz

O CS Navigator funciona como um conjunto de capacidades especializadas. Ele foi desenhado para **não atrapalhar tarefas simples**.

Exemplos simples continuam no próprio ChatGPT:

```text
Quanto é 17 × 4?
Corrija esta frase.
Resuma este parágrafo.
```

Quando você quiser usar o CS Navigator, basta dizer isso claramente:

```text
Use CS Navigator para pesquisar esta regra brasileira e separar lei, projeto de lei e notícia antiga.
```

```text
Use CS Navigator para organizar este projeto em poucos marcos verificáveis.
```

```text
Use CS Navigator com behavioral-science para melhorar retenção sem dark patterns.
```

## Versão atual

| Componente | Estado |
|---|---|
| CS Navigator | **0.9.0 R2 — candidato de produção qualificado** |
| ZIP qualificado | SHA-256 `890b4a7f8257021e2dedce10bce0abfa415ca4ebbed44de7966d5b90ca38117b` |
| 0.7.5 | absorvida como fundação interna de Skill Containers / Container Guardian |
| 0.8 | absorvida pela 0.9 |
| CLI `chatgpt-skills` | linha independente, atualmente `0.4.0` |
| Próxima linha | 0.10 — Ecosystem Intelligence & Community Scale |

A qualificação do R2 é vinculada aos bytes exatos e aos casos registrados. Ela não significa segurança absoluta nem garantia de zero alucinação.

## Enquanto a versão pública estiver em revisão

Usuários comuns podem aguardar a listagem pública. Testadores e administradores têm caminhos alternativos:

### A. ZIP qualificado

Use o ZIP da release GitHub 0.9.0 e confira o SHA-256 antes de instalar em uma superfície que aceite upload de plugin.

Esperado:

```text
890b4a7f8257021e2dedce10bce0abfa415ca4ebbed44de7966d5b90ca38117b
```

A existência do ZIP no computador não significa que ele esteja instalado. A superfície precisa aceitar upload/instalação e mostrar o plugin ativo.

### B. Marketplace GitHub para workspace administrado

Para administradores de workspace com importação de marketplace GitHub:

```text
Repositório: https://github.com/eusourmr/chatgpt-skills
Caminho:     deixe vazio
Ref:         use a tag estável da 0.9.0 quando publicada
```

Depois:

```text
Configurações do workspace → Plugins → Marketplaces → importar/sincronizar
```

Veja [Distribuição via GitHub](GITHUB_PLUGIN_DISTRIBUTION.md).

### C. CLI para usuários técnicos

O CLI possui linha de versão independente:

```bash
npx chatgpt-skills install
```

Inspecionar antes de adotar:

```bash
npx chatgpt-skills inspect cs-navigator
```

Diagnosticar instalação/exportação:

```bash
npx chatgpt-skills doctor
```

## Como saber se está funcionando

Faça um teste simples:

```text
Use CS Navigator. Quanto é 17 × 4?
```

A resposta esperada é apenas **68**. Uma conta simples não precisa virar um workflow.

Depois teste uma capacidade:

```text
Use CS Navigator para organizar um projeto grande em marcos e impedir que eu declare etapas concluídas sem evidência.
```

A resposta deve usar poucos marcos, exigir evidência antes de concluir e prever checkpoint/recuperação quando houver mudança difícil de desfazer.

## Se algo der errado

1. confirme se o nome exibido é **CS Navigator**;
2. confirme a versão instalada;
3. se usa marketplace GitHub, execute **Sync now** quando disponível;
4. se usa ZIP, confira o SHA-256;
5. não presuma que uma evidência antiga vale para bytes novos;
6. se usa CLI, execute `npx chatgpt-skills doctor`;
7. abra uma issue no GitHub se o problema persistir.

## Para especialistas

- nome público: **CS Navigator**
- slug técnico preservado: `cs-navigator`
- versão: `0.9.0`
- tipo: skills-only
- MCP: não obrigatório
- autenticação externa: não
- candidato: R3-final
- evidência: `release/candidates/cs-connect-v0.9.0-r2.json`
- requalificação nativa: `trust/evals/runs/cs-connect-v0.9.0-r2-native-requalification.json`

Leia também [Publicação Pública](PUBLIC_PLUGIN_SUBMISSION.md), [Trust Passport](TRUST_PASSPORT.md) e [Skill Containers](SKILL_CONTAINERS.md).

Projeto comunitário independente. Não afiliado nem endossado pela OpenAI.
