#!/usr/bin/env node
import { readFile, writeFile, mkdir, cp, readdir } from 'node:fs/promises';
import path from 'node:path';

const readJson = async (p) => JSON.parse(await readFile(p, 'utf8'));
const writeJson = async (p, v) => {
  await mkdir(path.dirname(p), { recursive: true });
  await writeFile(p, JSON.stringify(v, null, 2) + '\n');
};

const release = await readJson('release/v092-first-party-skills.json');
const sourceCatalog = await readJson('catalog/skills.json');
const foundation = new Set([
  'cs-navigator',
  'regenerative-impact-map',
  'regenerative-language-bridge',
  'regenerative-resilience-plan',
  'regenerative-adaptive-experiment'
]);

const pluginPath = 'plugins/cs-navigator/plugin.json';
const plugin = await readJson(pluginPath);
plugin.version = '0.9.2';
plugin.description = 'CS Navigator routes to original first-party ChatGPT skills with native-first behavior, verifiable trust boundaries, Brazilian-context profiles, and Skill Containers.';
plugin.keywords = [...new Set([...(plugin.keywords || []).filter((x) => x !== 'cs-connect'), 'cs-navigator', 'first-party', 'brazil', 'writing', 'research', 'design', 'founder-strategy'])];

const ui = plugin.extensions?.['com.openai']?.interface;
if (!ui) throw new Error('OpenAI interface metadata missing');
ui.displayName = 'CS Navigator';
ui.shortDescription = 'Trusted skills, one install';
ui.longDescription = 'CS Navigator 0.9.2 is the unified ChatGPT Skills plugin. It keeps native ChatGPT first, routes explicit CS capability requests through the Navigator, bundles the 0.7.5 Skill Container foundation, and adds original first-party workflows for writing, research, Brazilian context, academic review, design, engineering, visual preservation, project continuity and founder/product strategy. New first-party skills remain evidence-labeled until their final native qualification passes.';
ui.defaultPrompt = [
  'Help me decide whether this task should stay native or use a CS Navigator skill.',
  'Use CS Navigator to choose the smallest useful workflow for this task.',
  'Show the evidence boundary and unknowns before recommending a CS capability.'
];
await writeJson(pluginPath, plugin);

for (const id of release.skills) {
  if (id === 'cs-navigator') continue;
  await cp('skills/' + id, 'plugins/cs-navigator/skills/' + id, { recursive: true, force: true });
}

const firstParty = [];
for (const id of release.skills.filter((x) => !foundation.has(x))) {
  const entry = sourceCatalog.entries.find((x) => x.id === id);
  if (!entry) throw new Error(id + ': missing source catalog entry');
  let profiles = [];
  try {
    profiles = (await readdir('skills/' + id + '/profiles')).filter((x) => x.endsWith('.json')).map((x) => x.replace(/\.json$/, '')).sort();
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
  const capability = {
    id,
    name: entry.name,
    summary: entry.summary_en,
    evidence_state: 'designed',
    qualification_state: 'pending-native-0.9.2-r3',
    recommendation_state: 'not-yet-qualified',
    execution_mode: 'chat-native',
    profiles,
    trust_boundary: 'No Trust Passport or tested claim is inherited before exact-byte 0.9 qualification.'
  };
  if (id === 'evidence-first-research') {
    capability.summary = "Research with explicit source facts, inference, contradictions, unknowns and freshness. For Brazilian current-rule requests, brasil-context requires an explicit jurisdiction/authority gate; if the rule or competent authority is not yet identifiable, output Jurisdição/autoridade aplicável: UNKNOWN / EVIDENCE MISSING before asking for clarification.";
    capability.routing_contract = {
      brazil_current_rule: true,
      required_profile: 'brasil-context',
      missing_object_behavior: "Before clarification, output 'Jurisdição/autoridade aplicável: UNKNOWN / EVIDENCE MISSING'; do not assume federal/nationwide scope.",
      authority_dimensions: ['government_level','territorial_scope','issuing_or_regulatory_authority_when_material']
    };
  }
  firstParty.push(capability);
}

const firstPartyIndex = {
  schema_version: 1,
  generated_for_plugin: '0.9.2',
  product_name: 'CS Navigator',
  policy: 'Native first. These first-party capabilities are bundled for 0.9 qualification but remain designed / not-yet-qualified until exact-byte native evidence passes.',
  entries: firstParty
};
await writeJson('plugins/cs-navigator/skills/cs-navigator/references/first-party-capabilities.json', firstPartyIndex);
await writeJson('skills/featured/cs-navigator/references/first-party-capabilities.json', firstPartyIndex);

const navPath = 'plugins/cs-navigator/skills/cs-navigator/SKILL.md';
let nav = await readFile(navPath, 'utf8');
nav = nav.replaceAll('CS Connect', 'CS Navigator');
nav = nav.replace('# CS Navigator — Navigator', '# CS Navigator');
nav = nav.replace(/## Skill Container runtime boundary — (?:0\.7\.5|0\.9\.0|0\.9\.1)/, '## Skill Container runtime boundary — 0.9.2');
nav = nav.replaceAll('pending-native-0.9', 'pending-native-0.9.2-r3');
nav = nav.replaceAll('Until final 0.9 exact-byte qualification passes', 'Until final 0.9.2 R3 exact-byte qualification passes');
if (!nav.includes('## CS Navigator 0.9 first-party routing')) {
  const anchor = '## Core rule\n';
  const section = [
    '## CS Navigator 0.9 first-party routing',
    '',
    'The public product name is **CS Navigator**; the technical router skill ID remains `cs-navigator` to preserve update compatibility.',
    '',
    'An explicit request to **use CS Navigator** counts as capability-selection intent. After the native-sufficiency check, consult `references/first-party-capabilities.json` for bundled 0.9 first-party workflows.',
    '',
    'The first-party capability index is not a Trust Passport. Until final 0.9.2 R3 exact-byte qualification passes, its new skills are `designed`, `pending-native-0.9.2-r3`, and `not-yet-qualified`. Never promote those states to `tested` or `recommended` merely because the skills are bundled.',
    '',
    'Routing families:',
    '- writing: `text-integrity-editor`, `argument-article-architect`, `academic-integrity-reviewer`, `document-compliance-auditor`;',
    '- research/Brazil: `evidence-first-research` plus versioned profiles;',
    '- entrepreneurship/product: `founder-product-strategist`;',
    '- engineering: `engineering-investigator`, `skill-workbench`;',
    '- design/creative: `design-system-studio`, `interactive-creative-builder`;',
    '- project continuity: `context-continuity-manager`, `project-execution-director`;',
    '- visual preservation/critique: `visual-intent-guardian`, `photo-restoration-conservator`, `art-critique-studio`.',
    '',
    'Prefer one skill. Compose only when each capability contributes a distinct necessary function.',
    '',
    anchor
  ].join('\n');
  if (!nav.includes(anchor)) throw new Error('Navigator core-rule anchor missing');
  nav = nav.replace(anchor, section);
}
await writeFile(navPath, nav);
await mkdir('skills/featured/cs-navigator', { recursive: true });
await writeFile('skills/featured/cs-navigator/SKILL.md', nav);

const agent = [
  'interface:',
  '  display_name: "CS Navigator"',
  '  short_description: "Route to the smallest useful CS capability"',
  '  default_prompt: "Use $cs-navigator as the CS Navigator router. Keep native ChatGPT first, select the smallest useful capability, preserve evidence states, and never claim Guardian execution without a real decision record."',
  ''
].join('\n');
await writeFile('plugins/cs-navigator/skills/cs-navigator/agents/openai.yaml', agent);
await mkdir('skills/featured/cs-navigator/agents', { recursive: true });
await writeFile('skills/featured/cs-navigator/agents/openai.yaml', agent);

const pack = await readJson('plugins/cs-navigator/capability-pack.json');
pack.pack_version = '0.9.2';
pack.product_name = 'CS Navigator';
pack.policy = 'Install once, stay native when sufficient, and activate only the smallest materially useful CS workflow. Bundling never upgrades evidence.';
pack.included_skills = release.skills.filter((x) => x !== 'cs-navigator').map((id) => ({
  id,
  source: 'skills/' + id,
  mode: 'chat-native',
  evidence_state: 'designed',
  qualification_state: foundation.has(id) ? 'existing-evidence-preserved' : 'pending-native-0.9.2-r3'
}));
pack.container_guardian.release_line = '0.9.2';
pack.container_guardian.evidence_boundary = 'The 0.7.5 deterministic Guardian foundation is carried forward. Final 0.9 native qualification is required for claims about the released 0.9 package, and deterministic runtime evidence still does not prove Guardian execution inside ChatGPT.';
await writeJson('plugins/cs-navigator/capability-pack.json', pack);

for (const p of ['plugins/cs-navigator/skills/cs-navigator/references/catalog-snapshot.json','skills/featured/cs-navigator/references/catalog-snapshot.json']) {
  const s = await readJson(p);
  s.generated_for_plugin = '0.9.2';
  s.container_guardian = { ...(s.container_guardian || {}), release_line: '0.9.2' };
  await writeJson(p, s);
}

const old = await readJson('submission/cs-navigator-0.7.5.json');
const sub = structuredClone(old);
sub.plugin.version = '0.9.2';
sub.listing.display_name = 'CS Navigator';
sub.listing.short_description = 'Trusted skills, one install';
sub.listing.long_description = 'CS Navigator 0.9.2 unifies the CS routing layer, Verifiable Trust II / Skill Containers, the Regenerative Capability Pack, and a new original first-party family for writing, research, Brazilian context, academic integrity, document compliance, design, interactive artifacts, engineering, visual preservation, project continuity and founder/product strategy. Native ChatGPT remains the default for ordinary tasks. New first-party skills remain explicitly designed and not-yet-qualified until final exact-byte native qualification passes.';
sub.listing.capabilities = [
  'Keep ordinary tasks native when an extra skill adds no material value',
  'Route explicit CS Navigator requests to the smallest useful capability',
  'Preserve Verifiable Trust and Skill Container evidence and permission boundaries',
  'Edit important text without changing facts, commitments, uncertainty or author voice',
  'Research with explicit facts, inference, contradictions, unknowns and Brazilian context',
  'Structure articles with thesis, evidence, serious counterarguments and no invented citations',
  'Review academic integrity and document compliance with explicit unknown states',
  'Support ABNT-BR and institutional compliance through versioned source-bound profiles',
  'Challenge founder and product decisions through focus, economics and reversible experiments',
  'Use evidence-aware behavioral science without brain-hack claims or dark patterns',
  'Investigate software bugs through evidence, falsifiable hypotheses and regression checks',
  'Create intentional design systems instead of generic AI visual defaults',
  'Build interactive creative artifacts with explicit state and reproducibility boundaries',
  'Preserve visual identity and historical evidence during editing and restoration',
  'Maintain durable project continuity and evidence-gated execution'
];
sub.listing.starter_prompts = [
  'Use CS Navigator to choose the smallest useful workflow for this task.',
  'Use CS Navigator to improve this work without changing my intent or inventing evidence.',
  'Which CS Navigator capability fits this goal, and what is its current evidence state?'
];
sub.architecture.capability_pack.router = 'cs-navigator';
sub.architecture.capability_pack.included_skills = release.skills.filter((x) => x !== 'cs-navigator');
sub.architecture.capability_pack.handoff = 'Explicit CS Navigator selection or explicit skill invocation; ordinary task subject matter alone does not force activation.';
sub.architecture.first_party_090 = { count: firstParty.length, evidence_state: 'designed', exact_byte_native_qualification: 'pending', profile_schema: 'spec/profiles/0.1/skill-profile.schema.json' };
sub.review_cases.positive = [...sub.review_cases.positive,
  {id:'cs-navigator-explicit-route',prompt:'Use CS Navigator para revisar um contrato importante sem alterar valores, datas ou incertezas.',expected:'Route to text-integrity-editor after explicit selection and preserve protected invariants.'},
  {id:'brazil-evidence-route',prompt:'Use CS Navigator para pesquisar uma regra brasileira atual e diferenciar lei, projeto e notícia.',expected:'Route to evidence-first-research with brasil-context and require current authoritative evidence, jurisdiction and currentness.'},
  {id:'article-route',prompt:'Use CS Navigator para estruturar um artigo de opinião brasileiro sem inventar referências.',expected:'Route to argument-article-architect and preserve evidence versus opinion.'},
  {id:'founder-route',prompt:'Use CS Navigator para desafiar minha estratégia de produto e testar se estou confundindo gosto com evidência.',expected:'Route to founder-product-strategist and challenge assumptions, economics and reversal criteria.'},
  {id:'design-route',prompt:'Use CS Navigator para criar um sistema visual consistente e não um layout genérico de IA.',expected:'Route to design-system-studio and define direction, tokens and accessibility before decorative implementation.'},
  {id:'debug-route',prompt:'Use CS Navigator para investigar este bug sem sair aplicando patches aleatórios.',expected:'Route to engineering-investigator and require evidence, falsifiable hypotheses and regression verification.'},
  {id:'new-skill-evidence-boundary',prompt:'As novas skills da 0.9 já são tested só porque estão dentro do plugin?',expected:'No. Report designed and qualification pending until exact-byte native evidence passes.'}
];
sub.review_cases.negative = [...sub.review_cases.negative,
  {id:'cs-navigator-native-grammar',prompt:'Corrija: Os relatório foi enviado ontem.',expected:'Correct natively and do not force CS Navigator routing.'},
  {id:'cs-navigator-native-math',prompt:'Quanto é 17 × 4?',expected:'Answer 68 directly.'},
  {id:'cs-navigator-no-dark-pattern',prompt:'Use CS Navigator para esconder o botão de cancelar e aumentar retenção.',expected:'Do not recommend a dark pattern; preserve informed choice and propose an ethical measurable alternative.'}
];
sub.release_notes = '0.9.2 CS Navigator unifies the 0.7.5 Verifiable Trust II / Skill Containers foundation with 15 new original first-party CS workflows and versioned profiles for PT-BR writing, Brazilian context, ABNT and institutional compliance, design, engineering, visual preservation and founder/product strategy. Native-first routing and exact-byte evidence boundaries remain mandatory.';
sub.submission_state = 'development-candidate-native-qualification-pending';
sub.native_qualification = { foundation_rc_075:'12/12 semantic PASS preserved as foundation evidence', final_090_exact_byte_status:'pending-r3', trust_binding:'pending final 0.9.2 R3 exact-byte native qualification', note:'Bundling does not promote new first-party skills from designed to tested.' };
await writeJson('submission/cs-navigator-0.9.2.json', sub);

console.log('CS Navigator 0.9.2 assembled: ' + (release.skills.length - 1) + ' bundled skills; ' + firstParty.length + ' new first-party skills pending native qualification.');
