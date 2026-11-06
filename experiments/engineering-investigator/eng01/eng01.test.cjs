'use strict';
// Focused CI regression subset of the independently re-run 13-case ZIP suite.
// Synthetic, offline. No AP+ Eventos production source or network request.
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const file=process.env.HOSPEDAGENS_IMPL==='original'?'original.js':'corrigido.js';
const source=fs.readFileSync(path.join(__dirname,file),'utf8');
const A={cidade:'Goiânia'},B={cidade:'Aparecida de Goiânia'};
const RA=[{id:'A'}],RB=[{id:'B'}];
const copy=x=>JSON.parse(JSON.stringify(x));
function deferred(){let resolve,reject;const promise=new Promise((ok,fail)=>{resolve=ok;reject=fail;});return{promise,resolve,reject};}
function setup(){
  const requests=[],renders=[];
  const host={
    fetch(url){const r={...deferred(),url};requests.push(r);return r.promise;},
    render(s){renders.push(copy(s));}
  };
  vm.runInNewContext(source+'\nglobalThis.api={state,buscarHospedagens}',host,{filename:file});
  return{...host.api,requests,renders,snapshot:()=>copy(host.api.state)};
}
function ok(req,data){req.resolve({ok:true,status:200,json:async()=>data});}
function fail(req,status){req.resolve({ok:false,status,json:async()=>{throw Error('should not read body');}});}
function before(s){return{data:s.snapshot(),renders:s.renders.length};}
function unchanged(s,b){assert.deepEqual(s.snapshot(),b.data);assert.equal(s.renders.length,b.renders);}

test('B vence A atrasada sem mudar estado ou renderizações',async()=>{
  const s=setup(),a=s.buscarHospedagens(A),b=s.buscarHospedagens(B);
  ok(s.requests[1],RB);await b;
  assert.deepEqual(s.snapshot().resultados,RB);
  const old=before(s);ok(s.requests[0],RA);await a;unchanged(s,old);
});

test('A encerrada antes de B não desliga carregamento',async()=>{
  const s=setup(),a=s.buscarHospedagens(A),b=s.buscarHospedagens(B);
  const old=before(s);ok(s.requests[0],RA);await a;unchanged(s,old);
  assert.equal(s.state.carregando,true);
  ok(s.requests[1],RB);await b;
  assert.deepEqual(s.snapshot().resultados,RB);
  assert.equal(s.state.carregando,false);
});

test('falha de rede antiga não apaga sucesso novo',async()=>{
  const s=setup(),a=s.buscarHospedagens(A),b=s.buscarHospedagens(B);
  ok(s.requests[1],RB);await b;
  const old=before(s);s.requests[0].reject(new TypeError('erro antigo'));await a;unchanged(s,old);
});

test('HTTP 503 atual prevalece contra sucesso antigo',async()=>{
  const s=setup(),a=s.buscarHospedagens(A),b=s.buscarHospedagens(B);
  fail(s.requests[1],503);await b;
  assert.match(s.state.erro,/503/);
  assert.deepEqual(s.snapshot().resultados,[]);
  const old=before(s);ok(s.requests[0],RA);await a;unchanged(s,old);
});

test('JSON antigo pendente não altera B',async()=>{
  const s=setup(),body=deferred(),started=deferred();
  const a=s.buscarHospedagens(A);
  s.requests[0].resolve({ok:true,json(){started.resolve();return body.promise;}});
  await started.promise;
  const b=s.buscarHospedagens(B);ok(s.requests[1],RB);await b;
  const old=before(s);body.resolve(RA);await a;unchanged(s,old);
});

test('A -> B -> nova A usa identidade da chamada',async()=>{
  const s=setup(),a=s.buscarHospedagens(A),b=s.buscarHospedagens(B),a2=s.buscarHospedagens(A);
  const newest=[{id:'A-agora'}];ok(s.requests[2],newest);await a2;
  const old=before(s);ok(s.requests[0],RA);await a;
  ok(s.requests[1],RB);await b;unchanged(s,old);
});

test('filtros externos mutáveis não alteram URL/contexto da busca',async()=>{
  const s=setup(),f={cidade:'Goiânia'};
  const a=s.buscarHospedagens(f);f.cidade='Aparecida de Goiânia';
  assert.equal(s.requests[0].url,'/api/hospedagens?cidade=Goi%C3%A2nia');
  assert.deepEqual(s.snapshot().filtros,A);
  ok(s.requests[0],RA);await a;
});
