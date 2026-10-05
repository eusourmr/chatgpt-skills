#!/usr/bin/env node
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const root=process.cwd();
const id=/^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const semver=/^\d+\.\d+\.\d+(?:[-+][0-9A-Za-z.-]+)?$/;
const statuses=new Set(['designed','tested','deprecated']);
const sourceTypes=new Set(['project-authored','official-source','user-supplied','licensed-source','community']);
const errors=[];
const profiles=[];

for(const skillName of (await readdir(path.join(root,'skills'),{withFileTypes:true})).filter(x=>x.isDirectory()).map(x=>x.name).sort()){
  const dir=path.join(root,'skills',skillName,'profiles');
  let names=[];
  try{names=(await readdir(dir)).filter(x=>x.endsWith('.json')).sort()}catch(error){if(error.code!=='ENOENT')throw error}
  for(const name of names){
    const rel=path.posix.join('skills',skillName,'profiles',name);
    let p;
    try{p=JSON.parse(await readFile(path.join(root,rel),'utf8'))}catch(error){errors.push(rel+': invalid JSON: '+error.message);continue}
    profiles.push({rel,p,skillName});
  }
}

const seen=new Set();
for(const {rel,p,skillName} of profiles){
  const fail=(msg)=>errors.push(rel+': '+msg);
  if(p.schema_version!=='0.1')fail('schema_version must be 0.1');
  if(!id.test(p.profile_id||''))fail('profile_id must be kebab-case');
  if(seen.has(p.profile_id))fail('duplicate profile_id '+p.profile_id); else seen.add(p.profile_id);
  if(!semver.test(p.profile_version||''))fail('profile_version must be semantic');
  if(p.skill_id!==skillName)fail('skill_id must match containing skill folder');
  if(typeof p.title!=='string'||p.title.length<3)fail('title is required');
  if(!statuses.has(p.status))fail('status must be designed, tested, or deprecated');
  if(typeof p.purpose!=='string'||p.purpose.length<20)fail('purpose must be descriptive');
  if(typeof p.activation!=='object'||typeof p.activation?.explicit_select!=='boolean'||!Array.isArray(p.activation?.conditions))fail('activation requires explicit_select and conditions[]');
  if(typeof p.rules!=='object'||!p.rules||Array.isArray(p.rules)||Object.keys(p.rules).length===0)fail('rules must be a non-empty object');
  if(!sourceTypes.has(p.evidence?.source_type))fail('invalid evidence.source_type');
  if(!Array.isArray(p.evidence?.source_refs))fail('evidence.source_refs must be an array');
  if(!Array.isArray(p.evidence?.known_gaps))fail('evidence.known_gaps must be an array');
  if(p.status==='tested' && (!p.evidence?.reviewed_on || !p.evidence?.source_refs?.length))fail('tested profile requires reviewed_on and source_refs');
  if(!Array.isArray(p.tests)||p.tests.length===0)fail('tests must contain at least one case');
  const ids=new Set();
  for(const t of p.tests||[]){
    if(!id.test(t.id||''))fail('test id must be kebab-case');
    if(ids.has(t.id))fail('duplicate test id '+t.id); else ids.add(t.id);
    if(typeof t.input!=='string'||!t.input.trim())fail('test input is required');
    if(typeof t.expected!=='string'||t.expected.length<3)fail('test expected is required');
  }
}

if(errors.length){
  console.error('Skill profile validation failed:');
  for(const e of errors)console.error('- '+e);
  process.exit(1);
}
console.log('Skill Profiles OK: '+profiles.length+' profile(s).');
