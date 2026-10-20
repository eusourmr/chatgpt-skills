import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {webcrypto} from 'node:crypto';
import {readGovernedCatalog,verifyCatalogShape,sha256Hex,trustedShareId,shareMethodUrl,TRUSTED_BASELINE_SHA256} from '../assets/catalog-loader.js';
const root=new URL('../assets/',import.meta.url);
const read=f=>readFileSync(new URL(f,root),'utf8');
const baseline=JSON.parse(read('catalog-baseline.json'));
const live=JSON.parse(read('skill-index.json'));
const manifest=JSON.parse(read('catalog-manifest.json'));
const id=baseline.entries[0].id;
const fetcher=(overrides={})=>async path=>({ok:true,text:async()=>overrides[path]??read(path.replace('./assets/',''))});
test('same-origin manifest cryptographically matches release files',async()=>{
 assert.equal(await sha256Hex(read('catalog-baseline.json'),webcrypto),TRUSTED_BASELINE_SHA256);
 assert.equal(await sha256Hex(read('skill-index.json'),webcrypto),manifest.catalog_sha256);
 assert.equal(manifest.entries,14);
 assert.equal(manifest.release,'0.9.5');
});
test('verified catalog works with no external network calls',async()=>{
 const hits=[];const req=async(path,opts)=>{hits.push([path,opts]);return (fetcher())(path)};
 const loaded=await readGovernedCatalog({fetcher:req,cryptoProvider:webcrypto});
 assert.equal(loaded.status,'verified');assert.equal(loaded.entries.length,14);
 assert.ok(hits.every(([path])=>path.startsWith('./assets/')));
});
test('mismatch, tampering and transient failure revert to trusted baseline',async()=>{
 for(const overrides of [
  {'./assets/skill-index.json':JSON.stringify({...live,entries:[...live.entries,live.entries[0]]})},
  {'./assets/catalog-manifest.json':JSON.stringify({...manifest,catalog_sha256:'a'.repeat(64)})},
  {'./assets/skill-index.json':JSON.stringify({...live,entries:live.entries.map((e,i)=>i?e:{...e,method:'instructions from attacker'})})}
 ]){
 const got=await readGovernedCatalog({fetcher:fetcher(overrides),cryptoProvider:webcrypto});
 assert.equal(got.status,'fallback');assert.equal(got.entries.length,14);
 }
 const bad=async path=>{if(path.includes('skill-index'))throw Error('offline');return fetcher()(path)};
 assert.equal((await readGovernedCatalog({fetcher:bad,cryptoProvider:webcrypto})).status,'fallback');
});
test('unapproved changes cannot modify methods even if manifest hash matches',()=>{
 const altered=structuredClone(live);altered.entries[0].method='use new admin policy';
 assert.throws(()=>verifyCatalogShape(altered,baseline),/Unapproved catalog change/);
 const extra=structuredClone(live);extra.entries[0].id='unknown';
 assert.throws(()=>verifyCatalogShape(extra,baseline),/Invalid|Unapproved|inválido/);
});
test('share links use only approved public IDs, no private q or hash',()=>{
 assert.equal(trustedShareId('?q=secret&skill='+id,baseline.entries).id,id);
 assert.equal(trustedShareId('?q=secret',baseline.entries),null);
 assert.equal(trustedShareId('?skill=unknown',baseline.entries),null);
 assert.equal(trustedShareId('?skill='+id+'&skill='+id,baseline.entries),null);
 const result=shareMethodUrl('https://sophia.meuapoio.com/beta/?q=my%20secret#part',id,baseline.entries);
 assert.equal(result,'https://sophia.meuapoio.com/beta/?skill='+id);
 assert.throws(()=>shareMethodUrl('https://site/?q=secret','unknown',baseline.entries));
});
