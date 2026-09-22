# Loadouts Plan

Read this plan for Loadouts, portable code sharing, snapshots, previews, exports, or inventory integration. Do not load it for unrelated standalone inventory, checklist, account, or site-experience work. Also read the inventory plan when owned entities or catalog integration changes, and the account plan when durable or Drive-backed loadout data changes.

## Loadouts: Available

- [x] Expose Loadouts in production navigation.
- [x] Create, edit, duplicate, delete, and copy team loadouts; preview them from any non-button card area and keep the currently unused image-download action hidden.
- [x] Offer detailed and compact monsterling stat-label share previews.
- [x] Toggle Monsterlings between cropped stat-icon cards and full stat strips while keeping portraits aligned with visible equipment.
- [x] Save loadout-specific notes from direct card and preview actions, with the loadout name shown in the notes dialog and a notification dot on card and preview actions when meaningful notes are saved; keep the More dropdown deferred until it has additional actions.
- [x] Record eight character build stats, pin up to five per character in canonical editor order (ATK, HP, Crit Rate, Crit DMG, DMG Boost Boss, Special Skill CD, Elemental Weakness, Element ATK), defaulting pins to ATK, Crit Rate, Crit DMG, Special Skill CD, and Element ATK, and show pinned values beside element, awakening, and skill levels in previews.
- [x] Require three unique owned characters selected through searchable, filterable character cards.
- [x] Assign three regular and one legendary owned monsterling per character through searchable, multi-tier-filterable cards, with regular-slot swapping and moving within a character.
- [x] Auto-name new loadouts from their first character and brand generated images with the site URL.
- [x] Render variant badges with export-safe solid backgrounds in generated loadout images while preserving transparent blurred badges in the app.
- [x] Keep character skill icons and levels aligned in loadout previews and generated images with a shared two-column layout and non-wrapping values.
- [x] Persist loadouts locally and through Google Drive sync.
- [x] Hide unfinished Artifact and Equipment slots outside development.
- [x] Open owned character and assigned monsterling portraits in their editors from saved loadout cards without triggering preview, and from the loadout preview modal.
- [x] Return to the originating loadout preview after canceling or saving an edit opened from that preview.
- [x] Show tier portrait frames and tier-colored backgrounds behind assigned artifacts and Monsterlings in saved loadout cards.
- [x] Keep saved loadout character tiles focused on portraits while preserving detail in previews, pickers, and editors.
- [x] Add a persisted Loadout Card Visibility setting for saved cards, with local and Google Drive defaults and accessible responsive controls.
- [x] Default-hide equipment in loadout previews and exports with a one-row character/artifact/Monsterling layout toggle.
- [x] Keep dialog state, selectors, previews, and saved-card tiles in focused feature-owned files without changing loadout behavior (verified with focused tests, repository checks, and a production build).
- [x] Track loadout editing, picker, slot, preview, entity-editor, image-copy, and image-download actions in GA4 without names, IDs, search text, or raw errors.
- [x] Preselect the current character class when opening the loadout artifact picker while keeping all artifact filters editable.
- [x] Match selection picker height to the 888px loadout editor height while keeping shorter viewports bounded and scrollable.
- [x] Capture immutable, tagged loadout snapshots with frozen build data; list, search, filter, sort, preview, copy, delete, reset, and Drive-sync them with creation metadata, tier-framed character portraits, and read-only preview hover styling distinct from editable loadouts.
- [x] Search saved loadouts by loadout or assigned character name while preserving alphabetical ordering, style snapshot category badges consistently in rows/previews/exports/dialogs, keep new snapshot names trimmed and separate from tag metadata, and prefix names only when an existing snapshot changes tags.
- [x] Add loadout notes during creation/editing and category-aware snapshot metadata, including multi-select RES Element metadata for Conquest categories, editable compact snapshot rows, direct saved-loadout actions, immutable frozen builds, and Drive-compatible legacy normalization.
- [x] Record required Conquest bosses with canonical portraits, use a fixed segmented clear-time format, and default new snapshot names to the trimmed source loadout name.
- [x] Require Rift clear times with the shared segmented control, normalize legacy Rift snapshots, and allow Normal Conquest levels through 15 while retaining level 10 caps elsewhere.
- [x] Filter snapshot lists by conditional Legendary Conquest elements or Conquest bosses with multi-select OR semantics, single-select Conquest difficulty banners, tag-aware reset behavior, extracted toolbar/predicate modules, and focused verification.
- [x] Paginate filtered and sorted loadout snapshots with selectable page sizes and accessible boundary navigation.
- [x] Emphasize loadout snapshot field values while keeping creation timestamps only in interactive preview headers.
- [x] Arrange Conquest snapshot metadata responsively in a two-column mobile, three-column small-and-up, two-row grid across saved cards, previews, and generated images, preserving reserved RES Element space and accessible Difficulty labels (verified with focused snapshot tests and repository formatting).
- [x] Add Drive-synced Settings control for equipment set-name captions and show active equipment sets with notification dots and portal effect tooltips in loadout previews.
- [x] Add Drive-synced defaults for hiding equipment and compact Monsterlings in loadout and snapshot previews and exports, with temporary preview overrides.
- [x] Show complete published equipment set effects in delayed hover/focus tooltips on picker cards, assigned editor buttons, and saved-card equipment tiles while keeping preview tooltips active-only.

## Loadout Code Sharing: Deferred

Implementation is intentionally deferred. Keep every item unchecked until the complete vertical slice is implemented and verified.

- [ ] Define a portable, versioned `MSDTL1.<base64url-json>` envelope with `kind`, `version`, loadout snapshot, and preserved extension fields. Export catalog IDs and build values—character awakening and skills, Monsterling tier, traits, and Link Chain level, and artifact fusion level—without local inventory-instance IDs or user-supplied image URLs.
- [ ] Add bounded decoding and validation that rejects malformed, oversized, wrong-kind, and unsupported-major-version codes before state mutation. Preserve unknown catalog IDs and opaque future slot or equipment extensions through local normalization, duplication, Drive sync, and re-export; migrate supported older versions while requiring an app update for newer major versions.
- [ ] Extend loadout slots with optional portable targets alongside existing owned references. Keep legacy loadouts inventory-backed, imported targets snapshot-backed, and imports independent from owned collections. Saving, editing, deleting, resetting, and importing must update `backupUpdatedAt`; Drive backup selection, legacy download normalization, conflict summaries, and local migrations must remain backward compatible.
- [ ] Add an Import Loadout Code dialog that validates pasted input, previews it without mutating state, allows renaming, then saves a new editable target loadout with a generated ID and collision-safe `Name (2)` naming before opening its preview.
- [ ] Add Copy Loadout Code actions to saved cards and previews. Export regular loadouts from current owned data, preserve imported snapshots and extensions, and refuse export with a precise error when a non-null dangling local reference cannot be reconstructed.
- [ ] Render known unowned targets with canonical portraits, encoded target stats, grayscale/reduced opacity, and accessible “Not owned” text. Determine ownership by catalog identity rather than exact stats, continue showing shared target stats, prefer exact owned copies and then a deterministic compatible copy for editor links, and render unknown IDs with safe generic visuals and fallback names until catalog data becomes available.
- [ ] Keep imported targets editable without creating fake inventory: unresolved targets remain intact until explicitly cleared or replaced, replacing one with owned inventory converts only that slot to an owned reference, and duplication, image export, deletion, and code re-export preserve unresolved targets.
- [ ] Add import/export attempt, success, and failure analytics without codes, names, catalog contents, clipboard values, or raw errors. Cover codec round trips, Unicode, invalid input, unknown IDs/extensions, migrations, Drive round trips, backup timestamps, preview-before-save, collision naming, ownership resolution, target editing, dangling exports, clipboard failures, image rendering, and accessibility; finish with focused suites, `pnpm test`, `pnpm run check`, `pnpm build`, `git diff --check`, and owned/partially-unowned/unknown-target screenshots.

## Chunk 4: Loadout Inventory Integration

- [x] Show exact-instance loadout usage on owned Monsterling and Artifact cards with deduplicated character portrait stacks and complete hover/focus details, without affecting pickers, forms, previews, exports, snapshots, or persisted data.
- [x] Assign one unique owned-artifact copy per character slot, with legacy local and Drive defaults.
- [x] Add artifact filtering, assignment, replacement, clearing, cards, previews, exports, safe missing-record handling, and editor links.
- [x] Show completed Artifact slots in production.
- [x] Add four equipment references to each character slot, with legacy local and Drive defaults.
- [x] Add catalog equipment filtering, assignment by part type, replacement, clearing, cards, previews, exports, validation, analytics, and behavioral tests.
- [x] Show completed Equipment slots in production while keeping owned Equipment inventory deferred.
- [x] Add the 14 Prime equipment variants and published set effects from the catalog reference.
