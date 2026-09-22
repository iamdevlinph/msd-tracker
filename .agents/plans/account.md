# Account Plan

Read this plan for account, authentication, Google Drive backup, sync, conflict, or recovery behavior. Do not load it for unrelated feature work that does not affect persistence or accounts. Also read every affected feature plan when Drive or account work changes that feature's durable data or behavior.

## Account

- [x] Serialize Google Drive uploads with latest-state-wins queuing, bounded retry, recoverable failure status, monotonic local revisions, unload protection, and generation-safe conflict handling.
- [x] Renew expired Google access tokens for Drive requests, replay one unauthorized request, refresh before manual Retry Sync, harden invalid session responses, and expose the Cloudflare diagnostic marker in Account failure state (verified with focused sync/auth tests and repository checks).
- [x] Isolate MSD Google Drive backups under `msd-tracker-state.json`, migrate legacy `state.json` files in place, prefer the canonical file, and surface safe Drive operation/status failures in Account.
- [x] Highlight the newer backup date and larger serialized size independently when choosing between local and Google Drive copies during a sync conflict.
- [x] Resolve Google Drive conflicts atomically with transient conflict state, guarded Drive responses, deduplicated sync lifecycle, and exact remote-copy restoration.
- [x] Offer an explicit Keep Local recovery upload when the canonical Drive backup is unreadable, preserving the local dataset and retrying safely on upload failure.
- [x] Confirmation dialogs for destructive data-clearing actions are implemented; automated behavior verification is pending.
- [x] Link to the public GitHub repository from the Account page.
