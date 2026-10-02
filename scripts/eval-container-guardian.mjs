#!/usr/bin/env node
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import { evaluateContainerAction } from '../runtime/container-guardian.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const write = process.argv.includes('--write');
const check = process.argv.includes('--check');

if (write === check) {
  console.error('Use exactly one of --write or --check.');
  process.exit(2);
}

const policy = JSON.parse(await readFile(path.join(root, 'trust/containers/default.json'), 'utf8'));
const fixture = JSON.parse(await readFile(path.join(root, 'tests/fixtures/container-guardian/adversarial-cases.json'), 'utf8'));

const cases = fixture.cases.map((testCase) => {
  const input = structuredClone(testCase.input);
  input.policy = policy;
  const observed = evaluateContainerAction(input);
  const expected = testCase.expected;
  const pass =
    observed.decision === expected.decision &&
    observed.reason_code === expected.reason_code &&
    observed.stop_code === expected.stop_code;

  return {
    id: testCase.id,
    expected,
    observed: {
      decision: observed.decision,
      reason_code: observed.reason_code,
      stop_code: observed.stop_code
    },
    pass
  };
});

const passed = cases.filter((item) => item.pass).length;
const report = {
  schema_version: '0.1',
  eval_id: 'container-guardian-runtime-v1',
  subject: 'container-guardian',
  release_line: '0.7.5',
  evaluation_kind: 'deterministic-runtime',
  fixture_suite: fixture.suite,
  evidence_boundary: 'Deterministic runtime behavior evidence only; this is not native ChatGPT qualification and not a safety guarantee.',
  summary: {
    total: cases.length,
    passed,
    failed: cases.length - passed
  },
  cases
};

const rel = 'trust/evals/container-guardian/runtime-v1.json';
const out = path.join(root, rel);
const expectedText = JSON.stringify(report, null, 2) + '\n';

if (write) {
  await mkdir(path.dirname(out), { recursive: true });
  await writeFile(out, expectedText, 'utf8');
  console.log('WROTE ' + rel);
} else {
  let actual = '';
  try {
    actual = await readFile(out, 'utf8');
  } catch {}
  if (actual !== expectedText) {
    console.error(rel + ' missing or stale');
    process.exit(1);
  }
}

if (report.summary.failed > 0) {
  console.error('Container Guardian behavior eval failed: ' + report.summary.failed + ' case(s).');
  process.exit(1);
}

console.log('Container Guardian behavior eval: PASS (' + passed + '/' + cases.length + ')');
