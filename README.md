# MSD Tracker

MSD Tracker is an unofficial fan-made tracker for [Mongil: Star Dive](https://msd-tracker.debu.games/). The live site helps players manage collection progress, Monster Codex entries, Monsterlings, loadouts, artifacts, and checklist tasks.

This project is open source and is not affiliated with or endorsed by the game's creators. Game names, artwork, and other third-party assets belong to their respective owners.

## Development

Requirements:

- Git
- Node.js `24.12.0` (see `.nvmrc`)
- pnpm `11.2.2`

Install dependencies and start the development server:

```bash
pnpm install
pnpm dev
```

Copy `.env.sample` to `.env.local` for local environment values. Google OAuth variables are only needed when testing Google Drive backup and sync:

```dotenv
VITE_GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret
VITE_NODE_ENV=development
```

Never commit `.env.local` or expose `GOOGLE_CLIENT_SECRET` to the browser.

## Stack

- React and TanStack Start/Router
- TanStack Query
- Tailwind CSS and shadcn/ui
- Zustand
- Framer Motion
- Biome, Vitest, and Testing Library

## Project structure

```text
src/routes/          TanStack file-based routes
src/components/      Feature-owned and shared React components
src/stores/          Zustand state and persistence
src/data/             Game datasets and validation tests
src/lib/              Shared utilities, SEO, and analytics
public/images/        Generated WebP image assets
assets/images-source/ Source game PNGs for conversion
```

## Commands

```bash
pnpm dev              # Start Vite on port 3000
pnpm test             # Run the Vitest suite
pnpm run check        # Run Biome formatting and lint checks
pnpm run fix          # Apply Biome fixes
pnpm build            # Check images, build, and type-check
pnpm preview          # Preview the production build
pnpm images:convert   # Convert source PNGs to generated WebPs
pnpm images:check     # Validate generated image assets
```

### Image assets

Place source game PNGs in `assets/images-source/`, then run `pnpm images:convert`. This incrementally generates WebP files in `public/images/` and updates the SHA-256 manifest. Run `pnpm images:check` before committing or building to verify hashes, dimensions, outputs, and production references.

## Contributing

Keep changes focused, follow the existing feature-owned structure, and add focused Vitest/Testing Library coverage for behavior changes. Run `pnpm test`, `pnpm run check`, `pnpm build`, and `git diff --check` before opening a pull request.

## License

Application source code is released under the [ISC License](LICENSE). Third-party game names, artwork, and other assets remain the property of their respective owners and are used for this fan project.
