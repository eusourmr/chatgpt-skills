import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {route,validateCatalog,clarify} from '../assets/router.js';
const fixture=JSON.parse(readFileSync(new URL('./intent-cases.json',import.meta.url)));
const entries=validateCatalog(JSON.parse(readFileSync(new URL('../assets/skill-index.json',import.meta.url))));
const approved=new Set(entries.map(e=>e.id));
const results=fixture.cases.map(({query,expected})=>{
 const actual=route(query,entries);
 const got=actual.status==='urgent'?'urgent':actual.status==='native'?'native':actual.status==='match'?actual.options[0].id:actual.options.map(o=>o.id).join('|');
 return {query,expected,got,status:actual.status};
});
const pass=results.filter(x=>x.got===x.expected);
const failures=results.filter(x=>x.got!==x.expected);
const falseSpecialized=results.filter(x=>x.expected==='native'&&x.got!=='native');
test('intent fixture has diverse real-world and native/safety cases',()=>{
 assert.ok(fixture.cases.length>=100);
 assert.equal(new Set(fixture.cases.map(x=>x.query)).size,fixture.cases.length);
 assert.ok([...new Set(fixture.cases.map(x=>x.expected))].length>=16);
 assert.ok(fixture.cases.every(c=>['native','urgent'].includes(c.expected)||approved.has(c.expected)));
});
test('routing accuracy on authored fixture is >= 90%, no unsafe or excluded matches',()=>{
 const urgent=results.filter(x=>x.expected==='urgent');
 assert.ok(urgent.every(x=>x.got==='urgent'),JSON.stringify(urgent.filter(x=>x.got!=='urgent')));
 assert.ok(falseSpecialized.length<=2,JSON.stringify(falseSpecialized));
 assert.ok(pass.length/results.length>=0.9,JSON.stringify({pass:pass.length,total:results.length,failures},null,2));
});
test('one clarification is provided for vague but never urgent requests',()=>{
 assert.ok(clarify('Quero resolver'));
 assert.equal(clarify('Preciso cobrar um cliente atrasado mantendo o respeito'),null);
 assert.equal(clarify('Estou com dor no peito e falta de ar'),null);
});
