#!/usr/bin/env node
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

const readJson = async (p) => JSON.parse(await readFile(p, 'utf8'));
const writeJson = async (p,v) => {
  await mkdir(path.dirname(p), {recursive:true});
  await writeFile(p, JSON.stringify(v,null,2)+'\n');
};

function frontmatter(text){
  const m=text.match(/^---\n([\s\S]*?)\n---/);
  if(!m) throw new Error('Missing frontmatter');
  return {
    name:(m[1].match(/^name:\s*(.+)$/m)||[])[1],
    description:(m[1].match(/^description:\s*(.+)$/m)||[])[1]
  };
}

const ids=['learning-mastery-coach','academic-writing-navigator'];
const pt={
  'learning-mastery-coach':'Cria um ciclo adaptativo de aprendizagem com compreensão, recuperação ativa, explicação, aplicação, correção de erros e revisão espaçada, sem confundir material gerado com domínio real.',
  'academic-writing-navigator':'Orquestra escrita acadêmica para estudantes e pesquisadores de língua portuguesa entre normas internacionais, regras institucionais, evidência, integridade, estrutura e preparação para submissão.'
};

const systemicReview={
  status:'design-reviewed',
  lenses:{
    human:{mechanism:'Builds learner/writer agency instead of replacing the person.',indicator:'The user can explain the next step and what they must still understand or verify.'},
    social:{mechanism:'Keeps institutional, journal, authorship and integrity expectations visible.',indicator:'Applicable authority and disclosure boundaries are explicit.'},
    knowledge:{mechanism:'Separates evidence, retrieval, rules, uncertainty and unsupported claims.',indicator:'Claims/rules are traceable or explicitly UNKNOWN.'},
    resources:{mechanism:'Targets effort at errors, evidence gaps and applicable rules rather than repeating generic work.',indicator:'Less low-value rereading/reformatting and fewer avoidable correction loops.'}
  },
  harm_check:'Do not improve academic output by fabricating research, hiding prohibited AI use, inventing rules, or replacing independent learning.',
  reinforcing_loop:'Each use leaves a reusable error ledger, study plan, evidence map, rule profile or revision record.',
  balancing_safeguard:'Retrieval-before-reveal, applicable-profile resolution, explicit UNKNOWN states and integrity checks.',
  regenerative_seed:'A learner/researcher-owned record that improves the next study or writing cycle.',
  resource_ledger:{tracked:['attention','time','data','compute'],baseline_comparison:'Compare repeated reading/reformatting/revision with targeted retrieval, evidence and profile checks.',restoration:'Correct misconceptions, stale rules and unsupported claims in the reusable artifact.'},
  plain_language:{summary_first:true,technical_layer:true,comprehension_check:'The user should understand why a correction or study step exists, not merely receive the output.'}
};

const catalog=await readJson('catalog/skills.json');
const byId=new Map((catalog.entries||[]).map(x=>[x.id,x]));
for(const id of ids){
  const fm=frontmatter(await readFile('skills/'+id+'/SKILL.md','utf8'));
  byId.set(id,{
    id,
    name:fm.name,
    kind:'skill',
    publisher:'eusourmr',
    category:'regenerative-core',
    summary_en:fm.description,
    summary_pt_br:pt[id],
    url:'https://github.com/eusourmr/chatgpt-skills/tree/main/skills/'+id,
    provenance:'regenerative-core',
    license:'MIT',
    surfaces:['chat','codex'],
    checked_on:'2026-10-11',
    systemic_review:systemicReview
  });
}
catalog.entries=[...byId.values()].sort((a,b)=>a.id.localeCompare(b.id));
await writeJson('catalog/skills.json',catalog);

const legacy=await readJson('catalog.json');
const legacyById=new Map((legacy.entries||[]).map(x=>[x.id,x]));
for(const id of ids){
  const fm=frontmatter(await readFile('skills/'+id+'/SKILL.md','utf8'));
  legacyById.set(id,{
    id,
    name:fm.name,
    category:'First-Party CS',
    status:'draft',
    rating:0,
    rating_state:'unrated',
    reviews:0,
    last_verified:'2026-10-11',
    compatibility:['ChatGPT','Codex'],
    publisher:'eusourmr',
    source:'https://github.com/eusourmr/chatgpt-skills/tree/main/skills/'+id,
    path:'skills/'+id
  });
}
legacy.entries=[...legacyById.values()].sort((a,b)=>a.id.localeCompare(b.id));
legacy.review_stats={...(legacy.review_stats||{}),accepted:legacy.entries.length,last_review_cycle:'2026-10-11'};
await writeJson('catalog.json',legacy);

const execution=await readJson('trust/execution.json');
for(const id of ids){
  execution.skills[id]={
    mode:'chat-native',
    evidence_state:'designed',
    minimum_setup:'Registry-only CS Navigator capability. No mandatory external account, MCP write access, API key, or local runtime is required for the base workflow.',
    required_capabilities:[],
    evidence:'Designed in CS Navigator 0.17.0. Source review and static validation do not constitute native semantic task evidence.'
  };
}
await writeJson('trust/execution.json',execution);

const trust=await readJson('trust/skills.json');
for(const id of ids){
  const fm=frontmatter(await readFile('skills/'+id+'/SKILL.md','utf8'));
  trust.skills[id]={
    name:fm.name,
    summary:fm.description,
    permissions:{
      local_files:'none required by the base chat-native workflow',
      network:'none required by the base workflow; current-source research may use host-provided web/research tools when actually available',
      secrets:'none required',
      process_execution:'none required',
      destructive_actions:'none required'
    },
    usefulness:{
      state:'designed',
      evidence:'Human-curated 0.17 design with explicit activation, integrity and evidence boundaries. Native semantic task qualification is pending.'
    },
    known_gaps:[
      'No dedicated 0.17 native semantic qualification run yet.',
      id==='academic-writing-navigator' ? 'Exact academic rules remain source/version/institution dependent and must not be invented.' : 'Learning outcomes require observed retrieval/application; generated study material alone is not mastery evidence.'
    ]
  };
}
await writeJson('trust/skills.json',trust);

const registry=await readJson('registry/public-capabilities-v1.json');
const regById=new Map((registry.entries||[]).map(x=>[x.id,x]));
for(const id of ids){
  const fm=frontmatter(await readFile('skills/'+id+'/SKILL.md','utf8'));
  regById.set(id,{
    id,
    name:fm.name,
    category:id==='learning-mastery-coach'?'learning':'academic-writing',
    summary:fm.description,
    evidence_state:'designed',
    qualification_state:'designed',
    freshness_state:'current',
    permission_profile:'chat-native/no-external-access-by-default',
    source_url:'https://github.com/eusourmr/chatgpt-skills/tree/main/skills/'+id,
    distribution_state:'available',
    known_gaps:trust.skills[id].known_gaps
  });
}
registry.entries=[...regById.values()].sort((a,b)=>a.id.localeCompare(b.id));
registry.source_commit='development';
registry.published_at='2026-10-11';
await writeJson('registry/public-capabilities-v1.json',registry);

console.log(JSON.stringify({
  version:'0.17.0',
  added:ids,
  catalog_entries:catalog.entries.length,
  legacy_skills:legacy.entries.length,
  registry_entries:registry.entries.length,
  evidence_state:'designed'
},null,2));
