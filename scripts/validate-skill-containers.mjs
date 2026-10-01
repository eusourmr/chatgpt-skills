#!/usr/bin/env node
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const root=process.cwd()==='/'?path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..'):process.cwd();
const policy=JSON.parse(await readFile(path.join(root,'trust/containers/default.json'),'utf8'));
const errors=[];
const expect=(ok,msg)=>{if(!ok)errors.push(msg)};

expect(policy.schema_version==='0.1','schema_version must be 0.1');
expect(policy.release_line==='0.7.5','release_line must be 0.7.5');
expect(policy.mode==='fail-closed','default container must be fail-closed');
expect(policy.principles?.safe_failure_is_valid===true,'safe failure must be valid');
expect(policy.principles?.completion_at_any_cost===false,'completion-at-any-cost must be false');
expect(policy.principles?.self_escalation===false,'self escalation must be forbidden');
expect(policy.principles?.child_may_widen_parent===false,'child may not widen parent');
expect(policy.epistemic_boundary?.fabricated_citations==='deny','fabricated citations must be denied');
expect(policy.epistemic_boundary?.fabricated_observations==='deny','fabricated observations must be denied');
expect(policy.epistemic_boundary?.fabricated_tool_results==='deny','fabricated tool results must be denied');
expect(policy.epistemic_boundary?.inference_must_be_labeled===true,'inference must be labeled');
expect(policy.capability_boundary?.default==='deny','capability default must be deny');
expect(policy.capability_boundary?.permission_widening==='deny','permission widening must be denied');
expect(policy.acquisition_boundary?.credential_theft==='deny','credential theft must be denied');
expect(policy.acquisition_boundary?.unauthorized_access==='deny','unauthorized access must be denied');
expect(policy.acquisition_boundary?.authentication_bypass==='deny','authentication bypass must be denied');
expect(policy.acquisition_boundary?.authorization_bypass==='deny','authorization bypass must be denied');
expect(policy.acquisition_boundary?.privilege_escalation==='deny','privilege escalation must be denied');
expect(policy.acquisition_boundary?.undeclared_external_transfer==='deny','undeclared external transfer must be denied');
expect(policy.data_boundary?.external_send_default==='deny','external send must default deny');
expect(policy.data_boundary?.secrets_default==='deny','secrets must default deny');
expect(policy.budget?.bounded_attempts===true,'attempt budget must be bounded');
expect(policy.budget?.budget_exhaustion==='stop','budget exhaustion must stop');
expect(policy.budget?.may_expand_permission_after_exhaustion===false,'budget exhaustion cannot expand permission');
expect(policy.composition?.effective_child_policy==='intersection-with-parent','child policy must intersect parent');
expect(policy.composition?.hidden_skill_handoff_may_expand_permission===false,'hidden handoff cannot expand permission');

const requiredDecisions=['allow','allow-with-confirmation','degrade','stop'];
for(const d of requiredDecisions)expect(policy.decisions?.includes(d),`missing decision ${d}`);
const requiredStops=['EVIDENCE_EXHAUSTED','PERMISSION_DENIED','AUTHORIZATION_REQUIRED','TOOL_UNAVAILABLE','SOURCE_CONFLICT','BUDGET_EXHAUSTED','CONTAINER_ESCAPE_ATTEMPT','POLICY_BOUNDARY'];
for(const s of requiredStops)expect(policy.stop_codes?.includes(s),`missing stop code ${s}`);

if(errors.length){
  console.error('Skill Container validation failed:');
  for(const e of errors)console.error('- '+e);
  process.exit(1);
}
console.log('Skill Containers OK: fail-closed default, no fabrication, no self-escalation, bounded acquisition, parent-contained composition.');
