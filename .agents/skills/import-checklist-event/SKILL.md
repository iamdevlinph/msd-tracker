---
name: import-checklist-event
description: Import or update official limited checklist events in MSD Tracker from pasted notices or official event-page URLs, and maintain expired event records. Use when adding, correcting, dry-running, or removing records in src/data/events/EVENTS_DATA.ts from published event information.
---

# Import Checklist Event

Convert official notices into validated `ChecklistEvent` records without inferring unpublished schedule details.

## Gather evidence

1. Read `AGENTS.md`, `PLANS.md`, `src/data/events/EVENTS_DATA.ts`, `src/data/checklist/CHECKLIST_DATA.ts`, and the focused dataset and UTC scheduling tests.
2. Use pasted notice text directly. For an official URL, retrieve the official page when tools and access permit. Ask for the pasted notice when the page is inaccessible or omits required details.
3. Extract and keep distinct:
   - notice title;
   - separately trackable event title;
   - exact start and end instants in UTC;
   - participation channel, including Discord when published;
   - each recurring participation or claim window.
4. Stop for clarification when the year, timezone, inclusive boundary, recurrence, or grouping into independently trackable records is ambiguous. Never guess from similar events.

## Derive records

- Use `daily` only for published daily participation or claim windows and `weekly` only when explicitly published. Otherwise use `none`.
- Omit `recurrenceStartAt` for the default `00:00 UTC` daily boundary. Set it to a full UTC ISO instant when the published recurring boundary differs. Preserve the event's separately published `startAt` and `endAt`.
- Preserve an existing record's `id` when updating it.
- For a new record, derive a stable unique ID from the official URL identifier when available; otherwise slugify the event title. Check uniqueness in the complete dataset.
- Keep one record per separately completable checklist concern. Do not split a notice solely because it has multiple prose sections.
- Do not add an event whose `endAt` is less than or equal to the current UTC instant unless the user explicitly requests historical retention.

## Maintain expiry

On every import, compare the current UTC instant with every limited record in `EVENTS_DATA`. Remove records whose `endAt` is less than or equal to now, and report each removed record's ID, title, and end time.

Apply this cleanup only to official limited events in `EVENTS_DATA`. Never remove permanent activities or player-created events, and never modify completion records; completion keys for removed definitions remain inert.

## Apply or dry-run

Default to editing `src/data/events/EVENTS_DATA.ts`. If the user explicitly requests a dry run, make no edits and report proposed additions, updates, and removals as complete `ChecklistEvent` objects or concise diffs, plus any unresolved questions.

After editing:

1. Update focused dataset and synthetic scheduling tests when the imported schedule introduces a new contract. Do not bind scheduling behavior tests to live limited records.
2. Update the checklist section of `PLANS.md` when the imported event represents durable product status or changes an existing decision.
3. Run the focused event/checklist tests, then the repository checks required by `AGENTS.md`.
4. Report source evidence, added or updated IDs, every expiry removal, verification, and whether any completion key may need to be checked again after a corrected reset anchor.
