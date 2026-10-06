#!/usr/bin/env node
import { readFile } from 'node:fs/promises';

const currentFiles=[
  'README.md','README.pt-BR.md','ROADMAP.md','BUNDLES.md',
  'docs/CAPABILITY_PACK.md','docs/CHATGPT_UPLOAD.md','docs/CS_NAVIGATOR.md',
  'docs/ECOSYSTEM_GROWTH_STRATEGY.md','docs/EXECUTION_MODEL.md',
  'docs/GETTING_STARTED.md','docs/GETTING_STARTED.pt-BR.md',
  'docs/GITHUB_PLUGIN_DISTRIBUTION.md','docs/PLUGIN_MAINTENANCE.md','docs/PLUGIN_MAINTENANCE.pt-BR.md',
  'docs/PRIVACY.md','docs/PUBLIC_PLUGIN_SUBMISSION.md','docs/SKILL_CONTAINERS.md',
  'docs/SUPPORT.md','docs/TERMS.md','docs/TRUST_PASSPORT.md','docs/CHATGPT_IN_PRODUCT_TESTING.md'
];

const errors=[];
for(const file of currentFiles){
  const text=await readFile(file,'utf8');
  if(text.includes('CS Connect')) errors.push(`${file}: contains legacy public brand "CS Connect"`);
  if(/(?:current product|current release|release atual|linha pública atual|current qualified plugin)[^\n]{0,160}0\.9\.[012]/i.test(text)){
    errors.push(`${file}: presents a superseded 0.9.x release as current`);
  }
}

const required={
  'README.md':['CS Navigator 0.9.3','4a54c159901f1a58d55420ab31a30d1839084b0ff885738b244db226897115b6','PASS 6/6'],
  'README.pt-BR.md':['CS Navigator 0.9.3','PASS 6/6'],
  'docs/GETTING_STARTED.md':['CS Navigator 0.9.3','passed 6/6'],
  'docs/GETTING_STARTED.pt-BR.md':['CS Navigator 0.9.3','passou 6/6'],
  'docs/PUBLIC_PLUGIN_SUBMISSION.md':['CS Navigator 0.9.3','plugins_6ac41c5909b481918b0523726e763aa3','v093-native-qualification-r3.json'],
  'ROADMAP.md':['CS Navigator 0.9.3','v0.10 — Ecosystem Intelligence & Community Scale']
};
for(const [file,needles] of Object.entries(required)){
  const text=await readFile(file,'utf8');
  for(const needle of needles) if(!text.includes(needle)) errors.push(`${file}: missing required text: ${needle}`);
}

if(errors.length){
  console.error('CS Navigator 0.9.3 brand/docs audit failed:');
  for(const e of errors) console.error('- '+e);
  process.exit(1);
}
console.log(`CS Navigator 0.9.3 brand/docs audit OK: ${currentFiles.length} current-facing files checked.`);
