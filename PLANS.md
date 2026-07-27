# Product Plans

Keep this checklist aligned with repository behavior. Check off work in the same change that implements it.

## Characters: Available

- [x] Filter owned and selectable characters by Tier 4 and Tier 5.
- [x] Sort owned characters by name or awakening level in either direction.
- [x] Show owned/total roster progress and disable additions when every character is owned.

## Monsterlings: Available

- [x] Search owned monsterlings by name and filter them across Tier 1 through Tier 5.
- [x] Track one shared Link Chain Level per capable Monsterling species across owned copies, forms, portraits, loadouts, local migrations, and Drive backups, with verified names, triggers, and effects.

## Loadouts: Available

- [x] Expose Loadouts in production navigation.
- [x] Create, edit, duplicate, delete, copy, and download team loadouts; preview them from any non-button card area.
- [x] Offer detailed and compact monsterling stat-label share previews.
- [x] Require three unique owned characters selected through searchable, filterable character cards.
- [x] Assign three regular and one legendary owned monsterling per character through searchable, multi-tier-filterable cards, with regular-slot swapping and moving within a character.
- [x] Auto-name new loadouts from their first character and brand generated images with the site URL.
- [x] Persist loadouts locally and through Google Drive sync.
- [x] Hide unfinished Artifact and Equipment slots outside development.

## Home Dashboard: Available

- [x] Welcome users and link the available tracker features.
- [x] Show linked counts for owned characters, owned monsterlings, cleared codex entries, and loadouts.
- [x] Preview planned Checklist, Artifact, Equipment, and complete Loadout features.

## SEO: Available

- [x] Add player-focused titles, descriptions, canonicals, social metadata, and visible H1 copy for public tracker pages.
- [x] Use `<Page> - Mongil: Star Dive Tracker` route titles with concise page-specific H1 copy.
- [x] Prevent unfinished and account routes from being indexed.
- [x] Publish a sitemap, crawler directive, branded manifest, and home WebSite structured data.

## Shared UI: Available

- [x] Provide clear buttons and Escape-to-clear behavior for standalone search inputs.

## Account

- [x] Highlight the newer timestamp when choosing between local and Google Drive copies during a sync conflict.
- [ ] Confirmation dialogs for destructive data-clearing actions are implemented; automated behavior verification is pending.

## Chunk 1: Checklist and Event Tracking

- [x] Keep checklist orchestration, task-form conversion, reset anchors, and persisted normalization maintainable without changing reset, sync, completion, or accessibility behavior (verified with focused tests, repository checks, and a production build).
- [x] Use single-check completion indicators, switch completed actions to undo, hide disabled category filters while keeping All available, and align toolbar controls with shared page button styling.

- [x] Define typed limited events with non-displayed notice-title metadata, UTC source timestamps, recurring reset schedules, expiry behavior, and player-created UTC Start/End times verified across daily and weekly UTC boundaries.
- [x] Add the 100-Day Anniversary Check-In Pass and Bonus Time daily event schedules using their published UTC periods.
- [x] Add the First Summer Dive event set and Cool Summer Vacation login reward using their published UTC periods and explicit daily-reset behavior.
- [x] Show Event alongside Daily or Weekly badges when an event also has a recurring reset, and show expired rows by default with reduced opacity and struck-through names.
- [x] Show player-created Task and Event notes beneath item names with a compact two-line limit.
- [x] Track Request Board as a permanent daily activity resetting at 00:00 UTC.
- [x] Keep single occurrence checks and grouped full-event checks, sort non-completed before completed and then by event > permanent > custom and weekly > daily > other, and show reset/End countdowns beside status.
- [ ] Design the durable checklist data model and evaluate local and Google Drive persistence.
- [ ] Build an accessible, responsive Checklist page with compact horizontal event and task rows, plus relevant tests.
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
