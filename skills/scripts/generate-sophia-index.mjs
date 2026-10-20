#!/usr/bin/env node
// SophIA build: strictly approved editorial templates + evidence from public registry.
// Never extracts raw Markdown or executes instructions from skill files.
import fs from 'node:fs';
import path from 'node:path';
const check=process.argv.includes('--check');
const repo=process.cwd();
const registryPath=process.env.SOPHIA_REGISTRY_PATH || path.join(repo,'registry/public-capabilities-v1.json');
const target=path.join(repo,'apps/sophia-web/assets/skill-index.json');
const sourcePath=path.join(repo,'apps/sophia-web/catalog/approved-templates.json');
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const approved=read(sourcePath), registry=read(registryPath);
if(approved.schema_version!==1 || !Array.isArray(approved.entries) || approved.entries.length>32)throw Error('Unapproved template shape/count');
if(!Array.isArray(registry.entries))throw Error('Invalid registry');
const found=new Map(registry.entries.map(x=>[x.id,x]));
const banned=new Set(['medical-appointment-prep','caregiver-coordinator']);
const ids=new Set();
const entries=approved.entries.map(x=>{
 if(ids.has(x.id)||banned.has(x.id)||x.delivery_state!=='registry_only'||x.editorial_template_state!=='pilot')throw Error('Invalid editorial entry: '+x.id);
 ids.add(x.id);
 const source=found.get(x.id);
 if(!source||source.distribution_state!=='available')throw Error('Registry unavailable/excluded: '+x.id);
 const {delivery_state,editorial_template_state,source_id,...rest}=x;
 if(source_id!==x.id)throw Error('Unverifiable source id: '+x.id);
 return {...rest,evidence_state:source.evidence_state,delivery_state,editorial_template_state,source_id};
});
const output=JSON.stringify({...approved,entries},null,2)+'\n';
if(check){if(fs.readFileSync(target,'utf8')!==output)throw Error('Index drift. Run node scripts/generate-sophia-index.mjs, then review the diff.');console.log('PASS — editorial index matches registry evidence');}
else{fs.writeFileSync(target,output);console.log('Generated '+entries.length+' approved profiles; review and commit the diff.');}
