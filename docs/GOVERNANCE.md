# Open Review Governance

ChatGPT Skills treats review history as evidence. Automation can detect, validate, compare, and surface findings, but it cannot invent reviewer identities or silently turn mechanical checks into human approval.

## Roles

- **Author** — creates or materially changes a skill.
- **Reviewer** — inspects evidence and records a review decision.
- **Maintainer** — stewards repository policy and operations.
- **Release decision maker** — approves a version for distribution.

One person may hold multiple roles in an early-stage project, but conflicts must be visible. Self-review is allowed only when explicitly disclosed and must not be presented as independent review.

## Review outcomes

- `accepted`
- `needs-evidence`
- `duplicate`
- `unsafe`
- `out-of-scope`
- `superseded`

## Corrections and re-review

Anyone may challenge a finding, translation, freshness state, permission declaration, or review decision with reproducible evidence. A correction must preserve the original decision in history and append the newer decision rather than rewriting the past.

## Conflict of interest

Review records must disclose authorship, employment, sponsorship, ownership, or another relationship that could materially affect impartiality.

## Regional and domain reviewers

Regional maintainers and domain experts add context; they do not receive automatic authority over a territory or discipline. Health, law, finance, science, public-sector, security, and other high-impact domains should seek relevant expert review where feasible without claiming certification beyond the actual evidence.
