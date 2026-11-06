// Regression corpus authored with the product; no independent human/model evaluation.
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {route,validateCatalog,compose} from '../assets/router.js';
const catalog=JSON.parse(readFileSync(new URL('../assets/skill-index.json',import.meta.url)));
const entries=validateCatalog(catalog);
const method=id=>entries.find(e=>e.id===id);
const selected=q=>{const r=route(q,entries);return r.status==='match'?r.options[0].id:r.status;};

test('inability requests are not interpreted as refusal of the requested help',()=>{
 for(const [query,id] of [
  ['Não consigo configurar meu celular','digital-helper-simple'],
  ['Não sei como corrigir meu texto','text-integrity-editor'],
  ['Não consigo revisar meu currículo','text-integrity-editor'],
  ['Estou sem saber como configurar meu roteador','digital-helper-simple']
 ])assert.equal(selected(query),id,query);
});

test('refusal remains negative and another requested domain can still be selected',()=>{
 assert.equal(selected('Não quero revisar meu texto; preciso preparar viagem'),'travel-readiness');
 assert.equal(selected('Não quero configurar meu celular'),'native');
 assert.equal(selected('Sem revisar meu texto'),'native');
});

test('short definitions stay direct without domain-triggered specialization',()=>{
 for(const query of ['O que é ABNT?','Explique em uma frase o que é phishing',
  'Defina algoritmo em uma frase','Qual é o significado de passaporte?',
  'O que significa traceback?'])assert.equal(selected(query),'native',query);
});

test('a definition followed by a substantive request retains the useful specialist',()=>{
 assert.equal(selected('O que é ABNT e como formatar meu TCC?'),'academic-writing-navigator');
 assert.equal(selected('O que escrever para cobrar um cliente?'),'difficult-conversation-prep');
});

test('priority blocking remains ahead of the definition shortcut',()=>{
 assert.equal(selected('Explique em uma frase: estou com falta de ar e dor no peito'),'urgent');
});

test('editing handoff carries a meaning-change warning before altered copy requirement',()=>{
 const prompt=compose('Troque poderá por deverá e retire sujeito à confirmação.',method('text-integrity-editor'));
 assert.match(prompt,/Antes de entregar qualquer texto revisado/);
 assert.match(prompt,/comece a resposta com ATENÇÃO — MUDANÇA SUBSTANTIVA DE SIGNIFICADO/);
 assert.match(prompt,/antes de qualquer trecho alterado/);
 assert.match(prompt,/VERSÃO ALTERNATIVA — NÃO É CORREÇÃO GRAMATICAL/);
 // This checks the transmitted contract, not compliance by ChatGPT or Gemini.
});

test('technical and academic methods do not turn planned work into certified outcomes',()=>{
 assert.match(method('engineering-investigator').method,/teste planejado de teste executado/);
 assert.match(method('engineering-investigator').method,/merge e implantação são estados diferentes/);
 assert.match(method('academic-writing-navigator').method,/Não emita certificado/);
 assert.match(method('academic-writing-navigator').method,/aprovação ética/);
 assert.match(method('context-continuity-manager').method,/não converta planejado em aprovado/);
});

test('immutable input provenance does not fabricate a new Registry publication',()=>{
 assert.match(catalog.source_commit,/^[a-f0-9]{40}$/);
 const raw=execFileSync('git',['show',catalog.source_commit+':'+catalog.source_registry]);
 assert.equal(createHash('sha256').update(raw).digest('hex'),catalog.registry_metadata.file_sha256);
 assert.equal(catalog.registry_metadata.declared_source_commit,'development');
 assert.equal(catalog.registry_metadata.declared_published_at,'2026-10-11');
 assert.ok(entries.every(e=>e.evidence_state==='designed'&&e.delivery_state==='registry_only'));
});
