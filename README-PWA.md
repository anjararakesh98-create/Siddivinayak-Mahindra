# Siddhivinayak Mahindra PWA files

This package adds installable PWA support to the existing single-file app. It does not change the Supabase project, schema, Edge Functions, or app data logic.

## GitHub Pages upload

Upload/replace these paths in the repository root (keep folders):
- `index.html` (replace existing)
- `manifest.webmanifest` (new)
- `sw.js` (new)
- `icons/icon-192.png` (new)
- `icons/icon-512.png` (new)

Commit to `main` and wait for GitHub Pages deployment. Open the existing GitHub Pages URL over HTTPS and hard-refresh.

## Install
- Android Chrome: open the site, use the browser menu and choose **Install app** / **Add to Home screen** when offered.
- Desktop Chrome/Edge: use the install icon in the address bar or browser menu.

## Important limits
The PWA shell can open from cache, but login, Supabase data, employee actions, Excel uploads, and sync still require an internet connection. Supabase/API responses are intentionally not cached. Offline stock editing/sync is not implemented, to avoid stale or conflicting stock records.
