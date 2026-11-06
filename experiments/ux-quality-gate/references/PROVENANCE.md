# Provenance, scope and independent CS improvements

Source reviewed 2026-11-06:
- https://github.com/nextlevelbuilder/ui-ux-pro-max-skill
- Upstream MIT license (copyright 2024 Next Level Builder)
- Upstream reference skill: `.claude/skills/ui-ux-pro-max/SKILL.md`, GitHub blob SHA `23cdf0466e10ed460627ca9c0a68984b1a6bf98b`
- Upstream UX catalog: `src/ui-ux-pro-max/data/ux-guidelines.csv`, GitHub blob SHA `4e7d52b296537a03513b18b2c3f2b946cc802051`
- Upstream metadata on inspection: `skill.json` version `2.15.0`; scope includes 80 searchable styles, 192 palettes, 74 font pairs, 119 UX guidelines and 22 stacks.

## Why not duplicate the upstream
CS already has `skills/design-system-studio` for intentional visual systems. The upstream is especially useful as *source and inspiration* for searchable patterns but would introduce overlapping curation and a heavier CLI/runtime surface if copied wholesale. CS gap is an **auditable practical UX quality gate**.

## CS-specific differentiation
1. Prioritize **critical user journeys** and observed failure states, not selection of trendy styles.
2. Attach findings to evidence and classify `observed / static heuristic / assumption / not tested`.
3. Preserve design tokens and brand invariants in handoff to Design System Studio.
4. Include pragmatic pt-BR, keyboard, zoom, motion, accessibility and narrow-mobile checks.
5. Provide a dependency-free local HTML scanner with conservative machine-readable findings.
6. Keep human-controlled promotion and no automatic remote GitHub execution.

## Limitations and integration policy
This directory is a *new downstream companion/adaptation*. It has **not** been created through GitHub's native Fork operation, and it does not mirror the upstream source tree. A genuine fork of the upstream repository must be created separately through GitHub's Fork flow.
The scanner is an offline static heuristic tool, not a full UX study, security scanner, WCAG conformance validator or browser-based accessibility checker. CSS from external stylesheets and dynamic JavaScript state can change findings.
Pending: review by human maintainer, CI result, pilot UX audit with actual UI, catalog decision, privacy/security review of any future upstream CLI integration.
