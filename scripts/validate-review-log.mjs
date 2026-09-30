#!/usr/bin/env node
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const reviewers=JSON.parse(await readFile(path.join(root,'trust/reviews/reviewers.json'),'utf8'));
const lines=(await readFile(path.join(root,'trust/reviews/decisions.jsonl'),'utf8')).split(/\r?\n/).filter(Boolean);
const errors=[];
const expect=(ok,msg)=>{if(!ok)errors.push(msg)};
const allowed=new Set(['accepted','needs-evidence','duplicate','unsafe','out-of-scope','superseded']);
const reviewerIds=new Set((reviewers.reviewers??[]).map(r=>r.id));
const decisionIds=new Set();

expect(reviewers.schema_version===1,'reviewers schema_version must be 1');
for(const reviewer of reviewers.reviewers??[]){
  expect(typeof reviewer.id==='string'&&reviewer.id.length>0,'reviewer id required');
  expect(typeof reviewer.active==='boolean',`${reviewer.id}: active boolean required`);
  expect(typeof reviewer.independent_of_project==='boolean',`${reviewer.id}: independent_of_project boolean required`);
  expect(Array.isArray(reviewer.roles)&&reviewer.roles.length>0,`${reviewer.id}: roles required`);
}

for(const [index,line] of lines.entries()){
  let d;try{d=JSON.parse(line)}catch(e){errors.push(`decision line ${index+1}: invalid JSON`);continue}
  expect(d.schema_version===1,`${d.decision_id??index}: schema_version must be 1`);
  expect(typeof d.decision_id==='string'&&d.decision_id.length>0,`decision line ${index+1}: decision_id required`);
  if(decisionIds.has(d.decision_id))errors.push(`duplicate decision_id ${d.decision_id}`);
  decisionIds.add(d.decision_id);
  expect(allowed.has(d.outcome),`${d.decision_id}: invalid outcome ${d.outcome}`);
  expect(Array.isArray(d.reviewers)&&d.reviewers.length>0,`${d.decision_id}: at least one human reviewer required`);
  for(const id of d.reviewers??[])expect(reviewerIds.has(id),`${d.decision_id}: unknown reviewer ${id}`);
  expect(typeof d.conflict_of_interest==='string'&&d.conflict_of_interest.length>0,`${d.decision_id}: conflict_of_interest required`);
  expect(typeof d.independent_review==='boolean',`${d.decision_id}: independent_review boolean required`);
  if(d.independent_review){
    expect((d.reviewers??[]).some(id=>(reviewers.reviewers??[]).find(r=>r.id===id)?.independent_of_project===true),`${d.decision_id}: independent_review requires an independent reviewer record`);
  }
  expect(Array.isArray(d.evidence_refs)&&d.evidence_refs.length>0,`${d.decision_id}: evidence_refs required`);
  expect(typeof d.rationale==='string'&&d.rationale.length>0,`${d.decision_id}: rationale required`);
}

if(errors.length){
  console.error('Review log validation failed:');
  for(const e of errors)console.error(`- ${e}`);
  process.exit(1);
}
console.log(`Review log OK: ${reviewerIds.size} reviewer(s), ${decisionIds.size} decision(s)`);
