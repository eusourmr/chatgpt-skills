# CS Navigator Registry MCP

Read-only MCP service for CS Navigator 0.16.0.

## Purpose

Keep the public plugin core stable while capability discovery, evidence state, freshness, and distribution availability can evolve from the GitHub registry without a new plugin ZIP for every data-only update.

## Tools

- `search_capabilities`
- `get_capability`
- `get_evidence`
- `registry_status`

The service intentionally does **not** execute arbitrary GitHub content and does not expose a write tool.

## Source of truth

Default registry:

`https://raw.githubusercontent.com/eusourmr/chatgpt-skills/main/registry/public-capabilities-v1.json`

Override with `CS_REGISTRY_URL`.

## Local run

```bash
npm install
npm run build
npm start
```

MCP endpoint: `http://localhost:3000/mcp`

## Public deployment requirement

The OpenAI public plugin directory requires a stable public HTTPS Streamable HTTP MCP endpoint. Deployment infrastructure is separate from GitHub source hosting.

The server is container-ready. Deploy it to a stable HTTPS host, then put the real endpoint into the plugin's `mcp.json`.

## Security boundary

GitHub registry data is parsed through a fixed schema and only allowlisted metadata fields are returned. Free-form repository files are not fetched or executed.

## Proveniência de snapshot verificável (23/11/2026)

Um novo arquivo `registry/publication-manifest-v1.json` contém commit Git imutável, SHA-1 do blob Git e URL fixa que identificam o **conteúdo** do Registry. O serviço busca os dados configurados por `CS_REGISTRY_URL` e o manifesto em `CS_REGISTRY_PROVENANCE_URL` (padrão: manifesto na `main`). Cada conjunto precisa corresponder exatamente à impressão digital antes de ser divulgado como verificado. Se o manifesto estiver ausente ou os bytes mudarem, o serviço falha fechado, em vez de afirmar proveniência incorreta.

Os campos retornados incluem `source_commit` verificado do **snapshot**, `source_git_blob_sha1`, `provenance_state`, `raw_source_commit` (historicamente `development`) e `original_publication_commit_verified=false`. A data original `2026-10-11` continua apenas uma afirmação histórica. **Não inferir publicação original no commit de 23/11/2026**. Ao atualizar dados, publicar novo manifesto com commit de conteúdo exato, revisar CI, conferir o serviço real e registrar rollback.

Testes: dentro de `mcp/cs-registry-server`, executar `npm ci && npm run build && npm test`. O teste `test/provenance.test.mjs` rejeita conteúdo alterado, URLs divergentes e commits inventados.
