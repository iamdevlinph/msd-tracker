# Repository Guidelines

## Project Structure & Module Organization

This is a TanStack Start React/TypeScript app. Keep `src/routes` thin and logic in `src/components/<feature>`. Shared UI is in `src/components/ui`, helpers in `src/lib`, state in `src/stores` and `src/context`, game data in `src/data`, and assets in `public`. Colocate tests, do not edit generated `src/routeTree.gen.ts`, and keep `PLANS.md` current.

## Build, Test, and Development Commands

- `pnpm dev` starts Vite on port 3000.
- `pnpm build` creates the production bundle and runs TypeScript checks.
- `pnpm test` runs the Vitest suite once.
- `pnpm lint` runs Biome lint rules.
- `pnpm format:check` checks formatting without rewriting files.
- `pnpm check` runs the combined Biome checks.

Use targeted checks first, then broader checks for route, schema, server, or shared-state changes. Merges to `main` deploy automatically; do not deploy manually.

## Coding Style & Naming Conventions

Biome is authoritative: use tabs, double quotes, and organized imports. Follow nearby kebab-case filenames, PascalCase components, and `export const ComponentName = ...`. Name prop types after components, such as `CharacterFilterProps`, not `Props`. Reuse types, domain constants, Tailwind, `cn(...)`, and existing UI. Forms use React Hook Form, Zod, and `Controller`.

## Persistence & Drive Sync

Google Drive backups are manually allowlisted in `src/components/account/google/utils/drive-sync.ts`; Zustand fields do not sync automatically. Evaluate every new durable user-data field for remote-sync eligibility. For sync-worthy data—user-created or configured data expected to survive devices or local-storage loss—update `Backup` and `select(...)`, mutation-driven `backupUpdatedAt`, legacy download defaults, sync-conflict metadata/UI, and relevant tests. If sync intent is unclear, ask the user before including or omitting the field.

## Analytics

GA4 page views are automatic. For meaningful user actions, add a normalized name to `ANALYTICS_EVENTS` in `src/lib/analytics.ts` and call `ga.event(...)` at the action boundary. Track CRUD, resets, and high-signal feature use; async workflows emit attempt plus success or failure. Never send PII, user-authored text, tokens, search terms, or raw errors. Add behavioral tests for new events.

## Testing Guidelines

Use Vitest and Testing Library. Add `// @vitest-environment jsdom` to DOM tests; Node is default. Cover behavior and regressions, mock browser boundaries, and keep fixtures focused.

## Commit & Pull Request Guidelines

Use short imperative commits. Reference issues with `Close #<number>` or `(#<number>)`. PRs should explain changes, link issues, list verification, and include evidence for visible UI work.

## Security & Agent Workflow

Copy `.env.sample` locally; never commit secrets. Preserve unrelated changes, keep edits scoped, avoid destructive Git commands, and report verification.
