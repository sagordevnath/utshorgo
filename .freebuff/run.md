# Utshorgo — run doc

Monorepo: Express API (`server/`) + React/Vite client (`client/`) run together by the root `dev` script.

## Reproduce artifacts

1. Install workspace dependencies (root):
   ```
   npm install
   ```
   This installs both workspaces (client + server) plus `concurrently`.
2. Environment: **no `.env` files are required.** With no Supabase credentials the API
   automatically serves seed data in memory (`demo` mode) — this is the supported default.
   To go live later: create `server/.env` from `server/.env.example`
   (copy the template from the main checkout, fill in your own Supabase URL/keys),
   run the SQL in `supabase/schema.sql` in the Supabase SQL editor, then `npm run seed`.
3. No other build artifacts are needed for dev mode (Vite compiles on the fly).

## Run the server

From the repo root:
```
npm run dev
```

That starts both processes via `concurrently`:

| Service | URL | Notes |
|---|---|---|
| Client (Vite) | http://localhost:5173 | Dev server; proxies `/api` to :4000 |
| API (Express) | http://localhost:4000 | `/api/health` reports `{"ok":true,"mode":"demo"}` |

Notes:
- The environment may set `PORT=0`; `server/src/index.js` falls back to 4000 in that case
  (`Number(PORT) || 4000`), so the Vite proxy target stays valid.
- For detached preview runs, start with PowerShell `Start-Process` on `npm.cmd`,
  redirecting stdout and stderr to **different** files, then verify the pid with `Get-Process`.
