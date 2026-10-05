# ChatGPT In-Product Evidence

The CS trust model separates **designed** execution from **tested** execution.

For a `chat-native` skill, CI and local packaging can prove structure, integrity, deterministic references, and absence of mandatory external dependencies. They cannot prove how the ChatGPT product actually loads and applies that skill.

## Promotion rule

A `chat-native` skill may move from `designed` to `tested` only when all of the following are recorded:

1. a versioned test plan in `trust/in-product-tests.json`;
2. the exact SHA-256 of the uploaded skill artifact;
3. distribution type and immutable source revision;
4. package version recorded by that source;
5. the ChatGPT product surface used;
6. execution date/time;
7. every required case from the plan;
8. an observed result for every assertion;
9. a final `pass` with no failed assertion.

The machine-readable run is stored in `trust/in-product-runs.json`.

## Historical first test: CS Navigator

Test plan: `cs-navigator-chatgpt-v1`.

The intended flow is deliberately simple:

`export one ZIP → upload/install in ChatGPT → stay in the same chat → run six cases → record evidence`

No server, API key, MCP gateway, external account, or local runtime is part of the Navigator's core test.

### Historical 0.7 preparation example

The npm CLI remains on its independent `0.4.0` line and is not the source of truth for CS Navigator plugin qualification. For current release qualification, test the exact versioned plugin artifact named by the qualification plan; do not substitute an unpinned CLI/export artifact.

Use the exact repository revision that introduced the evidence gate:

```bash
npx --yes --allow-git=root github:eusourmr/chatgpt-skills#8b814c93980175fa61da141d659cfa28a8e6bd92 install --skill cs-navigator --tool chatgpt-web --yes
```

npm 12 defaults Git fetching to disabled. `--allow-git=root` opts in only for the explicitly requested root Git package for this command; do not change the global npm policy.

This should create:

```text
.chatgpt-skills/export/packages/cs-navigator.zip
```

Record the SHA-256 of that exact ZIP. The evidence run must use:

```text
distribution: github-pinned
source_revision: 8b814c93980175fa61da141d659cfa28a8e6bd92
```

Upload that exact ZIP to a ChatGPT surface that supports custom Skills.

### Execute the test

Run every prompt from `trust/in-product-tests.json` in the qualifying ChatGPT Skills surface. The result must demonstrate the expected smallest useful set, execution disclosure, trust boundary, coverage-gap behavior, and the ability to say that no additional skill is needed.

### Record the run

Append one run object to `trust/in-product-runs.json` with the exact artifact hash, immutable source revision, product surface, and observed evidence. Do not edit `trust/execution.json` to `tested` before this run validates.

After a passing run is committed, the execution evidence may be promoted in a separate reviewed change. CI enforces that a `chat-native/tested` claim cannot exist without a passing in-product run.

## Current 0.9 evidence

CS Navigator 0.9.0 R2 was qualified from the exact plugin ZIP with SHA-256:

```text
3379f932301b707fcf935f8f4f6f45bdea10d3e7277daced2849f93c3f824cce
```

The frozen matrix first exposed two defects. After the Brazil jurisdiction/authority and Project Execution Director rollback fixes, R2 passed a change-impact requalification of 5/5 cases. Do not describe this as a full 23/23 rerun on R2.

Machine-readable evidence:
- `release/candidates/cs-navigator-v0.9.0-r2.json`
- `trust/evals/runs/cs-navigator-v0.9.0-r2-native-requalification.json`

## Evidence is not endorsement

A passing test proves that the tested version behaved according to the plan on the recorded product surface. It does not mean the skill is universally safe, permanently compatible, or endorsed by OpenAI.

Independent community project. Not affiliated with or endorsed by OpenAI.
