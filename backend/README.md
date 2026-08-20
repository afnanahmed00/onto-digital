# ONTO DIGITAL — Backend

Express + TypeScript API, deployed independently of the `frontend/` Next.js
app (frontend → Vercel, backend → Render). See `docs/projectinfo.md` in the
repo root for the full product/database spec this backend implements
incrementally.

## Getting started

```bash
cd backend
npm install
cp .env.example .env   # fill in values as they become available
npm run dev             # starts on http://localhost:5000
```

## Scripts

| Script | Purpose |
|---|---|
| `npm run dev` | Runs the API with hot reload (`tsx watch`). |
| `npm run build` | Type-checks and compiles `src/` to `dist/`. |
| `npm start` | Runs the compiled build (`dist/server.js`) — used in production. |
| `npm run typecheck` | Type-checks without emitting output. |

## Structure

```
src/
├── config/       # env validation, CORS allowlist
├── database/     # Mongoose connection layer
├── middleware/   # error handler, 404 handler
├── routes/       # /health + /api/v1/* feature routers
├── utils/        # AppError hierarchy, asyncHandler
├── app.ts        # builds the Express app (no listen())
└── server.ts     # entrypoint — connects the DB, then listens
```

Each feature under `routes/v1/` (`auth`, `projects`, `services`, `leads`,
`uploads`) is its own router file, mounted once in `routes/v1/index.ts`.
Implementing a feature means filling in its router — the mount points,
error handling, CORS, and env plumbing already exist.

## Current status

This is the **backend foundation** — no database is connected, and no
feature routes are implemented yet. `/health` is the only working endpoint.
`MONGODB_URI` and the other later-phase variables in `.env.example` are
optional; the server runs without them and picks them up automatically once
set.

Planned integrations for later phases: **MongoDB Atlas** (database),
**Cloudinary** (image/media storage for projects, services, testimonials),
**Resend** (email), and JWT-based admin authentication.
