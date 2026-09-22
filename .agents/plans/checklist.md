# Checklist Plan

Read this plan for checklist behavior, permanent activities, limited events, player-created tasks/events, scheduling, completion, or checklist event imports. Do not load it for unrelated inventory, loadout, account, or site-experience work. Also read the account plan when durable checklist or Drive behavior changes.

## Chunk 1: Checklist and Event Tracking

- [x] Keep checklist orchestration, focused row and page components, task-form conversion, fixed-daily reset anchors at 00:00 UTC by default with published reset exceptions, and persisted normalization colocated under the checklist feature without changing rolling, weekly, interval, sync, completion, analytics, or accessibility behavior (verified with focused tests, repository checks, and a production build).
- [x] Use single-check completion indicators, switch completed actions to undo, hide disabled category filters while keeping All available, and align toolbar controls with shared page button styling.

- [x] Define typed limited events with non-displayed notice-title metadata, UTC source timestamps, recurring reset schedules, expiry behavior, and player-created UTC Start/End times verified across daily and weekly UTC boundaries.
- [x] Version completion keys independently from schedule changes, add the Monster Race permanent reset, and mark Discord participation on its two notice entries.
- [x] Share the current game version between Dimensional Rift, seasonal activities, and rebuildable stat-option caches; increment it manually for official refreshes without adding seasonal recurrence or countdown behavior.
- [x] Default new player-created Task and Event starts to the current UTC date at 00:00 while preserving saved times when editing.
- [x] Add the 100-Day Anniversary Check-In Pass and Bonus Time daily event schedules using their published UTC periods.
- [x] Add the First Summer Dive event set and Cool Summer Vacation login reward using their published UTC periods and explicit daily-reset behavior.
- [x] Retire the July 28 event set and add the Mabel and Discord events using the completed maintenance time and published UTC periods.
- [x] Import official checklist notices, including the Brisshell event set with official source links and verified metadata, using the project skill; preserve published non-midnight reset boundaries; and remove expired limited events during each import without changing completion records.
- [x] Show Event alongside Daily or Weekly badges when an event also has a recurring reset, and hide expired events at the shared checklist view boundary.
- [x] Distinguish event rows with daily teal, weekly violet, one-time fuchsia, and Discord blue gradients; align their badges; dim upcoming official and player-created events to 40% opacity without dimming upcoming custom tasks; and reserve amber row styling for ending-soon status and destructive styling for overdue items (verified with focused checklist tests).
- [x] Show player-created Task and Event notes beneath item names with a compact two-line limit.
- [x] Add editable 500-character notes to permanent checklist items, persisted locally and through Google Drive.
- [x] Track Request Board as a permanent daily activity resetting at 00:00 UTC.
- [x] Keep single occurrence checks and grouped full-event checks, sort non-completed before completed and then by event > permanent > custom and weekly > daily > other, and show reset/End countdowns beside status.
- [x] Sort same-group checklist events by upcoming start time, then active or ending-soon end time, before alphabetical fallback.
- [x] Show occurrence and full-event completion controls for daily events, while non-daily events use only one full-event completion control for their full duration.
- [x] Design the durable checklist data model and evaluate local and Google Drive persistence.
- [x] Build an accessible, responsive Checklist page with compact horizontal event and task rows, plus relevant tests.
- [x] Separate incomplete and completed checklist items with a labeled divider that follows the Show completed preference.
- [x] Hide expired official and player-created events at the shared checklist view boundary while preserving stored tasks and completion keys.
- [x] Independently control ordinary and fully completed checklist visibility, with legacy local and Drive preferences defaulting to visible.
- [x] Expose the Checklist navigation item after the feature is release-ready.
- [x] Use the shared compact collection empty state titled “No ongoing or upcoming items.” for history-only, hidden-history, and disabled-category empty results, with a visible “Completed” separator before retained completed history.
