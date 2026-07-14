# Repository Guidelines

## Project Structure & Module Organization

This is a TanStack Start application built with React and TypeScript. File-based routes live in `src/routes`; keep route components thin and move feature logic into `src/components/<feature>`. Shared UI primitives are in `src/components/ui`, reusable helpers in `src/lib`, application state in `src/stores` and `src/context`, and static game data in `src/data`. Public images and metadata belong in `public`. Tests are colocated with the code they cover as `*.test.ts` or `*.test.tsx`. Do not edit generated `src/routeTree.gen.ts` manually.

## Build, Test, and Development Commands

- `pnpm dev` starts Vite on port 3000.
- `pnpm build` creates the production bundle and runs TypeScript checks.
- `pnpm test` runs the Vitest suite once.
- `pnpm lint` runs Biome lint rules.
- `pnpm format:check` checks formatting without rewriting files.
- `pnpm check` runs the combined Biome checks.

Use targeted checks while working, then run broader checks for route, schema, server, or shared-state changes. Do not change dependencies or run deployment commands unless the task requires it.

## Coding Style & Naming Conventions

Biome is authoritative: use tabs, double quotes, and organized imports. Follow nearby patterns, prefer kebab-case filenames, PascalCase React components, and `export const ComponentName = ...` for new components. Keep feature-specific hooks, stores, schemas, and utilities inside their feature. Use existing TypeScript types and domain constants instead of duplicating string literals. Style with Tailwind utilities, merge conditional classes through `cn(...)`, and reuse project or shadcn UI primitives before adding new ones. Forms use React Hook Form with Zod validation and `Controller`-based fields.

## Testing Guidelines

Use Vitest and Testing Library for behavioral tests. Add `// @vitest-environment jsdom` to DOM-based component tests because the default environment is Node. Cover user-visible behavior and regressions, mock browser APIs at test boundaries, and keep fixtures focused. No coverage threshold is currently configured.

## Commit & Pull Request Guidelines

History favors short, imperative summaries such as `Add variant badge to character` or `Fix spacing for hover monsterling card`. Keep commits focused; reference issues with `Close #<number>` or `(#<number>)` when applicable. Pull requests should explain the change, link relevant issues, list verification performed, and include screenshots or recordings for visible UI changes.

## Security & Agent Workflow

Copy `.env.sample` for local configuration and never commit client secrets or private keys. Preserve unrelated working-tree changes, keep edits scoped, and avoid destructive Git commands. Report changed files and verification results when handing off work.
