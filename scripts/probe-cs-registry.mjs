#!/usr/bin/env node
// Network smoke test: externally verify the *existing* read-only CS Registry MCP.
// No credentials, no private user data, no arbitrary remote instructions.
import assert from 'node:assert/strict';

const ORIGIN = 'https://chatgpt-skills.onrender.com';
const URL = ORIGIN + '/mcp';
const timeout = 30000;
const headers = {
  'accept': 'application/json, text/event-stream',
  'content-type': 'application/json',
  'mcp-protocol-version': '2025-06-18'
};
const pause = (ms) => new Promise((r) => setTimeout(r, ms));
async function fetchSafe(url, options = {}) {
  const r = await fetch(url, { ...options, signal: AbortSignal.timeout(timeout) });
  if (!r.ok) throw Error('HTTP ' + r.status + ' ' + (await r.text()).slice(0, 250));
  return r;
}
async function retry(fn, attempts = 4) {
  let error;
  for (let n = 0; n < attempts; n++) {
    try { return await fn(); }
    catch (e) { error=e; if (n < attempts-1) await pause(12000); }
  }
  throw error;
}
function parseRpc(body) {
  const trimmed=body.trim();
  if (!trimmed) return null;
  if (trimmed.startsWith('{')) return JSON.parse(trimmed);
  const events=trimmed.split(/\r?\n\r?\n/);
  const objs=[];
  for (const event of events) {
    const lines=event.split(/\r?\n/).filter((l)=>l.startsWith('data:'));
    if (lines.length) {
      const value=lines.map(l=>l.slice(5).trim()).join('\n');
      try {objs.push(JSON.parse(value));}catch{}
    }
  }
  return objs.find(o=>o.result||o.error) || objs[0] || null;
}
let session;
async function rpc(payload) {
  const h={...headers};
  if (session) h['mcp-session-id']=session;
  const r=await fetchSafe(URL,{method:'POST',headers:h,body:JSON.stringify(payload)});
  const sid=r.headers.get('mcp-session-id');
  if (sid) session=sid;
  const message=parseRpc(await r.text());
  if (payload.id != null) {
    assert(message,'MCP reply not present');
    if (message.error) throw Error('MCP '+JSON.stringify(message.error));
    assert.equal(message.id,payload.id,'wrong JSON-RPC response id');
    assert(message.result,'missing result');
    return message.result;
  }
  return message;
}
const health=await retry(async()=>await(await fetchSafe(ORIGIN+'/')).json());
assert.equal(health.service,'cs-navigator-registry');
assert.equal(health.mode,'read-only');
console.log('HEALTH_VERIFIED',JSON.stringify({service:health.service,mode:health.mode,version:health.version}));
const init=await retry(()=>rpc({jsonrpc:'2.0',id:1,method:'initialize',params:{
  protocolVersion:'2025-06-18',capabilities:{},clientInfo:{name:'cs-universal-beta-ci',version:'0.20.0-beta.2'}
}}));
assert(init.protocolVersion,'MCP initialization missing negotiated version');
console.log('MCP_INITIALIZED',init.protocolVersion);
await rpc({jsonrpc:'2.0',method:'notifications/initialized'});
const tools=await rpc({jsonrpc:'2.0',id:2,method:'tools/list',params:{}});
const names=new Set((tools.tools||[]).map(x=>x.name));
for(const name of ['search_capabilities','get_capability','get_evidence','registry_status'])assert(names.has(name),'Missing read-only MCP tool '+name);
console.log('MCP_TOOLS_VISIBLE', [...names].sort().join(','));
function output(result) {
  const items=result.content||[];
  for (const item of items) if(item.type==='text') {
    try{return JSON.parse(item.text);}catch{}
  }
  return result.structuredContent||result;
}
const status=output(await rpc({jsonrpc:'2.0',id:3,method:'tools/call',params:{name:'registry_status',arguments:{}}}));
assert.equal(typeof status.capability_count,'number');
console.log('REGISTRY_STATUS_CALLED',JSON.stringify({capability_count:status.capability_count,source_commit:status.source_commit,published_at:status.published_at}));
for(const [id,name] of [[4,'medical-appointment-prep'],[5,'caregiver-coordinator']]) {
  const result=output(await rpc({jsonrpc:'2.0',id,method:'tools/call',params:{name:'get_capability',arguments:{id:name}}}));
  assert.equal(result.found,false,'Excluded healthcare capability was exposed: '+name);
  console.log('EXCLUSION_VERIFIED',name);
}
console.log('LIVE_MCP_SUCCESS — service responds to tool calls. This is NOT proof of ChatGPT host activation.');
