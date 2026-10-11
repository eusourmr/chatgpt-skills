#!/usr/bin/env node
import { readFile, readdir } from 'node:fs/promises';

const plugin = JSON.parse(await readFile('plugins/cs-navigator/plugin.json','utf8'));
const pack = JSON.parse(await readFile('plugins/cs-navigator/capability-pack.json','utf8'));
const registry = JSON.parse(await readFile('registry/public-capabilities-v1.json','utf8'));
const policy = JSON.parse(await readFile('registry/distribution-policy.json','utf8'));
const submission = JSON.parse(await readFile('submission/cs-navigator-0.16.0.json','utf8'));
const privacy = await readFile('docs/PRIVACY.md','utf8');

const errors=[];
const expectedCore=[
  'capability-preferences',
  'information-expiry-guard',
  'personal-curator',
  'proof-of-progress',
  'simple-mode'
].sort();

if(plugin.version!=='0.16.0') errors.push('plugin version must be 0.16.0');
const ui=plugin.extensions?.['com.openai']?.interface || {};
if(ui.shortDescription!=='Evergreen capability curator') errors.push('shortDescription mismatch');
if(!ui.supportURL) errors.push('supportURL is required');
if(!String(ui.supportURL).includes('/docs/SUPPORT.md')) errors.push('supportURL must point to docs/SUPPORT.md');

const declared=(pack.included_skills||[]).map(x=>x.id).sort();
if(JSON.stringify(declared)!==JSON.stringify(expectedCore)) errors.push('evergreen core skill set mismatch');

const dirs=(await readdir('plugins/cs-navigator/skills',{withFileTypes:true}))
  .filter(x=>x.isDirectory()).map(x=>x.name).sort();
const expectedDirs=['cs-navigator',...expectedCore].sort();
if(JSON.stringify(dirs)!==JSON.stringify(expectedDirs)) errors.push('plugin payload contains non-core skill directories');

for(const blocked of policy.excluded_capabilities||[]){
  if(dirs.includes(blocked.id)) errors.push('excluded capability bundled: '+blocked.id);
  const row=(registry.entries||[]).find(x=>x.id===blocked.id);
  if(!row || row.distribution_state!=='excluded') errors.push('excluded capability missing registry exclusion: '+blocked.id);
}

if(!registry.entries?.length) errors.push('public registry is empty');
if(registry.entries?.some(x=>!['available','excluded'].includes(x.distribution_state))) errors.push('registry has invalid distribution state');
if(submission.submission_state!=='development-blocked-on-production-mcp-endpoint') errors.push('submission state must remain blocked on production MCP endpoint');
if(!privacy.includes('read-only MCP')) errors.push('privacy policy does not describe read-only MCP processing');

if(errors.length){
  console.error('0.16 Evergreen Core audit FAILED');
  for(const e of errors) console.error('- '+e);
  process.exit(1);
}
console.log(JSON.stringify({
  result:'PASS',
  plugin_version:plugin.version,
  core_skill_dirs:dirs,
  registry_entries:registry.entries.length,
  registry_available:registry.entries.filter(x=>x.distribution_state==='available').length,
  registry_excluded:registry.entries.filter(x=>x.distribution_state==='excluded').length,
  release_blocker:'production HTTPS MCP endpoint not configured'
},null,2));
