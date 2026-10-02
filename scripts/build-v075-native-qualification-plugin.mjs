#!/usr/bin/env node
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { createZip } from '../installer/zip.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pluginRoot = path.join(root, 'plugins', 'cs-navigator');

const QA_PLUGIN_NAME = 'cs-navigator-v075-qa';
const QA_ROUTER_SKILL = 'cs-navigator-v075-qa';
const QA_VERSION = '0.7.5-rc.1';
const QA_DISPLAY_NAME = 'CS Navigator 0.7.5 QA';
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
    j.description = 'Qualification-only identity for CS Navigator 0.7.5 Verifiable Trust II and Skill Containers. Uses a unique plugin/skill ID so native tests cannot reuse an older CS Navigator package.';
    const ui = j.extensions?.['com.openai']?.interface;
    if (ui) {
      ui.displayName = QA_DISPLAY_NAME;
      ui.shortDescription = 'Verify CS Navigator 0.7.5';
      ui.longDescription = 'Qualification-only CS Navigator 0.7.5 identity for container-aware routing and plain-language interpretation of deterministic Container Guardian decisions. Runtime evidence is kept separate from native ChatGPT behavior.';
      ui.defaultPrompt = [
        'Use CS Navigator 0.7.5 QA. Explain what a Container Guardian STOP means without routing around it.',
        'Use CS Navigator 0.7.5 QA. Explain a DEGRADE decision without inventing missing evidence.',
        'Use CS Navigator 0.7.5 QA. Tell me whether Container Guardian runtime enforcement actually ran in this chat.'
      ];
    }
    return JSON.stringify(j, null, 2) + '\n';
  }

  if (rel === 'capability-pack.json') {
    const j = JSON.parse(text);
    j.pack_version = QA_VERSION;
    j.router = QA_ROUTER_SKILL;
    j.qualification_identity = QA_IDENTITY;
    j.container_guardian = {
      release_line: '0.7.5',
      decision_contract: ['ALLOW', 'CONFIRM', 'DEGRADE', 'STOP'],
      runtime_module: 'runtime/container-guardian.mjs',
      navigator_adapter: 'runtime/navigator-container-adapter.mjs',
      policy_reference: 'skills/' + QA_ROUTER_SKILL + '/references/container-default-policy.json',
      runtime_eval_reference: 'skills/' + QA_ROUTER_SKILL + '/references/container-guardian-runtime-eval.json',
      evidence_boundary: 'Deterministic runtime evidence does not prove that the Guardian executed inside the ChatGPT native skill surface.'
    };
    return JSON.stringify(j, null, 2) + '\n';
  }

  if (rel === 'skills/cs-navigator/SKILL.md') {
    let out = text.replace(/^name:\s*cs-navigator$/m, 'name: ' + QA_ROUTER_SKILL);
    out = out.replace('# CS Navigator\n', '# CS Navigator 0.7.5 QA\n');

    const marker = [
      '## Skill Container runtime boundary — 0.7.5 QA',
      '',
      'This is the **' + QA_IDENTITY + '** native-qualification identity.',
      '',
      'The deterministic Container Guardian exists outside the chat-native skill instructions. **Do not claim that the Guardian executed unless the host/runtime provides an actual Guardian decision record.** The bundled runtime evidence proves only the tested deterministic module behavior.',
      '',
      'When a Guardian decision record is present:',
      '',
      '- **STOP** — stop the proposed path. Do not silently choose another tool, skill, credential, destination, retry strategy, or permission path to bypass the stop. Explain the material reason in plain language. Any materially different alternative requires a new Guardian decision.',
      '- **DEGRADE** — return only the bounded partial result that remains supported. Mark missing or conflicting evidence explicitly and do not invent the missing portion.',
      '- **CONFIRM** — ask for explicit confirmation for the exact proposed action. Do not describe it as executed before confirmation is granted.',
      '- **ALLOW** — the proposed action is inside the active container for that decision. This is not a claim that the action, skill, or system is universally safe.',
      '',
      'If no Guardian decision record is available, distinguish **container policy/instructions** from **deterministic runtime enforcement**. Never fabricate a decision, reason code, tool result, citation, observation, or audit record.',
      '',
      'Keep the existing native-first routing rule. Container logic must not become a reason to activate a skill for an ordinary task that ChatGPT can handle directly.',
      '',
      'The runtime eval reference is evidence for the Guardian module only. It must not be promoted to native ChatGPT qualification, zero-hallucination proof, or an absolute safety guarantee.',
      ''
    ].join('\n');

    if (!out.includes('## Skill Container runtime boundary — 0.7.5 QA')) {
      out = out.replace(
        'Help the user move from **“I want to do this”** to the smallest useful capability set while keeping the work inside ChatGPT whenever practical.\n\n',
        'Help the user move from **“I want to do this”** to the smallest useful capability set while keeping the work inside ChatGPT whenever practical.\n\n' + marker + '\n'
      );
    }
    return out;
  }

  if (rel === 'skills/cs-navigator/agents/openai.yaml') {
    return [
      'interface:',
      '  display_name: "' + QA_DISPLAY_NAME + '"',
      '  short_description: "Force-fresh 0.7.5 container qualification"',
      '  default_prompt: "Use CS Navigator 0.7.5 QA. Preserve native-first routing and interpret Container Guardian decisions without claiming runtime enforcement unless a real decision record is present."',
      ''
    ].join('\n');
  }

  if (rel === 'skills/cs-navigator/references/catalog-snapshot.json') {
    const j = JSON.parse(text);
    j.generated_for_plugin = QA_VERSION;
    j.qualification_identity = QA_IDENTITY;
    j.qualification_only = true;
    j.container_guardian = {
      runtime_evidence: 'container-guardian-runtime-eval.json',
      default_policy: 'container-default-policy.json',
      native_surface_boundary: 'A native ChatGPT response must not claim deterministic Guardian execution unless a host/runtime decision record is actually supplied.'
    };
    j.policy = 'Qualification-only 0.7.5 identity. Preserve current evidence dimensions, native-first routing, and the runtime/native evidence boundary. ' + (j.policy || '');
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
  if ([
    'plugin.json',
    'capability-pack.json',
    'skills/cs-navigator/SKILL.md',
    'skills/cs-navigator/agents/openai.yaml',
    'skills/cs-navigator/references/catalog-snapshot.json'
  ].includes(rel)) {
    data = Buffer.from(transformText(rel, original.toString('utf8')), 'utf8');
  }
  entries.push({
    name: path.posix.join(QA_PLUGIN_NAME, outputRel(rel)),
    data
  });
}

entries.push({
  name: path.posix.join(QA_PLUGIN_NAME, 'skills', QA_ROUTER_SKILL, 'references', 'container-default-policy.json'),
  data: await readFile(path.join(root, 'trust/containers/default.json'))
});
entries.push({
  name: path.posix.join(QA_PLUGIN_NAME, 'skills', QA_ROUTER_SKILL, 'references', 'container-guardian-runtime-eval.json'),
  data: await readFile(path.join(root, 'trust/evals/container-guardian/runtime-v1.json'))
});

const names = entries.map(e=>e.name);
if (names.length !== 16) throw new Error('Expected 16 entries, got ' + names.length);
if (!names.includes(QA_PLUGIN_NAME + '/plugin.json')) throw new Error('QA plugin.json missing');
if (!names.includes(QA_PLUGIN_NAME + '/skills/' + QA_ROUTER_SKILL + '/SKILL.md')) throw new Error('QA router skill missing');
if (!names.includes(QA_PLUGIN_NAME + '/skills/' + QA_ROUTER_SKILL + '/references/container-default-policy.json')) throw new Error('Container policy reference missing');
if (!names.includes(QA_PLUGIN_NAME + '/skills/' + QA_ROUTER_SKILL + '/references/container-guardian-runtime-eval.json')) throw new Error('Container runtime eval reference missing');
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
