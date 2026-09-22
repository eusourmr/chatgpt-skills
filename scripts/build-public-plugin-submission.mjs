#!/usr/bin/env node
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { createZip } from '../installer/zip.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const submission = JSON.parse(await readFile(path.join(root, 'submission', 'cs-navigator-0.5.0.json'), 'utf8'));
const pluginRoot = path.join(root, 'plugins', 'cs-navigator');

async function walk(dir, prefix = '') {
  const out = [];
  for (const item of (await readdir(dir, { withFileTypes: true })).sort((a,b) => a.name.localeCompare(b.name))) {
    const rel = path.posix.join(prefix, item.name);
    if (item.isDirectory()) out.push(...await walk(path.join(dir, item.name), rel));
    else if (item.isFile()) out.push(rel);
  }
  return out;
}

const files = await walk(pluginRoot);
if (!files.includes('plugin.json')) throw new Error('plugin.json missing from plugin root');
if (!files.includes('skills/cs-navigator/SKILL.md')) throw new Error('skills/cs-navigator/SKILL.md missing from plugin root');

const entries = [];
for (const rel of files) {
  entries.push({
    name: path.posix.join('cs-navigator', rel),
    data: await readFile(path.join(pluginRoot, rel))
  });
}

const zip = createZip(entries);
const outDir = path.join(root, 'dist', 'plugin-submission');
await mkdir(outDir, { recursive: true });
const fileName = `cs-navigator-plugin-${submission.plugin.version}.zip`;
const outPath = path.join(outDir, fileName);
await writeFile(outPath, zip);

const sha256 = crypto.createHash('sha256').update(zip).digest('hex');
await writeFile(path.join(outDir, `${fileName}.sha256`), `${sha256}  ${fileName}\n`, 'utf8');

console.log(`Built ${path.relative(root, outPath)}`);
console.log(`SHA-256 ${sha256}`);
console.log(`Entries ${entries.length}`);
