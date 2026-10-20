#!/usr/bin/env node
// Versioned, same-origin snapshot of a reviewed editorial catalog (not executable skills).
import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
const root=path.join(process.cwd(),'apps/sophia-web');
const catalog=fs.readFileSync(path.join(root,'assets/skill-index.json'));
const parsed=JSON.parse(catalog);
if(parsed.app_version!=='1.0.0'||parsed.entries.length!==14||parsed.entries.some(x=>x.delivery_state!=='registry_only'||x.editorial_template_state!=='pilot'))throw Error('Unreviewed catalog; not release ready');
const baseline=path.join(root,'assets/catalog-baseline.json');
const manifest=path.join(root,'assets/catalog-manifest.json');
const hash=createHash('sha256').update(catalog).digest('hex');
const output=JSON.stringify({schema_version:1,release:'1.0.0',catalog_sha256:hash,entries:14,distribution:'same-origin',policy:'approved-templates-only; no auto-activation'},null,2)+'\n';
if(process.argv.includes('--check')){
 if(fs.readFileSync(baseline).compare(catalog)!==0)throw Error('Baseline differs; review and rebuild application release');
 if(fs.readFileSync(manifest,'utf8')!==output)throw Error('Catalog manifest drift');
 console.log('PASS — approved same-origin catalog release');
}else{
 fs.writeFileSync(baseline,catalog);
 fs.writeFileSync(manifest,output);
 console.log('Generated governed catalog manifest and baseline. Review before publishing.');
}
