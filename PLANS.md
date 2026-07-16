# Product Plans

Keep this checklist aligned with repository behavior. Check off work in the same change that implements it.

## Characters: Available

- [x] Filter owned and selectable characters by Tier 4 and Tier 5.

## Monsterlings: Available

- [x] Search owned monsterlings by name and filter them across Tier 1 through Tier 5.

## Loadouts: Available

- [x] Expose Loadouts in production navigation.
- [x] Create, edit, duplicate, delete, preview, copy, and download team loadouts.
- [x] Offer detailed and compact monsterling stat-label share previews.
- [x] Require three unique owned characters selected through searchable, filterable character cards.
- [x] Assign three regular and one legendary owned monsterling per character through searchable, multi-tier-filterable cards.
- [x] Persist loadouts locally and through Google Drive sync.
- [x] Hide unfinished Artifact and Equipment slots outside development.

## Home Dashboard: Available

- [x] Welcome users and link the available tracker features.
- [x] Show linked counts for owned characters, owned monsterlings, cleared codex entries, and loadouts.
- [x] Preview planned Checklist, Artifact, Equipment, and complete Loadout features.

## Account

- [ ] Confirmation dialogs for destructive data-clearing actions are implemented; automated behavior verification is pending.

## Chunk 1: Checklist and Event Tracking

- [ ] Define event, task, schedule, reset, and completion requirements when product details are available.
- [ ] Design the durable checklist data model and evaluate local and Google Drive persistence.
- [ ] Build an accessible, responsive Checklist page with relevant tests.
- [ ] Expose the Checklist navigation item after the feature is release-ready.

## Chunk 2: Artifacts Inventory

- [ ] Define typed artifact data, owned-artifact fields, images, and validation from the game source.
- [ ] Add owned-artifact create, edit, delete, reset, local persistence, and mutation timestamps.
- [ ] Build the Artifacts page with cards, search, filters, empty states, and accessible forms.
- [ ] Add Drive backup selection, legacy defaults, conflict metadata/UI, and behavioral tests.
- [ ] Expose the Artifacts navigation item after the page is release-ready.

## Chunk 3: Equipments Inventory

- [ ] Define typed equipment data, owned-equipment fields, slot categories, images, and validation from the game source.
- [ ] Add owned-equipment create, edit, delete, reset, local persistence, and mutation timestamps.
- [ ] Build the Equipments page with cards, search, filters, empty states, and accessible forms.
- [ ] Add Drive backup selection, legacy defaults, conflict metadata/UI, and behavioral tests.
- [ ] Expose the Equipments navigation item after the page is release-ready.

## Chunk 4: Loadout Inventory Integration

- [ ] Confirm artifact and equipment reuse/uniqueness rules before changing the loadout schema.
- [ ] Add one artifact and four equipment references to each character slot, with legacy defaults.
- [ ] Add owned-item card pickers, filtering, assignment, replacement, and clearing to the loadout dialog.
- [ ] Render assigned items in loadout cards and share-image previews; keep missing records safe.
- [ ] Cover persistence migration, Drive compatibility, validation, responsive layout, and user flows with tests.
- [ ] Show Artifact and Equipment slots in production after their complete vertical slices ship.

## Release Checklist

- [ ] Update this roadmap and relevant tests in the implementation change.
- [ ] Verify `pnpm test`, `pnpm check`, `pnpm format:check`, and `pnpm build`.
- [ ] Include screenshots or recordings for visible UI work; merging to `main` deploys automatically.
