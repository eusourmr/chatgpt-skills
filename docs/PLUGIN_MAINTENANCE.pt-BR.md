# Manutenção do Plugin CS Connect

> Linha pública atual: **CS Connect 0.9.0**. ZIP R2 qualificado SHA-256: `3379f932301b707fcf935f8f4f6f45bdea10d3e7277daced2849f93c3f824cce`. Publicação no diretório ainda exige revisão, aprovação e publicação explícita pela OpenAI.

[English](PLUGIN_MAINTENANCE.md)

Este documento é o checklist permanente de release e atualização do CS Connect. O slug técnico continua sendo `cs-navigator`.

## Nunca confundir estes caminhos de distribuição

| Caminho | Uma mudança no GitHub atualiza usuários automaticamente? | O que fazer em uma nova versão |
|---|---|---|
| Marketplace GitHub importado em workspace e acompanhando `main` | **Sim, depois da sincronização do marketplace** | Fazer merge de mudanças válidas e aguardar o sync diário ou usar **Sync now** |
| Marketplace GitHub fixado em tag/SHA | **Não muda de versão sozinho** | Alterar deliberadamente o ref para a nova tag/SHA qualificada |
| Plugin enviado manualmente por ZIP no workspace | **Não** | Abrir o plugin e enviar a nova versão |
| Plugin Directory público da OpenAI | **Não para mudanças de metadata/skills empacotadas** | Enviar novo ZIP para o **mesmo plugin existente**, passar checks/review e publicar a versão aprovada |
| Implementação MCP hospedada de plugin já publicado | Mudanças elegíveis do servidor/ferramentas podem entrar pelo fluxo de scans MCP | Publicar o servidor e revisar/solicitar rescan quando necessário; isso não vale para atualizações do pacote de skills do CS Connect |

## Regra atual do CS Connect

O CS Connect é um plugin **skills-only**.

Portanto, uma nova versão do CS Connect **não deve ser considerada atualizada no Plugin Directory público só porque o GitHub mudou**.

Em toda release pública que altere skills, metadata, assets ou o pacote:

1. concluir a qualificação no repositório;
2. congelar a revisão exata do source;
3. construir o ZIP de produção a partir dessa revisão;
4. verificar SHA-256 e conteúdo;
5. atualizar a versão em `plugins/cs-navigator/plugin.json`;
6. atualizar `submission/cs-navigator-<versão>.json`;
7. criar tag/release no GitHub;
8. abrir o **plugin CS Connect já existente** no portal de submissão da OpenAI;
9. enviar o novo ZIP como nova versão do pacote — **não criar outro plugin duplicado**;
10. resolver findings automáticos;
11. concluir o fluxo de review exigido;
12. depois da aprovação, publicar a nova versão;
13. verificar se o diretório público mostra a versão desejada;
14. registrar a evidência da publicação na issue da release.

Publicar uma atualização aprovada substitui a versão do pacote anteriormente publicada no diretório público.

## Regra do marketplace GitHub

Usar dois modos de forma consciente:

### Desenvolvimento / qualificação

Acompanhar `main` ou branch candidata apenas em workspaces controlados.

- O marketplace GitHub verifica atualizações diariamente.
- Use **Sync now** quando precisar atualizar imediatamente.
- Se uma atualização de plugin for inválida, o ChatGPT mantém a última versão importada que funcionava.

### Estável / produção

Prefira tag de release qualificada ou commit SHA imutável.

Exemplo:

```text
cs-connect-v0.9.0
```

Uma tag/SHA fica fixada de propósito. Ela não avança para uma versão posterior só porque a `main` avançou. Mude o ref do marketplace apenas depois que a nova release passar por todos os gates.

## Lembrete obrigatório de release

Toda release do CS Connect deve responder a todos estes itens antes de ser encerrada:

- [ ] A versão do plugin foi atualizada?
- [ ] O ZIP de produção foi reconstruído a partir do source qualificado?
- [ ] O SHA-256 coincide com o artefato qualificado?
- [ ] A tag/release do GitHub foi criada?
- [ ] O marketplace GitHub do workspace foi atualizado/sincronizado ou ficou intencionalmente fixado?
- [ ] Se o CS Connect estiver publicado no diretório público, o **plugin público existente** recebeu o novo ZIP?
- [ ] Os checks/review da OpenAI foram concluídos para a atualização pública?
- [ ] A versão aprovada foi publicada?
- [ ] A versão exibida no diretório público foi verificada?
- [ ] A evidência dessa publicação foi registrada na issue da release?

## Regra para afirmar publicação pública

Release no GitHub, importação em marketplace de workspace ou QA nativo **não provam, sozinhos, publicação no Plugin Directory público**.

Só afirmar “disponível no Plugin Directory público da OpenAI” depois de verificar o plugin publicado no portal/diretório da OpenAI.

## Referências oficiais a conferir antes de cada release pública

- OpenAI Help: Plugins in ChatGPT
- OpenAI Help: Importing and syncing plugin marketplaces from GitHub
- OpenAI Developers: Upload and submit your plugin

As regras da plataforma podem mudar; conferir a documentação oficial antes de toda release pública.

Projeto comunitário independente. Não afiliado nem endossado pela OpenAI.
