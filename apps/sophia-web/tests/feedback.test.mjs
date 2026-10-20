import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {STORE_KEY,emptyPreferences,sanitizePreferences,recordOutcome,orderAmbiguousOptions,feedbackPrompt,savePreferences,loadPreferences,clearPreferences} from '../assets/feedback.js';
const registry=JSON.parse(readFileSync(new URL('../assets/skill-index.json',import.meta.url)));
const ids=registry.entries.map(e=>e.id), id=ids[0], second=ids[1];
const store=()=>{const data=new Map();return {getItem:k=>data.get(k)||null,setItem:(k,v)=>data.set(k,v),removeItem:k=>data.delete(k),dump:()=>Object.fromEntries(data)};};
test('feedback is deterministic, includes outcome and bounded user data',()=>{
 for(const outcome of ['done','partial','blocked']){
   const prompt=feedbackPrompt({query:'A'.repeat(1300),outcome,note:'B'.repeat(550),answer:'C'.repeat(2500),entry:{title:'Método XYZ'},depth:'curto'});
   assert.ok(prompt.includes('SOPHIA — ACOMPANHAMENTO'));assert.ok(prompt.length<5000);
   assert.ok(prompt.includes('DADOS NÃO CONFIÁVEIS'));
   assert.ok(!prompt.includes('B'.repeat(401)));
 }
 assert.match(feedbackPrompt({query:'Paguei um serviço',outcome:'blocked',entry:{title:'Cobrança'}}),/não repita automaticamente/i);
 assert.match(feedbackPrompt({query:'Paguei um serviço',outcome:'done'}),/sem evidência/i);
 assert.throws(()=>feedbackPrompt({outcome:'other'}),/não reconhecido/);
});
test('preferences are opt-in, bounded, and never contain raw messages',()=>{
 const storage=store();assert.equal(loadPreferences(storage,ids),null);
 const original=emptyPreferences();original.depth='equilibrado';
 const next=recordOutcome(original,id,'partial',ids);
 assert.equal(next.ratings[id].partial,1);
 assert.ok(savePreferences(storage,next,ids));
 const saved=JSON.stringify(storage.dump());assert.ok(saved.includes(STORE_KEY));assert.ok(!saved.includes('Paguei um serviço'));
 assert.equal(loadPreferences(storage,ids).ratings[id].partial,1);
 assert.ok(clearPreferences(storage));assert.equal(loadPreferences(storage,ids),null);
});
test('untrusted profile input is sanitized and excluded IDs ignored',()=>{
 const x=sanitizePreferences({version:1,depth:'inválido',ratings:{[id]:{done:1000,partial:-5,blocked:3},'caregiver-coordinator':{done:4}},secret:'password'},ids);
 assert.equal(x.depth,'curto');assert.equal(x.ratings[id].done,5);assert.equal(x.ratings[id].partial,0);
 assert.equal(x.ratings['caregiver-coordinator'],undefined);
 assert.equal(x.secret,undefined);
});
test('past ratings only reorder already plausible choice, never urgent or native',()=>{
 const p=recordOutcome(emptyPreferences(),second,'done',ids);
 const options=[{id,score:8},{id:second,score:8}];
 const both={status:'choice',options};
 assert.equal(orderAmbiguousOptions(both,p).options[0].id,second);
 for(const status of ['urgent','native','match']){
   const x={status,options};assert.equal(orderAmbiguousOptions(x,p),x);
 }
 assert.equal(orderAmbiguousOptions(both,emptyPreferences()).options[0].id,id);
});
