#!/usr/bin/env node
// Candidate integrity gate: 0.18 can be reviewed without changing the installed 0.17 plugin.
import {readFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import assert from 'node:assert/strict';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=(p)=>readFileSync(path.join(root,p),'utf8');
const json=(p)=>JSON.parse(read(p));
const core=read('plugins/cs-navigator/skills/cs-navigator/SKILL.md');
const mirror=read('skills/featured/cs-navigator/SKILL.md');
const candidate=read('release/candidates/cs-navigator-v0.18.0-rc1/SKILL.md');
const manifest=json('release/candidates/cs-navigator-v0.18.0-rc1/manifest.json');
const plugin=json('plugins/cs-navigator/plugin.json');
const pack=json('plugins/cs-navigator/capability-pack.json');
const mcp=read('mcp/cs-registry-server/src/server.ts');
const sourceTS=read('mcp/cs-registry-server/src/fulfillment.ts');
const plan=json('trust/evals/plans/cs-navigator-v018-delivery.json');

assert.equal(core,mirror,'0.17 stable canonical and distributed skills must be byte-identical');
assert.equal(plugin.version,'0.17.0','do not silently change submitted plugin');
assert.equal(pack.pack_version,'0.17.0','do not silently replace submitted pack');
assert.equal(manifest.version,'0.18.0');
assert.equal(manifest.candidate_state,'implementation-pending-native-qualification');
assert.equal(manifest.mcp_default_enabled,false);
assert.equal(manifest.native_semantic_qualification,'not-run');
assert.equal(manifest.user_outcome_pilots,'not-run');
assert.equal(manifest.evidence_promotion,false);
assert.equal(manifest.stable_plugin_version_unchanged,plugin.version);
assert.ok(manifest.release_blockers.length>=5);
const start='## Capability Delivery Gate — 0.18 candidate\n';
const end='## Personal capability layer';
assert.equal(candidate.split(start).length,2,'exactly one 0.18 gate');
assert.equal(candidate.replace(start+candidate.split(start)[1].split(end)[0],''),core,
  '0.18 candidate must be exactly the stable 0.17 skill plus one auditable insertion');
assert.match(candidate,/native_only/);
assert.match(candidate,/catalog_guidance_only/);
assert.match(candidate,/host_confirmation_required/);
assert.match(candidate,/host-supported|host.runtime|host runtime|host confirmation/i);
assert.match(candidate,/not proven active/i);
assert.match(candidate,/without bypassing exclusions|healthcare distribution exclusion/i);
assert.match(candidate,/do not claim an invocation/i);
assert.match(sourceTS,/export function decideFulfillmentPath/);
assert.match(sourceTS,/safe_to_claim_executed: false/);
assert.match(sourceTS,/safe_to_claim_outcome: false/);
assert.match(mcp,/if \(isExperimentalDeliveryToolEnabled\(process\.env\.CS_ENABLE_EXPERIMENTAL_DELIVERY_TOOL\)\)/);
assert.match(mcp,/guidance: decideFulfillmentPath\(assessment\)/);
const calls=[...mcp.matchAll(/server\.registerTool\(\s*"([^"]+)"/g)].map(x=>x[1]);
assert.deepEqual(calls.sort(),['search_capabilities','get_capability','get_evidence','registry_status','curate_user_goal','assess_capability_delivery'].sort());
assert.equal(plan.version,'0.18.0');
assert.equal(plan.status,'planned-not-executed');
assert.ok(plan.scenarios.length>=8);
assert.equal(new Set(plan.scenarios.map(x=>x.id)).size,plan.scenarios.length);
assert.ok(plan.scenarios.every(x=>x.status==='not-run'&&x.prompt&&x.expected_behavior));
for(const excluded of ['medical-appointment-prep','caregiver-coordinator']){
 assert.ok(manifest.excludes.includes(excluded));
 assert.match(candidate,/do not route, rename/i);
}
console.log('PASS — 0.18 candidate gate, default-off tool, stable 0.17, and unexecuted proof-of-value plan');
