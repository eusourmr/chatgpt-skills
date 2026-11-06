#!/usr/bin/env node
// SophIA build: strictly approved editorial templates + evidence from public registry.
// Never extracts raw Markdown or executes instructions from skill files.
import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
const check=process.argv.includes('--check');
const repo=process.cwd();
const registryPath=process.env.SOPHIA_REGISTRY_PATH || path.join(repo,'registry/public-capabilities-v1.json');
const target=path.join(repo,'apps/sophia-web/assets/skill-index.json');
const sourcePath=path.join(repo,'apps/sophia-web/catalog/approved-templates.json');
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const approved=read(sourcePath), registry=read(registryPath);
if(approved.schema_version!==1 || !Array.isArray(approved.entries) || approved.entries.length>32)throw Error('Unapproved template shape/count');
if(!Array.isArray(registry.entries))throw Error('Invalid registry');
// Pin the inputs actually reviewed, without rewriting the Registry's own older metadata.
const sha=bytes=>createHash('sha256').update(bytes).digest('hex');
const revision=approved.source_commit;
if(!/^[a-f0-9]{40}$/.test(revision)||approved.source_registry!=='registry/public-capabilities-v1.json')throw Error('Unpinned registry source');
const immutable=execFileSync('git',['show',revision+':'+approved.source_registry],{cwd:repo});
const provenance=approved.registry_metadata;
if(sha(immutable)!==provenance?.file_sha256||sha(fs.readFileSync(registryPath))!==provenance.file_sha256)throw Error('Registry differs from reviewed immutable source');
if(provenance.declared_source_commit!==registry.source_commit||provenance.declared_published_at!==registry.published_at)throw Error('Registry provenance was cosmetically refreshed');
const review=approved.editorial_review;
if(review?.source_commit!==revision||!Array.isArray(review.sources)||!review.sources.length)throw Error('Missing editorial source review');
for(const source of review.sources){
 if(!/^plugins\/cs-navigator-web-labs\/skills\/[a-z0-9-]+\/SKILL\.md$/.test(source.path))throw Error('Unexpected editorial source');
 const bytes=execFileSync('git',['show',revision+':'+source.path],{cwd:repo});
 if(sha(bytes)!==source.sha256)throw Error('Editorial source pin mismatch: '+source.path);
}
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
