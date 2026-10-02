# Primeiros Passos

Este é o guia canônico de instalação e primeiro uso do ChatGPT Skills / CS Navigator.

[English](GETTING_STARTED.md)

## Versões atuais

O projeto possui linhas de versão independentes:

| Componente | Estado atual |
|---|---|
| Plugin CS Navigator | **0.7.0 estável** — Verifiable Trust I |
| CS Navigator 0.7.5 | **Em qualificação** — a fundação do Container Guardian / Skill Containers já foi integrada, mas a 0.7.5 ainda não foi lançada |
| CLI `chatgpt-skills` no npm | **0.4.0** |

Não trate a 0.7.5 como plugin estável antes de concluir a qualificação nativa no ChatGPT e o release gate.

Release estável: [CS Navigator 0.7.0 — Verifiable Trust I](https://github.com/eusourmr/chatgpt-skills/releases/tag/cs-navigator-v0.7.0)

## Opção A — Instalar o CS Navigator em um workspace ChatGPT compatível

Onde houver suporte a marketplaces de plugins gerenciados pelo GitHub:

1. Abra as configurações de workspace/plugins do ChatGPT.
2. Adicione ou importe um marketplace de plugins do GitHub.
3. Use este repositório como origem:

```text
Repositório: https://github.com/eusourmr/chatgpt-skills
Caminho:     (deixe vazio)
Ref:         cs-navigator-v0.7.0
```

4. Instale **CS Navigator** no marketplace importado.
5. Para uso controlado em produção, prefira a tag de release acima em vez de acompanhar a `main`.

O plugin estável do CS Navigator é composto por skills. O núcleo não exige servidor MCP, chave de API, autenticação externa ou gateway de terceiros.

Veja [Distribuição via GitHub](GITHUB_PLUGIN_DISTRIBUTION.md) para detalhes de administrador e desenvolvimento local.

## Opção B — Usar o artefato do release estável

O release 0.7.0 no GitHub contém:

```text
cs-navigator-plugin-0.7.0.zip
cs-navigator-plugin-0.7.0.zip.sha256
```

SHA-256 publicado do plugin:

```text
a1ac38a482f6e3ad839eefc3ed555c2cc001e24cf28b1be2740024d963b6048d
```

O ZIP do release é o payload de produção qualificado. A aceitação de instalação direta por ZIP depende da superfície. A simples existência do ZIP no computador não prova que ele esteja instalado ou ativo no ChatGPT.

## Opção C — Usar o CLI

O CLI no npm possui sua própria linha de versão.

Início interativo:

```bash
npx chatgpt-skills install
```

Inspecione uma skill antes de adotá-la:

```bash
npx chatgpt-skills inspect cs-navigator
npx chatgpt-skills inspect openai-agents-sdk-builder
```

Verifique uma instalação ou exportação:

```bash
npx chatgpt-skills doctor
```

Instale/exporte para destinos suportados:

```bash
npx chatgpt-skills install --bundle openai-ecosystem --tool codex-cli --scope project --yes
npx chatgpt-skills install --bundle education --tool cursor --scope project --yes
npx chatgpt-skills install --bundle data-analyst --tool agents-portable --scope project --yes
```

Prepare artefatos para upload/exportação no ChatGPT quando a importação por marketplace GitHub não estiver disponível:

```bash
npx chatgpt-skills install --skill cs-navigator --tool chatgpt-web --yes
```

Alternativa direta pelo repositório:

```bash
npx --allow-git=root github:eusourmr/chatgpt-skills install
```

## Como usar o CS Navigator

O CS Navigator é um **roteador de capacidades**, não uma exigência para toda tarefa.

Use quando você estiver decidindo, por exemplo:

- se a tarefa precisa de uma skill;
- qual capacidade do CS é a menor opção útil;
- se uma skill externa possui evidência suficiente;
- se uma candidata está current, tested, stale, changed-unreviewed ou not-evaluated;
- qual opção equivalente exige menos permissões.

Exemplos:

```text
@CS Navigator
Preciso de uma skill para isso ou o próprio ChatGPT resolve diretamente?
```

```text
@CS Navigator
Qual capacidade do CS atende este objetivo com o menor conjunto de permissões?
```

```text
@CS Navigator
Esta skill está atual, testada e suficientemente evidenciada para este uso?
```

Se a tarefa for comum e o ChatGPT puder resolvê-la diretamente, a resposta correta pode ser **native-only**.

Exemplos que normalmente devem permanecer nativos:

```text
Resuma este PDF.
Corrija esta frase.
Quanto é 17 × 4?
Explique exponential backoff de forma simples.
```

## Capability Pack I incluído

Uma instalação do CS Navigator inclui estas capacidades chat-native:

- Regenerative Language Bridge
- Regenerative Impact Map
- Regenerative Resilience Plan
- Regenerative Adaptive Experiment

Estar incluída não significa ativação automática, e o bundle não transforma uma skill `designed` em `tested`.

## O que a 0.7.0 adiciona

A CS Navigator 0.7.0 adiciona Verifiable Trust I:

- Trust Passports;
- evidência do Security Gate v2;
- Risk Labels;
- freshness e drift;
- evidência vinculada à versão/bytes;
- behavior evals normalizados;
- roteamento trust-aware;
- fundações de governança e vocabulário multilíngue;
- OSTS 0.1.

Um `pass` no Security Gate não é garantia de segurança. Uma skill modificada não herda automaticamente a evidência dos bytes anteriores.

## O que está acontecendo na 0.7.5

A 0.7.5 estende confiança de “o que foi revisado” para “o que pode acontecer a seguir”.

A fundação do Container Guardian já foi integrada na `main` e possui testes determinísticos para:

- nenhuma autoelevação de permissão;
- nenhuma citação, observação ou tool result fabricado;
- nenhuma aquisição/transferência externa não autorizada;
- retries/tool attempts limitados;
- permissões do workflow filho nunca maiores que as do pai;
- decisões auditáveis `ALLOW / CONFIRM / DEGRADE / STOP`.

Porém, **a 0.7.5 ainda não é o plugin estável**. A qualificação nativa no ChatGPT do RC force-fresh continua sendo um release gate.

Veja [Skill Containers](SKILL_CONTAINERS.md) e [Plano 0.7.5](V075_VERIFIABLE_TRUST_II_CONTAINERS.md).

## Direção da 0.8

A próxima linha de produto está sendo desenhada em torno de **Everyday Trust Skills** próprias e **Community Profiles** reutilizáveis: pesquisa, validação de regras de documentos, integridade acadêmica, integridade textual, preservação de intenção visual e restauração.

Acompanhe: [#60 — v0.8.0 First-Party Skills I](https://github.com/eusourmr/chatgpt-skills/issues/60).

## Solução de problemas

Se um roteamento ou resultado parecer desatualizado:

1. confirme qual plugin/versão está instalado;
2. prefira a tag estável para uso controlado;
3. sincronize/recarregue o marketplace/plugin quando a superfície permitir;
4. não presuma que testes antigos continuam válidos depois que os bytes mudam;
5. use `chatgpt-skills doctor` em instalações/exportações gerenciadas pelo CLI.

Para bugs ou problemas de documentação, abra uma issue no GitHub.

Projeto comunitário independente. Não afiliado nem endossado pela OpenAI.
