# Utshorgo — Reseller-First Marketplace

A production-grade marketplace web app built from the Phase 1–3 design specs: **React 18 + TypeScript** frontend, **Node.js (Express)** API server, and **Supabase** database — with a zero-config demo mode so it runs instantly without credentials.

![stack](https://img.shields.io/badge/React-18-blue) ![stack](https://img.shields.io/badge/TypeScript-strict-blue) ![stack](https://img.shields.io/badge/Node-Express-green) ![stack](https://img.shields.io/badge/DB-Supabase-3ECF8E)

---

## Quick start

```bash
npm install
npm run dev
```

That's it. This starts:

| Service | URL | What it does |
|---|---|---|
| Client (Vite) | http://localhost:5173 | React SPA |
| API (Express) | http://localhost:4000 | Products, resellers, orders |

With **no Supabase credentials**, the server automatically serves rich seed data in memory (`demo` mode) — perfect for development and demos.

---

## Connect Supabase (go live with real persistence)

1. Create a project at [supabase.com](https://supabase.com)
2. Open **SQL Editor** → paste the contents of [`supabase/schema.sql`](supabase/schema.sql) → **Run**
3. Create `server/.env`:

   ```env
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```

4. Seed the catalog:

   ```bash
   npm run seed
   ```

5. Restart the server. The API health check now reports `"mode": "supabase"`.

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Run client + API together |
| `npm run dev:client` / `npm run dev:server` | Run one workspace |
| `npm run build` | Type-check + production build of the client |
| `npm run typecheck` | `tsc --noEmit` (client) + syntax check (server) |
| `npm run seed` | Upsert seed data into Supabase |

---

## Architecture

```
utshorgo/
├── client/                     # React 18 + TypeScript (Vite)
│   └── src/
│       ├── api.ts              # Typed fetch client for the Express API
│       ├── types.ts            # Shared domain models
│       ├── stores/cart.ts      # Zustand cart, localStorage-persisted
│       ├── hooks/useReveal.ts  # Scroll-reveal + count-up animations
│       ├── components/         # Header, Hero, ProductCard, CartDrawer, Toast…
│       └── pages/              # Home, Product, Checkout, Dashboard
├── server/                     # Node.js + Express API
│   └── src/
│       ├── index.js            # REST routes
│       ├── db.js               # Supabase client + demo mode fallback store
│       ├── data.js             # Seed data (shared)
│       └── seed.js             # Supabase seeding script
├── docs/                       # Phase 1–3 design specs & roadmap
└── supabase/
    └── schema.sql              # Tables, RLS policies, indexes
```

> The original static prototype (`index.html`, `app.js`, `styles.css` at the repo root) was removed after the React app replaced it; its design system lives on in `client/src/styles.css`, and its specs are preserved under `docs/`.

### API surface

| Method | Route | Description |
|---|---|---|
| GET | `/api/health` | Liveness + data mode |
| GET | `/api/products?type=&category=&search=&sort=` | Filtered catalog (`type`: product / service) |
| GET | `/api/products/:id` | Listing detail (approved only) |
| GET | `/api/resellers` | Reseller directory |
| GET | `/api/resellers/wholesale` | Wholesale price list with margins (reseller view) |
| POST | `/api/submissions` | Submit a listing for review `{ name, description, type, category, price, reseller_price, stock, … }` |
| GET | `/api/submissions?status=` | Moderation queue |
| POST | `/api/submissions/:id/moderate` | Admin approve/reject `{ decision, note? }` |
| GET | `/api/orders` | Recent orders |
| POST | `/api/orders` | Create order `{ items, total }` |

### Data flow

```
React (Zustand) ──fetch──▶ Express API ──@supabase/supabase-js──▶ Supabase Postgres
     ▲                                        │
     └──────── demo fallback when no keys ────┘
```

### Listing lifecycle

```
Seller submits (/sell) ──▶ status: pending ──▶ Admin reviews (/admin)
                                   ├── approved ──▶ live in catalog + wholesale list
                                   └── rejected ──▶ returned to seller with note
```

---

## Features

**Marketplace (buyer)**
- Products **and** services in one catalog, with Everything / Products / Services tabs
- Animated 3D hero with rotating featured listings
- Live search, category filters, and sorting (price / rating / newest)
- Product detail pages with quantity picker, related items, seller card
- Slide-in bag drawer with quantity controls; cart persists across reloads
- 3-step checkout (shipping → payment → review) with validation and confirmation screen
- Loading skeletons, 3D tilt-in scroll reveals, toast notifications

**Sellers**
- Professional submission studio (`/sell`): product or service, live preview card,
  reseller-margin calculator, inline validation
- Listings go live only after **admin approval** (`/admin` console: pending / approved / rejected queues)

**Resellers**
- Reseller Exchange (`/resellers`): members-only wholesale price list with per-listing
  margins, retail vs. wholesale columns, stock counts, Product/Service filtering
- Sellers set their reseller purchase price at submission time

**Reseller dashboard**
- Animated stat counters (revenue, orders, products, rating)
- Sales momentum bars, top-rated products, recent orders table
- Data-source indicator (demo vs. Supabase)

**Reseller dashboard**
- Animated stat counters (revenue, orders, products, rating)
- Sales momentum bars, top-rated products, recent orders table
- Data-source indicator (demo vs. Supabase)

**Platform**
- Strict TypeScript everywhere
- Graceful degradation: identical API shape in demo and Supabase modes
- Supabase schema with type/status/wholesale columns, RLS policies, full-text index
- Futuristic 3D motion system: tilt-in reveals, floating hero, orbiting accents,
  holographic gradients — all disabled under `prefers-reduced-motion`
- Responsive to 375px

---

## Roadmap (from Phase 3 docs)

- [ ] Auth (Supabase Auth: buyer / reseller / admin roles)
- [ ] Storefront builder (drag-and-drop WYSIWYG)
- [ ] Supplier marketplace + inventory sync
- [ ] Real 3D viewer (Three.js GLB models)
- [ ] Payments (Stripe) and webhooks
- [ ] Admin moderation queue + fraud signals
