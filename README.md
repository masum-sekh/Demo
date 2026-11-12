# Task Track

Task Track is an offline-first React study time tracker built with Vite. It stores subjects, sessions, and preferences in the current browser profile using IndexedDB. No account or data server is required.

## Run locally

Install dependencies with `npm install`, then run `npm run dev` and open the local URL Vite prints. Create a production bundle with `npm run build`; preview it with `npm run preview`. The service worker caches the application shell and resources as they are loaded, for offline use after the first visit.

## Included

- Stopwatch and fixed-duration timer with recovery-aware, timestamp-based timing
- Subject management, color customization, and local session history
- Monthly calendar, day details, editing, deletion, and past-session entry
- Weekly scores, daily breakdown, history, and week comparison
- Light, dark, and system themes, local JSON backup and CSV export

Study data remains in local browser storage. Browser/device shutdown, storage clearing, or profile changes can affect access to records; export a backup from Settings when needed.
