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
  if(/(?:current product|current release|release atual|linha pública atual|current qualified plugin)[^\n]{0,120}0\.9\.0/i.test(text)){
    errors.push(`${file}: presents 0.9.0 as the current release`);
  }
}

const required={
  'README.md':['CS Navigator 0.9.2','890b4a7f8257021e2dedce10bce0abfa415ca4ebbed44de7966d5b90ca38117b'],
  'README.pt-BR.md':['CS Navigator 0.9.2','requalificação nativa pendente'],
  'docs/GETTING_STARTED.md':['CS Navigator','0.9.2'],
  'docs/GETTING_STARTED.pt-BR.md':['CS Navigator','0.9.2'],
  'docs/PUBLIC_PLUGIN_SUBMISSION.md':['CS Navigator 0.9.2','plugins_6ac41c5909b481918b0523726e763aa3'],
  'ROADMAP.md':['CS Navigator 0.9.2','v0.10 — Ecosystem Intelligence & Community Scale']
};
for(const [file,needles] of Object.entries(required)){
  const text=await readFile(file,'utf8');
  for(const needle of needles) if(!text.includes(needle)) errors.push(`${file}: missing required text: ${needle}`);
}

if(errors.length){
  console.error('CS Navigator 0.9.2 brand/docs audit failed:');
  for(const e of errors) console.error('- '+e);
  process.exit(1);
}
console.log(`CS Navigator 0.9.2 brand/docs audit OK: ${currentFiles.length} current-facing files checked.`);
