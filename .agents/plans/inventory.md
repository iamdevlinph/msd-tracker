# Inventory Plan

Read this plan for Characters, Monsterlings, Artifacts, or Equipment inventory work. Do not load it for unrelated account, checklist, site-experience, or loadout-only work. Also read the account plan when durable inventory or Drive behavior changes, and the loadouts plan when inventory integration changes.

## Characters: Available

- [x] Add Isabella as a Tier 5 Ice Destroyer with her catalog images.
- [x] Add the Version 1.4 Esther and Sangun costume portraits.
- [x] Add Brisshell as a Tier 5 Earth Assassin with her catalog images.
- [x] Stage Vivian and her signature artifact as hidden catalog records outside local development, with local-development catalog counts, until official metadata is available.
- [x] Filter owned and selectable characters by Tier 4 and Tier 5.
- [x] Sort owned characters by name or awakening level in either direction.
- [x] Show owned/total roster progress and disable additions when every character is owned.
- [x] Highlight max-level skills in green so awakening styling never obscures a stored level 12.
- [x] Place Characters first in the Inventory navigation section.
- [x] Add portrait-selectable Mina, Jiwon, and Ophelia costumes with hidden-catalog development navigation details.

## Monsterlings: Available

- [x] Add Nagi as Muwon No. 166 with unresolved element and source fields, and Sector 3 through No. 193 with 27 images, including the Ortus Dog icon for No. 182 and mutation-only Oblivion at No. 193; finalize unresolved fields only when explicitly supplied, show pending-field annotations only in development, maintain confirmed mutation recipes, and retain the remaining icon as a development-only Codex tab.
- [x] Add Sorin as Legendary Monsterling No. 2 with its catalog image.
- [x] Search owned monsterlings by name and filter them across Tier 1 through Tier 5.
- [x] Track one shared, editable Link Chain Level per capable Monsterling species across owned copies, forms, portraits, loadouts, local migrations, and Drive backups; saving a species corrects its exact level (with level one implicit), levels survive copy deletion and owned-data resets, with verified names, triggers, and effects.
- [x] Manage every Link Chain-capable species on a dedicated searchable, level-filterable page, with portrait-driven level editing independent of Monsterling ownership.
- [x] Group Link Chain rows by immutable unlock level in ascending order after search and upgrade-level filters, using optional in-game sort order before alphabetical fallback within each row.
- [x] Pin Link Chain Monsterlings into a dedicated section before Level 1, with a clear empty state and Drive-backed persistence.
- [x] Show the shared Link Chain badge in the Monsterling form preview for eligible species without mutating shared levels.
- [x] Add the confirmed upcoming Link Chain roster: Level 9 Nagi (Tier 4) between Custos and Moon Shadow Lupe; append Level 20 Sorin (Tier 5) after the existing entries without changing their order; Level 31 Colossus (Tier 3), Scrap Hoarder (Tier 4), Blue Shadow (Tier 5); Level 32 Garbinator (Tier 4), Colossus Alter (Tier 3), Clean Horde (Tier 4); Level 33 Macrodon (Tier 3), Ragnadon (Tier 3), Silbinator (Tier 4); Level 34 Fidelis Raptor (Tier 4), The Great Unknown (Tier 5), Whitelon (Tier 4), Altus Raptor (Tier 4); and Level 35 Oblivion (Tier 5). Exact trigger, effect, and bonus-effect details are deferred.
- [x] Group Monster Codex and Link Chains under a Monsterlings navigation section after Inventory.
- [x] Open accessible Monster Codex detail dialogs from cards with mutation-first navigation and source-only fallback, show published abilities and dialog-contained, independently scrollable, drag-to-pan reverse-hierarchy mutation trees with occurrence-based shared-ingredient duplication, automatically framed selected recipes, subtree centering, final mutations above their paired ingredients, straight connectors, and stacked navigation, use full-width source accordions with capture-only location placeholders, hide unavailable mutation tabs, and filter by multiple source categories with OR semantics.
- [x] Show a detached close-all control for stacked Monster Codex dialogs while keeping X and Escape navigation level-aware.

## Chunk 2: Artifacts Inventory

- [x] Add Isabella's Tier 5 Ice Destroyer artifact, Stabilized Superconductor.
- [x] Add Brisshell's Tier 5 Earth Assassin artifact, Monstrous Longing.
- [x] Define typed artifact data, owned-artifact fields, images, and validation from the game source.
- [x] Add owned-artifact create, edit, delete, reset, local persistence, and mutation timestamps.
- [x] Build the Artifacts page with cards, search, filters, empty states, and accessible forms.
- [x] Keep artifact cards fixed-size with tier frames and fusion shields; use card-driven editing with a shared add/edit form and compact controls.
- [x] Add Drive backup selection, legacy defaults, conflict metadata/UI, and behavioral tests.
- [x] Expose the Artifacts navigation item after the page is release-ready.
- [x] Sort artifact catalogs, owned copies, and loadout picker results with Tier 5 artifacts first.

## Chunk 3: Equipment Inventory

The read-only equipment reference catalog is tracked in the Assets plan. This section owns player inventory only.

- [ ] Define owned-equipment fields on top of the typed equipment catalog, slot categories, images, and validation from the game source.
- [ ] Add owned-equipment create, edit, delete, reset, local persistence, and mutation timestamps.
- [ ] Add owned-equipment management controls and accessible forms to the Equipment catalog.
- [ ] Add Drive backup selection, legacy defaults, conflict metadata/UI, and behavioral tests.
