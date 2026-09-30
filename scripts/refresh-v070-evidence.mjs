#!/usr/bin/env node
import { spawnSync } from 'node:child_process';
import process from 'node:process';

const asOfIndex=process.argv.indexOf('--as-of');
const asOf=asOfIndex>=0?process.argv[asOfIndex+1]:'2026-09-30';

function run(cmd,args){
  const r=spawnSync(cmd,args,{stdio:'inherit',shell:false});
  if(r.status!==0) process.exit(r.status??1);
}

// Trust Passport v2 fixture compatibility is validated after the graph refresh.
// Break the intentional Passport <-> security evidence dependency in a stable order:
// 1) compute current artifact/source passport view;
// 2) scan exactly that artifact;
// 3) derive Risk Labels;
// 4) re-render passports with stable evidence refs;
// 5) compute freshness/drift and Navigator snapshot;
// 6) because the Navigator snapshot is itself part of the cs-navigator artifact,
//    rescan and re-render security/passport/drift evidence after snapshot generation;
// 7) normalize behavior evidence;
// 8) validate the complete graph.
run('node',['scripts/generate-trust-passports.mjs','--write']);
run('node',['scripts/security-gate-v2.mjs','--write']);
run('node',['scripts/generate-risk-labels.mjs','--write']);
run('node',['scripts/generate-trust-passports.mjs','--write']);
run('node',['scripts/update-drift-status.mjs','--write','--as-of',asOf]);
run('node',['scripts/generate-navigator-snapshot.mjs']);

// Final stabilization pass. The snapshot changes cs-navigator bytes but does not
// depend on cs-navigator's own Passport/upstream entry, so this pass breaks the
// remaining one-way dependency without regenerating the snapshot again.
run('node',['scripts/security-gate-v2.mjs','--write']);
run('node',['scripts/generate-risk-labels.mjs','--write']);
run('node',['scripts/generate-trust-passports.mjs','--write']);
run('node',['scripts/update-drift-status.mjs','--write','--as-of',asOf]);

run('node',['scripts/generate-evals-v070.mjs','--write']);

run('node',['scripts/generate-trust-passports.mjs','--check']);
run('node',['scripts/security-gate-v2.mjs','--check']);
run('node',['scripts/generate-risk-labels.mjs','--check']);
run('node',['scripts/validate-trust-passports.mjs']);
run('node',['scripts/update-drift-status.mjs','--check','--as-of',asOf]);
run('node',['scripts/generate-evals-v070.mjs','--check']);
run('node',['scripts/validate-evals-v070.mjs']);
run('node',['scripts/validate-governance-i18n-osts.mjs']);
run('node',['scripts/generate-navigator-snapshot.mjs','--check']);

console.log('v0.7 evidence graph refresh: PASS');
