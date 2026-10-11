# CS Navigator 0.17.0 — Learning & Academic Mastery

CS Navigator 0.17.0 becomes the current project release and incorporates the unreleased 0.16 Evergreen Core architecture.

## What changed

- Evergreen Core stays small and stable.
- Live capability registry is read-only and metadata-only.
- Relevance-gated Curator Offer:
  **“Esta pergunta pode se beneficiar da curadoria do CS Navigator. Quer ver esta mesma resposta usando essa camada?”**
- New registry-only capability: `learning-mastery-coach`.
- New registry-only capability: `academic-writing-navigator`.
- Academic profile resolver covers ABNT-BR, APA 7, Vancouver, IEEE, Chicago, MLA 9, AMA and institution-specific Harvard variants.
- Learning Mastery uses Understand → Retrieve → Explain → Apply → Correct → Space → Consolidate.
- Human Reality Review first pass covers 63 first-party capabilities.
- Healthcare-related capabilities remain excluded from public distribution under the current platform boundary.
- General validators were updated for the Evergreen Core + registry-only architecture.

## Evidence boundary

The two new 0.17 capabilities remain **designed**. Registry presence, source review, static validation and GitHub release publication do not make them `tested`.

The changed Curator Offer behavior also remains pending native semantic qualification.

## Public ChatGPT plugin status

**Not yet submitted as a fully release-qualified public plugin.**

The public plugin path remains blocked until:

1. the read-only MCP registry is deployed to a stable production HTTPS endpoint ending in `/mcp`;
2. the endpoint passes MCP inspection;
3. the verified endpoint is bound into the exact plugin release bytes;
4. the changed 0.17 behavior receives native semantic requalification;
5. the public-directory submission is reviewed/approved by the platform.

This GitHub release is the current project release, not a claim of public Plugin Directory approval.
