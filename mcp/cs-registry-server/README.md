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
