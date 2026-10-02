# OSTS 0.1 Conformance

A conforming implementation MUST:

- bind evidence to an immutable source revision or explicitly declare why immutability is unavailable;
- use a cryptographic artifact hash when bytes are reviewable;
- separate execution evidence from recommendation state;
- preserve unknown or unavailable evidence instead of inventing a positive state;
- expose permissions/side effects in inspectable fields;
- distinguish automated security findings from human review decisions;
- represent freshness/drift separately from historical review;
- bind behavior eval runs to the exact plan/source/artifact they exercised;
- mark token, latency, cost, and tool-call metrics as uncollected unless measured;
- avoid representing OSTS conformance as a safety guarantee.

A conforming implementation SHOULD:

- make evidence machine-readable and human-readable;
- provide localized labels without changing the canonical evidence;
- preserve review history rather than rewrite old decisions;
- publish migration guidance when schemas change;
- support corrections and re-review.

A conforming implementation MUST NOT:

- infer user ratings from popularity;
- assign a synthetic trust score and present it as OSTS;
- silently promote an unreviewed upstream version;
- claim an independent review when author and reviewer are the same person;
- label a third-party skill “safe” solely because static checks passed.
