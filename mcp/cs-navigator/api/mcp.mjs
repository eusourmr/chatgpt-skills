import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { z } from 'zod';
import { loadRegistry, searchRegistry, getCapability, getEvidenceView } from '../lib/registry.mjs';

function jsonResult(value) {
  return {
    content: [{ type: 'text', text: JSON.stringify(value, null, 2) }],
    structuredContent: value
  };
}

function errorResult(message) {
  return {
    isError: true,
    content: [{ type: 'text', text: message }]
  };
}

function createServer() {
  const server = new McpServer(
    { name: 'cs-navigator-live-registry', version: '0.16.0' },
    { maxToolInputElements: 200 }
  );

  const readonly = {
    readOnlyHint: true,
    destructiveHint: false,
    idempotentHint: true,
    openWorldHint: false
  };

  server.registerTool(
    'search_capabilities',
    {
      title: 'Search CS capabilities',
      description: 'Search the policy-filtered public CS Navigator capability registry by ordinary-language need. Returns only curated public entries; it does not execute arbitrary GitHub content.',
      inputSchema: {
        query: z.string().min(1).max(200),
        category: z.string().max(80).optional(),
        limit: z.number().int().min(1).max(10).default(5)
      },
      annotations: readonly
    },
    async ({ query, category, limit }) => {
      try {
        const registry = await loadRegistry();
        const matches = searchRegistry(registry, { query, category, limit });
        return jsonResult({
          query,
          count: matches.length,
          matches,
          registry: {
            id: registry.registry_id,
            plugin_line: registry.plugin_line,
            source_of_truth: registry.source_of_truth,
            evidence_boundary: registry.evidence_boundary
          }
        });
      } catch (error) {
        return errorResult('CS Navigator registry search failed: ' + error.message);
      }
    }
  );

  server.registerTool(
    'get_capability',
    {
      title: 'Get CS capability',
      description: 'Read one public CS Navigator capability card and its curated playbook from the live registry. Use after capability search or when the capability ID is already known.',
      inputSchema: {
        id: z.string().min(1).max(100)
      },
      annotations: readonly
    },
    async ({ id }) => {
      try {
        const registry = await loadRegistry();
        const entry = getCapability(registry, id);
        if (!entry) return errorResult('Capability not found in the public registry: ' + id);
        return jsonResult({
          id: entry.id,
          name: entry.name,
          category: entry.category,
          summary: entry.summary,
          playbook: entry.playbook,
          execution_mode: entry.execution_mode,
          evidence_state: entry.evidence_state,
          freshness_state: entry.freshness_state,
          permission_profile: entry.permission_profile,
          source_sha256: entry.source_sha256,
          source_url: entry.source_url,
          evidence_boundary: registry.evidence_boundary
        });
      } catch (error) {
        return errorResult('CS Navigator capability read failed: ' + error.message);
      }
    }
  );

  server.registerTool(
    'get_evidence',
    {
      title: 'Get CS evidence',
      description: 'Read evidence, freshness, permission, source-hash, and provenance metadata for one public CS Navigator capability. This does not create a trust score or safety guarantee.',
      inputSchema: {
        id: z.string().min(1).max(100)
      },
      annotations: readonly
    },
    async ({ id }) => {
      try {
        const registry = await loadRegistry();
        const entry = getCapability(registry, id);
        if (!entry) return errorResult('Capability not found in the public registry: ' + id);
        return jsonResult({
          evidence: getEvidenceView(entry),
          boundary: registry.evidence_boundary
        });
      } catch (error) {
        return errorResult('CS Navigator evidence read failed: ' + error.message);
      }
    }
  );

  return server;
}

export default async function handler(req, res) {
  const server = createServer();
  const transport = new StreamableHTTPServerTransport({
    sessionIdGenerator: undefined,
    enableJsonResponse: true
  });

  res.on('close', () => {
    transport.close().catch(() => {});
    server.close().catch(() => {});
  });

  try {
    await server.connect(transport);
    await transport.handleRequest(req, res, req.body);
  } catch (error) {
    if (!res.headersSent) {
      res.statusCode = 500;
      res.setHeader('content-type', 'application/json');
      res.end(JSON.stringify({ error: 'MCP request failed.' }));
    }
  }
}
