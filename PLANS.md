# Product Plans

Keep this checklist aligned with repository behavior. Check off work in the same change that implements it.

## Characters: Available

- [x] Filter owned and selectable characters by Tier 4 and Tier 5.
- [x] Sort owned characters by name or awakening level in either direction.
- [x] Show owned/total roster progress and disable additions when every character is owned.
- [x] Highlight max-level skills in green so awakening styling never obscures a stored level 12.
- [x] Place Characters first in the Inventory navigation section.

## Monsterlings: Available

- [x] Search owned monsterlings by name and filter them across Tier 1 through Tier 5.
- [x] Track one shared, editable Link Chain Level per capable Monsterling species across owned copies, forms, portraits, loadouts, local migrations, and Drive backups; saving a species corrects its exact level (with level one implicit), levels survive copy deletion and owned-data resets, with verified names, triggers, and effects.
- [x] Manage every Link Chain-capable species on a dedicated searchable, level-filterable page, with portrait-driven level editing independent of Monsterling ownership.
- [x] Group Link Chain rows by immutable unlock level in ascending order after search and upgrade-level filters, using optional in-game sort order before alphabetical fallback within each row.
- [x] Pin Link Chain Monsterlings into a dedicated section before Level 1, with a clear empty state and Drive-backed persistence.
- [x] Show the shared Link Chain badge in the Monsterling form preview for eligible species without mutating shared levels.
- [x] Group Monster Codex and Link Chains under a Monsterlings navigation section after Inventory.

## Loadouts: Available

- [x] Expose Loadouts in production navigation.
- [x] Create, edit, duplicate, delete, and copy team loadouts; preview them from any non-button card area and keep the currently unused image-download action hidden.
- [x] Offer detailed and compact monsterling stat-label share previews.
- [x] Toggle Monsterlings between cropped stat-icon cards and full stat strips while keeping portraits aligned with visible equipment.
- [x] Save loadout-specific notes from direct card and preview actions, with the loadout name shown in the notes dialog; keep the More dropdown deferred until it has additional actions.
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
- [x] Default-hide equipment in loadout previews and exports with a one-row character/artifact/Monsterling layout toggle.
- [x] Keep dialog state, selectors, previews, and saved-card tiles in focused feature-owned files without changing loadout behavior (verified with focused tests, repository checks, and a production build).
- [x] Track loadout editing, picker, slot, preview, entity-editor, image-copy, and image-download actions in GA4 without names, IDs, search text, or raw errors.
- [x] Preselect the current character class when opening the loadout artifact picker while keeping all artifact filters editable.
- [x] Match selection picker height to the 888px loadout editor height while keeping shorter viewports bounded and scrollable.
- [x] Capture immutable, tagged loadout snapshots with frozen build data; list, search, filter, sort, preview, copy, delete, reset, and Drive-sync them with creation metadata, tier-framed character portraits, and read-only preview hover styling distinct from editable loadouts.

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
- [x] Focus the active collection or picker search with Ctrl+K or Cmd+K and show the platform shortcut in its placeholder.
- [x] Copy or download fixed-layout images of the filtered Characters, Monsterlings, and Artifacts collections with filter context and site branding.
- [ ] Standardize character, Monsterling, codex, and picker collections on fixed-width, left-to-right product grids with consistent gaps and left-aligned incomplete rows across breakpoints.

## Account

- [x] Highlight the newer backup date and larger serialized size independently when choosing between local and Google Drive copies during a sync conflict.
- [x] Confirmation dialogs for destructive data-clearing actions are implemented; automated behavior verification is pending.
- [x] Link to the public GitHub repository from the Account page.

## Chunk 1: Checklist and Event Tracking

- [x] Keep checklist orchestration, focused row and page components, task-form conversion, reset anchors, and persisted normalization colocated under the checklist feature without changing reset, sync, completion, analytics, or accessibility behavior (verified with focused tests, repository checks, and a production build).
- [x] Use single-check completion indicators, switch completed actions to undo, hide disabled category filters while keeping All available, and align toolbar controls with shared page button styling.

- [x] Define typed limited events with non-displayed notice-title metadata, UTC source timestamps, recurring reset schedules, expiry behavior, and player-created UTC Start/End times verified across daily and weekly UTC boundaries.
- [x] Version completion keys independently from schedule changes, add the Monster Race permanent reset, and mark Discord participation on its two notice entries.
- [x] Share completion version 2 between Dimensional Rift and seasonal activities; increment it manually for official refreshes without adding seasonal recurrence or countdown behavior.
- [x] Default new player-created Task and Event starts to the current UTC date at 00:00 while preserving saved times when editing.
- [x] Add the 100-Day Anniversary Check-In Pass and Bonus Time daily event schedules using their published UTC periods.
- [x] Add the First Summer Dive event set and Cool Summer Vacation login reward using their published UTC periods and explicit daily-reset behavior.
- [x] Retire the July 28 event set and add the Mabel and Discord events using the completed maintenance time and published UTC periods.
- [x] Show Event alongside Daily or Weekly badges when an event also has a recurring reset, and show expired rows by default with reduced opacity and struck-through names.
- [x] Distinguish event rows with daily teal, weekly violet, one-time fuchsia, and Discord blue gradients; align their badges while reserving amber row styling for ending-soon status and destructive styling for overdue items.
- [x] Show player-created Task and Event notes beneath item names with a compact two-line limit.
- [x] Add editable 500-character notes to permanent checklist items, persisted locally and through Google Drive.
- [x] Track Request Board as a permanent daily activity resetting at 00:00 UTC.
- [x] Keep single occurrence checks and grouped full-event checks, sort non-completed before completed and then by event > permanent > custom and weekly > daily > other, and show reset/End countdowns beside status.
- [x] Sort same-group checklist events by upcoming start time, then active or ending-soon end time, before alphabetical fallback.
- [x] Show occurrence and full-event completion controls for daily events, while non-daily events use only one full-event completion control for their full duration.
- [x] Design the durable checklist data model and evaluate local and Google Drive persistence.
- [x] Build an accessible, responsive Checklist page with compact horizontal event and task rows, plus relevant tests.
- [x] Separate incomplete and completed checklist items with a labeled divider that follows the Show completed preference.
- [x] Group expired checklist items in the completed section while preserving their expired styling and visibility preference.
- [x] Expose the Checklist navigation item after the feature is release-ready.

## Chunk 2: Artifacts Inventory

- [x] Define typed artifact data, owned-artifact fields, images, and validation from the game source.
- [x] Add owned-artifact create, edit, delete, reset, local persistence, and mutation timestamps.
- [x] Build the Artifacts page with cards, search, filters, empty states, and accessible forms.
- [x] Keep artifact cards fixed-size with tier frames and fusion shields; use card-driven editing with a shared add/edit form and compact controls.
- [x] Add Drive backup selection, legacy defaults, conflict metadata/UI, and behavioral tests.
- [x] Expose the Artifacts navigation item after the page is release-ready.
- [x] Sort artifact catalogs, owned copies, and loadout picker results with Tier 5 artifacts first.

## Chunk 3: Equipments Inventory

- [ ] Define typed equipment data, owned-equipment fields, slot categories, images, and validation from the game source.
- [ ] Add owned-equipment create, edit, delete, reset, local persistence, and mutation timestamps.
- [ ] Build the Equipments page with cards, search, filters, empty states, and accessible forms.
- [ ] Add Drive backup selection, legacy defaults, conflict metadata/UI, and behavioral tests.
- [ ] Expose the Equipments navigation item after the page is release-ready.

## Chunk 4: Loadout Inventory Integration

- [x] Assign one unique owned-artifact copy per character slot, with legacy local and Drive defaults.
- [x] Add artifact filtering, assignment, replacement, clearing, cards, previews, exports, safe missing-record handling, and editor links.
- [x] Show completed Artifact slots in production.
- [x] Add four equipment references to each character slot, with legacy local and Drive defaults.
- [x] Add catalog equipment filtering, assignment by part type, replacement, clearing, cards, previews, exports, validation, analytics, and behavioral tests.
- [x] Show completed Equipment slots in production while keeping owned Equipment inventory deferred.

## Release Checklist

- [x] Update this roadmap and relevant tests in the implementation change.
- [x] Verify `pnpm test`, `pnpm run check`, and `pnpm build`.
