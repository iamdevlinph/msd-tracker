---
name: google-drive-backup
description: Maintain Google Drive backups for durable Zustand user data in MSD Tracker. Use when adding, changing, renaming, or removing durable store fields; changing backup selection or legacy normalization; updating backup timestamps; or changing sync-conflict metadata and UI.
---

# Google Drive Backup

Treat Google Drive backup as an explicit allowlist. Zustand persistence does not add fields to Drive automatically.

## Decide Eligibility

- Sync user-created or configured data expected to survive device changes or local-storage loss.
- Keep transient UI state, hydration flags, authentication/session data, and rebuildable caches out of the backup.
- Ask the user before including or omitting a durable field when intent is unclear.

## Update the Contract

1. Read the owning store slice, `src/stores/app-store.ts`, `src/components/account/google/utils/drive-sync.ts`, and the sync-conflict components and tests before editing.
2. Add a backward-compatible initial value for new durable state. Preserve existing persisted and remote backups when fields are missing.
3. Update every user mutation, deletion, and reset for the field to set `backupUpdatedAt: Date.now()`. Do not bump the timestamp for hydration, remote restore, or transient sync state.
4. Add the field to `Backup` and `select(...)` in `drive-sync.ts`. Keep auth tokens, sync flags, and actions out of the payload.
5. Normalize missing legacy download data to a safe default. Treat field removal or renaming as a compatibility change and provide an explicit migration path.
6. Extend `StoreState["syncConflict"]`, both local and remote metadata builders, and `SyncCopyCard` with a useful summary when the new data should help users choose a copy.
7. Verify that keeping the remote copy restores the field and keeping the local copy uploads it.

## Verify Behavior

- Test that `select(...)` includes the field and excludes unrelated state.
- Test legacy downloads with the field absent.
- Test create, edit, delete, and reset actions update `backupUpdatedAt`.
- Test local and remote conflict metadata plus conflict-card rendering when changed.
- Mock Google Drive, session storage, timers, and browser boundaries; never use live tokens or remote files in tests.
- Run the smallest affected Vitest files first, then the repository's broader `pnpm test`, `pnpm check`, `pnpm format:check`, and `pnpm build` checks for shared-state changes.

Keep database, dependency, deployment, secret-handling, and destructive-operation restrictions in `AGENTS.md` authoritative.
