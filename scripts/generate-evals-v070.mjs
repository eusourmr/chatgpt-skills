#!/usr/bin/env node
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const write=process.argv.includes('--write');
const check=process.argv.includes('--check');
if(write===check){console.error('Use exactly one of --write or --check.');process.exit(2)}
const tests=JSON.parse(await readFile(path.join(root,'trust/in-product-tests.json'),'utf8'));
const runs=JSON.parse(await readFile(path.join(root,'trust/in-product-runs.json'),'utf8'));

const plans=(tests.tests||[]).map(p=>({schema_version:'0.1',...p}));
const normalizedRuns=(runs.runs||[]).map(r=>({
  schema_version:'0.1',
  ...r,
  metrics:r.metrics??{collection_state:'not-collected',tokens:null,elapsed_ms:null,cost_usd:null,tool_calls:null}
}));
const outputs=[
  ['trust/evals/plans/index.json',{schema_version:'0.1',plans}],
  ['trust/evals/runs/index.json',{schema_version:'0.1',runs:normalizedRuns}]
];
let failed=false;
for(const [rel,obj] of outputs){
  const out=path.join(root,rel);
  const expected=JSON.stringify(obj,null,2)+'\n';
  if(write){await mkdir(path.dirname(out),{recursive:true});await writeFile(out,expected,'utf8');console.log('WROTE '+rel)}
  else {let actual='';try{actual=await readFile(out,'utf8')}catch{};if(actual!==expected){console.error(rel+' missing or stale');failed=true}}
}
if(failed)process.exit(1);
console.log('Behavior eval normalization: PASS');
