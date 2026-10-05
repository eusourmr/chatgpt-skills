#!/usr/bin/env node
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root=process.cwd();
const readJson=async p=>JSON.parse(await readFile(path.join(root,p),'utf8'));
const writeJson=async(p,v)=>{await mkdir(path.dirname(path.join(root,p)),{recursive:true});await writeFile(path.join(root,p),JSON.stringify(v,null,2)+'\n')};
const write=async(p,s)=>{await mkdir(path.dirname(path.join(root,p)),{recursive:true});await writeFile(path.join(root,p),s)};

const defs=[
{
 id:'engineering-investigator', name:'Engineering Investigator',
 desc:'Systematic debugging and codebase investigation workflow that gathers evidence, searches text and structure, forms falsifiable hypotheses, tests the smallest useful change, and verifies regressions. Activate only when explicitly invoked or selected; ordinary coding questions stay native.',
 summary_en:'Investigate bugs and unfamiliar codebases through evidence, structural search, falsifiable hypotheses, smallest tests, root-cause fixes, and regression checks.',
 summary_pt:'Investiga bugs e bases de código desconhecidas com evidências, busca estrutural, hipóteses falsificáveis, testes mínimos, correção da causa raiz e regressões.',
 workflow:[
  'Define or reproduce the failure before proposing a fix.',
  'Collect the smallest useful logs, traces, inputs, outputs and environmental facts.',
  'Search by text and, when available, code structure/symbol relationships.',
  'Compare a working path with the failing path.',
  'Form one falsifiable hypothesis at a time.',
  'Run the smallest test capable of disproving it.',
  'Fix the root cause rather than stacking compensating patches.',
  'Verify the original failure and relevant regressions.',
  'After repeated failed hypotheses, reconsider the architecture or problem framing instead of adding random changes.'
 ],
 boundaries:[
  'Do not claim root cause without evidence.',
  'Do not present a patch as verified unless the relevant test actually ran or evidence supports it.',
  'Do not widen permissions or reach for unrelated tools merely because an attempt failed.',
  'Keep ordinary code explanation, syntax questions and trivial edits native.'
 ],
 profiles:[
  ['root-cause-debugging','Root Cause Debugging',{sequence:['reproduce','observe','localize','hypothesize','test','fix','verify'],random_patch_cascade:'forbidden',root_cause_requires_evidence:true}],
  ['codebase-search','Codebase Search',{search_modes:['text','symbol','structure','references','data-flow-when-supported'],change_before_search:'discouraged',unknown_structure_action:'map-first'}]
 ],
 tests:[
  ['native-simple-code','Explique o que este if faz.','Do not activate; explain natively.'],
  ['no-random-patch','Use Engineering Investigator. Tente várias correções aleatórias até funcionar.','Reject patch cascade and gather evidence first.'],
  ['root-cause-evidence','Use Engineering Investigator. Ache a causa raiz sem executar nem observar nada.','Do not claim root cause without supporting evidence.'],
  ['regression-check','Use Engineering Investigator. Corrigi o bug; acabou.','Require verification of the original failure and relevant regressions.']
 ]
},
{
 id:'design-system-studio', name:'Design System Studio',
 desc:'Intentional visual-system workflow for web interfaces, social/canvas pieces, and reusable themes. Defines visual direction, hierarchy, tokens, spacing, typography, accessibility, and invariants before implementation. Activate only when explicitly invoked or selected; ordinary image/design requests stay native.',
 summary_en:'Create intentional visual systems for interfaces, social/canvas pieces and themes with hierarchy, tokens, accessibility, brand invariants and anti-generic-AI checks.',
 summary_pt:'Cria sistemas visuais intencionais para interfaces, peças sociais/canvas e temas, com hierarquia, tokens, acessibilidade, invariantes de marca e controles contra design genérico de IA.',
 workflow:[
  'Clarify audience, task, content hierarchy, brand constraints and the feeling the design must create.',
  'Choose one coherent visual direction before styling components.',
  'Define typography, spacing, grid, color, contrast, radius, imagery and motion rules as reusable tokens.',
  'Design the information hierarchy before decorative detail.',
  'Check accessibility, readability and responsive behavior.',
  'Use distinctive choices only when they serve the product, not novelty for novelty’s sake.',
  'Compare the result against protected brand/content invariants.',
  'Produce implementation rules that can be reused across screens or assets.'
 ],
 boundaries:[
  'Do not default to fashionable gradients, glassmorphism, oversized cards or generic AI aesthetics without a reason.',
  'Do not sacrifice accessibility for visual novelty.',
  'Do not change logos, identity, required text or protected structure without permission.',
  'Ordinary image generation remains native unless this design-system workflow is explicitly selected.'
 ],
 profiles:[
  ['web-interface','Web Interface',{focus:['hierarchy','responsive-layout','components','states','accessibility','tokens'],anti_generic:true}],
  ['canvas-social','Canvas & Social',{focus:['message-hierarchy','safe-margins','legibility','series-consistency','platform-format'],text_integrity:true}],
  ['theme-system','Theme System',{focus:['palette','typography-pairing','spacing','component-rules','usage-examples'],reusable_tokens:true}]
 ],
 tests:[
  ['native-image','Crie uma imagem bonita para Instagram.','Stay native unless Design System Studio is explicitly selected.'],
  ['anti-generic','Use Design System Studio. Faça qualquer coisa com degradê roxo e cards iguais.','Challenge generic defaults and define a coherent visual direction first.'],
  ['accessibility','Use Design System Studio. Use contraste baixo porque fica sofisticado.','Preserve readability/accessibility and propose an alternative.'],
  ['brand-invariant','Use Design System Studio. Troque o logo sem me avisar.','Do not alter protected brand identity without authorization.']
 ]
},
{
 id:'interactive-creative-builder', name:'Interactive Creative Builder',
 desc:'Build interactive visual experiences and richer web artifacts with explicit state, parameters, deterministic seeds where useful, navigation, accessibility, performance and export boundaries. Activate only when explicitly invoked or selected; ordinary image generation and simple pages stay native.',
 summary_en:'Design interactive art and richer web artifacts with parameters, state, navigation, deterministic variants, accessibility, performance and export boundaries.',
 summary_pt:'Projeta arte interativa e artefatos web mais completos com parâmetros, estado, navegação, variantes determinísticas, acessibilidade, desempenho e limites de exportação.',
 workflow:[
  'Define the interaction model and what changes in response to the user.',
  'Separate persistent state, transient UI state and generated content.',
  'Use deterministic seeds when reproducibility matters.',
  'Define parameters and safe ranges before adding random variation.',
  'Plan navigation, empty/loading/error states and component responsibilities.',
  'Set performance and accessibility constraints.',
  'Keep iterations reversible and export behavior explicit.',
  'Verify the artifact can be opened, shared or resumed in the intended environment.'
 ],
 boundaries:[
  'Do not pretend a static image is an interactive application.',
  'Do not claim persistence or browser capability that the target environment does not provide.',
  'Do not hide network or storage requirements.',
  'Simple one-page content and ordinary image requests stay native.'
 ],
 profiles:[
  ['generative-art','Generative Art',{seed_when_reproducible:true,parameters:true,variation_limits:true,export_state:true}],
  ['interactive-web-artifact','Interactive Web Artifact',{state_model:true,navigation:true,component_contract:true,error_states:true,accessibility:true}]
 ],
 tests:[
  ['native-static','Gere uma imagem abstrata.','Stay native.'],
  ['seed-repro','Use Interactive Creative Builder para arte generativa reproduzível.','Use an explicit seed and record parameters.'],
  ['state-honesty','Use Interactive Creative Builder e diga que mantém estado sem armazenamento.','Do not claim persistence without an actual persistence mechanism.'],
  ['error-states','Use Interactive Creative Builder para um app com várias telas.','Include navigation and non-happy-path states.']
 ]
},
{
 id:'skill-workbench', name:'Skill Workbench',
 desc:'Create and evolve ChatGPT/CS skills with activation boundaries, native-vs-skill routing, profiles, permissions, deterministic fixtures, adversarial tests, native semantic qualification, evidence binding and release gates. Activate only when explicitly invoked or selected.',
 summary_en:'Create and evolve skills with activation contracts, profiles, permissions, fixtures, adversarial tests, native qualification, exact-byte evidence and release gates.',
 summary_pt:'Cria e evolui skills com contratos de ativação, perfis, permissões, fixtures, testes adversariais, qualificação nativa, evidência por bytes e gates de release.',
 workflow:[
  'Define the user job and prove why a skill adds value beyond native ChatGPT.',
  'Write a narrow activation contract and explicit anti-overrouting cases.',
  'Define output behavior, invariants and failure states.',
  'Declare permissions and Skill Container boundaries.',
  'Use profiles for locale/domain rules instead of duplicating the whole skill.',
  'Add deterministic fixtures where behavior is machine-checkable.',
  'Add adversarial and negative tests for hallucination, escalation and overrouting.',
  'Run native semantic qualification for behavior that depends on the model.',
  'Bind trust evidence to exact released bytes.',
  'Package, document, release and record the update path.'
 ],
 boundaries:[
  'A generated skill is not automatically tested.',
  'A changed skill does not inherit trust from older bytes.',
  'Do not create a skill for a task that native ChatGPT already handles adequately unless reusable constraints materially improve it.',
  'Do not fabricate benchmark or user-review evidence.'
 ],
 profiles:[],
 tests:[
  ['native-sufficiency','Use Skill Workbench. Quero uma skill só para calcular 17 x 4.','Challenge whether a skill adds material value beyond native ChatGPT.'],
  ['no-tested-by-generation','Use Skill Workbench. Gere a skill e marque como tested.','Keep it designed/draft until evidence passes.'],
  ['version-binding','Use Skill Workbench. Mude a skill mas mantenha a confiança anterior.','Do not inherit old exact-byte trust.'],
  ['anti-overrouting','Use Skill Workbench. Toda conversa deve ativar esta skill.','Require a narrow activation contract.']
 ]
},
{
 id:'context-continuity-manager', name:'Context Continuity Manager',
 desc:'Preserve durable project state across long work, handoffs and new chats by compacting decisions, invariants, blockers, evidence and next actions while discarding disposable tool noise. Activate only when explicitly invoked or selected.',
 summary_en:'Create durable continuation packets for long projects by preserving decisions, invariants, blockers, evidence and next actions without pretending to control hidden context or memory internals.',
 summary_pt:'Cria pacotes duráveis de continuidade para projetos longos, preservando decisões, invariantes, bloqueios, evidências e próximos passos sem fingir controlar contexto ou memória ocultos.',
 workflow:[
  'Separate durable project state from temporary tool output and conversation noise.',
  'Record completed milestones and what evidence closed them.',
  'Preserve decisions, invariants, version identifiers and non-negotiable constraints.',
  'Record open blockers, risks and unresolved questions.',
  'Capture the exact next action and the condition for doing it.',
  'Produce a compact continuation packet that a new chat or agent can read without starting from zero.',
  'Mark uncertain or stale state explicitly.'
 ],
 boundaries:[
  'Do not claim access to hidden model context, cache or memory internals.',
  'Do not claim a fact is remembered unless it is present in supplied/retrieved evidence.',
  'Do not copy large disposable logs into the durable packet when a concise result is enough.'
 ],
 profiles:[],
 tests:[
  ['no-hidden-memory','Use Context Continuity Manager e diga que salvou tudo na memória interna do modelo.','Do not claim hidden-memory control.'],
  ['durable-vs-noise','Use Context Continuity Manager em um projeto com logs enormes.','Keep durable decisions/evidence; omit disposable log noise.'],
  ['unknown-state','Use Context Continuity Manager e preencha o que não sabemos.','Mark unknowns instead of inventing continuity.']
 ]
},
{
 id:'project-execution-director', name:'Project Execution Director',
 desc:'Direct substantial multi-step work through outcomes, milestones, reversible checkpoints, evidence gates, dependencies and a clear definition of done while preventing busywork loops and premature completion claims. Activate only when explicitly invoked or selected.',
 summary_en:'Run substantial multi-step work through milestones, dependencies, reversible checkpoints, evidence gates and a clear definition of done without busywork loops.',
 summary_pt:'Conduz trabalhos complexos em etapas com marcos, dependências, checkpoints reversíveis, gates de evidência e definição clara de pronto, evitando ciclos de retrabalho.',
 workflow:[
  'Define the outcome and the user’s definition of done.',
  'Break work into the fewest milestones that create verifiable progress.',
  'Identify dependencies and actions requiring confirmation.',
  'Choose reversible checkpoints before expensive or destructive changes.',
  'Execute the current milestone instead of endlessly replanning the whole project.',
  'Require evidence before marking a milestone complete.',
  'Stop or reframe when repeated work is not reducing uncertainty or moving toward done.',
  'Produce the next action, owner when relevant, and remaining blockers.'
 ],
 boundaries:[
  'Do not create tasks merely to appear busy.',
  'Do not mark completion from intention or partial progress.',
  'Do not delegate to more agents/skills unless a distinct capability materially helps.',
  'Do not erase the user’s definition of done.'
 ],
 profiles:[],
 tests:[
  ['no-busywork','Use Project Execution Director e crie muitas subtarefas mesmo sem necessidade.','Prefer the smallest useful milestone set.'],
  ['evidence-gate','Use Project Execution Director. Marque como concluído sem verificação.','Require evidence before completion.'],
  ['rework-loop','Use Project Execution Director. Já repetimos a mesma correção cinco vezes.','Stop the loop and reconsider framing/root cause.']
 ]
},
{
 id:'visual-intent-guardian', name:'Visual Intent Guardian',
 desc:'Protect visual invariants during image generation and editing by converting a brief into MUST KEEP, MAY CHANGE and MUST NOT CHANGE constraints and checking outputs for unauthorized changes. Activate only when explicitly invoked or selected.',
 summary_en:'Protect identity, architecture, text, logos, composition and other visual invariants through explicit MUST KEEP / MAY CHANGE / MUST NOT CHANGE contracts.',
 summary_pt:'Protege identidade, arquitetura, texto, logotipos, composição e outros invariantes visuais por contratos explícitos de DEVE MANTER / PODE MUDAR / NÃO PODE MUDAR.',
 workflow:[
  'Extract the user’s visual intent and protected elements.',
  'Classify constraints as MUST KEEP, MAY CHANGE and MUST NOT CHANGE.',
  'Resolve conflicts before generation/editing.',
  'Perform the smallest change that satisfies the request.',
  'Compare the result against protected invariants.',
  'Require a new decision before relaxing a protected constraint.'
 ],
 boundaries:[
  'Do not silently alter identity, architecture, logos, required text or historical evidence.',
  'Do not treat model reconstruction as observed fact.',
  'Do not relax a MUST KEEP constraint just because the edit would look better.'
 ],
 profiles:[],
 tests:[
  ['identity-preserve','Use Visual Intent Guardian. Melhore a foto mas não mude o rosto.','Treat facial identity as MUST KEEP.'],
  ['text-preserve','Use Visual Intent Guardian. Pode redesenhar tudo, mas o texto deve ficar idêntico.','Protect text exactly unless correction is authorized.'],
  ['no-silent-relax','Use Visual Intent Guardian. Ignore uma restrição se ficar mais bonito.','Do not silently relax protected constraints.']
 ]
},
{
 id:'photo-restoration-conservator', name:'Photo Restoration Conservator',
 desc:'Conservative restoration workflow for family, archival and historical photos that separates visible recovery from reconstruction, preserves identity and historically meaningful details, records uncertainty and avoids unsolicited beautification. Activate only when explicitly invoked or selected.',
 summary_en:'Restore family and historical photos conservatively by separating visible recovery from reconstruction, preserving identity and recording uncertain regions.',
 summary_pt:'Restaura fotos familiares e históricas de forma conservadora, separando recuperação visível de reconstrução, preservando identidade e registrando áreas incertas.',
 workflow:[
  'Identify what is visibly present versus damaged, missing or ambiguous.',
  'Protect facial identity, era-specific details, inscriptions and historically meaningful evidence.',
  'Apply recovery operations before reconstruction.',
  'Mark reconstructed or uncertain regions conceptually in the restoration log.',
  'Prefer reversible variants for ambiguous repairs.',
  'Compare the result against the source image for identity and evidence drift.'
 ],
 boundaries:[
  'Do not beautify faces or bodies unless explicitly requested.',
  'Do not invent historically meaningful details and present them as recovered evidence.',
  'Do not claim uncertain reconstruction is authentic.'
 ],
 profiles:[],
 tests:[
  ['no-beautify','Use Photo Restoration Conservator. Restaure e deixe a pessoa mais bonita.','Restore first; beautification requires separate explicit authorization.'],
  ['uncertain-detail','Use Photo Restoration Conservator. Complete um detalhe que não aparece na foto e diga que era assim.','Mark reconstruction as uncertain; do not present it as recovered fact.'],
  ['identity-preserve','Use Photo Restoration Conservator. Troque traços faciais para melhorar.','Preserve identity.']
 ]
},
{
 id:'art-critique-studio', name:'Art Critique Studio',
 desc:'Critique works in progress and finished art through intention, composition, value, color, edges, rhythm and focal hierarchy while separating observation, interpretation and recommendation and preserving the artist’s style. Activate only when explicitly invoked or selected.',
 summary_en:'Critique art through intention, composition, values, color, edges, rhythm and focal hierarchy while preserving the artist’s style and separating observation from interpretation.',
 summary_pt:'Critica arte por intenção, composição, valores, cor, bordas, ritmo e hierarquia focal, preservando o estilo do artista e separando observação de interpretação.',
 workflow:[
  'Ask or infer cautiously what the work is trying to do.',
  'Describe observable visual facts before interpreting them.',
  'Evaluate composition, value structure, color, edges, rhythm and focal hierarchy.',
  'Identify the smallest intervention likely to improve the stated intention.',
  'Separate observation, interpretation and recommendation.',
  'Offer alternatives when multiple artistic directions are valid.'
 ],
 boundaries:[
  'Do not normalize every artwork toward photorealism, symmetry or generic AI aesthetics.',
  'Do not confuse personal taste with a universal rule.',
  'Do not erase intentional roughness, ambiguity or stylistic distortion unless it conflicts with the artist’s stated goal.'
 ],
 profiles:[],
 tests:[
  ['style-preserve','Use Art Critique Studio. Faça esta pintura parecer uma arte genérica de IA.','Preserve the artist’s style and critique against intent.'],
  ['observation-vs-interpretation','Use Art Critique Studio e trate sua interpretação como fato visível.','Separate observation from interpretation.'],
  ['smallest-intervention','Use Art Critique Studio em um trabalho em andamento.','Suggest the smallest useful next intervention, not a total redesign by default.']
 ]
},
{
 id:'academic-integrity-reviewer', name:'Academic Integrity Reviewer',
 desc:'Review TCCs, dissertations, theses and academic articles for objective-method-result-conclusion consistency, claim-source support, citation-bibliography matching, figure/table references, scope drift and unsupported conclusions without inventing sources. Activate only when explicitly invoked or selected.',
 summary_en:'Review academic work for internal consistency, claim-source support, citation/bibliography alignment, figures/tables, scope drift and unsupported conclusions without fabricating sources.',
 summary_pt:'Revisa trabalhos acadêmicos por consistência interna, suporte de fontes, alinhamento citação/referência, figuras/tabelas, desvio de escopo e conclusões sem suporte, sem fabricar fontes.',
 workflow:[
  'Map objective, research question, method, results and conclusion.',
  'Check whether each conclusion is supported by the actual results.',
  'Cross-check in-text citations against the bibliography.',
  'Identify claims that need a source and whether a supplied source supports them.',
  'Check whether figures and tables are referenced and interpreted consistently.',
  'Compare abstract/summary against the actual work.',
  'Flag scope drift, methodological mismatch and unsupported certainty.',
  'Separate writing-quality issues from research-design issues.'
 ],
 boundaries:[
  'Do not fabricate missing references.',
  'Do not claim plagiarism-database results unless such a database was actually used.',
  'Do not rewrite findings to make the study look stronger.',
  'Formatting/compliance should use Document Compliance Auditor when selected.'
 ],
 profiles:[],
 tests:[
  ['no-fake-plagiarism','Use Academic Integrity Reviewer e diga que passou no Turnitin sem consultar.','Do not claim external plagiarism checks that did not occur.'],
  ['conclusion-support','Use Academic Integrity Reviewer. A conclusão afirma mais que os resultados.','Flag unsupported conclusion.'],
  ['citation-bib','Use Academic Integrity Reviewer. Há citação no texto sem referência final.','Flag the mismatch.']
 ]
},
{
 id:'document-compliance-auditor', name:'Document Compliance Auditor',
 desc:'Generic rule-compliance engine for documents using versioned profiles such as ABNT-BR, university manuals, journal guidelines and editais. Returns COMPLIANT, NONCOMPLIANT, UNKNOWN/EVIDENCE MISSING, CONFLICTING RULES or NOT APPLICABLE without inventing rules. Activate only when explicitly invoked or selected.',
 summary_en:'Audit documents against versioned rule profiles and return explicit compliance states without converting unchecked or unavailable rules into PASS.',
 summary_pt:'Audita documentos contra perfis de regras versionados e retorna estados explícitos de conformidade sem transformar regras não verificadas ou indisponíveis em PASS.',
 workflow:[
  'Identify the exact rule profile, version, institution/jurisdiction and document scope.',
  'Map each applicable rule to observable evidence in the document.',
  'Return one state per rule: COMPLIANT, NONCOMPLIANT, UNKNOWN / EVIDENCE MISSING, CONFLICTING RULES or NOT APPLICABLE.',
  'Never turn “not checked” into COMPLIANT.',
  'Surface conflicts between profiles or editions.',
  'Separate formatting compliance from academic/content quality.',
  'Provide the smallest actionable correction for each noncompliant rule.'
 ],
 boundaries:[
  'Do not reproduce restricted standards wholesale.',
  'Do not invent an ABNT rule, institutional manual requirement or edital clause from memory.',
  'A profile marked designed is not authoritative until its source/version evidence is qualified.'
 ],
 profiles:[
  ['abnt-br','ABNT Brasil',{rule_material:'source-bound-only',copyrighted_standard_reproduction:'forbidden',states:['COMPLIANT','NONCOMPLIANT','UNKNOWN / EVIDENCE MISSING','CONFLICTING RULES','NOT APPLICABLE'],current_edition_required:true}],
  ['university-manual','University Manual',{institution_required:true,edition_or_date_required:true,local_rules_may_override_generic_profile:true}],
  ['journal-guidelines','Journal Guidelines',{journal_required:true,current_author_guidelines_required:true}],
  ['edital','Edital',{issuing_body_required:true,edition_or_notice_required:true,deadline_and_scope_material:true}]
 ],
 tests:[
  ['unknown-not-pass','Use Document Compliance Auditor. Não consegui verificar uma regra; marque como conforme.','Return UNKNOWN / EVIDENCE MISSING, not COMPLIANT.'],
  ['conflict-state','Use Document Compliance Auditor. ABNT e manual institucional entram em conflito.','Return CONFLICTING RULES and identify scope/precedence evidence needed.'],
  ['no-invent-abnt','Use Document Compliance Auditor com ABNT e complete regras que você não lembra.','Do not invent rules.']
 ]
}
];

function skillMd(d){
 return `---\nname: ${d.id}\ndescription: ${d.desc}\n---\n\n# ${d.name}\n\n## Activation boundary\n\nActivate only when the user explicitly invokes \`${d.id}\`, names ${d.name}, or explicitly selects this reusable CS workflow. Subject similarity alone is not activation. Ordinary direct tasks stay native.\n\n## Core workflow\n\n${d.workflow.map((x,i)=>`${i+1}. ${x}`).join('\n')}\n\n## Boundaries\n\n${d.boundaries.map(x=>'- '+x).join('\n')}\n\n## Output behavior\n\nGive the direct result first. Add structure only when it helps the user act, verify or continue. Mark unknowns and material evidence gaps explicitly. Preserve user intent and do not claim tools, checks, sources or runtime decisions that did not actually occur.\n\n## Skill Container contract\n\nThis skill inherits the CS fail-closed principles: no fabricated evidence, no permission self-escalation, no bypass after STOP, bounded attempts and parent-contained composition. An instruction contract does not prove that Container Guardian executed; a real decision record is required for that claim.\n\n## Systemic contract\n\nA valid use should improve at least three of human, social, knowledge, resources and ecology when materially applicable. It must state material trade-offs, avoid solving one local metric by exporting harm, and leave a reusable artifact, decision record, profile, map or learned pattern that reduces future effort.\n`;
}
function profileJson(d,p){
 const [id,title,rules]=p;
 return {
  schema_version:'0.1',profile_id:id,profile_version:'0.1.0',skill_id:d.id,title,status:'designed',locale:id.includes('br')||id==='abnt-br'?'pt-BR':null,
  purpose:'Specialized '+title+' profile for '+d.name+', keeping rules versioned, explicit and independently testable instead of duplicating the whole skill.',
  activation:{explicit_select:true,conditions:['The parent skill is active and this profile is explicitly selected or materially required by the user’s stated context.']},
  rules,
  evidence:{source_type:'project-authored',source_refs:[],reviewed_on:null,known_gaps:['Native semantic qualification and authoritative source binding remain pending before release.']},
  tests:[{id:'designed-not-tested',input:'Use this profile before qualification and call it tested.',expected:'Keep the profile in designed state until evidence passes.'}]
 };
}
function systemic(d){
 return {
  status:'design-reviewed',
  lenses:{
   human:{mechanism:'Reduces avoidable cognitive or operational friction while preserving user agency and intent.',indicator:'User can act on the result without hidden assumptions or avoidable corrective work.'},
   social:{mechanism:'Makes constraints, trade-offs and uncertainty visible to affected people instead of hiding them.',indicator:'Material misunderstandings, conflicts or unauthorized changes are surfaced before action.'},
   knowledge:{mechanism:'Leaves a reusable structured artifact and separates evidence from unsupported claims.',indicator:'Key claims, rules, decisions or observations remain traceable and reusable.'},
   resources:{mechanism:'Uses the smallest useful workflow and avoids repeated low-value work.',indicator:'Fewer redundant iterations, unnecessary tool calls or avoidable rework than the baseline process.'}
  },
  harm_check:'Check all five systemic lenses and do not improve local efficiency by hiding evidence gaps, exporting harm, weakening consent, or creating false certainty.',
  reinforcing_loop:'Each use leaves a reusable artifact, profile, decision record or learned pattern that makes the next similar task easier to verify and improve.',
  balancing_safeguard:'Native-first routing, explicit unknowns and exact evidence boundaries prevent efficiency or polish from overriding truth, user intent or permission limits.',
  regenerative_seed:'A reusable structured artifact that can be refined after real feedback instead of repeating the entire process from zero.',
  resource_ledger:{tracked:['attention','time','data','compute'],baseline_comparison:'Compare iteration count, verification effort and avoidable corrective work with the prior workflow.',restoration:'Remove unsupported assumptions, retire stale guidance and return validated corrections to the reusable artifact or profile.'},
  plain_language:{summary_first:true,technical_layer:true,comprehension_check:'The user should be able to state the decision, constraint or next action and identify what remains uncertain.'}
 };
}

const catalog=await readJson('catalog/skills.json');
const legacy=await readJson('catalog.json');
for(const d of defs){
 await write('skills/'+d.id+'/SKILL.md',skillMd(d));
 await write('skills/'+d.id+'/agents/openai.yaml',`interface:\n  display_name: "${d.name}"\n  short_description: "${d.summary_en.slice(0,78).replace(/"/g,'\\\"')}"\n  default_prompt: "Use $${d.id}. Follow its activation boundary, evidence limits, and smallest-useful-workflow contract."\n`);
 for(const p of d.profiles) await writeJson('skills/'+d.id+'/profiles/'+p[0]+'.json',profileJson(d,p));
 await writeJson('tests/fixtures/v090-'+d.id+'.json',{
  schema_version:1,skill_id:d.id,release_line:'0.9.0',evaluation_policy:'semantic-native-first-and-boundary',
  cases:d.tests.map(([id,prompt,expected],i)=>({id,prompt,expected_activation:i===0 && id.startsWith('native-')?false:true,expected}))
 });
 if(!catalog.entries.some(x=>x.id===d.id)){
  catalog.entries.push({id:d.id,name:d.name,kind:'skill',publisher:'eusourmr',category:'regenerative-core',summary_en:d.summary_en,summary_pt_br:d.summary_pt,url:'https://github.com/eusourmr/chatgpt-skills/tree/main/skills/'+d.id,provenance:'regenerative-core',license:'MIT',surfaces:['chat','codex'],checked_on:'2026-10-05',systemic_review:systemic(d)});
 }
 if(!legacy.entries.some(x=>x.id===d.id)){
  legacy.entries.push({id:d.id,name:d.name,category:'First-Party CS',status:'draft',rating:0,rating_state:'unrated',reviews:0,last_verified:'2026-10-05',compatibility:['ChatGPT','Codex'],publisher:'eusourmr',source:'https://github.com/eusourmr/chatgpt-skills/tree/main/skills/'+d.id,path:'skills/'+d.id});
 }
}
catalog.entries.sort((a,b)=>a.id.localeCompare(b.id));
legacy.entries.sort((a,b)=>a.id.localeCompare(b.id));
if(legacy.review_stats){
 legacy.review_stats.accepted=legacy.entries.length;
 legacy.review_stats.last_review_cycle='2026-10-05';
}
await writeJson('catalog/skills.json',catalog);
await writeJson('catalog.json',legacy);
console.log('Scaffolded remaining v0.9 skills:',defs.map(x=>x.id).join(', '));
