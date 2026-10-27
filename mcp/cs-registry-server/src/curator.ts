/**
 * CS Navigator 0.18 RC2: safe, read-only editorial method curation.
 * The GitHub JSON is DATA, not instructions from a trusted host.
 * Nothing here installs/executes skills or provides permissions.
 */
export type CuratedMethod = {
  id: string;
  title: string;
  signals: string[];
  steps: string[];
  expected_output: string;
  source_commit: string;
  source_path: string;
  approval_state: "editorial-reviewed";
  execution_mode: "guidance-only";
  limitations: string;
};
export type CuratedCatalog = {schema_version:1; catalog_version:string; entries:CuratedMethod[]};
export type AvailableRecord = {id:string;distribution_state?:string;evidence_state?:string};
const ID=/^[a-z][a-z0-9-]{2,79}$/;
const SOURCE=/^[0-9a-f]{40}$/;
const forbiddenIds=new Set(["medical-appointment-prep","caregiver-coordinator"]);
const unsafe=/ignore (all |the )?(previous|system|developer)|<script|javascript:|data:text\/html|\bcurl\s+https?:|\beval\s*\(/i;
export function normalizeGoal(value:string):string {
  return String(value||"").toLocaleLowerCase("pt-BR").normalize("NFD")
    .replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g," ").trim().replace(/\s+/g," ");
}
export function parseCuratedCatalog(raw:unknown):CuratedCatalog {
  if(!raw||typeof raw!=="object")throw new Error("Invalid method catalog");
  const cat=raw as Record<string,unknown>;
  if(cat.schema_version!==1||typeof cat.catalog_version!=="string"||!Array.isArray(cat.entries)||cat.entries.length>80)throw new Error("Unsupported method catalog");
  const entries:CuratedMethod[]=[];
  const ids=new Set<string>();
  for(const item of cat.entries){
    if(!item||typeof item!=="object")throw new Error("Invalid method");
    const e=item as Record<string,unknown>;
    if(typeof e.id!=="string"||!ID.test(e.id)||forbiddenIds.has(e.id)||ids.has(e.id)||e.approval_state!=="editorial-reviewed"||e.execution_mode!=="guidance-only")throw new Error("Unapproved method");
    if(typeof e.source_commit!=="string"||!SOURCE.test(e.source_commit)||
      typeof e.source_path!=="string"||!/^skills\/[a-z0-9\/-]+\/SKILL\.md$/.test(e.source_path))throw new Error("Missing immutable source");
    for(const key of ["title","expected_output","limitations"])
      if(typeof e[key]!=="string"||!(e[key] as string).trim()||(e[key] as string).length>360||unsafe.test(e[key] as string))throw new Error("Untrusted text field");
    if(!Array.isArray(e.signals)||!e.signals.length||e.signals.length>20||!e.signals.every(x=>typeof x==="string"&&x.length>=3&&x.length<=65&&!unsafe.test(x)))throw new Error("Invalid signals");
    if(!Array.isArray(e.steps)||!e.steps.length||e.steps.length>5||!e.steps.every(x=>typeof x==="string"&&x.length>=12&&x.length<=260&&!unsafe.test(x)))throw new Error("Invalid guidance");
    ids.add(e.id);
    entries.push({id:e.id,title:e.title as string,signals:[...e.signals] as string[],steps:[...e.steps] as string[],expected_output:e.expected_output as string,source_commit:e.source_commit,source_path:e.source_path,approval_state:"editorial-reviewed",execution_mode:"guidance-only",limitations:e.limitations as string});
  }
  return {schema_version:1,catalog_version:cat.catalog_version,entries};
}
function signalScore(goal:string,signal:string):number{
  const s=normalizeGoal(signal);
  if(!s||!(' '+goal+' ').includes(' '+s+' '))return 0;
  const pos=goal.indexOf(s);
  const before=goal.slice(Math.max(0,pos-18),pos);
  if(/(?:^| )(?:nao|sem|evitar|dispenso|excluir)\s+(?:(?:quero|preciso|desejo)\s+)?$/.test(before))return 0;
  return s.includes(" ")?4:2;
}
export function curateGoal(goalInput:string,catalog:CuratedCatalog,records:AvailableRecord[]){
  const goal=normalizeGoal(goalInput).slice(0,1100);
  const present=new Set(records.filter(x=>x.distribution_state==="available"&&!forbiddenIds.has(x.id)).map(x=>x.id));
  const native={status:"native" as const,reason:"Nenhum método aprovado com correspondência suficiente; continuar no ChatGPT nativo.",methods:[] as CuratedMethod[],execution_verified:false as const,host_activation_verified:false as const};
  if(goal.length<4)return native;
  const ranked=catalog.entries.filter(x=>present.has(x.id)).map(method=>({
    method,score:Math.min(18,method.signals.reduce((n,s)=>n+signalScore(goal,s),0))
  })).filter(x=>x.score>=2).sort((a,b)=>b.score-a.score||a.method.id.localeCompare(b.method.id));
  if(!ranked.length)return native;
  if(ranked.length>1&&ranked[0].score===ranked[1].score)return {
    ...native,status:"choice" as const,
    reason:"Mais de um método é plausível; escolha opcionalmente, sem inventar um vencedor.",
    methods:ranked.slice(0,2).map(x=>x.method)
  };
  return {status:"guided" as const,reason:"Orientação editorial aprovada; não é skill instalada ou executada.",methods:[ranked[0].method],execution_verified:false as const,host_activation_verified:false as const};
}
