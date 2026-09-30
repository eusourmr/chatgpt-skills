#!/usr/bin/env node
import { mkdir, readFile, readdir, stat, writeFile } from 'node:fs/promises';
import crypto from 'node:crypto';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const explicitIndex = args.indexOf('--path');
const explicitPath = explicitIndex >= 0 ? args[explicitIndex + 1] : null;
const write = args.includes('--write');
const check = args.includes('--check');

if (write && check) {
  console.error('Choose only one of --write or --check.');
  process.exit(2);
}

const readJson = async (rel) => JSON.parse(await readFile(path.join(root, rel), 'utf8'));
const manifest = await readJson('installer/manifest.json');
const trust = await readJson('trust/skills.json');
const policy = await readJson('trust/passport-policy.json');

const BLOCK_RULES = [
  {
    id: 'instruction-override-secret-exfiltration',
    family: 'prompt-injection',
    severity: 'critical',
    re: /ignore\s+(?:all\s+)?(?:previous|prior)\s+instructions[\s\S]{0,360}(?:secret|token|password|credential|api[_ -]?key)[\s\S]{0,360}(?:send|post|upload|exfiltrat|transmit)/i,
    message: 'Instruction override is combined with secret or credential exfiltration.'
  },
  {
    id: 'remote-shell-pipe',
    family: 'remote-execution',
    severity: 'critical',
    re: /(?:curl|wget)[^\n|]{0,320}\|\s*(?:sh|bash|zsh)\b/i,
    message: 'Remote content is piped directly to a shell.'
  },
  {
    id: 'powershell-download-exec',
    family: 'remote-execution',
    severity: 'critical',
    re: /(?:Invoke-WebRequest|iwr|curl)[\s\S]{0,320}(?:Invoke-Expression|iex)\b/i,
    message: 'Downloaded content is executed through PowerShell expression evaluation.'
  },
  {
    id: 'destructive-system-delete',
    family: 'destructive-operation',
    severity: 'critical',
    re: /(?:\brm\s+-rf\s+\/(?:\s|$)|Remove-Item\s+[^\n]{0,120}-Recurse[^\n]{0,120}-Force[^\n]{0,120}(?:C:\\\\|\/))/i,
    message: 'Command can recursively delete a filesystem root or system-scale path.'
  },
  {
    id: 'encoded-payload-exec',
    family: 'obfuscation',
    severity: 'critical',
    re: /(?:eval|exec|Invoke-Expression|iex)\s*\([^\n]{0,240}(?:base64|FromBase64String|Buffer\.from\([^\n]{0,120}base64)/i,
    message: 'Encoded payload is decoded and executed dynamically.'
  },
  {
    id: 'credential-exfiltration-code',
    family: 'secret-exfiltration',
    severity: 'critical',
    re: /(?:process\.env|os\.environ|os\.getenv|System\.getenv)[\s\S]{0,500}(?:fetch\s*\(|requests\.(?:post|put)|axios\.(?:post|put)|curl\s+-X\s+POST)/i,
    message: 'Environment or credential data is read near outbound transmission code.'
  },
  {
    id: 'dangerous-shell-exec',
    family: 'process-execution',
    severity: 'critical',
    re: /(?:child_process\.)?(?:exec|execSync|spawn|spawnSync)\s*\([^\n]{0,320}(?:rm\s+-rf|curl|wget|powershell|Invoke-Expression)|(?:subprocess\.(?:run|Popen)|os\.system)\s*\([^\n]{0,320}(?:rm\s+-rf|curl|wget|powershell)/i,
    message: 'Process execution launches a dangerous destructive or remote-execution command.'
  },
  {
    id: 'malicious-lifecycle-hook',
    family: 'lifecycle-hook',
    severity: 'critical',
    re: /"(?:preinstall|postinstall|prepare)"\s*:\s*"[^"]*(?:curl|wget|powershell|Invoke-Expression|bash\s+-c|sh\s+-c|node\s+-e)/i,
    message: 'Package lifecycle hook performs remote or dynamic command execution.'
  }
];

const SIGNAL_RULES = [
  { id: 'network-operation', family: 'network', severity: 'info', re: /(?:\bfetch\s*\(|requests\.(?:get|post|put|delete)|axios\.(?:get|post|put|delete)|\bcurl\s+https?:\/\/|\bwget\s+https?:\/\/|WebSocket\s*\()/i, message: 'Active network operation reference observed.' },
  { id: 'process-execution-reference', family: 'process-execution', severity: 'info', re: /(?:child_process|subprocess\.(?:run|Popen)|os\.system|execSync\s*\(|spawnSync\s*\()/i, message: 'Process execution reference observed.' },
  { id: 'filesystem-write-reference', family: 'filesystem-write', severity: 'info', re: /(?:writeFile|write_text|write_bytes|mkdir\s*\(|open\s*\([^\n]{0,160}['"](?:w|a|x)[+'"]?)/i, message: 'Filesystem write reference observed.' },
  { id: 'secret-reference', family: 'secrets', severity: 'info', re: /(?:OPENAI_API_KEY|API_KEY|TOKEN|PASSWORD|SECRET|credential)/i, message: 'Secret or credential terminology observed.' },
  { id: 'destructive-reference', family: 'destructive-operation', severity: 'info', re: /(?:\brm\s+-rf\b|rmtree\s*\(|unlink\s*\(|Remove-Item\b|--force\b)/i, message: 'Potentially destructive operation reference observed.' },
  { id: 'lifecycle-reference', family: 'lifecycle-hook', severity: 'info', re: /"(?:preinstall|postinstall|prepare)"\s*:/i, message: 'Package lifecycle hook observed.' },
  { id: 'encoded-content-reference', family: 'obfuscation', severity: 'info', re: /(?:base64|FromBase64String|atob\s*\(|Buffer\.from\([^\n]{0,120}base64)/i, message: 'Encoded content handling observed.' }
];

function lineNumber(text, index) {
  return text.slice(0, index).split('\n').length;
}

function evidenceHash(text) {
  return crypto.createHash('sha256').update(text, 'utf8').digest('hex');
}

async function scanFiles(files, skillId, permissions, provenance) {
  const findings = [];
  const observed = {
    network_operations: false,
    process_execution: false,
    filesystem_writes: false,
    secret_references: false,
    destructive_operations: false,
    lifecycle_hooks: false,
    encoded_or_obfuscated_content: false
  };

  for (const file of files) {
    let text;
    try { text = await readFile(file.full, 'utf8'); } catch { continue; }

    for (const rule of BLOCK_RULES) {
      const match = rule.re.exec(text);
      if (!match) continue;
      findings.push({
        rule_id: rule.id,
        family: rule.family,
        severity: rule.severity,
        blocking: true,
        path: file.rel,
        line: lineNumber(text, match.index),
        evidence_sha256: evidenceHash(match[0]),
        message: rule.message,
        disposition: 'block'
      });
    }

    for (const rule of SIGNAL_RULES) {
      const match = rule.re.exec(text);
      if (!match) continue;
      if (rule.id === 'network-operation') observed.network_operations = true;
      if (rule.id === 'process-execution-reference') observed.process_execution = true;
      if (rule.id === 'filesystem-write-reference') observed.filesystem_writes = true;
      if (rule.id === 'secret-reference') observed.secret_references = true;
      if (rule.id === 'destructive-reference') observed.destructive_operations = true;
      if (rule.id === 'lifecycle-reference') observed.lifecycle_hooks = true;
      if (rule.id === 'encoded-content-reference') observed.encoded_or_obfuscated_content = true;
      findings.push({
        rule_id: rule.id,
        family: rule.family,
        severity: rule.severity,
        blocking: false,
        path: file.rel,
        line: lineNumber(text, match.index),
        evidence_sha256: evidenceHash(match[0]),
        message: rule.message,
        disposition: 'review'
      });
    }
  }

  const exactNone = (value) => /^none(?:\s+required)?$/i.test(String(value ?? '').trim());
  const mismatchChecks = [
    ['network_operations', 'network', permissions?.network],
    ['process_execution', 'process-execution', permissions?.process_execution],
    ['filesystem_writes', 'filesystem-write', permissions?.local_files],
    ['secret_references', 'secrets', permissions?.secrets],
    ['destructive_operations', 'destructive-operation', permissions?.destructive_actions]
  ];
  for (const [key, family, declared] of mismatchChecks) {
    if (observed[key] && exactNone(declared)) {
      findings.push({
        rule_id: 'permission-description-mismatch',
        family: 'description-behavior-mismatch',
        severity: 'medium',
        blocking: false,
        path: provenance?.canonical_path ?? skillId,
        line: null,
        evidence_sha256: evidenceHash(`${key}:${declared}`),
        message: `Observed ${family} signal while permission declaration says none.`,
        disposition: 'review'
      });
    }
  }

  findings.sort((a, b) =>
    Number(b.blocking) - Number(a.blocking) ||
    a.family.localeCompare(b.family) ||
    a.rule_id.localeCompare(b.rule_id) ||
    a.path.localeCompare(b.path) ||
    (a.line ?? 0) - (b.line ?? 0)
  );

  const summary = { critical: 0, high: 0, medium: 0, low: 0, info: 0, blocking: 0 };
  for (const finding of findings) {
    summary[finding.severity] = (summary[finding.severity] ?? 0) + 1;
    if (finding.blocking) summary.blocking += 1;
  }

  return {
    schema_version: 1,
    gate_version: 'v2',
    skill_id: skillId,
    scanned_at: policy.reviewed_at,
    source_revision: provenance?.reviewed_source_revision ?? policy.reviewed_source_revision,
    artifact_sha256: provenance?.artifact_sha256 ?? null,
    result: summary.blocking ? 'blocked' : 'pass',
    summary,
    observed_capabilities: observed,
    findings,
    policy: 'Automated findings are evidence for review, not a permanent safety guarantee. Blocking rules stop admission; informational signals remain visible.'
  };
}

async function filesForSkill(skillId) {
  const skill = manifest.skills[skillId];
  return [...skill.files].sort().map((rel) => ({
    rel,
    full: path.join(root, skill.path, rel)
  }));
}

async function walk(dir, prefix = '') {
  const out = [];
  for (const name of (await readdir(dir)).sort()) {
    const full = path.join(dir, name);
    const info = await stat(full);
    const rel = path.posix.join(prefix, name);
    if (info.isDirectory()) out.push(...await walk(full, rel));
    else if (info.isFile()) out.push({ rel, full });
  }
  return out;
}

if (explicitPath) {
  const full = path.resolve(explicitPath);
  const info = await stat(full);
  const files = info.isDirectory() ? await walk(full) : [{ rel: path.basename(full), full }];
  const report = await scanFiles(files, 'fixture', {}, { canonical_path: explicitPath, reviewed_source_revision: policy.reviewed_source_revision });
  console.log(JSON.stringify(report, null, 2));
  process.exit(report.result === 'blocked' ? 1 : 0);
}

const outDir = path.join(root, 'trust', 'security-reports');
if (write) await mkdir(outDir, { recursive: true });
const errors = [];
for (const id of Object.keys(manifest.skills).sort()) {
  const passport = JSON.parse(await readFile(path.join(root, 'trust', 'passports', `${id}.json`), 'utf8'));
  const report = await scanFiles(
    await filesForSkill(id),
    id,
    trust.skills?.[id]?.permissions ?? {},
    {
      canonical_path: passport.provenance.canonical_path,
      reviewed_source_revision: passport.provenance.reviewed_source_revision,
      artifact_sha256: passport.integrity.artifact_sha256
    }
  );
  const expected = JSON.stringify(report, null, 2) + '\n';
  const out = path.join(outDir, `${id}.json`);

  if (write) {
    await writeFile(out, expected, 'utf8');
    console.log(`WROTE trust/security-reports/${id}.json`);
  } else if (check) {
    let actual = '';
    try { actual = await readFile(out, 'utf8'); } catch {}
    if (actual !== expected) errors.push(`${id}: security report missing or stale`);
  } else {
    console.log(`${id}: ${report.result} blocking=${report.summary.blocking} findings=${report.findings.length}`);
  }

  if (report.result === 'blocked') errors.push(`${id}: Security Gate v2 BLOCKED bundled skill`);
}

if (errors.length) {
  console.error('Security Gate v2 failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log(`Security Gate v2: PASS (${Object.keys(manifest.skills).length} bundled skills)`);
