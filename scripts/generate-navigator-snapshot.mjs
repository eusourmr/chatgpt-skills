#!/usr/bin/env node
import { readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const thisFile = fileURLToPath(import.meta.url);
const root = path.resolve(path.dirname(thisFile), '..');
const readJson = async (rel) => JSON.parse(await readFile(path.join(root, rel), 'utf8'));

async function loadExternalSources() {
  const dir = path.join(root, 'sources', 'external');
  const result = [];
  try {
    for (const name of (await readdir(dir)).filter((x) => x.endsWith('.json')).sort()) {
      result.push(JSON.parse(await readFile(path.join(dir, name), 'utf8')));
    }
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
  return result;
}

export async function buildSnapshot() {
  const manifest = await readJson('installer/manifest.json');
  const trust = await readJson(manifest.trust_file || 'trust/skills.json');
  const execution = await readJson('trust/execution.json');
  const external = await loadExternalSources();

  const entries = [];
  for (const id of Object.keys(manifest.skills || {}).sort().filter((id) => id !== 'cs-navigator')) {
    const raw = trust.skills?.[id];
    const exec = execution.skills?.[id];
    if (!raw || !exec) throw new Error(`${id}: missing trust or execution data`);
    const passport = await readJson(`trust/passports/${id}.json`);
    const risk = await readJson(`trust/risk-labels/${id}.json`);
    const upstream = await readJson(`trust/upstream/${id}.json`);
    const recommendation = { ...(trust.defaults?.recommendation || {}), ...(raw.recommendation || {}) };
    entries.push({
      id,
      name: raw.name,
      summary: raw.summary,
      recommendation: recommendation.state,
      execution_mode: exec.mode,
      execution_evidence: exec.evidence_state,
      required_capabilities: exec.required_capabilities || [],
      trust: {
        freshness_state: upstream.state,
        review_due_at: upstream.review_due_at,
        security_gate: risk.security_gate.result,
        blocking_findings: risk.security_gate.blocking_findings,
        independent_review: passport.governance.independent_review,
        latest_behavior_plan: passport.behavior_evidence.latest_plan_id,
        latest_behavior_run: passport.behavior_evidence.latest_run_id
      },
      permissions: {
        local_files: raw.permissions?.local_files ?? 'unknown',
        network: raw.permissions?.network ?? 'unknown',
        secrets: raw.permissions?.secrets ?? 'unknown',
        process_execution: raw.permissions?.process_execution ?? 'unknown',
        destructive_actions: raw.permissions?.destructive_actions ?? 'unknown'
      },
      known_gaps: raw.known_gaps || trust.defaults?.known_gaps || []
    });
  }

  const external_sources = external
    .sort((a, b) => String(a.repository).localeCompare(String(b.repository)))
    .map((source) => ({
      repository: source.repository,
      immutable_ref: source.immutable_ref,
      discovery_state: source.discovery_state,
      trust_state: source.trust_state,
      license: source.license,
      skill_count: source.skill_count,
      warnings: source.warnings || [],
      skill_ids: (source.skills || []).map((skill) => skill.id).sort()
    }));

  return {
    schema_version: 2,
    policy: "Use native ChatGPT first, then the smallest useful evidence-current set. Freshness, permissions, security evidence, execution fit, and known gaps are independent. External indexed sources remain discovery-only until separately evidenced.",
    source_contract: ["installer/manifest.json", "trust/skills.json", "trust/execution.json", "trust/passports/*.json", "trust/risk-labels/*.json", "trust/upstream/*.json", "sources/external/*.json"],
    entries,
    external_sources
  };
}

async function main() {
  const targets = [
    path.join(root, 'skills', 'featured', 'cs-navigator', 'references', 'catalog-snapshot.json'),
    path.join(root, 'plugins', 'cs-navigator', 'skills', 'cs-navigator', 'references', 'catalog-snapshot.json')
  ];
  const snapshot = await buildSnapshot();
  const rendered = JSON.stringify(snapshot, null, 2) + '\n';

  if (process.argv.includes('--check')) {
    let stale = false;
    for (const target of targets) {
      const currentRaw = JSON.parse(await readFile(target, 'utf8'));
      const current = { ...currentRaw, entries: (currentRaw.entries || []).filter((entry) => entry.id !== 'cs-navigator') };
      if (JSON.stringify(current) !== JSON.stringify(snapshot)) {
        console.error(`CS Navigator snapshot is stale: ${path.relative(root, target)}`);
        stale = true;
      }
    }
    if (stale) process.exit(1);
    console.log(`CS Navigator snapshot OK: ${snapshot.entries.length} bundled skills, ${snapshot.external_sources.length} external source(s), trust-aware schema v${snapshot.schema_version}.`);
  } else {
    for (const target of targets) {
      await writeFile(target, rendered, 'utf8');
      console.log(`Wrote ${path.relative(root, target)}`);
    }
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(thisFile)) {
  await main();
}
