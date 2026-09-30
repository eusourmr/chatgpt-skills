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
const tests = await readJson('trust/in-product-tests.json');
const runs = await readJson('trust/in-product-runs.json');
const planDir = path.join(root, 'trust', 'evals', 'plans');
const runDir = path.join(root, 'trust', 'evals', 'runs');
if (write) {
  await mkdir(planDir, { recursive: true });
  await mkdir(runDir, { recursive: true });
}

const errors = [];
const planIds = new Set();

for (const plan of tests.tests ?? []) {
  planIds.add(plan.id);
  const normalized = {
    schema_version: 1,
    plan_id: plan.id,
    skill_id: plan.skill_id,
    surface: plan.surface,
    execution_mode: plan.execution_mode,
    required_distribution: plan.required_distribution,
    source_revision: plan.required_source_revision,
    artifact_sha256: plan.required_artifact_sha256,
    minimum_cases: plan.minimum_cases,
    evaluation_policy: plan.evaluation_policy ?? 'contract-defined',
    supersedes: plan.supersedes ?? null,
    change_note: plan.change_note ?? null,
    cases: plan.cases,
    provenance: {
      source_file: 'trust/in-product-tests.json',
      source_schema_version: tests.schema_version
    }
  };
  const expected = JSON.stringify(normalized, null, 2) + '\n';
  const out = path.join(planDir, `${plan.id}.json`);
  if (write) await writeFile(out, expected, 'utf8');
  else {
    let actual=''; try { actual=await readFile(out,'utf8'); } catch {}
    if (actual !== expected) errors.push(`plan ${plan.id}: normalized fixture missing or stale`);
  }
}

const counters = new Map();
for (const run of runs.runs ?? []) {
  const count=(counters.get(run.test_id) ?? 0)+1;
  counters.set(run.test_id,count);
  const runId=`${run.test_id}--${String(count).padStart(3,'0')}`;
  const normalized = {
    schema_version: 1,
    run_id: runId,
    plan_id: run.test_id,
    skill_id: run.skill_id,
    result: run.result,
    executed_at: run.executed_at,
    product_surface: run.product_surface,
    package_version: run.package_version,
    distribution: run.distribution,
    source_revision: run.source_revision,
    artifact_sha256: run.artifact_sha256,
    case_ids: run.case_ids,
    assertions: run.assertions,
    evaluation_note: run.evaluation_note ?? null,
    metrics: {
      measurement_state: 'not-collected',
      input_tokens: null,
      output_tokens: null,
      elapsed_ms: null,
      cost_usd: null,
      tool_calls: null
    },
    provenance: {
      source_file: 'trust/in-product-runs.json',
      source_schema_version: runs.schema_version
    }
  };
  const expected=JSON.stringify(normalized,null,2)+'\n';
  const out=path.join(runDir,`${runId}.json`);
  if(write) await writeFile(out,expected,'utf8');
  else {
    let actual=''; try { actual=await readFile(out,'utf8'); } catch {}
    if(actual!==expected) errors.push(`run ${runId}: normalized evidence missing or stale`);
  }
}

if (errors.length) {
  console.error('Behavior eval export failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log(`Behavior evals OK: ${planIds.size} plan(s), ${(runs.runs ?? []).length} run(s); unmeasured metrics remain null`);
