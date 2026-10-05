#!/usr/bin/env node
import { execFileSync } from 'node:child_process';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import crypto from 'node:crypto';
import path from 'node:path';

const root=process.cwd();
const candidate=JSON.parse(await readFile(path.join(root,'release/candidates/cs-connect-v0.9.0-r2.json'),'utf8'));
const source=candidate.plugin_source_commit;
const zipSha=candidate.zip_sha256;
const outDir=path.join(root,'trust/passports/v090');
const skillIds=[
'text-integrity-editor','evidence-first-research','argument-article-architect','founder-product-strategist',
'academic-integrity-reviewer','document-compliance-auditor','design-system-studio','interactive-creative-builder',
'engineering-investigator','skill-workbench','context-continuity-manager','project-execution-director',
'visual-intent-guardian','photo-restoration-conservator','art-critique-studio'
];
const cases={
'text-integrity-editor':['route-text-integrity'],
'evidence-first-research':['route-evidence-brazil','r2-brazil-jurisdiction-gate'],
'argument-article-architect':['route-article'],
'founder-product-strategist':['route-founder','behavioral-no-dark-pattern'],
'academic-integrity-reviewer':['route-academic'],
'document-compliance-auditor':['route-compliance'],
'design-system-studio':['route-design-system'],
'interactive-creative-builder':['route-interactive'],
'engineering-investigator':['route-debug'],
'skill-workbench':['route-skill-workbench'],
'context-continuity-manager':['route-context'],
'project-execution-director':['route-project','r2-project-reversible-checkpoint'],
'visual-intent-guardian':['route-visual-intent'],
'photo-restoration-conservator':['route-restoration'],
'art-critique-studio':['route-art-critique']
};
const r2Direct=new Set(['evidence-first-research','project-execution-director']);

const git=(args,opts={})=>execFileSync('git',args,{cwd:root,encoding:opts.encoding??'utf8',maxBuffer:10*1024*1024});
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
await mkdir(outDir,{recursive:true});

const index={
 schema_version:'v090-exact-package-passport-index-0.1',
 product:'CS Connect',version:'0.9.0',candidate:'R2',package_sha256:zipSha,
 policy:'Each record binds one first-party skill to exact qualified R2 source/package evidence. These records supplement legacy installer Trust Passports and do not invent per-skill dynamic security evidence.',
 skills:[]
};

for(const skillId of skillIds){
 const prefix=`plugins/cs-navigator/skills/${skillId}/`;
 const list=git(['ls-tree','-r','--name-only',source,'--',prefix]).trim().split('\n').filter(Boolean).sort();
 if(!list.length) throw new Error(`${skillId}: no files at qualified source commit ${source}`);
 const files=[];
 let manifest='';
 for(const full of list){
   const rel=full.slice(prefix.length);
   const bytes=execFileSync('git',['show',`${source}:${full}`],{cwd:root,encoding:null,maxBuffer:10*1024*1024});
   const h=sha(bytes);
   files.push({path:rel,sha256:h});
   manifest += `${rel}\0${h}\n`;
 }
 const artifactSha=sha(Buffer.from(manifest,'utf8'));
 const passport={
   schema_version:'v090-exact-package-passport-0.1',
   skill_id:skillId,
   product:'CS Connect',
   release:{
     version:'0.9.0',candidate:'R2',technical_plugin_slug:'cs-navigator',
     package_sha256:zipSha,plugin_source_commit:source,package_entries:candidate.entries
   },
   integrity:{algorithm:'sha256-manifest-v1',skill_artifact_sha256:artifactSha,files},
   execution:{
     mode:'chat-native',
     qualification_state:'qualified-scoped-native',
     evidence_scope:'Native semantic behavior for the recorded 0.9 matrix case(s), plus R2 change-impact requalification where applicable.',
     case_ids:cases[skillId],
     r2_direct_retest:r2Direct.has(skillId)
   },
   security:{
     scope:'The exact R2 plugin package passed configured source/package structural and security gates in CI. This is not a separate per-skill dynamic security audit or universal safety claim.'
   },
   evidence_refs:[
     'release/candidates/cs-connect-v0.9.0-r2.json',
     'trust/evals/runs/cs-connect-v0.9.0-r2-native-requalification.json',
     'tests/fixtures/v090-native-qualification-frozen.json'
   ],
   freshness:{reviewed_on:'2026-10-05',binding:'exact-package-bytes'},
   recommendation:{
     state:'conditional',
     reason:'Part of the exact qualified R2 package with recorded native semantic route evidence; use remains task- and evidence-bound.'
   },
   known_gaps:[
     'The full 23-case matrix was not rerun after R2 fixes; R2 used change-impact requalification for the two repaired behaviors plus essential regressions.',
     'Package qualification is not a zero-hallucination or universal-safety guarantee.',
     'Container Guardian execution in a specific chat requires an actual decision record.'
   ]
 };
 await writeFile(path.join(outDir,`${skillId}.json`),JSON.stringify(passport,null,2)+'\n','utf8');
 index.skills.push({skill_id:skillId,passport:`trust/passports/v090/${skillId}.json`,skill_artifact_sha256:artifactSha});
}
await writeFile(path.join(outDir,'index.json'),JSON.stringify(index,null,2)+'\n','utf8');
console.log(`Generated ${skillIds.length} CS Connect 0.9 exact-package passports from ${source}`);
