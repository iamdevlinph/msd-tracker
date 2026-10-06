# Site Experience Plan

Read this plan for Home, SEO, navigation-wide presentation, or Shared UI behavior. Do not load it for feature-local work that does not change these cross-site concerns. Also read each affected feature plan when Shared UI or navigation changes alter feature behavior or presentation.

## Home Dashboard: Available

- [x] Welcome users and link the available tracker features.
- [x] Show linked counts for owned characters, owned monsterlings, cleared codex entries, and loadouts.
- [x] Hide the optional roadmap section when no upcoming features are configured.
- [x] Link the public Equipment catalog from the Home feature grid without adding an ownership statistic.

## SEO: Available

- [x] Add player-focused titles, descriptions, canonicals, social metadata, and visible H1 copy for public tracker pages.
- [x] Use `<Page> - Mongil: Star Dive Tracker` route titles with concise page-specific H1 copy.
- [x] Prevent unfinished and account routes from being indexed.
- [x] Publish a sitemap, crawler directive, branded manifest, and home WebSite structured data.
- [x] Publish the Equipment catalog through public metadata and the sitemap.

## Navigation: Available

- [x] Group the public Equipment catalog under Assets between Inventory and Monsterlings.

## Shared UI: Available

- [x] Provide clear buttons and Escape-to-clear behavior for standalone search inputs.
- [x] Use reusable `FilterButtonGroup` and `FilterToggleButton` controls for selectable collection dimensions, with labelled plain button groups for sort and standalone Clear actions.
- [x] Focus the active collection or picker search with Ctrl+K or Cmd+K and show the platform shortcut in its placeholder.
- [x] Copy or download fixed-layout images of the filtered Characters, Monsterlings, Artifacts, and pinned Link Chains collections with filter context and site branding.
- [ ] Standardize character, Monsterling, codex, and picker collections on fixed-width, left-to-right product grids with consistent gaps and left-aligned incomplete rows across breakpoints.
