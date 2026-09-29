#!/usr/bin/env node
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const readJson = async (rel) => JSON.parse(await readFile(path.join(root, rel), 'utf8'));
const errors = [];
const expect = (condition, message) => { if (!condition) errors.push(message); };

const marketplace = await readJson('.agents/plugins/marketplace.json');
expect(marketplace.name === 'chatgpt-skills', 'marketplace name must be chatgpt-skills');
expect(Array.isArray(marketplace.plugins) && marketplace.plugins.length >= 1, 'marketplace must contain plugins');

const entry = marketplace.plugins.find((item) => item.name === 'cs-navigator');
expect(Boolean(entry), 'marketplace must contain cs-navigator');
expect(entry?.source?.source === 'local', 'cs-navigator marketplace source must be local within this GitHub repository');
expect(entry?.source?.path === './plugins/cs-navigator', 'cs-navigator marketplace path must be ./plugins/cs-navigator');

const plugin = await readJson('plugins/cs-navigator/plugin.json');
expect(plugin.$schema === 'https://agent-plugins.org/schemas/1.0.0/plugin.schema.json', 'cs-navigator plugin schema must be Agent Plugins 1.0.0');
expect(plugin.name === 'cs-navigator', 'plugin name must be cs-navigator');
expect(/^\d+\.\d+\.\d+(?:[-+][0-9A-Za-z.-]+)?$/.test(plugin.version || ''), 'plugin version must be semantic');
expect(!plugin.mcpServers, 'CS Navigator core plugin must not declare MCP servers');
expect(!plugin.mcp, 'CS Navigator core plugin must not declare MCP');

const pack = await readJson('plugins/cs-navigator/capability-pack.json');
const packFixtures = await readJson('tests/fixtures/capability-pack.json');
const execution = await readJson('trust/execution.json');
const expectedIncluded = [
  'regenerative-language-bridge',
  'regenerative-impact-map',
  'regenerative-resilience-plan',
  'regenerative-adaptive-experiment'
];
const expectedPluginSkills = ['cs-navigator', ...expectedIncluded].sort();

expect(pack.schema_version === 1, 'Capability Pack manifest schema_version must be 1');
expect(pack.pack_version === plugin.version, 'Capability Pack version must match plugin version');
expect(packFixtures.schema_version === 1, 'Capability Pack fixtures schema_version must be 1');
expect(packFixtures.pack_version === plugin.version, 'Capability Pack fixture version must match plugin version');
expect(packFixtures.router === 'cs-navigator', 'Capability Pack fixtures router must be cs-navigator');
expect(Array.isArray(packFixtures.cases) && packFixtures.cases.length >= 8, 'Capability Pack needs at least eight collision/handoff fixtures');
const packFixtureIds = new Set();
let directCases = 0;
let routingCases = 0;
for (const item of packFixtures.cases || []) {
  expect(typeof item.id === 'string' && item.id.length > 0, 'Capability Pack fixture missing id');
  expect(!packFixtureIds.has(item.id), `Duplicate Capability Pack fixture id: ${item.id}`);
  packFixtureIds.add(item.id);
  expect(typeof item.prompt === 'string' && item.prompt.length > 0, `${item.id}: missing prompt`);
  expect(['native-only','router','explicit-skill','pack-handoff'].includes(item.expected_activation), `${item.id}: invalid expected_activation`);
  expect(typeof item.reason === 'string' && item.reason.length > 0, `${item.id}: missing reason`);
  if (item.expected_activation === 'native-only') directCases += 1;
  if (item.expected_activation === 'router') routingCases += 1;
}
expect(directCases >= 4, 'Capability Pack fixtures need at least four anti-overrouting cases');
expect(routingCases >= 4, 'Capability Pack fixtures need at least four capability-routing cases');
expect(pack.router === 'cs-navigator', 'Capability Pack router must be cs-navigator');
expect(Array.isArray(pack.included_skills), 'Capability Pack included_skills must be an array');

const includedIds = (pack.included_skills || []).map((item) => item.id).sort();
expect(JSON.stringify(includedIds) === JSON.stringify([...expectedIncluded].sort()), 'Capability Pack I must contain the four approved bundled skills');

for (const item of pack.included_skills || []) {
  const executionInfo = execution.skills?.[item.id];
  expect(Boolean(executionInfo), `${item.id}: missing execution evidence`);
  expect(item.mode === 'chat-native', `${item.id}: Capability Pack I only accepts chat-native skills`);
  expect(executionInfo?.mode === 'chat-native', `${item.id}: authoritative execution mode must be chat-native`);
  expect(item.evidence_state === executionInfo?.evidence_state, `${item.id}: pack evidence state must match trust/execution.json`);
}

async function listFiles(dir, prefix = '') {
  const out = [];
  for (const item of (await readdir(dir, { withFileTypes: true })).sort((a,b) => a.name.localeCompare(b.name))) {
    const rel = path.posix.join(prefix, item.name);
    if (item.isDirectory()) out.push(...await listFiles(path.join(dir, item.name), rel));
    else if (item.isFile()) out.push(rel);
  }
  return out;
}

const pluginSkillsRoot = path.join(root, 'plugins', 'cs-navigator', 'skills');
const actualPluginSkillDirs = (await readdir(pluginSkillsRoot, { withFileTypes: true }))
  .filter((item) => item.isDirectory())
  .map((item) => item.name)
  .sort();
expect(JSON.stringify(actualPluginSkillDirs) === JSON.stringify(expectedPluginSkills), 'Plugin skill directories must exactly match the Capability Pack I contract');

const canonicalRoots = new Map([
  ['cs-navigator', path.join(root, 'skills', 'featured', 'cs-navigator')],
  ...expectedIncluded.map((id) => [id, path.join(root, 'skills', id)])
]);

for (const id of expectedPluginSkills) {
  const canonicalRoot = canonicalRoots.get(id);
  const pluginSkillRoot = path.join(pluginSkillsRoot, id);
  const canonicalFiles = await listFiles(canonicalRoot);
  const pluginFiles = await listFiles(pluginSkillRoot);
  expect(JSON.stringify(pluginFiles) === JSON.stringify(canonicalFiles), `${id}: plugin file list must exactly match canonical skill`);

  for (const rel of canonicalFiles) {
    const canonical = await readFile(path.join(canonicalRoot, rel));
    const mirrored = await readFile(path.join(pluginSkillRoot, rel));
    expect(Buffer.compare(canonical, mirrored) === 0, `${id}: plugin drift in ${rel}`);
  }
}

if (errors.length) {
  console.error('GitHub marketplace validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`GitHub marketplace OK: cs-navigator ${plugin.version}, ${expectedPluginSkills.length} mirrored skills, Capability Pack I evidence-aligned, no MCP dependency.`);
