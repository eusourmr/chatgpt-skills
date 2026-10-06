# Primeiros Passos — CS Navigator

Este é o guia principal de instalação e primeiro uso do **CS Navigator 0.9.3**.

[English](GETTING_STARTED.md)

## Se você só quer instalar e usar

Você **não precisa saber programar**, usar terminal, GitHub ou API.

Quando o CS Navigator estiver aprovado e publicado no diretório público:

1. Abra o **ChatGPT** ou o **Codex**.
2. Abra **Plugins**.
3. Pesquise por **CS Navigator**.
4. Abra o cartão do plugin.
5. Clique em **Instalar plugin**.
6. Volte para uma conversa e escreva, por exemplo:

```text
Use CS Navigator para revisar este texto sem mudar datas, valores ou meu sentido.
```

Pronto. O pacote principal é skills-only e não exige servidor MCP, autenticação externa ou chave de API.

> Se o CS Navigator ainda não aparecer na busca pública, ele ainda não foi publicado publicamente. Release no GitHub ou draft privado não provam publicação no diretório.

## Versão atual

| Componente | Estado |
|---|---|
| CS Navigator | **0.9.3 R3-final — candidato privado nativamente qualificado; submissão pública pendente** |
| ZIP exato | SHA-256 `890b4a7f8257021e2dedce10bce0abfa415ca4ebbed44de7966d5b90ca38117b` |
| Plugin privado | versão 0.9.3, ainda não listado publicamente |
| 0.7.5 | fundação de Skill Containers / Container Guardian absorvida |
| 0.8 | absorvida pela 0.9 |
| Próxima linha | 0.10 — Ecosystem Intelligence & Community Scale |

Os gates estáticos e de pacote passaram. A requalificação semântica nativa no ChatGPT dos bytes exatos 0.9.3 passou 6/6 em 06/10/2026. A submissão pública continua pendente.

## Como o CS Navigator deve se comportar

Tarefas simples continuam nativas:

```text
Quanto é 17 × 4?
Corrija esta frase.
Resuma este parágrafo.
```

Quando quiser uma capacidade especializada:

```text
Use CS Navigator para pesquisar esta regra brasileira e separar lei vigente, projeto de lei e notícia antiga.
```

```text
Use CS Navigator para organizar este projeto em poucos marcos verificáveis.
```

## Enquanto a publicação pública não terminar

Para usuários comuns, o melhor é aguardar a listagem pública.

Testadores técnicos podem usar o pacote exato apenas em uma superfície que aceite upload de plugin. Confira:

```text
890b4a7f8257021e2dedce10bce0abfa415ca4ebbed44de7966d5b90ca38117b
```

## Como saber se está funcionando

```text
Use CS Navigator. Quanto é 17 × 4?
```

Esperado: **68**, sem workflow desnecessário.

A matriz de qualificação está em:

```text
tests/fixtures/v092-native-qualification-r3.json
```

## Para especialistas

- nome público: **CS Navigator**
- slug técnico: `cs-navigator`
- versão candidata: `0.9.3`
- tipo: skills-only
- candidato: R3-final
- evidência do pacote: `release/candidates/cs-navigator-v0.9.3-r3.json`
- requalificação nativa: pendente

Projeto comunitário independente. Não afiliado nem endossado pela OpenAI.
