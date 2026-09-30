#!/usr/bin/env node
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const errors=[];
const reviewers=JSON.parse(await readFile(path.join(root,'trust/reviews/reviewers.json'),'utf8'));
if(reviewers.schema_version!==1)errors.push('reviewers schema_version must be 1');
for(const r of reviewers.reviewers||[]){
  if(!r.github)errors.push('reviewer missing github');
  if(!Array.isArray(r.roles)||!r.roles.length)errors.push(r.github+': roles required');
}
const decisions=await readFile(path.join(root,'trust/reviews/decisions.jsonl'),'utf8');
for(const [i,line] of decisions.split('\n').filter(Boolean).entries()){
  let d;try{d=JSON.parse(line)}catch{errors.push('decision line '+(i+1)+' invalid JSON');continue}
  if(!d.decision_id||!d.outcome||!Array.isArray(d.reviewers))errors.push('decision '+(i+1)+' missing required fields');
  for(const id of d.reviewers||[]) if(!(reviewers.reviewers||[]).some(r=>r.github===id))errors.push(d.decision_id+': unknown reviewer '+id);
}
for(const locale of ['en','pt-BR','es','fr']){
  const obj=JSON.parse(await readFile(path.join(root,'i18n/trust',locale+'.json'),'utf8'));
  if(obj.locale!==locale)errors.push(locale+': locale mismatch');
  for(const key of ['evidence_states','risk','notices']) if(!obj[key]||typeof obj[key]!=='object')errors.push(locale+': missing '+key);
}
const regional=JSON.parse(await readFile(path.join(root,'trust/regional-taxonomy.json'),'utf8'));
if(!regional.regions?.some(r=>r.id==='latin-america'))errors.push('regional taxonomy must include latin-america');
if(!regional.domains?.includes('science-research'))errors.push('regional taxonomy must include science-research');
for(const file of ['trust-passport.schema.json','security-report.schema.json','risk-label.schema.json','upstream-status.schema.json','eval-plan.schema.json','eval-run.schema.json']){
  try{JSON.parse(await readFile(path.join(root,'spec/osts/0.1',file),'utf8'))}catch{errors.push('invalid or missing OSTS schema '+file)}
}
if(errors.length){console.error('Governance/i18n/OSTS validation failed:');for(const e of errors)console.error('- '+e);process.exit(1)}
console.log('Governance/i18n/OSTS: PASS');
