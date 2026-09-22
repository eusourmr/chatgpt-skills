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

const canonicalRoot = path.join(root, 'skills', 'featured', 'cs-navigator');
const pluginSkillRoot = path.join(root, 'plugins', 'cs-navigator', 'skills', 'cs-navigator');

async function listFiles(dir, prefix = '') {
  const out = [];
  for (const item of (await readdir(dir, { withFileTypes: true })).sort((a,b) => a.name.localeCompare(b.name))) {
    const rel = path.posix.join(prefix, item.name);
    if (item.isDirectory()) out.push(...await listFiles(path.join(dir, item.name), rel));
    else if (item.isFile()) out.push(rel);
  }
  return out;
}

const canonicalFiles = await listFiles(canonicalRoot);
const pluginFiles = await listFiles(pluginSkillRoot);
expect(JSON.stringify(pluginFiles) === JSON.stringify(canonicalFiles), 'GitHub plugin skill file list must exactly match canonical cs-navigator');

for (const rel of canonicalFiles) {
  const canonical = await readFile(path.join(canonicalRoot, rel));
  const mirrored = await readFile(path.join(pluginSkillRoot, rel));
  expect(Buffer.compare(canonical, mirrored) === 0, `GitHub plugin drift: ${rel}`);
}

if (errors.length) {
  console.error('GitHub marketplace validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`GitHub marketplace OK: cs-navigator ${plugin.version}, ${canonicalFiles.length} mirrored skill file(s), no MCP dependency.`);
