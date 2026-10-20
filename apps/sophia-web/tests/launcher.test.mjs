import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {route,compose,validateCatalog,classifyRisk} from '../assets/router.js';
const entries=validateCatalog(JSON.parse(readFileSync(new URL('../assets/skill-index.json',import.meta.url))));
test('approved catalog has 14 non-executable, unique, allowed profiles',()=>{
 assert.equal(entries.length,14);assert.equal(new Set(entries.map(x=>x.id)).size,14);
 assert.ok(entries.every(x=>x.delivery_state==='registry_only'&&x.editorial_template_state==='pilot'));
});
test('test real intents',()=>{
 assert.equal(route('Preciso cobrar um cliente atrasado',entries).options[0]?.id,'difficult-conversation-prep');
 assert.equal(route('Melhorar meu currículo',entries).options[0]?.id,'text-integrity-editor');
 assert.equal(route('Quero estudar para prova e aprender filosofia',entries).options[0]?.id,'learning-mastery-coach');
 assert.equal(route('Preciso investigar erro no código Python',entries).options[0]?.id,'engineering-investigator');
});
test('trivial, unknown and urgent questions do not force a skill',()=>{
 assert.equal(route('Quanto é 8 vezes 7?',entries).status,'native');
 assert.equal(route('um assunto sem correspondencia',entries).status,'native');
 assert.equal(classifyRisk('dor no peito e falta de ar'),'urgent');
 assert.equal(route('dor no peito e falta de ar',entries).status,'urgent');
});
test('no fabricated execution',()=>assert.match(compose('me ajude',entries[0]),/não.*skill.*instalada ou executada/i));
