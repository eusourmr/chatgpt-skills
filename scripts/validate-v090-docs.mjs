#!/usr/bin/env node
import { readFile } from 'node:fs/promises';

const files=[
  'README.md','README.pt-BR.md','ROADMAP.md','BUNDLES.md',
  'docs/GETTING_STARTED.md','docs/GETTING_STARTED.pt-BR.md',
  'docs/PUBLIC_PLUGIN_SUBMISSION.md','docs/GITHUB_PLUGIN_DISTRIBUTION.md',
  'docs/PLUGIN_MAINTENANCE.md','docs/PLUGIN_MAINTENANCE.pt-BR.md',
  'docs/CHATGPT_UPLOAD.md','docs/CS_NAVIGATOR.md','docs/CAPABILITY_PACK.md',
  'docs/ECOSYSTEM_GROWTH_STRATEGY.md','docs/EXECUTION_MODEL.md',
  'docs/PRIVACY.md','docs/SUPPORT.md','docs/TERMS.md'
];

const forbidden=[
  /stable\s+CS Navigator\s+0\.7\.0/i,
  /CS Navigator\s+0\.7\.0\s+(?:is|é).*stable/i,
  /0\.7\.5[^\n]{0,80}(?:in qualification|em qualifica[cç][aã]o)/i,
  /0\.9\.0[^\n]{0,100}(?:planned next public|pr[oó]xima vers[aã]o p[uú]blica.*planejada)/i,
  /0\.8(?:\.0)?[^\n]{0,80}(?:next public|pr[oó]xima.*p[uú]blica)/i
];

const errors=[];
for(const file of files){
  const text=await readFile(file,'utf8');
  for(const pattern of forbidden){
    if(pattern.test(text)) errors.push(`${file}: stale current-release wording matched ${pattern}`);
  }
}

const required={
  'README.md':['CS Connect 0.9.0','3379f932301b707fcf935f8f4f6f45bdea10d3e7277daced2849f93c3f824cce'],
  'README.pt-BR.md':['CS Connect 0.9.0','Comece em 1 minuto'],
  'docs/GETTING_STARTED.pt-BR.md':['Você **não precisa saber programar**','CS Connect'],
  'docs/GETTING_STARTED.md':['You do **not** need GitHub','Search for **CS Connect**'],
  'docs/PUBLIC_PLUGIN_SUBMISSION.md':['It is not yet a public listing','Publish plugin'],
  'ROADMAP.md':['CS Connect 0.9.0','v0.10 — Ecosystem Intelligence & Community Scale']
};
for(const [file,needles] of Object.entries(required)){
  const text=await readFile(file,'utf8');
  for(const needle of needles) if(!text.includes(needle)) errors.push(`${file}: missing required release/install wording: ${needle}`);
}

if(errors.length){
  console.error('CS Connect 0.9 documentation audit failed:');
  for(const e of errors) console.error('- '+e);
  process.exit(1);
}
console.log(`CS Connect 0.9 documentation audit OK: ${files.length} current-facing documents checked.`);
