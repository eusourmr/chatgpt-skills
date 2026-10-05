# Public Roadmap

This roadmap is directional, public, and deliberately measurable. Dates may change when platform APIs, security requirements, or evidence change.

See [`docs/ECOSYSTEM_GROWTH_STRATEGY.md`](docs/ECOSYSTEM_GROWTH_STRATEGY.md) for the competitive/growth rationale behind the sequencing below.

## Current position

The current qualified product line is **CS Connect 0.9.0 — First-Party Skills Platform**.

The exact production candidate is **R2**, ZIP SHA-256 `3379f932301b707fcf935f8f4f6f45bdea10d3e7277daced2849f93c3f824cce`. The initial frozen matrix exposed two real defects; both were fixed, and R2 completed a **5/5 change-impact native requalification** covering the repaired Brazil jurisdiction route, repaired project rollback route, Guardian STOP/no-bypass, native-first, and evidence-state preservation. GitHub Actions reproduced the same inner ZIP hash.

The former **0.7.5** line is now historical/internal foundation evidence for Skill Containers and Container Guardian. It was absorbed into 0.9 rather than released independently. The former **0.8** product scope was also absorbed into 0.9.

Public directory review/publication is a distribution state separate from technical qualification. The 0.9 package must not be called publicly listed until OpenAI approval and explicit publication are verified.

The next product line is **v0.10 — Ecosystem Intelligence & Community Scale**.

The project may scale discovery broadly while keeping trust claims narrow: `indexed`, `source-checked`, `tested`, and `recommended` remain distinct evidence states.

## v0.4 — Trust Layer

Build the evidence model that makes the catalog useful before it becomes large.

### Deliverables

- Adopt `docs/TRUST_MODEL.md` as the catalog's trust contract.
- Correct platform targets so "install" means a path the target actually discovers; use explicit export/upload-preparation semantics where direct installation is not available.
- Extend catalog metadata with provenance, immutable reviewed reference, integrity/hash, permissions, side effects, evidence states, recommendation state, and verification timestamps.
- Model external app/tool/gateway dependencies separately from the skill itself: authentication, scopes, data destinations, read/write/destructive actions, approval behavior, and provider type.
- Add deterministic security admission checks for bundled skills: suspicious instructions, secret access, network/process execution, remote downloads, obfuscation, lifecycle hooks, and description-versus-behavior review prompts.
- Add `chatgpt-skills doctor` for the local installation: validate config, installed files, expected hashes/version, missing files, unsupported target, stale metadata, and actionable remediation.
- Add `chatgpt-skills inspect <skill>` for bundled/catalog skills, showing plain-language purpose, provenance, permissions, compatibility evidence, warnings, and unknowns.
- Pin every bundled artifact to the package version and record verifiable content hashes.
- Add at least one reproducible smoke/behavior test per bundled skill or explicitly mark the evidence gap.

**Exit criteria:** every bundled skill has an evidence card; platform install/export semantics are honest; `doctor` detects corrupted/incomplete installs; `inspect` explains trust without an opaque score; CI blocks a deliberately unsafe fixture.

## v0.5 — Useful Service & Chat-Native Execution

Turn the trust data into a discovery service focused on user jobs, while proving the shortest reliable path from a skill to useful execution inside ChatGPT.

### Deliverables

- Adopt `docs/EXECUTION_MODEL.md` and classify every bundled skill as `chat-native`, `native-tools`, `connected`, or `local-agent`, with an explicit evidence state.
- Prove at least one `chat-native` skill end-to-end using the native ChatGPT Skills flow: create/upload or install, activate automatically or by `@`, complete the job in the same chat, and record the evidence without claiming broader availability than was tested.
- Keep **Chat-Native First** as the default architecture: use ChatGPT itself first, then a focused skill, then native tools, and add external apps/MCP/API only when the job truly requires them.
- Generate a static/searchable web catalog from the same source of truth as the CLI.
- Search by problem to solve, not only skill name or category.
- Show trust/evidence cards, execution mode, last verification, permissions, compatibility, external app dependencies, and known limitations on every result.
- Add outcome-oriented bundle recommendations: describe the job, get the smallest useful set of skills.
- Detect overlapping or potentially conflicting skills in a bundle.
- Provide machine-readable JSON endpoints/artifacts so other tools can consume the catalog without scraping the website.
- Add deprecation, supersession, and replacement relationships.
- Build an ingestion pipeline that can index existing `SKILL.md` repositories and plugin metadata into review candidates without automatically granting verification or silently converting packaging semantics.
- Grow toward **100 useful indexed entries** across high-value jobs while reporting how many are source-checked, tested, recommended, or stale.
- Add one narrow app-backed reference workflow and compare at least one optional third-party provider (for example Composio) against the relevant OpenAI-native app/plugin path where comparable.
- Publish three reproducible case studies before broad promotional campaigns.

**Exit criteria:** a user can go from a plain-language job to a small evidence-backed recommendation, understand whether the workflow stays inside ChatGPT or needs another execution surface, inspect the trade-offs before installation/export, and distinguish broad discovery coverage from independently tested trust evidence. At least one chat-native workflow has recorded end-to-end ChatGPT execution evidence.

## v0.6 — Capability Pack I

Make CS Navigator useful after routing without turning it into a monolith.

### Delivered

- One CS Navigator plugin install exposes Navigator plus four lightweight chat-native workflows.
- Bundled capability availability remains separate from activation.
- Direct tasks stay native unless capability-selection intent or explicit skill invocation exists.
- Regenerative Language Bridge, Impact Map, Resilience Plan, and Adaptive Experiment preserve independent evidence states.
- Explicit invocation regression passed 4/4.
- Capability-selection routing regression passed 4/4.
- No-second-install, native-only, external-trust, evidence-boundary, and anti-overrouting gates passed.
- The qualified 0.6.0 payload was released with an exact SHA-256 and source commit.

**Exit criteria:** completed. The release proved that one install can expose multiple independently evidenced capabilities without sacrificing the Simple Gate.

## v0.7 — Verifiable Trust I — DELIVERED

Released as **CS Navigator 0.7.0** on 2026-10-02. Make **trust and curation** the unmistakable product center. The catalog, CS Navigator, and the Regenerative core remain, but each should reinforce an auditable evidence layer.

See [`docs/V070_VERIFIABLE_TRUST.md`](docs/V070_VERIFIABLE_TRUST.md).

### Deliverables

- Add an open, machine-readable **Trust Passport** for each bundled repository-authored skill.
- Upgrade to **Security Gate v2** with structured findings for prompt injection, exfiltration, remote execution, dangerous permissions, obfuscation, lifecycle hooks, destructive actions, and description/behavior mismatches.
- Generate a human-readable **Risk Label** showing reads, writes, external sends, execution, secrets, destructive potential, confirmation behavior, and unknowns.
- Add **continuous upstream drift detection** so a reviewed source cannot change silently while retaining old trust claims.
- Normalize **behavior eval plans and runs**, including measured token/time/cost fields only when actually collected.
- Tie every reviewed artifact to immutable source and hash; add signed/attested provenance where supported.
- Make CS Navigator **trust-aware**: native-only first, then smallest useful capability based on evidence freshness, permission footprint, execution fit, and known gaps.
- Add a public review log, reviewer registry, conflict-of-interest field, and re-review path.
- Add trust/risk vocabulary in English, Brazilian Portuguese, Spanish, and French.
- Publish the core curation criteria as an open reusable **Open Skill Trust Standard (OSTS) v0.1**.
- Add regional metadata foundations for Latin America and other underserved markets without weakening evidence gates.

### Quality data policy

0.7 creates the path for real quality data but does not invent it.

Allowed evidence:
- reproducible task success/failure;
- documented use cases;
- measured token/time/cost;
- real user review records with context;
- like-for-like comparison fixtures.

Remain `unrated` until real review data exists.

**Exit criteria:** every bundled repository-authored skill has a valid Passport linked to real evidence; Security Gate v2 emits structured public reports and blocks adversarial fixtures; upstream drift can trigger stale/re-review-required; task-level eval evidence is machine-readable; Navigator can use trust/freshness/permissions without over-routing; review decisions are auditable; EN/PT-BR/ES/FR trust vocabulary exists; and the reusable trust schema is published as OSTS 0.1.

## v0.7.5 — Verifiable Trust II & Containers — HISTORICAL FOUNDATION / ABSORBED INTO 0.9

Container Guardian I foundation was merged to `main`, passed its deterministic gates, and was incorporated into the exact CS Connect 0.9.0 R2 package. It is not a standalone public release.

Extend verifiable trust from **what was reviewed** to **what the skill is allowed to do during execution**.

See [`docs/V075_VERIFIABLE_TRUST_II_CONTAINERS.md`](docs/V075_VERIFIABLE_TRUST_II_CONTAINERS.md) and [`docs/SKILL_CONTAINERS.md`](docs/SKILL_CONTAINERS.md).

### Product innovation: Skill Containers

Introduce a portable **Skill Container** policy envelope with a **Container Guardian**. The container is fail-closed by default and treats safe failure as a valid outcome.

Core rule:

> **No evidence → no invented fact. No permission → no self-escalation. No authorized path → stop.**

### Deliverables

- Publish the Skill Container 0.1 machine-readable schema and default fail-closed policy.
- Add an epistemic boundary: unsupported facts, citations, observations, and tool results cannot be fabricated to satisfy an expected output.
- Add a capability boundary: undeclared tools and permission widening are denied by default.
- Add an acquisition boundary that blocks credential theft, secret harvesting, unauthorized access, auth bypass, privilege escalation, stealth persistence, and undeclared external transfer.
- Add data-minimization and external-send defaults.
- Add bounded attempt/retry/tool budgets; exhaustion must stop rather than broaden capability.
- Add composition containment so child skills cannot widen the parent/user/runtime envelope.
- Define deterministic Guardian decisions: `allow`, `allow-with-confirmation`, `degrade`, and `stop`.
- Define explicit stop codes and privacy-minimized audit records.
- Integrate container state into CS Navigator so it can explain why a workflow was degraded or stopped.
- Add adversarial fixtures for fabricated evidence, fabricated tool results, permission escalation, unauthorized acquisition, container escape, and composition privilege expansion.
- Preserve defense-in-depth language: a logical Skill Container does not replace OS/runtime sandboxing, host policy, authentication, or authorization.

### Exit criteria

The 0.7.5 line is not qualified until deterministic fixtures prove that missing evidence does not become invented data; denied permissions cannot self-expand; unauthorized acquisition is blocked; child workflows cannot widen the parent envelope; retry exhaustion cannot unlock more privilege; stop/degrade decisions are auditable; and the user can understand why execution stopped.

## v0.8 — ABSORBED INTO v0.9

The planned **First-Party Skills I** release will not ship as a separate 0.8.0 line.

Its scope has been absorbed into **v0.9.0 — First-Party Skills Platform** so the first broad first-party release can combine:

- the 0.7.5 Verifiable Trust II / Skill Containers foundation;
- practical creation and engineering workflows;
- research and writing workflows;
- Brazilian-context profiles;
- visual preservation/critique workflows;
- founder/product strategy.

Issue #60 is superseded by Issue #62.

## v0.9 — First-Party Skills Platform: Creation, Writing, Brazil & Founder Strategy — QUALIFIED

Make 0.9 the first broad first-party product release after the 0.7.x trust foundation.

Track the full product definition and release gates in **Issue #62**.

### Mandatory foundation

0.9 must inherit the qualified 0.7.5 behavior:

- Skill Containers;
- Container Guardian decisions `ALLOW / CONFIRM / DEGRADE / STOP`;
- no bypass after `STOP`;
- no permission self-escalation;
- child containers cannot widen parent permissions;
- no fabricated facts, citations, observations, or tool results;
- bounded retries and explicit evidence gaps;
- exact-byte trust renewal;
- native-first anti-overrouting.

The 0.7.5 production candidate becomes an **internal foundation artifact**, not a standalone release. Preserve its 12/12 RC native semantic evidence and production structural/security checks, but do not renew trust or claim exact-byte native qualification for the unreleased 0.7.5 package. The next exact-byte native qualification is performed once against the final 0.9 production package.

### Product architecture

Prefer **Core Skill + Profile** over duplicated giant prompts. Profiles must be versioned, source-bound, testable, and independently reviewable.

Writing defaults for PT-BR should use simple, assertive, natural language while gradually enriching vocabulary without artificial complexity or generic AI tone.

Brazil-specific profiles must distinguish current official rules/data, jurisdiction, date, source conflicts, and unknowns.

### First-party families

**Creation & engineering**
- `design-system-studio` with `web-interface`, `canvas-social`, and `theme-system` profiles;
- `interactive-creative-builder` with `generative-art` and `interactive-web-artifact` profiles;
- `engineering-investigator` with `root-cause-debugging` and `codebase-search` profiles;
- `context-continuity-manager`;
- `project-execution-director`;
- `skill-workbench`.

**Research & writing**
- `evidence-first-research` with `general` and `brasil-context` profiles;
- `text-integrity-editor` with `pt-br-clareza-rica`;
- `argument-article-architect` with Brazilian article/opinion/institutional and academic profiles;
- `academic-integrity-reviewer`;
- `document-compliance-auditor` with `abnt-br`, university, journal, and edital profiles.

**Visual preservation & critique**
- `visual-intent-guardian`;
- `photo-restoration-conservator`;
- `art-critique-studio`.

**Entrepreneurship & product**
- `founder-product-strategist` with product-focus, launch-story, business-model, Brazil-founder-context, and behavioral-science profiles.

The founder skill may use documented product principles often associated with Steve Jobs as one influence, but it must not impersonate him, invent quotes, or turn taste into evidence. Behavioral/neuro claims must be evidence-aware, avoid pseudo-neuroscience and dark patterns, and be testable against real customer behavior.

### Reuse instead of duplication

The existing Regenerative Impact Map, Language Bridge, Resilience Plan, and Adaptive Experiment remain independent capabilities. Navigator should compose them only when they add material value.

External skills can inspire problem selection and benchmarking, but CS implementations must be original and license-aware.

### Initial implementation order

1. `text-integrity-editor` + `pt-br-clareza-rica`;
2. `evidence-first-research` + `brasil-context`;
3. `argument-article-architect`;
4. `document-compliance-auditor` + `abnt-br`;
5. `founder-product-strategist`;
6. `engineering-investigator`;
7. `design-system-studio`;
8. `skill-workbench`;
9. remaining specialist skills after their contracts and tests are ready.

### 0.9 qualification result

- qualified candidate: **R2**
- exact ZIP SHA-256: `3379f932301b707fcf935f8f4f6f45bdea10d3e7277daced2849f93c3f824cce`
- initial frozen matrix: **21 PASS / 2 FAIL**
- defects fixed: Brazil jurisdiction/authority UNKNOWN gate; Project Execution Director reversible checkpoint/rollback
- R2 requalification: **5 PASS / 0 FAIL**
- GitHub Actions reproduction: exact inner ZIP hash match
- claim boundary: semantic/exact-byte evidence for recorded cases, not a universal safety or zero-hallucination guarantee
- public-directory state: separate review/publish flow

### 0.9 release gates

- 0.7.5 RC semantic evidence and production structural/security checks preserved as foundation evidence, without falsely calling the unreleased 0.7.5 production bytes natively qualified;
- narrow activation contract for every skill;
- anti-overrouting regressions;
- deterministic fixtures where meaningful;
- native semantic qualification;
- Skill Container profile/permissions;
- exact-byte trust binding;
- profile provenance/versioning;
- EN + PT-BR documentation;
- PT-BR simple-language/richer-vocabulary behavior tests;
- current-source checks for Brazil/ABNT profiles;
- accessibility checks for design workflows;
- evidence labels for behavioral-science claims;
- license/source provenance for external inspiration;
- no first-party skill called `tested` until its own evidence passes;
- final production package qualification.

## v0.10 — Ecosystem Intelligence & Community Scale

Turn the verified trust foundation into a collaborative intelligence layer for the wider ChatGPT skill ecosystem.

### Product objective

Help users and developers understand **which capabilities compose well, which overlap, which conflict, which are stale, which are safer/lighter, and which actually succeed on the same task**.

### Deliverables

- Build a **Skill Capability Graph** linking jobs, capabilities, dependencies, permissions, evidence, domains, locales, and alternatives.
- Add composition analysis for multi-skill workflows: overlap, contradictory instructions, duplicated permissions, context pressure, failure propagation, and fallback paths.
- Add evidence-backed alternative suggestions: lower-permission, more current, more local, cheaper, simpler, or native-only when the data supports the comparison.
- Add reproducible **like-for-like benchmarks** for skills that solve the same job; publish raw fixtures/results and avoid unsupported overall rankings.
- Add a developer-facing **submission/evidence toolkit** so skill authors can generate Passport-compatible metadata, hashes, security reports, and eval fixtures before opening a PR.
- Add CI templates and reference GitHub Actions for third-party repositories to produce OSTS-compatible attestations.
- Add versioned machine-readable APIs/artifacts for catalog search, Trust Passports, Risk Labels, drift status, review history, and eval evidence.
- Add privacy-preserving, opt-in usage evidence collection architecture; no silent telemetry and no user-content collection by default.
- Add verified user-review records with context, version binding, conflict-of-interest disclosure, and anti-spam controls.
- Add maintainer/reviewer reputation based on durable review quality, freshness work, reproduced findings, and accepted corrections — never paid placement or raw submission volume.
- Add a public corrections process so users can challenge stale evidence, false positives, mistranslations, or missing risk disclosures.
- Add deprecation and migration guidance when a skill becomes stale, unsafe, superseded, or incompatible.
- Add incident handling for compromised upstream sources, malicious updates, leaked secrets, broken signatures, or materially changed permissions.
- Add compatibility matrices across ChatGPT, Codex, Work, Agent Skills-compatible runtimes, and connected execution surfaces where evidence exists.
- Add resource-efficiency measurements when observable: token use, tool calls, latency, external calls, and artifact size.

### Community and governance

- Establish a public reviewer/maintainer program with clear onboarding, code of conduct, review expectations, conflicts policy, and removal process.
- Require attributed review decisions; automated checks may inform, but cannot impersonate human review.
- Add contribution recognition for translators, security reporters, benchmark authors, regional maintainers, researchers, and documentation contributors.
- Support regional maintainers and domain stewards without creating closed territorial ownership.
- Maintain a public backlog of unreviewed, stale, disputed, and high-impact candidates.

### Exit criteria

- users can compare evidence for multiple candidates on the same job;
- composition conflicts and permission expansion are machine-detectable;
- third-party authors can generate OSTS-compatible evidence without copying the repository;
- at least one external contributor has completed a real review/contribution path;
- opt-in quality evidence has provenance and version binding;
- stale/unsafe/superseded skills have visible migration paths.

## v1.0 — Trusted Skill Ecosystem

Graduate from a curated repository and plugin into a mature, open, verifiable trust layer that strengthens the ChatGPT ecosystem and its users.

### Product promise

A user can describe a goal and receive the **smallest useful path** — native ChatGPT when sufficient, otherwise one or more skills — with clear evidence about trust, permissions, freshness, compatibility, regional fit, and known limitations.

A developer can publish a skill and understand exactly what evidence is required for discovery, source-checking, testing, recommendation, and continued trust over time.

### v1.0 core capabilities

- **Trust Passport 1.0**: stable schema, backwards-compatibility policy, migration rules, examples, validators, and reference implementation.
- **OSTS 1.0 candidate path**: open specification mature enough for external adoption, with conformance levels and implementation guidance.
- **Security Gate mature profile**: structured static/dynamic findings, adversarial fixtures, suppressions with rationale, review history, and supply-chain checks.
- **Continuous Verification**: scheduled drift detection, stale-state propagation, re-review queues, incident response, and immutable evidence history.
- **Behavior Evidence**: reproducible eval plans/runs, regression history, objective metrics when measured, domain fixtures, and transparent failure cases.
- **Trust-Aware Navigator**: native-first, evidence-aware, permission-aware, freshness-aware, locale/jurisdiction-aware, compatibility-aware, and anti-overrouting-qualified.
- **Risk Labels**: consistent plain-language labels across supported languages with machine-readable backing.
- **Regional Excellence**: strong Latin America coverage plus a framework that lets other regions build equivalent evidence-backed collections.
- **Science & Research**: reproducibility/provenance support, public benchmark fixtures, citation/uncertainty safeguards, and domain-review hooks.
- **Governance**: public review history, reviewer registry, conflicts policy, appeals/corrections, contribution recognition, and transparent release decisions.
- **Developer Ecosystem**: author tooling, validation CLI, reusable CI templates, evidence generators, and migration tools.
- **Interoperability**: preserve open Agent Skills compatibility and support external catalogs/tools consuming OSTS evidence without vendor lock-in.
- **Privacy**: no hidden telemetry; explicit consent and provenance for any usage evidence; data minimization by default.
- **Accessibility**: trust and risk information understandable to non-specialists and inspectable in technical depth.
- **Resilience**: mirrors, artifact hashes, release attestations, reproducible generation where practical, backup/restore of catalog state, and documented recovery procedures.

### v1.0 trust levels

Keep discovery and trust separate. A candidate may progress through evidence-backed states such as:

- `indexed` — discovered, not trusted;
- `source-checked` — provenance/source inspected;
- `tested` — one or more reproducible behavior/compatibility tests passed;
- `recommended` — current evidence meets the documented recommendation gate for a defined use context;
- `stale` / `re-review-required` — prior evidence exists but is no longer current enough for the previous recommendation;
- `blocked` — evidence indicates the project should not recommend installation/use under the defined policy.

These states must remain explainable and version-bound. No state is a permanent safety guarantee.

### v1.0 success metrics

Do not optimize only for catalog size. Track:

- percentage of indexed skills with immutable provenance;
- percentage with valid Trust Passports;
- percentage with structured security reports;
- percentage with reproducible behavior evidence;
- verification freshness and median re-review lag;
- number of upstream changes caught before users inherit old trust;
- proportion of Navigator requests resolved native-only versus skill-assisted;
- permission reduction achieved through smaller recommended sets;
- reproducible benchmark coverage by domain;
- real external reviewers/contributors and review turnaround;
- localization coverage with human review;
- documented corrections and time-to-resolution;
- regional/domain coverage, including Latin America and science/research;
- user-reported successful use cases bound to exact versions when consented and verifiable.

Raw stars, downloads, repository count, and submission volume may be reported, but must not substitute for trust or quality.

### v1.0 release gates

v1.0 should not ship until:

- every bundled/recommended skill has a valid current Trust Passport;
- recommendation claims are version-bound and freshness-aware;
- Security Gate covers the defined major threat families with regression fixtures;
- continuous verification has demonstrated at least one real or simulated upstream-drift transition end-to-end;
- behavior evals are reproducible from documented fixtures;
- Navigator passes native-only, routing, trust-boundary, permission-aware, freshness-aware, and anti-overrouting qualification;
- regional metadata and Latin America collections pass the same trust gates as global entries;
- science/research workflows expose provenance/reproducibility evidence where applicable;
- governance records are public and at least one external contribution/review path has been exercised;
- EN/PT-BR/ES/FR trust surfaces are consistent and validated;
- release artifacts are hash-verifiable and tied to immutable source;
- disaster/recovery and compromised-upstream procedures are documented;
- the project can clearly state what remains unknown.

## Cross-version commitments — things we must not forget

These commitments apply to every release from 0.7 through 1.0:

1. **Trust is evidence, not branding.** Never invent confidence, safety, ratings, reviews, or validation.
2. **Native-first.** A skill should not be recommended when ChatGPT already solves the job adequately without it.
3. **Smallest useful set.** More capabilities are not automatically better.
4. **Version-bound trust.** A new upstream version does not inherit old evidence automatically.
5. **Security is continuous.** Static inspection, behavior evidence, drift checks, and human review complement each other.
6. **Privacy by default.** No hidden telemetry, no unnecessary user-data collection, and no silent external transmission.
7. **Regional excellence without lower standards.** Latin America and underserved markets receive better context, not weaker gates.
8. **Science requires provenance.** Citations, units, assumptions, uncertainty, transformations, and reproducibility matter.
9. **Accessibility is part of quality.** Plain language and technical depth should coexist.
10. **Open standards over lock-in.** Prefer interoperable schemas, Agent Skills compatibility, MCP/official integration surfaces, and portable evidence.
11. **Human governance stays visible.** Automation assists review; it does not impersonate reviewers.
12. **Regenerative design remains a distinctive authored track.** It strengthens systemic quality without becoming a mandatory ideology for third-party catalog inclusion.
13. **No paid trust or paid ranking.** Commercial support must never buy recommendation status.
14. **Corrections are a feature.** Make it easy to challenge evidence, fix mistakes, and preserve the history of what changed.
15. **Failure evidence matters.** Publish meaningful failures and limitations, not only successes.
16. **Resource efficiency matters.** When measurable, track token, time, network, compute, and maintenance costs.
17. **High-stakes domains need stronger caution.** Health, finance, legal, public-sector, and security workflows require explicit limitations and evidence boundaries.
18. **Do not claim scale we have not earned.** Global ambition, community governance, and regional leadership must be demonstrated with real contributors and usage.
19. **Strengthen the ChatGPT ecosystem rather than fragment it.** Complement OpenAI-native capabilities and surface them when they are the best fit.
20. **Keep innovating.** Every release should add a real capability, stronger evidence, lower user risk, better accessibility, broader regional usefulness, or improved interoperability — not novelty for its own sake.
## Beyond v1.0 — Durable Public Infrastructure

After v1.0, expansion should be driven by demonstrated usage, external adoption, unresolved user needs, and evidence quality — not by pressure to add features for their own sake.

Potential post-1.0 directions:

- broader OSTS adoption and independent implementations;
- additional regional steward programs where real maintainers exist;
- deeper domain benchmarks with universities, research groups, nonprofits, and industry partners;
- privacy-preserving aggregate ecosystem health metrics;
- additional signing/attestation ecosystems as open standards mature;
- long-term archival and reproducibility infrastructure for reviewed artifacts;
- federated catalogs that exchange evidence without surrendering independent governance;
- recognition programs only when enough external evidence exists to make recognition meaningful;
- sustainability models that fund maintenance without selling trust, rank, verification, or access to favorable review.

Do **not** launch awards, badges, regional claims, or governance claims before the underlying evidence/community exists. The project should prefer being precise and smaller over appearing larger than it is.
## Explicit non-goals

- Do not build a proprietary "ChatGPT Actions Gateway" while OpenAI's Apps SDK/Plugins and MCP already provide the relevant action/integration primitives.
- Do not automatically transform every plugin into a repository-owned skill; preserve source packaging, provenance, license, and semantics.
- Do not use "five skills per category", star count, or raw submission volume as quality KPIs.
- Do not make a single third-party gateway a required trust dependency; integrations should be optional adapters with explicit evidence and permissions.

## Product principles

1. **Trust before scale.** A larger catalog is not automatically a better catalog.
2. **Scale discovery, not trust claims.** Broad indexing is compatible with narrow, evidence-backed recommendation.
3. **Evidence before labels.** Show why a recommendation exists.
4. **Jobs before categories.** Users arrive with outcomes, not taxonomy.
5. **Smallest useful bundle.** More skills increase context, permissions, conflict, and maintenance cost.
6. **Immutable when installed.** Prefer versioned, hashed artifacts over mutable remote content.
7. **Plain language with technical depth available.** A non-specialist should understand the risk; an expert should be able to inspect the evidence.
8. **Independent, not adversarial.** Complement OpenAI's Plugin/Skills directory rather than pretending to replace or represent it.
9. **Open standards before proprietary gateways.** Prefer MCP, Agent Skills, existing app/plugin mechanisms, and thin adapters over new protocols.
10. **No paid trust.** Sponsorship, if ever introduced, must never buy ranking, verification, or a positive recommendation.
11. **Regenerative by design.** Repository-authored regenerative skills retain the stronger multi-lens systemic standard and should create more reusable capability than the resources they consume.
12. **Chat-Native First.** Prefer workflows that become useful after loading a skill and stay in the same chat; add infrastructure only when it creates necessary capability.
