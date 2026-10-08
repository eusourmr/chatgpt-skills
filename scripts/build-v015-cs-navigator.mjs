#!/usr/bin/env node
import { readFile, writeFile, mkdir, cp } from 'node:fs/promises';
import path from 'node:path';

const readJson = async (p) => JSON.parse(await readFile(p, 'utf8'));
const writeJson = async (p,v) => {
  await mkdir(path.dirname(p), {recursive:true});
  await writeFile(p, JSON.stringify(v,null,2)+'\n');
};

const manifest = await readJson('release/v015-human-capability.json');
const version = manifest.release_line;
const newSkills = manifest.new_skills;

const categories = {
  'personal-curator':'personalization','simple-mode':'personalization','capability-preferences':'personalization',
  'everyday-problem-solver':'everyday-life','life-admin-organizer':'everyday-life','overwhelm-to-next-action':'everyday-life',
  'personal-decision-record':'decision-support','decision-stop-rule':'decision-support','purchase-decision-helper':'everyday-life',
  'subscription-cleanup':'everyday-life','household-finance-planner':'everyday-life','home-maintenance-planner':'home',
  'repair-decision-helper':'home','consumer-rights-navigator':'citizen-brazil','bureaucracy-br-navigator':'citizen-brazil',
  'public-service-br-navigator':'citizen-brazil','family-digital-safety':'family-care','school-family-organizer':'family-care',
  'caregiver-coordinator':'family-care','medical-appointment-prep':'family-care','difficult-conversation-prep':'communication',
  'scam-checker':'digital-safety','digital-helper-simple':'digital-literacy','travel-readiness':'life-journey',
  'moving-life-journey':'life-journey','major-life-change-planner':'life-journey','human-handoff-preparer':'human-handoff',
  'proof-of-progress':'continuity','life-state-map':'continuity','information-expiry-guard':'evidence','real-world-evidence-kit':'evidence'
};

const pt = {
  'personal-curator':'Faz curadoria silenciosa de capacidades após pedido explícito do usuário, mantendo o ChatGPT nativo como primeira opção e sem prometer persistência entre conversas.',
  'simple-mode':'Adapta a ajuda para linguagem simples, passos curtos e uma ação por vez sem esconder incertezas ou alertas materiais.',
  'capability-preferences':'Define como o CS Navigator deve fazer curadoria: automático ou perguntar, nível simples/padrão/especialista, confirmação de conexões e visibilidade das skills.',
  'everyday-problem-solver':'Transforma um problema cotidiano em fatos, incógnitas, ações imediatas, dependências, evidências, escalonamento e critério de resolução.',
  'life-admin-organizer':'Organiza documentos, prazos, renovações, contas, consultas, solicitações pendentes e próximas ações em um painel administrável.',
  'overwhelm-to-next-action':'Reduz muitas obrigações a uma próxima ação, uma pequena lista para hoje, itens posteriores e dependências explícitas.',
  'personal-decision-record':'Preserva por que uma decisão pessoal foi tomada: objetivo, critérios, evidências, trocas, alternativas e gatilho de revisão.',
  'decision-stop-rule':'Define quando mais comparação ou pesquisa dificilmente mudará materialmente uma decisão, sem decidir pelo usuário.',
  'purchase-decision-helper':'Compara compras importantes por necessidade, custo total, manutenção, confiabilidade, dependência, alternativas e custo de saída.',
  'subscription-cleanup':'Identifica serviços recorrentes, duplicidades, assinaturas pouco usadas, renovações e um plano seguro de cancelamento/revisão.',
  'household-finance-planner':'Organiza fluxo de caixa doméstico, contas recorrentes, prioridades, reserva e cenários sem atuar como consultor de investimentos.',
  'home-maintenance-planner':'Cria um plano preventivo de manutenção da casa com prioridades, intervalos, evidências e escalonamento de segurança.',
  'repair-decision-helper':'Ajuda a decidir entre inspecionar, reparar, substituir ou buscar profissional usando segurança, custo, recorrência, garantia e evidências.',
  'consumer-rights-navigator':'Estrutura um problema de consumo, evidências, solução desejada, caminho de reclamação e verificação de regra atual sem inventar direitos.',
  'bureaucracy-br-navigator':'Navega procedimentos administrativos brasileiros identificando autoridade, escopo territorial, documentos, canal oficial e atualidade.',
  'public-service-br-navigator':'Encontra o caminho correto de serviço público no Brasil entre esferas federal, estadual, municipal, distrital e regulatória.',
  'family-digital-safety':'Ajuda famílias com segurança online, privacidade, golpes, contas e limites adequados à idade sem vigilância oculta.',
  'school-family-organizer':'Organiza calendário escolar, documentos, reuniões, tarefas, comunicações e pendências entre família e escola.',
  'caregiver-coordinator':'Coordena tarefas não clínicas de cuidado, contatos, consultas, documentos, responsabilidades, passagens de informação e emergência.',
  'medical-appointment-prep':'Prepara um resumo conciso para consulta a partir de informações de saúde fornecidas pelo usuário, sem diagnosticar ou alterar tratamento.',
  'difficult-conversation-prep':'Prepara uma conversa difícil usando fatos, necessidades, limites, pedidos específicos e linguagem não manipulativa.',
  'scam-checker':'Avalia mensagens, ligações, links, cobranças e pedidos de pagamento suspeitos usando sinais observáveis e verificação segura.',
  'digital-helper-simple':'Dá ajuda em linguagem simples e passo a passo para tarefas comuns em celular, computador, aplicativos, contas e internet.',
  'travel-readiness':'Prepara um checklist prático de viagem cobrindo documentos, horários, transporte, dinheiro, conectividade, saúde e requisitos atuais de entrada.',
  'moving-life-journey':'Coordena uma mudança envolvendo contrato, serviços, endereço, embalagem, inventário, evidências de entrega e tarefas pós-mudança.',
  'major-life-change-planner':'Planeja grandes transições entre domínios administrativos, financeiros, logísticos, familiares, profissionais e de cuidado.',
  'human-handoff-preparer':'Prepara uma passagem de contexto concisa e baseada em evidências quando é necessário um profissional humano.',
  'proof-of-progress':'Separa conversa de progresso real usando resolvido, ativo, pendente, bloqueado, aguardando, evidência, próxima ação e definição de concluído.',
  'life-state-map':'Mantém um mapa de estado visível ao usuário para uma situação real, com dependências e condições de transição.',
  'information-expiry-guard':'Marca informações sensíveis ao tempo com data de verificação, gatilhos de desatualização e condições de nova checagem.',
  'real-world-evidence-kit':'Ajuda usuários a preservar evidências verdadeiras para disputas, serviços, seguros, compras, imóveis, escola, trabalho ou administração pública.'
};

function frontmatter(text){
  const m=text.match(/^---\n([\s\S]*?)\n---/);
  if(!m) throw new Error('Missing frontmatter');
  const name=(m[1].match(/^name:\s*(.+)$/m)||[])[1];
  const description=(m[1].match(/^description:\s*(.+)$/m)||[])[1];
  return {name,description};
}

// Update catalog and create registry.
const catalog = await readJson('catalog/skills.json');
const byId = new Map((catalog.entries||[]).map(x=>[x.id,x]));
const registryEntries = [];
const systemicReview = {
  status:'design-reviewed',
  lenses:{
    human:{mechanism:'Reduces avoidable cognitive or operational friction while preserving user agency and intent.',indicator:'User can identify the next action and material uncertainty without unnecessary complexity.'},
    social:{mechanism:'Makes dependencies, consent, roles and escalation visible to affected people.',indicator:'Material handoffs and responsibilities are explicit rather than assumed.'},
    knowledge:{mechanism:'Separates evidence, unknowns and decisions into reusable artifacts.',indicator:'Key facts, unknowns and decisions remain traceable and reusable.'},
    resources:{mechanism:'Uses the smallest useful workflow and avoids repeated low-value work.',indicator:'Fewer redundant iterations, tool calls or avoidable corrective cycles.'}
  },
  harm_check:'Do not gain convenience by hiding uncertainty, weakening consent, bypassing safeguards, or exporting risk to another person.',
  reinforcing_loop:'Each use leaves a reusable record, checklist, state map, evidence packet or learned pattern.',
  balancing_safeguard:'Native-first routing, explicit unknowns, least privilege and human escalation prevent automation from overriding agency or evidence.',
  regenerative_seed:'A user-owned reusable artifact that can be updated after real-world feedback.',
  resource_ledger:{tracked:['attention','time','data','money','compute'],baseline_comparison:'Compare avoidable steps, repeated searching and corrective work with the prior process.',restoration:'Retire stale assumptions and return verified corrections to the reusable artifact.'},
  plain_language:{summary_first:true,technical_layer:true,comprehension_check:'The user should be able to state what happens next and what remains uncertain.'}
};

const featuredSync=['cs-navigator','openai-agents-sdk-builder','realtime-api-integration','chatgpt-apps-deployer','codex-pr-reviewer'];
for(const id of featuredSync){
  const text=await readFile('skills/featured/'+id+'/SKILL.md','utf8');
  const fm=frontmatter(text);
  byId.set(id,{
    id,name:fm.name,kind:'skill',publisher:'eusourmr',category:'regenerative-core',
    summary_en:fm.description,summary_pt_br:fm.description,
    url:'https://github.com/eusourmr/chatgpt-skills/tree/main/skills/featured/'+id,
    provenance:'regenerative-core',license:'MIT',surfaces:['chat','codex'],checked_on:'2026-10-08',
    systemic_review:systemicReview
  });
}

for(const id of newSkills){
  const text=await readFile('skills/'+id+'/SKILL.md','utf8');
  const fm=frontmatter(text);
  const entry={
    id,name:fm.name,kind:'skill',publisher:'eusourmr',category:'regenerative-core',
    summary_en:fm.description,summary_pt_br:pt[id]||fm.description,
    url:'https://github.com/eusourmr/chatgpt-skills/tree/main/skills/'+id,
    provenance:'regenerative-core',license:'MIT',surfaces:['chat','codex'],checked_on:'2026-10-08',
    systemic_review:systemicReview
  };
  byId.set(id,entry);
  registryEntries.push({
    id,name:fm.name,category:categories[id]||'everyday-life',summary:fm.description,
    execution_mode:'chat-native',evidence_state:'designed',
    qualification_state:'pending-native-0.15.0-r1',freshness_state:'current',
    permission_profile:'chat-native/no-external-access-by-default',
    known_gaps:['No individual native semantic qualification yet for 0.15.0.'],
    source_path:'skills/'+id,
    reviewed_for_plugin:'0.15.0'
  });
}
catalog.entries=[...byId.values()].sort((a,b)=>a.id.localeCompare(b.id));
await writeJson('catalog/skills.json',catalog);

const registry={
  schema_version:1,generated_for_plugin:'0.15.0',product:'CS Navigator',
  runtime_state:'bundled-registry-foundation',
  live_registry_mcp:'planned-not-active',
  evidence_boundary:'Registry presence is not execution evidence. New 0.15 skills remain designed until native semantic qualification.',
  routing_levels:['native','skill','life-journey','connected-action'],
  entries:registryEntries.sort((a,b)=>a.id.localeCompare(b.id))
};
await writeJson('registry/capabilities-v1.json',registry);

// Synchronize the legacy health catalog used by PROGRESS.md.
const legacyCatalog = await readJson('catalog.json');
const legacyById = new Map((legacyCatalog.entries||[]).map(x=>[x.id,x]));
for(const id of newSkills){
  const text=await readFile('skills/'+id+'/SKILL.md','utf8');
  const fm=frontmatter(text);
  legacyById.set(id,{
    id,
    name:fm.name,
    category:'First-Party CS',
    status:'draft',
    rating:0,
    rating_state:'unrated',
    reviews:0,
    last_verified:'2026-10-08',
    compatibility:['ChatGPT','Codex'],
    publisher:'eusourmr',
    source:'https://github.com/eusourmr/chatgpt-skills/tree/main/skills/'+id,
    path:'skills/'+id
  });
}
legacyCatalog.entries=[...legacyById.values()].sort((a,b)=>a.id.localeCompare(b.id));
const legacyStatus=legacyCatalog.entries.reduce((acc,e)=>{acc[e.status]=(acc[e.status]||0)+1;return acc;},{});
legacyCatalog.review_stats={
  ...(legacyCatalog.review_stats||{}),
  accepted:legacyCatalog.entries.length,
  rejected_recorded:legacyCatalog.review_stats?.rejected_recorded||0,
  last_review_cycle:'2026-10-08'
};
await writeJson('catalog.json',legacyCatalog);

// Update plugin identity and interface.
const pluginPath='plugins/cs-navigator/plugin.json';
const plugin=await readJson(pluginPath);
plugin.version='0.15.0';
plugin.description='CS Navigator curates the smallest useful path for everyday life: native ChatGPT, a focused skill, a multi-step Life Journey, or a connected action when needed.';
const ui=plugin.extensions['com.openai'].interface;
ui.displayName='CS Navigator';
ui.shortDescription='Everyday capability routing';
ui.longDescription='CS Navigator 0.15.0 helps people use specialized ChatGPT workflows without learning skill names. It keeps ordinary tasks native when sufficient, can select focused workflows for everyday administration, family, home, Brazilian public services, travel and digital safety, and can organize multi-step Life Journeys. Optional curator and Simple Mode preferences apply only where the host supports them; connected actions still follow normal permission and confirmation boundaries.';
ui.defaultPrompt=[
  'Use CS Navigator as my curator in this conversation.',
  'Help me with this in the simplest useful way.',
  'Show me what is resolved, pending, blocked, and next.'
];
await writeJson(pluginPath,plugin);

const codexPath='plugins/cs-navigator/.codex-plugin/plugin.json';
try{
  const codex=await readJson(codexPath);
  codex.version='0.15.0';
  codex.description=plugin.description;
  codex.interface={...codex.interface,...ui};
  await writeJson(codexPath,codex);
}catch{}

// Update Navigator and copy all selected skills into plugin.
await cp('skills/featured/cs-navigator','plugins/cs-navigator/skills/cs-navigator',{recursive:true,force:true});
const pack=await readJson('plugins/cs-navigator/capability-pack.json');
const oldIds=(pack.included_skills||[]).map(x=>x.id);
const allIds=[...new Set([...oldIds,...newSkills])];
for(const id of allIds){
  await cp('skills/'+id,'plugins/cs-navigator/skills/'+id,{recursive:true,force:true});
}
pack.pack_version='0.15.0';
pack.product_name='CS Navigator';
pack.policy='Install once, talk normally, stay native when sufficient, and use the lowest-complexity capability path that materially helps. Bundling never upgrades evidence.';
pack.routing_levels=['native','skill','life-journey','connected-action'];
pack.personal_capability_layer={
  curator:'personal-curator',simple_mode:'simple-mode',preferences:'capability-preferences',
  cross_chat_persistence:'host-dependent-not-assumed'
};
pack.life_contracts=['Life Resolution Contract','Human Escalation Contract','Proof of Progress'];
pack.included_skills=allIds.map(id=>({
  id,source:'skills/'+id,mode:'chat-native',
  evidence_state:'designed',
  qualification_state:newSkills.includes(id)?'pending-native-0.15.0-r1':'existing-design-evidence-preserved'
}));
pack.container_guardian.release_line='0.15.0';
pack.container_guardian.evidence_boundary='Deterministic Guardian evidence remains module-scoped. No chat-level Guardian execution may be claimed without an actual decision record.';
await writeJson('plugins/cs-navigator/capability-pack.json',pack);

// Normalize the legacy 0.9 first-party capability index without inventing individual test evidence.
for(const p of ['plugins/cs-navigator/skills/cs-navigator/references/first-party-capabilities.json','skills/featured/cs-navigator/references/first-party-capabilities.json']){
  try{
    const idx=await readJson(p);
    idx.generated_for_plugin='0.15.0';
    idx.policy='Existing first-party workflows remain independently evidenced. Prior release-level qualification does not convert individual designed workflows into tested skills.';
    for(const e of (idx.entries||[])){
      if(e.evidence_state==='designed'){
        e.qualification_state='designed-existing-no-individual-native-test';
        e.recommendation_state='evidence-bounded';
        e.trust_boundary='Release-level routing or package qualification does not equal individual workflow efficacy testing.';
      }
    }
    await writeJson(p,idx);
  }catch{}
}

// Copy registry into Navigator references.
await writeJson('plugins/cs-navigator/skills/cs-navigator/references/human-capability-registry.json',registry);
await writeJson('skills/featured/cs-navigator/references/human-capability-registry.json',registry);

// Keep snapshot identity current without pretending it contains individual qualification for new skills.
for(const p of ['plugins/cs-navigator/skills/cs-navigator/references/catalog-snapshot.json','skills/featured/cs-navigator/references/catalog-snapshot.json']){
  const s=await readJson(p);
  s.generated_for_plugin='0.15.0';
  s.container_guardian={...(s.container_guardian||{}),release_line:'0.15.0'};
  await writeJson(p,s);
}

// Submission metadata.
let sub={};
try{sub=await readJson('submission/cs-navigator-0.9.4.json');}catch{}
sub.plugin={...(sub.plugin||{}),version:'0.15.0'};
sub.listing={
  ...(sub.listing||{}),
  display_name:'CS Navigator',
  short_description:'Everyday capability routing',
  long_description:ui.longDescription,
  starter_prompts:ui.defaultPrompt
};
let candidate={};
try{candidate=await readJson('release/candidates/cs-navigator-v0.15.0-r3.json');}catch{}
const nativeQualified=candidate.qualification_state==='native-qualified' && candidate.native_qualification?.result==='PASS';

sub.architecture={
  ...(sub.architecture||{}),
  routing_levels:manifest.architecture.routing_levels,
  personal_capability_layer:{curator:'personal-curator',simple_mode:'simple-mode',preferences:'capability-preferences'},
  capability_pack:{
    router:'cs-navigator',
    included_skills:allIds,
    handoff:'Curator intent may route silently in the current conversation; ordinary tasks remain native when sufficient and connected actions retain normal permission/confirmation boundaries.'
  },
  human_capability_015:{
    new_skill_count:newSkills.length,
    evidence_state:'designed',
    native_semantic_qualification:nativeQualified?'PASS':'pending',
    contracts:manifest.contracts
  },
  registry:{state:'bundled-foundation',live_mcp:'planned-not-active'}
};
delete sub.architecture.first_party_090;
sub.trust_chain={
  state:nativeQualified?'PASS':'static-PASS-native-behavior-pending',
  reviewed_source_revision:'71639a4a72f4724a92db81534808446ec14b950b',
  refreshed_on:'2026-10-08',
  behavior_evidence:nativeQualified?'tested':'designed'
};
sub.release_notes=nativeQualified
  ? '0.15.0 adds the Everyday Life & Human Capability layer, Personal Curator and Simple Mode behavior, Life Journeys, human handoff, progress/evidence contracts, and a registry-ready capability data contract. The exact private candidate passed the recorded 12/12 native semantic Navigator matrix; the 31 new workflows remain individually designed unless separately tested.'
  : '0.15.0 adds the Everyday Life & Human Capability layer, optional Personal Curator and Simple Mode behavior, Life Journeys, human handoff, progress/evidence contracts, and a registry-ready capability data contract. All new skills start as designed and require native semantic qualification before tested/qualified claims.';
sub.submission_state=nativeQualified?'private-native-qualified-public-update-pending':'development-candidate-native-qualification-pending';
sub.native_qualification=nativeQualified
  ? {
      required:true,
      status:'PASS',
      result:'PASS',
      pass:candidate.native_qualification.pass,
      fail:candidate.native_qualification.fail,
      total:candidate.native_qualification.total,
      executed_on:candidate.native_qualification.executed_on,
      evidence_ref:candidate.native_qualification.evidence_ref,
      note:'Qualification applies to the recorded Navigator behavior. The 31 new workflows remain individually designed unless separately tested.'
    }
  : {
      required:true,status:'pending-0.15.0-r1',
      note:'New curator behavior and new 0.15 skills require native semantic qualification. Static build success is not sufficient.'
    };
await writeJson('submission/cs-navigator-0.15.0.json',sub);

console.log(JSON.stringify({version,new_skills:newSkills.length,total_plugin_skills:allIds.length,catalog_entries:catalog.entries.length,registry_entries:registry.entries.length},null,2));
