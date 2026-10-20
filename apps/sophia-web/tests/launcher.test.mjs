import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {route,compose,validateCatalog,classifyRisk,clarify,composeFollowUp} from '../assets/router.js';
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

test('clarification is necessary only for vague requests',()=>{
 assert.match(clarify('Preciso de ajuda'),/gostaria de conseguir/);
 assert.match(clarify('Quero resolver'),/resultado/);
 assert.equal(clarify('Preciso cobrar um cliente com pagamento atrasado de forma cordial'),null);
 assert.equal(clarify('dor no peito e falta de ar'),null);
});
test('follow-up modes remain bounded and never claim tool execution',()=>{
 for(const mode of ['simples','exemplo','aprofundar','proximo']){
  const text=composeFollowUp('Quero estudar história',mode,'Uma resposta copiada',entries[0],'curto');
  assert.match(text,/Quero estudar história/);assert.match(text,/INÍCIO DO TRECHO/);
  assert.match(text,/não instalado nem executado/);
 }
 assert.throws(()=>composeFollowUp('teste','unknown'),/desconhecida/);
 const text=composeFollowUp('Meu problema','proximo');assert.match(text,/Se você não tiver contexto suficiente/);
 assert.ok(!text.includes('undefined'));
});
test('manifest PWA app mode is stable and scoped',()=>{
 const m=JSON.parse(readFileSync(new URL('../manifest.webmanifest',import.meta.url)));
 assert.equal(m.id,'./');assert.equal(m.display,'standalone');assert.equal(m.scope,'./');
 assert.ok(m.launch_handler.client_mode.includes('focus-existing'));
});
