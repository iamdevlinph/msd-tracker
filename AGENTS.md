# Repository Guidelines

## Project Structure & Module Organization

This TanStack Start application uses React and TypeScript. Routes live in `src/routes`; keep them thin and move feature logic into `src/components/<feature>`. Shared UI is in `src/components/ui`, helpers in `src/lib`, state in `src/stores` and `src/context`, static game data in `src/data`, and public assets in `public`. Colocate `*.test.ts(x)` files. Do not edit generated `src/routeTree.gen.ts`. Track feature status in `PLANS.md` and check off implemented items in the same change.

## Build, Test, and Development Commands

- `pnpm dev` starts Vite on port 3000.
- `pnpm build` creates the production bundle and runs TypeScript checks.
- `pnpm test` runs the Vitest suite once.
- `pnpm lint` runs Biome lint rules.
- `pnpm format:check` checks formatting without rewriting files.
- `pnpm check` runs the combined Biome checks.

Use targeted checks first, then broader checks for route, schema, server, or shared-state changes. Merges to `main` deploy automatically; do not run deployment commands.

## Coding Style & Naming Conventions

Biome is authoritative: use tabs, double quotes, and organized imports. Follow nearby patterns: kebab-case filenames, PascalCase components, and `export const ComponentName = ...`. Name prop types after their component, such as `CharacterFilterProps`, instead of `Props`. Keep feature code together and reuse existing types and domain constants. Use Tailwind, `cn(...)`, and existing UI primitives. Forms use React Hook Form, Zod, and `Controller` fields.

## Persistence & Drive Sync

Google Drive backups are manually allowlisted in `src/components/account/google/utils/drive-sync.ts`; Zustand fields do not sync automatically. Evaluate every new durable user-data field for remote-sync eligibility. For sync-worthy data—user-created or configured data expected to survive devices or local-storage loss—update `Backup` and `select(...)`, mutation-driven `backupUpdatedAt`, legacy download defaults, sync-conflict metadata/UI, and relevant tests. If sync intent is unclear, ask the user before including or omitting the field.

## Testing Guidelines

Use Vitest and Testing Library for behavior. Add `// @vitest-environment jsdom` to DOM tests; Node is the default. Cover visible behavior and regressions, mock browser boundaries, and keep fixtures focused. No coverage threshold is configured.

## Commit & Pull Request Guidelines

Use short, imperative commit summaries and focused commits. Reference issues with `Close #<number>` or `(#<number>)`. Pull requests should explain the change, link issues, list verification, and include evidence for visible UI changes.

## Security & Agent Workflow

Copy `.env.sample` locally; never commit secrets or private keys. Preserve unrelated changes, keep edits scoped, and avoid destructive Git commands. Report changed files and verification.
