# Governance and Review Decisions

ChatGPT Skills is human-governed and automation-assisted.

The project must make a clear distinction between:

- **author** — creates or changes a skill;
- **reviewer** — evaluates evidence and policy compliance;
- **release decision** — decides whether the reviewed artifact is admitted/recommended/released;
- **automation** — produces findings, hashes, eval results, or validation output.

One person may currently hold multiple human roles, but that conflict must be visible. The project must never describe maintainer self-review as independent review.

## Review outcomes

Public decisions use one of:

- `accepted`
- `needs-evidence`
- `duplicate`
- `unsafe`
- `out-of-scope`
- `superseded`

These outcomes describe the submitted artifact and evidence at that time, not the personal worth of a contributor.

## Public records

Reviewer registry:

```text
trust/reviews/reviewers.json
```

Append-only decision log:

```text
trust/reviews/decisions.jsonl
```

Every decision must identify real reviewers, disclose conflicts of interest, cite evidence, and include a rationale.

## Re-review and appeals

Anyone may request re-review when:

- source bytes changed;
- evidence is stale;
- a security finding is disputed;
- a translation changes the meaning of a warning;
- a compatibility claim is no longer accurate;
- new reproducible behavior evidence exists;
- a decision used incorrect or incomplete evidence.

A re-review request should open a GitHub issue that links the affected skill/version, exact evidence, and requested correction.

The project should preserve the old decision and append a new decision rather than rewriting history.

## Independent review

Independent review is a target, not a current claim.

Until external reviewers actually participate:

- self-review remains explicitly labeled;
- automation cannot count as an independent reviewer;
- no “community-approved” or similar label may be used.

## Conflicts of interest

A reviewer must disclose material relationships including:

- authorship;
- employment;
- sponsorship;
- paid consulting;
- direct commercial benefit;
- close organizational affiliation.

A conflict does not automatically invalidate a review, but it changes how the evidence should be interpreted and when a second reviewer should be sought.

## No paid trust

Payment, sponsorship, partnership, donations, or commercial relationships may never purchase:

- recommendation status;
- ranking;
- positive security findings;
- hidden suppression of warnings;
- faster favorable review.

Funding maintenance is allowed. Buying trust is not.
