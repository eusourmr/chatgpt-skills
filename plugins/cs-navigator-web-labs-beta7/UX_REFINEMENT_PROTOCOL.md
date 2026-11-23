# UX Quality Gate — targeted refinement protocol

**Scope:** evaluation and implementation guidance; no automatic redesign, source execution or installation. Use the smallest relevant subsection. The supplied product and explicit user choices override generalized aesthetic tastes.

## Start with evidence and scope

Record task and persona, interface and device, key workflow, existing approved design system and evidence type. If a screenshot was supplied, observations apply only to what is visible. If HTML/source was inspected, runtime behavior still needs checking. Classify each issue as reproducible, static heuristic or hypothesis. Prioritize by consequence: inability to complete task, inaccessible interaction, data loss, misleading content, then visual consistency.

Choose **retain / targeted fix / systemic redesign**. For retain, clearly say the design is acceptable. For targeted fix, keep structure and brand stable. For systemic redesign, state the objective and boundaries and confirm visual direction when it materially departs from the existing brand, unless a comprehensive redesign was already authorized.

## Product-specific direction

For systemic work, define in short form the product's actual job and audience; its existing brand and distinct vocabulary; functional character; the real content or object that should carry emphasis; and one identifiable cue that belongs to the product. A coherent neutral palette is often a useful default, but deliberate branded color, accessible contrast and domain requirements can justify something else. Neither minimalism nor decoration is a universal goal.

## Implementation passes and acceptance

| Pass | Inspect | Outcome evidence |
| --- | --- | --- |
| 1. Rhythm | spacing scale, group boundaries, alignments, density | consistent hierarchy across the relevant widths |
| 2. Color | semantic tokens, text/control contrast, light/dark themes | measured contrast, distinguishable status not based on hue alone |
| 3. Controls/icons | icon role, names, interactive state, hit target | usable keyboard/touch/assistive-tech alternatives |
| 4. Microcopy | labels, comparative metrics, error recovery, unsupported marketing claims | source-based factual language and action clarity |
| 5. Typography | reading hierarchy, font support, numbers, text scaling | long names/reflow without clipping |
| 6. Layout | responsive proportions, visual order, breakpoints, scroll/overlays | mobile, tablet and desktop where relevant |
| 7. Components/data | chart type, units, legends, no decorative fake data | correct reading of data, empty/loading/error states |
| 8. Imagery | approved product visuals, licensing, content truth | meaningful accessible image or no image |
| 9. Motion | state transitions, interruption, focus, reduced motion | no content loss or confusion on rapid interaction |

A high-risk issue can change pass order. Never infer WCAG certification from a screenshot or static code scan.

## Practical edge cases

- **Responsive text:** verify browser zoom, long uninterrupted identifiers, German/Portuguese strings, mobile text scaling, spacing overrides and compact chips/badges; truncation needs an accessible way to recover the full value.
- **Touch and input:** iOS and Android target guidance differs; avoid importing mobile minima blindly into desktop. Icon-only buttons require accessible names; decorative icons should be hidden from accessibility APIs. Fixed footers must not obscure content or focus.
- **Composition and submission:** custom Enter-to-send shortcuts must not send when IME composition is active. Check browser-specific confirmation behavior, repeated Enter and a visible submit button. Do not claim actual CJK IME compatibility from simulated tests alone.
- **Right-to-left:** specify locale and direction, prefer inline logical properties, isolate mixed-direction fragments and mirror only semantically directional icons. Keep numbers and currency formatted for the locale. Verify the resulting interface rather than mirroring all elements.
- **Charts and numbers:** use consistent locale, units, periods, decimal places and sources. A chart with fabricated data requires an explicit illustrative label; absent source, describe a design pattern rather than invent a business result.
- **State integrity:** cancelled or interrupted animations must leave final semantic state and focus correct. User text remains in a form after a failed submit whenever safe. Keep undo or confirmation for destructive actions when needed.

## Source-of-truth vs page overrides

When a reusable design system is explicitly requested, document existing design tokens, separate primitive from semantic roles and components, and store page-level exceptions only when their scope is clear. Before replacing a master file, inspect its current contents and receive explicit authorization. Do not claim the upstream UI UX Pro Max CLI or its searchable dataset is present: the CS Navigator package does **not** bundle that CLI, its catalogs, or its proprietary/premium assets.

## Verification result

For each material change, report: observed issue and evidence, smallest proposed/implemented correction, how it was tested, what still needs a real host/browser/user test. Keep the report brief by default. Stop when additional polishing no longer improves the user's task.

Original synthesis inspired by public upstream studies; credits, licenses and revision pins: `NOTICE-UX-SOURCES.md`.
