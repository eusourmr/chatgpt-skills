#!/usr/bin/env node
// Real MCP-over-HTTP integration test against localhost. No hosting or credentials.
import assert from "node:assert/strict";
const endpoint=process.env.MCP_TEST_URL || "http://127.0.0.1:3000/mcp";
let session;
function unpack(raw,contentType){
  if(contentType.includes("application/json"))return JSON.parse(raw);
  const messages=raw.split(/\r?\n\r?\n/).flatMap(block=>{
    const data=block.split(/\r?\n/).filter(line=>line.startsWith("data:")).map(line=>line.slice(5).trim()).join("\n");
    if(!data)return [];
    try{return [JSON.parse(data)];}catch{return [];}
  });
  if(!messages.length)throw Error("No MCP JSON response: "+raw.slice(0,300));
  return messages.at(-1);
}
async function rpc(id,method,params){
  const headers={"content-type":"application/json","accept":"application/json, text/event-stream","mcp-protocol-version":"2025-03-26"};
  if(session)headers["mcp-session-id"]=session;
  const response=await fetch(endpoint,{method:"POST",headers,body:JSON.stringify({jsonrpc:"2.0",id,method,params})});
  session=response.headers.get("mcp-session-id")||session;
  const raw=await response.text();
  assert(response.ok,method+" HTTP "+response.status+" "+raw.slice(0,400));
  const result=unpack(raw,response.headers.get("content-type")||"");
  if(result.error)throw Error(JSON.stringify(result.error));
  assert.equal(result.id,id,"MCP response ID mismatch");
  return result.result;
}
const init=await rpc(1,"initialize",{protocolVersion:"2025-03-26",capabilities:{},clientInfo:{name:"cs-navigator-ci-test",version:"1.0.0"}});
assert(init.serverInfo?.name,"No server info");
const list=await rpc(2,"tools/list",{});
const names=list.tools.map(t=>t.name).sort();
assert.deepEqual(names,["assess_capability_delivery","curate_user_goal","get_capability","get_evidence","registry_status","search_capabilities"].sort());
const call=async(id,name,args)=>{
  const output=await rpc(id,"tools/call",{name,arguments:args});
  assert(!output.isError,name+" returned MCP error");
  const text=output.content?.find(x=>x.type==="text")?.text;
  assert(text,name+" returned no text");
  return JSON.parse(text);
};
const status=await call(3,"registry_status",{});
assert(Number.isInteger(status.capability_count),"Bad registry status");
const missing=await call(4,"assess_capability_delivery",{id:"lunar-enterprise-unicorn"});
assert.equal(missing.execution_verified,false);
const learning=await call(5,"curate_user_goal",{goal:"Quero aprender estatistica com recuperacao ativa"});
assert.equal(learning.execution_verified,false);
const excluded=await call(6,"assess_capability_delivery",{id:"medical-appointment-prep"});
assert.equal(excluded.execution_verified,false);
console.log(JSON.stringify({status:"PASS",server:init.serverInfo.name,tools:names,registry_count:status.capability_count,missing:missing.delivery_state,learning:learning.status,excluded:excluded.delivery_state,execution_verified:false},null,2));
