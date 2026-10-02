# Skill Risk Label

The Risk Label is a plain-language view of the evidence behind a skill's permission and security footprint.

It is intentionally modeled like a **nutrition label**, not a safety score.

## Dimensions

Every bundled skill label exposes:

- **Reads** — local files or other data the workflow may inspect.
- **Writes** — files or state the workflow may modify.
- **Sends externally** — network or external-service transmission.
- **Executes** — local commands, scripts, runtimes, or processes.
- **Secrets** — credentials or secret material the workflow may require or reference.
- **Destructive potential** — overwrite, deletion, irreversible changes, or force flags.
- **Human confirmation** — whether meaningful actions are gated by user approval when evidence exists.
- **Unknowns** — what static analysis and declarations cannot prove.

The label combines declared permissions from the Evidence Card with observations from Security Gate v2.

## What Security Gate v2 does

Security Gate v2 scans exact bundled skill artifacts and emits structured findings.

Blocking families currently include:

1. prompt-injection combined with credential exfiltration;
2. remote content piped into a shell;
3. PowerShell download-and-execute patterns;
4. destructive system-scale deletion;
5. encoded payload execution;
6. credential reads near outbound transmission code;
7. dangerous process execution;
8. malicious package lifecycle hooks.

It also records non-blocking signals such as network operations, filesystem writes, secret references, process execution, destructive references, lifecycle hooks, and encoded-content handling.

## What it does not prove

A PASS means **none of the current blocking rules matched the reviewed bytes**.

It does not prove:

- absence of every malicious behavior;
- safe runtime behavior on every platform;
- safety of external services or dependencies;
- correctness of the skill's task output;
- that future upstream versions inherit the same result.

For that reason the Trust Passport keeps security, behavior evidence, provenance, integrity, and freshness as separate dimensions.

## Files

Structured reports:

```text
trust/security-reports/<skill-id>.json
```

Risk Labels:

```text
trust/risk-labels/<skill-id>.json
```

Schemas:

```text
spec/osts/0.1/security-report.schema.json
spec/osts/0.1/risk-label.schema.json
```

## Commands

```bash
node scripts/security-gate-v2.mjs --write
node scripts/security-gate-v2.mjs --check
node scripts/generate-risk-labels.mjs --write
node scripts/generate-risk-labels.mjs --check
```

Deliberately unsafe fixtures under `tests/fixtures/security-v2/` prove that blocking rule families actually fail CI.

## Rule

**A visible unknown is safer than an invented guarantee.**
