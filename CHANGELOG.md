# Changelog

All notable changes to ChatGPT Skills are documented here.


## 0.7.5 — Unreleased / qualification

### Added

- Deterministic Container Guardian runtime with auditable `ALLOW`, `CONFIRM`, `DEGRADE`, and `STOP` decisions.
- Effective-permission intersection and no runtime permission self-escalation.
- Fabricated citation/observation/tool-result denial.
- Unauthorized acquisition, secret-use, external-transfer, cross-user and cross-task data boundaries.
- Bounded retry/tool-attempt budgets.
- Parent-contained child workflow permissions.
- Adversarial fixtures and deterministic Container Guardian behavior eval.
- Executable CS Navigator → Container Guardian adapter.
- Force-fresh 0.7.5 QA artifact/build workflow.
- Frozen native qualification matrix for the 0.7.5 RC.
- Canonical EN/PT-BR Getting Started and plugin-maintenance documentation.

### Status

- Container Guardian I foundation merged to `main` through PR #59.
- Canonical production plugin remains **0.7.0**.
- 0.7.5 is not released until native ChatGPT qualification, byte-bound evidence renewal, final production qualification, and release/publication gates pass.

## 0.7.0 — 2026-10-02 — Verifiable Trust I

### Added

- Trust Passports for bundled repository-authored skills.
- Security Gate v2 structured evidence.
- Public Risk Labels.
- Freshness/drift state and reviewed-version binding.
- Normalized behavior-evaluation evidence.
- Trust-aware CS Navigator routing.
- Governance and multilingual trust vocabulary foundations.
- Open Skill Trust Standard (OSTS) 0.1.

### Qualification and integrity

- Required native ChatGPT qualification matrix: PASS.
- Final production qualification workflow: PASS.
- Release workflow: PASS.
- Release tag: `cs-navigator-v0.7.0`.
- Production plugin SHA-256: `a1ac38a482f6e3ad839eefc3ed555c2cc001e24cf28b1be2740024d963b6048d`.
- Security Gate `pass` remains evidence of configured checks, not a safety guarantee.
- New/changed skill bytes do not automatically inherit old trust/evidence.
- CS Navigator does not invent opaque 0–100 trust scores or unsupported winners.

## 0.4.0 — 2026-09-08

### Added

- `chatgpt-skills inspect <skill-id>` with evidence-backed purpose, provenance, permissions, compatibility, security notes and known gaps.
- Evidence Cards for all 12 bundled skills in `trust/skills.json`.
- Security Gate v1 with blocking rules for dangerous remote-shell, destructive-root and explicit secret-exfiltration patterns, while reporting non-blocking risk signals separately.
- Project and user-scope target adapters for Codex, Cursor and portable `.agents/skills` installations.
- ChatGPT upload-export mode that explicitly avoids claiming direct installation into ChatGPT Web.
- Per-file SHA-256 hashes in installation configuration so `doctor` can detect corruption independently of the verifier package version.
- Deliberately unsafe CI fixture proving the Security Gate blocks known-dangerous patterns.

### Changed

- Installer manifest moves to schema 3 and records supported target semantics plus the trust-data location.
- Installation config moves to schema 2 with adapter, mode, scope and recorded file hashes.
- Package validation now requires complete Evidence Cards and exercises every filesystem adapter from the packed npm tarball.
- Package positioning shifts from a generic curated installer toward an evidence-backed trust, inspection and compatibility layer.

### Integrity

- Evidence Cards are not safety guarantees and use a conservative `conditional` recommendation until stronger task-level end-to-end evidence exists.
- ChatGPT is treated as export/upload preparation, not as a local filesystem installation target.
- App/MCP/action-provider dependencies are modeled as a distinct future trust surface rather than being conflated with the skill instruction file itself.

## 0.3.1 — 2026-09-08

### Fixed

- Published `0.3.1` through npm Trusted Publishing (GitHub Actions OIDC), eliminating long-lived npm write tokens from the release path.
- Restored the npm executable mapping so `npx chatgpt-skills ...` resolves to `installer/index.js` under npm 11.
- Kept the Node-only prepublish gate so Windows maintainers do not need Python just to publish the package.
- Confirmed the packaged CLI and bundled installation path in GitHub Actions before release.

### Release note

- `0.3.0` exists on npm but was published without a usable `bin` entry after npm normalized an older package manifest. It should not be treated as the recommended CLI release.
- `0.3.1` is the first intended public CLI release.

## 0.3.0 — 2026-09-08

### Added

- Interactive `chatgpt-skills` installer with curated bundles and `.chatgpt/skills-config.json` output.
- Quality metadata in `catalog.json` with provenance, verification status, ratings, reviews and compatibility surfaces.
- Repository health reporting and automated progress updates.
- `Developer`, `Data Analyst`, `Marketing & Growth`, `Education` and `OpenAI Ecosystem` bundles.
- Four OpenAI-native featured skills:
  - `openai-agents-sdk-builder`
  - `realtime-api-integration`
  - `chatgpt-apps-deployer`
  - `codex-pr-reviewer`
- Public roadmap, community process and stronger contribution gates.
- npm package smoke testing and trusted-publishing workflow.

### Changed

- Project identity from `awesome-chatgpt-skills` to `chatgpt-skills`.
- README positioning from a flat list to a curated, auditable catalog and distribution layer.
- Official OpenAI provenance is now distinguished from independent project verification and community authorship.

### Integrity

- No OpenAI endorsement is claimed for this independent project.
- Rejection counts and ratings are reported only when auditable evidence exists.
- Repository-authored regenerative skills remain subject to the stricter systemic design gates.
