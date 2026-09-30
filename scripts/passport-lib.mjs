import { readFile } from 'node:fs/promises';
import crypto from 'node:crypto';
import path from 'node:path';

export const isSha256 = (value) => typeof value === 'string' && /^[a-f0-9]{64}$/.test(value);
export const isCommit = (value) => typeof value === 'string' && /^[a-f0-9]{40}$/.test(value);

export async function readJson(root, rel) {
  return JSON.parse(await readFile(path.join(root, rel), 'utf8'));
}

export function addDays(dateString, days) {
  const date = new Date(`${dateString}T00:00:00Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

export async function hashSkillArtifact(root, skill) {
  const files = [];
  for (const rel of [...skill.files].sort()) {
    const bytes = await readFile(path.join(root, skill.path, rel));
    files.push({
      path: rel,
      sha256: crypto.createHash('sha256').update(bytes).digest('hex')
    });
  }
  const manifest = files.map((file) => `${file.path}\0${file.sha256}\n`).join('');
  return {
    algorithm: 'sha256-manifest-v1',
    artifact_sha256: crypto.createHash('sha256').update(manifest, 'utf8').digest('hex'),
    files
  };
}

function latestForSkill(items, skillId, key = 'skill_id') {
  const matches = items.filter((item) => item?.[key] === skillId);
  return matches.length ? matches[matches.length - 1] : null;
}

export async function loadPassportInputs(root) {
  const [manifest, trust, execution, tests, runs, policy] = await Promise.all([
    readJson(root, 'installer/manifest.json'),
    readJson(root, 'trust/skills.json'),
    readJson(root, 'trust/execution.json'),
    readJson(root, 'trust/in-product-tests.json'),
    readJson(root, 'trust/in-product-runs.json'),
    readJson(root, 'trust/passport-policy.json')
  ]);
  return { manifest, trust, execution, tests, runs, policy };
}

export async function buildPassport(root, inputs, skillId) {
  const { manifest, trust, execution, tests, runs, policy } = inputs;
  const skill = manifest.skills?.[skillId];
  const evidence = trust.skills?.[skillId];
  const exec = execution.skills?.[skillId];
  if (!skill || !evidence || !exec) throw new Error(`${skillId}: missing manifest/trust/execution source`);

  const integrity = await hashSkillArtifact(root, skill);
  const latestPlan = latestForSkill(tests.tests ?? [], skillId);
  const matchingRuns = latestPlan
    ? (runs.runs ?? []).filter((run) => run.skill_id === skillId && run.test_id === latestPlan.id)
    : [];
  const latestRun = matchingRuns.length ? matchingRuns[matchingRuns.length - 1] : null;
  const normalizedRunId = latestRun
    ? `${latestPlan.id}--${String(matchingRuns.length).padStart(3, '0')}`
    : null;

  const evidenceRefs = ['trust/skills.json', 'trust/execution.json'];
  if (latestPlan) evidenceRefs.push('trust/in-product-tests.json');
  if (latestRun) evidenceRefs.push('trust/in-product-runs.json');

  return {
    schema_version: policy.passport_schema_version,
    skill_id: skillId,
    identity: {
      name: evidence.name,
      summary: evidence.summary,
      publisher: trust.defaults?.provenance?.publisher ?? 'unknown'
    },
    provenance: {
      source_repository: policy.source_repository,
      canonical_path: skill.path,
      reviewed_source_revision: policy.reviewed_source_revision,
      license: policy.license
    },
    integrity,
    execution: {
      mode: exec.mode,
      evidence_state: exec.evidence_state,
      minimum_setup: exec.minimum_setup,
      required_capabilities: exec.required_capabilities
    },
    permissions: {
      local_files: evidence.permissions.local_files,
      network: evidence.permissions.network,
      secrets: evidence.permissions.secrets,
      process_execution: evidence.permissions.process_execution,
      destructive_actions: evidence.permissions.destructive_actions
    },
    security: {
      state: trust.defaults?.security?.state ?? 'unknown',
      gate_version: 'v2',
      evidence_refs: [
        'trust/skills.json',
        'scripts/security-gate-v2.mjs',
        `trust/security-reports/${skillId}.json`,
        `trust/risk-labels/${skillId}.json`
      ],
      report_ref: `trust/security-reports/${skillId}.json`,
      risk_label_ref: `trust/risk-labels/${skillId}.json`
    },
    behavior_evidence: {
      state: exec.evidence_state,
      latest_plan_id: latestPlan?.id ?? null,
      latest_run_id: latestRun?.test_id ?? null,
      normalized_plan_ref: latestPlan ? `trust/evals/plans/${latestPlan.id}.json` : null,
      normalized_run_ref: normalizedRunId ? `trust/evals/runs/${normalizedRunId}.json` : null,
      evidence_refs: latestPlan
        ? [...evidenceRefs, `trust/evals/plans/${latestPlan.id}.json`, ...(normalizedRunId ? [`trust/evals/runs/${normalizedRunId}.json`] : [])]
        : evidenceRefs
    },
    freshness: {
      status: 'current',
      reviewed_at: policy.reviewed_at,
      stale_after_days: policy.stale_after_days,
      review_due_at: addDays(policy.reviewed_at, policy.stale_after_days)
    },
    governance: policy.governance,
    recommendation: {
      state: trust.defaults?.recommendation?.state ?? 'unverified',
      reason: trust.defaults?.recommendation?.reason ?? 'No recommendation rationale recorded.'
    },
    known_gaps: [...new Set([...(trust.defaults?.known_gaps ?? []), ...(evidence.known_gaps ?? [])])]
  };
}

export async function buildAllPassports(root) {
  const inputs = await loadPassportInputs(root);
  const ids = Object.keys(inputs.manifest.skills ?? {}).sort();
  const passports = new Map();
  for (const id of ids) passports.set(id, await buildPassport(root, inputs, id));
  return { inputs, passports };
}
