const DEFAULT_REGISTRY_URL =
  'https://raw.githubusercontent.com/eusourmr/chatgpt-skills/main/registry/public-capabilities-v1.json';

let cache = null;
let cacheAt = 0;
const CACHE_MS = 60_000;

function normalize(value='') {
  return String(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function validateRegistry(registry) {
  if (!registry || registry.schema_version !== 2) {
    throw new Error('Unsupported CS Navigator public registry schema.');
  }
  if (!Array.isArray(registry.entries)) {
    throw new Error('CS Navigator public registry is missing entries.');
  }
  for (const entry of registry.entries) {
    if (entry.distribution_state !== 'public') {
      throw new Error('Non-public entry leaked into public registry: ' + entry.id);
    }
    if (!entry.id || !entry.source_sha256 || !entry.playbook) {
      throw new Error('Incomplete public registry entry: ' + (entry.id || 'unknown'));
    }
  }
  return registry;
}

export async function loadRegistry({ force = false } = {}) {
  const now = Date.now();
  if (!force && cache && now - cacheAt < CACHE_MS) return cache;

  const url = process.env.CS_NAVIGATOR_REGISTRY_URL || DEFAULT_REGISTRY_URL;
  const response = await fetch(url, {
    headers: {
      accept: 'application/json',
      'user-agent': 'cs-navigator-live-registry/0.16.0'
    }
  });
  if (!response.ok) {
    throw new Error('Registry fetch failed with HTTP ' + response.status);
  }
  const registry = validateRegistry(await response.json());
  cache = registry;
  cacheAt = now;
  return registry;
}

export function searchRegistry(registry, { query, category, limit = 5 }) {
  const q = normalize(query);
  const tokens = q.split(/\s+/).filter(Boolean);
  const categoryNorm = normalize(category);

  return registry.entries
    .filter(entry => !categoryNorm || normalize(entry.category) === categoryNorm)
    .map(entry => {
      const haystack = normalize([
        entry.id,
        entry.name,
        entry.category,
        entry.summary,
        entry.playbook
      ].join(' '));
      let score = 0;
      if (q && haystack.includes(q)) score += 8;
      for (const token of tokens) {
        if (normalize(entry.id).includes(token)) score += 6;
        if (normalize(entry.name).includes(token)) score += 5;
        if (normalize(entry.category).includes(token)) score += 3;
        if (normalize(entry.summary).includes(token)) score += 3;
        if (normalize(entry.playbook).includes(token)) score += 1;
      }
      return { entry, score };
    })
    .filter(x => !q || x.score > 0)
    .sort((a,b) => b.score - a.score || a.entry.id.localeCompare(b.entry.id))
    .slice(0, Math.max(1, Math.min(10, limit)))
    .map(({ entry, score }) => ({
      id: entry.id,
      name: entry.name,
      category: entry.category,
      summary: entry.summary,
      evidence_state: entry.evidence_state,
      freshness_state: entry.freshness_state,
      score
    }));
}

export function getCapability(registry, id) {
  return registry.entries.find(entry => entry.id === id) || null;
}

export function getEvidenceView(entry) {
  if (!entry) return null;
  return {
    id: entry.id,
    name: entry.name,
    distribution_state: entry.distribution_state,
    execution_mode: entry.execution_mode,
    evidence_state: entry.evidence_state,
    freshness_state: entry.freshness_state,
    permission_profile: entry.permission_profile,
    required_capabilities: entry.required_capabilities,
    source_sha256: entry.source_sha256,
    source_url: entry.source_url,
    trust_passport_url: entry.trust_passport_url,
    reviewed_for_plugin: entry.reviewed_for_plugin
  };
}
