#!/usr/bin/env node
import { readFile, writeFile, access } from 'node:fs/promises';
import { createHash } from 'node:crypto';

const readJson = async p => JSON.parse(await readFile(p,'utf8'));
const exists = async p => { try { await access(p); return true; } catch { return false; } };
const sha256 = value => createHash('sha256').update(value).digest('hex');

function parseFrontmatter(text){
  const m=text.match(/^---\n([\s\S]*?)\n---\n?/);
  if(!m) throw new Error('Missing YAML frontmatter');
  const get=k => (m[1].match(new RegExp('^'+k+':\\s*(.+)$','m'))||[])[1]?.trim() || '';
  return { name:get('name'), description:get('description'), body:text.slice(m[0].length).trim() };
}

const policy=await readJson('registry/public-capabilities-policy.json');
const legacy=await readJson('registry/capabilities-v1.json');
const execution=await readJson('trust/execution.json');
const byId=new Map((legacy.entries||[]).map(x=>[x.id,x]));

const restrictedDescriptionPatterns=[
  /medical\b/i,
  /healthcare\b/i,
  /health information/i,
  /medication/i,
  /clinician/i,
  /patient/i,
  /symptom/i,
  /diagnos/i,
  /hospital/i,
  /treatment management/i
];

const entries=[];
for(const id of policy.public_ids){
  if(policy.exclusions?.[id]) throw new Error('Public id is also excluded: '+id);

  let sourcePath='skills/'+id+'/SKILL.md';
  if(!(await exists(sourcePath))) sourcePath='skills/featured/'+id+'/SKILL.md';
  if(!(await exists(sourcePath))) throw new Error('Missing public skill source: '+id);

  const raw=await readFile(sourcePath,'utf8');
  const fm=parseFrontmatter(raw);
  if(fm.name!==id) throw new Error('Skill name mismatch for '+id+': '+fm.name);

  for(const re of restrictedDescriptionPatterns){
    if(re.test(fm.description)){
      throw new Error('Healthcare distribution gate: public description for '+id+' matches '+re);
    }
  }

  const prior=byId.get(id) || {};
  const exec=execution.skills?.[id] || {
    mode:'chat-native',
    evidence_state:'designed',
    required_capabilities:[]
  };
  const passportPath='trust/passports/'+id+'.json';
  const passport=(await exists(passportPath)) ? await readJson(passportPath) : null;

  entries.push({
    id,
    name:fm.name,
    category:prior.category || 'general',
    summary:fm.description,
    distribution_state:'public',
    execution_mode:exec.mode || 'chat-native',
    evidence_state:exec.evidence_state || 'designed',
    freshness_state:passport?.freshness?.status || prior.freshness_state || 'unknown',
    permission_profile:(exec.required_capabilities||[]).length ? 'declared-capabilities' : 'chat-native/no-external-access-by-default',
    required_capabilities:exec.required_capabilities || [],
    source_path:sourcePath.replace(/\/SKILL\.md$/,''),
    source_sha256:sha256(raw),
    source_url:'https://github.com/eusourmr/chatgpt-skills/blob/main/'+sourcePath,
    trust_passport_url:passport ? 'https://github.com/eusourmr/chatgpt-skills/blob/main/'+passportPath : null,
    playbook:fm.body,
    reviewed_for_plugin:'0.16.0-live-registry'
  });
}

for(const [id,record] of Object.entries(policy.exclusions||{})){
  if(policy.public_ids.includes(id)) throw new Error('Excluded capability leaked into public ids: '+id);
  let p='skills/'+id+'/SKILL.md';
  if(!(await exists(p))) p='skills/featured/'+id+'/SKILL.md';
  if(!(await exists(p))) throw new Error('Excluded capability source missing: '+id);
}

const registry={
  schema_version:2,
  product:'CS Navigator',
  registry_id:'cs-navigator-public-live-registry',
  plugin_line:'0.16.0',
  source_of_truth:'https://github.com/eusourmr/chatgpt-skills',
  source_ref:'main',
  delivery:'read-only-mcp',
  arbitrary_github_execution:false,
  policy_ref:'registry/public-capabilities-policy.json',
  public_entry_count:entries.length,
  excluded_entry_count:Object.keys(policy.exclusions||{}).length,
  evidence_boundary:'A registry entry is curated metadata plus a reviewed playbook, not a universal safety or efficacy guarantee. Evidence state remains version-bound.',
  update_contract:'Only policy-filtered registry artifacts merged to main are served. Repository files not present in this generated registry are not executable through the public MCP.',
  entries:entries.sort((a,b)=>a.id.localeCompare(b.id))
};

const out=JSON.stringify(registry,null,2)+'\n';
await writeFile('registry/public-capabilities-v1.json',out);
await writeFile('registry/public-capabilities-v1.json.sha256',sha256(out)+'  public-capabilities-v1.json\n');

console.log(JSON.stringify({
  public_entries:registry.public_entry_count,
  excluded_entries:registry.excluded_entry_count,
  sha256:sha256(out)
},null,2));
