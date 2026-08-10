---
name: ui-style-preflight
description: Align MSD Tracker user-facing work with shipped UI precedents. Use before adding or materially changing pages, tables, filters, search, forms, dialogs, responsive behavior, interaction states, or other visible UI.
---

# UI Style Preflight

## Inspect the Analogue

1. Inspect the closest same-purpose shipped feature before editing.
2. Identify its design-system primitives, tokens, spacing, typography, responsive behavior, interactions, states, and accessibility conventions.
3. Prefer consistent repeated precedent over an isolated example. Reuse applicable components and patterns.

## Resolve the Standard

- If no written standard exists but trustworthy repeated precedent does, add concise always-on guidance to `AGENTS.md`. Record feature-specific decisions and approved exceptions in `PLANS.md`.
- Ask the user whether to keep, update, or override the standard before deliberate divergence, changing an established guideline, resolving conflicting precedents, or proceeding without a trustworthy analogue. Include the evidence and affected pattern.

## Preserve Accessibility

For new or materially changed user-facing interfaces:

- Prefer semantic elements and native controls. Provide accessible names, labels, instructions, errors, and state.
- Support keyboard operation, logical focus order, visible focus, and appropriate focus management.
- Provide meaningful text alternatives, maintain readable typography and sufficient contrast, and never rely on color alone to communicate meaning.
- Use ARIA only when native semantics are insufficient. Keep roles, properties, and states valid and synchronized with behavior.

## Verify the Result

- When practical, run the repository's accessibility tooling and manually verify changed interaction paths with keyboard navigation and focus behavior. Report unavailable checks and known limitations.
- When browser or screenshot tooling is available, compare the rendered feature with its analogue across relevant responsive sizes and states.
- Otherwise, report that rendered comparison was unavailable.
