#!/usr/bin/env node
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const plans=JSON.parse(await readFile(path.join(root,'trust/evals/plans/index.json'),'utf8')).plans||[];
const runs=JSON.parse(await readFile(path.join(root,'trust/evals/runs/index.json'),'utf8')).runs||[];
const errors=[];
const planIds=new Map(plans.map(p=>[p.id,p]));
for(const p of plans){
  if(p.schema_version!=='0.1')errors.push(p.id+': invalid schema_version');
  if(!/^[a-f0-9]{40}$/.test(p.required_source_revision||''))errors.push(p.id+': invalid source revision');
  if(!/^[a-f0-9]{64}$/.test(p.required_artifact_sha256||''))errors.push(p.id+': invalid artifact hash');
  if(!Array.isArray(p.cases)||p.cases.length<(p.minimum_cases||1))errors.push(p.id+': insufficient cases');
}
for(const r of runs){
  const p=planIds.get(r.test_id);
  if(!p)errors.push(r.test_id+': run has no plan');
  if(r.schema_version!=='0.1')errors.push(r.test_id+': invalid schema_version');
  if(p&&r.skill_id!==p.skill_id)errors.push(r.test_id+': skill mismatch');
  if(p&&r.source_revision!==p.required_source_revision)errors.push(r.test_id+': source revision mismatch');
  if(p&&r.artifact_sha256!==p.required_artifact_sha256)errors.push(r.test_id+': artifact hash mismatch');
  const m=r.metrics||{};
  if(m.collection_state==='not-collected' && [m.tokens,m.elapsed_ms,m.cost_usd,m.tool_calls].some(v=>v!==null)) errors.push(r.test_id+': unmeasured metrics must be null');
  if(m.collection_state==='measured' && [m.tokens,m.elapsed_ms,m.cost_usd,m.tool_calls].some(v=>typeof v!=='number')) errors.push(r.test_id+': measured metrics must be numeric');
}
if(errors.length){console.error('Behavior eval validation failed:');for(const e of errors)console.error('- '+e);process.exit(1)}
console.log('Behavior evals OK: '+plans.length+' plan(s), '+runs.length+' run(s).');
