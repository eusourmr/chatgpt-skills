#!/usr/bin/env node
import { access, readFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import { buildAllPassports, isCommit, isSha256 } from './passport-lib.mjs';

const root = process.cwd() === '/' ? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..') : process.cwd();
const verifyGitSource = process.argv.includes('--verify-git-source');
const { inputs, passports: expectedPassports } = await buildAllPassports(root);
const errors = [];

const isString = (v) => typeof v === 'string' && v.trim().length > 0;
const expect = (condition, message) => { if (!condition) errors.push(message); };
const recommendationStates = new Set(['recommended', 'conditional', 'unverified', 'do-not-install', 'deprecated']);
const freshnessStates = new Set(['current', 'changed-unreviewed', 'source-unavailable', 'stale', 'superseded']);
const executionStates = new Set(['designed', 'tested', 'conditional', 'unknown']);
const executionModes = new Set(['chat-native', 'native-tools', 'connected', 'local-agent']);
const planIds = new Set((inputs.tests.tests ?? []).map((item) => item.id));
const runIds = new Set((inputs.runs.runs ?? []).map((item) => item.test_id));

async function fileExists(rel) {
  try { await access(path.join(root, rel)); return true; } catch { return false; }
}

for (const [id, expected] of expectedPassports) {
  const rel = `trust/passports/${id}.json`;
  let passport;
  try {
    passport = JSON.parse(await readFile(path.join(root, rel), 'utf8'));
  } catch (error) {
    errors.push(`${id}: missing or invalid passport (${error.message})`);
    continue;
  }

  expect(passport.schema_version === '0.1', `${id}: schema_version must be 0.1`);
  expect(passport.skill_id === id, `${id}: skill_id mismatch`);
  expect(isString(passport.identity?.name), `${id}: identity.name required`);
  expect(isString(passport.identity?.summary), `${id}: identity.summary required`);
  expect(isString(passport.identity?.publisher), `${id}: identity.publisher required`);

  expect(isString(passport.provenance?.source_repository), `${id}: source_repository required`);
  expect(passport.provenance?.canonical_path === inputs.manifest.skills[id].path, `${id}: canonical_path must match installer manifest`);
  expect(isCommit(passport.provenance?.reviewed_source_revision), `${id}: reviewed_source_revision must be immutable 40-char SHA`);
  expect(isString(passport.provenance?.license), `${id}: license required`);

  expect(passport.integrity?.algorithm === 'sha256-manifest-v1', `${id}: unsupported integrity algorithm`);
  expect(isSha256(passport.integrity?.artifact_sha256), `${id}: artifact_sha256 required`);
  expect(Array.isArray(passport.integrity?.files) && passport.integrity.files.length > 0, `${id}: integrity.files required`);
  for (const file of passport.integrity?.files ?? []) {
    expect(isString(file.path), `${id}: integrity file path required`);
    expect(isSha256(file.sha256), `${id}/${file.path}: invalid sha256`);
  }

  expect(executionModes.has(passport.execution?.mode), `${id}: invalid execution mode`);
  expect(executionStates.has(passport.execution?.evidence_state), `${id}: invalid execution evidence state`);
  expect(Array.isArray(passport.execution?.required_capabilities), `${id}: required_capabilities must be array`);
  expect(isString(passport.execution?.minimum_setup), `${id}: minimum_setup required`);

  for (const key of ['local_files','network','secrets','process_execution','destructive_actions']) {
    expect(typeof passport.permissions?.[key] === 'string', `${id}: permissions.${key} required`);
  }

  expect(Array.isArray(passport.security?.evidence_refs), `${id}: security.evidence_refs must be array`);
  for (const ref of passport.security?.evidence_refs ?? []) {
    if (!(await fileExists(ref))) errors.push(`${id}: missing security evidence ref ${ref}`);
  }

  expect(executionStates.has(passport.behavior_evidence?.state), `${id}: invalid behavior evidence state`);
  if (passport.behavior_evidence?.latest_plan_id !== null) {
    expect(planIds.has(passport.behavior_evidence.latest_plan_id), `${id}: unknown behavior plan ${passport.behavior_evidence.latest_plan_id}`);
  }
  if (passport.behavior_evidence?.latest_run_id !== null) {
    expect(runIds.has(passport.behavior_evidence.latest_run_id), `${id}: unknown behavior run ${passport.behavior_evidence.latest_run_id}`);
  }
  for (const ref of passport.behavior_evidence?.evidence_refs ?? []) {
    if (!(await fileExists(ref))) errors.push(`${id}: missing behavior evidence ref ${ref}`);
  }

  expect(freshnessStates.has(passport.freshness?.status), `${id}: invalid freshness status`);
  expect(/^\d{4}-\d{2}-\d{2}$/.test(passport.freshness?.reviewed_at ?? ''), `${id}: reviewed_at must be YYYY-MM-DD`);
  expect(Number.isInteger(passport.freshness?.stale_after_days) && passport.freshness.stale_after_days > 0, `${id}: stale_after_days invalid`);
  expect(/^\d{4}-\d{2}-\d{2}$/.test(passport.freshness?.review_due_at ?? ''), `${id}: review_due_at must be YYYY-MM-DD`);

  expect(Array.isArray(passport.governance?.maintainers), `${id}: governance.maintainers required`);
  expect(Array.isArray(passport.governance?.reviewers), `${id}: governance.reviewers required`);
  expect(typeof passport.governance?.independent_review === 'boolean', `${id}: governance.independent_review required`);

  expect(recommendationStates.has(passport.recommendation?.state), `${id}: invalid recommendation state`);
  expect(isString(passport.recommendation?.reason), `${id}: recommendation reason required`);
  expect(Array.isArray(passport.known_gaps), `${id}: known_gaps must be array`);

  if (JSON.stringify(passport) !== JSON.stringify(expected)) {
    errors.push(`${id}: passport does not match the deterministic artifact/evidence view; run generator --write`);
  }

  if (verifyGitSource) {
    const rev = passport.provenance.reviewed_source_revision;
    const canonical = passport.provenance.canonical_path;
    const probe = spawnSync('git', ['cat-file', '-e', `${rev}^{commit}`], { cwd: root, encoding: 'utf8' });
    if (probe.status !== 0) {
      errors.push(`${id}: reviewed source revision ${rev} is unavailable in local Git history; CI must use fetch-depth: 0`);
    } else {
      const diff = spawnSync('git', ['diff', '--quiet', rev, '--', canonical], { cwd: root, encoding: 'utf8' });
      if (diff.status !== 0) errors.push(`${id}: current canonical skill bytes differ from reviewed source revision ${rev}`);
    }
  }
}

const expectedIds = new Set(expectedPassports.keys());
const manifestIds = new Set(Object.keys(inputs.manifest.skills ?? {}));
for (const id of manifestIds) expect(expectedIds.has(id), `${id}: bundled skill missing Trust Passport`);

if (errors.length) {
  console.error('Trust Passport validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Trust Passports OK: ${expectedPassports.size} bundled skill(s); strict_git_source=${verifyGitSource}`);
