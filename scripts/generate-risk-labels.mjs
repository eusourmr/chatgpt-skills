#!/usr/bin/env node
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const write = process.argv.includes('--write');
const check = process.argv.includes('--check');
if (write === check) {
  console.error('Use exactly one of --write or --check.');
  process.exit(2);
}

const readJson = async (rel) => JSON.parse(await readFile(path.join(root, rel), 'utf8'));
const manifest = await readJson('installer/manifest.json');
const outDir = path.join(root, 'trust', 'risk-labels');
if (write) await mkdir(outDir, { recursive: true });

function dimension(declared, observed, state = 'declared') {
  return { state, declared, observed };
}

const errors = [];
for (const id of Object.keys(manifest.skills).sort()) {
  const passport = await readJson(`trust/passports/${id}.json`);
  const report = await readJson(`trust/security-reports/${id}.json`);
  const p = passport.permissions;
  const o = report.observed_capabilities;

  const label = {
    schema_version: '0.1',
    skill_id: id,
    source_revision: passport.provenance.reviewed_source_revision,
    artifact_sha256: passport.integrity.artifact_sha256,
    security_gate: {
      version: report.gate_version,
      result: report.result,
      blocking_findings: report.summary.blocking
    },
    reads: dimension(p.local_files, o.filesystem_writes ? 'Filesystem activity signal observed; review report for context.' : 'No additional read signal inferred by Security Gate v2.', 'declared-plus-static-scan'),
    writes: dimension(p.local_files, o.filesystem_writes ? 'Filesystem write reference observed.' : 'No filesystem write reference observed.', 'declared-plus-static-scan'),
    sends_externally: dimension(p.network, o.network_operations ? 'Network operation reference observed.' : 'No active network operation reference observed.', 'declared-plus-static-scan'),
    executes: dimension(p.process_execution, o.process_execution ? 'Process execution reference observed.' : 'No process execution reference observed.', 'declared-plus-static-scan'),
    secrets: dimension(p.secrets, o.secret_references ? 'Secret/credential terminology observed.' : 'No secret/credential reference observed.', 'declared-plus-static-scan'),
    destructive_potential: dimension(p.destructive_actions, o.destructive_operations ? 'Destructive operation reference observed.' : 'No destructive operation reference observed.', 'declared-plus-static-scan'),
    human_confirmation: {
      state: 'unknown',
      declared: 'Not yet modeled as a normalized permission dimension in 0.7-B.',
      observed: 'Static scanning cannot prove runtime confirmation behavior.'
    },
    unknowns: [
      'Static analysis cannot prove absence of malicious behavior.',
      'Runtime behavior may differ across execution surfaces or external dependencies.',
      'Human-confirmation semantics are not yet normalized.'
    ],
    evidence_refs: [
      `trust/passports/${id}.json`,
      `trust/security-reports/${id}.json`
    ]
  };

  const expected = JSON.stringify(label, null, 2) + '\n';
  const out = path.join(outDir, `${id}.json`);
  if (write) {
    await writeFile(out, expected, 'utf8');
    console.log(`WROTE trust/risk-labels/${id}.json`);
  } else {
    let actual = '';
    try { actual = await readFile(out, 'utf8'); } catch {}
    if (actual !== expected) errors.push(`${id}: risk label missing or stale`);
  }
}

if (errors.length) {
  console.error('Risk Label validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log(`Risk Labels OK: ${Object.keys(manifest.skills).length} label(s)`);
