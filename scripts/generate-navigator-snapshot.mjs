#!/usr/bin/env node
import { readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const thisFile=fileURLToPath(import.meta.url);
const root=path.resolve(path.dirname(thisFile),'..');
const readJson=async(rel)=>JSON.parse(await readFile(path.join(root,rel),'utf8'));

async function loadExternalSources(){
  const dir=path.join(root,'sources','external');
  const result=[];
  try{
    for(const name of (await readdir(dir)).filter(x=>x.endsWith('.json')).sort()){
      result.push(JSON.parse(await readFile(path.join(dir,name),'utf8')));
    }
  }catch(error){if(error.code!=='ENOENT')throw error}
  return result;
}

async function optionalJson(rel){
  try{return await readJson(rel)}catch{return null}
}

export async function buildSnapshot(){
  const manifest=await readJson('installer/manifest.json');
  const trust=await readJson(manifest.trust_file||'trust/skills.json');
  const execution=await readJson('trust/execution.json');
  const plugin=await readJson('plugins/cs-navigator/plugin.json');
  const external=await loadExternalSources();

  const entries=[];
  for(const id of Object.keys(manifest.skills||{}).sort().filter(id=>id!=='cs-navigator')){
    const raw=trust.skills?.[id];
    const exec=execution.skills?.[id];
    if(!raw||!exec)throw new Error(`${id}: missing trust or execution data`);
    const recommendation={...(trust.defaults?.recommendation||{}),...(raw.recommendation||{})};
    const passport=await optionalJson(`trust/passports/${id}.json`);
    const upstream=await optionalJson(`trust/upstream/${id}.json`);
    const risk=await optionalJson(`trust/risk-labels/${id}.json`);
    const security=await optionalJson(`trust/security-reports/${id}.json`);

    const freshnessState=upstream?.state??passport?.freshness?.status??'unknown';
    const reviewDueAt=passport?.freshness?.review_due_at??null;
    const knownGaps=raw.known_gaps||trust.defaults?.known_gaps||[];

    entries.push({
      id,
      name:raw.name,
      summary:raw.summary,
      recommendation:recommendation.state,
      execution_mode:exec.mode,
      execution_evidence:exec.evidence_state,
      required_capabilities:exec.required_capabilities||[],
      freshness_state:freshnessState,
      review_due_at:reviewDueAt,
      current_status:{
        execution_evidence:exec.evidence_state,
        recommendation:recommendation.state,
        execution_mode:exec.mode,
        freshness_state:freshnessState,
        review_due_at:reviewDueAt,
        known_gaps:knownGaps
      },
      security_result:security?.result??null,
      risk:{
        writes:risk?.writes?.state??'unknown',
        sends_externally:risk?.sends_externally?.state??'unknown',
        executes:risk?.executes?.state??'unknown',
        secrets:risk?.secrets?.state??'unknown',
        destructive_potential:risk?.destructive_potential?.state??'unknown',
        human_confirmation:risk?.human_confirmation?.state??'unknown'
      },
      permissions:{
        local_files:raw.permissions?.local_files??'unknown',
        network:raw.permissions?.network??'unknown',
        secrets:raw.permissions?.secrets??'unknown',
        process_execution:raw.permissions?.process_execution??'unknown',
        destructive_actions:raw.permissions?.destructive_actions??'unknown'
      },
      trust_passport_ref:passport?`trust/passports/${id}.json`:null,
      risk_label_ref:risk?`trust/risk-labels/${id}.json`:null,
      upstream_ref:upstream?`trust/upstream/${id}.json`:null,
      known_gaps:knownGaps
    });
  }

  const external_sources=external
    .sort((a,b)=>String(a.repository).localeCompare(String(b.repository)))
    .map(source=>({
      repository:source.repository,
      immutable_ref:source.immutable_ref,
      discovery_state:source.discovery_state,
      trust_state:source.trust_state,
      license:source.license,
      skill_count:source.skill_count,
      warnings:source.warnings||[],
      skill_ids:(source.skills||[]).map(skill=>skill.id).sort()
    }));

  return {
    schema_version:2,
    generated_for_plugin:plugin.version,
    current_evidence_required_fields:['execution_evidence','recommendation','execution_mode','freshness_state','review_due_at','known_gaps'],
    policy:"Use the smallest useful set. Native sufficiency comes first. For skills, freshness, permissions, execution evidence, security evidence, and known gaps remain separate. External indexed sources are discovery-only until separately evidenced. Container decisions do not prove native runtime enforcement unless an actual Guardian decision record is available.",
    source_contract:[
      'installer/manifest.json',
      'trust/skills.json',
      'trust/execution.json',
      'plugins/cs-navigator/plugin.json',
      'trust/passports/*.json',
      'trust/security-reports/*.json',
      'trust/risk-labels/*.json',
      'trust/upstream/*.json',
      'sources/external/*.json'
    ],
    container_guardian:{
      release_line:plugin.version,
      decision_contract:['ALLOW','CONFIRM','DEGRADE','STOP'],
      runtime_evidence:'container-guardian-runtime-eval.json',
      default_policy:'container-default-policy.json',
      native_surface_boundary:'A native ChatGPT response must not claim deterministic Guardian execution unless a host/runtime decision record is actually supplied.'
    },
    entries,
    external_sources
  };
}

async function main(){
  const targets=[
    path.join(root,'skills','featured','cs-navigator','references','catalog-snapshot.json'),
    path.join(root,'plugins','cs-navigator','skills','cs-navigator','references','catalog-snapshot.json')
  ];
  const snapshot=await buildSnapshot();
  const rendered=JSON.stringify(snapshot,null,2)+'\n';

  if(process.argv.includes('--check')){
    let failed=false;
    for(const target of targets){
      let currentRaw;
      try{currentRaw=JSON.parse(await readFile(target,'utf8'))}catch{currentRaw=null}
      const current=currentRaw?{...currentRaw,entries:(currentRaw.entries||[]).filter(entry=>entry.id!=='cs-navigator')}:null;
      if(!current||JSON.stringify(current)!==JSON.stringify(snapshot)){
        console.error(`CS Navigator snapshot stale: ${path.relative(root,target)}`);
        failed=true;
      }
    }
    if(failed)process.exit(1);
    console.log(`CS Navigator snapshot OK: ${snapshot.entries.length} bundled skills, ${snapshot.external_sources.length} external source(s).`);
  }else{
    for(const target of targets){
      await writeFile(target,rendered,'utf8');
      console.log(`Wrote ${path.relative(root,target)}`);
    }
  }
}

if(process.argv[1]&&path.resolve(process.argv[1])===path.resolve(thisFile)){await main()}
