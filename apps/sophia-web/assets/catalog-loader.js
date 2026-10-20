// SophIA 0.9.5: governed same-origin catalog updates. No third-party request or remote code.
import {validateCatalog} from './router.js';
export const CATALOG_VERSION='0.9.5';
// Immutable local release baseline: changing it requires a reviewed application release.
export const TRUSTED_BASELINE_SHA256='c6d0c55dacb1f270e8aec3602e01f5b5a56aaf662f528c88072f0da410131e19';
const encode=new TextEncoder();
export async function sha256Hex(content,cryptoProvider=globalThis.crypto){
  if(!cryptoProvider?.subtle)throw Error('SHA-256 unavailable');
  const bytes=await cryptoProvider.subtle.digest('SHA-256',encode.encode(content));
  return [...new Uint8Array(bytes)].map(x=>x.toString(16).padStart(2,'0')).join('');
}
export function verifyCatalogShape(index,baseline){
  const active=validateCatalog(index),trusted=validateCatalog(baseline);
  const reference=new Map(trusted.map(x=>[x.id,x]));
  if(active.length!==reference.size)throw Error('Unexpected catalog count');
  for(const entry of active){
    const known=reference.get(entry.id);
    if(!known)throw Error('Unapproved catalog ID');
    // The live catalog may refresh evidence metadata, NOT methods or activation terms.
    for(const key of ['title','method','category','keywords','phrases','source_id','delivery_state','editorial_template_state']){
      if(JSON.stringify(entry[key])!==JSON.stringify(known[key]))throw Error('Unapproved catalog change: '+key);
    }
    if(!['designed','tested','unknown'].includes(entry.evidence_state))throw Error('Evidence state not allowed');
  }
  return active;
}
export async function readGovernedCatalog({fetcher=fetch,cryptoProvider=globalThis.crypto}={}){
  const read=async(path)=>{
    const res=await fetcher('./assets/'+path,{cache:'no-cache'});
    if(!res.ok)throw Error('Catalog HTTP '+res.status);
    const body=await res.text();
    if(body.length>200000)throw Error('Catalog too large');
    return {body,parsed:JSON.parse(body)};
  };
  // Baseline is checked against a hardcoded digest even if live files were replaced.
  const baseline=await read('catalog-baseline.json');
  if(await sha256Hex(baseline.body,cryptoProvider)!==TRUSTED_BASELINE_SHA256)throw Error('Release baseline mismatch');
  validateCatalog(baseline.parsed);
  try{
    const manifest=await read('catalog-manifest.json');
    const m=manifest.parsed;
    if(m.schema_version!==1||m.release!==CATALOG_VERSION||m.distribution!=='same-origin'||m.entries!==baseline.parsed.entries.length||!(/^[a-f0-9]{64}$/).test(m.catalog_sha256))throw Error('Invalid catalog manifest');
    const live=await read('skill-index.json');
    if(await sha256Hex(live.body,cryptoProvider)!==m.catalog_sha256)throw Error('Catalog checksum mismatch');
    const entries=verifyCatalogShape(live.parsed,baseline.parsed);
    return {entries,status:'verified',version:m.release};
  }catch{
    return {entries:validateCatalog(baseline.parsed),status:'fallback',version:CATALOG_VERSION};
  }
}
export function trustedShareId(search,entries){
  const params=new URLSearchParams(String(search||'').replace(/^\?/,''));
  // Only the public method ID is accepted; never read personal free-text q.
  const ids=params.getAll('skill');
  if(ids.length!==1||!(/^[a-z0-9-]{3,80}$/).test(ids[0]))return null;
  return entries.find(e=>e.id===ids[0])||null;
}
export function shareMethodUrl(url,id,entries){
  if(!entries.some(e=>e.id===id))throw Error('Method not approved');
  const u=new URL(url); if(!['https:','http:'].includes(u.protocol))throw Error('Unsupported origin');
  u.search='';u.hash='';u.searchParams.set('skill',id);
  return u.toString();
}
