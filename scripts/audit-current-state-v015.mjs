#!/usr/bin/env node
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

const currentFiles=[
  'README.md','README.pt-BR.md','ROADMAP.md','BUNDLES.md',
  'docs/GETTING_STARTED.md','docs/GETTING_STARTED.pt-BR.md',
  'docs/PUBLIC_PLUGIN_SUBMISSION.md','docs/CS_NAVIGATOR_0.15.0_HUMAN_CAPABILITY.md'
];

const bannedCurrent=[
  'Current product candidate: **CS Navigator 0.9.3',
  'current release candidate is **CS Navigator 0.9.3',
  'next product line: **0.10',
  'For the current plugin path, use **CS Navigator 0.9.0',
  'canonical installation and first-use guide for **CS Navigator 0.9.3',
  'guia principal de instalação e primeiro uso do **CS Navigator 0.9.3'
];

const errors=[];
for(const p of currentFiles){
  const t=await readFile(p,'utf8');
  for(const needle of bannedCurrent){
    if(t.includes(needle)) errors.push(p+': stale current-facing marker: '+needle);
  }
}

async function walk(dir){
  const out=[];
  for(const ent of await readdir(dir,{withFileTypes:true})){
    const p=path.join(dir,ent.name);
    if(ent.isDirectory()) out.push(...await walk(p));
    else out.push(p);
  }
  return out;
}

for(const p of await walk('plugins/cs-navigator')){
  if(/\.(png|jpg|jpeg|gif|webp)$/i.test(p)) continue;
  const t=await readFile(p,'utf8');
  if(t.includes('CS Connect')) errors.push(p+': legacy brand inside current payload');
  if(/pending-native-0\.9\.[0-9]/.test(t)) errors.push(p+': obsolete 0.9 pending-native marker');
  if(/Until final 0\.9\.[0-9]/.test(t)) errors.push(p+': obsolete 0.9 qualification marker');
}
const sourceCatalog=JSON.parse(await readFile('catalog/skills.json','utf8'));
const healthCatalog=JSON.parse(await readFile('catalog.json','utf8'));
if(sourceCatalog.entries?.length!==78) errors.push('catalog/skills.json: expected 78 entries for 0.15.0');
if(healthCatalog.entries?.length!==77) errors.push('catalog.json: expected 77 skill entries for 0.15.0');
const collections=(sourceCatalog.entries||[]).filter(e=>e.kind==='collection');
if(collections.length!==1 || collections[0].id!=='openai-plugins') errors.push('catalog/skills.json: expected exactly one source collection: openai-plugins');

const plugin=JSON.parse(await readFile('plugins/cs-navigator/plugin.json','utf8'));
if(plugin.version!=='0.15.0') errors.push('plugins/cs-navigator/plugin.json: version must be 0.15.0');
const ui=plugin.extensions?.['com.openai']?.interface;
if(ui?.shortDescription!=='Everyday capability routing') errors.push('plugin shortDescription mismatch');

const reg=JSON.parse(await readFile('registry/capabilities-v1.json','utf8'));
if(reg.generated_for_plugin!=='0.15.0') errors.push('registry generated_for_plugin mismatch');
if(reg.live_registry_mcp!=='planned-not-active') errors.push('live registry must remain planned-not-active until runtime exists');
if(!reg.entries?.every(e=>e.evidence_state==='designed')) errors.push('new registry entries must remain designed before native qualification');

if(errors.length){
  console.error('Current-state audit failed:');
  for(const e of errors) console.error('- '+e);
  process.exit(1);
}
console.log('Current-state audit PASS: current docs/payload distinguish 0.9.4 review, 0.15 development, historical evidence, and planned-not-active live registry.');
