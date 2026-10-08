# Primeiros Passos — CS Navigator

Este é o guia principal de instalação e primeiro uso do CS Navigator.

[English](GETTING_STARTED.md)

## Situação no diretório público

A versão atualmente submetida à OpenAI é **CS Navigator 0.9.4 — Submission Compliance**.

Em **08/10/2026**:
- revisão: **em andamento**;
- publicação: **ainda não publicada**.

O candidato ativo de desenvolvimento é **0.15.0 — Everyday Life & Human Capability**. Ele ainda não é a versão pública do diretório.

## Se você só quer usar

Quando o CS Navigator estiver publicado:

1. Abra **Plugins** no ChatGPT.
2. Pesquise **CS Navigator**.
3. Instale uma vez.
4. Abra uma conversa normal.
5. Se quiser curadoria silenciosa naquela conversa, escreva:

```text
Use o CS Navigator como meu curador.
```

Depois converse normalmente.

O comportamento pretendido é:
- ficar no ChatGPT nativo quando isso bastar;
- usar uma skill quando um workflow especializado trouxer ganho real;
- usar uma Jornada de Vida apenas quando houver várias etapas dependentes;
- usar ações conectadas somente quando o acesso externo mudar materialmente o resultado.

## Limite de persistência

Uma frase em uma conversa **não prova** que o modo curador está ativo em todas as conversas futuras. Só podemos afirmar persistência entre chats quando o produto hospedeiro oferecer e confirmar esse mecanismo.

## Simple Mode

Para a experiência mais simples:

```text
Use o CS Navigator como meu curador e explique tudo em Simple Mode.
```

O Simple Mode deve usar linguagem simples, passos curtos e uma ação por vez quando útil, sem esconder alertas ou incertezas importantes.

## Candidato atual de desenvolvimento

| Componente | Estado |
|---|---|
| Submissão ao diretório OpenAI | **0.9.4 — em revisão / não publicada** |
| Candidato de desenvolvimento | **0.15.0 — build estático pronto; qualificação semântica nativa pendente** |
| Entradas no ZIP candidato | **126** |
| SHA-256 do ZIP candidato | `b8a18c87526883dc01331c1f3428c77a375ebf5dd33a8b038db3c6641af29bb2` |
| Novas skills da 0.15 | **31, todas inicialmente designed** |
| Registry MCP ao vivo | **planejado, ainda não ativo** |

## O que muda na 0.15.0

A 0.15.0 introduz quatro níveis:

```text
Nativo → Skill → Jornada de Vida → Ação Conectada
```

Também adiciona:
- Personal Curator;
- Simple Mode;
- Capability Preferences;
- Life Resolution Contract;
- Human Escalation Contract;
- Proof of Progress;
- skills para vida cotidiana, família e cuidado, cidadania no Brasil, casa, viagens, segurança digital e grandes mudanças de vida;
- uma base de registry versionada e pronta para evolução futura.

## Limite de evidência

As 31 novas skills são **designed**. Não viram `tested` ou `qualified` só porque foram criadas, empacotadas ou validadas estaticamente.

O candidato exato 0.15.0 ainda precisa de qualificação semântica nativa.

## Identidade técnica

- nome público: **CS Navigator**
- slug técnico: `cs-navigator`
- versão submetida ao diretório: `0.9.4`
- candidato de desenvolvimento: `0.15.0`
- workflow de build: `.github/workflows/build-v015-human-capability.yml`
- manifesto: `release/v015-human-capability.json`
- registry-base: `registry/capabilities-v1.json`
- arquitetura: `docs/CS_NAVIGATOR_0.15.0_HUMAN_CAPABILITY.md`

Projeto comunitário independente. Não afiliado nem endossado pela OpenAI.
