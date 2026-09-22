#!/usr/bin/env node
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const readJson = async (rel) => JSON.parse(await readFile(path.join(root, rel), 'utf8'));
const errors = [];
const expect = (ok, msg) => { if (!ok) errors.push(msg); };
const oneLine = (s) => typeof s === 'string' && s.length > 0 && !/[\r\n\u2028\u2029]/u.test(s);
const httpsUrl = (s) => { try { const u = new URL(s); return u.protocol === 'https:' && !u.username && !u.password; } catch { return false; } };

const s = await readJson('submission/cs-navigator-0.5.0.json');
const p = s.plugin || {};
const l = s.listing || {};
const a = s.architecture || {};

expect(/^[A-Za-z0-9][A-Za-z0-9_-]*$/.test(p.name || '') && p.name.length <= 64, 'plugin name must meet public-directory format');
expect(/^\d+\.\d+\.\d+(?:[-+][0-9A-Za-z.-]+)?$/.test(p.version || '') && p.version.length <= 64, 'version must be semantic');
expect(p.type === 'skills-only', 'public candidate must remain skills-only');
expect(oneLine(l.display_name) && l.display_name.length <= 30, 'display_name must be one line and <=30 chars');
expect(oneLine(l.short_description) && l.short_description.length <= 30, 'short_description must be one line and <=30 chars');
expect(typeof l.long_description === 'string' && l.long_description.length > 0 && l.long_description.length <= 4000, 'long_description must be <=4000 chars');
expect(oneLine(l.developer_name) && l.developer_name.length <= 80, 'developer_name must be one line and <=80 chars');
expect(oneLine(l.category), 'category is required');

expect(Array.isArray(l.capabilities) && l.capabilities.length > 0 && l.capabilities.length <= 20, 'capabilities must contain 1..20 items');
for (const [i, x] of (l.capabilities || []).entries()) expect(oneLine(x) && x.length <= 120, `capability ${i+1} must be one line and <=120 chars`);

expect(Array.isArray(l.starter_prompts) && l.starter_prompts.length > 0 && l.starter_prompts.length <= 3, 'starter_prompts must contain 1..3 items');
const normalizedPrompts = new Set();
for (const [i, x] of (l.starter_prompts || []).entries()) {
  expect(oneLine(x) && x.length <= 128, `starter prompt ${i+1} must be one line and <=128 chars`);
  const n = String(x).normalize('NFKC').replace(/\s+/g, ' ').trim();
  expect(!normalizedPrompts.has(n), `starter prompt ${i+1} must be unique`);
  normalizedPrompts.add(n);
}

for (const key of ['website_url','support_url','privacy_url','terms_url']) {
  expect(typeof l[key] === 'string' && l[key].length <= 1024 && httpsUrl(l[key]), `${key} must be a valid HTTPS URL <=1024 chars`);
}

expect(a.skill_only === true && a.mcp === false && a.external_server === false && a.external_auth === false && a.external_network === false, 'core public plugin must remain skill-only with no external runtime dependencies');

expect(Array.isArray(s.review_cases?.positive) && s.review_cases.positive.length >= 5, 'submission needs at least 5 positive review cases');
expect(Array.isArray(s.review_cases?.negative) && s.review_cases.negative.length >= 3, 'submission needs at least 3 negative review cases');
for (const group of ['positive','negative']) {
  for (const item of s.review_cases?.[group] || []) {
    expect(oneLine(item.id), `${group} review case missing id`);
    expect(typeof item.prompt === 'string' && item.prompt.trim().length > 0, `${item.id}: prompt required`);
    expect(typeof item.expected === 'string' && item.expected.trim().length > 0, `${item.id}: expected behavior required`);
  }
}

const plugin = await readJson('plugins/cs-navigator/plugin.json');
const ui = plugin.extensions?.['com.openai']?.interface || {};
expect(plugin.version === p.version, 'plugin.json version must match submission version');
expect(ui.displayName === l.display_name, 'plugin displayName must match submission listing');
expect(ui.shortDescription === l.short_description, 'plugin shortDescription must match submission listing');
expect(ui.composerIcon === './assets/cs-icon.png', 'plugin composerIcon must point to ./assets/cs-icon.png');
expect(ui.logo === './assets/cs-icon.png', 'plugin logo must point to ./assets/cs-icon.png');
expect(ui.privacyPolicyURL === l.privacy_url, 'plugin privacyPolicyURL must match submission listing');
expect(ui.termsOfServiceURL === l.terms_url, 'plugin termsOfServiceURL must match submission listing');

const icon = await readFile(path.join(root, 'plugins', 'cs-navigator', 'assets', 'cs-icon.png'));
expect(icon.length <= 5 * 1024 * 1024, 'plugin icon must be <=5 MiB');
expect(icon.length >= 24 && icon.subarray(0, 8).equals(Buffer.from([0x89,0x50,0x4e,0x47,0x0d,0x0a,0x1a,0x0a])), 'plugin icon must be a valid PNG signature');
if (icon.length >= 24) {
  const width = icon.readUInt32BE(16);
  const height = icon.readUInt32BE(20);
  expect(width === height, 'plugin icon must be square');
  expect(width >= 48 && width <= 4096, 'plugin icon dimensions must be between 48 and 4096 px');
}
expect(plugin.mcp === undefined && plugin.mcpServers === undefined, 'plugin.json must not introduce MCP');

if (errors.length) {
  console.error('Public plugin submission validation failed:');
  for (const e of errors) console.error(`- ${e}`);
  process.exit(1);
}
console.log(`Public plugin submission OK: ${p.name} ${p.version}; ${s.review_cases.positive.length} positive + ${s.review_cases.negative.length} negative cases.`);
