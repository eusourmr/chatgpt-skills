#!/usr/bin/env node
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { createZip } from '../installer/zip.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pluginRoot = path.join(root, 'plugins', 'cs-navigator');

const QA_PLUGIN_NAME = 'cs-navigator-v070-qa';
const QA_ROUTER_SKILL = 'cs-navigator-v070-qa';
const QA_VERSION = '0.7.0-rc.5';
const QA_DISPLAY_NAME = 'CS Navigator 0.7 QA';
const QA_IDENTITY = QA_PLUGIN_NAME + '@' + QA_VERSION;

async function walk(dir, prefix = '') {
  const out = [];
  for (const item of (await readdir(dir, { withFileTypes: true })).sort((a,b)=>a.name.localeCompare(b.name))) {
    const rel = path.posix.join(prefix, item.name);
    if (item.isDirectory()) out.push(...await walk(path.join(dir, item.name), rel));
    else if (item.isFile()) out.push(rel);
  }
  return out;
}

function transformText(rel, text) {
  if (rel === 'plugin.json') {
    const j = JSON.parse(text);
    j.name = QA_PLUGIN_NAME;
    j.version = QA_VERSION;
    j.description = 'Qualification-only identity for CS Navigator 0.7 Verifiable Trust. Uses a unique plugin/skill ID so native tests cannot reuse a stale installed CS Navigator package.';
    const ui = j.extensions?.['com.openai']?.interface;
    if (ui) {
      ui.displayName = QA_DISPLAY_NAME;
      ui.shortDescription = 'Verify CS Navigator 0.7';
      ui.longDescription = 'Qualification-only CS Navigator 0.7 identity. It exercises the same Verifiable Trust routing contract while forcing a fresh runtime install instead of reusing an older CS Navigator package.';
      ui.defaultPrompt = [
        'Use CS Navigator 0.7 QA. Which CS capability fits this goal and what is its current evidence state?',
        'Use CS Navigator 0.7 QA. Is this skill current, tested, and appropriately evidenced?',
        'Use CS Navigator 0.7 QA. Tell me whether this task should stay native or use a skill.'
      ];
    }
    return JSON.stringify(j, null, 2) + '\n';
  }

  if (rel === 'capability-pack.json') {
    const j = JSON.parse(text);
    j.pack_version = QA_VERSION;
    j.router = QA_ROUTER_SKILL;
    j.qualification_identity = QA_IDENTITY;
    return JSON.stringify(j, null, 2) + '\n';
  }

  if (rel === 'skills/cs-navigator/SKILL.md') {
    let out = text.replace(/^name:\s*cs-navigator$/m, 'name: ' + QA_ROUTER_SKILL);
    out = out.replace('# CS Navigator\n', '# CS Navigator 0.7 QA\n');
    const marker = '## Qualification runtime identity\n\n' +
      'This is the **' + QA_IDENTITY + '** native-qualification identity. It exists only to prevent stale local/plugin cache reuse during 0.7 qualification.\n\n' +
      'When asked for the current snapshot, version, evidence state, trust state, freshness, or runtime identity, read references/catalog-snapshot.json and use its generated_for_plugin and qualification_identity fields. Do not answer from remembered R6 or another historical candidate.\n\n';
    if (!out.includes('## Qualification runtime identity')) {
      out = out.replace('Help the user move from **“I want to do this”** to the smallest useful capability set while keeping the work inside ChatGPT whenever practical.\n\n',
        'Help the user move from **“I want to do this”** to the smallest useful capability set while keeping the work inside ChatGPT whenever practical.\n\n' + marker);
    }
    return out;
  }

  if (rel === 'skills/cs-navigator/agents/openai.yaml') {
    return [
      'interface:',
      '  display_name: "' + QA_DISPLAY_NAME + '"',
      '  short_description: "Force-fresh 0.7 trust qualification"',
      '  default_prompt: "Use CS Navigator 0.7 QA and answer from the currently bundled 0.7 snapshot, not historical R6 evidence."',
      ''
    ].join('\n');
  }

  if (rel === 'skills/cs-navigator/references/catalog-snapshot.json') {
    const j = JSON.parse(text);
    j.generated_for_plugin = QA_VERSION;
    j.qualification_identity = QA_IDENTITY;
    j.qualification_only = true;
    j.policy = 'Qualification-only snapshot identity. Use current 0.7 evidence fields. Do not substitute historical R6 framing. ' + (j.policy || '');
    return JSON.stringify(j, null, 2) + '\n';
  }

  return text;
}

function outputRel(rel) {
  if (rel.startsWith('skills/cs-navigator/')) {
    return rel.replace('skills/cs-navigator/', 'skills/' + QA_ROUTER_SKILL + '/');
  }
  return rel;
}

const files = await walk(pluginRoot);
const entries = [];
for (const rel of files) {
  const original = await readFile(path.join(pluginRoot, rel));
  let data = original;
  if (['plugin.json','capability-pack.json','skills/cs-navigator/SKILL.md','skills/cs-navigator/agents/openai.yaml','skills/cs-navigator/references/catalog-snapshot.json'].includes(rel)) {
    data = Buffer.from(transformText(rel, original.toString('utf8')), 'utf8');
  }
  entries.push({
    name: path.posix.join(QA_PLUGIN_NAME, outputRel(rel)),
    data
  });
}

const names = entries.map(e=>e.name);
if (names.length !== 14) throw new Error('Expected 14 entries, got ' + names.length);
if (!names.includes(QA_PLUGIN_NAME + '/plugin.json')) throw new Error('QA plugin.json missing');
if (!names.includes(QA_PLUGIN_NAME + '/skills/' + QA_ROUTER_SKILL + '/SKILL.md')) throw new Error('QA router skill missing');
if (names.some(n=>n.includes('/skills/cs-navigator/'))) throw new Error('Legacy router skill path leaked into QA artifact');

const zip = createZip(entries);
const outDir = path.join(root, 'dist', 'plugin-submission');
await mkdir(outDir, { recursive: true });
const fileName = QA_PLUGIN_NAME + '-' + QA_VERSION + '.zip';
const outPath = path.join(outDir, fileName);
await writeFile(outPath, zip);

const sha256 = crypto.createHash('sha256').update(zip).digest('hex');
await writeFile(outPath + '.sha256', sha256 + '  ' + fileName + '\n', 'utf8');

console.log('Built ' + path.relative(root, outPath));
console.log('Identity ' + QA_IDENTITY);
console.log('SHA-256 ' + sha256);
console.log('Entries ' + entries.length);
