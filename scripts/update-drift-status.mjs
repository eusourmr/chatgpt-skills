#!/usr/bin/env node
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import { hashSkillArtifact, readJson } from './passport-lib.mjs';

const root = process.cwd() === '/' ? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..') : process.cwd();
const write = process.argv.includes('--write');
const check = process.argv.includes('--check');
const asOfIndex = process.argv.indexOf('--as-of');
const asOf = asOfIndex >= 0 ? process.argv[asOfIndex + 1] : new Date().toISOString().slice(0, 10);

if (write === check) {
  console.error('Use exactly one of --write or --check.');
  process.exit(2);
}
if (!/^\d{4}-\d{2}-\d{2}$/.test(asOf)) {
  console.error('--as-of must be YYYY-MM-DD');
  process.exit(2);
}

const manifest = await readJson(root, 'installer/manifest.json');
const outDir = path.join(root, 'trust', 'upstream');
if (write) await mkdir(outDir, { recursive: true });
const errors = [];

for (const id of Object.keys(manifest.skills).sort()) {
  const passport = await readJson(root, `trust/passports/${id}.json`);
  const current = await hashSkillArtifact(root, manifest.skills[id]);

  let state = 'current';
  let action = 'none';
  if (current.artifact_sha256 !== passport.integrity.artifact_sha256) {
    state = 'changed-unreviewed';
    action = 're-review-required';
  } else if (asOf > passport.freshness.review_due_at) {
    state = 'stale';
    action = 're-review-required';
  }

  const record = {
    schema_version: 1,
    skill_id: id,
    reviewed_source_revision: passport.provenance.reviewed_source_revision,
    reviewed_artifact_sha256: passport.integrity.artifact_sha256,
    current_artifact_sha256: current.artifact_sha256,
    review_due_at: passport.freshness.review_due_at,
    state,
    action,
    policy: 'A reviewed artifact cannot inherit trust after byte drift or evidence expiry without re-review.'
  };

  const expected = JSON.stringify(record, null, 2) + '\n';
  const out = path.join(outDir, `${id}.json`);
  if (write) {
    await writeFile(out, expected, 'utf8');
    console.log(`${id}: ${state}`);
  } else {
    let actual = '';
    try { actual = await readFile(out, 'utf8'); } catch {}
    if (actual !== expected) errors.push(`${id}: drift status missing/stale; expected state=${state}`);
  }

  if (state !== 'current') {
    console.error(`DRIFT ${id}: ${state} -> ${action}`);
  }
}

if (errors.length) {
  console.error('Drift Watch validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log(`Drift Watch OK: ${Object.keys(manifest.skills).length} bundled skill(s), as_of=${asOf}`);
