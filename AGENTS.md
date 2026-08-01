# Repository Guidelines

## Project Structure & Module Organization

This is a TanStack Start React/TypeScript app. Keep `src/routes` thin and organize feature-owned code under `src/components/<feature>`: React components in `components`, hooks in `hooks`, and utilities or domain types in `utils`. Keep feature-owned code there even when stores, hydration, sync, or other features consume it. Use shared directories such as `src/lib` only for genuinely feature-agnostic code; cross-feature consumption alone does not make code shared. Shared UI is in `src/components/ui`, state in `src/stores` and `src/context`, game data in `src/data`, and assets in `public`. Organize each top-level game dataset under `src/data/<domain>/<DATASET>_DATA.ts` with its colocated dataset-validation test; keep coordinated Monsterling shards beside `MONSTERLINGS_DATA.ts`. Colocate tests and do not edit generated `src/routeTree.gen.ts`. Follow nearby architecture, naming, and file organization; keep files focused, and do not reorganize features, routes, server boundaries, schemas, state patterns, or shared modules unless requested and approved. Extract a self-contained interactive or render section with its own data resolution, states, or callbacks when keeping it inline obscures the parent’s primary responsibility; a single caller is not sufficient reason to keep it inline, while trivial markup-only helpers may remain colocated. Do not extract files or components solely to reduce line count.

## Build, Test, and Development Commands

- `pnpm dev` starts Vite on port 3000.
- `pnpm build` creates the production bundle and runs TypeScript checks.
- `pnpm test` runs the Vitest suite once.
- `pnpm run check` runs both Biome formatting and linting checks.

Use the documented `pnpm` scripts and run the smallest meaningful targeted check first, then broader checks for route, schema, server, or shared-state changes. Report commands and results. Do not change dependencies, global tools, or the environment without approval. When dependency changes are approved, pin exact versions with `pnpm add -E` (`--save-exact`). Do not inspect, generate, migrate, or query databases unless the task requires it. Merges to `main` deploy automatically; do not deploy manually.

## Coding Style & Naming Conventions

Biome is authoritative: use tabs, double quotes, and organized imports. Follow nearby kebab-case filenames, PascalCase components, and `export const ComponentName = ...`. Name prop types after components, such as `CharacterFilterProps`, not `Props`. Reuse existing constants, schemas, enums, shared types, domain values, Tailwind, `cn(...)`, and UI; add reusable values at their current source of truth. Forms use React Hook Form, Zod, and `Controller`. Validate form and server inputs explicitly, and refresh or invalidate relevant cached data after successful mutations.

Use intent-revealing domain names. A reader should understand what a variable contains or what a helper guarantees at the call site without opening its implementation. Avoid vague transformation names such as `normalized`, `processed`, `result`, or `data` when a value- or behavior-specific name is available.

Keep naming conventions consistent within each code-owned object, schema, type, and module. Do not mix identifier casing styles in the same representation unless required by an external contract or framework. Preserve externally defined names at the boundary, then map them once to the project's internal convention.

Promote repeated closed-set domain strings used in production control flow to feature-owned readonly `as const` constants and derive their union types from those constants; keep incidental presentation, browser, protocol, route, environment, and test-contract strings inline.

## Agent Workflow

Before code changes, inspect manifests, configuration, scripts, and nearby files for the actual stack and conventions. Keep changes minimal, localized, and limited to the request; do not introduce frameworks, abstractions, architecture changes, or project paradigms without approval. Work within existing architecture. If it prevents safe completion, explain the blocker, propose the smallest viable change, and wait for approval rather than bypassing it. Update schemas before generating migrations or derived types, and do not manually edit generated migrations or snapshots unless requested.

Keep `AGENTS.md` focused on durable, always-applicable repository guidance. Add project skills under `.agents/skills/<skill-name>/SKILL.md` only for concrete, repeatable task-specific workflows, and avoid duplicating detailed instructions between this file and a skill. Keep critical safety, authorization, destructive-operation, database, and deployment restrictions here. Every project skill must have valid YAML frontmatter with a clear `name` and trigger-focused `description`, and must be validated after creation or modification.

`TEMPLATE_AGENTS.md` is a staged codex-kit reference, not active guidance. When it is refreshed or `codex-kit project status` requires reconciliation, use the global `$codex-kit-reconcile-agents` skill; preserve local rules, keep project-specific content out of the template, avoid managed markers, and mark applied only after validation. Updating `AGENTS.md` does not update the packaged template automatically.

## Planning

Read `PLANS.md` before product-facing work and implement only the current request. Record durable requirements and product, workflow, permission, priority, scope, deferral, or implementation decisions in the relevant feature checklist. After product work, mark the item implemented, verified, deferred, or pending; check items only after implementation and verification, and allow manual testing to revert them. Record major resume-worthy milestones with concise technical scope and value, without invented impact or metrics. Keep durable context for a fresh session, but omit transient handoff state, command output, debugging notes, and scratch work. If `PLANS.md` conflicts with the current request, follow the request and update the plan.

## Persistence & Drive Sync

Google Drive backups are manually allowlisted in `src/components/account/google/utils/drive-sync.ts`; Zustand fields do not sync automatically. For new or changed durable user data, follow `.agents/skills/google-drive-backup/SKILL.md`. If sync intent is unclear, ask the user before including or omitting the field.

## Analytics

GA4 page views are automatic. For meaningful user actions, add a normalized name to `ANALYTICS_EVENTS` in `src/lib/analytics.ts` and call `ga.event(...)` at the action boundary. Track CRUD, resets, and high-signal feature use; async workflows emit attempt plus success or failure. Never send PII, user-authored text, tokens, search terms, or raw errors. Add behavioral tests for new events.

## Testing Guidelines

Use Vitest and Testing Library. Add `// @vitest-environment jsdom` to DOM tests; Node is default. For behavior changes and bug fixes, add or update the smallest focused regression tests and run them before broader suites. Behavior tests use test-owned fixtures or module mocks rather than mutable game datasets; direct live-data imports are reserved for dedicated dataset-validation tests. Do not introduce a test framework or low-value tests solely for coverage; when automation is impractical, explain why and perform the strongest targeted verification available. Mock browser boundaries and keep fixtures focused, subject to the escalation rules above.

## Commit & Pull Request Guidelines

Use short imperative commits. Reference issues with `Close #<number>` or `(#<number>)`. PRs should explain changes, link issues, list verification, and include evidence for visible UI work.

## Security & Agent Workflow

Copy `.env.sample` locally; never commit secrets. Preserve user changes and unrelated dirty state; never revert them without an explicit request. Never run destructive Git commands such as `git reset --hard` or `git checkout --` without explicit approval. Use `apply_patch` for manual edits, and prefer `rg` and `rg --files` for searches.

Completion reports must concisely state changed files and behavior, verification commands and results or suggested manual checks, relevant `PLANS.md` status, and whether the change is template-level; for template-level changes, identify the packaged template section and exact addition or replacement.

## Image Assets

Paste game PNGs into `assets/images-source/` and run `pnpm images:convert`; generated WebP files belong in `public/images/` and are referenced with `.webp` paths. Run `pnpm images:check` before committing or building. Do not edit the manifest or generated WebPs manually; PNG loadout exports are intentionally preserved.
