import {test} from 'node:test';
import assert from 'node:assert/strict';
import {suggestDepth,describeGuidance} from '../assets/flow-guidance.js';
const samples=[
 ['Quero estudar história','curto'],
 ['Preciso de uma resposta curta para o cliente e tenho um cenário bastante extenso que descreve meu trabalho, meus contatos e minhas opções possíveis, sem entrar em detalhes demais, por favor.','curto'],
 ['Me ajude detalhadamente a preparar um plano de estudo','aprofundado'],
 ['Quero analisar as vantagens e desvantagens de alterar minha estratégia','equilibrado'],
 ['Preciso organizar meus gastos e também revisar minha rotina','equilibrado'],
 ['Me ajude a reorganizar um processo administrativo que envolve várias etapas e preciso entender a ordem de prioridade, conferir os documentos, conversar com os envolvidos e revisar o plano final de forma responsável','equilibrado'],
 ['Preciso de uma resposta com um exemplo simples','curto'],
 ['Não preciso de resposta longa; só um roteiro rápido de primeiro passo','curto'],
];
test('local guidance suggests proportional depth without semantic claims',()=>{
 for(const [input,want] of samples)assert.equal(suggestDepth(input).value,want,input);
});
test('depth suggestions are deterministic, bounded and robust to empty or long input',()=>{
 for(const input of ['',null,' '.repeat(300),'a'.repeat(100000)]){
  const a=suggestDepth(input),b=suggestDepth(input);
  assert.deepEqual(a,b);
  assert.ok(['curto','equilibrado','aprofundado'].includes(a.value));
 }
});
test('guidance does not claim confidence or a remote model',()=>{
 for(const status of ['native','choice','match']){
  const t=describeGuidance({status},'curto',{automatic:true});
  assert.match(t,/regras locais/);
  assert.doesNotMatch(t,/inteligência semântica|IA detectou|certeza/);
 }
 assert.match(describeGuidance({status:'match'},'equilibrado',{personalized:true}),/estilo salvo/);
});
