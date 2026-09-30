#!/usr/bin/env node
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import { buildAllPassports } from './passport-lib.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const write = process.argv.includes('--write');
const check = process.argv.includes('--check');

if (write === check) {
  console.error('Use exactly one of --write or --check.');
  process.exit(2);
}

const outDir = path.join(root, 'trust', 'passports');
const { passports } = await buildAllPassports(root);
await mkdir(outDir, { recursive: true });

const errors = [];
for (const [id, passport] of passports) {
  const rel = path.join('trust', 'passports', `${id}.json`);
  const full = path.join(root, rel);
  const expected = JSON.stringify(passport, null, 2) + '\n';

  if (write) {
    await writeFile(full, expected, 'utf8');
    console.log(`WROTE ${rel}`);
    continue;
  }

  let actual;
  try {
    actual = await readFile(full, 'utf8');
  } catch {
    errors.push(`${rel}: missing; run node scripts/generate-trust-passports.mjs --write`);
    continue;
  }
  if (actual !== expected) errors.push(`${rel}: stale or inconsistent with current evidence sources`);
}

if (errors.length) {
  console.error('Trust Passport generation check failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Trust Passport generation OK: ${passports.size} passport(s)`);
