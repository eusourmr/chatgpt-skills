import {test} from 'node:test';
import assert from 'node:assert/strict';
import {copyWithFallback} from '../assets/clipboard.js';
test('legacy copy is executed synchronously before any awaited work',async()=>{
 const seq=[];
 const pending=copyWithFallback('segredo',{legacyCopy:()=>{seq.push('legacy');return true;},modernCopy:async()=>seq.push('modern')});
 assert.deepEqual(seq,['legacy']);assert.deepEqual(await pending,{ok:true,method:'legacy'});
});
test('falls back to modern clipboard when legacy is disabled',async()=>{
 const arr=[];
 const outcome=await copyWithFallback('texto',{legacyCopy:()=>false,modernCopy:async text=>arr.push(text)});
 assert.deepEqual(arr,['texto']);assert.deepEqual(outcome,{ok:true,method:'modern'});
});
test('permission denial and quota or exception become a recoverable manual selection',async()=>{
 const outcome=await copyWithFallback('texto',{legacyCopy:()=>{throw Error('blocked');},modernCopy:async()=>{throw Error('NotAllowedError');}});
 assert.deepEqual(outcome,{ok:false,method:'manual'});
});
test('never copies empty prompts or invokes clipboard',async()=>{
 let called=false;const outcome=await copyWithFallback('  ',{legacyCopy:()=>{called=true;return true;}});
 assert.deepEqual(outcome,{ok:false,method:'empty'});assert.equal(called,false);
});
