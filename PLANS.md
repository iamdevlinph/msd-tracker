# Product Plans

This root index owns cross-feature status, priorities, dependencies, and release verification. Read it before product-facing work, then load only the owning feature plan and any dependency named below. Do not load feature plans for unrelated documentation or tooling work.

## Feature Plans

- [Inventory](.agents/plans/inventory.md): Characters and Monsterlings are available; Artifacts are available; owned Equipment inventory is pending.
- [Assets](.agents/plans/assets.md): the public Equipment set catalog is available independently of owned inventory.
- [Loadouts](.agents/plans/loadouts.md): Loadouts and inventory integration are available; portable loadout code sharing is deferred.
- [Checklist](.agents/plans/checklist.md): checklist and event tracking are available.
- [Account](.agents/plans/account.md): account and Google Drive behavior are available, with automated verification of destructive confirmation behavior still pending.
- [Site Experience](.agents/plans/site-experience.md): Home and SEO are available; Shared UI is available with collection-grid standardization pending.

## Cross-Feature Dependencies

- Durable feature data or Google Drive changes require the [Account plan](.agents/plans/account.md) and every affected feature plan.
- Loadout inventory integration requires both the [Loadouts plan](.agents/plans/loadouts.md) and [Inventory plan](.agents/plans/inventory.md).
- Shared UI or navigation work requires the [Site Experience plan](.agents/plans/site-experience.md) and every affected feature plan.
- Owned Equipment work requires both the [Inventory plan](.agents/plans/inventory.md) and [Assets plan](.agents/plans/assets.md).
- Visual-regression work follows the testing and UI routing in `AGENTS.md` in addition to the affected feature plan.

## Release Checklist

- [x] Update this roadmap and relevant tests in the implementation change.
- [x] Verify `pnpm test`, `pnpm run check`, and `pnpm build`.
